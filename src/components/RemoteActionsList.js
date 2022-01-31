import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import RemoteActionStatusBadge from './RemoteActionStatusBadge'

class RemoteActionsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      result: '',
      resultShown: false
    }

    this.resultToggle = this.resultToggle.bind(this)
    this.resultShow = this.resultShow.bind(this)
  }

  resultToggle() {
    this.setState({ resultShown: !this.state.resultShown })
  }

  resultShow(result, e) {
    this.setState({ result: result, resultShown: true })
  }

  render() {
    if (this.props.remoteActions.loading) {
      return (<h2>Cargando...</h2>)
    }

    if (this.props.remoteActions.error) {
      return (<h2>Error al cargar las acciones remotas</h2>)
    }

    return (
      <div>
        <div className="table-responsive">
          <table className="table table-hover table-clickable">
            <thead className="thead-light">
              <tr>
                <th scope="col">Fecha/Hora</th>
                <th scope="col">Código</th>
                <th scope="col">Argumentos</th>
                <th scope="col">Estado</th>
                <th scope="col">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {this.props.remoteActions.remoteActions.map(remoteAction => (
                <tr key={remoteAction._id}>
                  <td>
                    {(new Date(remoteAction.date)).toLocaleString()}
                  </td>
                  <td>{remoteAction.code}</td>
                  <td>
                    <tt>{remoteAction.arguments}</tt>
                  </td>
                  <td>
                    <RemoteActionStatusBadge status={remoteAction.status}/>
                  </td>
                  <td>
                    <button className="btn btn-info"
                            onClick={e => this.resultShow(remoteAction.result, e)}>
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <Modal isOpen={this.state.resultShown}>
          <ModalHeader toggle={this.resultToggle}>Resultado</ModalHeader>
          <ModalBody>
            <p className="text-break text-monospace">
              {this.state.result}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.resultToggle}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default RemoteActionsList

