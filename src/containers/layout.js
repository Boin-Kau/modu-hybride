import React, { useCallback, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'

import Splash from '../views/login/splash';
import Login from '../views/login/login';

import Main from '../views/main';
import Party from '../views/party';
import MyInfo from '../views/info';
import SubscribePage from '../views/main/subscribe';
import EnrollmentRevisePage from '../views/main/subscribe/enrollment/revise';
import AnalysisPage from '../views/main/analysis';
import EnrollmentPage from '../views/main/subscribe/enrollment';

const AppLayout = ({ history, location, match }) => {

    return (
        <>
            <Route path='/' exact component={Splash} />
            <Route path='/login' exact component={Login} />
            <Route path='/main' component={Main} />
            <Route path='/subscribe' exact component={SubscribePage} />
            <Route path='/subscribe/revise' exact component={EnrollmentRevisePage} />
            <Route path='/subscribe/enroll' exact component={EnrollmentPage} />
            <Route path='/analysis' exact component={AnalysisPage} />
            <Route path='/party' component={Party} />
            <Route path='/info' component={MyInfo} />
        </>
    );

};






export default AppLayout;
