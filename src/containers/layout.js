import React, { useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom'

import Splash from '../views/login/splash';
import Login from '../views/login/login';

import Main from '../views/main';
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
import MyParty from '../views/party/my/myParty';
import MyPartyDetail from '../views/party/my/myPartyDetail';

import Party from '../views/party';
import PartyPlatform from '../views/party/enrollment/platform';
import PartyPlatformSearch from '../views/party/enrollment/platform/search';
import PartyPlatformDetail from '../views/party/enrollment/platform/detail';
import PartyEnrollFinish from '../views/party/enrollment/finish';
import AlertPage from '../views/main/alert';
import Inspection from '../views/login/inspection';
import NoticeDetailPage from '../views/info/notice/detail';
import PartyRevise from '../views/party/enrollment/revise';
import Name from '../views/login/findName/name';
import PhoneForName from '../views/login/findName/phonePage';
import PartyDetail from '../views/party/detail';
import Payment from '../views/payment/payment';
import CardRegister from '../views/card/cardRegister';
import Finish from '../views/payment/finish';
import CardManagement from '../views/card/cardManagement';
import CardIdxChange from '../views/party/detail/cardIdxChange';
import BankAccountManagement from '../views/card/bankAccountManagement';
import EditAccount from '../views/party/my/editAccount';
import PartyEnrollment from '../views/party/enrollment/enrollment';
import MyPartyRevise from '../views/party/my/myPartyRevise';

//회원가입,로그인 테스트
import SignUpName from '../views/login/loginStep/signUpName';
import SignInAuth from '../views/login/loginStep/signInAuth';
import AuthFinish from '../views/login/loginStep/authFinish';
import SignInPhone from '../views/login/loginStep/signInPhone';
import AccountIdxChange from '../views/party/detail/accountIdxChange';

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
            <Route path='/inspection' exact component={Inspection} />
            <Route path='/main' exact component={Main} />
            <Route path='/alert' exact component={AlertPage} />
            <Route path='/subscribe' exact component={SubscribePage} />
            <Route path='/subscribe/revise' exact component={EnrollmentRevisePage} />
            <Route path='/subscribe/enroll' exact component={EnrollmentPage} />
            <Route path='/search' exact component={SearchPage} />
            <Route path='/analysis' exact component={AnalysisPage} />
            <Route path='/party' exact component={Party} />
            <Route path='/party/detail' exact component={PartyDetail} />
            <Route path='/party/my' exact component={MyParty} />
            <Route path='/party/my/:idx' exact component={MyPartyDetail} />
            <Route path='/party/my/revise/:idx' exact component={MyPartyRevise} />
            <Route path='/party/my/detail/account' exact component={EditAccount} />
            <Route path='/party/enroll' exact component={PartyEnrollment} />
            <Route path='/party/enroll/platform' exact component={PartyPlatform} />
            <Route path='/party/enroll/platform/search' exact component={PartyPlatformSearch} />
            <Route path='/party/enroll/platform/detail' exact component={PartyPlatformDetail} />
            <Route path='/party/enroll/finish' exact component={PartyEnrollFinish} />
            <Route path='/party/revise' exact component={PartyRevise} />
            <Route path='/info' exact component={MyInfo} />
            <Route path='/info/detail' exact component={DetailPage} />
            <Route path='/info/detail/name' exact component={NamePage} />
            <Route path='/info/detail/phone' exact component={PhonePage} />
            <Route path='/notice' exact component={NoticePage} />
            <Route path='/notice/detail' exact component={NoticeDetailPage} />
            <Route path='/faq' exact component={QuestionPage} />
            <Route path='/setting' exact component={SettingPage} />
            <Route path='/agree' exact component={AgreePage} />
            <Route path='/phone' exact component={PhoneForName} />
            <Route path='/findName' exact component={Name} />
            <Route path='/payment' exact component={Payment} />
            <Route path='/payment/finish' exact component={Finish} />
            <Route path='/card' exact component={CardRegister} />
            <Route path='/card/manage' exact component={CardManagement} />
            <Route path='/party/detail/change/card' exact component={CardIdxChange}/>
            <Route path='/party/detail/change/account' exact component={AccountIdxChange}/>
            <Route path='/bank/manage' exact component={BankAccountManagement}/>
            <Route path='/party/detail/change/card' exact component={CardIdxChange} />
            <Route path='/bank/manage' exact component={BankAccountManagement} />


            {/* 회원가입/로그인절차 컴포넌트 테스트 */}
            <Route path='/signup/name' exact component={SignUpName}/>
            <Route path='/signin/phone' exact component={SignInPhone}/>
            <Route path='/signin/auth' exact component={SignInAuth}/>
            <Route path='/signin/auth/finish' exact component={AuthFinish}/>

        </>
    );
};

export default AppLayout;
