import React from 'react'

class IconBox extends React.Component {
  getIcon(type) {
    if (type === 'warning') {
      return 'exclamation-triangle'
    }

    return 'bell'
  }

  render() {
    return (
      <div className={`p-3 mb-3 bg-${this.props.type} danger rounded text-light box-shadow box-iconed`}>
        <i className={`fas fa-${this.getIcon(this.props.type)} fa-2x mb-2`}></i>
        {this.props.children}
      </div>
    )
  }
}

export default IconBox

