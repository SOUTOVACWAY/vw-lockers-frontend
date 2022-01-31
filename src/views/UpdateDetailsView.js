import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Box from '../components/Box'
import PropertyLabel from '../components/PropertyLabel'
import ErrorMessage from '../components/ErrorMessage'

import { fetchUpdate } from '../actions/updates'

class UpdateDetailsView extends React.Component {
  componentDidMount() {
    this.props.fetchUpdate(this.props.match.params.id)
  }

  render() {
    const { update, error, loading } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!update || loading) {
      return (
        <h3>Loading...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-8 col-md-8">
            <h1 className="text-vw-dark">DETALLES ACTUALIZACIÓN</h1>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 text-right">
            <Link to={`/updates/${update._id}/edit`}>
              <button className="btn bg-vw-light text-white mr-1">
                <i className="fas fa-edit mr-1"></i>Editar
              </button>
            </Link>
          </div>
        </div>
          <Box title="Actualización" icon="sun">
            <PropertyLabel name="Versión"
                           value={update.version}/>
            <PropertyLabel name="Aplica a"
                           value={update.applies_to}/>
            <PropertyLabel name="URL de descarga"
                           value={update.download_url}/>
          </Box>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  update: state.updates.update,
  loading: state.updates.loading,
  error: state.updates.error
})

const mapDispatchToProps = dispatch => ({
  fetchUpdate: bindActionCreators(fetchUpdate, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDetailsView)
