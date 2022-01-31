import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { SubmissionError } from 'redux-form'

import { fetchMachines } from '../actions/machines'
import { fetchCustomers } from '../actions/customers'
import { fetchShipments } from '../actions/shipments'

import { renderSelectField } from '../utils/forms'

import ErrorMessage from '../components/ErrorMessage'

class LogisticsFilterForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false }

    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { fetchMachines, fetchCustomers } = this.props

    fetchMachines()
    fetchCustomers()

    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps)
  }

  load(props) {
    const { machines, customers } = props

    if (!this.state.loaded && machines.machines && customers.customers) {
      this.setState({ loaded: true })
    } else {
      this.setState({ loaded: false })
    }
  }

  submit(props) {
    this.props.fetchMachines(props.customer)
    this.props.fetchCustomers()

    this.props.fetchShipments(props.customer)
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
    const { error, submitting, handleSubmit, machines, customers } = this.props

    if (machines.error) {
      return (
        <ErrorMessage message={machines.error.message}/>
      )
    }

    if (customers.error) {
      return (
        <ErrorMessage message={machines.error.message}/>
      )
    }

    if (!loaded) {
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <form onSubmit={handleSubmit(this.submit)} className="mb-3">
        <div className="row">
          <div className="col col-12">
            <Field name="customer"
                   component={renderSelectField}
                   label="Cliente">
              <option value="">Todos</option>
              {customers.customers.map(customer => {
                return (
                  <option value={customer._id} key={customer._id}>
                    {customer.fullname}
                  </option>
                )
              })}
            </Field>
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

LogisticsFilterForm = reduxForm({
  form: 'LogisticsFilterForm',
})(LogisticsFilterForm)

const mapStateToProps = state => ({
  machines: state.machines,
  customers: state.customers,
  initialValues: {
    machine: '',
    customer: '',
  }
})

const mapDispatchToProps = dispatch => ({
  fetchMachines: bindActionCreators(fetchMachines, dispatch),
  fetchCustomers: bindActionCreators(fetchCustomers, dispatch),
  fetchShipments: bindActionCreators(fetchShipments, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LogisticsFilterForm)

