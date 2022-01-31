import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import GoogleMapReact from 'google-map-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as dateFormat from 'dateformat'

import Box from '../components/Box'
import PropertyLabel from '../components/PropertyLabel'
import ErrorMessage from '../components/ErrorMessage'
import MachineStatusBadge from '../components/MachineStatusBadge'
import MachineMarker from '../components/MachineMarker'
import RemoteActionsList from '../components/RemoteActionsList'
import MachineStockTable from '../components/MachineStockTable'
import MoneyTable from '../components/MoneyTable'
import MachinePromoterFeesTable from '../components/MachinePromoterFeesTable'
import RemoteActionAddForm from '../forms/RemoteActionAddForm'

import { deleteMachine, fetchMachine } from '../actions/machines'
import { getMachinePicture, getMachineCoordinates } from '../utils/machines'
import { fetchRemoteActions } from '../actions/remoteactions'
import { GMAPS_KEY } from '../config'

class MachineDetailsView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      deleting: false,
      deleteConfirmShown: false
    };

    this.delete = this.delete.bind(this)
    this.deleteConfirmShow = this.deleteConfirmShow.bind(this)
    this.deleteConfirmToggle = this.deleteConfirmToggle.bind(this)
  }

  componentDidMount() {
    const { fetchMachine, fetchRemoteActions, match } = this.props

    fetchMachine(match.params.serial)
    fetchRemoteActions(match.params.serial)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.deleting && !nextProps.machines.machine) {
      this.props.push('/machines')
    }
  }

  delete() {
    const { deleteMachine, machines: { machine } } = this.props

    this.setState({ deleting: true })
    deleteMachine(machine.serial)
  }

  deleteConfirmShow() {
    this.setState({ deleteConfirmShown: true })
  }

  deleteConfirmToggle() {
    this.setState({ deleteConfirmShown: !this.state.deleteConfirmShown })
  }

  render() {
    const { role, machines, machines: { machine }, remoteActions } = this.props

    if (machines.error) {
      return (
        <ErrorMessage message={machines.error.message}/>
      )
    }

    if (!machine || machines.loading) {
      return (
        <h3>Cargando...</h3>
      )
    }

    const coordinates = getMachineCoordinates(machine.location)

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1>
              <span className="text-vw-dark">DETALLES DE LA </span>
              <span className="text-vw-light">MÁQUINA</span>
            </h1>
          </div>
          { role === 'ADMIN' &&
            <div className="col-xs-12 col-sm-6 col-md-6 text-right">
              <Link to={`/machines/${machine.serial}/edit`}>
                <button className="btn bg-vw-light text-white mr-1">
                  <i className="fas fa-edit mr-1"></i>Editar
                </button>
              </Link>
              <button className="btn btn-danger mr-1" onClick={this.deleteConfirmShow}>
                <i className="fas fa-trash mr-1"></i>Borrar
              </button>
            </div>
          }
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <Box title="Máquina" icon="cubes">
              <div className="row m-2">
                <div className="col col-12 col-md-4 text-center">
                  <img src={getMachinePicture(machine.type)} alt="Máquina" width="80%"/>
                  <MachineStatusBadge machine={machine}/>
                </div>
                <div className="col col-12 col-md-8">
                  <PropertyLabel name="Número de serie"
                                 value={machine.serial}/>
                  <PropertyLabel name="Fecha de fabricación"
                                 value={dateFormat(new Date(machine.build_date), 'dd/mm/yy')}/>
                  <PropertyLabel name="Tipo"
                                 value={machine.type}/>
                  <PropertyLabel name="Versión del software"
                                 value={machine.sw_version}/>
                  <PropertyLabel name="Versión del firmware"
                                 value={machine.fw_version}/>
                  <PropertyLabel name="Pin de mantenimiento"
                                 value={machine.pin} />
                  <PropertyLabel name="Última conexión"
                                 value={dateFormat(new Date(machine.last_signal), 'dd/mm/yy HH:MM')}/>
                  { role === 'ADMIN' &&
                    <div>
                      <PropertyLabel name="Token"
                                     value={machine.token} />
                      <PropertyLabel name="Intervalo entre sonidos (minutos)"
                                     value={machine.sound_interval} />
                      <PropertyLabel name="Inicio del modo sleep (h)"
                                     value={machine.night_mode_start} />
                      <PropertyLabel name="Fin del modo sleep (h)"
                                     value={machine.night_mode_end} />
                      <PropertyLabel name="Valor del token (EUR)"
                                     value={machine.token_value} />
                      <PropertyLabel name="Valor de venta del token (EUR)"
                                     value={machine.token_sale_value} />
                      <PropertyLabel name="E-mail de reportes"
                                     value={machine.report_email} />
                      <PropertyLabel name="Intensidad burbujas (%)"
                                     value={machine.bubbles_intensity} />
                      <PropertyLabel name="Reset sin conectividad" checkbox
                                     value={machine.reset_no_internet} />
                      <PropertyLabel name="Modo stand-by habilitado" checkbox
                                     value={machine.enable_standby} />
                      <PropertyLabel name="Gestionada por promotor" checkbox
                                     value={machine.has_promoter} />
                      <PropertyLabel name="Día de inicio de reportes"
                                     value={dateFormat(new Date(machine.promoter_report_from_day), 'dd/mm/yy')} />
                      <PropertyLabel name="Día de fin de reportes"
                                     value={dateFormat(new Date(machine.promoter_report_to_day), 'dd/mm/yy')} />
                      <PropertyLabel name="Comentarios"
                                     value={machine.comments} ml/>
                      <hr/>
                      <h6 className="text-vw-dark">Detalles TPV</h6>
                      <PropertyLabel name="Número de serie" value={machine.tpv_serial}/>
                      <PropertyLabel name="TCOD" value={machine.tpv_tcod}/>
                      <PropertyLabel name="Cargo máximo" value={machine.tpv_max}/>
                    </div>
                  }
                </div>
              </div>
            </Box>
          </div>
          <div className="col-xs-12 col-md-4">
            <Box title="Asignación" icon="arrows-alt-h">
              { !machine.customer ? (
                <h6>Machine is not allocated</h6>
              ) : (
                <div>
                  <PropertyLabel name="Cliente"
                                 value={machine.customer.fullname}/>
                  <PropertyLabel name="Contrato #"
                                 value={machine.contract.number}/>
                  { coordinates &&
                    <div className="mb-3" style={{width: '100%', height: '250px'}}>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: GMAPS_KEY }}
                        defaultCenter={coordinates}
                        defaultZoom={10}
                      >
                          <MachineMarker
                            lat={coordinates.lat}
                            lng={coordinates.lng}
                            machine={machine}
                          />
                      </GoogleMapReact>
                    </div>
                   }
                </div>
              )}
            </Box>
          </div>
        </div>
        <Box title="Niveles de Consumibles" icon="archive">
          <MachineStockTable machine={this.props.machines.machine} />
        </Box>
        <Box title="Niveles de dinero" icon="dollar-sign">
          <MoneyTable machine={this.props.machines.machine} />
        </Box>
        <Box title="Comisiones del promotor" icon="hand-holding-usd">
          <MachinePromoterFeesTable machine={this.props.machines.machine} />
        </Box>
        {role === 'ADMIN' &&
          <Box title="Acciones Remotas" icon="hand-paper">
            <RemoteActionAddForm machine={machine}/>
            <RemoteActionsList remoteActions={remoteActions}/>
          </Box>
        }
        {/* Confirm deletion */}
        <div>
          <Modal isOpen={this.state.deleteConfirmShown}
                 toggle={this.deleteConfirmToggle}>
            <ModalHeader toggle={this.deleteConfirmToggle}>
              Confirmar
            </ModalHeader>
            <ModalBody>
              {machine.customer ? (
                <p>Una máquina no se puede borrar mientras tenga un contrato asignado.</p>
              ) : (
                <p>¿Estás seguro de borrar la máquina?</p>
              )}
            </ModalBody>
            <ModalFooter>
              {!machine.customer &&
               <Button color="primary mr-1" onClick={this.delete}>
                 Borrar
               </Button>}
              <Button color="secondary" onClick={this.deleteConfirmToggle}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  machines: state.machines,
  remoteActions: state.remoteactions,
  role: state.auth.role
})

const mapDispatchToProps = dispatch => ({
  deleteMachine: bindActionCreators(deleteMachine, dispatch),
  fetchMachine: bindActionCreators(fetchMachine, dispatch),
  fetchRemoteActions: bindActionCreators(fetchRemoteActions, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MachineDetailsView)
