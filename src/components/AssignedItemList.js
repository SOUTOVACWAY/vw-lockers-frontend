import React from 'react'

class AssignedItemList extends React.Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-sm table-stripped">
          <thead className="thead-light">
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock Inicial</th>
              <th scope="col">Obligado</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map(item => (
              <tr key={item.item.code}>
                <th scope="row">{item.item}</th>
                <td>{`${parseFloat(item.price).toFixed(2)} ${this.props.currency}`}</td>
                <td>{item.initial_stock}</td>
                <td>{item.mandatory ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AssignedItemList
