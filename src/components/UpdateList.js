import React from 'react'
import { history } from '../store'

class UpdateList extends React.Component {
  goTo(id, e) {
    history.push(`/updates/${id}`)
  }

  render() {
    if (!this.props.updates) {
      return null
    }

    return (
      <table className="table table-hover table-clickable">
        <thead className="thead-light">
          <tr>
            <th scope="col">Versión</th>
            <th scope="col">Aplica a</th>
            <th scope="col">URL de descarga</th>
          </tr>
        </thead>
        <tbody>
          {this.props.updates.map(update => (
            <tr key={update._id}
                onClick={e => this.goTo(update._id, e)}>
              <th scope="row">{update.version}</th>
              <td>{update.applies_to}</td>
              <td>{update.download_url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default UpdateList

