import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PageTransContext } from "../../containers/pageTransContext";
import { TextMiddle, DangerWrapPopup } from "../../styled/shared";
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

const CardRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [pageConfirmStatus, setPageConfirmStatus] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isFocus, setIsFocus] = useState(false);

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
  };

  const handleChangeThree = (e) => {
    if (e.target.value.length == 5) return false;
    setNum3(e.target.value);
    handleNextFocus(e, "num4");
  };

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
    } else {
      setIsFreeOne("N");
    }
  }, [isFreeOne]);

  const onClickIsFreeTwo = useCallback(() => {
    if (isFreeTwo == "N") {
      setIsFreeTwo("Y");
    } else {
      setIsFreeTwo("N");
    }
  }, [isFreeTwo]);

  const onClickIsFreeThree = useCallback(() => {
    if (isFreeThree == "N") {
      setIsFreeThree("Y");
    } else {
      setIsFreeThree("N");
    }
  }, [isFreeThree]);

  const onClickIsFreeFour = useCallback(() => {
    if (isFreeFour == "N") {
      setIsFreeFour("Y");
    } else {
      setIsFreeFour("N");
    }
  }, [isFreeFour]);

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
      return;
    }

    //뒤로가기
    setPageTrans("trans toLeft");
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

        <ContentWrap>
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
              />
              <Hypen>-</Hypen>
              <InputComponent
                id={"num2"}
                type={"number"}
                placeholder={"0000"}
                maxLength={4}
                value={num2}
                onChange={handleChangeTwo}
              />
              <Hypen>-</Hypen>
              <InputComponent
                id={"num3"}
                type={"password"}
                placeholder={"0000"}
                maxLength={4}
                value={num3}
                onChange={handleChangeThree}
              />
              <Hypen>-</Hypen>
              <InputComponent
                id={"num4"}
                type={"password"}
                placeholder={"0000"}
                maxLength={4}
                value={num4}
                onChange={handleChangeFour}
              />
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
                maxLength={4}
                value={cardPw}
                onChange={onChangePw}
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
                alignItems: "center",
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
          <SaveButton
            className="spoqaBold"
            pageConfirmStatus={pageConfirmStatus}
            onClick={onClickRevise}
          >
            확인
          </SaveButton>
        </ContentWrap>
      </PageWrap>

      {/* 오류 알림창 */}
      <DangerWrapPopup
        openStatus={false}
        style={{ backgroundColor: "rgba(110,110,110,0.35)" }}
      >
        <Popup className="spoqaBold" openStatus={true}>
          <div style={{ fontSize: "0.875rem" }}>카드 오류</div>
          <div
            className="spoqaRegular"
            style={{
              fontSize: "0.75rem",
              margin: "0.625rem 0 1.5625rem 0",
              padding: "0 1.25rem 0 1.25rem",
            }}
          >
            [C00001] 등록할 수 없는 카드입니다.
            <br />
            입력하신 카드번호를 다시 한번 확인해주십시오.
          </div>
          <div style={{ width: "100%", border: "solid 0.7px #b4b4b4" }} />
          <div
            className="spoqaRegular"
            style={{ fontSize: "0.875rem", marginTop: "0.6875rem" }}
          >
            확인
          </div>
        </Popup>
      </DangerWrapPopup>
    </div>
  );
};

const InputWrap = styled.div`
  display: flex;

  padding: 0.625rem 0.875rem;

  border: ${(props) =>
    props.openStatus ? "0.0625rem solid #ffca2c" : "0.0625rem solid #e8e8e8"};

  border-radius: 0.25rem;

  font-size: 0.8125rem;

  color: ${(props) => (props.isBlocked ? "rgba(49, 49, 49,0.2)" : "#313131")};
  background-color: #ffffff;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 0.8125rem;

  padding: 0;

  :focus {
    outline: none;
  }
  ::placeholder {
    opacity: 0.3;
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

const SaveButton = styled.div`
  cursor: pointer;

  width: 100%;

  padding: 0.8125rem 0 0.875rem 0;

  font-size: 0.875rem;
  color: #ffffff;

  margin-top: 2.3125rem;

  text-align: center;

  border-radius: 0.375rem;

  background-color: ${(props) =>
    props.pageConfirmStatus ? "#ffca17" : "#e3e3e3"};
`;

const Popup = styled.div`
  position: absolute;

  top: 45%;
  left: 50%;

  padding: 2rem 0 0.75rem 0;

  width: 17.375rem;
  display: flex;
  flex-direction: column;

  transform: translate(-50%, -50%);

  border-radius: 0.4375rem;
  box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.05);
  background-color: #ffffff;

  text-align: center;

  /* 애니메이션 적용 */
  transition: opacity 300ms ease-out;
  opacity: ${(props) => (props.openStatus ? "1" : "0")};
`;

export default CardRegister;
