import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { HostBottomDialogCloseAction } from "../../../reducers/party/popup";
import { DialogDiv, DialogWrap } from "../../../styled/shared/wrap";

const HostBottomDialog = () => {

  const dispatch = useDispatch();
  const { hostBottomDialogStatus } = useSelector(state => state.party.popup);

  const closeDialog = () => {
    dispatch(HostBottomDialogCloseAction);
  };

  return(
    <DialogWrap openStatus={hostBottomDialogStatus}>
      <DialogDiv>
        {/* 삭제하기 or 삭제 취소하기 */}
        <div className="btn_style one_btn margin_bottom">삭제하기</div>
        <div onClick={closeDialog} className="btn_style one_btn">취소</div>
      </DialogDiv>
    </DialogWrap>
  );
}

export default HostBottomDialog;