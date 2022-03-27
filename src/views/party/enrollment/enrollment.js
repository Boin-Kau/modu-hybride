import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

const PartyEnrollment = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //Context
  const { setPageTrans } = useContext(PageTransContext);

  const [progress, setProgress] = useState(20);
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(()=> {
    dispatch(BottomNavCloseAction);
  },[])

  const closePage = () => {
    // 뒤로 가기
    setPageTrans('trans toLeft');
    history.goBack();
  };

  return (
    <div className="page">
      <HeaderWrap style={{boxShadow:"none"}}>
        <div id="back_link" onClick={closePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
          <img src={icon_back} alt="뒤로가기"></img>
        </div>
        <TextMiddle>파티 등록</TextMiddle>
        <div style={{ zIndex: "10", position: "absolute", right: '0', height: '100%', width: '4.375rem' }}>
          <div style={{ position: "absolute", top: "55%", right: "1.3125rem", transform: "translate(0,-55%)", fontSize: "0.75rem", fontWeight:"400", color:"#5a5a5a" }}>건너뛰기</div>
        </div>
      </HeaderWrap>

      <MainWrap style={{padding:'0'}}>
        {/* Progress Bar */}
        <ProgressDiv progress={`${progress}%`}/>

        {currentPage===1 && <ChooseService/>}
        {currentPage===2 && <ChooseAccount/>}
        {currentPage===3 && <ChoosePartyInfo/>}
        {currentPage===4 && <ChoosePayment/>}
        {currentPage===5 && <ChooseBankAccount/>}
        {/* 입금자명 입력 페이지는 오픈뱅킹 도입 이후에 작업 */}
        {currentPage===6 && <CheckPartyData/>}

        <div style={{margin:'1.25rem'}}>
          <BottomButton clickFunc={undefined} text={'미정'} status={true} />
        </div>
      </MainWrap>

      
    </div>
  );
};

export default PartyEnrollment;

const ProgressDiv = styled.div`
  background-color: #ffca17;
  height: 0.1875rem;
  width: ${props => props.progress};
`