import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Box from '../components/Box'
import PropertyLabel from '../components/PropertyLabel'
import ErrorMessage from '../components/ErrorMessage'

import { fetchUser } from '../actions/users'

class UserDetailsView extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.number)
  }

  render() {
    const { user, error, loading } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!user || loading) {
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
              <span className="text-vw-light">ADMINISTRADOR</span>
            </h1>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 text-right">
            <Link to={`/users/${user.number}/edit`}>
              <button className="btn bg-vw-light text-white mr-1">
                <i className="fas fa-edit mr-1"></i>Editar
              </button>
            </Link>
          </div>
        </div>
          <Box title="Administrador" icon="user-secret">
            <PropertyLabel name="#"
                           value={user.number}/>
            <PropertyLabel name="Nombre"
                           value={user.fullname}/>
            <PropertyLabel name="E-Mail"
                           value={user.email}/>
            <PropertyLabel name="Tipo"
                           value={user.type}/>
          </Box>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  loading: state.users.loading,
  error: state.users.error
})

const mapDispatchToProps = dispatch => ({
  fetchUser: bindActionCreators(fetchUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsView)
