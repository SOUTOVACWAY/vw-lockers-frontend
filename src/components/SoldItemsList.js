import React from 'react'

class SoldItemsList extends React.Component {
  render() {
    const { auth } = this.props

    return (
      <div className="table-responsive">
        <table className="table table-sm table-stripped">
          <thead className="thead-light">
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Cantidad</th>
              {auth.type === 'ROOT' &&
                <th scope="col">Precio</th>
              }
            </tr>
          </thead>
          <tbody>
            {this.props.items.map(item => (
              <tr key={item.item.code}>
                <th scope="row">{item.item}</th>
                <td>{item.qty}</td>
                {auth.type === 'ROOT' &&
                  <td>{`${parseFloat(item.price).toFixed(2)} ${this.props.currency}`}</td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SoldItemsList

