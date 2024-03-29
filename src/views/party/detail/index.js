import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BottomNavCloseAction, BottomNavOpenAction } from "../../../reducers/container/bottomNav";
import { TextMiddle } from '../../../styled/shared';
import { PageTransContext } from '../../../containers/pageTransContext';
import { checkMobile } from "../../../App";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_more from "../../../assets/icon-partydetail-more.svg";
import icon_small_duck from "../../../assets/icon-partydetail-ducknumber.svg";
import PartyDataListItem from "../../../components/party/PartyList";
import PartyTitleDiv from "../../../components/party/PartyTitleDiv";
import PartyMembershipDiv from "../../../components/party/PartyMembershipDiv";
import { ResetParty } from "../../../reducers/party/detail";
import { PartyDetailSubWrap } from "../../../styled/shared/wrap";
import { PartyDetailSubtitleSpan } from "../../../styled/shared/text";
import BottomButton from "../../../components/party/BottomButton";
import { ReportBottomDialogOpenAction, ReportBottomDialogCloseAction, ReportPopupCloseAction } from "../../../reducers/party/popup";
import ReportBottomDialog from "./reportBottomDialog";

const PartyDetail = () => {

  let list = [];
  const [typeList, setTypeList] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

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

  const { setPageTrans } = useContext(PageTransContext);

  const [partyId, setPartyId] = useState(0);
  const [partyTitle, setPartyTitle] = useState('');
  const [partyIsEnrolled, setPartyIsEnrolled] = useState('');
  const [platformInfoObj, setPlatformInfoObj] = useState({});
  const [partyInfoObj, setPartyInfoObj] = useState({});
  const [membershipInfoObj, setMembershipInfoObj] = useState({});

  useEffect(() => {

    dispatch(BottomNavCloseAction);

    if (selectedPartyIdx &&
      selectedPartyTitle &&
      selectedPartyOpenChatLink &&
      selectedPartyRoomStatus &&
      selectedPartyIsEnrolled &&
      selectedPartyPlatformInfo &&
      selectedPartyPartyInfo &&
      selectedPartyMembershipInfo) {
      setPartyId(selectedPartyIdx);
      setPartyTitle(selectedPartyTitle);
      setPartyIsEnrolled(selectedPartyIsEnrolled);
      setPlatformInfoObj(selectedPartyPlatformInfo);
      setPartyInfoObj(selectedPartyPartyInfo);
      setMembershipInfoObj(selectedPartyMembershipInfo);
    } else {
      console.log('리덕스 초기화 감지')
      dispatch(BottomNavOpenAction);
      closePage();
    }


    const userPlatform = checkMobile();
    if (userPlatform == 'ios') {

      try {
        window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
      }
      catch (err) {
      }
    }
  }, []);

  useEffect(() => {
    list = [];
    if (partyInfoObj.currentUserCount && partyInfoObj.personnel) {

      const maxLength = partyInfoObj.personnel > 4 ? partyInfoObj.personnel : 4;

      list.push('파티장');
      for (let i = 0; i < partyInfoObj.currentUserCount - 1; i++) list.push('참가완료');
      for (let i = 0; i < partyInfoObj.personnel - partyInfoObj.currentUserCount; i++) list.push('대기중');
      for (let i = partyInfoObj.personnel; i !== maxLength; i++) list.push('-');
      setTypeList(list);
    }
  }, [partyInfoObj])


  const closePage = () => {

    dispatch(ReportBottomDialogCloseAction);
    dispatch(ReportPopupCloseAction());

    dispatch({
      type: ResetParty
    });

    setPageTrans('trans toLeft');
    history.goBack();
  };

  const openBottomDialog = () => {
    dispatch(ReportBottomDialogOpenAction);
  }

  const openPaymentPage = () => {
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth !== "Y") {
      sessionStorage.setItem("pastPath", "/party");
      setPageTrans('trans toRight');
      history.push("/realName/auth?path=/payment");
      return
    }

    setPageTrans('trans toRight');
    history.push('/payment');
  }

  const openPartyDetail = (partyIdx) => {
    setPageTrans('trans toRight');
    history.push(`/party/my/${partyIdx}`);
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
          
          <div style={{ flexGrow: '1' }}>
            
            <TopContentWrap>
              <PartyTitleDiv title={partyTitle} info={platformInfoObj} isDetail={true} />
            </TopContentWrap>

            <PartyDetailSubWrap style={{ borderBottom: '0.5rem #f7f7f7 solid' }}>
              
              <PartyDataTitleDiv>
                <PartyDetailSubtitleSpan>파티 정보</PartyDetailSubtitleSpan>
                <div className="memberCountBox">
                  <img className="memberCountImg" src={icon_small_duck} alt="오리" />
                  <div className="memberCountSpan spoqaBold">{partyInfoObj.personnel}명</div>
                </div>
              </PartyDataTitleDiv>
              
              <PartyDataContentWrap personnel={partyInfoObj.personnel}>
                {
                  typeList.map((item, idx) => {
                    return (
                      <PartyDataListItem
                        type={item}
                        margin={partyInfoObj.personnel > 4 ? "0.9375rem" : "0"}
                        isHost={idx === 0 ? "Y" : "N"}
                        isEnrollment={false}
                        key={idx} />
                    )
                  })
                }
              </PartyDataContentWrap>
            </PartyDetailSubWrap>

            
            <PartyDetailSubWrap style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
              <div style={{ marginBottom: '1.0938rem' }}>
                <PartyDetailSubtitleSpan>멤버십 정보</PartyDetailSubtitleSpan>
              </div>
              
              <PartyMembershipDiv
                membershipInfo={membershipInfoObj}
                platformInfo={platformInfoObj}
                isDetail={true} />
            </PartyDetailSubWrap>

          </div>

          <div style={{ margin: '0 1.25rem' }}>
            <BottomButton
              clickFunc={partyIsEnrolled === 'Y' ? () => openPartyDetail(partyId) : openPaymentPage}
              text={`${partyIsEnrolled === 'Y' ? '내 파티 상세보기' : '파티참가'}`}
              activeStatus={true}
              isBottomStatus={false} />
          </div>
        </MainWrap>
      </PageWrap>
      <ReportBottomDialog partyIdx={partyId} />
    </div>
  );
};

export default PartyDetail;

const PartyDetailContent = ({ result }) => {

  
  let list = [];

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


  useEffect(() => {
    if (!result) return;

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

  }, [result]);


  return (
    <div style={{ flexGrow: '1' }}>

    </div>
  );
};


const PageWrap = styled.div`

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
`;

const MembershipDataWrap = styled.div`

  padding: 1.3438rem 1.25rem 0;

  .membershipDataTitle {
    font-size: 0.875rem;
    color: #313131;
    display: block;
    margin-bottom: 1.0938rem;
  }
`;




