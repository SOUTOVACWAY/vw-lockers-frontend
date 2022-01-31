import React from 'react'
import { history } from '../store'

class ShipmentList extends React.Component {
  goTo(number, e) {
    history.push(`/logistics/${number}`)
  }

  render() {
    return (
      this.props.shipments ? (
        <table className="table table-hover table-clickable">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Cliente</th>
            </tr>
          </thead>
          <tbody>
            {this.props.shipments.map(shipment => (
                <tr key={shipment.number}
                    onClick={e => this.goTo(shipment.number, e)}>
                  <th scope="row">{shipment.number}</th>
                  <td>{new Date(shipment.date).toDateString()}</td>
                  <td>{shipment.customer.fullname}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No hay envíos para mostrar</p>
      )
    )
  }
}

export default ShipmentList

