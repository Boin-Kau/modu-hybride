import styled from 'styled-components';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import AppLayout from './containers/layout';

function App() {

  const history = createBrowserHistory();


  return (
    <RootWrap>

      <Router>
        <Switch>
          <Route path="/" component={AppLayout} />
        </Switch>
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
