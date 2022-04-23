import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customApiClient } from "../../shared/apiClient";
import { PageTransContext } from "../../containers/pageTransContext";
import { TextMiddle } from "../../styled/shared";
import icon_back from "../../assets/icon-back-arrow.svg";
import notice_icon from "../../assets/ic_pay_guide.svg";

import { PageWrap, HeaderWrap } from "../../styled/shared/wrap";
import PartyComponent from "./partyComponent";
import Register from "./register";
import { BottomNavCloseAction } from "../../reducers/container/bottomNav";
import Price from "./price";
import Card from "./card";
import Slide from "./slide";
import BottomButton from "../../components/party/BottomButton";

import { LoadingOpenAction, LoadingCloseAction } from "../../reducers/container/loading";
import { AnalyPageReloadTrueAction } from "../../reducers/main/analysis";
import { SubscribeReloadTrueAction } from "../../reducers/main/subscribe";
import ChoiceDialog from "../../components/party/ChoiceDialog";

const Payment = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Store
  // 파티 상세 데이터 스토어에서 가져오기
  const {
    type,
    selectedPartyIdx,
    selectedPartyTitle,
    selectedPartyOpenChatLink,
    selectedPartyRoomStatus,
    selectedPartyIsEnrolled,
    selectedPartyPlatformInfo,
    selectedPartyPartyInfo,
    selectedPartyMembershipInfo,
  } = useSelector((state) => state.party.detail);

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [pageConfirmStatus, setPageConfirmStatus] = useState(false);

  const [isFree, setIsFree] = useState("N");
  const [partyId, setPartyId] = useState(0);
  const [partyTitle, setPartyTitle] = useState("");
  const [partyOpenChatLink, setPartyOpenChatLink] = useState("");
  const [partyRoomStatus, setPartyRoomStatus] = useState("");
  const [partyIsEnrolled, setPartyIsEnrolled] = useState("");
  const [platformInfoObj, setPlatformInfoObj] = useState({});
  const [partyInfoObj, setPartyInfoObj] = useState({});
  const [membershipInfoObj, setMembershipInfoObj] = useState({});

  const [paymentPopupStatus, setPaymentPopupStatus] = useState(false);

  //local state
  const [cardIdx, setCardIdx] = useState();

  //initial logic
  useEffect(() => {
    dispatch(BottomNavCloseAction);

    if (
      type &&
      selectedPartyIdx &&
      selectedPartyTitle &&
      selectedPartyOpenChatLink &&
      selectedPartyRoomStatus &&
      selectedPartyIsEnrolled &&
      selectedPartyPlatformInfo &&
      selectedPartyPartyInfo &&
      selectedPartyMembershipInfo
    ) {
      setPartyId(selectedPartyIdx);
      setPartyTitle(selectedPartyTitle);
      setPartyOpenChatLink(selectedPartyOpenChatLink);
      setPartyRoomStatus(selectedPartyRoomStatus);
      setPartyIsEnrolled(selectedPartyIsEnrolled);
      setPlatformInfoObj(selectedPartyPlatformInfo);
      setPartyInfoObj(selectedPartyPartyInfo);
      setMembershipInfoObj(selectedPartyMembershipInfo);

    } else {
      console.log("리덕스 초기화 감지");
    }
  }, []);

  //페이지 벨리데이션
  useEffect(() => {
    if (
      partyId && cardIdx
    ) {
      setPageConfirmStatus(true);
    } else {
      setPageConfirmStatus(false);
    }

    if (cardIdx === -1) {
      setPageConfirmStatus(false);
    }
  }, [cardIdx]);

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

  //결제 클릭 함수
  const handleClickPaymentOpen = () => {
    if (!pageConfirmStatus) return;
    setPaymentPopupStatus(true);
  }

  //삭제 팝업 취소 함수
  const handleClickPaymentClose = () => {
    setPaymentPopupStatus(false);
  }

  //정보 입력 완료
  const onClickRevise = useCallback(async () => {
    setPaymentPopupStatus(false);

    if (!pageConfirmStatus) return;

    let uri = "";

    //일반적인 가입
    if (type === "ENROLL") {
      uri = `/party/${partyId}`;
    }
    //재결제 시도
    else if (type === "PENDING") {
      uri = `/party/${partyId}/pending`;
    }
    //기존 파티원 처음 결제
    else if (type === "PASTUSER") {
      uri = `/party/${partyId}/past`;
    } else {
      return
    }

    //로딩 시작
    dispatch(LoadingOpenAction);

    const data = await customApiClient("post", uri, {
      cardIdx: cardIdx
    });

    //로딩 끝
    dispatch(LoadingCloseAction);

    //서버에러
    if (!data) return;

    //벨리데이션
    if (data.statusCode != 200) {
      setError(true);
      setErrorMsg(data.message);
      alert(data.message);
      return;
    }

    //소비분석 리로드
    dispatch(AnalyPageReloadTrueAction);
    dispatch(SubscribeReloadTrueAction);

    setPageTrans("trans toRight");
    history.push({
      pathname: '/payment/finish',
      props: {
        partyIdx: partyId,
        openChatLink: partyOpenChatLink,
      }
    });

  }, [pageConfirmStatus, cardIdx]);

  //금액 3자리마다 ,찍기
  const priceNum = (price) => {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return 0;
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
          <PartyComponent
            partyTitle={partyTitle}
            partyInfo={platformInfoObj}
            membershipInfo={membershipInfoObj}
            platformInfo={platformInfoObj}
          />
        </ContentWrap>
        <div>
          <Line />
        </div>
        <ContentWrap>
          <span
            className="spoqaBold"
            style={{
              fontSize: "0.875rem",
            }}
          >
            결제 수단
          </span>
          <Slide setCardIdx={setCardIdx}></Slide>
        </ContentWrap>
        <div>
          <Line />
        </div>
        <ContentWrap>
          <span
            className="spoqaBold"
            style={{
              fontSize: "0.875rem",
            }}
          >
            결제 금액
          </span>
          <Price priceInfo={membershipInfoObj} priceFunc={priceNum} />
          <NoticeWrap className="notoMedium">
            <div className="notice-wrap">
              <img className="icon" src={notice_icon} />
              <div className="notice">
                안내가 들어갑니다. 안내가 들어갑니다. 안내가 들어갑니다. 안내가 들어갑니다. 안내가 들어갑니다.
              </div>
            </div>
          </NoticeWrap>
          <div className="notoMedium notice-text">
            <div style={{ borderBottom: "1px solid #797979" }}>개인정보 제3자 제공 </div> 내용 및 결제에 동의합니다.
          </div>
          <BottomButton
            text={(priceNum(membershipInfoObj.currentPrice + membershipInfoObj.currentCommissionPrice)) + "원 결제"}
            clickFunc={handleClickPaymentOpen}
            activeStatus={pageConfirmStatus}
          />
        </ContentWrap>
      </PageWrap>
      {/* 결제 확인 팝업 */}
      <ChoiceDialog
        openStatus={paymentPopupStatus}
        title={"정말 결제하시겠어요 ?"}
        subTitle={`확인버튼을 누르면\n${priceNum(membershipInfoObj.currentPrice + membershipInfoObj.currentCommissionPrice)}원이 결제 되고 파티에 가입되어요.`}
        leftButtonText={"취소"}
        rightButtonText={"확인"}
        onClickLeft={handleClickPaymentClose}
        onClickRight={onClickRevise}
      />
    </div>
  );
};

const ContentWrap = styled.div`
  top: 3.0625rem;
  left: 0;
  right: 0;
  bottom: 0;

  margin: 0 1.25rem 0 1.25rem;

  .notice-text{
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 3.3375rem 0 0.525rem 0;
    color: #797979;
    font-size: 0.625rem;
    text-align: center;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f7f7f7;
  margin: 1.3125rem 0 1.2188rem 0;
`;

const NoticeWrap = styled.div`
  background-color: #fff9e6;
  border-radius: 0.4375rem;
  width: 100%;

  .notice-wrap {
    display: flex;
    flex-direction: row;
    padding: 0.9625rem 1.2813rem 0.9187rem 0.8438rem;
    align-items: flex-start;
  }

  .icon {
    width: 0.875rem;
    height: 0.875rem;
    object-fit: contain;
    margin: 0.125rem 0.375rem 1.25rem 0;
  }

  .notice{
    font-size: 0.6875rem;
    color:#383838;
    line-height: 1.73;   
  }
`;


export default Payment;
