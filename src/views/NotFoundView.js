import React from 'react'
import ErrorMessage from '../components/ErrorMessage'

class NotFoundView extends React.Component {
  render() {
    return (
      <div>
        <ErrorMessage message="Página no encontrada"/>
      </div>
    )
  }
}

export default NotFoundView
