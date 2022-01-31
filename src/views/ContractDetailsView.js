import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Box from '../components/Box'
import PropertyLabel from '../components/PropertyLabel'
import AssignedItemList from '../components/AssignedItemList'
import ErrorMessage from '../components/ErrorMessage'

import { fetchPopulatedContract, updateContract } from '../actions/contracts'

class ContractDetailsView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      closing: false,
      terminateConfirmShown: false
    }

    this.terminateContract = this.terminateContract.bind(this)
    this.terminateConfirmShow = this.terminateConfirmShow.bind(this)
    this.terminateConfirmToggle = this.terminateConfirmToggle.bind(this)
  }

  componentDidMount() {
    this.props.fetchPopulatedContract(this.props.match.params.number)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.deleting && !nextProps.loading) {
      this.props.push('/contracts')
    }
  }

  terminateContract() {
    const { updateContract, contract } = this.props

    this.setState({ deleting: true })
    updateContract(contract.number, { ...contract, status: 'TERMINATED' })
  }

  terminateConfirmShow() {
    this.setState({ terminateConfirmShown: true })
  }

  terminateConfirmToggle() {
    this.setState({ terminateConfirmShown: !this.state.terminateConfirmShown })
  }

  render() {
    const { role, contract, error, loading } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!contract || loading) {
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col col-12 col-xs-12 col-sm-6 col-md-6">
            <h1>
              <span className="text-vw-dark">DETALLES DEL </span>
              <span className="text-vw-light">CONTRATO</span>
            </h1>
          </div>
          { role === 'ADMIN' && contract.status === 'VALID' &&
            <div className="col col-12 col-xs-12 col-sm-6 col-md-6 text-right">
              <Link to={`/contracts/${contract.number}/edit`}>
                <button className="btn bg-vw-light text-white mr-1">
                  <i className="fas fa-edit mr-1"></i>Editar
                </button>
              </Link>
              <button className="btn btn-warning mr-1" onClick={this.terminateConfirmShow}>
                <i className="fas fa-times-circle mr-1"></i>Terminar
              </button>
            </div>
          }
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <Box title="Resumen" icon="sliders-h">
              <div className="row">
                <div className="col col-12 col-xs-12 col-md-6">
                  <PropertyLabel name="Número"
                                 value={contract.number} />
                  <PropertyLabel name="Fecha inicio"
                                 value={(new Date(contract.startDate)).toDateString()} />
                  <PropertyLabel name="Fecha fin"
                                 value={(new Date(contract.endDate)).toDateString()} />
                  <PropertyLabel name="Máquina"
                                 value={contract.machine.serial} />
                </div>
                <div className="col col-12 col-xs-12 col-md-6">
                  <PropertyLabel name="Comisión de venta"
                                 value={`${contract.saleCommission} %`}/>
                  <PropertyLabel name="Comisión de publicidad"
                                 value={`${contract.advCommission} %`} />
                  <PropertyLabel name="Comisión fija"
                                 value={`${contract.fixedFee} ${contract.currency}/mes`} />
                  <PropertyLabel name="Dinero en caja inicial"
                                 value={`${contract.cashInitial} ${contract.currency}`} />
                  <PropertyLabel name="Moneda"
                                 value={contract.currency} />
                </div>
              </div>
            </Box>
            <Box title="Artículos" icon="shopping-cart">
              <AssignedItemList items={contract.items} currency={contract.currency}/>
            </Box>
          </div>
          <div className="col col-12 col-xs-12 col-md-4">
            <Box title="Cliente" icon="user">
              <PropertyLabel name="Nombre" ml
                             value={contract.customer.fullname}/>
              {contract.customer.sector &&
              <PropertyLabel name="Sector" ml
                             value={contract.customer.sector.description}/>}
            </Box>
            <Box title="Envío de suministros" icon="truck">
              <PropertyLabel name="Contacto" ml
                             value={contract.supplyContactName}/>
              <PropertyLabel name="Teléfono" ml
                             value={contract.supplyContactPhone}/>
              <PropertyLabel name="Dirección" ml
                             value={contract.supplyShippingAddress}/>
            </Box>
          </div>
        </div>
        {/* Confirm terminate */}
        <div>
          <Modal isOpen={this.state.terminateConfirmShown}
                 toggle={this.terminateConfirmToggle}>
            <ModalHeader toggle={this.terminateConfirmToggle}>
              Confirmar
            </ModalHeader>
            <ModalBody>
              <p>¿Estás seguro de terminar el contrato?</p>
            </ModalBody>
            <ModalFooter>
               <Button color="primary mr-1" onClick={this.terminateContract}>
                 Terminar
               </Button>
              <Button color="secondary" onClick={this.terminateConfirmToggle}>
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
  contract: state.contracts.populatedContract,
  loading: state.contracts.loading,
  error: state.contracts.error,
  role: state.auth.role
})

const mapDispatchToProps = dispatch => ({
  fetchPopulatedContract: bindActionCreators(fetchPopulatedContract, dispatch),
  updateContract: bindActionCreators(updateContract, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetailsView)


