import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PageTransContext } from "../../../../containers/pageTransContext";
import { HostBottomDialogCloseAction, PartyDeleteConfirmDialogOpenAction } from "../../../../reducers/party/popup";
import { BottomDialogDiv, BottomDialogWrap } from "../../../../styled/shared/wrap";

const HostBottomDialog = ({roomStatus, partyIdx}) => {
  
  const dispatch = useDispatch();
  const { hostBottomDialogStatus } = useSelector(state => state.party.popup);
  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  const openPartyRevisePage = () => {
    if(partyIdx === 0) return;

    setPageTrans('trans toRight');
        
    history.push(`/party/my/revise/${partyIdx}`);
  }

  const openDeleteConfirmDialog = () => {
    dispatch(HostBottomDialogCloseAction);
    dispatch(PartyDeleteConfirmDialogOpenAction);
  };

  const closeDialog = () => {
    dispatch(HostBottomDialogCloseAction);
  };

  return(
    <BottomDialogWrap openStatus={hostBottomDialogStatus}>
      <BottomDialogDiv>
        {/* 삭제하기 or 삭제 취소하기 */}
        <div className="btn_style margin_bottom">
          <div onClick={openPartyRevisePage} className="one_btn gray_border_bottom">파티 정보 수정</div>
          <div onClick={openDeleteConfirmDialog} className="one_btn">{roomStatus === 'RESERVED'?'삭제 취소하기':'삭제하기'}</div>
        </div>
        <div onClick={closeDialog} className="btn_style one_btn">취소</div>
      </BottomDialogDiv>
    </BottomDialogWrap>
  );
}

export default HostBottomDialog;