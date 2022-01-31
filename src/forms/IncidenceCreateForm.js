import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import Box from '../components/Box'
import ErrorMessage from '../components/ErrorMessage'

import { addIncidence } from '../actions/incidences'
import { fetchMachines } from '../actions/machines'
import { fetchCustomers } from '../actions/customers'

import { renderSelectField, renderTextAreaField } from '../utils/forms'

class IncidenceCreateForm extends React.Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { fetchMachines, fetchCustomers } = this.props

    fetchMachines()
    fetchCustomers()
  }

  submit(props) {
    const { addIncidence } = this.props

    return addIncidence(props)
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
    const { customers, machines, error } = this.props

    if (!customers || !machines) {
      return null
    }

    if (machines.length === 0) {
      return (
        <ErrorMessage message="No hay máquinas disponibles"/>
      )
    }

    return (
      <div>
        <h1>
          <span className="text-vw-dark">CREAR </span>
          <span className="text-vw-light">INCIDENCIA</span>
        </h1>

        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Box title="Incidencia" icon="exclamation-triangle">
            <Field name="customer"
                   component={renderSelectField}
                   label="Cliente">
              <option value="">Selecciona a un cliente...</option>
              {customers.map(customer => {
                return (
                  <option value={customer._id} key={customer._id}>
                    {customer.fullname}
                  </option>
                )
              })}
            </Field>
            <Field name="machine"
                   component={renderSelectField}
                   label="Máquina">
              <option value="">Selecciona una máquina...</option>
              {machines.map(machine => {
                return (
                  <option value={machine._id} key={machine._id}>
                    {machine.serial}
                  </option>
                )
              })}
            </Field>
            <Field name="description"
                   component={renderTextAreaField}
                   label="Descripción"/>
          </Box>
          { error && <div className="alert alert-danger">{error}</div> }
          <button className="btn bg-vw-light mr-1" type="submit"
                  disabled={this.props.pristine || this.props.submitting}>
            Crear
          </button>
        </form>
      </div>
    )
  }
}

IncidenceCreateForm = reduxForm({
  form: 'IncidenceCreateForm',
  onSubmitSuccess: (result, dispatch, props) => {
    props.push(`/incidences/${result.response.number}`)
  },
  enableReinitialize: true
})(IncidenceCreateForm)

const mapStateToProps = state => ({
  machines: state.machines.machines,
  customers: state.customers.customers
})

const mapDispatchToProps = dispatch => ({
  addIncidence: bindActionCreators(addIncidence, dispatch),
  fetchMachines: bindActionCreators(fetchMachines, dispatch),
  fetchCustomers: bindActionCreators(fetchCustomers, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IncidenceCreateForm)

