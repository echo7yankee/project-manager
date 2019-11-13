import React from 'react';

//jwt
import jwt from 'jsonwebtoken';

//react router
import { Redirect, Route } from 'react-router-dom';

//Components
import { Navbar } from '../Navbar/Navbar';

//redux
import { useSelector } from 'react-redux';

//Components
import { Sidebar } from '../Sidebar/Sidebar';
import { Tasks } from '../TasksContent/Tasks';

export const Dashboard = ({ history }): JSX.Element => {
  //redux
  const authenticated = useSelector(state => state.auth.authenticated);
  //token
  let decodedToken;
  let userId;
  const token = localStorage.FBIdToken;

  if (token) {
    decodedToken = jwt.decode(token);
    userId = decodedToken.params && decodedToken.params.id;
  }

  if (!authenticated) {
    return <Redirect to='/register' />;
  }

  return (
    <div>
      <Navbar />
      <div className='container-dashboard container'>
        <Sidebar userId={userId} history={history} />
        <Route path='/project/:projectId' component={Tasks} />
      </div>
    </div>
  );
};
