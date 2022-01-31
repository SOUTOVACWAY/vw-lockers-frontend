import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { SubmissionError } from 'redux-form'

import { fetchAudits } from '../actions/audits'
import { fetchMachines } from '../actions/machines'

import { renderInputField, renderSelectField } from '../utils/forms'

class AuditFilterForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false }

    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { fetchMachines } = this.props

    fetchMachines()

    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps)
  }

  load(props) {
    const { machines } = props

    if (!this.state.loaded && machines) {
      this.setState({ loaded: true })
    }
  }

  submit(props) {
    return this.props.fetchAudits(props.machine, props.type, props.startDate, props.endDate)
      .then(response => {
        if (response.error) {
          throw new SubmissionError({
            _error: response.error.message,
            ...response.error.fields
          })
        }

        return response
      })
  }

  render() {
    const { loaded } = this.state
    const { error, submitting, handleSubmit, machines } = this.props

    if (!loaded) {
      console.log('not loaded');
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <form onSubmit={handleSubmit(this.submit)} className="mb-3">
        <div className="row">
          <div className="col">
            <Field name="machine"
                   component={renderSelectField}
                   label="Máquina">
              <option value="">Todas</option>
              {machines.map(machine => {
                return (
                  <option value={machine._id} key={machine._id}>
                    {machine.serial}
                  </option>
                )
              })}
            </Field>
          </div>
          <div className="col">
            <Field name="type"
                   component={renderSelectField}
                   label="Tipo">
              <option value="">Todas</option>
              <option value="INFO">INFO</option>
              <option value="WARNING">WARNING</option>
              <option value="ERROR">ERROR</option>
              <option value="MONEY">MONEY</option>
              <option value="CHANGE">CHANGE</option>
            </Field>
          </div>
          <div className="col">
            <Field name="startDate"
                   component={renderInputField}
                   type="date"
                   label="Fecha inicio"/>
          </div>
          <div className="col">
            <Field name="endDate"
                   component={renderInputField}
                   type="date"
                   label="Fecha fin"/>
          </div>
        </div>
        <div className="form-row">
          { error && <div className="alert alert-danger">{error}</div> }
        </div>
        <div className="form-row">
          <button className="btn bg-vw-dark text-white mr-1"
                  type="submit"
                  disabled={submitting}>
            <i className="fas fa-sync mr-1"></i>Actualizar
          </button>
        </div>
      </form>
    )
  }
}

AuditFilterForm = reduxForm({
  form: 'AuditFilterForm',
})(AuditFilterForm)

const mapStateToProps = state => ({
  machines: state.machines.machines,
  initialValues: {
    machine: '',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10)
  }
})

const mapDispatchToProps = dispatch => ({
  fetchAudits: bindActionCreators(fetchAudits, dispatch),
  fetchMachines: bindActionCreators(fetchMachines, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AuditFilterForm)

