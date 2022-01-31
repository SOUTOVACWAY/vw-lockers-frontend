import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'

import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap'

import { authLogout } from '../actions/auth'

class AppHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  logout() {
    this.props.authLogout()
    this.props.push('/login')
  }

  render() {
    const { role, type } = this.props.auth

    return (
      <Navbar className="box-shadow bg-vw-dark" dark expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img className="logo" src="/images/logo.png" alt="Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">INICIO</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/machines">PARQUE DE MÁQUINAS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/contracts">CONTRATOS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/sales">VENTAS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/incidences">INCIDENCIAS</NavLink>
              </NavItem>
              { role === 'ADMIN' &&
                 <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    ADMINISTRACIÓN
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem tag={Link} to="/customers">
                      <i className="fas fa-users mr-1"></i>CLIENTES
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/reports">
                      <i className="fas fa-truck mr-1"></i>REPORTES
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/logistics">
                      <i className="fas fa-truck mr-1"></i>LOGÍSTICA
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/audit">
                      <i className="fas fa-database mr-1"></i>AUDIT
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/shifts">
                      <i className="fas fa-clock mr-1"></i>JORNADAS
                    </DropdownItem>
                    { type !== 'LIMITED' &&
                      <div>
                        <DropdownItem divider/>
                        <DropdownItem tag={Link} to="/users">
                          <i className="fas fa-user-secret mr-1"></i>ADMINISTRADORES
                        </DropdownItem>
                      </div>
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
              <button className="btn btn-outline-light" onClick={this.logout}>
                <i className="fas fa-sign-out-alt mr-1"></i>
                SALIR
              </button>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  authLogout: bindActionCreators(authLogout, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
