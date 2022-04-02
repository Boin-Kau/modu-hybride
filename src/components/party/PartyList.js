import styled from "styled-components";
import icon_party_boss from "../../assets/icon-partydetail-partyboss.svg";
import icon_party_waiting from "../../assets/icon-partydetail-partynotyet.svg";
import icon_party_nothing from "../../assets/icon-partydetail-partynope.svg";
import { useState } from "react";

const PartyDataListItem = ({type, margin}) => {

  const setMemberType = () => {
    switch (type) {
      case '파티장': 
        return (
          <PartyItemWrap marginRight={margin} color="#ffca35">
            <img className="itemImg" src={icon_party_boss} alt="boss" />
            <div className="itemTag notoBold">{type}</div>
          </PartyItemWrap>
        );
      case '참가완료':
        return (
          <PartyItemWrap marginRight={margin} color="#ffca35">
            <img className="itemImg" src={icon_party_boss} alt="" />
            <div className="itemTag notoMedium">{type}</div>
          </PartyItemWrap>
        );
      case '대기중':
        return (
          <PartyItemWrap marginRight={margin} color="rgba(49,49,49,.6)">
            <img className="itemImg" src={icon_party_waiting} alt="" />
            <div className="itemTag notoMedium">{type}</div>
          </PartyItemWrap>
        );
      default:
        return (
          <PartyItemWrap marginRight={margin} color="rgba(49,49,49,.57)">
            <img className="itemImg" src={icon_party_nothing} alt="" />
            <div className="itemTag notoMedium">-</div>
          </PartyItemWrap>
        );
    }

  };
  
  return (
    <> {setMemberType()} </>
  );
};

export default PartyDataListItem;

const PartyItemWrap = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: ${props => props.marginRight};
  color: ${props => props.color};

  .itemImg {
    width: 4rem;
    height: 4rem;
  }
  .itemTag {
    margin: 0.25rem auto 0;
    font-size: 0.875rem;
    line-height: 1.79;
  }
`;