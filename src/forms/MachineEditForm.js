import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import Box from '../components/Box'
import ErrorMessage from '../components/ErrorMessage'
import { fetchMachine, updateMachine } from '../actions/machines'
import { renderInputField, renderSelectField, renderTextAreaField } from '../utils/forms'

class MachineEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { machines, fetchMachine, match } = this.props

    if (!machines.machine) {
      fetchMachine(match.params.serial)
    } else {
      this.setState({ loaded: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.loaded && nextProps.machines.machine) {
      this.setState({ loaded: true })
    }
  }

  submit(props) {
    const { updateMachine, machines } = this.props

    return updateMachine(machines.machine.serial, props)
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
    const { machines, error, pristine, submitting, handleSubmit } = this.props

    if (!this.state.loaded) {
      if (machines.error) {
        return (
          <ErrorMessage message={machines.error.message} />
        )
      }

      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <h1>
          <span className="text-vw-dark">EDITAR </span>
          <span className="text-vw-light">MÁQUINA</span>
        </h1>
        <Box title="Máquina" icon="cubes">
          <Field name="type"
                 component={renderSelectField}
                 value={machines.machine.type}
                 label="Modelo">
              <option value="VACWAYone">VACWAYone</option>
              <option value="VACWAYmini">VACWAYmini</option>
          </Field>
          <Field name="build_date"
                 component={renderInputField}
                 type="date"
                 label="Fecha de fabricación"/>
          <Field name="comments"
                 type="text"
                 component={renderTextAreaField}
                 label="Comentarios"/>
        </Box>
        <Box title="TPV" icon="credit-card">
          <Field name="tpv_serial"
                 type="text"
                 component={renderInputField}
                 label="Número de serie"/>
          <Field name="tpv_tcod"
                 type="text"
                 component={renderInputField}
                 label="TCOD"/>
          <Field name="tpv_max"
                 type="text"
                 component={renderInputField}
                 label="Cargo máximo"/>
        </Box>
        <Box title="Comisiones del promotor" icon="hand-holding-usd">
          <Field name="promoter_fees.VWPACK"
                 type="text"
                 component={renderInputField}
                 label="VACWAYpack"/>
          <Field name="promoter_fees.VWLAY"
                 type="text"
                 component={renderInputField}
                 label="VACWAYlay"/>
          <Field name="promoter_fees.VWGO"
                 type="text"
                 component={renderInputField}
                 label="VACWAYgo!"/>
        </Box>
        <Box title="Otros">
          <Field name="pin"
                 type="text"
                 component={renderInputField}
                 label="Pin"/>
          <Field name="sound_interval"
                 type="text"
                 component={renderInputField}
                 label="Intervalo entre sonidos (minutos)"/>
          <Field name="night_mode_start"
                 type="text"
                 component={renderInputField}
                 label="Inicio del modo sleep (h)"/>
          <Field name="night_mode_end"
                 type="text"
                 component={renderInputField}
                 label="Fin del modo sleep (h)"/>
          <Field name="token_value"
                 type="text"
                 component={renderInputField}
                 label="Valor del token (EUR)"/>
          <Field name="token_sale_value"
                 type="text"
                 component={renderInputField}
                 label="Valor de venta del token (EUR)"/>
          <Field name="report_email"
                 type="text"
                 component={renderInputField}
                 label="E-mail de reportes"/>
          <Field name="bubbles_intensity"
                 type="text"
                 component={renderInputField}
                 label="Intensidad de burbujas (%)"/>
          <Field name="reset_no_internet"
                 type="checkbox"
                 component={renderInputField}
                 label="Reset sin conectividad"/>
          <Field name="enable_standby"
                 type="checkbox"
                 component={renderInputField}
                 label="Habilitar modo stand-by"/>
          <Field name="has_promoter"
                 type="checkbox"
                 component={renderInputField}
                 label="Gestionada por promotor"/>
          <Field name="promoter_report_from_day"
                 type="date"
                 component={renderInputField}
                 label="Día de inicio de reportes"/>
          <Field name="promoter_report_to_day"
                 type="date"
                 component={renderInputField}
                 label="Día de fin de reportes"/>
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

MachineEditForm = reduxForm({
  form: 'MachineEditForm',
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch, props) => {
    props.push(`/machines/${result.response.serial}`)
  }
})(MachineEditForm)

const mapStateToProps = state => {
  let build_date = null
  let promoter_report_from_day = null
  let promoter_report_to_day = null

  if (state.machines.machine) {
    build_date = state.machines.machine.build_date
    promoter_report_from_day = state.machines.machine.promoter_report_from_day
    promoter_report_to_day = state.machines.machine.promoter_report_to_day
  }

  return {
    machines: state.machines,
    initialValues: {
      ...state.machines.machine,
      build_date: new Date(build_date).toISOString().substring(0, 10),
      promoter_report_from_day: new Date(promoter_report_from_day).toISOString().substring(0, 10),
      promoter_report_to_day: new Date(promoter_report_to_day).toISOString().substring(0, 10)
    }
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMachine: bindActionCreators(fetchMachine, dispatch),
  updateMachine: bindActionCreators(updateMachine, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MachineEditForm)

