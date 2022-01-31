import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchCustomers } from '../actions/customers'

import CustomerList from '../components/CustomerList'
import ErrorMessage from '../components/ErrorMessage'

class CustomersView extends React.Component {
  componentDidMount() {
    this.props.fetchCustomers()
  }

  render() {
    const { customers, loading, error } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!customers || loading) {
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1 className="text-vw-dark">CLIENTES</h1>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 text-right">
            <Link to="/customers/add">
              <button type="button" className="btn bg-vw-light text-white">
                <i className="fas fa-plus mr-1"></i>Nuevo
              </button>
            </Link>
          </div>
        </div>
        <CustomerList customers={customers} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  customers: state.customers.customers,
  error: state.customers.error,
  loading: state.customers.loading
})

const mapDispatchToProps = dispatch => ({
  fetchCustomers: bindActionCreators(fetchCustomers, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomersView)

