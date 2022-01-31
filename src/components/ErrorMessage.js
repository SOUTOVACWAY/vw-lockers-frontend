import React from 'react'

class ErrorMessage extends React.Component {
  render() {
    return (
      <div>
        <div className="alert alert-dangeri text-center">
          <i className="fas fa-exclamation-triangle"></i>
          <p>{ this.props.message }</p>
        </div>
      </div>
    )
  }
}

export default ErrorMessage
