import { useDispatch, useSelector } from "react-redux";
import { ReportBottomDialogCloseAction, ReportPopupOpenAction } from "../../../reducers/party/popup";
import { BottomDialogDiv, BottomDialogWrap } from "../../../styled/shared/wrap";

const ReportBottomDialog = ({ partyIdx }) => {

  const dispatch = useDispatch();
  const { reportBottomDialogStatus } = useSelector(state => state.party.popup);

  const openReportDialog = () => {
    
    dispatch(ReportBottomDialogCloseAction);
    dispatch(ReportPopupOpenAction({
      reportPartyIdx: partyIdx
    }))
  };

  const closeDialog = () => {
    dispatch(ReportBottomDialogCloseAction);
  };

  return (
    <BottomDialogWrap openStatus={reportBottomDialogStatus}>
      <BottomDialogDiv>
        
        <div onClick={openReportDialog} className="btn_style one_btn margin_bottom">신고하기</div>
        <div onClick={closeDialog} className="btn_style one_btn">취소</div>
      </BottomDialogDiv>
    </BottomDialogWrap>
  );
}

export default ReportBottomDialog;
