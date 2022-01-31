import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import Box from '../components/Box'

import { authLogin } from '../actions/auth'

import LoginForm from '../forms/LoginForm'

class LoginView extends React.Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.success = this.success.bind(this)
  }

  submit(props) {
    return this.props.authLogin(props, true)
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

  success(result) {
    this.props.push('/')
  }

  render() {
    return (
      <div className="h-100 bg-login">
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col col-lg-6">
              <div className="text-center mb-3">
               <img className="logo" src="/images/logo.png" alt="Logo" />
              </div>
              <Box title="Login Administrador" icon="user">
                <LoginForm onSubmit={this.submit}
                           onSubmitSuccess={this.success}/>
              </Box>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  authLogin: bindActionCreators(authLogin, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(() => ({}), mapDispatchToProps)(LoginView)
