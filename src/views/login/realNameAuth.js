import React, { useContext, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ContentWrap, HeaderWrap, PageWrap } from "../../styled/shared/wrap";
import { TextMiddle } from "../../styled/shared";
import { useHistory, useLocation } from "react-router-dom";

import { PageTransContext } from "../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../reducers/container/bottomNav";

import icon_back from "../../assets/icon-back-arrow.svg";
import auth_duck from "../../assets/ic_signup_duck@2x.png";
import yellow_duck from "../../assets/ic_signup_little_duck (non-optimized)@4x.png";
import { MainText } from "../../styled/shared/text";
import styled from "styled-components";
import BottomButton from "../../components/party/BottomButton";

import BootPay from "bootpay-js";
import { customApiClient } from "../../shared/apiClient";
import { LoadingOpenAction, LoadingCloseAction } from "../../reducers/container/loading";
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from "../../reducers/container/message";
import { checkMobile } from "../../App";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RealNameAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let query = useQuery();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  useEffect(async () => {

    //본인인증 뒤로가기 처리
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth === "Y") {
      const pastPath = sessionStorage.getItem("pastPath");
      setPageTrans('trans toLeft');

      if (!pastPath || pastPath.length < 0) {
        history.push("/party");
      }
      else {
        history.push(pastPath);
      }

      return
    }

    dispatch(BottomNavCloseAction);

    const userPlatform = checkMobile();
    if (userPlatform == 'ios') {
      //IOS 배경색 설정
      try {
        window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
      }
      catch (err) {
      }
    }
  }, []);

  //본인인증 버튼
  const handleClickRealNameAuth = () => {

    BootPay.request({
      price: 0, // 0으로 해야 한다.
      application_id: process.env.REACT_APP_BOOTPAY_ID,
      name: '모두 본인인증', //결제창에서 보여질 이름
      pg: 'danal',
      method: 'auth', // 빌링키를 받기 위한 결제 수단
      show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
      order_id: (new Date()).getTime(), //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
      user_info: {
        phone: localStorage.getItem("phone") || null
      },
    }).error(function (data) {
      // 본인인증 진행시 에러가 발생하면 수행됩니다.
      console.log(data);
    }).cancel(function (data) {
      // 본인인증이 취소되면 수행됩니다.
      console.log(data);
    }).done(function (data) {
      // 본인인증이 완료되면 관련된 값이 리턴된다.
      const receiptId = data.receipt_id;
      postRealNameAuth(receiptId);
    });
  }

  const postRealNameAuth = async (receiptId) => {

    dispatch(LoadingOpenAction);

    const data = await customApiClient('post', '/user/realName/auth', {
      receiptId: receiptId
    });

    //서버에러
    if (!data) {
      dispatch(LoadingCloseAction);
      alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
      return
    }

    //벨리데이션
    if (data.statusCode != 200) {
      dispatch(LoadingCloseAction);
      alert(data.message);
      return
    }

    //서버통신 한번 더 하고 isAdult값 저장시켜야함

    localStorage.setItem("isAuth", "Y");
    dispatch(LoadingCloseAction);

    //토스트 메시지
    //본인인증 완료 팝업 띄우기
    dispatch({
      type: MessageWrapOpen
    })
    dispatch({
      type: MessageOpen,
      data: '본인인증이 정상적으로 완료되었어요.'
    })

    setTimeout(() => {
      dispatch({
        type: MessageClose
      })
    }, 2000);
    setTimeout(() => {
      dispatch({
        type: MessageWrapClose
      })
    }, 2300);

    //원래 가려했던 페이지로 이동
    setPageTrans("trans toRight");

    if (query.get("path")) {
      history.push(query.get("path"));
    }
    else {
      history.push("/main");
    }
  }

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
          <TextMiddle>본인인증</TextMiddle>
        </HeaderWrap>
        <ContentWrap>
          <MainText>
            하단 버튼탭을 누르면
            <br /> <span className="yellowText">본인인증</span>으로 이동합니다.
          </MainText>
          <AuthContentWrap>
            <div style={{ textAlign: "center" }}>
              <img src={auth_duck} className="mainImg" />
            </div>
            <div className="notice">
              <div className="notice-wrap">
                <img src={yellow_duck} className="notice-img" />
                <div className="notice-text notoMedium">
                  구독파티 내 구독계정 공유 서비스를 위해 최초 1회 본인인증이
                  필요해요.
                </div>
              </div>
            </div>
          </AuthContentWrap>
          <BottomButton
            text={"본인인증하기"}
            activeStatus={true}
            isBottomStatus={true}
            clickFunc={handleClickRealNameAuth} />
        </ContentWrap>
      </PageWrap>
    </div>
  );
};

export default RealNameAuth;

const AuthContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  .mainImg {
    width: 15.4812rem;
    height: 8.3375rem;

    margin-top:2.5rem;
    margin-bottom: 0.8187rem;
  }

  .notice {
    height: 4.3125rem;
    display: flex;
    padding:0 0.9375rem;
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

    line-height:1.3125rem;
  }
`;
