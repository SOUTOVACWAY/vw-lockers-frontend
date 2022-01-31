import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import { SubmissionError } from 'redux-form'

import { fetchIncidences } from '../actions/incidences'
import { fetchMachines } from '../actions/machines'

import { renderInputField, renderSelectField } from '../utils/forms'

class IncidencesFilterForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false }

    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { fetchMachines } = this.props

    fetchMachines()

    this.load(this.props, true)
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps)
  }

  load(props, refresh=false) {
    const { machines, incidences } = props

    if (refresh || (!incidences.incidences && !incidences.loading)) {
      this.submit(this.props.formValues)
    }

    if (!this.state.loaded && machines) {
      this.setState({ loaded: true })
    }
  }

  submit(props) {
    return this.props.fetchIncidences(props.status, props.machine, props.startDate, props.endDate)
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
            <Field name="status"
                   component={renderSelectField}
                   label="Estado">
              <option value="">Todos</option>
              <option value="OPEN">Abierta</option>
              <option value="CLOSED">Cerrada</option>
            </Field>
          </div>
          <div className="col">
            <Field name="startDate"
                   component={renderInputField}
                   type="date"
                   label="Fecha inicio"/>
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

IncidencesFilterForm = reduxForm({
  form: 'IncidencesFilterForm',
  destroyOnUnmount: false
})(IncidencesFilterForm)

const selector = formValueSelector('IncidencesFilterForm')

const mapStateToProps = state => ({
  machines: state.machines.machines,
  incidences: state.incidences,
  initialValues: {
    machine: '',
    status: 'OPEN',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10)
  },
  formValues: {
    machine: selector(state, 'machine'),
    status: selector(state, 'status'),
    startDate: selector(state, 'startDate'),
    endDate: selector(state, 'endDate')
  }
})

const mapDispatchToProps = dispatch => ({
  fetchIncidences: bindActionCreators(fetchIncidences, dispatch),
  fetchMachines: bindActionCreators(fetchMachines, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(IncidencesFilterForm)
