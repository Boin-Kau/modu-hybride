import { useDispatch, useSelector } from "react-redux";
import { ReportBottomDialogCloseAction } from "../../../reducers/party/popup";
import { BottomDialogDiv, BottomDialogWrap } from "../../../styled/shared/wrap";

const ReportBottomDialog = () => {

  const dispatch = useDispatch();
  const { reportBottomDialogStatus } = useSelector(state => state.party.popup);

  const openReportDialog = () => {
    // 신고하기 API
    dispatch(ReportBottomDialogCloseAction);
  };

  const closeDialog = () => {
    dispatch(ReportBottomDialogCloseAction);
  };

  return (
    <BottomDialogWrap openStatus={reportBottomDialogStatus}>
      <BottomDialogDiv>
        {/* 삭제하기 or 삭제 취소하기 */}
        <div onClick={openReportDialog} className="btn_style one_btn margin_bottom">신고하기</div>
        <div onClick={closeDialog} className="btn_style one_btn">취소</div>
      </BottomDialogDiv>
    </BottomDialogWrap>
  );
}

export default ReportBottomDialog;
