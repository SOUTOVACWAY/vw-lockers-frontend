import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import Box from '../components/Box'
import ErrorMessage from '../components/ErrorMessage'
import { fetchReport, updateReport } from '../actions/reports'
import { renderInputField, renderSelectField, renderTextAreaField } from '../utils/forms'
import { fetchCustomers } from '../actions/customers'

class ReportEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { reports, fetchReport, fetchCustomers, match } = this.props
    fetchCustomers()
    if (!reports.report) {
      fetchReport(match.params.number)
    } else {
      this.setState({ loaded: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.loaded && nextProps.reports.report) {
      this.setState({ loaded: true })
    }
  }

  submit(props) {
    const { updateReport, reports } = this.props

    return updateReport(reports.report.number, props)
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
    const { reports, customers, error, pristine, submitting, handleSubmit } = this.props

    if (!customers) {
      return null
    }
    
    if (!this.state.loaded) {
      if (reports.error) {
        return (
          <ErrorMessage message={reports.error.message} />
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
            <span className="text-vw-light">REPORT</span>
          </h1>
          <div className="row">
            <div className="col">
              <Box title="Datos Generales">
                  <Field name="start_date"
                      component={renderInputField}
                      type="date"
                      label="Fecha de inicio"/>
  
                  <Field name="finish_date"
                      component={renderInputField}
                      type="date"
                      label="Fecha de fin"/>
                  <Field name="motive"
                      component={renderSelectField}
                      label="Motivo">
                      <option value="Reparaci??n">Reparaci??n</option>
                      <option value="Entrega">Entrega</option>
                      <option value="Marqueting">Marqueting</option>
                      <option value="Promotor">Promotor</option>
                      <option value="Reuni??n">Reuni??n</option>
                  </Field>
              </Box>
              <Box title="Cliente 1">
                  <Field name="customer1"
                      component={renderSelectField}
                      label="Cliente 1">
                  {customers.map(customer => {
                      return (
                      <option value={customer.fullname} key={customer.fullname}>
                          {customer.fullname}
                      </option>
                      )
                  })}
                  </Field>
                  <Field name="customer1_start"
                          type="text"
                          component={renderInputField}
                          label="Inicio del servicio (h)"/>
                   <Field name="customer1_end"
                          type="text"
                          component={renderInputField}
                          label="Fin del servicio (h)"/>
              </Box>
              <Box title="Cliente 2">
                  <Field name="customer2"
                      component={renderSelectField}
                      label="Cliente 2">
                      <option value="">Selecciona a un cliente...</option>
                  {customers.map(customer => {
                      return (
                      <option value={customer.fullname} key={customer.fullname}>
                          {customer.fullname}
                      </option>
                      )
                  })}
                  </Field>
                  <Field name="customer2_start"
                          type="text"
                          component={renderInputField}
                          label="Inicio del servicio (h)"/>
                   <Field name="customer2_end"
                          type="text"
                          component={renderInputField}
                          label="Fin del servicio (h)"/>
              </Box>
              <Box title="Cliente 3">
                  <Field name="customer3"
                      component={renderSelectField}
                      label="Cliente 3">
                      <option value="">Selecciona a un cliente...</option>
                  {customers.map(customer => {
                      return (
                      <option value={customer.fullname} key={customer.fullname}>
                          {customer.fullname}
                      </option>
                      )
                  })}
                  </Field>
                  <Field name="customer3_start"
                          type="text"
                          component={renderInputField}
                          label="Inicio del servicio (h)"/>
                   <Field name="customer3_end"
                          type="text"
                          component={renderInputField}
                          label="Fin del servicio (h)"/>
              </Box>
              <Box title="Cliente 4">
                  <Field name="customer4"
                      component={renderSelectField}
                      label="Cliente 4">
                      <option value="">Selecciona a un cliente...</option>
                  {customers.map(customer => {
                      return (
                      <option value={customer.fullname} key={customer.fullname}>
                          {customer.fullname}
                      </option>
                      )
                  })}
                  </Field>
                  <Field name="customer4_start"
                          type="text"
                          component={renderInputField}
                          label="Inicio del servicio (h)"/>
                   <Field name="customer4_end"
                          type="text"
                          component={renderInputField}
                          label="Fin del servicio (h)"/>
              </Box>
              <Box title="Personal">
                  <Field name="personal1"
                      component={renderSelectField}
                      label="Personal 1">
                      <option value="">Selecciona personal...</option>
                      <option value="Alex">Alex</option>
                      <option value="Daniel">Daniel</option>
                      <option value="Javier">Javier</option>
                      <option value="Joaquin">Joaquin</option>
                  </Field>
                  <Field name="personal2"
                      component={renderSelectField}
                      label="Personal 2">
                      <option value="">Selecciona personal...</option>
                      <option value="Alex">Alex</option>
                      <option value="Daniel">Daniel</option>
                      <option value="Javier">Javier</option>
                      <option value="Joaquin">Joaquin</option>
                  </Field>
                  <Field name="personal3"
                      component={renderSelectField}
                      label="Personal 3">
                      <option value="">Selecciona personal...</option>
                      <option value="Alex">Alex</option>
                      <option value="Daniel">Daniel</option>
                      <option value="Javier">Javier</option>
                      <option value="Joaquin">Joaquin</option>
                  </Field>
                  <Field name="personal4"
                      component={renderSelectField}
                      label="Personal 4">
                      <option value="">Selecciona personal...</option>
                      <option value="Alex">Alex</option>
                      <option value="Daniel">Daniel</option>
                      <option value="Javier">Javier</option>
                      <option value="Joaquin">Joaquin</option>
                  </Field>
            </Box>
            
            </div>
            <div className="col">

            <Box title="COCHE VACWAY">
                  <Field name="coche_start"
                          type="text"
                          component={renderInputField}
                          label="Inicio del servicio (km)"/>
                  <Field name="coche_end"
                          type="text"
                          component={renderInputField}
                          label="Fin del servicio (km)"/>
            </Box>

            <Box title="HOTEL">
                  <Field name="hotel_price"
                          type="text"
                          component={renderInputField}
                          label="Importe del hotel (???)"/>
            </Box>
            <Box title="TRANSPORTE">
                <Field name="transporte"
                    component={renderSelectField}
                    label="Transporte">
                    <option value="">Selecciona el transporte...</option>
                    <option value="Avion">Avi??n</option>
                    <option value="Barco">Barco</option>
                    <option value="Tren">Tren</option>
                    <option value="Metro">Metro</option>
                    <option value="Coche">Coche</option>
                </Field>
                <Field name="transporte_price"
                        type="text"
                        component={renderInputField}
                        label="Importe del transporte (???)"/>
          </Box>
  
            <Box title="Gastos variables">
                  <Field name="concept1"
                          type="text"
                          component={renderInputField}
                          label="Concepto 1"/>
                  <Field name="concept1_price"
                          type="text"
                          component={renderInputField}
                          label="Importe (???)"/>
                  
                  <Field name="concept2"
                          type="text"
                          component={renderInputField}
                          label="Concepto 2"/>
                  <Field name="concept2_price"
                          type="text"
                          component={renderInputField}
                          label="Importe (???)"/>
                  
                  <Field name="concept3"
                          type="text"
                          component={renderInputField}
                          label="Concepto 3"/>
                  <Field name="concept3_price"
                          type="text"
                          component={renderInputField}
                          label="Importe (???)"/>
                  
                  <Field name="concept4"
                          type="text"
                          component={renderInputField}
                          label="Concepto 4"/>
                  <Field name="concept4_price"
                          type="text"
                          component={renderInputField}
                          label="Importe (???)"/>
                  
                  <Field name="concept5"
                          type="text"
                          component={renderInputField}
                          label="Concepto 5"/>
                  <Field name="concept5_price"
                          type="text"
                          component={renderInputField}
                          label="Importe (???)"/>
                  
                  <Field name="description"
                      component={renderTextAreaField}
                      label="Descripci??n"/>
                  
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

  ReportEditForm = reduxForm({
    form: 'ReportEditForm',
    enableReinitialize: true,
    onSubmitSuccess: (result, dispatch, props) => {
      props.push(`/reports/${result.response.number}`)
    }
  })(ReportEditForm)
  
  const mapStateToProps = state => ({
    reports: state.reports,
    customers: state.customers.customers,
    initialValues: state.reports.report
  })
  
  const mapDispatchToProps = dispatch => ({
    fetchReport: bindActionCreators(fetchReport, dispatch),
    updateReport: bindActionCreators(updateReport, dispatch),
    fetchCustomers: bindActionCreators(fetchCustomers, dispatch),
    push: bindActionCreators(push, dispatch)
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(ReportEditForm)
  
  
  