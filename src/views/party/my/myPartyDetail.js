import { TextMiddle } from "../../../styled/shared";
import { ContentWrap, HeaderWrap, NoticeWrap, PartyDetailSubWrap } from "../../../styled/shared/wrap";
import { PageTransContext } from '../../../containers/pageTransContext';

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_more from "../../../assets/icon-partydetail-more.svg";
import icon_small_duck from "../../../assets/icon-partydetail-ducknumber.svg";
import icon_notice_duck from '../../../assets/icon-notice-duck.svg';

import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import styled from "styled-components";
import { checkMobile } from "../../../App";
import { customApiClient } from "../../../shared/apiClient";
import PartyTitleDiv from "../../../components/party/PartyTitleDiv";
import { PartyDetailSubtitleSpan } from "../../../styled/shared/text";
import PartyDataListItem from "../../../components/party/PartyList";
import PartyMembershipDiv from "../../../components/party/PartyMembershipDiv";
import AccountInfoComponent from "./AccountInfoComponent";

const MyPartyDetail = ({ location }) => {

  // 테스트 코드
  let list = [];
  const [typeList, setTypeList] = useState([]);

  // Module
  const history = useHistory();
  const dispatch = useDispatch();

  //Context
  const { setPageTrans } = useContext(PageTransContext);

  // Local State
  const [partyIdx, setPartyIdx] = useState(location.state.idx);

  const [partyTitle, setPartyTitle] = useState('');
  const [isHostUser, setIsHostUser] = useState('');
  const [partyInfoObj, setPartyInfoObj] = useState({});
  const [platformInfoObj, setPlatformInfoObj] = useState({});
  const [membershipInfoObj, setMembershipInfoObj] = useState({});
  const [accountInfoObj, setAccountInfoObj] = useState({});


  // Lifecycle - Initial Logic
  useEffect(() => {
    // Bottom Nav 
    dispatch(BottomNavCloseAction);

    setPartyIdx(location.state.idx);

    getPartyDetail();

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
  },[]);

  // Function 
  const getPartyDetail = async () => {
    // 파티 상세 조회 
    const partyDetailUri = `/party/${partyIdx}`;
    const partyDetailData = await customApiClient('get', partyDetailUri);

    // Server Error
    if(!partyDetailData) { return };
    // Validation 
    if(partyDetailData.statusCode !== 200) { return };
    console.log('API 호출 성공 :', partyDetailData);

    setPartyTitle(partyDetailData.result.title);
    setIsHostUser(partyDetailData.result.isHostUser);
    setPlatformInfoObj(partyDetailData.result.platformInfo);
    setPartyInfoObj(partyDetailData.result.partyInfo);
    setMembershipInfoObj(partyDetailData.result.membershipInfo);
    setAccountInfoObj(partyDetailData.result.accountInfo);

    // 테스트 코드
    list = [];
    if(partyInfoObj.currentUserCount && partyInfoObj.personnel) {
      list.push('boss');
      for(let i=0; i<partyInfoObj.currentUserCount-1; i++) list.push('complete');
      for(let i=0; i<partyInfoObj.personnel-partyInfoObj.currentUserCount; i++) list.push('waiting');
      for(let i=partyInfoObj.personnel; i!==4; i++) list.push('nothing');
    }
    
    setTypeList(list);

  };

  
  const closePage = () => {
    // 뒤로 가기
    setPageTrans('trans toLeft');
    history.goBack();
  };

  const openBottomDialog = () => {
    console.log('Open Bottom Dialog');
  }
  const isNotEmpty = (param) => Object.keys(param).length !== 0;

  return (
    <div className="page">
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
        {/* 파티 제목 컴포넌트 */}
        <TopContentWrap>
          <PartyTitleDiv title={partyTitle} info={platformInfoObj} isDetail={true}/>
        </TopContentWrap>

        {/* 파티 정보 */}
        <PartyDetailSubWrap style={{borderBottom: '0.5rem #f7f7f7 solid'}}>
          {/* 서브 타이틀 & 인원 수 */}
          <PartyDataTitleDiv>
            <PartyDetailSubtitleSpan>파티 정보</PartyDetailSubtitleSpan>
            <div className="memberCountBox">
              <img className="memberCountImg" src={icon_small_duck} alt="오리" />
              <div className="memberCountSpan spoqaBold">{partyInfoObj.personnel}명</div>
            </div>
          </PartyDataTitleDiv>
          {/* 참여인원 내용 */}
          {/* 수정필요!!!! */}
          <PartyDataContentWrap personnel={partyInfoObj.personnel}>
            {
              typeList.map((item, idx) => {
                if(partyInfoObj.personnel > 4) {
                  return (<PartyDataListItem type={item} margin={'0.9375rem'} key={idx}/>)
                } else {
                  return (<PartyDataListItem type={item} margin={'1.25rem'} key={idx}/>)
                }
              })
            }
          </PartyDataContentWrap>
        </PartyDetailSubWrap>

        {/* 멤버십 정보 */}
        <PartyDetailSubWrap style={{paddingLeft:'1.25rem',paddingRight:'1.25rem',borderBottom: '0.5rem #f7f7f7 solid'}}>
          {/* 서브타이틀 */}
          <div style={{ marginBottom:'0.625rem'}}>
            <PartyDetailSubtitleSpan>멤버십 정보</PartyDetailSubtitleSpan>
          </div>
          {/* 아낀금액 알려주기 */}
          <NoticeWrap>
            <div className="notice_sub_wrap align_center">
              <img className="notice_img" src={icon_notice_duck}></img>
              <div className="notice_text_div">
                <span>이번달 </span>
                <span className="notice_text_yellow">9000원</span>
                <span>이나 </span>
                <span>아꼈어요!</span>
              </div>
            </div>
          </NoticeWrap>
          {/* 파티 멤버십 정보 컴포넌트 */}
          <PartyMembershipDiv
            membershipInfo={membershipInfoObj}
            platformInfo={platformInfoObj}
            isDetail={true}/>
        </PartyDetailSubWrap>

        {/* 계정 정보 */}
        {
          isNotEmpty(accountInfoObj) ? 
          <PartyDetailSubWrap style={{paddingLeft:'1.25rem',paddingRight:'1.25rem',borderBottom: '0.5rem #f7f7f7 solid'}} >
            {/* 서브타이틀 */}
            <div style={{ marginBottom:'1.25rem'}}>
              <PartyDetailSubtitleSpan>계정 정보</PartyDetailSubtitleSpan>
            </div>
            {/* 파티장은 계정변경, 파티원은 계정복사로 버튼 구성 */}
            <AccountInfoComponent
              isHostUser={isHostUser}
              accountInfo={accountInfoObj}/>




          </PartyDetailSubWrap>
          :
          <></>
        }




      </MainWrap>
    </div>
  )
}

export default MyPartyDetail;

// Styled Components
const MainWrap = styled.div`
  /* 임시 border */
  /* border:1px solid red; */
  position:absolute;
  top:3.0625rem;
  left:0;
  right:0;
  bottom:0;

  overflow-y:scroll;

  padding-top: 0.875rem;

  background-color:#ffffff;
`;

const TopContentWrap = styled.div`
  border-bottom: 0.5rem #f7f7f7 solid;
  display: flex;
  padding: 0 1.25rem 1.2188rem;
`;

const PartyDataTitleDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  margin-bottom: 1.5rem;

  border: 1px red solid;

  .memberCountBox {
    display: flex;
    margin-left: 0.2188rem;
    background-color: #ffca35;
    border-radius: 0.5rem;
    align-items: center;
    padding: 0.0625rem 0.3125rem 0.125rem 0.3125rem;
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

const PartyDataContentWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-left: 1.25rem;
  padding-right: ${props => props.personnel > 4 ? '0rem' : '1.25rem'};
  justify-content: space-between;
  overflow-x: auto;


  border: 1px red solid;
`;