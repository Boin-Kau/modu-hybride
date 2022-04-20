import React, { useContext, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import { TextMiddle } from "../../../styled/shared";
import { MainText } from "../../../styled/shared/text";
import { HeaderWrap, ContentWrap, PageWrap } from "../../../styled/shared/wrap";
import icon_back from "../../../assets/icon-back-arrow.svg";
import {
  PartyIcon,
  PartyIconWrap,
  PartyText,
} from "../../../styled/main/enrollment";
import icon_check from '../../../assets/icon-check-white.svg';
import signup_arrow from '../../../assets/ic_signup_arrow.svg';
import BottomButton from "../../../components/party/BottomButton";

const SignUpTerm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state-약관
  const [isFreeOne, setIsFreeOne] = useState("N");
  const [isFreeTwo, setIsFreeTwo] = useState("N");
  const [isFreeThree, setIsFreeThree] = useState("N");
  const [isFreeAll, setIsFreeAll] = useState("N");

  const [agreePageStatus, setAgreePageStatus] = useState(false);

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  //isFree
  const onClickIsFreeOne = useCallback(() => {
    if (isFreeOne == "N") {
      setIsFreeOne("Y");
    } else {
      setIsFreeOne("N");
      setIsFreeAll("N");
    }
  }, [isFreeOne]);

  const onClickIsFreeTwo = useCallback(() => {
    if (isFreeTwo == "N") {
      setIsFreeTwo("Y");
    } else {
      setIsFreeTwo("N");
      setIsFreeAll("N");
    }
  }, [isFreeTwo]);

  const onClickIsFreeThree = useCallback(() => {
    if (isFreeThree == "N") {
      setIsFreeThree("Y");
    } else {
      setIsFreeThree("N");
      setIsFreeAll("N");
    }
  }, [isFreeThree]);

  const onClickIsFreeAll = useCallback(() => {
    if (isFreeAll == "N") {
      setIsFreeAll("Y");
      setIsFreeOne("Y");
      setIsFreeTwo("Y");
      setIsFreeThree("Y");
    } else {
      setIsFreeAll("N");
      setIsFreeOne("N");
      setIsFreeTwo("N");
      setIsFreeThree("N");
    }
  }, [isFreeAll]);

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);

  useEffect(() => {
    if(isFreeOne==="Y"&&isFreeTwo==="Y"&&isFreeThree==="Y"){
      setIsFreeAll("Y")
    }
    if(isFreeAll==="Y"||isFreeOne==="Y"&&isFreeTwo==="Y"){
      setAgreePageStatus(true);
    }
    else if(isFreeAll==="N"){
      setAgreePageStatus(false);
    }
  }, [isFreeAll,isFreeOne,isFreeTwo,isFreeThree])
  

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
            모두의 서비스 이용을 위해
            <br />
            <span className="yellowText">약관에 동의</span>해주세요.
          </MainText>
          <AllWrap>
            <PartyIconWrap isFree={isFreeAll} onClick={onClickIsFreeAll} style={{marginLeft:'1.1563rem'}}>
              <PartyIcon src={icon_check} />
            </PartyIconWrap>
            <PartyText className="spoqaBold" style={{ color: "#313131", fontSize:'0.875rem'}}>
              모두 동의하기
            </PartyText>
          </AllWrap>
          <CheckWrap>
              <div className="left-wrap">
                  <PartyIconWrap isFree={isFreeOne} onClick={onClickIsFreeOne} style={{marginLeft:'1.1563rem'}}>
                      <PartyIcon src={icon_check} />
                    </PartyIconWrap>
                    <PartyText className="notoRegular" style={{ color: "#313131", fontSize:'12px'}}>
                      서비스 이용약관 (필수)
                    </PartyText>
              </div>
                <img className="arrow" src={signup_arrow}/>
          </CheckWrap>
          <CheckWrap>
              <div className="left-wrap">
                  <PartyIconWrap isFree={isFreeTwo}  onClick={onClickIsFreeTwo} style={{marginLeft:'1.1563rem'}}>
                      <PartyIcon src={icon_check} />
                    </PartyIconWrap>
                    <PartyText className="notoRegular" style={{ color: "#313131", fontSize:'12px'}}>
                      개인정보 수집 이용 동의 (필수)
                    </PartyText>
              </div>
                <img className="arrow" src={signup_arrow}/>
          </CheckWrap>
          <CheckWrap>
              <div className="left-wrap">
                  <PartyIconWrap isFree={isFreeThree}  onClick={onClickIsFreeThree} style={{marginLeft:'1.1563rem'}}>
                      <PartyIcon src={icon_check} />
                    </PartyIconWrap>
                    <PartyText className="notoRegular" style={{ color: "#313131", fontSize:'12px'}}>
                      마케팅 정보 수신 동의 (선택)
                    </PartyText>
              </div>
                <img className="arrow" src={signup_arrow}/>
          </CheckWrap>
          <BottomButton text={"다음"} activeStatus={agreePageStatus} isBottomStatus={true}/>
        </ContentWrap>
      </PageWrap>
    </div>
  );
};

export default SignUpTerm;

const AllWrap = styled.div`
  width: 100%;
  padding: 1.125rem 0;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CheckWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1.375rem;
    justify-content: space-between;

    .left-wrap{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .arrow{
        width: 0.375rem;
        height: 0.625rem;
    }
`;