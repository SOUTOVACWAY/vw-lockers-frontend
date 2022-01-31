import React from 'react'
import { history } from '../store'

import IncidenceStatusBadge from './IncidenceStatusBadge'

class IncidenceList extends React.Component {
  goTo(number, e) {
    history.push(`/incidences/${number}`)
  }

  render() {
    return (
      <table className="table table-hover table-clickable">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Máquina</th>
            <th scope="col">Cliente</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {this.props.incidences.map(incidence => {
            const date = new Date(incidence.createdAt)

            return (
              <tr key={incidence.number}
                  onClick={e => this.goTo(incidence.number, e)}>
                <th scope="row">{incidence.number}</th>
                <td>{date.toDateString()}</td>
                <td>{incidence.machine.serial}</td>
                <td>{incidence.customer.fullname}</td>
                <td>
                  <IncidenceStatusBadge status={incidence.status}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default IncidenceList

