import styled from "styled-components";
import notionIcon from "../../assets/party/detail/ic-partydetail-delete.png";

// isDetail이 true일 경우, 파티 상세보기에서 컴포넌트 사용(찰스)
// isDetail이 false일 경우, 결제하기에서 컴포넌트 사용(디모)

const PartyTitleDiv = ({ title, info, isDetail, isUserReserved, isPartyReserved, leftDay }) => {
  return (
    <>
      {
        info.serverImgUrl ?
          <TitleImg src={info.serverImgUrl} alt="구독서비스이미지" isDetail={isDetail} />
          :
          info.color && info.initial ?
            <CustomImg isDetail={isDetail} color={info.color}>
              <CustomInitial isDetail={isDetail} className="spoqaBold">
                {info.initial}
              </CustomInitial>
            </CustomImg>
            :
            <CustomImg isDetail={isDetail} color="#e1e1e1">
              <CustomInitial isDetail={isDetail} className="spoqaBold">
                ?
              </CustomInitial>
            </CustomImg>
      }
      <TitleDiv isDetail={isDetail}>
        <div className="topContentTitle spoqaBold">{title}</div>
        <div style={{ display: "flex" }}>
          {
            info.registerType === "SERVER" ?
              <div className="topContentDescription spoqaBold">{`${info.serverName || "없음"} • ${info.serverCategory || "없음"}`}</div> :
              <div className="topContentDescription spoqaBold">{`${info.customName || "없음"} • ${info.customCategory || "없음"}`}</div>
          }
          {
            (isUserReserved === true || isPartyReserved === true) &&
            <div className="notionWrap">
              <img className="notionImg" src={notionIcon} alt="notionIcon" />
              {
                isUserReserved ? <span className="notionText notoMedium">{leftDay === 0 ? "오늘 해지" : `${leftDay}일 후 해지`}</span> :
                  <span className="notionText notoMedium">{leftDay === 0 ? "오늘 삭제" : `${leftDay}일 후 삭제`}</span>
              }
            </div>
          }
        </div>
      </TitleDiv >
    </>
  )
};

export default PartyTitleDiv;

const CustomImg = styled.div`
  position: relative;
  background-color: ${(props) => props.color};
  border-radius: 0.375rem;

  width: ${(props) => props.isDetail ? '3.25rem' : '2.3125rem'};
  height: ${(props) => props.isDetail ? '3.25rem' : '2.3125rem'};
  margin-right: ${(props) => props.isDetail ? '0.875rem' : '0.9375rem'};
`;

const CustomInitial = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-30%);
  color: #ffffff;
  /* 수정필요 */
  font-size: ${(props) => props.isDetail ? '1.375rem' : '1.375rem'};
`;

const TitleImg = styled.img` 
  width: ${(props) => props.isDetail ? '3.25rem' : '2.3125rem'};
  height: ${(props) => props.isDetail ? '3.25rem' : '2.3125rem'};
  margin-right: ${(props) => props.isDetail ? '0.875rem' : '0.9375rem'};
`;

const TitleDiv = styled.div`
  position: relative;
  .topContentTitle {
    font-size: ${(props) => props.isDetail ? '1.0625rem' : '0.8125rem'};
    color: #313131;
    margin-bottom: ${(props) => props.isDetail ? '0.3125rem' : '0.0625rem'};;
  }
  .topContentDescription {
    font-size: ${(props) => props.isDetail ? '0.875rem' : '0.75rem'};;
    color: #000000;
    opacity: 0.35;
  }
  .notionWrap {
    background-color:rgba(251, 94, 94, 0.15);
    border-radius:0.9688rem;

    padding: 0 0.475rem;
    margin-left:0.6875rem;
  }
  .notionImg {
    width:0.8125rem;
    height:0.6875rem;
    margin-right:0.2375rem;
  }
  .notionText {
    font-size:0.75rem;
    color:#fb5e5e;
  }
`;