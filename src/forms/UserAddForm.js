import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import Box from '../components/Box'
import { addUser } from '../actions/users'
import { renderInputField, renderSelectField } from '../utils/forms'

class UserAddForm extends React.Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  submit(props) {
    return this.props.addUser(props)
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
          <span className="text-vw-light">ADMINISTRADOR</span>
        </h1>
        <Box title="Administrador" icon="user">
          <Field name="fullname"
                 type="text"
                 component={renderInputField}
                 label="Nombre"/>
          <Field name="email"
                 type="text"
                 component={renderInputField}
                 label="E-mail"/>
          <Field name="password"
                 type="password"
                 component={renderInputField}
                 label="Password"/>
          <Field name="type"
                 type="type"
                 component={renderSelectField}
                 label="Tipo">
              <option value="">Selecciona un tipo...</option>
              <option value="ROOT">Root</option>
              <option value="LIMITED">Limitado</option>
          </Field>
        </Box>
        { error && <div className="alert alert-danger">{error}</div> }
        <button className="btn bg-vw-light text-white mr-1" type="submit"
                disabled={pristine || submitting}>
          Guardar
        </button>
      </form>
    )
  }
}

UserAddForm = reduxForm({
  form: 'UserAddForm',
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch, props) => {
    props.push(`/users/${result.response.number}`)
  }
})(UserAddForm)

const mapDispatchToProps = dispatch => ({
  addUser: bindActionCreators(addUser, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(() => ({}), mapDispatchToProps)(UserAddForm)

