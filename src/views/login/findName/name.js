import React, { useState, useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";

import { TextMiddle } from "../../../styled/shared";
import { useHistory, useLocation } from 'react-router-dom';
import { PageTransContext } from "../../../containers/pageTransContext";
import { GAEventSubmit, GA_CATEOGRY, GA_USER_ACTION } from "../../../shared/gaSetting";

const Name = () => {
  const history = useHistory();
  const location = useLocation();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [name, setName] = useState('');

  const goToLogin = () => {
    GAEventSubmit(GA_CATEOGRY.USER, GA_USER_ACTION.FINDNAME);
    setPageTrans('trans toRight');
    history.push({
      pathname: 'login',
      props: {
        name: name
      }
    });
  }

  useEffect(() => {
    setName(location.props.name);
  }, []);

  return (
    <div className="page" style={{ backgroundColor: "#ffffff", position: 'relative' }}>
      <PageWrap>
        <HeaderWrap className="spoqaBold">
          <TextMiddle>이름 찾기</TextMiddle>
        </HeaderWrap>

        <NameWrap className="notoMedium">
          <NameText>
            <div>회원님의 이름은</div>
            <div>
              <span className="name spoqaBold">{name}</span>입니다.
            </div>
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
  font-size: 1rem;
  align-self: center;
  text-align: center;

  color:rgba(49,49,49,0.5);

  .name {
    margin-right:0.125rem;
    color:rgba(49,49,49,1);
  }
`;

const SubmitButton = styled.div`
  display:flex;
  align-self : center;
  position: relative;
  width: 13.125rem;
  height: 3rem;

  background: #ffca17;
  border-radius: 1.5625rem;
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
