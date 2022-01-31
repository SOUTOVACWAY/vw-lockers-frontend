import React from 'react'

class ShipmentItemList extends React.Component {
  render() {
    return (
      <table className="table table-hover table-clickable">
        <thead className="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">VACWAYpack</th>
            <th scope="col">VACWAYlay</th>
            <th scope="col">VACWAYgo!</th>
            <th scope="col">VACWAYplay</th>
          </tr>
        </thead>
        <tbody>
          <tr key="quantities">
            <th scope="row">Cantidad</th>
            <td>{this.props.items['VWPACK']}</td>
            <td>{this.props.items['VWLAY']}</td>
            <td>{this.props.items['VWGO']}</td>
            <td>{this.props.items['VWPLAY']}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default ShipmentItemList


