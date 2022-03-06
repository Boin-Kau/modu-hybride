import { TextMiddle } from "../../../styled/shared";
import { ContentWrap, HeaderWrap } from "../../../styled/shared/wrap";
import { PageTransContext } from '../../../containers/pageTransContext';

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_more from "../../../assets/icon-partydetail-more.svg";

import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import styled from "styled-components";
import { checkMobile } from "../../../App";
import { customApiClient } from "../../../shared/apiClient";
import PartyTitleDiv from "../../../components/party/PartyTitleDiv";

const MyPartyDetail = ({ location }) => {

  // Module
  const history = useHistory();
  const dispatch = useDispatch();

  //Context
  const { setPageTrans } = useContext(PageTransContext);

  // Local State
  const [partyIdx, setPartyIdx] = useState(location.state.idx);

  const [partyTitle, setPartyTitle] = useState('');
  const [platformInfo, setPlatformInfo] = useState({});

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
    setPlatformInfo(partyDetailData.result.platformInfo);

  };

  
  const closePage = () => {
    // 뒤로 가기
    setPageTrans('trans toLeft');
    history.goBack();
  };

  const openBottomDialog = () => {
    console.log('Open Bottom Dialog');
  }

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
        <TopContentWrap>
          {/* 파티 제목 컴포넌트 */}
          <PartyTitleDiv title={partyTitle} info={platformInfo} isDetail={true}/>
        </TopContentWrap>
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