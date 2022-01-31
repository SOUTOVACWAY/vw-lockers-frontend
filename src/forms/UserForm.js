import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { renderInputField, renderTextAreaField,
         renderSelectField } from '../utils/forms'

class UserForm extends React.Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field name="username"
               type="text"
               component={renderInputField}
               label="Username*"/>
        <Field name="email"
               type="text"
               component={renderInputField}
               label="E-mail*"/>
        <Field name="password"
               type="password"
               component={renderInputField}
               label="Password*"/>
        <Field name="role"
               component={renderSelectField}
               label="Role">
            <option value="STANDARD" selected="selected">Standard</option>
            <option value="ADMIN">Administrator</option>
        </Field>
        <Field name="fullname"
               type="text"
               component={renderInputField}
               label="Full Name*"/>
        <Field name="address"
               type="text"
               component={renderTextAreaField}
               label="Address"/>
        <Field name="phone"
               type="text"
               component={renderInputField}
               label="Phone"/>
        { error &&
          <div className="alert alert-danger mt-1 mb-1">{error}</div> }
        <button className="btn btn-primary mr-1" type="submit"
                disabled={pristine || submitting}>
          Save
        </button>
        <button className="btn btn-warning" type="button"
                disabled={pristine || submitting} onClick={reset}>
          Clear
        </button>
      </form>
    )
  }
}

UserForm = reduxForm({
  form: 'UserForm',
  enableReinitialize: true
})(UserForm)

UserForm = connect(
  state => ({
    initialValues: state.users.user
  }), {})(UserForm)

export default UserForm

