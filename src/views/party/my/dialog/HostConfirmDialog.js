import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog, { ConfirmPopup, ConfirmWrapPopup } from "../../../../components/party/dialog/ConfirmDialog"
import { HostConfirmDialogCloseAction } from "../../../../reducers/party/popup";

const HostConfirmDialog = ({roomStatus, clickDelete, clickCancel}) => {

  const dispatch = useDispatch();
  const { hostConfirmDialogStatus } = useSelector(state => state.party.popup); 
  
  // 파티 삭제 메시지
  const deleteTitleMsg = '파티를 삭제하시겠어요?';
  const deleteSubtitleMsg = '지금 파티를 삭제하면 다음 결제주기인 2022.03.01에 종료됩니다.';

  // 파티 삭제 취소 메시지
  const cancelTitleMsg = '삭제를 취소하시겠어요?';
  const cancelSubtitleMsg = '삭제를 취소하면 다음 결제주기인 2022.03.01에 파티가 다시 시작됩니다.'

  // 다이얼로그에서 취소 버튼 눌렀을 때 
  const onClickCancel = () => {
    dispatch(HostConfirmDialogCloseAction);
  }

  return (
    <ConfirmWrapPopup openStatus={hostConfirmDialogStatus}>
      <ConfirmPopup openStatus={hostConfirmDialogStatus}>
        <ConfirmDialog
          title={roomStatus==='RESERVED'? cancelTitleMsg : deleteTitleMsg}
          subTitle={roomStatus==='RESERVED'? cancelSubtitleMsg : deleteSubtitleMsg}
          onClickConfirm={roomStatus==='RESERVED'? clickCancel : clickDelete}
          onClickCancel={onClickCancel}
          />
      </ConfirmPopup>
    </ConfirmWrapPopup>
      
    
  );
}

export default HostConfirmDialog;