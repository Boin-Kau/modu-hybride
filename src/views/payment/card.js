import React from "react";
import styled from "styled-components";

import ic_pay_cardtab from "../../assets/ic_pay_cardtab.svg";

const Card = ({ data }) => {
  console.log(data.result);
  return (
    <Container
      className="spoqaBold"
      style={{
        backgroundImage: `url(${ic_pay_cardtab})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {data.result.map((cardData) => {
        return (
          <div
            key={cardData.idx}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              height: "40%",
              justifyContent: "space-between",
              marginTop: "20%",
            }}
          >
            <span style={{ fontSize: "0.875rem" }}>{cardData.cardName}</span>
            <span style={{ fontSize: "1.5625rem" }}>{cardData.cardNo}</span>
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 94%;
  height: 10.625rem;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.04);
  border: dashed 0.4px #bcbcbc;
  background-color: #f5f5f5;
  margin-top: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #fff;
    text-align: left;
  }
`;

export default Card;
