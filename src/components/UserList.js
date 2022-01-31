import React from 'react'
import { history } from '../store'

class UserList extends React.Component {
  goTo(number, e) {
    history.push(`/users/${number}`)
  }

  render() {
    if (!this.props.users) {
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
          {this.props.users.map(user => (
            <tr key={user.number}
                onClick={e => this.goTo(user.number, e)}>
              <th scope="row">{user.number}</th>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default UserList

