import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchReports } from '../actions/reports'

import ReportList from '../components/ReportList'
import ErrorMessage from '../components/ErrorMessage'

class ReportsView extends React.Component {
  componentDidMount() {
    this.props.fetchReports()
  }

  render() {
    const { reports, loading, error } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!reports || loading) {
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1 className="text-vw-dark">REPORTES</h1>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 text-right">
            <Link to="/reports/add">
              <button type="button" className="btn bg-vw-light text-white">
                <i className="fas fa-plus mr-1"></i>Nuevo
              </button>
            </Link>
          </div>
        </div>
        <ReportList reports={reports} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reports: state.reports.reports,
  error: state.reports.error,
  loading: state.reports.loading
})

const mapDispatchToProps = dispatch => ({
  fetchReports: bindActionCreators(fetchReports, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportsView)