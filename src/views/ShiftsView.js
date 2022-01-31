import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchShifts } from '../actions/shifts'
import { fetchPromoterSaleStatistics } from '../actions/promotersales'

import Box from '../components/Box'
import ErrorMessage from '../components/ErrorMessage'
import ShiftEntryList from '../components/ShiftEntryList'
import PromoterStats from '../components/PromoterStats'

import ShiftsFilterForm from '../forms/ShiftsFilterForm'

class ShiftsView extends React.Component {
  componentDidMount() {
    const today = new Date().toISOString().substring(0, 10)
    this.props.fetchShifts('', today, today)
    this.props.fetchPromoterSaleStatistics('', today, today)
  }

  renderShifts() {
    const { shifts, error, loading } = this.props.shifts

    if (error) {
      return (<ErrorMessage message={error.message}/>)
    }

    if (!shifts || loading) {
      return (<h3>Cargando...</h3>)
    }
      
    return (<ShiftEntryList shifts={shifts}/>)
  }

  renderPromoterFees() {
    const { stats, error, loading } = this.props.promoterSales

    if (error) {
      return (<ErrorMessage message={error.message}/>)
    }

    if (!stats || loading) {
      return (<h3>Cargando...</h3>)
    }
      
    return (<PromoterStats stats={stats}/>)
  }

  render() {

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1 className="text-vw-dark">
              JORNADAS
            </h1>
          </div>
        </div>
        <Box title="Filtro" icon="filter">
          <ShiftsFilterForm/>
        </Box>
        <Box title="Comisiones del promotor" icon="hand-holding-usd">
          { this.renderPromoterFees() }
        </Box>
        <Box title="Registros">
          { this.renderShifts() }
        </Box>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shifts: state.shifts,
  promoterSales: state.promoterSales,
  form: state.form
})

const mapDispatchToProps = dispatch => ({
  fetchShifts: bindActionCreators(fetchShifts, dispatch),
  fetchPromoterSaleStatistics: bindActionCreators(fetchPromoterSaleStatistics, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShiftsView)


