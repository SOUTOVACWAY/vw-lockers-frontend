import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form'
import * as cc from 'currency-codes'

import Box from '../components/Box'

import { fetchContract, updateContract } from '../actions/contracts'
import { fetchMachines, resetMachines } from '../actions/machines'
import { fetchCustomers } from '../actions/customers'

import { renderInputField, renderSelectField,
         renderTextAreaField } from '../utils/forms'

class ContractEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      fCustomers: null,
      fMachines: null
    }

    this.load = this.load.bind(this)
    this.renderItems = this.renderItems.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const { fetchContract, fetchMachines, fetchCustomers,
            match } = this.props

    fetchContract(match.params.number)
    fetchMachines()
    fetchCustomers()

    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps)
  }

  load(props) {
    const { contract, machines, customers } = props

    if (!this.state.loaded &&
        contract && machines && customers) {

      this.setState({
        loaded: true,
        fMachines: machines.filter(machine =>
          (machine.customer === undefined) || (machine._id === contract.machine))
      })
    }
  }

  submit(props) {
    const { updateContract, contract } = this.props

    return updateContract(contract.number, props)
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

  renderItems(props) {
    const { fields } = props

    return (
      <div>
        <div className="table-responsive">
          <table className="table table-sm table-stripped">
            <thead className="thead-light">
              <tr>
                <th scope="col">Artículo</th>
                <th scope="col">Precio</th>
                <th scope="col">Stock Inicial</th>
                <th scope="col">Obligado</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((member, index) => (
                <tr key={index}>
                  <td>
                    <Field name={`${member}.item`}
                           component={renderSelectField}>
                      <option value="">Selecciona un artículo...</option>
                      <option value="VWPACK" key="VWPACK">VWPACK</option>
                      <option value="VWLAY" key="VWLAY">VWLAY</option>
                      <option value="VWGO" key="VWGO">VWGO</option>
                      <option value="VWPLAY" key="VWPLAY">VWPLAY</option>
                    </Field>
                  </td>
                  <td>
                    <Field
                      name={`${member}.price`}
                      type="text"
                      component={renderInputField}
                    />
                  </td>
                  <td>
                    <Field
                      name={`${member}.initial_stock`}
                      type="text"
                      component={renderInputField}
                    />
                  </td>
                  <td>
                    <Field
                      name={`${member}.mandatory`}
                      type="checkbox"
                      component="input"
                    />
                  </td>
                  <td>
                    <button className="btn btn-danger mr-1" type="button"
                            onClick={() => fields.remove(index)}>
                      <i className="fas fa-trash mr-1"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <button className="btn bg-vw-light text-white" type="button"
                  onClick={() => fields.push({})}>
            <i className="fas fa-plus mr-1"></i>
            Añadir
          </button>
        </div>
      </div>
    )
  }

  render() {
    const { loaded, fMachines } = this.state
    const { customers, error, pristine, handleSubmit, submitting } = this.props

    if (!loaded) {
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <div>
        <h1>
          <span className="text-vw-dark">EDITAR </span>
          <span className="text-vw-light">CONTRATO</span>
        </h1>

        <form onSubmit={handleSubmit(this.submit)}>
          <Box title="Asignación" icon="arrows-alt-h">
            <Field name="customer"
                   component={renderSelectField}
                   label="Cliente">
              {customers.map(customer => {
                return (
                  <option value={customer._id} key={customer._id}>
                    {customer.fullname}
                  </option>
                )
              })}
            </Field>
            <Field name="machine"
                   component={renderSelectField}
                   label="Máquina">
              {fMachines.map(machine => {
                return (
                  <option value={machine._id} key={machine._id}>
                    {machine.serial}
                  </option>
                )
              })}
            </Field>
            <Field name="location"
                   component={renderInputField}
                   type="text"
                   label="Localización (Lat, Lon)"/>
          </Box>
          <div className="row">
            <div className="col col-12 col-lg-6">
              <Box title="Condiciones" icon="certificate">
                <Field name="startDate"
                       component={renderInputField}
                       type="date"
                       label="Fecha inicio"/>
                <Field name="endDate"
                       component={renderInputField}
                       type="date"
                       label="Fecha final"/>
                <Field name="saleCommission"
                       component={renderInputField}
                       type="text"
                       label="Comisión de venta (%)"/>
                <Field name="advCommission"
                       component={renderInputField}
                       type="text"
                       label="Comisión de publicidad (%)"/>
                <Field name="fixedFee"
                       component={renderInputField}
                       type="text"
                       label="Comisión fija (/mes)"/>
                <Field name="currency"
                       component={renderSelectField}
                       label="Moneda">
                  {cc.codes().map(code => {
                    const name = cc.code(code).currency

                    return (
                      <option value={code} key={code}>
                        {`${code} - ${name}`}
                      </option>
                    )
                  })}
                </Field>
              </Box>
            </div>
            <div className="col col-12 col-lg-6">
              <Box title="Envío de suministros" icon="truck">
                <Field name="supplyContactName"
                       component={renderInputField}
                       type="text"
                       label="Persona de contacto"/>
                <Field name="supplyContactPhone"
                       component={renderInputField}
                       type="phone"
                       label="Teléfono de contacto"/>
                <Field name="supplyShippingAddress"
                       component={renderTextAreaField}
                       label="Dirección"/>
              </Box>
            </div>
          </div>
          <Box title="Artículos" icon="shopping-cart">
            <FieldArray name="items" component={this.renderItems} />
          </Box>
          { error && <div className="alert alert-danger">{error}</div> }
          <button className="btn bg-vw-light text-white mr-1" type="submit"
                  disabled={pristine || submitting}>
            Guardar
          </button>
        </form>
      </div>
    )
  }
}

ContractEditForm = reduxForm({
  form: 'ContractEditForm',
  onSubmitSuccess: (result, dispatch, props) => {
    props.resetMachines()
    props.push(`/contracts/${result.response.number}`)
  },
  enableReinitialize: true
})(ContractEditForm)

const mapStateToProps = state => {
  let startDate = null
  let endDate = null

  if (state.contracts.contract) {
    startDate = state.contracts.contract.startDate
    endDate = state.contracts.contract.endDate
  }

  return {
    contract: state.contracts.contract,
    machines: state.machines.machines,
    customers: state.customers.customers,
    initialValues: {
      ...state.contracts.contract,
      startDate: new Date(startDate).toISOString().substring(0, 10),
      endDate: new Date(endDate).toISOString().substring(0, 10)
    }
  }
}

const mapDispatchToProps = dispatch => ({
  fetchContract: bindActionCreators(fetchContract, dispatch),
  updateContract: bindActionCreators(updateContract, dispatch),
  fetchMachines: bindActionCreators(fetchMachines, dispatch),
  resetMachines: bindActionCreators(resetMachines, dispatch),
  fetchCustomers: bindActionCreators(fetchCustomers, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ContractEditForm)

