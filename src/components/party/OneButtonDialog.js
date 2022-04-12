import styled from "styled-components";

const OneButtonDialog = ({ openStatus, title, subTitle, onClickConfirm, buttonText }) => {

  return (

    <ConfirmWrapPopup openStatus={openStatus}>
      <ConfirmPopup openStatus={openStatus}>
        <div className="title">{title}</div>
        <div className="subtitle">{subTitle}</div>
        <div className="buttonDiv">
          <div className="yellowButton" onClick={onClickConfirm}>
            <div className="yellowButtonText">{buttonText}</div>
          </div>
        </div>
      </ConfirmPopup>
    </ConfirmWrapPopup>
  );
}
export default OneButtonDialog;

const ConfirmWrapPopup = styled.div`
    display : ${props => props.openStatus ? 'block' : 'none'};
    z-index:10000;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    background-color:rgba(110,110,110,0.35);
`;

const ConfirmPopup = styled.div`

  position:absolute;

  top:50%;
  left:2.125rem;
  right:2.125rem;

  transform:translate(0,-50%);

  border-radius: 0.4375rem;
  box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.05);
  background-color: #ffffff;

  padding:2.5rem 1.125rem 1.8438rem 1.125rem;

  text-align:center;

  /* 애니메이션 적용 */
  transition: opacity 300ms ease-out;
  opacity : ${props => props.openStatus ? '1' : '0'};

  .title {
    font-size: 1.0625rem;
    line-height: 1.3125rem;
    font-family: 'Spoqa Han Sans';
    font-weight: 600;
  }
  .subtitle {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 0.8125rem;
    color: rgba(49,49,49,0.4);
    margin: 0.5rem 0.875rem 0.8125rem 0.875rem;

    white-space: pre-line;
  }
  .buttonDiv {
    font-family: 'Spoqa Han Sans';
    font-weight: 600;
    display: flex;
  }
  .yellowButton {
    position: relative;
    width:7.6875rem;
    margin:0 auto;
    height: 2.4375rem;
    background-color: #ffca17;
    border-radius: 0.375rem;
  }
  .yellowButtonText {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 0.875rem;
    line-height:1.125rem;
    color: #ffffff;
  }
`;

