import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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

const PartyEnrollmentPast = () => {
  // Module
  const dispatch = useDispatch();
  const history = useHistory();

  //Context
  const { setPageTrans } = useContext(PageTransContext);

  //store
  const {
    selectedPlatformName,
    isAccount: isAccountStatus
  } = useSelector(state => state.party.enrollment.platform);

  const {
    title,
  } = useSelector(state => state.party.enrollment.partyInfo);

  const { page: currentPage } = useSelector(state => state.party.enrollment.setPage);

  // Local State
  const [progress, setProgress] = useState(20);

  //기존 파티 인덱스
  const { idx } = useParams();

  // useEffect
  useEffect(() => {

    //리덕스 값 없으면 뒤로가기
    if (!idx || !selectedPlatformName || !title) {
      setPageTrans('trans toLeft');
      history.goBack();
      return
    }


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
        dispatch(UpdateCurrentPageAction({ page: 2 }));
        break;
      case 2:
        setProgress(25);
        break;
      case 3:
        dispatch(UpdateCurrentPageAction({ page: 4 }));
        break;
      case 4:
        setProgress(50);
        break;
      case 5:
        setProgress(75);
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

    // 뒤로 가기
    if (currentPage === 2) {
      setPageTrans('trans toLeft');
      history.goBack();
    }
    else if (currentPage === 4) {
      dispatch(UpdateCurrentPageAction({
        page: 2
      }));
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
        page: 4
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
      </HeaderWrap>

      <MainWrap style={{ padding: '0' }}>
        {/* Progress Bar */}
        <ProgressDiv progress={`${progress}%`} />

        {currentPage === 2 && <ChooseAccount />}
        {currentPage === 4 && <ChoosePayment />}
        {currentPage === 5 && <ChooseBankAccount />}
        {currentPage === 6 && <CheckPartyData />}
      </MainWrap>
    </div>
  );
};

export default PartyEnrollmentPast;

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