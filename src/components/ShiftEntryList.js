import React from 'react'
import * as dateFormat from 'dateformat'

class ShiftEntryList extends React.Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-hover table-clickable">
          <thead className="thead-light">
            <tr>
              <th scope="col">Máquina</th>
              <th scope="col">Fecha/Hora</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {this.props.shifts.map(shift => (
              <tr key={shift._id}>
                <td>{shift.machine.serial}</td>
                <td>{dateFormat(new Date(shift.date), 'dd/mm/yy HH:MM')}</td>
                <td>{shift.action}</td>
              </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ShiftEntryList

