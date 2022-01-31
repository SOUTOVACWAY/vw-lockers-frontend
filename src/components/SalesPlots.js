import React from 'react'
import { Bar, HorizontalBar } from 'react-chartjs-2';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class SalesPlots extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  computeSalesStats() {
    const { sales } = this.props

    const itemIndices = new Map([
      ['VWPACK', 0],
      ['VWLAY', 1],
      ['VWGO', 2],
    ])

    let amount = 0

    let amountsPerMethod = new Map([
      ['CASH', [0, 0, 0]],
      ['TPV', [0, 0, 0]],
      ['TOKEN', [0, 0, 0]]
    ])

    let qtyPerMethod = new Map([
      ['CASH', [0, 0, 0]],
      ['TPV', [0, 0, 0]],
      ['TOKEN', [0, 0, 0]]
    ])

    for (let sale of sales) {
      let amountsPerSaleMethod = amountsPerMethod.get(sale.paymentMethod)
      let qtyPerSaleMethod = qtyPerMethod.get(sale.paymentMethod)

      for (let item of sale.items) {
        let itemAmount = item.qty * item.price

        amount += itemAmount
        amountsPerSaleMethod[itemIndices.get(item.item)] += itemAmount

        if (itemAmount > 0) {
          qtyPerSaleMethod[itemIndices.get(item.item)] += 1
        }
      }

      amountsPerMethod.set(sale.paymentMethod, amountsPerSaleMethod)
      qtyPerMethod.set(sale.paymentMethod, qtyPerSaleMethod)
    }

    return {
      amount: amount,
      amountsPerMethod: amountsPerMethod,
      qtyPerMethod: qtyPerMethod
    }
  }

  renderAmount() {
    const stats = this.computeSalesStats()

    const data = {
      labels: ['VACWAYpack', 'VACWAYlay', 'VACWAYgo!'],
      datasets: [
        {
          label: 'CASH',
          backgroundColor: '#00577D',
          data: stats.amountsPerMethod.get('CASH')
        },
        {
          label: 'TPV',
          backgroundColor: '#00CAD4',
          data: stats.amountsPerMethod.get('TPV')
        },
        {
          label: 'TOKEN',
          backgroundColor: '#B2B2B2',
          data: stats.amountsPerMethod.get('TOKEN')
        }
      ]
    }

    return (
      <Bar
        data={data}
        options={{
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'TOTAL (EUR)'
              }
            }]
          },
          tooltips: {
            mode: 'label',
            callbacks: {
              label: this.totalLabel
            }
          }
        }}
      />
    )
  }

  sortAmountsPerCustomer() {
    const { sales } = this.props

    const amountsPerCustomer = new Map()

    for (let sale of sales) {
      let customerAmount = amountsPerCustomer.get(sale.customer._id)

      if (customerAmount === undefined) {
        customerAmount = [
          sale.customer.fullname,
          new Map([
            ['VWPACK', 0],
            ['VWLAY', 0],
            ['VWGO', 0],
          ])
        ]
      }

      for (let item of sale.items) {
        let amount = customerAmount[1].get(item.item)
        customerAmount[1].set(item.item, amount + item.price)
      }

      amountsPerCustomer.set(sale.customer._id, customerAmount)
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let sortedAmountsPerCustomer = Array.from(amountsPerCustomer.values())
      .sort((a, b) => {
        return Array.from(b[1].values()).reduce(reducer) -
               Array.from(a[1].values()).reduce(reducer)
      })

    let names = sortedAmountsPerCustomer.map((value, index) => {
      return value[0]
    })

    let amounts = new Map([
      ['VWPACK',
       sortedAmountsPerCustomer.map((value, index) => {
          return value[1].get('VWPACK')
        })
      ],
      ['VWLAY',
       sortedAmountsPerCustomer.map((value, index) => {
          return value[1].get('VWLAY')
        }),
      ],
      ['VWGO',
       sortedAmountsPerCustomer.map((value, index) => {
          return value[1].get('VWGO')
        }),
      ]
    ])

    return {
      names: names,
      amounts: amounts
    }
  }

  renderAmountsPerCustomer() {
    const sortedAmountsPerCustomer = this.sortAmountsPerCustomer()

    const data = {
      labels: sortedAmountsPerCustomer.names,
      datasets: [
        {
          label: 'VACWAYpack',
          backgroundColor: '#00577D',
          data: sortedAmountsPerCustomer.amounts.get('VWPACK')
        },
        {
          label: 'VACWAYlay',
          backgroundColor: '#00CAD4',
          data: sortedAmountsPerCustomer.amounts.get('VWLAY')
        },
        {
          label: 'VACWAYgo',
          backgroundColor: '#81D8D0',
          data: sortedAmountsPerCustomer.amounts.get('VWGO')
        }
      ],
    }

    return (
      <HorizontalBar
        data={data}
        options={{
          scales: {
            yAxes: [{
              stacked: true,
            }],
            xAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'TOTAL (EUR)'
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: this.totalLabel
            }
          }
        }}
      />
    )
  }
  renderQty() {
    const stats = this.computeSalesStats()

    const data = {
      labels: ['VACWAYpack', 'VACWAYlay', 'VACWAYgo!'],
      datasets: [
        {
          label: 'CASH',
          backgroundColor: '#00577D',
          data: stats.qtyPerMethod.get('CASH')
        },
        {
          label: 'TPV',
          backgroundColor: '#00CAD4',
          data: stats.qtyPerMethod.get('TPV')
        },
        {
          label: 'TOKEN',
          backgroundColor: '#B2B2B2',
          data: stats.qtyPerMethod.get('TOKEN')
        }
      ]
    }

    return (
      <Bar
        data={data}
        options={{
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'TOTAL (Unidades)'
              }
            }]
          },
          tooltips: {
            mode: 'label',
            callbacks: {
              label: this.totalLabel
            }
          }
        }}
      />
    )
  }

  sortQtyPerCustomer() {
    const { sales } = this.props

    const qtysPerCustomer = new Map()

    for (let sale of sales) {
      let customerQty = qtysPerCustomer.get(sale.customer._id)

      if (customerQty === undefined) {
        customerQty = [
          sale.customer.fullname,
          new Map([
            ['VWPACK', 0],
            ['VWLAY', 0],
            ['VWGO', 0]
          ])
        ]
      }

      for (let item of sale.items) {
        if (item.price <= 0)
          continue

        let qty = customerQty[1].get(item.item)
        customerQty[1].set(item.item, qty + item.qty)
      }

      qtysPerCustomer.set(sale.customer._id, customerQty)
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let sortedQtysPerCustomer = Array.from(qtysPerCustomer.values())
      .sort((a, b) => {
        return Array.from(b[1].values()).reduce(reducer) -
               Array.from(a[1].values()).reduce(reducer)
      })

    let names = sortedQtysPerCustomer.map((value, index) => {
      return value[0]
    })

    let qties = new Map([
      ['VWPACK',
       sortedQtysPerCustomer.map((value, index) => {
          return value[1].get('VWPACK')
        })
      ],
      ['VWLAY',
       sortedQtysPerCustomer.map((value, index) => {
          return value[1].get('VWLAY')
        }),
      ],
      ['VWGO',
       sortedQtysPerCustomer.map((value, index) => {
          return value[1].get('VWGO')
        }),
      ]
    ])

    return {
      names: names,
      qties: qties
    }
  }

  renderQtyPerCustomer() {
    const sortedQtyPerCustomer = this.sortQtyPerCustomer()

    const data = {
      labels: sortedQtyPerCustomer.names,
      datasets: [
        {
          label: 'VACWAYpack',
          backgroundColor: '#00577D',
          data: sortedQtyPerCustomer.qties.get('VWPACK')
        },
        {
          label: 'VACWAYlay',
          backgroundColor: '#00CAD4',
          data: sortedQtyPerCustomer.qties.get('VWLAY')
        },
        {
          label: 'VACWAYgo',
          backgroundColor: '#81D8D0',
          data: sortedQtyPerCustomer.qties.get('VWGO')
        }
      ],
    }

    return (
      <HorizontalBar
        data={data}
        options={{
          scales: {
            yAxes: [{
              stacked: true,
            }],
            xAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'TOTAL (Unidades)'
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: this.totalLabel
            }
          }
        }}
      />
    )
  }

  totalLabel(tooltipItem, data) {
      let label = data.datasets[tooltipItem.datasetIndex].label;
      let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

      let renderedLabel = label + ": " + value;
      if (tooltipItem.datasetIndex !== 0) {
          return renderedLabel
      } else {
          // Loop through all datasets to get the actual total of the index
          let total = 0;
          for (let i = 0; i < data.datasets.length; i++)
            total += data.datasets[i].data[tooltipItem.index];

          return ["Total: " + total, renderedLabel];
      }
  }

  render() {
   return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Importe
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Importe por Cliente
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Cantidad
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Cantidad por Cliente
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            { this.renderAmount() }
          </TabPane>
          <TabPane tabId="2">
            { this.renderAmountsPerCustomer() }
          </TabPane>
          <TabPane tabId="3">
            { this.renderQty() }
          </TabPane>
          <TabPane tabId="4">
            { this.renderQtyPerCustomer() }
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default SalesPlots

