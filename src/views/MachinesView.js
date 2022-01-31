import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchMachines } from '../actions/machines'

import MachineList from '../components/MachineList'
import ErrorMessage from '../components/ErrorMessage'

class MachinesView extends React.Component {
  componentDidMount() {
    this.props.fetchMachines()
  }

  render() {
    const { machines, error, role } = this.props

    if (error) {
      return (<ErrorMessage message={error.message}/>)
    }

    if (!machines) {
      return (<h3>Cargando...</h3>)
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1>
              <span className="text-vw-dark">PARQUE DE </span>
              <span className="text-vw-light">MÁQUINAS</span>
            </h1>
          </div>
          { role === 'ADMIN' &&
            <div className="col-xs-12 col-sm-6 col-md-6 text-right">
              <Link to="/machines/add">
                <button type="button" className="btn bg-vw-light text-white">
                  <i className="fas fa-plus mr-1"></i>Nueva
                </button>
              </Link>
            </div>
          }
        </div>
        <MachineList machines={machines} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  machines: state.machines.machines,
  error: state.machines.error,
  role: state.auth.role
})

const mapDispatchToProps = dispatch => ({
  fetchMachines: bindActionCreators(fetchMachines, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MachinesView)
