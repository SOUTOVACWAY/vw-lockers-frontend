import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchSales, fetchSalesCSV } from '../actions/sales'

import Box from '../components/Box'
import SaleList from '../components/SaleList'
import ErrorMessage from '../components/ErrorMessage'
import PropertyLabel from '../components/PropertyLabel'
import SalesPlots from '../components/SalesPlots'

import SalesFilterForm from '../forms/SalesFilterForm'

class SalesView extends React.Component {
  constructor(props) {
    super(props)

    this.handleSalesCSV = this.handleSalesCSV.bind(this)
  }

  componentDidMount() {
    const today = new Date().toISOString().substring(0, 10)
    this.props.fetchSales('', '', today, today)
  }

  computeSalesTotals() {
    const { sales } = this.props

    const itemIndices = new Map([
      ['VWPACK', 0],
      ['VWLAY', 1],
      ['VWGO', 2]
    ])

    let total = 0

    let totalsPerMethod = new Map([
      ['CASH', [0, 0, 0]],
      ['TPV', [0, 0, 0]],
      ['TOKEN', [0, 0, 0]]
    ])

    let totalsPerItem = new Map([
      ['VWPACK', 0],
      ['VWLAY', 0],
      ['VWGO', 0]
    ])

    for (let sale of sales) {
      let totalsPerSaleMethod = totalsPerMethod.get(sale.paymentMethod)

      for (let item of sale.items) {
        let itemTotal = item.qty * item.price

        total += itemTotal
        totalsPerSaleMethod[itemIndices.get(item.item)] += itemTotal
        totalsPerItem.set(item.item, totalsPerItem.get(item.item) + itemTotal)
      }

      totalsPerMethod.set(sale.paymentMethod, totalsPerSaleMethod)
    }

    return {
      total: total,
      totalsPerMethod: totalsPerMethod,
      totalsPerItem: totalsPerItem
    }
  }

  handleSalesCSV() {
    const { fetchSalesCSV, form } = this.props

    fetchSalesCSV(form.SalesFilterForm.values.machine,
                  form.SalesFilterForm.values.customer,
                  form.SalesFilterForm.values.startDate,
                  form.SalesFilterForm.values.endDate)
  }

  renderSalesTotals() {
    const { sales, error, loading, auth } = this.props

    if (auth.type === 'LIMITED') {
      return null
    }

    if (error) {
      return (<ErrorMessage message={error.message}/>)
    }

    if (!sales || loading) {
      return (<h3>Cargando...</h3>)
    }

    let totals = this.computeSalesTotals()

    return (
      <div className="p-3 mb-3 rounded box-shadow bg-vw-darkest text-white text-center">
        <div className="p-3 bg-white rounded text-vw-dark">
          <div className="d-flex justify-content-between">
            <h5>TOTAL:</h5>
            <h5 className="text-vw-light">{`${totals.total} EUR`}</h5>
          </div>
          <hr className="bg-vw-light"/>
          <div className="row">
            <div className="col">
              <h6 className="text-left text-vw-light">Productos</h6>
              <PropertyLabel name="VACWAYpack" value={`${totals.totalsPerItem.get('VWPACK')} EUR`}/>
              <PropertyLabel name="VACWAYlay" value={`${totals.totalsPerItem.get('VWLAY')} EUR`}/>
              <PropertyLabel name="VACWAYgo!" value={`${totals.totalsPerItem.get('VWGO')} EUR`}/>
            </div>
            <div className="col">
              <h6 className="text-left text-vw-light">Métodos de pago</h6>
              <PropertyLabel name="CASH" value={
                `${totals.totalsPerMethod.get('CASH').reduce((acc, currVal) => acc + currVal)} EUR`
                }/>
              <PropertyLabel name="TPV" value={
                `${totals.totalsPerMethod.get('TPV').reduce((acc, currVal) => acc + currVal)} EUR`
                }/>
              <PropertyLabel name="TOKEN" value={
                `${totals.totalsPerMethod.get('TOKEN').reduce((acc, currVal) => acc + currVal)} EUR`
                }/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSalesStats() {
    return (
      <Box title="Estadísticas" icon="chart-bar">
        <SalesPlots sales={this.props.sales}/>
      </Box>
    )
  }

  renderSales() {
    const { sales, error, loading, auth } = this.props

    if (error) {
      return (<ErrorMessage message={error.message}/>)
    }

    if (!sales || loading) {
      return (<h3>Cargando...</h3>)
    }

    return (
      <div>
        { auth.type !== 'LIMITED' && this.renderSalesStats() }
        <Box title="Listado">
          { auth.type !== 'LIMITED' &&
            <div className="row mb-3">
              <div className="col text-right">
                <button className="btn bg-vw-excel text-white" onClick={this.handleSalesCSV}>
                  <i className="fas fa-file-excel mr-1"></i>Descargar
                </button>
              </div>
            </div>
          }
          <SaleList auth={auth}/>
        </Box>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1 className="text-vw-dark">
              VENTAS
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 col-lg-6">
            <Box title="Filtro" icon="filter">
              <SalesFilterForm/>
            </Box>
          </div>
          <div className="col col-12 col-lg-6">
            { this.renderSalesTotals() }
          </div>
        </div>
        { this.renderSales() }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sales: state.sales.sales,
  error: state.sales.error,
  loading: state.sales.loading,
  auth: state.auth,
  form: state.form
})

const mapDispatchToProps = dispatch => ({
  fetchSales: bindActionCreators(fetchSales, dispatch),
  fetchSalesCSV: bindActionCreators(fetchSalesCSV, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesView)


