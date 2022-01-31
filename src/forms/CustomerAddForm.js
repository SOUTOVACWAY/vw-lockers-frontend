import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import Box from '../components/Box'
import { addCustomer } from '../actions/customers'
import { renderInputField, renderTextAreaField } from '../utils/forms'

class CustomerAddForm extends React.Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  submit(props) {
    return this.props.addCustomer(props)
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
    const { error, pristine, submitting, handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <h1>
          <span className="text-vw-dark">NUEVO </span>
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

CustomerAddForm = reduxForm({
  form: 'CustomerAddForm',
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch, props) => {
    props.push(`/customers/${result.response.number}`)
  }
})(CustomerAddForm)

const mapDispatchToProps = dispatch => ({
  addCustomer: bindActionCreators(addCustomer, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(() => ({}), mapDispatchToProps)(CustomerAddForm)

