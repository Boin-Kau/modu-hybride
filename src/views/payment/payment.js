import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PageTransContext } from "../../containers/pageTransContext";
import { TextMiddle } from "../../styled/shared";
import icon_back from "../../assets/icon-back-arrow.svg";
import PartyComponent from "./partyComponent";
import Register from "./register";
import { BottomNavCloseAction } from "../../reducers/container/bottomNav";
import Price from "./price";
import Card from "./card";
import Slide from "./slide";

const Payment = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Store
  // 파티 상세 데이터 스토어에서 가져오기
  const { 
    selectedPartyIdx, 
    selectedPartyTitle, 
    selectedPartyOpenChatLink, 
    selectedPartyRoomStatus, 
    selectedPartyIsEnrolled,
    selectedPartyPlatformInfo,
    selectedPartyPartyInfo,
    selectedPartyMembershipInfo, 
  } = useSelector(state => state.party.detail);

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [pageConfirmStatus, setPageConfirmStatus] = useState(false);
  const [isFree, setIsFree] = useState("N");
  const [partyId, setPartyId] = useState(0);
  const [partyTitle, setPartyTitle] = useState('');
  const [partyOpenChatLink, setPartyOpenChatLink] = useState('');
  const [partyRoomStatus, setPartyRoomStatus] = useState('');
  const [partyIsEnrolled, setPartyIsEnrolled] = useState('');
  const [platformInfoObj, setPlatformInfoObj] = useState({});
  const [partyInfoObj, setPartyInfoObj] = useState({});
  const [membershipInfoObj, setMembershipInfoObj] = useState({});

  //initial logic
  useEffect(() => {
    dispatch(BottomNavCloseAction);

    if(selectedPartyIdx&&
      selectedPartyTitle&&
      selectedPartyOpenChatLink&&
      selectedPartyRoomStatus&&
      selectedPartyIsEnrolled&&
      selectedPartyPlatformInfo&&
      selectedPartyPartyInfo&&
      selectedPartyMembershipInfo) {
      setPartyId(selectedPartyIdx);
      setPartyTitle(selectedPartyTitle);
      setPartyOpenChatLink(selectedPartyOpenChatLink);
      setPartyRoomStatus(selectedPartyRoomStatus);
      setPartyIsEnrolled(selectedPartyIsEnrolled);
      setPlatformInfoObj(selectedPartyPlatformInfo);
      setPartyInfoObj(selectedPartyPartyInfo);
      setMembershipInfoObj(selectedPartyMembershipInfo);

      console.log(platformInfoObj);
    } else {
      console.log('리덕스 초기화 감지');
    }
  }, []);

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  //isFree
  const onClickIsFree = useCallback(() => {
    if (isFree == "N") {
      setIsFree("Y");
    } else {
      setIsFree("N");
    }
  }, [isFree]);

  //정보 입력 완료
  const onClickRevise = useCallback(async () => {
    if (!pageConfirmStatus) return;

    //뒤로가기
    setPageTrans("trans toLeft");
    history.goBack();
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
          <TextMiddle>파티참가</TextMiddle>
        </HeaderWrap>
        <ContentWrap>
          <div style={{ margin: "0.75rem 0 1.125rem 0" }}>
            <span
              className="spoqaBold"
              style={{
                fontSize: "0.875rem",
              }}
            >
              구독내역
            </span>
          </div>
          <PartyComponent partyTitle={partyTitle} partyInfo={platformInfoObj} membershipInfo={membershipInfoObj} platformInfo={platformInfoObj}/>
        </ContentWrap>
        <div><Line /></div>
        <ContentWrap>
          <span
            className="spoqaBold"
            style={{
              fontSize: "0.875rem",
            }}
          >
            결제 수단
          </span>
          <Slide></Slide>
          {/* <Register></Register> */}
          {/* <Card></Card> */}
        </ContentWrap>
        <div><Line /></div>
        <ContentWrap>
          <span
            className="spoqaBold"
            style={{
              fontSize: "0.875rem",
            }}
          >
            결제 금액
          </span>
            <Price/>
          <div
            className="notoMedium"
            style={{
              backgroundColor: "#fff9e6",
              borderRadius: "0.4375rem",
              width: "100%",
              height: "4.1375rem",
            }}
          ></div>
          <div
            className="notoMedium"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop:'3.3375rem'
            }}
          >
            <span
              style={{
                color: "#797979",
                fontSize: "0.625rem",
                textAlign: "center",
              }}
            >
              개인정보 제3자 제공 내용 및 결제에 동의합니다.
            </span>
            <SaveButton
              className="spoqaBold"
              pageConfirmStatus={pageConfirmStatus}
              onClick={onClickRevise}
            >
              3,300원 결제
            </SaveButton>
          </div>
        </ContentWrap>
      </PageWrap>
    </div>
  );
};

const PageWrap = styled.div`
  position: absolute;
  top: 3.0625rem;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  background-color: #ffffff;
`;

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 3.0625rem;

  background-color: #ffffff;
  text-align: center;

  font-size: 0.875rem;
  color: #313131;

  box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;

const ContentWrap = styled.div`
  top: 49px;
  left: 0;
  right: 0;
  bottom: 0;

  margin: 0 1.25rem 1.25rem 1.25rem;
`;

const Line = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f7f7f7;
  margin-bottom:1.2188rem;
`;

const SaveButton = styled.div`
  cursor: pointer;

  width: 100%;

  padding: 0.8125rem 0 0.875rem 0;

  font-size: 0.875rem;
  color: #ffffff;
  margin-top: 0.525rem;
  margin-bottom: 2.025rem;
  text-align: center;

  border-radius: 0.375rem;

  background-color: ${(props) =>
    props.pageConfirmStatus ? "#ffca17" : "#e3e3e3"};
`;

export default Payment;
