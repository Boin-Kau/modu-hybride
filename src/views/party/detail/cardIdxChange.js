import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";

import { ContentWrap, HeaderWrap, PageWrap } from "../../../styled/shared/wrap";
import { TextMiddle } from "../../../styled/shared";
import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import icon_back from "../../../assets/icon-back-arrow.svg";
import Slide from "../../payment/slide";

const CardIdxChange = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [cardIdx, setCardIdx] = useState();

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  const goToCardManage = () =>{
    setPageTrans("trans toRight");
    history.push('/card/manage');
  }

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);

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
        <ContentWrap>
          <TitleWrap>
            <span className="spoqaBold">결제 수단</span>
            <div className="notoMedium manage-button" onClick={goToCardManage}>카드 관리</div>
          </TitleWrap>
          <Slide setCardIdx={setCardIdx}></Slide>
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
