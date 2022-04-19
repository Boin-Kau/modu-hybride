import React, { useContext, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ContentWrap, HeaderWrap, PageWrap } from "../../../styled/shared/wrap";
import { TextMiddle } from "../../../styled/shared";
import { useHistory } from "react-router-dom";

import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction, BottomNavOpenAction } from "../../../reducers/container/bottomNav";
import { customApiClient } from "../../../shared/apiClient";

import icon_back from "../../../assets/icon-back-arrow.svg";
import { MainText } from "../../../styled/shared/text";
import { LoginInput } from "../../../styled/shared";
import styled from "styled-components";
import BottomButton from "../../../components/party/BottomButton";
import { UserInfoUpdate } from "../../../reducers/info/user";

const SignInPhone = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAuthCode, setPhoneAuthCode] = useState("");

  //타이머 데이터
  const [timeMin, setTimeMin] = useState(3);
  const [timeSec, setTimeSec] = useState(0);
  const [codeInputAccess, setCodeInputAccess] = useState(false);
  const [intervalId, setIntervalId] = useState();

  //페이지별 벨리데이션
  const [phoneNumberPageStatus, setPhoneNumberPageStatus] = useState(false);
  const [phoneAuthPageStatus, setPhoneAuthPageStatus] = useState(false);

  //페이지내 최종 벨리데이션
  const [pageConfirmStatus, setPageConfirmStatus] = useState(false);

  //에러 메세지
  const [phoneErrorText, setPhoneErrorText] = useState("");
  const [timerErrorText, setTimerErrorText] = useState("");

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

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

  const goToPhoneAuth = async () => {

    //애플 검수를 위한 임시 로그인 처리
    if (phoneNumber == '01092756351') {

      await localStorage.setItem('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHgiOjIsIm5hbWUiOiLsnbTquLDtg50iLCJiaXJ0aCI6IiIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjUwMzUyMjg4LCJleHAiOjE2ODE4ODgyODh9.0RDWtqyxuPf8i8pUjmhSuhdaOOOx1GIMHmLc9yhPMBM');

      const authData = await customApiClient('get', '/user/jwt');

      //벨리데이션
      if (!authData || authData.statusCode != 200) {
        alert("오류가 발생하였습니다. 다시 시도해주세요.");
        return
      }
      dispatch({
        type: UserInfoUpdate,
        data: authData.result
      })

      dispatch(BottomNavOpenAction);
      setPageTrans('trans toRight');
      history.push('/main');
      return

    }

    //인증번호 전송 API 호출
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

    if (data.statusCode == 200) {
      //성공시 로직
      setPhoneErrorText("");
      setPageConfirmStatus(phoneAuthPageStatus);

      setPageTrans("trans toRight");
      history.push({
        pathname: "/signin/phone/auth",
        props: {
          phoneNumber: phoneNumber,
          setPhoneErrorText: setPhoneErrorText,
        },
      });
    }
  };

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);

  const handlePhoneNumber = useCallback(
    (e) => {
      setPhoneNumber(e.target.value);

      const reg = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;

      //휴대폰번호 벨리데이션
      if (!reg.test(e.target.value)) {
        setPageConfirmStatus(false);
        setPhoneNumberPageStatus(false);
        setPhoneErrorText("올바른 휴대폰 번호를 입력해주세요.");
        return;
      }

      setPhoneErrorText("");
      setPageConfirmStatus(true);
      setPhoneNumberPageStatus(true);
    },
    [phoneNumber]
  );

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
            <span className="yellowText">휴대폰 번호</span>를 <br />
            입력해주세요.
          </MainText>
          <LoginInput
            className="spoqaBold"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            type="tel"
            placeholder="휴대폰 번호 (- 없이 입력)"
          />
          <ErrorText className="spoqaRegular">{phoneErrorText}</ErrorText>
          <BottomButton
            text={"다음"}
            activeStatus={phoneNumberPageStatus}
            isBottomStatus={true}
            clickFunc={goToPhoneAuth}
          />
        </ContentWrap>
      </PageWrap>
    </div>
  );
};

export default SignInPhone;

const ErrorText = styled.div`
  height: 1.0625rem;
  margin: 0.125rem 0 1.125rem 0;
  font-size: 0.6875rem;
  color: #fb5e5e;
  line-height: 1.0625rem;
`;
