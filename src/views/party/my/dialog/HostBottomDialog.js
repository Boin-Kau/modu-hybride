import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { HostBottomDialogCloseAction, HostConfirmDialogOpenAction } from "../../../../reducers/party/popup";
import { BottomDialogDiv, BottomDialogWrap } from "../../../../styled/shared/wrap";

const HostBottomDialog = ({roomStatus}) => {
  
  const dispatch = useDispatch();
  const { hostBottomDialogStatus } = useSelector(state => state.party.popup);

  const openConfirmDialog = () => {
    dispatch(HostBottomDialogCloseAction);
    dispatch(HostConfirmDialogOpenAction);
  };

  const closeDialog = () => {
    dispatch(HostBottomDialogCloseAction);
  };

  return(
    <BottomDialogWrap openStatus={hostBottomDialogStatus}>
      <BottomDialogDiv>
        {/* 삭제하기 or 삭제 취소하기 */}
        <div onClick={openConfirmDialog} className="btn_style one_btn margin_bottom">{roomStatus === 'RESERVED'?'삭제 취소하기':'삭제하기'}</div>
        <div onClick={closeDialog} className="btn_style one_btn">취소</div>
      </BottomDialogDiv>
    </BottomDialogWrap>
  );
}

export default HostBottomDialog;