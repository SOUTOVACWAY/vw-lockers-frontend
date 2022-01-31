import React from 'react'
import { history } from '../store'

import MachineStatusBadge from './MachineStatusBadge'

class MachineList extends React.Component {
  goTo(serial, e) {
    history.push(`/machines/${serial}`)
  }

  render() {
    return (
      <table className="table table-hover table-clickable">
        <thead className="thead-light">
          <tr>
            <th scope="col"># Serie</th>
            <th scope="col">Cliente</th>
            <th scope="col">Modelo</th>
            <th scope="col">Estado</th>
            <th scope="col">Versiones</th>
          </tr>
        </thead>
        <tbody>
          {this.props.machines.map(machine => (
            <tr key={machine.serial}
                onClick={e => this.goTo(machine.serial, e)}>
              <th scope="row">{machine.serial}</th>
              <td>
                {(machine.customer && machine.customer.fullname) || 'None' }
              </td>
              <td>{machine.type}</td>
              <td>
                <div className="d-inline-block p-2">
                  <MachineStatusBadge machine={machine}/>
                </div>
                {machine.has_promoter ? (
                  (machine.shift_active) ? (
                    <div className="dot d-inline-block p-2 bg-success"/>
                  ) : (
                    <div className="dot d-inline-block p-2 bg-warning"/>
                  )
                ) : (
                  ''
                )}
              </td>
              <td>
                SW: {machine.sw_version}, FW: {machine.fw_version}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default MachineList
