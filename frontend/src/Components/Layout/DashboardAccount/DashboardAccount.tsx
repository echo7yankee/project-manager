import React from 'react';

//redux
import { useSelector } from 'react-redux';

//react router dom
import { Redirect, Route } from 'react-router-dom';

//style
import style from './dashboard.module.css'

//components
import { Account } from '../Account/Account';
import { AccountSidebar } from '../AccountSidebar/AccountSidebar';
import { NavbarAccount } from '../NavbarAccount/NavbarAccount';

export const DashboardAccount = (): JSX.Element => {

  const authenticated = useSelector(state => state.auth.authenticated)

  if (!authenticated) {
    return <Redirect to='/register' />;
  }

  return (
    <div>
      <NavbarAccount />
      <div className={`${style.dashboardAccount} container-white`}>
        <div className='container container-dashboard'>
          <AccountSidebar />
          <div className={style.settingsMainPage}>
            <Route path='/prefs/account' component={Account} />
          </div>
        </div>
      </div>
    </div>
  )
}
