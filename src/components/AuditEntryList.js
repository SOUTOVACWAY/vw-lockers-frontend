import React from 'react'
import * as dateFormat from 'dateformat'

class AuditEntryList extends React.Component {
  renderType(type) {
    let badgeColor = ''

    if (type === 'INFO') {
      badgeColor = '#28a745'
    } else if (type === 'WARNING') {
      badgeColor = '#ffc107'
    } else if (type === 'MONEY' || type === 'CHANGE') {
      badgeColor = '#f48c42'
    } else {
      badgeColor = '#ff0000'
    }

    return (
      <div className="badge"
           style={{backgroundColor: badgeColor}}>
        { type }
      </div>
    )
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-hover table-clickable">
          <thead className="thead-light">
            <tr>
              <th scope="col">Máquina</th>
              <th scope="col">Fecha/Hora</th>
              <th scope="col">Tipo</th>
              <th scope="col">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {this.props.audits.map(audit => (
              <tr key={audit._id}>
                <td>{audit.machine.serial}</td>
                <td>{dateFormat(new Date(audit.date), 'dd/mm/yy HH:MM')}</td>
                <td>{this.renderType(audit.type)}</td>
                <td>{audit.description}</td>
              </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AuditEntryList

