import styled from "styled-components";
import icon_party_boss from "../../assets/icon-partydetail-partyboss.svg";
import icon_party_user from "../../assets/party/detail/ic-partydetail-partysucess.png";
import icon_party_user_reserved from "../../assets/party/detail/ic-partydetail-deletethumb.png";
import icon_party_waiting from "../../assets/icon-partydetail-partynotyet.svg";
import icon_party_nothing from "../../assets/icon-partydetail-partynope.svg";

const PartyDataListItem = ({ type, margin, isEnrollment }) => {

  const setMemberType = () => {
    switch (type) {
      case '파티장':
        return (
          <PartyItemWrap marginRight={margin} color="#ffca35" isEnrollment={isEnrollment}>
            <img className="itemImg" src={icon_party_boss} alt="boss" />
            <div className="itemTag notoBold">{type}</div>
          </PartyItemWrap>
        );
      case '참가완료':
        return (
          <PartyItemWrap marginRight={margin} color="#ffca35" isEnrollment={isEnrollment}>
            <img className="itemImg" src={icon_party_user} alt="user" />
            <div className="itemTag notoBold">{type}</div>
          </PartyItemWrap>
        );
      case '파티원':
        return (
          <PartyItemWrap marginRight={margin} color="#ffca35" isEnrollment={isEnrollment}>
            <img className="itemImg" src={icon_party_user} alt="user" />
            <div className="itemTag notoBold">{type}</div>
          </PartyItemWrap>
        );
      case '대기중':
        return (
          <PartyItemWrap marginRight={margin} color="rgba(49,49,49,.6)" isEnrollment={isEnrollment}>
            <img className="itemImg" src={icon_party_waiting} alt="waiting" />
            <div className="itemTag notoMedium">{type}</div>
          </PartyItemWrap>
        );
      default:
        return (
          <PartyItemWrap marginRight={margin} color="rgba(49,49,49,.57)" isEnrollment={isEnrollment}>
            <img className="itemImg" src={icon_party_nothing} alt="nothing" />
            <div className="itemTag notoMedium">-</div>
          </PartyItemWrap>
        );
    }
  };

  return (
    <>
      {
        setMemberType()
      }
    </>
  );
};

export default PartyDataListItem;

const PartyItemWrap = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: ${props => props.marginRight};
  color: ${props => props.color};

  .itemImgWrap {
    position:relative;
    width: ${props => props.isEnrollment ? '3.5625rem' : '4rem'};
    height: ${props => props.isEnrollment ? '3.5625rem' : '4rem'};
  }
  .itemImg {
    width: ${props => props.isEnrollment ? '3.5625rem' : '4rem'};
    height: ${props => props.isEnrollment ? '3.5625rem' : '4rem'};
  }
  .reservedText {
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    text-align:center;

    font-size:0.5rem;
    color:#ffffff;
  }
  .itemTag {
    margin: ${props => props.isEnrollment ? '0.1875rem auto 0' : '0.25rem auto 0'};   
    font-size: ${props => props.isEnrollment ? '0.75rem' : '0.875rem'};
    line-height: 1.79;
    white-space:nowrap;
  }
`;

export const CustomPartyListItem = ({ name, margin, isHost, status, isEnrollment }) => {
  return (
    <PartyItemWrap
      marginRight={margin}
      isEnrollment={isEnrollment}
      color={
        status === "RESERVED" ? "#fb5e5e" : "#ffca35"
      }>
      <div className="itemImgWrap">
        <img className="itemImg"
          src={isHost === "Y" ? icon_party_boss :
            status === "RESERVED" ? icon_party_user_reserved :
              icon_party_user
          }
          alt="boss" />
        {status === "RESERVED" && <div className="reservedText notoMedium">해지예정</div>}
      </div>
      <div className="itemTag notoBold">{name}</div>
    </PartyItemWrap>
  );
}