import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { history } from '../store'
import * as dateFormat from 'dateformat'

import { deleteSale } from '../actions/sales'

class SaleList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      deleting: false,
      deleteConfirmShown: false,
      deleteId: null
    };

    this.delete = this.delete.bind(this)
    this.deleteConfirmShow = this.deleteConfirmShow.bind(this)
    this.deleteConfirmToggle = this.deleteConfirmToggle.bind(this)
  }

  goTo(number, e) {
    history.push(`/sales/${number}`)
  }

  delete() {
    const { deleteSale } = this.props

    this.setState({ deleting: true })
    deleteSale(this.state.deleteId)
  }

  deleteConfirmShow(id) {
    this.setState({
      deleteConfirmShown: true,
      deleteId: id
    })
  }

  deleteConfirmToggle() {
    this.setState({ deleteConfirmShown: !this.state.deleteConfirmShown })
  }

  render() {
    const { auth, sales } = this.props

    return (
      <div className="table-responsive">
        <table className="table table-hover table-clickable">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cliente</th>
              <th scope="col">Fecha/Hora</th>
              {auth.type !== 'LIMITED' &&
                <th scope="col">Importe</th>
              }
              <th scope="col"></th>
              {auth.type !== 'LIMITED' &&
                <th scope="col"></th>
              }
            </tr>
          </thead>
          <tbody>
            {sales.sales.map(sale => (
              <tr key={sale._id}>
                <th scope="row">{sale.code}</th>
                <td>{sale.customer.fullname}</td>
                <td>
                  {dateFormat(new Date(sale.date), 'dd/mm/yy HH:MM')}
                </td>
                {auth.type !== 'LIMITED' &&
                  <td>{`${parseFloat(sale.amount).toFixed(2)} ${sale.contract.currency}`}</td>
                }
                <td>
                  <button className="btn btn-primary mr-1" onClick={e => this.goTo(sale.number, e)}>
                    <i className="fas fa-info mr-1"></i>Detalles
                  </button>
                </td>
                {auth.type !== 'LIMITED' &&
                  <td>
                    <button className="btn btn-danger mr-1" onClick={() => this.deleteConfirmShow(sale._id)}>
                      <i className="fas fa-trash mr-1"></i>
                    </button>
                  </td>
                }
              </tr>
              )
            )}
          </tbody>
        </table>
        {/* Confirm deletion */}
        <div>
          <Modal isOpen={this.state.deleteConfirmShown}
                 toggle={this.deleteConfirmToggle}>
            <ModalHeader toggle={this.deleteConfirmToggle}>
              Confirmar
            </ModalHeader>
            <ModalBody>
                <p>¿Estás seguro de borrar la venta?</p>
            </ModalBody>
            <ModalFooter>
               <Button color="primary mr-1" onClick={this.delete}>
                 Borrar
               </Button>
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
  sales: state.sales,
})

const mapDispatchToProps = dispatch => ({
  deleteSale: bindActionCreators(deleteSale, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleList)

