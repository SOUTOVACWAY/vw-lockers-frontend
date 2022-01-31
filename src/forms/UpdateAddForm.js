import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import Box from '../components/Box'
import { addUpdate } from '../actions/updates'
import { renderInputField } from '../utils/forms'

class UpdateAddForm extends React.Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  submit(props) {
    return this.props.addUpdate(props)
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
        <h1 className="text-vw-dark">NUEVA ACTUALIZACIÓN</h1>
        <Box title="Actualización" icon="sun">
          <Field name="version"
                 type="text"
                 component={renderInputField}
                 label="Versión"/>
          <Field name="applies_to"
                 type="text"
                 component={renderInputField}
                 label="Aplica a (RegEx):"/>
          <Field name="download_url"
                 type="text"
                 component={renderInputField}
                 label="URL de descarga"/>
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

UpdateAddForm = reduxForm({
  form: 'UpdateAddForm',
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch, props) => {
    props.push(`/updates/${result.response._id}`)
  }
})(UpdateAddForm)

const mapDispatchToProps = dispatch => ({
  addUpdate: bindActionCreators(addUpdate, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(() => ({}), mapDispatchToProps)(UpdateAddForm)

