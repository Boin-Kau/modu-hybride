import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { checkMobile, onClickTerminate } from "../../App";
import splash_duck from "../../assets/img_splash_duck.png";
import modu_logo from "../../assets/img_splash_modu.svg";
import { PageTransContext } from "../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../reducers/container/bottomNav";
import { UserInfoUpdate } from "../../reducers/info/user";
import { customApiClient } from "../../shared/apiClient";
import {
  GAEventSubmit,
  GA_CATEOGRY,
  GA_USER_ACTION,
} from "../../shared/gaSetting";
import UpdatePopUp from "../popup/update";

const Splash = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //강제 업데이트 팝업
  const [updatePopupStatus, setUpdatePopupStatus] = useState(false);

  const goToLogin = () => {
    setPageTrans("trans toRight");
    history.push("/login");
  };

  const goToSignUp = () => {
    setPageTrans("trans toRight");
    history.push("/signup");
  };

  useEffect(async () => {
    alert(
      "9월 6일에 모두 서비스가 종료될 예정이에요. 그동안 모두를 이용해주셔서 진심으로 감사드립니다. 🙇🏻‍♂️🙇🏻‍♀️"
    );

    localStorage.removeItem("isFcmLoad");

    let localFcm = localStorage.getItem("fcmToken");
    if (
      localFcm == undefined ||
      localFcm == "undefined" ||
      localFcm.length == 0
    ) {
      localFcm = null;
    }

    const current_user_platform = checkMobile();

    //앱 버전관련 로직
    try {
      if (current_user_platform == "android") {
        const verson = await window.android.getVersionName();
        localStorage.setItem("versonName", verson);
      } else if (current_user_platform == "ios") {
        window.webkit.messageHandlers.getVersionName.postMessage("hihi");
      }
    } catch (err) {
      localStorage.removeItem("versonName");
    }

    //fcm token 가져오기 -> 앱 업데이트 되면 주석처리
    if (current_user_platform == "android" && !localFcm) {
      try {
        const fcmToken = await window.android.getFcmToken();
        localStorage.setItem("fcmToken", fcmToken);
      } catch (err) {
        console.log(err);
      }
    }

    const data = await customApiClient("get", "/user/jwt");

    if (data == "Network Error") {
      history.push("/inspection");
      return;
    }

    //벨리데이션
    if (!data || data.statusCode != 200) {
      localStorage.removeItem("x-access-token");
      dispatch(BottomNavCloseAction);

      if (current_user_platform == "android") {
        //splash close 함수 호출
        try {
          window.android.closeSplash();
        } catch (err) {
          console.log(err);
        }
      } else if (current_user_platform == "ios") {
        //splash close 함수 호출
        try {
          window.webkit.messageHandlers.closeSplash.postMessage("hihi");
        } catch (err) {
          console.log(err);
        }
      }

      //앱 버전 체크
      const verson = localStorage.getItem("versonName");

      if (!verson || (verson !== "2.1.0" && verson !== "2.1.1")) {
        if (process.env.NODE_ENV !== "development") {
          setUpdatePopupStatus(true);
        }
      }
      return;
    }

    dispatch({
      type: UserInfoUpdate,
      data: data.result,
    });

    localStorage.setItem("phone", data.result.phone);
    localStorage.setItem("isAuth", data.result.isAuth);
    localStorage.setItem("isAdult", data.result.isAdult);

    GAEventSubmit(GA_CATEOGRY.USER, GA_USER_ACTION.LOGIN);

    history.push("/main");
    return;
  }, []);

  return (
    <>
      <div className="page" style={{ backgroundColor: "#ffca2c" }}>
        <div
          id="back_link"
          onClick={onClickTerminate}
          style={{ display: "none" }}
        />
        <SplashWrap>
          <img className="img_splash_modu" src={modu_logo} />
          <span className="spoqaBold">
            모두가 일상 속 구독을 <br />
            자유롭게 이용하도록, <br />
            MODU.
          </span>
          <img className="img_splash_duck" src={splash_duck} />
          <div className="buttonWrap">
            <div className="sign-up-button spoqaBold" onClick={goToSignUp}>
              회원가입
            </div>
            <div className="login-button">
              <div className="notoMedium" style={{ marginRight: "0.375rem" }}>
                이미 가입하셨나요?
              </div>
              <div className="notoBold" onClick={goToLogin}>
                로그인
              </div>
            </div>
          </div>
        </SplashWrap>
      </div>

      {/* 업데이트 팝업 */}
      <UpdatePopUp openStatus={updatePopupStatus} />
    </>
  );
};

const SplashWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  margin: 0 1.25rem;
  overflow-y: scroll;

  .img_splash_modu {
    width: 6.6437rem;
    height: 1.6125rem;
    margin-top: 15.5vh;
    object-fit: contain;
  }

  span {
    font-size: 1.25rem;
    text-align: left;
    color: #fff;
  }

  .img_splash_duck {
    width: 100%;
    height: 14.9437rem;
    margin: 2.8687rem 0 5.875rem 0;
    object-fit: contain;
  }

  .buttonWrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .sign-up-button {
    display: flex;
    padding: 0.8125rem 0 0.75rem;
    border-radius: 0.5rem;
    background-color: #fff;
    color: #ffca2c;
    font-size: 0.9375rem;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .login-button {
    display: flex;
    flex-direction: row;
    margin: 0.5625rem 0 3.9375rem;
    font-size: 0.875rem;
    color: #fff;
    justify-content: center;
  }
`;

export default Splash;
