import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import Box from '../components/Box'
import ErrorMessage from '../components/ErrorMessage'
import { fetchUser, updateUser } from '../actions/users'
import { renderInputField, renderSelectField } from '../utils/forms'

class UserEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { users, fetchUser, match } = this.props

    if (!users.user) {
      fetchUser(match.params.serial)
    } else {
      this.setState({ loaded: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.loaded && nextProps.users.user) {
      this.setState({ loaded: true })
    }
  }

  submit(props) {
    const { updateUser, users } = this.props

    return updateUser(users.user.number, props)
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
    const { users, error, pristine, submitting, handleSubmit } = this.props

    if (!this.state.loaded) {
      if (users.error) {
        return (
          <ErrorMessage message={users.error.message} />
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
              <option value="ROOT">Root</option>
              <option value="LIMITED">Limitado</option>
          </Field>
        </Box>
        { error && <div className="alert alert-danger">{error}</div> }
        <button className="btn text-white bg-vw-light mr-1" type="submit"
                disabled={pristine || submitting}>
          Guardar
        </button>
      </form>
    )
  }
}

UserEditForm = reduxForm({
  form: 'UserEditForm',
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch, props) => {
    props.push(`/users/${result.response.number}`)
  }
})(UserEditForm)

const mapStateToProps = state => ({
  users: state.users,
  initialValues: state.users.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: bindActionCreators(fetchUser, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEditForm)


