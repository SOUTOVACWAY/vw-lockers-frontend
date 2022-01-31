  import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchMachines } from '../actions/machines'
import { fetchIncidences } from '../actions/incidences'
import { fetchSales } from '../actions/sales'

import MachineStatusBadge from '../components/MachineStatusBadge'
import MachineMap from '../components/MachineMap'
import Box from '../components/Box'
import ErrorMessage from '../components/ErrorMessage'
import PropertyLabel from '../components/PropertyLabel'

import { getMachineStatus, getMachineCirclePicture } from '../utils/machines'

class HomeView extends React.Component {
  constructor(props) {
    super(props)

    this.state = { machine: null }
  }

  componentDidMount() {
    const { fetchMachines, fetchIncidences, fetchSales } = this.props

    const today = new Date().toISOString().substring(0, 10)

    fetchMachines()
    fetchIncidences('OPEN')
    fetchSales('', '', today, today)
  }

  onMachineClick = (index, childProps) => {
    this.setState({ machine: childProps.machine })
  }

  computeSalesTotals() {
    const { sales: { sales } } = this.props

    let total = 0

    let totalsPerItem = new Map([
      ['VWPACK', 0],
      ['VWLAY', 0],
      ['VWGO', 0],
      ['VWPLAY', 0]
    ])

    for (let sale of sales) {
      for (let item of sale.items) {
        let itemTotal = item.qty * item.price

        total += itemTotal
        totalsPerItem.set(item.item, totalsPerItem.get(item.item) + itemTotal)
      }
    }

    return {
      total: total,
      totalsPerItem: totalsPerItem
    }
  }

  computeMachineStatuses() {
    const { machines: { machines } } = this.props

    let statuses = new Map([
      ['ONLINE', 0],
      ['OFFLINE', 0],
      ['SLEEP', 0],
      ['UNKNOWN', 0]
    ])

    for (let machine of machines) {
      let status = getMachineStatus(machine)

      statuses.set(status, statuses.get(status) + 1)
    }

    return statuses
  }

  render() {
    const { machines, incidences, sales, auth } = this.props

    if (machines.error) {
      return (<ErrorMessage message={machines.error.message}/>)
    }

    if (incidences.error) {
      return (<ErrorMessage message={incidences.error.message}/>)
    }

    if (sales.error) {
      return (<ErrorMessage message={sales.error.message}/>)
    }

    if (!machines.machines || machines.loading ||
        !incidences.incidences || incidences.loading ||
        !sales.sales || sales.loading) {
      return (<h3>Loading...</h3>)
    }

    let totals = this.computeSalesTotals()
    let machineStatuses = this.computeMachineStatuses()

    return (
      <div>
        <h1>
          <span className="text-vw-dark">TABLERO DE </span>
          <span className="text-vw-light">INFORMACIÓN</span>
        </h1>

        <div className="row">
          <div className="col col-12 col-lg-8">
            <div className="mb-3 rounded box-shadow"
                 style={{width: '100%', height: '400px'}}>
              <MachineMap machines={machines.machines}
                          onMachineClick={this.onMachineClick} />
            </div>
            <Box title="Detalles de la máquina" icon="info-circle">
              {!this.state.machine ? (
                <p className="mt-2 text-center">
                  Selecciona una máquina para ver sus detalles.
                </p>
              ) : (
                <div className="row m-2">
                  <div className="col col-sm-3 text-center">
                    <img src={getMachineCirclePicture(this.state.machine.type)}
                         alt="Máquina"
                         width="100%"
                    />
                    <MachineStatusBadge machine={this.state.machine}/>
                  </div>
                  <div className="col col-sm-9">
                    <PropertyLabel name="Número de serie"
                                   value={this.state.machine.serial}/>
                    <PropertyLabel name="Cliente"
                                   value={this.state.machine.customer.fullname}/>
                    <Link to={`/machines/${this.state.machine.serial}`}>
                      <button type="button" className="btn bg-vw-light text-white mt-3">
                        Gestionar &rarr;
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </Box>
          </div>
          <div className="col col-12 col-lg-4">
            <div className="p-3 mb-3 rounded box-shadow bg-vw-darkest text-white text-center">
              <img src="/images/realtime.svg" width="20%" alt="Realtime"/>
              <h4>
                INDICADORES<br/>
                <strong>EN TIEMPO REAL</strong>
              </h4>
              { auth.type !== 'LIMITED' &&
                <div className="p-3 mb-3 bg-white rounded text-vw-dark">
                  <h3>
                    <span className="text-vw-dark">RENDIMIENTO </span>
                    <span className="text-vw-light">DE VENTAS</span>
                  </h3>
                  <PropertyLabel name="VACWAYpack" value={`${totals.totalsPerItem.get('VWPACK')} EUR`}/>
                  <PropertyLabel name="VACWAYlay" value={`${totals.totalsPerItem.get('VWLAY')} EUR`}/>
                  <PropertyLabel name="VACWAYgo!" value={`${totals.totalsPerItem.get('VWGO')} EUR`}/>
                  <hr className="bg-vw-light"/>
                  <PropertyLabel name="TOTAL DIARIO" value={`${totals.total} EUR`}/>
                </div>
              }
              <div>
                <div className="p-3 mb-3 bg-white rounded text-vw-dark">
                  <h3 className="text-vw-dark">ESTADO</h3>
                  <PropertyLabel name="ONLINE"
                                 value={`${machineStatuses.get('ONLINE')}/${machines.machines.length}`}/>
                  <PropertyLabel name="SLEEP"
                                 value={`${machineStatuses.get('SLEEP')}/${machines.machines.length}`}/>
                  <PropertyLabel name="OFFLINE"
                                 value={`${machineStatuses.get('OFFLINE')}/${machines.machines.length}`}/>
                </div>
                <div className="p-3 mb-3 bg-white rounded text-warning">
                  <i className="fas fa-exclamation-triangle fa-2x mb-2"></i>
                  <h3><b>{incidences.incidences.length}</b> incidentes</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  machines: state.machines,
  incidences: state.incidences,
  sales: state.sales,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  fetchMachines: bindActionCreators(fetchMachines, dispatch),
  fetchIncidences: bindActionCreators(fetchIncidences, dispatch),
  fetchSales: bindActionCreators(fetchSales, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
