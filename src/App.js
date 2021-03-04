import React, { useContext } from 'react';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { PageTransContext } from './contexts/pageTransContext';

import './App.scss';

import AppLayout from './containers/layout';
import BottomNav from './containers/bottomNav';

const history = createBrowserHistory();


function App() {

  let { pageTrans } = useContext(PageTransContext)

  const classNames = {
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
              <CSSTransition key={location.pathname} classNames={classNames} timeout={1000}>
                <Switch location={location}>
                  <Route path="/" component={AppLayout} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />

        <BottomNav></BottomNav>
      </Router>
    </RootWrap>
  );
}


const RootWrap = styled.div`

    /* border:1px solid red; */

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





export default App;
