import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import { ConnectMetaMask, NotFoundPage } from '../common/pages';
import ProtectedRoute from '../common/utils/protectedRoute.util';
import { Navbar } from '../common/components/navbar/navbar.component';

export const MainRouter = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path={APP_KEYS.ROUTER_KEYS.ROOT} exact>
        <ProtectedRoute>
          <HomePageContainer />
        </ProtectedRoute>
      </Route>
      <Route path={APP_KEYS.ROUTER_KEYS.CONNECT_WALLET} exact>
        <ConnectMetaMask />
      </Route>
      <Route component={NotFoundPage} path="*" />
    </Switch>
  </Router>
);
