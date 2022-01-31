import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as dateFormat from 'dateformat'

import Box from '../components/Box'
import PropertyLabel from '../components/PropertyLabel'
import ErrorMessage from '../components/ErrorMessage'

import { fetchReport } from '../actions/reports'

class ReportDetailsView extends React.Component {
  componentDidMount() {
    this.props.fetchReport(this.props.match.params.number)
  }

  render() {
    const { report, error, loading } = this.props

    if (error) {
      return (
        <ErrorMessage message={error.message}/>
      )
    }

    if (!report || loading) {
      return (
        <h3>Loading...</h3>
      )
    }

    return (
      <div>
        <div className="row mb-2">
          <div className="col-xs-12 col-sm-8 col-md-8">
            <h1>
              <span className="text-vw-dark">DETALLES DEL </span>
              <span className="text-vw-light">REPORTE</span>
            </h1>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 text-right">
            <Link to={`/reports/${report.number}/edit`}>
              <button className="btn bg-vw-light text-white mr-1">
                <i className="fas fa-edit mr-1"></i>Editar
              </button>
            </Link>
          </div>
        </div>
        
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Box title="Datos Generales">
                <PropertyLabel name="Número #"
                             value={report.number}/>
                <PropertyLabel name="Fecha de inicio"
                             value={dateFormat(new Date(report.start_date), 'dd/mm/yy')}/>
                <PropertyLabel name="Fecha de fin"
                             value={dateFormat(new Date(report.finish_date), 'dd/mm/yy')}/>
                <PropertyLabel name="Cliente 1"
                             value={report.customer1}/>
                <PropertyLabel name="Inicio del servicio (h)"
                             value={report.customer1_start}/>
                <PropertyLabel name="Fin del servicio (h)"
                             value={report.customer1_end}/>  
                <PropertyLabel name="Cliente 2"
                             value={report.customer2}/>
                <PropertyLabel name="Inicio del servicio (h)"
                             value={report.customer2_start}/>
                <PropertyLabel name="Fin del servicio (h)"
                             value={report.customer2_end}/>  
                <PropertyLabel name="Cliente 3"
                             value={report.customer3}/>
                <PropertyLabel name="Inicio del servicio (h)"
                             value={report.customer3_start}/>
                <PropertyLabel name="Fin del servicio (h)"
                             value={report.customer3_end}/>   
                <PropertyLabel name="Cliente 4"
                             value={report.customer4}/>
                <PropertyLabel name="Inicio del servicio (h)"
                             value={report.customer4_start}/> 
                <PropertyLabel name="Fin del servicio (h)"
                             value={report.customer4_end}/>                
                <PropertyLabel name="Motivo"
                             value={report.motive}/> 
                <PropertyLabel name="Personal 1"
                             value={report.personal1}/>
                <PropertyLabel name="Personal 2"
                             value={report.personal2}/>
                <PropertyLabel name="Personal 3"
                             value={report.personal3}/>
                <PropertyLabel name="Personal 4"
                             value={report.personal4}/>
            </Box>
          
            <Box title="COCHE VACWAY">

                <PropertyLabel name="Inicio del servicio (km)"
                             value={report.coche_start}/>
                <PropertyLabel name="Fin del servicio (km)"
                             value={report.coche_end}/>
            </Box>
          
          </div>
          <div className="col">

            <Box title="HOTEL">

                <PropertyLabel name="Importe del hotel (€)"
                             value={report.hotel_price}/>
            </Box>
            <Box title="TRANSPORTE">

                <PropertyLabel name="Transporte"
                             value={report.transporte}/>
                <PropertyLabel name="Importe del transporte (€)"
                             value={report.transporte_price}/>             
            </Box>

            <Box title="Gastos variables">
                <PropertyLabel name="Concepto 1"
                             value={report.concept1}/>
                <PropertyLabel name="Importe (€)"
                             value={report.concept1_price}/>  
                <PropertyLabel name="Concepto 2"
                             value={report.concept2}/>
                <PropertyLabel name="Importe (€)"
                             value={report.concept2_price}/>
                <PropertyLabel name="Concepto 3"
                             value={report.concept3}/>
                <PropertyLabel name="Importe (€)"
                             value={report.concept3_price}/>
                <PropertyLabel name="Concepto 4"
                             value={report.concept4}/>
                <PropertyLabel name="Importe (€)"
                             value={report.concept4_price}/>
                <PropertyLabel name="Concepto 5"
                             value={report.concept5}/>
                <PropertyLabel name="Importe (€)"
                             value={report.concept5_price}/>                   
                
                <PropertyLabel name="Descripción"
                             value={report.description} ml/>
            </Box>

            <Box title="COMPUTO">
                <PropertyLabel name="TOTAL"
                             value={report.hotel_price + report.transporte_price + report.concept1_price + report.concept2_price + report.concept3_price + report.concept4_price + report.concept5_price}/>
            </Box>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  report: state.reports.report,
  loading: state.reports.loading,
  error: state.reports.error
})

const mapDispatchToProps = dispatch => ({
  fetchReport: bindActionCreators(fetchReport, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailsView)
