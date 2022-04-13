import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";

import { ContentWrap, HeaderWrap, PageWrap } from "../../../styled/shared/wrap";
import { TextMiddle } from "../../../styled/shared";
import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import icon_back from "../../../assets/icon-back-arrow.svg";
import AccountSlide from "../../payment/accountSlide";
import BottomButton from "../../../components/party/BottomButton";

const AccountIdxChange = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [accountIdx, setAccountIdx] = useState();
  const [confirmStatus, setConfirmStatus] = useState(true);

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  const goToCardManage = () =>{
    setPageTrans("trans toRight");
    history.push('/card/manage');
  }

  const onClickBankAcccountChange = () => {
    


    // 계좌 변경 완료 후, 원래 페이지로 이동
    closePage();
  }

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);

  console.log(`Account Index : ${accountIdx}`);

  //정산계좌 수단 바꾸는 api -> 파티 아이디랑 그런것도 필요할것같은디..요건 찰스랑 협의

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
          <TextMiddle>정산계좌 변경</TextMiddle>
        </HeaderWrap>
        <ContentWrap style={{display:"flex", flexDirection:"column"}}>
          <TitleWrap>
            <span className="spoqaBold">계좌 목록</span>
            <div className="notoMedium manage-button" onClick={goToCardManage}>카드 관리</div>
          </TitleWrap>
          <AccountSlide setAccountIdx={setAccountIdx}/>
          <div style={{flexGrow:"1"}}/>
          <BottomButton 
            clickFunc={onClickBankAcccountChange}
            text={"확인"}
            activeStatus={confirmStatus}
            isBottomStatus={false}/>
        </ContentWrap>
      </PageWrap>
    </div>
  );
};

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;

  .span {
    display: flex;
    font-size: 0.875rem;
    color: #313131;
  }

  .manage-button {
    display: flex;
    width: 3.25rem;
    height: 1.25rem;
    border-radius: 0.625rem;
    background-color: #f2f2f2;
    align-items: center;
    justify-content: center;
    font-size: 0.625rem;
    color: #5a5a5a;
  }
`;

export default AccountIdxChange;
