import React from 'react'
import { history } from '../store'

class CustomerList extends React.Component {
  goTo(number, e) {
    history.push(`/customers/${number}`)
  }

  render() {
    if (!this.props.customers) {
      return null
    }

    return (
      <table className="table table-hover table-clickable">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre completo</th>
            <th scope="col">E-Mail</th>
          </tr>
        </thead>
        <tbody>
          {this.props.customers.map(customer => (
            <tr key={customer.number}
                onClick={e => this.goTo(customer.number, e)}>
              <th scope="row">{customer.number}</th>
              <td>{customer.fullname}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default CustomerList

