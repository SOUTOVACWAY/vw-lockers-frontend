import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import { SubmissionError } from 'redux-form'

import { fetchSales } from '../actions/sales'
import { fetchMachines } from '../actions/machines'
import { fetchCustomers } from '../actions/customers'

import { renderInputField, renderSelectField } from '../utils/forms'

class SalesFilterForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false }

    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { role, fetchMachines, fetchCustomers } = this.props

    fetchMachines()

    if (role === 'ADMIN') {
      fetchCustomers()
    }

    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps)
  }

  load(props) {
    const { role, machines, customers, sales } = props

    if (!sales.loading && sales.salesNeedRefresh) {
      this.submit(this.props.formValues)
    }

    if (!this.state.loaded && machines && (role !== 'ADMIN' || customers)) {
      this.setState({ loaded: true })
    }
  }

  submit(props) {
    return this.props.fetchSales(props.machine, props.customer, props.startDate, props.endDate)
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
    const { error, submitting, handleSubmit, machines, customers, role } = this.props

    if (!loaded) {
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <form onSubmit={handleSubmit(this.submit)} className="mb-3">
        <div className="row">
          <div className="col col-12 col-lg-6">
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
            { role === 'ADMIN' &&
            <Field name="customer"
                   component={renderSelectField}
                   label="Cliente">
              <option value="">Todos</option>
              {customers.map(customer => {
                return (
                  <option value={customer._id} key={customer._id}>
                    {customer.fullname}
                  </option>
                )
              })}
            </Field>
            }
          </div>
          <div className="col col-12 col-lg-6">
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

SalesFilterForm = reduxForm({
  form: 'SalesFilterForm',
})(SalesFilterForm)

const selector = formValueSelector('SalesFilterForm')

const mapStateToProps = state => ({
  machines: state.machines.machines,
  customers: state.customers.customers,
  sales: state.sales,
  role: state.auth.role,
  initialValues: {
    machine: '',
    customer: '',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10)
  },
  formValues: {
    machine: selector(state, 'machine'),
    customer: selector(state, 'customer'),
    startDate: selector(state, 'startDate'),
    endDate: selector(state, 'endDate')
  }
})

const mapDispatchToProps = dispatch => ({
  fetchSales: bindActionCreators(fetchSales, dispatch),
  fetchMachines: bindActionCreators(fetchMachines, dispatch),
  fetchCustomers: bindActionCreators(fetchCustomers, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesFilterForm)
