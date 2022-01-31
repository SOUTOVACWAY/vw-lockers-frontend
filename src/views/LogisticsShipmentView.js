import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Box from '../components/Box'
import PropertyLabel from '../components/PropertyLabel'
import ErrorMessage from '../components/ErrorMessage'
import ShipmentItemList from '../components/ShipmentItemList'

import { fetchShipment } from '../actions/shipments'

class ShipmentDetailsView extends React.Component {
  componentDidMount() {
    this.props.fetchShipment(this.props.match.params.number)
  }

  render() {
    const { shipments: { error, shipment, loading } } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!shipment || loading) {
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-8 col-md-8">
            <h1>
              <span className="text-vw-dark">DETALLES DEL </span>
              <span className="text-vw-light">ENVÍO</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <Box title="Envío" icon="truck">
              <PropertyLabel name="Número" value={shipment.number}/>
              <PropertyLabel name="Fecha" value={new Date(shipment.date).toDateString()}/>
              <PropertyLabel name="Cliente" value={shipment.customer.fullname}/>
            </Box>
          </div>
          <div className="col-xs-12 col-md-4">
            <Box title="Dirección" icon="envelope">
              <PropertyLabel name="Destino" value={shipment.shipment_address} ml/>
            </Box>
          </div>
        </div>
        <Box title="Consumibles enviados">
          <ShipmentItemList items={shipment.items} />
        </Box>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shipments: state.shipments,
})

const mapDispatchToProps = dispatch => ({
  fetchShipment: bindActionCreators(fetchShipment, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentDetailsView)


