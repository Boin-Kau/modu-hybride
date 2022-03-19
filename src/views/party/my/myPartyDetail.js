import { TextMiddle } from "../../../styled/shared";
import { ContentWrap, HeaderWrap, NoticeWrap, PartyDetailSubWrap } from "../../../styled/shared/wrap";
import { PageTransContext } from '../../../containers/pageTransContext';

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_more from "../../../assets/icon-partydetail-more.svg";
import icon_small_duck from "../../../assets/icon-partydetail-ducknumber.svg";
import icon_notice_duck from '../../../assets/icon-notice-duck.svg';

import { useHistory, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import styled from "styled-components";
import { checkMobile } from "../../../App";
import { customApiClient } from "../../../shared/apiClient";
import PartyTitleDiv from "../../../components/party/PartyTitleDiv";
import { PartyDetailSubtitleSpan } from "../../../styled/shared/text";
import PartyDataListItem from "../../../components/party/PartyList";
import PartyMembershipDiv from "../../../components/party/PartyMembershipDiv";
import AccountInfoComponent from "./AccountInfoComponent";
import BottomButton from "../../../components/party/BottomButton";

const MyPartyDetail = () => {

  // 테스트 코드
  let list = [];
  const [typeList, setTypeList] = useState([]);

  // Module
  const history = useHistory();
  const dispatch = useDispatch();
  const {idx} = useParams();

  //Context
  const { setPageTrans } = useContext(PageTransContext);

  // Local State
  const [partyIdx, setPartyIdx] = useState(0);
  const [payMonth, setPayMonth] = useState(0);
  const [payDay, setPayDay] = useState(0);

  const [partyTitle, setPartyTitle] = useState('');
  const [isHostUser, setIsHostUser] = useState('');
  const [openChatLink, setOpenChatLink] = useState('');
  const [partyInfoObj, setPartyInfoObj] = useState({});
  const [platformInfoObj, setPlatformInfoObj] = useState({});
  const [membershipInfoObj, setMembershipInfoObj] = useState({});
  const [accountInfoObj, setAccountInfoObj] = useState({});
  const [bankAccountInfoObj, setBankAccountInfoObj] = useState({});
  const [userCardInfoObj, setUserCardInfoObj] = useState({});

  // Lifecycle - Initial Logic
  useEffect(() => {
    // Bottom Nav 
    dispatch(BottomNavCloseAction);

    if(idx) {
      setPartyIdx(idx); 
    } else {
      closePage();
    }

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

  useEffect(() => {
    getPartyDetail();
  },[partyIdx])

  useEffect(() => {
    if(isNotEmpty(membershipInfoObj)) {
      if(isHostUser==='N') {
        setPayMonth(Number((membershipInfoObj.nextPaymentDate).split('-')[1]));
        setPayDay(Number((membershipInfoObj.nextPaymentDate).split('-')[2]));
      } else if(isHostUser==='Y') {
        setPayMonth(Number((membershipInfoObj.paymentCycleDate).split('-')[1]));
        setPayDay(Number((membershipInfoObj.paymentCycleDate).split('-')[2]));
      }
    }
  },[membershipInfoObj])

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
    setOpenChatLink(partyDetailData.result.openChatLink)
    setPlatformInfoObj(partyDetailData.result.platformInfo);
    setPartyInfoObj(partyDetailData.result.partyInfo);
    setMembershipInfoObj(partyDetailData.result.membershipInfo);
    setAccountInfoObj(partyDetailData.result.accountInfo);
    setBankAccountInfoObj(partyDetailData.result.bankAccountInfo);
    setUserCardInfoObj(partyDetailData.result.userCardInfo);

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
  // 오픈채팅방 링크 열기 Function 
  const onClickChatLink = () => window.open(openChatLink, '_blank');

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
          <div style={{marginBottom:'0.625rem'}}>
            <PartyDetailSubtitleSpan>멤버십 정보</PartyDetailSubtitleSpan>
          </div>
          {/* 아낀금액 알려주기 */}
          <NoticeWrap style={{marginBottom:'0.5313rem'}}>
            <div className="notice_sub_wrap align_center">
              <img className="notice_img" src={icon_notice_duck}></img>
              <div className="notice_text_div">
                <span>이번달 </span>
                <span className="notice_text_yellow">{membershipInfoObj.originlPrice-membershipInfoObj.price}원</span>
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
          isNotEmpty(accountInfoObj) && 
          <PartyDetailSubWrap style={{paddingLeft:'1.25rem',paddingRight:'1.25rem',borderBottom: '0.5rem #f7f7f7 solid'}} >
            {/* 서브타이틀 */}
            <div style={{ marginBottom:'1.25rem'}}>
              <PartyDetailSubtitleSpan>계정 정보</PartyDetailSubtitleSpan>
            </div>
            {/* 파티장은 계정변경, 파티원은 계정복사로 버튼 구성 */}
            <AccountInfoComponent
              isHostUser={isHostUser}
              accountInfo={accountInfoObj}
              partyIdx={partyIdx}/>
          </PartyDetailSubWrap>
        }

        {/* 파티장은 정산정보, 파티원은 결제수단 */}
        <PartyDetailSubWrap style={{paddingLeft:'1.25rem',paddingRight:'1.25rem'}}>
          {/* 서브타이틀 */}
          <div style={{ marginBottom:'0.625rem'}}>
            <PartyDetailSubtitleSpan>{isHostUser==='Y'? '정산정보':'결제수단'}</PartyDetailSubtitleSpan>
          </div>
          {/* 정산정보or결제수단 Notice Wrap */}
          <NoticeWrap style={{marginBottom:'0.5rem'}}>
            <div className="notice_sub_wrap align_center">
              <div>
                <img className="notice_img" src={icon_notice_duck}></img>
              </div>
              <div className="notice_text_div">
                <span>다음 </span>
                <span>{isHostUser==='Y'? '정산':'결제'}</span>
                <span>예정일은 </span>
                <span className="notice_text_yellow">{payMonth}월 {payDay}일</span>
                <span>입니다!</span><br/>
                {/* 
                  파티장 : 00000원이 결제
                  파티원 : 0000원이 정산
                */}
                <span>될 예정이에요.</span>
              </div>
            </div>
          </NoticeWrap>
          {/* 정산정보or결제수단 Contents */}
          <PaymentContentsWrap>
            <div className="contents_div">
              <span className="contents_name">{isHostUser==='Y'? '정산':'결제'}수단</span>
              <span className="contents_description">{isHostUser==='Y'? '계좌입금':'신용/체크카드'}</span>
            </div>
            <div className="contents_div">
              <span className="contents_name">상세</span>
              <span className="contents_description">
              {
                isHostUser==='Y' ?
                  bankAccountInfoObj.bankName ?
                    bankAccountInfoObj.bankName + " " + bankAccountInfoObj.bankAccountNum
                    :
                    "없음"
                  :
                  userCardInfoObj.cardName ? 
                    userCardInfoObj.cardName + " " + userCardInfoObj.cardNo
                    :
                    "없음"
              }
              </span>
            </div>
            <div className="change_contents_btn">
              {isHostUser? "정산계좌":"결제수단"} 변경하기
            </div>
          </PaymentContentsWrap>

        </PartyDetailSubWrap>

        {/* 최하단 Yellow 버튼 */}
        <div style={{margin:'1.25rem'}}>
          <BottomButton clickFunc={onClickChatLink} text={'오픈채팅방 열기'} status={true} />
        </div>
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

const PaymentContentsWrap = styled.div`
  border-radius: 0.4375rem;
  box-shadow: 0 0.1875rem 0.25rem 0 rgba(233, 233, 233, 0.38);
  background-color: #fff;

  padding: 1.25rem 1.1563rem 1.125rem 1.1875rem;

  .contents_div {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 0.8125rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  .contents_name {
    color: #313131;
  }
  .contents_description {
    color: #464646;
  }
  .change_contents_btn {
    color: #8b8b8b;
    font-size: 0.75rem;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    text-decoration: underline;
    text-align: end;
  }

`;