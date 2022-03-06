import styled from "styled-components";

// isDetail이 true일 경우, 파티 상세보기에서 컴포넌트 사용(찰스)
// isDetail이 false일 경우, 결제하기에서 컴포넌트 사용(디모)

const PartyTitleDiv = ({title, info, isDetail}) => {

  console.log(title);
  console.log(info);
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
        <span className="topContentDescription spoqaBold">{`${info.serverName} • ${info.serverCategory}`}</span>
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
`;