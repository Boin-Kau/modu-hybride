import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { HostBottomDialogCloseAction } from "../../reducers/party/popup";

const HostBottomDialog = () => {

  const dispatch = useDispatch();
  const { hostBottomDialogStatus } = useSelector(state => state.party.popup);

  const closeDialog = () => {
    dispatch(HostBottomDialogCloseAction);
  };

  return(
    <DialogWrap openStatus={hostBottomDialogStatus}>
      <DialogDiv>
        <div className="btn_style margin_bottom">삭제하기</div>
        <div onClick={closeDialog} className="btn_style">취소</div>
      </DialogDiv>
    </DialogWrap>
  );
}

export default HostBottomDialog;

const DialogWrap = styled.div`
    display : ${props => props.openStatus ? 'block' : 'none'};
    z-index:10000;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    background-color:rgba(110,110,110,0.35);
`;

const DialogDiv = styled.div`
  position:absolute;
  left: 1.25rem;
  right: 1.25rem;
  bottom: 1.625rem;
  text-align: center;
  font-size: 0.875rem;
  font-family: 'Spoqa Han Sans';
  font-weight: 400;
  color: #000000;

  .btn_style {
    background-color: #fff;
    padding: 0.9375rem 0;
    border-radius: 0.4375rem;
  }
  .margin_bottom {
    margin-bottom: 0.5rem;
  }
`;