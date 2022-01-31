import React from 'react'

class IncidenceStatusBadge extends React.Component {
  getColor(status) {
    if (status === 'CLOSED') {
      return "success"
    }

    return "warning"
  }

  getText(status) {
    if (status === 'CLOSED') {
      return 'CERRADA'
    }

    return 'ABIERTA'
  }

  render() {
    return (
      <div className={`badge badge-${this.getColor(this.props.status)}`}>
        { this.getText(this.props.status) }
      </div>
    )
  }
}

export default IncidenceStatusBadge

