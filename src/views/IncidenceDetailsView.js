import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Box from '../components/Box'
import PropertyLabel from '../components/PropertyLabel'
import ErrorMessage from '../components/ErrorMessage'

import { fetchIncidence, updateIncidence } from '../actions/incidences'

class IncidenceDetailsView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      closing: false,
      closeConfirmShown: false
    }

    this.closeIncidence = this.closeIncidence.bind(this)
    this.closeConfirmShow = this.closeConfirmShow.bind(this)
    this.closeConfirmToggle = this.closeConfirmToggle.bind(this)
  }

  componentDidMount() {
    this.props.fetchIncidence(this.props.match.params.number)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.deleting && !nextProps.loading) {
      this.props.push('/incidences')
    }
  }

  closeIncidence() {
    const { updateIncidence, incidence } = this.props

    this.setState({ deleting: true })
    updateIncidence(incidence.number, { status: 'CLOSED' })
  }

  closeConfirmShow() {
    this.setState({ closeConfirmShown: true })
  }

  closeConfirmToggle() {
    this.setState({ closeConfirmShown: !this.state.closeConfirmShown })
  }

  render() {
    const { role, incidence, error, loading } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!incidence || loading) {
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <h1>
              <span className="text-vw-dark">DETALLES DE LA </span>
              <span className="text-vw-light">INCIDENCIA</span>
            </h1>
          </div>
          { role === 'ADMIN' && incidence.status === 'OPEN' &&
            <div className="col-xs-12 col-sm-6 col-md-6 text-right">
              <Link to={`/incidences/${incidence.number}/edit`}>
                <button className="btn bg-vw-light text-white mr-1">
                  <i className="fas fa-edit mr-1"></i>Editar
                </button>
              </Link>
              <button className="btn btn-warning mr-1" onClick={this.closeConfirmShow}>
                <i className="fas fa-times-circle mr-1"></i>Cerrar
              </button>
            </div>
          }
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <Box title="Incidencia" icon="exclamation-triangle">
              <PropertyLabel name="Número" value={incidence.number}/>
              <PropertyLabel name="Fecha de creación" value={new Date(incidence.createdAt).toString()}/>
              <PropertyLabel name="Máquina" value={incidence.machine.serial}/>
              <PropertyLabel name="Descripción" value={incidence.description} ml/>
            </Box>
          </div>
          <div className="col-xs-12 col-md-4">
            <Box title="Cliente" icon="user">
              <PropertyLabel name="Nombre" value={incidence.customer.fullname}/>
              <PropertyLabel name="E-Mail" value={incidence.customer.email}/>
              <PropertyLabel name="Teléfono" value={incidence.customer.phone}/>
            </Box>
          </div>
        </div>
        {/* Confirm close */}
        <div>
          <Modal isOpen={this.state.closeConfirmShown}
                 toggle={this.closeConfirmToggle}>
            <ModalHeader toggle={this.closeConfirmToggle}>
              Confirmar
            </ModalHeader>
            <ModalBody>
              <p>¿Estás seguro de cerrar la incidencia?</p>
            </ModalBody>
            <ModalFooter>
               <Button color="primary mr-1" onClick={this.closeIncidence}>
                 Cerrar
               </Button>
              <Button color="secondary" onClick={this.closeConfirmToggle}>
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
  incidence: state.incidences.incidence,
  loading: state.incidences.loading,
  error: state.incidences.error,
  role: state.auth.role
})

const mapDispatchToProps = dispatch => ({
  fetchIncidence: bindActionCreators(fetchIncidence, dispatch),
  updateIncidence: bindActionCreators(updateIncidence, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IncidenceDetailsView)

