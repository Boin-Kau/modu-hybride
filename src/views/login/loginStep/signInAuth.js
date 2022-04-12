import React, { useContext, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ContentWrap, HeaderWrap, PageWrap } from "../../../styled/shared/wrap";
import { TextMiddle } from "../../../styled/shared";
import { useHistory } from "react-router-dom";

import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";

import icon_back from "../../../assets/icon-back-arrow.svg";
import auth_duck from "../../../assets/ic_signup_duck@2x.png";
import yellow_duck from "../../../assets/ic_signup_little_duck (non-optimized)@4x.png";
import { MainText } from "../../../styled/shared/text";
import styled from "styled-components";
import BottomButton from "../../../components/party/BottomButton";

const SignInAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);

  return (
    <div className="page">
      <PageWrap>
        <HeaderWrap id="back_link" className="spoqaBold" onClick={closePage}>
          <div
            style={{
              position: "absolute",
              top: "55%",
              left: "1.25rem",
              transform: "translate(0,-55%)",
            }}
          >
            <img src={icon_back}></img>
          </div>
          <TextMiddle>회원가입</TextMiddle>
        </HeaderWrap>
        <ContentWrap>
          <MainText>
            모두의 서비스를
            <br /> 원활히 이용하기 위해,
            <br /> <span className="yellowText">본인인증</span>이 필요해요.
          </MainText>
          <AuthContentWrap>
            <img src={auth_duck} className="mainImg" />
            <div className="notice">
              <div className="notice-wrap">
                  <img src={yellow_duck} className="notice-img" />
                  <div className="notice-text notoRegular">
                    구독파티 내 구독계정 공유 서비스를 위해 최초 1회 본인인증이
                    필요해요.
                  </div>
              </div>
            </div>
          </AuthContentWrap>
          <BottomButton text={"본인인증하기"} activeStatus={true} isBottomStatus={true}/>
        </ContentWrap>
      </PageWrap>
    </div>
  );
};

export default SignInAuth;

const AuthContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .mainImg {
    width: 15.4812rem;
    height: 8.3375rem;
    margin-bottom: 0.8187rem;
  }

  .notice {
    width: 100%;
    height: 4.3125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.4375rem;
    background-color: #fff7e0;
  }

  .notice-wrap{
    display: flex;
    flex-direction: row;
  }

  .notice-img {
    width: 1.2rem;
    height: 1.2rem;
    margin-top: 0.1437rem;
  }

  .notice-text {
    width: 15.4375rem;
    height: 2.4375rem;
    font-size: 0.75rem;
    margin-left: 0.475rem;
    text-align: left;
  }
`;
