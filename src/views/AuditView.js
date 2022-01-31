import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchAudits, fetchAuditsCSV } from '../actions/audits'

import Box from '../components/Box'
import ErrorMessage from '../components/ErrorMessage'
import AuditEntryList from '../components/AuditEntryList'

import AuditFilterForm from '../forms/AuditFilterForm'

class AuditView extends React.Component {
  constructor(props) {
    super(props)

    this.handleCSV = this.handleCSV.bind(this)
  }

  componentDidMount() {
    const today = new Date().toISOString().substring(0, 10)
    this.props.fetchAudits('', '', today, today)
  }

  handleCSV() {
    const { fetchAuditsCSV, form } = this.props

    fetchAuditsCSV(
      form.AuditFilterForm.values.machine,
      form.AuditFilterForm.values.type,
      form.AuditFilterForm.values.startDate,
      form.AuditFilterForm.values.endDate
    )
  }

  renderAudits() {
    const { audits, error, loading } = this.props

    if (error) {
      return (<ErrorMessage message={error.message}/>)
    }

    if (!audits || loading) {
      return (<h3>Cargando...</h3>)
    }
      
    return (<AuditEntryList audits={audits}/>)
  }

  render() {

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1 className="text-vw-dark">
              AUDIT
            </h1>
          </div>
        </div>
        <Box title="Filtro" icon="filter">
          <AuditFilterForm/>
        </Box>
        <div className="row mb-3">
          <div className="col text-right">
            <button className="btn bg-vw-excel text-white" onClick={this.handleCSV}>
              <i className="fas fa-file-excel mr-1"></i>Descargar
            </button>
          </div>
        </div>
        <Box title="Registros">
          { this.renderAudits() }
        </Box>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  audits: state.audits.audits,
  error: state.audits.error,
  loading: state.audits.loading,
  form: state.form
})

const mapDispatchToProps = dispatch => ({
  fetchAudits: bindActionCreators(fetchAudits, dispatch),
  fetchAuditsCSV: bindActionCreators(fetchAuditsCSV, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AuditView)


