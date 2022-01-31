import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import Box from '../components/Box'
import ErrorMessage from '../components/ErrorMessage'

import { addShipment } from '../actions/shipments'
import { fetchCustomers } from '../actions/customers'

import { renderInputField, renderSelectField, renderTextAreaField } from '../utils/forms'

class NewShipmentForm extends React.Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { fetchCustomers } = this.props

    fetchCustomers()
  }

  submit(props) {
    const { addShipment } = this.props

    return addShipment(props)
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
    const { customers, error } = this.props

    if (!customers) {
      return null
    }

    if (customers.length === 0) {
      return (
        <ErrorMessage message="No hay clientes disponibles"/>
      )
    }

    return (
      <div>
        <h1>
          <span className="text-vw-dark">NUEVO </span>
          <span className="text-vw-light">ENVÍO</span>
        </h1>

        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Box title="Envío" icon="truck">
            <Field name="customer"
                   component={renderSelectField}
                   label="Cliente">
              <option value="">Selecciona un cliente...</option>
              {customers.map(customer => {
                return (
                  <option value={customer._id} key={customer._id}>
                    {customer.fullname}
                  </option>
                )
              })}
            </Field>
            <Field name="shipment_address"
                   component={renderTextAreaField}
                   label="Dirección de envio:"
            />
            <h6>Artículos</h6>
            <div className="row">
              <div className="col col-12 col-lg-3">
                <Field
                  name="items.VWPACK"
                  type="text"
                  component={renderInputField}
                  label="VWPACK"
                />
              </div>
              <div className="col col-12 col-lg-3">
                <Field
                  name="items.VWLAY"
                  type="text"
                  component={renderInputField}
                  label="VWLAY"
                />
              </div>
              <div className="col col-12 col-lg-3">
                <Field
                  name="items.VWGO"
                  type="text"
                  component={renderInputField}
                  label="VWGO"
                />
              </div>
              <div className="col col-12 col-lg-3">
                <Field
                  name="items.VWPLAY"
                  type="text"
                  component={renderInputField}
                  label="VWPLAY"
                />
              </div>
            </div>
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

NewShipmentForm = reduxForm({
  form: 'NewShipmentForm',
  onSubmitSuccess: (result, dispatch, props) => {
    props.push(`/logistics/${result.response.number}`)
  },
  enableReinitialize: true
})(NewShipmentForm)

const mapStateToProps = state => ({
  customers: state.customers.customers
})

const mapDispatchToProps = dispatch => ({
  addShipment: bindActionCreators(addShipment, dispatch),
  fetchCustomers: bindActionCreators(fetchCustomers, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewShipmentForm)


