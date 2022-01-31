import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchUpdates } from '../actions/updates'

import UpdateList from '../components/UpdateList'
import ErrorMessage from '../components/ErrorMessage'

class UpdatesView extends React.Component {
  componentDidMount() {
    this.props.fetchUpdates()
  }

  render() {
    const { updates, loading, error } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!updates || loading) {
      return (
        <h3>Loading...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1 className="text-vw-dark">ACTUALIZACIONES</h1>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 text-right">
            <Link to="/updates/add">
              <button type="button" className="btn bg-vw-light text-white">
                <i className="fas fa-plus mr-1"></i>Añadir
              </button>
            </Link>
          </div>
        </div>
        <UpdateList updates={updates} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  updates: state.updates.updates,
  error: state.updates.error,
  loading: state.updates.loading
})

const mapDispatchToProps = dispatch => ({
  fetchUpdates: bindActionCreators(fetchUpdates, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdatesView)

