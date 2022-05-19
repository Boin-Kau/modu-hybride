import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";

import { ContentWrap, HeaderWrap, PageWrap } from "../../../styled/shared/wrap";
import { TextMiddle } from "../../../styled/shared";
import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import icon_back from "../../../assets/icon-back-arrow.svg";
import BottomButton from "../../../components/party/BottomButton";
import Slide from "../../payment/slide";
import { customApiClient } from "../../../shared/apiClient";
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from "../../../reducers/container/message";

const CardIdxChange = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { idx } = useParams();


  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [cardIdx, setCardIdx] = useState(-1);
  const [partyRoomIdx, setPartyRoomIdx] = useState(0);

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  const onClickPaymentChange = async () => {
    if (cardIdx !== -1) {
      const data = await customApiClient('patch', `party/${partyRoomIdx}/card/${cardIdx}`);

      console.log(data.message);
      // Server Error
      if (!data) { return };
      // Validation 
      if (data.statusCode !== 200) { return };

      console.log('API 호출 성공 :', data);

      //토스트 메시지
      //수정완료 팝업 띄우기
      dispatch({
        type: MessageWrapOpen
      })
      dispatch({
        type: MessageOpen,
        data: '결제수단이 정상적으로 변경되었어요.'
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

  //결제수단 바꾸는 api -> 파티 아이디랑 그런것도 필요할것같은디..요건 찰스랑 협의

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
          <TextMiddle>결제수단 변경</TextMiddle>
        </HeaderWrap>
        <ContentWrap style={{ display: "flex", flexDirection: "column" }}>
          <TitleWrap>
            <span className="spoqaBold">결제 수단</span>
          </TitleWrap>
          <Slide setCardIdx={setCardIdx} />
          <div style={{ flexGrow: "1" }} />
          <BottomButton
            clickFunc={onClickPaymentChange}
            text={"확인"}
            activeStatus={cardIdx === -1 ? false : true}
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

export default CardIdxChange;
