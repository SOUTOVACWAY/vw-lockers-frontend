import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { renderInputField } from '../utils/forms'

class LoginForm extends React.Component {
  render() {
    const { error, handleSubmit, pristine, submitting } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field name="email"
               type="text"
               component={renderInputField}
               label="E-mail"/>
        <Field name="password"
               type="password"
               component={renderInputField}
               label="Password"/>
        <button className="btn bg-vw-light text-white mr-1 mb-1" type="submit"
                disabled={pristine || submitting}>
          Login
        </button>
        { error && <div className="alert alert-danger">{error}</div> }
      </form>
    )
  }
}

LoginForm = reduxForm({
  form: 'LoginForm',
  enableReinitialize: true
})(LoginForm)

export default LoginForm

