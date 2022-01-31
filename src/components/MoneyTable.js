import React from 'react'

class MoneyTable extends React.Component {
  render() {
    const { bills_in_box, cash_in_box, cash_in_coiner } = this.props.machine

    return (
      <div>
        <table className="table table-hover table-clickable">
          <thead className="thead-light">
            <tr>
              <th scope="col">Billete</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr key="5EUR">
              <th scope="row">5 €</th>
              <td>{`${bills_in_box.five}`}</td>
              <td>{`${bills_in_box.five * 5.00} €`}</td>
            </tr>
            <tr key="BILLS_10EUR">
              <th scope="row">10 €</th>
              <td>{`${bills_in_box.ten}`}</td>
              <td>{`${bills_in_box.ten * 10.00} €`}</td>
            </tr>
            <tr key="BILLS_20EUR">
              <th scope="row">20 €</th>
              <td>{`${bills_in_box.twenty}`}</td>
              <td>{`${bills_in_box.twenty * 20.00} €`}</td>
            </tr>
            <tr key="BILLS_TOTAL">
              <th scope="row">TOTAL</th>
              <td>{`${bills_in_box.five + bills_in_box.ten + bills_in_box.twenty}`}</td>
              <td>{`${bills_in_box.five * 5.00 +
                      bills_in_box.ten * 10.00 +
                      bills_in_box.twenty * 20.00} €`}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-hover table-clickable">
          <thead className="thead-light">
            <tr>
              <th scope="col">Moneda</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr key="CASH_0_5EUR">
              <th scope="row">0.50 €</th>
              <td>{`${cash_in_box.fifty} / ${cash_in_coiner.fifty}`}</td>
              <td>{`${cash_in_box.fifty * 0.50} € / ${cash_in_coiner.fifty * 0.50} €`}</td>
            </tr>
            <tr key="CASH_1EUR">
              <th scope="row">1 €</th>
              <td>{`${cash_in_box.one} / ${cash_in_coiner.one}`}</td>
              <td>{`${cash_in_box.one * 1.00} € / ${cash_in_coiner.one * 1.00} €`}</td>
            </tr>
            <tr key="CASH_2EUR">
              <th scope="row">2 €</th>
              <td>{`${cash_in_box.two} / ${cash_in_coiner.two}`}</td>
              <td>{`${cash_in_box.two * 2.00} € / ${cash_in_coiner.two * 2.00} €`}</td>
            </tr>
            <tr key="CASH_TOKEN">
              <th scope="row">Token</th>
              <td>{`${cash_in_box.token} / 0`}</td>
              <td>-</td>
            </tr>
            <tr key="CASH_TOTAL">
              <th scope="row">TOTAL</th>
              <td>{`${cash_in_box.fifty +
                      cash_in_box.one +
                      cash_in_box.two +
                      cash_in_box.token} /
                    ${cash_in_coiner.fifty +
                      cash_in_coiner.one +
                      cash_in_coiner.two}`}</td>
              <td>{`${cash_in_box.fifty * 0.50 +
                      cash_in_box.one * 1.00 +
                      cash_in_box.two * 2.00} € /
                    ${cash_in_coiner.fifty * 0.50 +
                      cash_in_coiner.one * 1.00 +
                      cash_in_coiner.two * 2.00} €`}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-muted text-right">
         Caja / Monedero
        </p>
      </div>
    )
  }
}

export default MoneyTable


