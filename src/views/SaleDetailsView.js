import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as dateFormat from 'dateformat'

import Box from '../components/Box'
import PropertyLabel from '../components/PropertyLabel'
import SoldItemList from '../components/SoldItemsList'
import ErrorMessage from '../components/ErrorMessage'

import { fetchSale } from '../actions/sales'

class SaleDetailsView extends React.Component {
  componentDidMount() {
    this.props.fetchSale(this.props.match.params.number)
  }

  render() {
    const { sale, error, loading, auth } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!sale || loading) {
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col">
            <h1>
              <span className="text-vw-dark">DETALLES DE LA </span>
              <span className="text-vw-light">VENTA</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Box title="Resumen" icon="sliders-h">
              <div className="row">
                <div className="col col-12 col-xs-12 col-md-6">
                  <PropertyLabel name="Numero"
                                 value={sale.number} />
                  <PropertyLabel name="Venta"
                                 value={dateFormat(new Date(sale.date), 'dd/mm/yy HH:MM')} />
                  <PropertyLabel name="Cliente"
                                 value={sale.customer.fullname} />
                  <PropertyLabel name="Máquina"
                                 value={sale.machine.serial} />
                  <PropertyLabel name="Código"
                                 value={sale.code} />
                </div>
                <div className="col col-12 col-xs-12 col-md-6">
                  <PropertyLabel name="Método de pago"
                                 value={sale.paymentMethod} />
                  <PropertyLabel name="Origen"
                                 value={sale.origin} />
                  <PropertyLabel name="Otros detalles" ml
                                 value={sale.details} />
                </div>
              </div>
            </Box>
            <Box title="Artículos vendidos" icon="shopping-cart">
              <SoldItemList items={sale.items} currency={sale.contract.currency} auth={auth}/>
              { auth.type !== 'LIMITED' &&
                <div className="d-flex justify-content-end">
                  <h2 className="mr-3">Total:</h2>
                  <h3>{`${parseFloat(sale.amount).toFixed(2)} ${sale.contract.currency}`}</h3>
                </div>
              }
            </Box>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sale: state.sales.sale,
  loading: state.sales.loading,
  error: state.sales.error,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  fetchSale: bindActionCreators(fetchSale, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleDetailsView)



