import React, { useContext, useEffect} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";

import ic_check from '../../../assets/ic_paysuccess_check.svg';
import ic_duck from "../../../assets/ic_signup_sucess_duck@2x.png";
import BottomButton from "../../../components/party/BottomButton";

const SignInAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);

  return (
    <div className="page" style={{ backgroundColor: "#ffffff" }}>
    <Container>
      <img
        src={ic_check}
        className="ic_paysuccess_check"
      />
      <span className="spoqaBold firstText">회원가입 완료</span>
      <span className="spoqaMedium secondText">
        회원가입이 완료됐어요.<br/>
        모두에서 다양한 구독 서비스를 즐겨보세요!
      </span>
      <img src={ic_duck} className="img-duck"/>
    </Container>
    <BottomButton text={"홈으로 가기"} activeStatus={true} isBottomStatus={true}/>
  </div>
  );
};

export default SignInAuth;

const Container = styled.div`
  padding-top: 10.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .ic_paysuccess_check {
    width: 2.5125rem;
    height: 2.5125rem;
  }

  .firstText {
    font-size: 1.25rem;
    text-align: center;
    color: #ffca2c;
    margin: 0.75rem 0;
  }

  .secondText {
    font-size: 0.75rem;
    line-height: 1.67;
    text-align: center;
    color: #313131;
  }

  .img-duck{
      width: 13.7375rem;
      height: 9.8125rem;
      margin-top: 1.4688rem;
  }
`;

