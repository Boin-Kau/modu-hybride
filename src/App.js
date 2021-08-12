import React, { useContext } from 'react';
import { useSelector } from "react-redux";

import styled from 'styled-components';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { PageTransContext } from './containers/pageTransContext';

import './App.scss';

import AppLayout from './containers/layout';
import BottomNav from './containers/bottomNav';


const history = createBrowserHistory();

//모바일 기기 체크
export const checkMobile = () => {

  var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

  if (varUA.indexOf('android') > -1) {
    //안드로이드
    return "android";
  } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
    //IOS
    return "ios";
  } else {
    //아이폰, 안드로이드 외
    return "other";
  }

}

//안드로이드 뒤로가기 종료
export const onClickTerminate = () => {

  const currentPlatform = checkMobile();

  if (currentPlatform == "android") {

    //terminateApp
    try {
      window.android.terminateApp();
    }
    catch (err) {
      alert(err);
    }

  }

}


function App() {

  let { pageTrans } = useContext(PageTransContext);

  //store
  const {
    message,
    messageShow,
    messageWrapShow
  } = useSelector(state => state.container.message);

  const PageTransStyle = {
    appear: `${pageTrans} appear`,
    appearActive: `${pageTrans} appear active`,
    appearDone: `${pageTrans} appear done`,
    enter: `${pageTrans} enter`,
    enterActive: `${pageTrans} enter active`,
    enterDone: `${pageTrans} enter done`,
    exit: `${pageTrans} exit`,
    exitActive: `${pageTrans} exit active`,
    exitDone: `${pageTrans} exit done`
  }

  return (
    <RootWrap>

      <Router history={history}>

        <Route
          render={({ location }) => (
            <TransitionGroup className='transitionGroup'>
              <CSSTransition key={location.pathname} classNames={PageTransStyle} timeout={300}>
                <Switch location={location}>
                  <Route path="/" component={AppLayout} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />

        {/* 바텀 네비게이션 */}
        <BottomNav></BottomNav>

        {/* 알림창 */}
        <MessageWrapPopup openStatus={messageWrapShow}>
          <MessagePopup className="notoMedium" openStatus={messageShow}>
            {message}
          </MessagePopup>
        </MessageWrapPopup>


      </Router>
    </RootWrap>
  );
}


const RootWrap = styled.div`

  /* border:1px solid blue; */

  position: absolute;
  top:0;
  bottom:0;

  width:100%;
  max-width:500px;

  left:50%;
  transform:translate(-50%,0);
  
  background-color:#f7f7f7;


  overflow:hidden;
`;

const MessageWrapPopup = styled.div`
    display : ${props => props.openStatus ? 'block' : 'none'};
`;
const MessagePopup = styled.div`
  z-index:10000;

  position:fixed;
  left:0;
  right:0;
  bottom:2.625rem;

  padding:0.5rem 0;
  margin:0 2.1875rem;

  border-radius:0.4375rem;

  line-height:1.3125rem;

  background-color: rgba(0,0,0,0.7);
  color: #ffffff;

  font-size:0.75rem;

  text-align:center;

  /* 애니메이션 적용 */
  transition: opacity 300ms ease-out;
  opacity : ${props => props.openStatus ? '1' : '0'};
`;



export default App;
