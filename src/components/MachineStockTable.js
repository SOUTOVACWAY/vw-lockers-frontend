import React from 'react'

class StockTable extends React.Component {
  render() {
    const { machine } = this.props

    return (
      <div>
        <table className="table table-hover table-clickable">
          <thead className="thead-light">
            <tr>
              <th scope="col">VACWAYpack</th>
              <th scope="col">VACWAYlay</th>
              <th scope="col">VACWAYgo!</th>
            </tr>
          </thead>
          <tbody>
            <tr key={machine.serial}>
              <td>{machine.stock_machine['VWPACK']} / {machine.stock_estimated['VWPACK']}</td>
              <td>{machine.stock_machine['VWLAY']}</td>
              <td>{machine.stock_machine['VWGO']}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default StockTable


