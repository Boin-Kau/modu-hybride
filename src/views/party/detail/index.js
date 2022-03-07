import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { customApiClient } from "../../../shared/apiClient";
import PartyTitleDiv from "../../../components/party/PartyTitleDiv";
import PartyMembershipDiv from "../../../components/party/PartyMembershipDiv";
import { ResetParty } from "../../../reducers/party/detail";


// Page Root Component
const PartyDetail = ({ location }) => {

  // Module
  const dispatch = useDispatch();
  const history = useHistory();

  // Store
  const { 
    selectedPartyId, 
    selectedPartyTitle, 
    selectedPartyOpenChatLink, 
    selectedPartyRoomStatus, 
    selectedPartyIsEnrolled,
    selectedPartyPlatformInfo,
    selectedPartyPartyInfo,
    selectedPartyMembershipInfo, 
  } = useSelector(state => state.party.detail);

  //Context
  const { setPageTrans } = useContext(PageTransContext);

  // Global State

  // Local State
  const [partyId, setPartyId] = useState(0);
  const [partyTitle, setPartyTitle] = useState('');
  const [partyOpenChatLink, setPartyOpenChatLink] = useState('');
  const [partyRoomStatus, setPartyRoomStatus] = useState('');
  const [partyIsEnrolled, setPartyIsEnrolled] = useState('');
  const [platformInfoObj, setPlatformInfoObj] = useState({});
  const [partyInfoObj, setPartyInfoObj] = useState({});
  const [membershipInfoObj, setMembershipInfoObj] = useState({});

  // Lifecycle - Initial Logic
  useEffect(() => {
    // Bottom Nav 
    dispatch(BottomNavCloseAction);

    setPartyId(selectedPartyId);
    setPartyTitle(selectedPartyTitle);
    setPartyOpenChatLink(selectedPartyOpenChatLink);
    setPartyRoomStatus(selectedPartyRoomStatus);
    setPartyIsEnrolled(selectedPartyIsEnrolled);
    setPlatformInfoObj(selectedPartyPlatformInfo);
    setPartyInfoObj(selectedPartyPartyInfo);
    setMembershipInfoObj(selectedPartyMembershipInfo);

    // 배경색 LOGIC
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
    // 파티 상세 조회 
    //const partyDetailUri = `/party/${partyIdx}`;
    //const partyDetailData = await customApiClient('get', partyDetailUri);

    // // Server Error
    // if(!partyDetailData) { return };
    // // Validation 
    // if(partyDetailData.statusCode !== 200) { return };

    // setPartyDetailResult(partyDetailData.result);

    // console.log(`API 호출 성공 : ${partyDetailData.result}`);
  };

  const closePage = () => {
    // 리덕스 설정 (ResetParty)
    dispatch({
      type: ResetParty
    });

    // 페이지 뒤로가기
    setPageTrans('trans toLeft');
    history.goBack();
  };

  const openBottomDialog = () => {
    console.log('파티장 : 수정하기,삭제하기 / 취소');
    console.log('파티원 : 신고하기 / 취소');
  }

  const openPage = () => {
    // 페이지 전환
    setPageTrans('trans toRight');
    history.push('/payment');
  }

  return (
    <div className="page">
      <PageWrap>
        {/* 상단바 */}
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
          {/* 메인 컨텐츠 */}
          <div style={{flexGrow: '1'}}>
            {/* 파티 제목 컴포넌트 */}
            <TopContentWrap>
              <PartyTitleDiv title={partyTitle} info={platformInfoObj} isDetail={true}/>
            </TopContentWrap>
          </div>


          {/* 최하단 Yellow 버튼 */}
          <BottomButtonWrap onClick={()=>{openPage()}} className="spoqaBold">
            <div className="bottomButtonText">파티참가</div>
          </BottomButtonWrap>
        </MainWrap>
      </PageWrap>
    </div>
  );
};

export default PartyDetail;

// Child Component(Top Data, 파티정보, 멤버십정보) - 내 파티 상세보기에서 Recycle
const PartyDetailContent = ({result}) => {

  // Local Value
  let list = [];

  // Local State
  const [partyCustomColor, setPartyCustomColor] = useState('');
  const [partyCustomInitial, setPartyCustomInitial] = useState('');
  const [partyTitle, setPartyTitle] = useState('');
  const [partyCategory, setPartyCategory] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [partyImgUrl, setPartyImgUrl] = useState('');
  
  const [personnel, setPersonnel] = useState(0);
  const [currentUserCount, setCurrentUserCount] = useState(0);

  const [price, setPrice] = useState(0);
  const [membership, setMembership] = useState('');
  const [typeList, setTypeList] = useState([]);

  const [paymentCycle, setPaymentCycle] = useState('?????');

  
  

  // Lifecycle - Initial Logic

  
  // Lifecycle - When result is changed
  useEffect(() => {
    if(!result) return;

    console.log(`언제 실행되는지 보자: `, result);
    setPartyCustomColor(result.color);
    setPartyCustomInitial(result.initial);
    setPartyTitle(result.title);
    setServiceName(result.serverName);
    setPartyCategory(result.serverCategory);
    setPartyImgUrl(result.serverImgUrl);
    setCurrentUserCount(result.currentUserCount);
    setPersonnel(result.personnel);
    setPrice(result.price);
    setMembership(result.membership);

    list = [];
    if(result.currentUserCount && result.personnel) {
      list.push('boss');
      for(let i=0; i<result.currentUserCount-1; i++) list.push('complete');
      for(let i=0; i<result.personnel-result.currentUserCount; i++) list.push('waiting');
      for(let i=result.personnel; i!=4; i++) list.push('nothing');
    }
    setTypeList(list);
  }, [result]);

  // Function
  
  
  return (
    <div style={{ flexGrow: '1' }}>
      <TopContentWrap>
        {/* 파티 제목 컴포넌트 */}
        <PartyTitleDiv 
          color={partyCustomColor}
          initial={partyCustomInitial}
          imgUrl={partyImgUrl} 
          title={partyTitle} 
          name={serviceName} 
          category={partyCategory} 
          isDetail={true}/>
      </TopContentWrap>

      <PartyDataWrap>
        <div className="partyDataTitleDiv">
          <span className="partyDataTitle spoqaBold">파티 정보</span>
          <div className="memberCountBox">
            <img className="memberCountImg" src={icon_small_duck} alt="오리" />
            <div className="memberCountSpan spoqaBold">{personnel}명</div>
          </div>
        </div>
        <PartyDataListWrap>
          {
            typeList.map((item, idx) => {
              if(personnel > 4) {
                return (<PartyDataListItem type={item} margin={'0.9375rem'} key={idx}/>)
              } else {
                return (<PartyDataListItem type={item} margin={'1.25rem'} key={idx}/>)
              }
            })
          }
        </PartyDataListWrap>
      </PartyDataWrap>
      <MembershipDataWrap>
        <span className="membershipDataTitle spoqaBold">멤버십 정보</span>
        
        {/* 파티 멤버십 정보 컴포넌트 */}
        <PartyMembershipDiv
          paymentCycle={'매달 5일'}
          price={price}
          membership={membership}
          partyCategory={partyCategory}
          isDetail={true}/>

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

  padding-left: 1.25rem;
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
`;




