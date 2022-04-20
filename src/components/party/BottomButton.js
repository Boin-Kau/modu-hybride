import styled from "styled-components";

const BottomButton = ({ text, clickFunc, activeStatus, isBottomStatus }) => {
  return (
    <BottomButtonWrap onClick={clickFunc} activeStatus={activeStatus} isBottomStatus={isBottomStatus}>
      <div className="bottomButtonText">{text}</div>
    </BottomButtonWrap>
  );
}

export default BottomButton;

const BottomButtonWrap = styled.div`
    font-family: 'Spoqa Han Sans';
    font-weight: bold;
    
    display:flex;
    margin-bottom:1.25rem;

    background-color:#ffca17;
    border-radius:0.375rem;

    padding:0.875rem 0 0.8125rem 0;

    font-size:0.8125rem;
    color:#ffffff;

    .bottomButtonText {
      width: 100%;
      text-align: center;
    }
    /* status가 true면 Yellow, false면 Gray */
    background-color: ${(props) => props.activeStatus ? "#ffca17" : "#e3e3e3"};

    /* 버튼이 화면 바닥으로 깔리면 isBottomStatus가 true */
    position: ${(props) => props.isBottomStatus ? 'absolute' : 'static'};
    bottom: 0;
    left: 1.25rem;
    right: 1.25rem;
`;