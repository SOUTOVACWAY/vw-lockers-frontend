import React from 'react'
import { history } from '../store'
import * as dateFormat from 'dateformat'

class ReportList extends React.Component {
  goTo(number, e) {
    history.push(`/reports/${number}`)
  }

  render() {
    if (!this.props.reports) {
      return null
    }

    return (
      <div>
        <table className="table table-hover table-clickable">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cliente Principal</th>
              <th scope="col">Fecha</th>
              <th scope="col">Motivo</th>
              <th scope="col">Coste</th>
            </tr>
          </thead>
          <tbody>
            {this.props.reports.map(report => (
              <tr key={report.number}
                  onClick={e => this.goTo(report.number, e)}>
                <th scope="row">{report.number}</th>
                <td>{report.customer1}</td>
                <td>{dateFormat(new Date(report.start_date), 'dd/mm/yy')}</td>
                <td>{report.motive}</td>
                <td>{report.hotel_price + report.transporte_price + report.concept1_price + report.concept2_price + report.concept3_price + report.concept4_price + report.concept5_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ReportList