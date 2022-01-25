import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

import {TextMiddle} from "../../../styled/shared";
import { useHistory,useLocation } from 'react-router-dom';

const Name = () => {
  const history = useHistory();
  const location = useLocation();

  //state
  const [name,setName] = useState('');

  const goToLogin=()=>{
    history.push('login');
  }

  useEffect(() => {
    setName(location.props.name);
  }, []);
  
  return (
    <div className="page"  style={{ backgroundColor: "#ffffff", position: 'relative' }}>
      <PageWrap>
        <HeaderWrap className="spoqaBold">
          <TextMiddle>이름 찾기</TextMiddle>
        </HeaderWrap>

        <NameWrap className="notoMedium">
          <NameText>
            회원님의 이름은<br/>
            {name}입니다.
          </NameText>

          <SubmitButton className="spoqaBold" onClick={goToLogin}>
            <SubmitText>
              로그인
            </SubmitText>
          </SubmitButton>
        </NameWrap>

      </PageWrap>
    </div>
  );
}

const PageWrap = styled.div`
  position: absolute;
  top: 3.0625rem;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  background-color: #ffffff;
`;

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 3.0625rem;

  background-color: #ffffff;
  text-align: center;

  font-size: 0.875rem;
  color: #313131;

  box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;

const NameWrap = styled.div`
  margin: 25% 0 0 0;
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 50%;
`;

const NameText = styled.div`
  display:flex;
  font-size: 1.275rem;
  align-self: center;
  text-align: center;
`;

const SubmitButton = styled.div`
  display:flex;
  align-self : center;
  position: relative;
  width: 10.5rem;
  height: 3rem;

  background: #ffca17;
  border-radius: 1.3rem;
`;

const SubmitText = styled.div`
    position:absolute;

    font-size:0.875rem;

    width:100%;
    text-align:center;

    top:50%;
    transform:translate(0,-50%);

    color:#ffffff;
`;

export default Name;
