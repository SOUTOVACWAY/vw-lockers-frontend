import React from 'react'

class StockTable extends React.Component {
  renderQty(qty) {
    if (qty < 25) {
      return (<span className="text-danger">{qty}</span>)
    }

    return qty
  }

  render() {
    const { customers, selectedCustomer, machines } = this.props

    return (
      <div>
        {customers.map(customer => {
          if (selectedCustomer === "" || selectedCustomer === customer._id) {
            return (
              <div key={customer._id}>
                <h6>{customer.fullname}</h6>
                <table className="table table-hover table-clickable">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">VACWAYpack</th>
                      <th scope="col">VACWAYlay</th>
                      <th scope="col">VACWAYgo!</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={customer._id}>
                      <th scope="row">Reserva</th>
                      <td>{this.renderQty(customer.stock['VWPACK'])}</td>
                      <td>{this.renderQty(customer.stock['VWLAY'])}</td>
                      <td>{this.renderQty(customer.stock['VWGO'])}</td>
                    </tr>
                    {machines.map(machine => {
                      if (machine.customer && machine.customer._id === customer._id) {
                        return (
                          <tr key={machine.serial}>
                            <th scope="row">{machine.serial}</th>
                            <td>{this.renderQty(machine.stock_machine['VWPACK'])} / {this.renderQty(machine.stock_estimated['VWPACK'])}</td>
                            <td>{this.renderQty(machine.stock_machine['VWLAY'])}</td>
                            <td>{this.renderQty(machine.stock_machine['VWGO'])}</td>
                          </tr>
                        )
                      } else {
                        return null
                      }
                    })}
                  </tbody>
                </table>
                <hr/>
              </div>
            )
          } else {
            return null
          }
        })}
      </div>
    )
  }
}

export default StockTable

