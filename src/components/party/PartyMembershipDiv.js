import styled from "styled-components";

const PartyMembershipDiv = ({paymentCycle, price, membership, partyCategory, isDetail}) => {
  return (
    <>
      {/* 멤버십 정보에서 노란 Div */}
      <MembershipYellowDiv isDetail={isDetail}>
        <div className="membershipYellowDivLeft">
          <div className="membershipYellowTitle notoMedium">파티 결제주기</div>
          <div className="membershipYellowText spoqaBold">{paymentCycle}</div>
        </div>
          
        <div className="membershipYellowDivRight">
          <div className="membershipYellowTitle notoMedium">구독금액</div>
          <div className="membershipYellowText spoqaBold">{price}원</div>
        </div>
      </MembershipYellowDiv>
      {/* 멤버십 정보에서 회색 Div */}
      <MembershipGrayDiv isDetail={isDetail} className="notoMedium">
        <div style={{display:"flex", marginBottom:"0.75rem"}}>
          <div className="membershipGrayTitle">멤버십 종류</div>
          <div className="membershipGrayText">{membership? membership : '없음'}</div>
        </div>
        <div style={{display:"flex"}}>
          <div className="membershipGrayTitle">카테고리</div>
          <div className="membershipGrayText">{partyCategory}</div>
        </div>
      </MembershipGrayDiv>
    </>
  )
}

export default PartyMembershipDiv;

const MembershipYellowDiv = styled.div`
  background-color: #ffca2c;
  border-radius: 7px;
  display: flex;

  padding-top: ${(props) => props.isDetail ? '0.75rem' : '0.6875rem'};
  padding-bottom: ${(props) => props.isDetail ? '0.75rem' : '0.6875rem'};
  margin-bottom: ${(props) => props.isDetail ? '0.5rem' : '0.4625rem'};

  .membershipYellowDivLeft {
    flex: 1;
    border-right: 0.0625rem solid rgba(0,0,0,.09);
  }
  .membershipYellowDivRight {
    flex: 1;
  }
  .membershipYellowTitle {
    width: 100%;
    text-align: center;
    color: #313131;
    opacity: 0.79;
    margin-bottom: 0.375rem;

    font-size: ${(props) => props.isDetail ? '0.75rem' : '0.6875rem'};
  }
  .membershipYellowText {
    width: 100%;
    text-align: center;
    color: #313131;

    font-size: ${(props) => props.isDetail ? '0.875rem' : '0.75rem'};
  }
`;

const MembershipGrayDiv = styled.div`
  background-color: #f7f7f7;
  border-radius: 7px;

  padding-top: ${(props) => props.isDetail ? '1.0625rem' : '0.9688rem'};
  padding-bottom: ${(props) => props.isDetail ? '1.0625rem' : '0.9688rem'};
  padding-left: ${(props) => props.isDetail ? '1.1875rem' : '1.125rem'};
  padding-right: ${(props) => props.isDetail ? '1.1875rem' : '1.125rem'};

  font-size: ${(props) => props.isDetail ? '0.8125rem' : '0.75rem'};

  .membershipGrayTitle {
    flex: 1;
    color: #313131;
  }
  .membershipGrayText {
    color: #696969;
  }
`;