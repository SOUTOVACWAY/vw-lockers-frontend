import React from 'react'

import { getMachineStatus, getMachineStatusColor } from '../utils/machines'

class MachineStatusBadge extends React.Component {
  render() {
    return (
      <div className="badge"
           style={{backgroundColor: getMachineStatusColor(this.props.machine)}}>
        { getMachineStatus(this.props.machine) }
      </div>
    )
  }
}

export default MachineStatusBadge
