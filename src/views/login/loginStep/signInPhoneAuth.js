import React, { useContext, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ContentWrap, HeaderWrap, PageWrap } from "../../../styled/shared/wrap";
import { TextMiddle } from "../../../styled/shared";
import { useHistory } from "react-router-dom";
import { customApiClient } from "../../../shared/apiClient";

import { PageTransContext } from "../../../containers/pageTransContext";
import {
  BottomNavOpenAction,
  BottomNavCloseAction,
} from "../../../reducers/container/bottomNav";
import {
  GA_CATEOGRY,
  GA_USER_ACTION,
  GAEventSubmit,
} from "../../../shared/gaSetting";
import { UserInfoUpdate } from "../../../reducers/info/user";

import icon_back from "../../../assets/icon-back-arrow.svg";
import { MainText } from "../../../styled/shared/text";
import { LoginInput } from "../../../styled/shared";
import styled from "styled-components";
import icon_timeout from "../../../assets/icon-timeout.svg";
import BottomButton from "../../../components/party/BottomButton";

const SignInPhoneAuth = ({ location }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [phoneAuthCode, setPhoneAuthCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  //페이지별 벨리데이션
  const [phoneAuthPageStatus, setPhoneAuthPageStatus] = useState(false);
  //페이지내 최종 벨리데이션
  const [pageConfirmStatus, setPageConfirmStatus] = useState(false);

  //타이머 데이터
  const [timeMin, setTimeMin] = useState(3);
  const [timeSec, setTimeSec] = useState(0);
  const [codeInputAccess, setCodeInputAccess] = useState(false);
  const [intervalId, setIntervalId] = useState();

  //에러 메세지
  const [phoneErrorText, setPhoneErrorText] = useState('');
  const [timerErrorText, setTimerErrorText] = useState("");

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
    beginTimer();
    console.log(location.props.phoneNumber);
    setPhoneNumber(location.props.phoneNumber);
    setPhoneErrorText(location.props.setPhoneErrorText);
  }, []);

  const handlePhoneAuthCode = useCallback(
    (e) => {
      setPhoneAuthCode(e.target.value);

      //타이머 벨리데이션
      if (!codeInputAccess) {
        setPageConfirmStatus(false);
        setPhoneAuthPageStatus(false);
        setTimerErrorText("인증시간이 만료되었습니다. 재발송을 해주세요.");
        return;
      }

      //인증코드 벨리데이션
      if (e.target.value.length != 4) {
        setPageConfirmStatus(false);
        setPhoneAuthPageStatus(false);
        // setTimerErrorText('올바른 인증코드를 입력해주세요.');
        setTimerErrorText("");
        return;
      }

      setTimerErrorText("");
      setPageConfirmStatus(true);
      setPhoneAuthPageStatus(true);
    },
    [codeInputAccess, phoneAuthCode]
  );

  let min = 3;
  let sec = 0;

  //타이머 시작 함수
  const beginTimer = () => {
    setCodeInputAccess(true);
    setTimerErrorText("");
    setPhoneAuthCode("");

    min = 3;
    sec = 0;
    setTimeMin(min);
    setTimeSec(sec);

    //시간 감소
    const timer = setInterval(() => {
      if (min == 0 && sec == 0) {
        setTimerErrorText("인증시간이 만료되었습니다. 재발송을 해주세요.");
        clearInterval(timer);
        setCodeInputAccess(false);
        setPageConfirmStatus(false);
      } else {
        if (sec == 0) {
          min = min - 1;
          sec = 59;
          setTimeMin(parseInt(min));
          setTimeSec(sec);
        } else {
          sec = sec - 1;
          setTimeSec(parseInt(sec));
        }
      }
    }, 1000);

    setIntervalId(timer);
  };

  //재발송 함수
  const reGenrateCode = async () => {
    if (codeInputAccess) return;

    // 인증번호 전송 API 호출
    const data = await customApiClient("post", "/user/code/generate", {
      phone: phoneNumber,
    });

    //서버에러
    if (!data) return;

    //벨리데이션
    if (data.statusCode != 200) {
      setPhoneErrorText(data.message);
      return;
    }

    //성공시 로직
    setPhoneErrorText("");

    console.log(phoneNumber);
    //타이머 함수 실행
    beginTimer();
  };

  const authCode = async () => {
    //인정코드 인증 API 호출
    const data = await customApiClient("post", "/user/code/auth", {
      phone: phoneNumber,
      code: phoneAuthCode,
    });

    //서버에러
    if (!data) return;

    //벨리데이션
    if (data.statusCode != 100 && data.statusCode != 200) {
      setTimerErrorText(data.message);
      return;
    }

    //로그인 로직
    if (data.statusCode == 200) {
      clearInterval(intervalId);

      await localStorage.setItem("x-access-token", data.jwt);

      const authData = await customApiClient("get", "/user/jwt");

      //벨리데이션
      if (!authData || authData.statusCode != 200) {
        alert("오류가 발생하였습니다. 다시 시도해주세요.");
        return;
      }

      // ReactGA.event({
      //     category: 'User',
      //     action: 'Login an Account'
      // });

      GAEventSubmit(GA_CATEOGRY.USER, GA_USER_ACTION.LOGIN);

      dispatch({
        type: UserInfoUpdate,
        data: authData.result,
      });

      dispatch(BottomNavOpenAction);
      setPageTrans("trans toRight");
      history.push("/main");
      return;
    }
  };

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
          <TextMiddle>로그인</TextMiddle>
        </HeaderWrap>
        <ContentWrap>
          <MainText>
            <span className="yellowText">인증번호</span>를 <br />
            입력해주세요.
          </MainText>
          <LoginInput
            className="spoqaBold"
            value={phoneAuthCode}
            onChange={handlePhoneAuthCode}
            type="tel"
            placeholder="인증번호 입력"
          />
          <ErrorText className="spoqaRegular">{timerErrorText}</ErrorText>
          <div className="spoqaBold" style={{ display: "flex" }}>
            <div style={{ flexGrow: "1" }}></div>
            <div style={{ position: "relative", width: "1.375rem" }}>
              <img
                style={{
                  position: "absolute",
                  top: "55%",
                  transform: "translate(0,-55%)",
                  width: "1rem",
                  height: "0.8125rem",
                }}
                src={icon_timeout}
              />
            </div>
            <div
              style={{
                position: "relative",
                width: "2.5rem",
                fontSize: "0.8125rem",
                color: "#fb5e5e",
              }}
            >
              <TextMiddle>
                {timeMin}:{timeSec < 10 ? `0${timeSec}` : timeSec}
              </TextMiddle>
            </div>
            <ReGenerateButton
              activateStatus={!codeInputAccess}
              onClick={reGenrateCode}
            >
              <div style={{ fontSize: "0.8125rem", color: "#ffffff" }}>
                재발송
              </div>
            </ReGenerateButton>
          </div>
          <BottomButton
            text={"다음"}
            activeStatus={phoneAuthPageStatus}
            isBottomStatus={true}
            clickFunc={authCode}
          />
        </ContentWrap>
      </PageWrap>
    </div>
  );
};

export default SignInPhoneAuth;

const ReGenerateButton = styled.div`
  padding: 0.375rem 0.7188rem;
  border-radius: 0.1875rem;
  background-color: ${(props) =>
    props.activateStatus ? "#ffca17" : "#e3e3e3"};
`;

const ErrorText = styled.div`
  height: 1.0625rem;
  margin: 0.125rem 0 0 0;
  font-size: 0.6875rem;
  color: #fb5e5e;
  line-height: 1.0625rem;
`;
