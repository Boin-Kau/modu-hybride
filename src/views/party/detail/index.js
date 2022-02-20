import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import { TextMiddle } from '../../../styled/shared';
import { PageTransContext } from '../../../containers/pageTransContext';
import { checkMobile } from "../../../App";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_more from "../../../assets/icon-partydetail-more.svg";
import icon_small_duck from "../../../assets/icon-partydetail-ducknumber.svg";
import PartyDataListItem from "../../../components/party/PartyList";

// Page Root Component
const PartyDetail = () => {

  // Module
  const dispatch = useDispatch();
  const history = useHistory();

  //Context
  const { setPageTrans } = useContext(PageTransContext);

  // Global State

  // Local State
  

  // Lifecycle - Initial Logic
  useEffect(() => {
    // Bottom Nav 
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

  // Function
  const getPartyDetail = async () => {
    const partyDetailUri = `/party`
  };

  const closePage = () => {
    setPageTrans('trans toLeft');
    history.goBack();
  };

  const openBottomDialog = () => {
    console.log('파티장 : 수정하기,삭제하기 / 취소');
    console.log('파티원 : 신고하기 / 취소');
  }

  return (
    <div className="page">
      <PageWrap>
        <HeaderWrap className="spoqaBold">
          <div id="back_link" onClick={closePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
            <img src={icon_back} alt="뒤로가기"></img>
          </div>
          <TextMiddle>파티 상세보기</TextMiddle>
          <div onClick={openBottomDialog} style={{ zIndex: "10", position: "absolute", right: '0', height: '100%', width: '4.375rem' }}>
            <img src={icon_more} alt="BottomDialog 띄우기" style={{ position: "absolute", top: "55%", right: "1.3125rem", transform: "translate(0,-55%)" }}></img>
          </div>
        </HeaderWrap>
        <MainWrap>
          <PartyDetailContent/>
          <BottomButtonWrap className="spoqaBold">
            <div className="bottomButtonText">파티참가</div>
          </BottomButtonWrap>
        </MainWrap>
        
      </PageWrap>
    </div>
  );
};

export default PartyDetail;

// Child Component(Top Data, 파티정보, 멤버십정보) - 내 파티 상세보기에서 Recycle
export const PartyDetailContent = () => {

  // Local State
  const [memberCount, setMemberCount] = useState(0);
  const [paymentCycle, setPaymentCycle] = useState('매달 15일');
  const [payment, setPayment] = useState('5,000원');
  const [membershipType, setMembershipType] = useState('평생소장');
  const [category, setCategory] = useState('OTT');

  return (
    <div style={{ flexGrow: '1' }}>
      <TopContentWrap>
        <img className="topContentImg" src="https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2Fnetflix.png?alt=media&token=96cf7411-2b79-4050-97cc-6ba683532b14" alt="구독서비스이미지"/>
        <div>
          <div className="topContentTitle spoqaBold">왓챠 2명 나눠내실 분!</div>
          <div className="topContentCategory spoqaBold">OTT</div>
        </div>
      </TopContentWrap>
      <PartyDataWrap>
        <div className="partyDataTitleDiv">
          <span className="partyDataTitle spoqaBold">파티 정보</span>
          <div className="memberCountBox">
            <img className="memberCountImg" src={icon_small_duck} alt="오리" />
            <div className="memberCountSpan spoqaBold">{memberCount}명</div>
          </div>
        </div>
        <PartyDataListWrap>
          <PartyDataListItem/>
          <PartyDataListItem/>
          <PartyDataListItem/>
          <PartyDataListItem/>
          <PartyDataListItem/>
          <PartyDataListItem/>
          <PartyDataListItem/>
        
        </PartyDataListWrap>
      </PartyDataWrap>
      <MembershipDataWrap>
        <span className="membershipDataTitle spoqaBold">멤버십 정보</span>
        <div className="membershipYellowDiv">
          <div className="membershipYellowDivLeft">
            <div className="membershipYellowTitle notoMedium">파티 결제주기</div>
            <div className="membershipYellowText spoqaBold">{paymentCycle}</div>
          </div>
          {/* 중간 border */}
          <div className="membershipYellowDivRight">
            <div className="membershipYellowTitle notoMedium">구독금액</div>
            <div className="membershipYellowText spoqaBold">{payment}</div>
          </div>
        </div>
        <div className="membershipGrayDiv notoMedium">
          <div style={{display:"flex", marginBottom:"0.75rem"}}>
            <div className="membershipGrayTitle">멤버십 종류</div>
            <div className="membershipGrayText">{membershipType}</div>
          </div>
          <div style={{display:"flex"}}>
            <div className="membershipGrayTitle">카테고리</div>
            <div className="membershipGrayText">{category}</div>
          </div>

        </div>
      </MembershipDataWrap>
    </div>
  );
};


// Root Styled Component
const PageWrap = styled.div`
  /* 임시 border */
  /* border:1px solid blue; */
`;
const HeaderWrap = styled.div`
  position: relative;
  top:0;
  left:0;
  right:0;

  height:3.0625rem;

  background-color:#ffffff;
  text-align:center;

  font-size:0.875rem;
  color:#313131;
  
  box-shadow: 0 0 0.25rem 0.0625rem #efefef;

`;
const MainWrap = styled.div`
  /* 임시 border */
  /* border:1px solid red; */

  display: flex;
  flex-direction: column;
  position:absolute;
  top:3.0625rem;
  left:0;
  right:0;
  bottom:0;

  overflow-y:scroll;

  padding-top: 0.875rem;

  background-color:#ffffff;
`;

const BottomButtonWrap = styled.div`
    display:flex;
    margin:1.25rem;

    background-color:#ffca17;
    border-radius:0.375rem;

    padding:0.875rem 0 0.8125rem 0;

    font-size:0.8125rem;
    color:#ffffff;

    .bottomButtonText {
      width: 100%;
      text-align: center;
    }
`;

// Child Styled Component
const TopContentWrap = styled.div`
  border-bottom: 0.5rem #f7f7f7 solid;
  display: flex;
  padding: 0 1.25rem 1.2188rem;

  .topContentImg {
    width: 3.25rem;
    height: 3.25rem;
    margin-right: 0.875rem;
  }
  .topContentTitle {
    font-size: 1.0625rem;
    color: #313131;
    margin-bottom: 0.3125rem;
  }
  .topContentCategory {
    font-size: 0.875rem;
    color: #000000;
    opacity: 0.35;
  }

`;

const PartyDataWrap = styled.div`
  border-bottom: 0.5rem #f7f7f7 solid;
  padding: 1.3438rem 0;

  .partyDataTitleDiv {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 0 1.25rem;
  }

  .partyDataTitle {
    font-size: 0.875rem;
    color: #313131;
    margin-right: 0.2188rem;
  }

  .memberCountBox {
    background-color: #ffca35;
    border-radius: 8px;
    padding: 0.0625rem 0.3125rem 0.125rem 0.3125rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .memberCountImg {
    width: 0.6062rem;
    height: 0.6062rem;
    margin-right: 0.2rem;
  }

  .memberCountSpan {
    color: #ffffff;
    font-size: 0.5rem;
  }
`;

const PartyDataListWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

const MembershipDataWrap = styled.div`
  /* 임시 border */
  /* border: 0.0625rem red dotted; */

  padding: 1.3438rem 1.25rem 0;

  .membershipDataTitle {
    font-size: 0.875rem;
    color: #313131;
    display: block;
    margin-bottom: 1.0938rem;
  }

  .membershipYellowDiv {
    background-color: #ffca2c;
    padding: 0.75rem 0;
    border-radius: 7px;
    margin-bottom: 0.5rem;

    display: flex;
  }

  .membershipYellowDivLeft {
    flex: 1;
    border-right: 0.0625rem solid rgba(0,0,0,.09);
  }
  .membershipYellowDivRight {
    flex: 1;
  }
  .membershipYellowTitle {
    width: 100%;
    text-align: center;
    font-size: 0.75rem;
    color: #313131;
    opacity: 0.79;
    margin-bottom: 0.4375rem;
  }
  .membershipYellowText {
    width: 100%;
    text-align: center;
    font-size: 0.875rem;
    color: #313131;

  }

  .membershipGrayDiv {
    background-color: #f7f7f7;
    padding: 1.0625rem 1.1875rem;
    border-radius: 7px;
  }
  .membershipGrayTitle {
    flex: 1;
    font-size: 0.8125rem;
    color: #313131;
  }
  .membershipGrayText {
    font-size: 0.8125rem;
    color: #696969;
  }
`;




