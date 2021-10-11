import React, { useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom'

import Splash from '../views/login/splash';
import Login from '../views/login/login';

import Main from '../views/main';
import Party from '../views/party';
import MyInfo from '../views/info';
import SubscribePage from '../views/main/subscribe';
import EnrollmentRevisePage from '../views/main/subscribe/enrollment/revise';
import AnalysisPage from '../views/main/analysis';
import EnrollmentPage from '../views/main/subscribe/enrollment';
import DetailPage from '../views/info/detail';
import SearchPage from '../views/main/subscribe/search';
import NoticePage from '../views/info/notice';
import QuestionPage from '../views/info/question';
import SettingPage from '../views/info/setting';
import NamePage from '../views/info/detail/name';
import PhonePage from '../views/info/detail/phone';

import ReactGA from 'react-ga';
import AgreePage from '../views/info/agree';
import MyParty from '../views/party/myParty';
import PartyEnrollment from '../views/party/enrollment';

const AppLayout = () => {

    const location = useLocation();

    //google analytics 연동
    useEffect(() => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    }, [location]);

    //routing
    return (
        <>
            <Route path='/' exact component={Splash} />
            <Route path='/login' exact component={Login} />
            <Route path='/main' exact component={Main} />
            <Route path='/subscribe' exact component={SubscribePage} />
            <Route path='/subscribe/revise' exact component={EnrollmentRevisePage} />
            <Route path='/subscribe/enroll' exact component={EnrollmentPage} />
            <Route path='/search' exact component={SearchPage} />
            <Route path='/analysis' exact component={AnalysisPage} />
            <Route path='/party' exact component={Party} />
            <Route path='/party/my' exact component={MyParty} />
            <Route path='/party/enroll' exact component={PartyEnrollment} />
            <Route path='/info' exact component={MyInfo} />
            <Route path='/info/detail' exact component={DetailPage} />
            <Route path='/info/detail/name' exact component={NamePage} />
            <Route path='/info/detail/phone' exact component={PhonePage} />
            <Route path='/notice' exact component={NoticePage} />
            <Route path='/faq' exact component={QuestionPage} />
            <Route path='/setting' exact component={SettingPage} />
            <Route path='/agree' exact component={AgreePage} />
        </>
    );

};






export default AppLayout;
