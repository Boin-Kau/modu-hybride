import styled from "styled-components";
import icon_party_boss from "../../assets/icon-partydetail-partyboss.svg";


const PartyDataListItem = () => {
  return (
    <PartyItemWrap>
      <img src={icon_party_boss} alt="" />
      <div>파티장</div>
    </PartyItemWrap>
  );
};

export default PartyDataListItem;

const PartyItemWrap = styled.div`
  display: flex;
  flex-direction: column;

`;