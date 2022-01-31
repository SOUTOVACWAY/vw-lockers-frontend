import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchContracts } from '../actions/contracts'

import ContractList from '../components/ContractList'
import ErrorMessage from '../components/ErrorMessage'

class ContractsView extends React.Component {
  componentDidMount() {
    this.props.fetchContracts()
  }

  render() {
    const { contracts, error, role } = this.props

    if (error) {
      return (<ErrorMessage message={error.message}/>)
    }

    if (!contracts) {
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1 className="text-vw-dark">
              CONTRATOS
            </h1>
          </div>
          { role === 'ADMIN' &&
            <div className="col-xs-12 col-sm-6 col-md-6 text-right">
              <Link to="/contracts/create">
                <button type="button" className="btn bg-vw-light text-white">
                  <i className="fas fa-plus mr-1"></i>Nuevo
                </button>
              </Link>
            </div>
          }
        </div>
        <ContractList contracts={contracts} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  contracts: state.contracts.contracts,
  error: state.contracts.error,
  role: state.auth.role
})

const mapDispatchToProps = dispatch => ({
  fetchContracts: bindActionCreators(fetchContracts, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ContractsView)

