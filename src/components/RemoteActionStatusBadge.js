import React from 'react'

class RemoteActionStatusBadge extends React.Component {
  getColor(status) {
    if (status === 'COMPLETE') {
      return "success"
    } else if (status === 'PENDING') {
      return "warning"
    } else if (status === 'ERROR') {
      return "danger"
    }

    return "secondary"
  }

  render() {
    return (
      <div className={`badge badge-${this.getColor(this.props.status)}`}>
        { this.props.status }
      </div>
    )
  }
}

export default RemoteActionStatusBadge

