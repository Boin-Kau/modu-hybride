import React from "react";
import styled from "styled-components";

const Price = ({ priceInfo, priceFunc }) => {
  console.log(priceInfo);

  return (
    <div style={{ margin: "1.6625rem 0 0.75rem 0" }}>
      <Container className="notoMedium">
        <span>구독금액</span>
        <span>{priceFunc(priceInfo.currentPrice)}원</span>
      </Container>
      <Container className="notoMedium">
        <span>수수료</span>
        <span>{priceFunc(priceInfo.currentCommissionPrice)}원</span>
      </Container>
      <div
        style={{
          width: "100%",
          height: " 0",
          marginBottom: "0.9875rem",
          border: "solid 0.5px #676767",
        }}
      ></div>
      <Container className="notoBold">
        <span style={{ color: "#eba300", fontSize: "0.8125rem" }}>
          첫달 결제금액
        </span>
        <span style={{ color: "#eba300", fontSize: "0.8125rem" }}>
          {priceFunc(priceInfo.currentPrice + priceInfo.currentCommissionPrice)}
          원
        </span>
      </Container>
      <Container className="notoMedium">
        <span style={{ color: "#676767" }}>다음달 결제금액</span>
        <span style={{ color: "#676767" }}>
          {priceFunc(
            priceInfo.nextPrice === null &&
              priceInfo.nextCommissionPrice === null
              ? 0
              : priceInfo.nextPrice + priceInfo.nextCommissionPrice
          )}원
        </span>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.75rem;

  span {
    font-size: 0.75rem;
    color: #1d1d1d;
  }
`;

export default Price;
