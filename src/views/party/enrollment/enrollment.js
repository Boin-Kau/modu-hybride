import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import { ContentWrap, HeaderWrap, MainWrap, PageWrap } from "../../../styled/shared/wrap";

import icon_back from "../../../assets/icon-back-arrow.svg";
import { TextMiddle } from "../../../styled/shared";
import styled from "styled-components";
import { MainText } from "../../../styled/shared/text";
import ChooseService from "./subPage/chooseService";
import ChooseAccount from "./subPage/chooseAccount";
import ChoosePartyInfo from "./subPage/choosePartyInfo";
import ChoosePayment from "./subPage/choosePayment";
import ChooseBankAccount from "./subPage/chooseBankAccount";
import CheckPartyData from "./subPage/checkPartyData";
import BottomButton from "../../../components/party/BottomButton";
import { ResetPlatform } from "../../../reducers/party/enrollment/platform";
import { UpdateCurrentPageAction } from "../../../reducers/party/enrollment/setPage";
import { checkMobile } from "../../../App";

const PartyEnrollment = () => {
  // Module
  const dispatch = useDispatch();
  const history = useHistory();
  //Context
  const { setPageTrans } = useContext(PageTransContext);

  //store
  const {
    selectedPlatformIdx,
    selectedPlatformImgUrl,
  } = useSelector(state => state.party.enrollment.platform);

  // Local State
  const [progress, setProgress] = useState(20);
  // Global State
  const { page: currentPage } = useSelector(state => state.party.enrollment.setPage);
  const { isAccount: isAccountStatus } = useSelector(state => state.party.enrollment.platform);
  // useEffect
  useEffect(() => {
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

  useEffect(() => {
    switch (currentPage) {
      case 1:
        setProgress(20);
        break;
      case 2:
        setProgress(35);
        break;
      case 3:
        setProgress(50);
        break;
      case 4:
        setProgress(65);
        break;
      case 5:
        setProgress(80);
        break;
      case 6:
        setProgress(100);
        break;
      default:
        setProgress(20);
        break;
    }
  }, [currentPage])

  const closePage = () => {
    setPageTrans('trans toLeft');

    // 뒤로 가기
    if (currentPage === 1) {
      //구독 리덕스 초기화
      dispatch({ type: ResetPlatform });
      history.push('/party');
    }
    else if (currentPage === 2) {
      //직접입력하기 혹은 이미지가 없는 플랫폼 클릭시 detail 설정 페이지로 이동시키기
      if (selectedPlatformIdx === 0 | !selectedPlatformImgUrl) {
        history.push('/party/enroll/platform/detail');
      }
      else {
        dispatch(UpdateCurrentPageAction({
          page: currentPage - 1
        }));
      }
    }
    else {

      dispatch(UpdateCurrentPageAction({
        page: currentPage - 1
      }));
    }
  };

  const jumpPage = () => {
    // 건너뛰기
    if (currentPage === 2 && isAccountStatus === 'N') {
      dispatch(UpdateCurrentPageAction({
        page: 3
      }));
    }
  }

  return (
    <div className="page">
      <HeaderWrap style={{ boxShadow: "none" }}>
        <div id="back_link" onClick={closePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
          <img src={icon_back} alt="뒤로가기"></img>
        </div>
        <TextMiddle>파티 등록</TextMiddle>
        <JumpWrap onClick={jumpPage} isJump={currentPage === 2 && isAccountStatus === 'N' ? true : false}>
          <div className="jumpWrapItem">건너뛰기</div>
        </JumpWrap>
        {/* Progress Bar */}
        <div style={{position:'absolute', bottom:'0',left:'0', right:'0'}}>
          <ProgressDiv progress={`${progress}%`} />
        </div>
        
      </HeaderWrap>

      <MainWrap style={{ padding: '0' }}>
        
        {currentPage === 1 && <ChooseService />}
        {currentPage === 2 && <ChooseAccount />}
        {currentPage === 3 && <ChoosePartyInfo />}
        {currentPage === 4 && <ChoosePayment />}
        {currentPage === 5 && <ChooseBankAccount />}
        {/* 입금자명 입력 페이지는 오픈뱅킹 도입 이후에 작업 */}
        {currentPage === 6 && <CheckPartyData />}
      </MainWrap>
    </div>
  );
};

export default PartyEnrollment;

const ProgressDiv = styled.div`
  background-color: #ffca17;
  height: 0.1875rem;
  width: ${props => props.progress};
  transition: all 0.3s ease;
`

const JumpWrap = styled.div`
  display: ${props => props.isJump ? 'block' : 'none'};

  z-index: 10;
  position: absolute;
  right: 0;
  height: 100%;
  width: 4.375rem;

  .jumpWrapItem {
    position: absolute;
    top: 55%;
    right: 1.3125rem;
    transform: translate(0,-55%);
    font-size: 0.75rem;
    font-weight: 400;
    color: #5a5a5a;
  }
`;