import styled from "styled-components";

const PartyTitleDiv = ({imgUrl, title, name, category, isDetail}) => {
  return (
    <>
      <TitleImg src={imgUrl} alt="구독서비스이미지" isDetail={isDetail} />
      <TitleDiv isDetail={isDetail}>
        <div className="topContentTitle spoqaBold">{title}</div>
        <div className="topContentDescription spoqaBold">{`${name} • ${category}`}</div>
      </TitleDiv >
    </>
  )
};

export default PartyTitleDiv;

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