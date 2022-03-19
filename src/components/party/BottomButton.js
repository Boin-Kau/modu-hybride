import styled from "styled-components";

const BottomButton = ({text, clickFunc}) => {
  return(
    <BottomButtonWrap>
      <div onClick={clickFunc} className="bottomButtonText">{text}</div>
    </BottomButtonWrap>
  );
}

export default BottomButton;

const BottomButtonWrap = styled.div`
    display:flex;
    margin:1.25rem;

    background-color:#ffca17;
    border-radius:0.375rem;

    padding:0.875rem 0 0.8125rem 0;

    font-size:0.8125rem;
    color:#ffffff;

    .bottomButtonText {
      width: 100%;
      text-align: center;
    }
`;