import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ConfirmDialog = ({ title, subTitle, onClickConfirm, onClickCancel }) => {

  return (
    <>
      <div style={{ position: 'relative', height: '1.25rem' }}></div>
      <div className="title">{title}</div>
      <div className="subtitle">{subTitle}</div>
      <div className="buttonDiv">
        <div className="grayButton" onClick={onClickCancel}>
          <div className="grayButtonText">취소</div>
        </div>
        <div className="yellowButton" onClick={onClickConfirm}>
          <div className="yellowButtonText">확인</div>
        </div>
      </div>
    </>
  );
}
export default ConfirmDialog;

export const ConfirmWrapPopup = styled.div`
    display : ${props => props.openStatus ? 'block' : 'none'};
    z-index:10000;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    background-color:rgba(110,110,110,0.35);
`;

export const ConfirmPopup = styled.div`

  position:absolute;

  top:50%;
  left:50%;

  transform:translate(-50%,-50%);

  border-radius: 0.4375rem;
  box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.05);
  background-color: #ffffff;

  padding:0 1.125rem 1.125rem 1.125rem;

  text-align:center;
  opacity : ${props => props.openStatus ? '1' : '0'};

  .title {
    font-size: 1.0625rem;
    line-height: 1.4375rem;
    font-family: 'Spoqa Han Sans';
    font-weight: 600;
  }
  .subtitle {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 0.75rem;
    color: rgba(49,49,49,0.4);
    margin: 0.6875rem 0.9375rem 0.9375rem 0.9375rem;

    white-space: pre-line;
  }
  .buttonDiv {
    font-family: 'Spoqa Han Sans';
    font-weight: 600;
    display: flex;
  }
  .grayButton {
    position: relative;
    width: 7.6875rem;
    height: 2.4375rem;
    background-color: #e3e3e3;
    border-radius: 0.375rem;
    margin-right: 0.625rem;
  }
  .grayButtonText {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 0.875rem;
    color: #ffffff;
  }
  .yellowButton {
    position: relative;
    width: 7.6875rem;
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
    color: #ffffff;
  }
`;

