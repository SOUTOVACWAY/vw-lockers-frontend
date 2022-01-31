import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchUsers } from '../actions/users'

import UserList from '../components/UserList'
import ErrorMessage from '../components/ErrorMessage'

class UsersView extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const { users, loading, error } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!users || loading) {
      return (
        <h3>Loading...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1 className="text-vw-dark">ADMINISTRADORES</h1>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 text-right">
            <Link to="/users/add">
              <button type="button" className="btn bg-vw-light text-white">
                <i className="fas fa-plus mr-1"></i>Nuevo
              </button>
            </Link>
          </div>
        </div>
        <UserList users={users} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  error: state.users.error,
  loading: state.users.loading
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: bindActionCreators(fetchUsers, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersView)

