import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AppHeader from './AppHeader'

import HomeView from '../views/HomeView'
import MachinesView from '../views/MachinesView'
import MachineDetailsView from '../views/MachineDetailsView'
import MachineAddForm from '../forms/MachineAddForm'
import MachineEditForm from '../forms/MachineEditForm'
import ContractsView from '../views/ContractsView'
import ContractCreateForm from '../forms/ContractCreateForm'
import ContractEditForm from '../forms/ContractEditForm'
import ContractDetailsView from '../views/ContractDetailsView'
import CustomersView from '../views/CustomersView'
import CustomerAddForm from '../forms/CustomerAddForm'
import CustomerEditForm from '../forms/CustomerEditForm'
import CustomerDetailsView from '../views/CustomerDetailsView'
import ReportsView from '../views/ReportsView'
import ReportAddForm from '../forms/ReportAddForm'
import ReportEditForm from '../forms/ReportEditForm'
import ReportDetailsView from '../views/ReportDetailsView'
import IncidencesView from '../views/IncidencesView'
import IncidenceCreateForm from '../forms/IncidenceCreateForm'
import IncidenceDetailsView from '../views/IncidenceDetailsView'
import LogisticsView from '../views/LogisticsView'
import NewShipmentForm from '../forms/NewShipmentForm'
import LogisticsShipmentView from '../views/LogisticsShipmentView'
import SalesView from '../views/SalesView'
import SaleDetailsView from '../views/SaleDetailsView'
import UsersView from '../views/UsersView'
import UserAddForm from '../forms/UserAddForm'
import UserEditForm from '../forms/UserEditForm'
import UserDetailsView from '../views/UserDetailsView'
import UpdatesView from '../views/UpdatesView'
import UpdateAddForm from '../forms/UpdateAddForm'
import UpdateEditForm from '../forms/UpdateEditForm'
import UpdateDetailsView from '../views/UpdateDetailsView'
import NotFoundView from '../views/NotFoundView'
import AuditView from '../views/AuditView'
import ShiftsView from '../views/ShiftsView'

class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <div className="container pt-3">
          <Switch>
            <Route path="/" exact
                   component={HomeView} />
            <Route path="/machines" exact
                   component={MachinesView} />
            <Route path="/machines/add" exact
                   component={MachineAddForm} />
            <Route path="/machines/:serial/edit"
                   component={MachineEditForm} />
            <Route path="/machines/:serial"
                   component={MachineDetailsView} />
            <Route path="/contracts" exact
                   component={ContractsView} />
            <Route path="/contracts/create" exact
                   component={ContractCreateForm} />
            <Route path="/contracts/:number/edit"
                   component={ContractEditForm} />
            <Route path="/contracts/:number"
                   component={ContractDetailsView} />
            <Route path="/customers" exact
                   component={CustomersView} />
            <Route path="/customers/add" exact
                   component={CustomerAddForm} />
            <Route path="/customers/:number/edit"
                   component={CustomerEditForm} />
            <Route path="/customers/:number"
                   component={CustomerDetailsView} />
            <Route path="/reports" exact
                   component={ReportsView} />
            <Route path="/reports/add" exact
                   component={ReportAddForm} />
            <Route path="/reports/:number/edit"
                   component={ReportEditForm} />
            <Route path="/reports/:number"
                   component={ReportDetailsView} />
            <Route path="/incidences" exact
                   component={IncidencesView} />
            <Route path="/incidences/create" exact
                   component={IncidenceCreateForm} />
            <Route path="/incidences/:number"
                   component={IncidenceDetailsView} />
            <Route path="/logistics" exact
                   component={LogisticsView} />
            <Route path="/logistics/newshipping" exact
                   component={NewShipmentForm} />
            <Route path="/logistics/:number"
                   component={LogisticsShipmentView} />
            <Route path="/sales" exact
                   component={SalesView} />
            <Route path="/sales/:number"
                   component={SaleDetailsView} />
            <Route path="/users" exact
                   component={UsersView} />
            <Route path="/users/add" exact
                   component={UserAddForm} />
            <Route path="/users/:number/edit"
                   component={UserEditForm} />
            <Route path="/users/:number"
                   component={UserDetailsView} />
            <Route path="/updates" exact
                   component={UpdatesView} />
            <Route path="/updates/add" exact
                   component={UpdateAddForm} />
            <Route path="/updates/:id/edit"
                   component={UpdateEditForm} />
            <Route path="/updates/:id"
                   component={UpdateDetailsView} />
            <Route path="/audit" exact
                   component={AuditView} />
            <Route path="/shifts" exact
                   component={ShiftsView} />
            <Route path="*"
                   component={NotFoundView} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
