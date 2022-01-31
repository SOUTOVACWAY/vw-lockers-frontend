import React from 'react'
import { history } from '../store'

class ContractList extends React.Component {
  goTo(number, e) {
    history.push(`/contracts/${number}`)
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-hover table-clickable">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cliente</th>
              <th scope="col">Máquina</th>
              <th scope="col">Fecha inicio</th>
              <th scope="col">Fecha fin</th>
            </tr>
          </thead>
          <tbody>
            {this.props.contracts.map(contract => (
              <tr key={contract.number}
                  onClick={e => this.goTo(contract.number, e)}>
                <th scope="row">{contract.number}</th>
                <td>{contract.customer.fullname}</td>
                <td>{contract.machine.serial}</td>
                <td>
                  {(new Date(contract.startDate)).toDateString()}
                </td>
                <td>
                  {(new Date(contract.endDate)).toDateString()}
                </td>
              </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ContractList

