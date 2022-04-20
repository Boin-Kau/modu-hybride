import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { PageTransContext } from "../../containers/pageTransContext";
import { ContentWrap, HeaderWrap, PageWrap } from "../../styled/shared/wrap";
import { TextMiddle } from "../../styled/shared";
import { customApiClient } from "../../shared/apiClient";
import { BottomNavCloseAction } from "../../reducers/container/bottomNav";

import icon_back from "../../assets/icon-back-arrow.svg";
import blank_duck from "../../assets/ic_cardadmin_duck@2x.png"
import CardComponent from "./cardComponent";

const CardManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [cardData, setCardData] = useState([]);

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  const gotoRegister = () => {
    setPageTrans("trans toRight");
    history.push("/card");
  };

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);

  //life cycle
  useEffect(async () => {
    const data = await customApiClient("get", "/party/user/card");
    //서버에러
    if (!data) return;

    if(data.statusCode == 200){
      setCardData(data.result);
    }

    //벨리데이션
    if (data.statusCode != 200) {
      return;
    }
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
          <TextMiddle>카드 관리</TextMiddle>
        </HeaderWrap>
        <ContentWrap>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "1rem 0 1.125rem 0",
            }}
          >
            <div className="spoqaBold" style={{ fontSize: "0.875rem" }}>
              결제 수단
            </div>
            <AddButton className="notoMedium" onClick={gotoRegister}>+ 카드 추가</AddButton>
          </div>
          {cardData.length === 0 ? (
            <CardWrap>
              <img src={blank_duck}/>
              <div className="notoBold title-text">등록된 카드가 없습니다.</div>
              <div className="notoMedium sub-text">우측 상단의"카드추가"버튼을 통해<br/> 결제카드를 등록해주세요.</div>
            </CardWrap>
          ) : (
            <div>
              {cardData.map((card) => {
                return (
                  <div key={card.idx}>
                    <CardComponent
                      cardName={card.cardName}
                      cardNo={card.cardNo.substring(12, 16)}
                      id={card.idx}
                      cardData={cardData}
                      setCardData={setCardData}
                    ></CardComponent>
                  </div>
                );
              })}
            </div>
          )}
        </ContentWrap>
      </PageWrap>
    </div>
  );
};

export const AddButton = styled.div`
  padding: 0.125rem 0.375rem 0.1875rem 0.4375rem;
  border-radius: 0.625rem;
  border: solid 0.05rem #9b9b9b;
  font-size: 0.625rem;
  color: #5a5a5a;
  display: flex;
  align-items: center;
`;

export const CardWrap = styled.div`
  width: 100%;
  height: 12.9375rem;
  border: 1px solid #e3e3e3;
  border-radius: 0.75rem;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  color:#989898;

  img{
    width: 9.8063rem;
    height:6.7375rem;
    margin-top: 1.1938rem;
  }

  .title-text{
    font-size: 0.875rem;
  }

  .sub-text{
    margin-top: 0.3125rem;
    font-size: 0.75rem;
    text-align: center;
  }
`;

export default CardManagement;
