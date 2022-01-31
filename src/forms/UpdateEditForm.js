import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import Box from '../components/Box'
import ErrorMessage from '../components/ErrorMessage'
import { fetchUpdate, updateUpdate } from '../actions/updates'
import { renderInputField } from '../utils/forms'

class UpdateEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { updates, fetchUpdate, match } = this.props

    if (!updates.update) {
      fetchUpdate(match.params.id)
    } else {
      this.setState({ loaded: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.loaded && nextProps.updates.update) {
      this.setState({ loaded: true })
    }
  }

  submit(props) {
    const { updateUpdate, updates } = this.props

    return updateUpdate(updates.update._id, props)
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
    const { updates, error, pristine, submitting, handleSubmit } = this.props

    if (!this.state.loaded) {
      if (updates.error) {
        return (
          <ErrorMessage message={updates.error.message} />
        )
      }

      return (
        <h3>Loading...</h3>
      )
    }

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <h1 className="text-vw-dark">EDITAR ACTUALIZACIÓN</h1>
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
        <button className="btn btn-primary mr-1" type="submit"
                disabled={pristine || submitting}>
          Guardar
        </button>
      </form>
    )
  }
}

UpdateEditForm = reduxForm({
  form: 'UpdateEditForm',
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch, props) => {
    props.push(`/updates/${result.response._id}`)
  }
})(UpdateEditForm)

const mapStateToProps = state => ({
  updates: state.updates,
  initialValues: state.updates.update
})

const mapDispatchToProps = dispatch => ({
  fetchUpdate: bindActionCreators(fetchUpdate, dispatch),
  updateUpdate: bindActionCreators(updateUpdate, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEditForm)


