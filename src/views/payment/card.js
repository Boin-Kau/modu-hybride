import React from "react";
import styled from "styled-components";

const Card = ({ cardName, cardNo, cardImg }) => {
  return (
    <Container
      className="spoqaBold"
      style={{
        backgroundImage: `url(${cardImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CardWrap>
        <span style={{ fontSize: "0.875rem" }}>{cardName}</span>
        <span style={{ fontSize: "1.5625rem" }}>{cardNo}</span>
      </CardWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 18.625rem;
  height: 10.625rem;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.04);
  background-color: #f5f5f5;
  margin-top: 1.125rem;
  display: flex;
  justify-content: center;

  /* transition: all 0.1s ease-out; */
`;

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 13.75rem;
  height: 4.3125rem;
  justify-content: space-between;
  margin-top: 5.0625rem;


  span {
    color: #fff;
    text-align: left;
  }
  `;

export default Card;
