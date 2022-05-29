import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PageTransContext } from "../../containers/pageTransContext";
import { TextMiddle } from "../../styled/shared";
import { BottomNavCloseAction } from "../../reducers/container/bottomNav";
import { PageWrap, HeaderWrap, ContentWrap } from "../../styled/shared/wrap";
import { LoadingOpenAction, LoadingCloseAction } from "../../reducers/container/loading.js"

import icon_back from "../../assets/icon-back-arrow.svg";
import check_g from "../../assets/ic_payregis_check_g@3x.png";
import check_y from "../../assets/ic_payregis_check_y@3x.png";

import {
  TitleWrap,
  ItemWrap,
  PartyText,
} from "../../styled/main/enrollment";
import { customApiClient } from "../../shared/apiClient";
import { MainText } from "../../styled/shared/text";

import InputComponent from "../../styled/shared/inputComponent";
import Keyboard from "./keyboard";
import BottomButton from "../../components/party/BottomButton";
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from "../../reducers/container/message";
import { PopupOpen } from "../../reducers/popup/popup";

const CardRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [pageConfirmStatus, setPageConfirmStatus] = useState(false);

  //키보드 관련 state
  const [keyboardUp, setKeyboardUp] = useState(false);
  const [focusTwo, setFocusTwo] = useState(false);
  const [focusThree, setFocusThree] = useState(false);
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
  }, [num1, num2, num3, num4, cardNum]);

  useEffect(() => {
    if (focusTwo == true) {
      setNum3(keyboardNum);
    } else if (focusThree == true) {
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
    if (e.target.value.length === 4) {
      setFocusTwo(true);
      setKeyboardUp(true);
      document.activeElement.blur();
    }
  };

  const handleChangeThree = () => {
    const nextRef = document.getElementById("num4");
    if (nextRef) {
      nextRef.focus();
    }
  }

  const handleChangeFour = (e) => {
    if (e.target.value.length == 5) return false;
    setNum4(e.target.value);
    handleNextFocus(e, "expire");
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

  //전체동의
  useEffect(() => {

    if (isFreeTwo == "Y" &&
      isFreeThree == "Y" &&
      isFreeFour == "Y") {
      setIsFreeOne("Y");
    }

  }, [isFreeTwo, isFreeThree, isFreeFour])

  const onClickKeyboardUpThree = () => {
    if (keyboardUp == false) {
      setKeyboardUp(true);
    }
    if (focusThree == true) {
      setFocusThree(false);
    }
    setFocusTwo(true);
  };

  const onClickKeyboardUpFour = () => {
    if (keyboardUp == false) {
      setKeyboardUp(true);
    }
    if (focusTwo == true) {
      setFocusTwo(false);
    }
    setFocusThree(true);
  };

  //정보 입력 완료
  const onClickRevise = useCallback(async () => {
    if (!pageConfirmStatus) return;

    //로딩시작 액션호출
    dispatch(LoadingOpenAction);

    const data = await customApiClient("post", "/party/user/card", {
      cardNum: cardNum,
      cardPw: cardPw,
      expireMonth: expire.substring(0, 2),
      expireYear: expire.substring(2),
      identifyNumber: identifyNumber,
    });

    //로딩종료 액션호출
    dispatch(LoadingCloseAction);

    //서버에러
    if (!data) return;

    //벨리데이션
    if (data.statusCode !== 200) {

      //리덕스에 넣어주기
      if (data.statusCode === 4001) {
        dispatch({
          type: PopupOpen,
          data: '입력하신 카드번호를 다시 한번 확인해주십시오.'
        })
      }
      else if (data.statusCode === 4002) {
        dispatch({
          type: PopupOpen,
          data: '카드잔고가 부족합니다. 잔고 확인 후, 다시 시도해주세요.'
        })
      }
      else if (data.statusCode === 4003) {
        dispatch({
          type: PopupOpen,
          data: '이미 등록된 카드입니다.'
        })
      }
      else if (data.statusCode === 4005) {
        dispatch({
          type: PopupOpen,
          data: '본인 명의의 카드만 등록 가능합니다.'
        })
      }
      else {
        alert(data.message);
      }
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

  const TermPopupOpen = () => {
    dispatch({ type: "DetailPopupOpen" });
  };

  const PolicyPopupOpen = () => {
    dispatch({ type: "PolicyPopupOpen" });
  };

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
      isFreeOne == "Y"
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
              <div>
                <InputComponent
                  id={"num1"}
                  type={"number"}
                  placeholder={"0000"}
                  maxLength={4}
                  value={num1}
                  onChange={handleChangeOne}
                  keyboardUp={keyboardUp}
                  setKeyboardUp={setKeyboardUp}
                  setFocusTwo={setFocusTwo}
                  setFocusThree={setFocusThree}
                />
              </div>
              <Hypen>-</Hypen>
              <div style={{ position: "relative" }}>
                <InputComponent
                  id={"num2"}
                  type={"password"}
                  placeholder={"0000"}
                  maxLength={4}
                  value={num2}
                  onChange={() => { }}
                />
                <InputWrap openStatus={focusTwo}>
                  <Input onClick={onClickKeyboardUpThree} />
                </InputWrap>
              </div>
              <Hypen>-</Hypen>
              <div style={{ position: "relative" }}>
                <InputComponent
                  id={"num3"}
                  type={"password"}
                  placeholder={"0000"}
                  maxLength={4}
                  value={num3}
                  onChange={() => { }}
                />
                <InputWrap openStatus={focusThree}>
                  <Input onClick={onClickKeyboardUpFour} />
                </InputWrap>
              </div>
              <Hypen>-</Hypen>
              <div>
                <InputComponent
                  id={"num4"}
                  type={"number"}
                  placeholder={"0000"}
                  maxLength={4}
                  value={num4}
                  onChange={handleChangeFour}
                  keyboardUp={keyboardUp}
                  setKeyboardUp={setKeyboardUp}
                  setFocusTwo={setFocusTwo}
                  setFocusThree={setFocusThree}
                />
              </div>
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
                setFocusTwo={setFocusTwo}
                setFocusThree={setFocusThree}
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
                setFocusTwo={setFocusTwo}
                setFocusThree={setFocusThree}
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
              setFocusTwo={setFocusTwo}
              setFocusThree={setFocusThree}
            />
          </div>
          <div style={{ margin: "1.4375rem 0 0.75rem 0" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "0.625rem",
              }}
              onClick={onClickIsFreeOne}
            >
              <CheckIcon src={isFreeOne === "Y" ? check_y : check_g} />
              <PartyText className="notoMedium">
                19세 이상이며, 아래의 약관에 모두 동의합니다.
              </PartyText>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "0.625rem",
              }}
            >
              <CheckIcon src={isFreeTwo === "Y" ? check_y : check_g} onClick={onClickIsFreeTwo} />
              <PartyText className="notoRegular" style={{ color: "#6a6a6a" }}>
                모두의 <span onClick={TermPopupOpen} style={{ textDecoration: "underline" }}>이용 약관</span> 및 <span onClick={PolicyPopupOpen} style={{ textDecoration: "underline" }}>개인정보 처리방침</span>에 동의합니다.
              </PartyText>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "0.625rem",
              }}
              onClick={onClickIsFreeThree}
            >
              <CheckIcon src={isFreeThree === "Y" ? check_y : check_g} />
              <PartyText className="notoRegular" style={{ color: "#6a6a6a" }}>
                본인의 개인정보를 제 3자에게 제공하는 데에 동의합니다.
              </PartyText>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "0.625rem",
              }}
              onClick={onClickIsFreeFour}
            >
              <CheckIcon src={isFreeFour === "Y" ? check_y : check_g} />
              <PartyText className="notoRegular" style={{ color: "#6a6a6a" }}>
                본인의 개인정보를 결제 서비스업체에 제공하는 데에 동의합니다.
              </PartyText>
            </div>
          </div>
          <div style={{ flexGrow: "1" }} />
          <BottomButton
            text={"확인"}
            clickFunc={onClickRevise}
            activeStatus={pageConfirmStatus}
          />
        </ContentWrap>
        {keyboardUp && (
          <Keyboard
            setKeyboardUp={setKeyboardUp}
            num2={num2}
            num3={num3}
            setNum2={setNum2}
            setNum3={setNum3}
            two={focusTwo}
            setTwo={setFocusTwo}
            three={focusThree}
            setThree={setFocusThree}
            handleChangeThree={handleChangeThree}
          />
        )}
      </PageWrap>
    </div>
  );
};

const InputWrap = styled.div`
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;

  border: ${(props) =>
    props.openStatus ? "0.0625rem solid #ffca2c" : "0.0625rem solid #e8e8e8"};

  border-radius: 0.25rem;
`;

const Input = styled.div`
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;

  .placeholder {
    font-size: 0.8125rem;
    color: #e8e8e8;
  }

  .textWrap {
    position:absolute;
    top:50%;
    left:0;
    right:0;
    transform:translate(0,-50%);
    border:1px solid red;
  }
`;

const Hypen = styled.div`
  position: relative;
  display: flex;
  /* height: 1.3125rem; */
  margin: 0 0.25rem;
  font-family: "NotoSansCJKkr";
  font-size: 0.9375rem;
  font-weight: 500;
  color: #888;
  
  padding-top:0.6563rem;
`;

const CheckIcon = styled.img`
  width:1.1875rem;
  height: 1.1875rem;
`;

export default CardRegister;
