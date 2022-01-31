import React from 'react'
import { Progress } from 'reactstrap'

class SupplyLevels extends React.Component {
  getColor(value) {
    if (value >= 75) {
      return "success"
    } else if (value < 75 && value >= 25) {
      return "warning"
    }
    return "danger"
  }

  render() {
    return (
      <ul className="list-undecorated">
        {this.props.supplies.map(supply => (
          <li>
            <span>{supply.name}</span>
            <span className="float-right">
              {supply.units}&nbsp;u.&nbsp;
              <span className="text-muted small">({supply.percent}%)</span>
            </span>
            <Progress color={this.getColor(supply.percent)} value={supply.percent}/>
          </li>
        ))}
      </ul>
    )
  }
}

export default SupplyLevels;
