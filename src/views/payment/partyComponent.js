import React from "react";
import styled from "styled-components";
import PartyMembershipDiv from "../../components/party/PartyMembershipDiv";
import PartyTitleDiv from "../../components/party/PartyTitleDiv";

const PartyContainer = ({ partyTitle, partyInfo, membershipInfo }) => {
  return (
    <ContainerWrap>
      <div className="spoqaRegular container">
        <div className="partyInfoWrap">
          <PartyTitleDiv title={partyTitle} isDetail={false} info={partyInfo} />
        </div>
        <PartyMembershipDiv
          paymentCycle={membershipInfo.paymentCycleData}
          price={membershipInfo.price}
          membership={membershipInfo.membership}
          partyCategory={partyInfo.serverCategory}
        />
      </div>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  height: 14.75rem;

  display: flex;
  box-shadow: 0 0.1875rem 0.375rem 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;

  .container {
    margin: 0 0.6312rem 0 0.75rem;
    width: 100%;
  }
  
  .partyInfoWrap {
    display: flex;
    padding: 0.875rem 0 1.2188rem;
    align-items: center;
  }
`;

export default PartyContainer;
