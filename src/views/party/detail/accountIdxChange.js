import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";

import { ContentWrap, HeaderWrap, PageWrap } from "../../../styled/shared/wrap";
import { TextMiddle } from "../../../styled/shared";
import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import icon_back from "../../../assets/icon-back-arrow.svg";
import AccountSlide from "../../payment/accountSlide";
import BottomButton from "../../../components/party/BottomButton";
import { customApiClient } from "../../../shared/apiClient";
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from "../../../reducers/container/message";

const AccountIdxChange = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { idx } = useParams();

  const { setPageTrans } = useContext(PageTransContext);

  const [accountIdx, setAccountIdx] = useState(-1);
  const [partyRoomIdx, setPartyRoomIdx] = useState(0);

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  const onClickBankAcccountChange = async () => {
    if (accountIdx !== -1) {
      const data = await customApiClient('patch', `/party/${partyRoomIdx}/bankAccount/${accountIdx}`);

      console.log(data.message);

      if (!data) { return };

      if (data.statusCode !== 200) { return };

      console.log('API 호출 성공 :', data);

      dispatch({
        type: MessageWrapOpen
      })
      dispatch({
        type: MessageOpen,
        data: '정산계좌가 정상적으로 변경되었어요.'
      })

      setTimeout(() => {
        dispatch({
          type: MessageClose
        })
      }, 2000);
      setTimeout(() => {
        dispatch({
          type: MessageWrapClose
        })
      }, 2300);

      closePage();
    }
  }

  useEffect(async () => {
    dispatch(BottomNavCloseAction);

    if (idx) {
      setPartyRoomIdx(idx);
      console.log(idx);
    } else {
      closePage();
    }
  }, []);

  console.log(`Account Index : ${accountIdx}`);

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
        <ContentWrap style={{ display: "flex", flexDirection: "column" }}>
          <TitleWrap>
            <span className="spoqaBold">계좌 목록</span>
          </TitleWrap>
          <AccountSlide setAccountIdx={setAccountIdx} isEnrollment={false} />
          <div style={{ flexGrow: "1" }} />
          <BottomButton
            clickFunc={onClickBankAcccountChange}
            text={"확인"}
            activeStatus={accountIdx === -1 ? false : true}
            isBottomStatus={false} />
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
