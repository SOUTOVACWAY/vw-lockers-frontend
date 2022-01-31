import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { SubmissionError } from 'redux-form'

import { fetchRemoteActions, addRemoteAction } from '../actions/remoteactions'
import { renderInputField, renderSelectField } from '../utils/forms'

class RemoteActionAddForm extends React.Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  submit(props) {
    // insert machine id to the query
    props.machine = this.props.machine._id

    return this.props.addRemoteAction(props)
      .then(response => {
        if (response.error) {
          throw new SubmissionError({
            _error: response.error.message,
            ...response.error.fields
          })
        }

        // fetch remote actions so that they are refreshed
        this.props.fetchRemoteActions(this.props.machine.serial)

        return response
      })
  }

  render() {
    const { error, pristine, submitting, handleSubmit, machine,
            fetchRemoteActions } = this.props

    return (
      <form onSubmit={handleSubmit(this.submit)} className="mb-3">
        <div className="form-row">
          <div className="col-md-4">
            <Field name="code" component={renderSelectField}>
              <option value="">Selecciona una acción...</option>
              <option value="COMMAND">Ejecutar comando</option>
              <option value="REBOOT">Reiniciar máquina</option>
              <option value="DOOR_OPEN">Abrir puerta</option>
              <option value="COVER_OPEN">Abrir tapa</option>
              <option value="COVER_CLOSE">Cerrar tapa</option>
              <option value="WATERPROOF">Ciclo de vacío</option>
              <option value="EXPEDIT_VWPACK">Expedir VWPACK</option>
              <option value="EXPEDIT_VWLAY">Expedir VWLAY</option>
              <option value="EXPEDIT_VWGO">Expedir VWGO</option>
              <option value="EXPEDIT_VWPLAY">Expedir VWPLAY</option>
              <option value="TEST_SUCC">Test de succión</option>
              <option value="HARD_RESET">Forzar hard reset</option>
              <option value="BOARD_A_CMD">Comando placa A</option>
              <option value="BOARD_B_CMD">Comando placa B</option>
              <option value="UPDATE">Actualizar</option>
            </Field>
          </div>
          <div className="col-md-4">
            <Field name="arguments"
                   type="text"
                   component={renderInputField}
                   placeholder="Argumentos"/>
          </div>
          <div className="col-md-4">
            <button className="btn bg-vw-light text-white mr-1" type="submit"
                    disabled={pristine || submitting}>
              <i className="fas fa-bolt mr-1"></i>Ejecutar
            </button>
            <button className="btn btn-info"
                    type="button"
                    onClick={() => fetchRemoteActions(machine.serial)}>
              <i className="fas fa-sync mr-1"></i>Actualizar
            </button>
          </div>
        </div>
        <div className="form-row">
          { error && <div className="alert alert-danger">{error}</div> }
        </div>
      </form>
    )
  }
}

RemoteActionAddForm = reduxForm({
  form: 'RemoteActionAddForm',
})(RemoteActionAddForm)

const mapDispatchToProps = dispatch => ({
  addRemoteAction: bindActionCreators(addRemoteAction, dispatch),
  fetchRemoteActions: bindActionCreators(fetchRemoteActions, dispatch)
})

export default connect(() => ({}), mapDispatchToProps)(RemoteActionAddForm)

