import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Box from '../components/Box'
import PropertyLabel from '../components/PropertyLabel'
import ErrorMessage from '../components/ErrorMessage'

import { fetchCustomer } from '../actions/customers'

class CustomerDetailsView extends React.Component {
  componentDidMount() {
    this.props.fetchCustomer(this.props.match.params.number)
  }

  render() {
    const { customer, error, loading } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!customer || loading) {
      return (
        <h3>Loading...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-8 col-md-8">
            <h1>
              <span className="text-vw-dark">DETALLES DEL </span>
              <span className="text-vw-light">CLIENTE</span>
            </h1>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 text-right">
            <Link to={`/customers/${customer.number}/edit`}>
              <button className="btn bg-vw-light text-white mr-1">
                <i className="fas fa-edit mr-1"></i>Editar
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Box title="Cliente" icon="user">
              <PropertyLabel name="Número #"
                             value={customer.number}/>
              <PropertyLabel name="Nombre completo"
                             value={customer.fullname}/>
              <PropertyLabel name="Persona de contacto"
                             value={customer.contact_name}/>
              <PropertyLabel name="E-Mail"
                             value={customer.email}/>
              <PropertyLabel name="Dirección"
                             value={customer.address}/>
              <PropertyLabel name="Teléfono 1"
                             value={customer.phone}/>
              <PropertyLabel name="Teléfono 2"
                             value={customer.phone2}/>
              <PropertyLabel name="Fax"
                             value={customer.fax}/>
              <PropertyLabel name="Web"
                             value={customer.web}/>
              <PropertyLabel name="Idioma"
                             value={customer.language}/>
              <PropertyLabel name="Notas" ml
                             value={customer.notes}/>
            </Box>
          </div>
          <div className="col-xs-12 col-md-6">
            <Box title="Facturación" icon="file-alt">
              <PropertyLabel name="NIF/CIF" ml
                             value={customer.invoice_taxid}/>
              <PropertyLabel name="IVA aplicable"
                             value={customer.invoice_tax}/>
              <PropertyLabel name="Razón social"
                             value={customer.social_name}/>
              <PropertyLabel name="Dirección" ml
                             value={customer.invoice_address}/>
            </Box>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  customer: state.customers.customer,
  loading: state.customers.loading,
  error: state.customers.error
})

const mapDispatchToProps = dispatch => ({
  fetchCustomer: bindActionCreators(fetchCustomer, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsView)
