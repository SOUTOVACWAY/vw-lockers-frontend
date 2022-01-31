import React from 'react'

class Box extends React.Component {
  render() {
    return (
      <div className="p-3 mb-3 bg-white rounded box-shadow">
        <h6 className="box-border-bottom mb-2 border-gray pb-2 mb-0">
          {this.props.icon &&
           <i className={`fas fa-${this.props.icon} float-right mr-1`}></i>
          }
          {this.props.title}
        </h6>
        {this.props.children}
      </div>
    )
  }
}

export default Box
