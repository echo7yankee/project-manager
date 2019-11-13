import React from 'react';

//Components
import { Login } from './Components/auth/Login';
import { Register } from './Components/auth/Register';
import { Dashboard } from './Components/Layout/Dashboard/Dashboard';
import { DashboardAccount } from './Components/Layout/DashboardAccount/DashboardAccount';

//import { Tasks } from './Components/Layout/TasksContent/Tasks';

//React router dom
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export function App(): JSX.Element {
  return <BrowserRouter>
    <Switch>
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/account' component={DashboardAccount} />
      <Route path='/' component={Dashboard} />
    </Switch>
  </BrowserRouter>;
}
