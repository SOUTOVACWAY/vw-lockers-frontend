import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchIncidences, fetchIncidencesCSV } from '../actions/incidences'

import Box from '../components/Box'
import IncidenceList from '../components/IncidenceList'
import ErrorMessage from '../components/ErrorMessage'

import IncidencesFilterForm from '../forms/IncidencesFilterForm'

class IncidencesView extends React.Component {
  constructor(props) {
    super(props)

    this.handleIncidencesCSV = this.handleIncidencesCSV.bind(this)
  }

  handleIncidencesCSV() {
    const { fetchIncidencesCSV, form } = this.props

    fetchIncidencesCSV(
      form.IncidencesFilterForm.values.status,
      form.IncidencesFilterForm.values.machine,
      form.IncidencesFilterForm.values.startDate,
      form.IncidencesFilterForm.values.endDate
    )
  }

  renderIncidences() {
    const { incidences, error, loading } = this.props

    if (error) {
      return (<ErrorMessage message={error.message}/>)
    }

    if (!incidences || loading) {
      return (<h3>Loading...</h3>)
    }

    return (
      <IncidenceList incidences={incidences} />
    )
  }

  render() {  
    const { role } = this.props

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1 className="text-vw-dark">
              INCIDENCIAS
            </h1>
          </div>
          { role === 'ADMIN' &&
            <div className="col-xs-12 col-sm-6 col-md-6 text-right">
              <Link to="/incidences/create">
                <button type="button" className="btn bg-vw-light text-white">
                  <i className="fas fa-plus mr-1"></i>Nueva
                </button>
              </Link>
            </div>
          }
        </div>
        <Box title="Filtro" icon="filter">
            <IncidencesFilterForm/>
        </Box>
        <div className="row mb-3">
          <div className="col text-right">
            <button className="btn bg-vw-excel text-white" onClick={this.handleIncidencesCSV}>
              <i className="fas fa-file-excel mr-1"></i>Descargar
            </button>
          </div>
        </div>
        { this.renderIncidences() }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  incidences: state.incidences.incidences,
  error: state.incidences.error,
  loading: state.incidences.loading,
  role: state.auth.role,
  form: state.form
})

const mapDispatchToProps = dispatch => ({
  fetchIncidences: bindActionCreators(fetchIncidences, dispatch),
  fetchIncidencesCSV: bindActionCreators(fetchIncidencesCSV, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IncidencesView)

