import React from "react";
import styled from "styled-components";
import PartyMembershipDiv from "../../components/party/PartyMembershipDiv";
import PartyTitleDiv from "../../components/party/PartyTitleDiv";

const PartyContainer = () => {
  return (
    <ContainerWrap>
      <div
        className="spoqaRegular"
        style={{
          margin: "0 0.6312rem 0 0.75rem",
          width: "100%",
        }}
      >
        <div style={{display:'flex', padding:'0.875rem 0 1.2188rem', alignItems:'center'}}>
          <PartyTitleDiv
            title={"넷플릭스 같이 결제하실분 구해요"}
            name={"왓챠"}
            category={"OTT"}
            isDetail={false}
          />
        </div>
        <PartyMembershipDiv />
      </div>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  height: 14.75rem;

  display: flex;
  box-shadow: 0 0.1875rem 0.375rem 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;
`;

export default PartyContainer;
