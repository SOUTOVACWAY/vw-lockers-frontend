import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Box from '../components/Box'
import StockTable from '../components/StockTable'
import ShipmentList from '../components/ShipmentList'

import LogisticsFilterForm from '../forms/LogisticsFilterForm'

class LogisticsView extends React.Component {
  render() {
    const { machines, customers, form } = this.props
    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-8 col-md-8">
            <h1>
              <span className="text-vw-dark">LOGÍSTICA DE </span>
              <span className="text-vw-light">CONSUMIBLES</span>
            </h1>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 text-right">
            <Link to="/logistics/newshipping">
              <button type="button" className="btn bg-vw-light text-white">
                <i className="fas fa-plus mr-1"></i>Nuevo Envío
              </button>
            </Link>
          </div>
        </div>
        <Box title="Filtro" icon="filter">
          <LogisticsFilterForm />
        </Box>
        { machines && customers && form &&
          <div>
            <Box title="Niveles de Consumibles" icon="filter">
              <StockTable customers={customers}
                          machines={machines}
                          selectedCustomer={form.values.customer}/>
            </Box>
            <Box title="Envíos" icon="truck">
              <ShipmentList shipments={this.props.shipments}/>
            </Box>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  machines: state.machines.machines,
  customers: state.customers.customers,
  shipments: state.shipments.shipments,
  form: state.form.LogisticsFilterForm
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LogisticsView)

