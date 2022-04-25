import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PageTransContext } from "../../containers/pageTransContext";
import { TextMiddle } from "../../styled/shared";
import { BottomNavCloseAction } from "../../reducers/container/bottomNav";
import { PageWrap, HeaderWrap, ContentWrap } from "../../styled/shared/wrap";

import icon_check from "../../assets/icon-check-white.svg";
import icon_back from "../../assets/icon-back-arrow.svg";

import {
  TitleWrap,
  ItemWrap,
  PartyIconWrap,
  PartyIcon,
  PartyText,
} from "../../styled/main/enrollment";
import { customApiClient } from "../../shared/apiClient";
import { MainText } from "../../styled/shared/text";

import InputComponent from "../../styled/shared/inputComponent";
import Keyboard from "./keyboard";
import BottomButton from "../../components/party/BottomButton";
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from "../../reducers/container/message";

const CardRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [pageConfirmStatus, setPageConfirmStatus] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //키보드 관련 state
  const [keyboardUp, setKeyboardUp] = useState(false);
  const [focusThree, setFocusThree] = useState(false);
  const [focusFour, setFocusFour] = useState(false);
  const [keyboardNum, setKeyboardNum] = useState("");

  //state-카드정보
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardPw, setCardPw] = useState("");
  const [expire, setExpire] = useState("");
  const [identifyNumber, setIdentifyNumber] = useState("");

  //state-약관
  const [isFreeOne, setIsFreeOne] = useState("N");
  const [isFreeTwo, setIsFreeTwo] = useState("N");
  const [isFreeThree, setIsFreeThree] = useState("N");
  const [isFreeFour, setIsFreeFour] = useState("N");

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);

  useEffect(async () => {
    setCardNum(num1 + num2 + num3 + num4);
    // console.log(cardNum);
  }, [num1, num2, num3, num4, cardNum]);

  useEffect(() => {
    if (focusThree == true) {
      setNum3(keyboardNum);
    } else if (focusFour == true) {
      setNum4(keyboardNum);
    }
  }, [keyboardNum]);

  //input autoFocusing
  const handleNextFocus = (e, next) => {
    const { value, maxLength } = e.target;
    if (value.length === maxLength) {
      if (next) {
        const nextRef = document.getElementById(next);
        if (nextRef) {
          nextRef.focus();
        }
      }
    }
  };

  //cardNum
  const handleChangeOne = (e) => {
    if (e.target.value.length == 5) return false;
    setNum1(e.target.value);
    handleNextFocus(e, "num2");
  };

  const handleChangeTwo = (e) => {
    if (e.target.value.length == 5) return false;
    setNum2(e.target.value);
    handleNextFocus(e, "num3");
    if (e.target.value.length === 4) {
      setFocusThree(true);
      setKeyboardUp(true);
      document.activeElement.blur();
    }
  };

  const onChangeExpire = (e) => {
    setExpire(e.target.value);
    handleNextFocus(e, "cardPw");
  };

  const onChangePw = (e) => {
    setCardPw(e.target.value);
    handleNextFocus(e, "identifyNumber");
  };

  const onChangeId = (e) => {
    if (e.target.value.length == 11) return false;
    setIdentifyNumber(e.target.value);
  };

  //isFree
  const onClickIsFreeOne = useCallback(() => {
    if (isFreeOne == "N") {
      setIsFreeOne("Y");
      setIsFreeTwo("Y");
      setIsFreeThree("Y");
      setIsFreeFour("Y");
    } else {
      setIsFreeOne("N");
      setIsFreeTwo("N");
      setIsFreeThree("N");
      setIsFreeFour("N");
    }
  }, [isFreeOne]);

  const onClickIsFreeTwo = useCallback(() => {
    if (isFreeTwo == "N") {
      setIsFreeTwo("Y");
    } else {
      setIsFreeOne("N");
      setIsFreeTwo("N");
    }
  }, [isFreeTwo]);

  const onClickIsFreeThree = useCallback(() => {
    if (isFreeThree == "N") {
      setIsFreeThree("Y");
    } else {
      setIsFreeOne("N");
      setIsFreeThree("N");
    }
  }, [isFreeThree]);

  const onClickIsFreeFour = useCallback(() => {
    if (isFreeFour == "N") {
      setIsFreeFour("Y");
    } else {
      setIsFreeOne("N");
      setIsFreeFour("N");
    }
  }, [isFreeFour]);

  const onClickKeyboardUpThree = () => {
    if (keyboardUp == false) {
      setKeyboardUp(true);
    }
    if (focusFour == true) {
      setFocusFour(false);
    }
    setFocusThree(true);
  };

  const onClickKeyboardUpFour = () => {
    if (keyboardUp == false) {
      setKeyboardUp(true);
    }
    if (focusThree == true) {
      setFocusThree(false);
    }
    setFocusFour(true);
  };

  //정보 입력 완료
  const onClickRevise = useCallback(async () => {
    if (!pageConfirmStatus) return;

    const data = await customApiClient("post", "/party/user/card", {
      cardNum: cardNum,
      cardPw: cardPw,
      expireMonth: expire.substring(0, 2),
      expireYear: expire.substring(2),
      identifyNumber: identifyNumber,
    });

    console.log(data);
    //서버에러
    if (!data) return;

    //벨리데이션
    if (data.statusCode != 200) {
      setError(true);
      setErrorMsg(data.message);
      console.log(errorMsg);
      //리덕스에 넣어주기
      dispatch({ type: "PopupOpen" });
      return;
    }

    //토스트 메시지
    //수정완료 팝업 띄우기
    dispatch({
      type: MessageWrapOpen
    })
    dispatch({
      type: MessageOpen,
      data: '카드가 정상적으로 등록되었어요.'
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

    //뒤로가기
    setPageTrans("trans toRight");
    history.goBack();
  }, [pageConfirmStatus, cardNum, cardPw, expire, identifyNumber]);

  //페이지 벨리데이션
  useEffect(() => {
    if (
      num1 &&
      num2 &&
      num3 &&
      num4 &&
      cardNum &&
      cardPw &&
      expire &&
      identifyNumber &&
      isFreeOne == "Y" &&
      isFreeTwo == "Y" &&
      isFreeThree == "Y" &&
      isFreeFour == "Y"
    ) {
      setPageConfirmStatus(true);
    } else {
      setPageConfirmStatus(false);
    }
  }, [
    num1,
    num2,
    num3,
    num4,
    cardNum,
    cardPw,
    expire,
    identifyNumber,
    isFreeOne,
    isFreeTwo,
    isFreeThree,
    isFreeFour,
  ]);

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
          <TextMiddle>카드등록</TextMiddle>
        </HeaderWrap>

        <ContentWrap style={{ display: "flex", flexDirection: "column" }}>
          <MainText>
            <span className="yellowText">구독파티 </span>
            정기결제에 사용할
            <br /> 카드를 등록해주세요
          </MainText>
          {/* 카드번호 입력 */}
          <div>
            <TitleWrap className="notoMedium">카드번호</TitleWrap>
            <ItemWrap style={{ flexDirection: "row" }}>
              <InputComponent
                id={"num1"}
                type={"number"}
                placeholder={"0000"}
                maxLength={4}
                value={num1}
                onChange={handleChangeOne}
                keyboardUp={keyboardUp}
                setKeyboardUp={setKeyboardUp}
                setFocusThree={setFocusThree}
                setFocusFour={setFocusFour}
              />
              <Hypen>-</Hypen>
              <InputComponent
                id={"num2"}
                type={"number"}
                placeholder={"0000"}
                maxLength={4}
                value={num2}
                onChange={handleChangeTwo}
                keyboardUp={keyboardUp}
                setKeyboardUp={setKeyboardUp}
                setFocusThree={setFocusThree}
                setFocusFour={setFocusFour}
              />
              <Hypen>-</Hypen>
              <InputWrap openStatus={focusThree}>
                <Input onClick={onClickKeyboardUpThree}>
                  {num3.length === 0 ? (
                    <span className="placeholder">0000</span>
                  ) : (
                      <span style={{ fontSize: "0.625rem" }}>
                        {"●".repeat(num3.length)}
                      </span>
                    )}
                </Input>
              </InputWrap>
              <Hypen>-</Hypen>
              <InputWrap openStatus={focusFour}>
                <Input onClick={onClickKeyboardUpFour}>
                  {num4.length === 0 ? (
                    <span className="placeholder">0000</span>
                  ) : (
                      <span style={{ fontSize: "0.625rem" }}>
                        {"●".repeat(num4.length)}
                      </span>
                    )}
                </Input>
              </InputWrap>
            </ItemWrap>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "48%",
              }}
            >
              <TitleWrap className="notoMedium">유효기간</TitleWrap>
              <InputComponent
                id={"expire"}
                type={"password"}
                placeholder={"MMYY"}
                maxLength={4}
                value={expire}
                onChange={onChangeExpire}
                keyboardUp={keyboardUp}
                setKeyboardUp={setKeyboardUp}
                setFocusThree={setFocusThree}
                setFocusFour={setFocusFour}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "48%",
              }}
            >
              <TitleWrap className="notoMedium">카드 비밀번호</TitleWrap>
              <InputComponent
                id={"cardPw"}
                type={"password"}
                placeholder={"비밀번호 앞 2자리"}
                maxLength={2}
                value={cardPw}
                onChange={onChangePw}
                keyboardUp={keyboardUp}
                setKeyboardUp={setKeyboardUp}
                setFocusThree={setFocusThree}
                setFocusFour={setFocusFour}
              />
            </div>
          </div>
          <div>
            <TitleWrap className="notoMedium">생년월일 / 사업자번호</TitleWrap>
            <InputComponent
              id={"identifyNumber"}
              type={"number"}
              placeholder={"생년월일 6자리 또는 사업자번호 10자리"}
              maxLength={4}
              value={identifyNumber}
              onChange={onChangeId}
              keyboardUp={keyboardUp}
              setKeyboardUp={setKeyboardUp}
              setFocusThree={setFocusThree}
              setFocusFour={setFocusFour}
            />
          </div>
          <div style={{ margin: "1.4375rem 0 0.75rem 0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.625rem",
              }}
              onClick={onClickIsFreeOne}
            >
              <PartyIconWrap isFree={isFreeOne}>
                <PartyIcon src={icon_check} />
              </PartyIconWrap>
              <PartyText className="notoMedium">
                19세 이상이며, 아래의 약관에 모두 동의합니다.
              </PartyText>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.625rem",
              }}
              onClick={onClickIsFreeTwo}
            >
              <PartyIconWrap isFree={isFreeTwo}>
                <PartyIcon src={icon_check} />
              </PartyIconWrap>
              <PartyText className="notoRegular" style={{ color: "#6a6a6a" }}>
                모두의 이용 약관 및 개인정보 처리방침에 동의합니다.
              </PartyText>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.625rem",
              }}
              onClick={onClickIsFreeThree}
            >
              <PartyIconWrap isFree={isFreeThree}>
                <PartyIcon src={icon_check} />
              </PartyIconWrap>
              <PartyText className="notoRegular" style={{ color: "#6a6a6a" }}>
                본인의 개인정보를 제 3자에게 제공하는 데에 동의합니다.
              </PartyText>
            </div>
            <div
              style={{
                display: "flex",
                marginBottom: "0.625rem",
              }}
              onClick={onClickIsFreeFour}
            >
              <PartyIconWrap isFree={isFreeFour}>
                <PartyIcon src={icon_check} />
              </PartyIconWrap>
              <PartyText className="notoRegular" style={{ color: "#6a6a6a" }}>
                본인의 개인정보를 결제 서비스업체에 제공하는 데에 동의합니다.
              </PartyText>
            </div>
          </div>
          <div style={{ flexGrow: "1" }} />
          <BottomButton
            text={"확인"}
            clickFunc={onClickRevise}
            ActiveStatus={pageConfirmStatus}
          />
        </ContentWrap>
        {keyboardUp && (
          <Keyboard
            setKeyboardUp={setKeyboardUp}
            number={keyboardNum}
            setNum={setKeyboardNum}
            three={focusThree}
            setThree={setFocusThree}
            four={focusFour}
            setFour={setFocusFour}
          />
        )}
      </PageWrap>
    </div>
  );
};

const InputWrap = styled.div`
  display: flex;
  padding: 0.625rem 0.875rem;
  flex-grow: 1;
  flex-basis: 0;

  border: ${(props) =>
    props.openStatus ? "0.0625rem solid #ffca2c" : "0.0625rem solid #e8e8e8"};

  border-radius: 0.25rem;

  font-size: 0.8125rem;

  background-color: #ffffff;
`;

const Input = styled.div`
  border: none;
  font-size: 0.8125rem;
  display: flex;
  padding: 0;
  overflow-x: scroll;
  align-items: center;
  height: 0.8125rem;

  .placeholder {
    font-size: 0.8125rem;
    color: #e8e8e8;
  }
`;

const Hypen = styled.span`
  display: flex;
  height: 1.3125rem;
  margin: 0.3125rem 0.25rem 0 0.25rem;
  font-family: "NotoSansCJKkr";
  font-size: 0.9375rem;
  font-weight: 500;
  color: #888;
`;

export default CardRegister;
