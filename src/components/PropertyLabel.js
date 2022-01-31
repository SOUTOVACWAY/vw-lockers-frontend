import React from 'react'

class PropertyLabel extends React.Component {
  render() {
    return (
      <div>
        {this.props.ml ? (
          <div>
            <h6>{this.props.name}:</h6>
            <p className="text-muted text-break">{this.props.value}</p>
          </div>
         ) : (
          <div className="d-flex justify-content-between">
            <h6>{this.props.name}:</h6>
            {this.props.checkbox ? (
              <input type="checkbox" checked={this.props.value} disabled="true" />
            ) : (
              <span className="text-muted">{this.props.value}</span>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default PropertyLabel

