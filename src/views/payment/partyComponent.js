import React from "react";
import styled from "styled-components";

const PartyContainer = () => {
  return (
    <ContainerWrap>
      <div
        className="spoqaRegular"
        style={{
          display: "flex",
          flexDirection: "column",
          margin:'0 0.6312rem 0 0.75rem',
          width:'100%'
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0.875rem 0 1.2188rem 0",
          }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2Fnetflix.png?alt=media&amp;token=96cf7411-2b79-4050-97cc-6ba683532b14"
            style={{
              display: "flex",
              width: " 2.3125rem",
              height: "2.3125rem",
              borderRadius: "0.3125rem",
              paddingRight: ".9375rem",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="spoqaBold"
              style={{
                display: "flex",
                height: "1.1875rem",
                fontSize: "0.8125rem",
              }}
            >
              넷플릭스 같이 결제 하실분 구해요
            </div>
            <div
              className="notoRegular"
              style={{
                display: "flex",
                height: "1.0625rem",
                fontSize: "0.75rem",
                color: "#acacac",
              }}
            >
              OTT
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "3.9562rem",
            marginBottom: "0.4625rem",
            borderRadius: "0.4375rem",
            border: "solid 0.0437rem #ddd",
            backgroundColor: " #ffca2c",
            justifyContent: "space-evenly",
            alignItems:'center'
          }}
        >
          <PartyWrap>
            <div
              className="notoRegular"
              style={{ display: "flex", fontSize: "0.6875rem", color: '#313131' }}
            >
              파티 결제주기
            </div>
            <div
              className="spoqaBold"
              style={{
                display: "flex",
                fontSize: "0.75rem",
                marginTop: "0.4562rem",
              }}
            >
              매달 15일
            </div>
          </PartyWrap>
          <div style={{width: '0', height: '2.125rem', margin: '0.2687rem 0 0.1938rem', opacity: '0.09',  border: 'solid 1px #000', backgroundColor:'#000'}}/>
          <PartyWrap>
            <div
              className="notoRegular"
              style={{ display: "flex", fontSize: "0.6875rem", color: '#313131' }}
            >
              구독금액
            </div>
            <div
              className="spoqaBold"
              style={{
                display: "flex",
                fontSize: "0.75rem",
                marginTop: "0.4562rem",
              }}
            >
              5,000원
            </div>
          </PartyWrap>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "4.8875rem",
            marginBottom: "1.0375rem",
            borderRadius: "0.4375rem",
            backgroundColor: " #f7f7f7",
          }}
        >
          <TextWrap className="notoRegular">
            <div>
              멤버십 종류
            </div>
            <div style={{color:'#696969'}}>
              평생소장
            </div>
          </TextWrap>
          <TextWrap className="notoRegular">
            <div>
              카테고리
            </div>
            <div style={{color:'#696969'}}>
              OTT
            </div>
          </TextWrap>
        </div>
      </div>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
  height: 14.75rem;

  display: flex;
  box-shadow: 0 0.1875rem 0.375rem 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;
`;

const PartyWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const TextWrap = styled.div`
  display:flex;
  margin: 0.925rem 1.1187rem 0 1.15rem;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #313131;
`;

export default PartyContainer;
