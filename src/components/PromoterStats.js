import React from 'react'

class PromoterStats extends React.Component {
  render() {
    const { stats } = this.props

    return (
        <table className="table table-hover table-clickable">
            <thead className="thead-light">
            <tr>
                <th scope="col">Artículo</th>
                <th scope="col">Unidades</th>
                <th scope="col">Comisiones</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>VACWAYpack</td>
                <td>{stats['VWPACK']['qty']}</td>
                <td>{stats['VWPACK']['fees'].toFixed(2)} €</td>
            </tr>
            <tr>
                <td>VACWAYlay</td>
                <td>{stats['VWLAY']['qty']}</td>
                <td>{stats['VWLAY']['fees'].toFixed(2)} €</td>
            </tr>
            <tr>
                <td>VACWAYgo!</td>
                <td>{stats['VWGO']['qty']}</td>
                <td>{stats['VWGO']['fees'].toFixed(2)} €</td>
            </tr>
            <tr>
                <td>TOTAL</td>
                <td>
                    {stats['VWPACK']['qty'] + stats['VWLAY']['qty'] + stats['VWGO']['qty']}
                </td>
                <td>
                    {(stats['VWPACK']['fees'] + stats['VWLAY']['fees'] + stats['VWGO']['fees']).toFixed(2)} €
                </td>
            </tr>
            </tbody>
        </table>
    )
  }
}

export default PromoterStats

