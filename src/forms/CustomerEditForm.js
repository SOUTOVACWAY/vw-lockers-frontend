import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import Box from '../components/Box'
import ErrorMessage from '../components/ErrorMessage'
import { fetchCustomer, updateCustomer } from '../actions/customers'
import { renderInputField, renderTextAreaField } from '../utils/forms'

class CustomerEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { customers, fetchCustomer, match } = this.props

    if (!customers.customer) {
      fetchCustomer(match.params.number)
    } else {
      this.setState({ loaded: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.loaded && nextProps.customers.customer) {
      this.setState({ loaded: true })
    }
  }

  submit(props) {
    const { updateCustomer, customers } = this.props

    return updateCustomer(customers.customer.number, props)
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
    const { customers, error, pristine, submitting, handleSubmit } = this.props

    if (!this.state.loaded) {
      if (customers.error) {
        return (
          <ErrorMessage message={customers.error.message} />
        )
      }

      return (
        <h3>Loading...</h3>
      )
    }

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <h1>
          <span className="text-vw-dark">EDITAR </span>
          <span className="text-vw-light">CLIENTE</span>
        </h1>
        <div className="row">
          <div className="col">
            <Box title="Cliente" icon="user">
              <Field name="fullname"
                     type="text"
                     component={renderInputField}
                     label="Nombre completo"/>
              <Field name="contact_person"
                     type="text"
                     component={renderInputField}
                     label="Persona de contacto"/>
              <Field name="email"
                     type="text"
                     component={renderInputField}
                     label="E-mail"/>
              <Field name="password"
                     type="password"
                     component={renderInputField}
                     label="Password"/>
              <Field name="address"
                     type="text"
                     component={renderTextAreaField}
                     label="Dirección"/>
              <Field name="phone"
                     type="text"
                     component={renderInputField}
                     label="Teléfono 1"/>
              <Field name="phone2"
                     type="text"
                     component={renderInputField}
                     label="Teléfono 2"/>
              <Field name="fax"
                     type="text"
                     component={renderInputField}
                     label="Fax"/>
              <Field name="web"
                     type="text"
                     component={renderInputField}
                     label="Web"/>
              <Field name="language"
                     type="text"
                     component={renderInputField}
                     label="Idioma"/>
              <Field name="notes"
                     type="text"
                     component={renderTextAreaField}
                     label="Notas"/>
            </Box>
          </div>
          <div className="col">
            <Box title="Facturación" icon="file-alt">
              <Field name="invoice_taxid"
                     type="text"
                     component={renderInputField}
                     label="NIF/CIF"/>
              <Field name="invoice_tax"
                     type="text"
                     component={renderInputField}
                     label="IVA aplicable"/>
              <Field name="social_name"
                     type="text"
                     component={renderInputField}
                     label="Razón social"/>
              <Field name="invoice_address"
                     type="text"
                     component={renderTextAreaField}
                     label="Dirección"/>
            </Box>
          </div>
        </div>
        { error && <div className="alert alert-danger">{error}</div> }
        <button className="btn bg-vw-light text-white mr-1" type="submit"
                disabled={pristine || submitting}>
          Guardar
        </button>
      </form>
    )
  }
}

CustomerEditForm = reduxForm({
  form: 'CustomerEditForm',
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch, props) => {
    props.push(`/customers/${result.response.number}`)
  }
})(CustomerEditForm)

const mapStateToProps = state => ({
  customers: state.customers,
  initialValues: state.customers.customer
})

const mapDispatchToProps = dispatch => ({
  fetchCustomer: bindActionCreators(fetchCustomer, dispatch),
  updateCustomer: bindActionCreators(updateCustomer, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEditForm)


