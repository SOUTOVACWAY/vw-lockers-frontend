import React from 'react'

class MachinePromoterFeesTable extends React.Component {
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
              <td>{machine.promoter_fees['VWPACK']} €</td>
              <td>{machine.promoter_fees['VWLAY']} €</td>
              <td>{machine.promoter_fees['VWGO']} €</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MachinePromoterFeesTable


