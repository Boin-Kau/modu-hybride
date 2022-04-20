import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog, { ConfirmPopup, ConfirmWrapPopup } from "../../../../components/party/ConfirmDialog"
import { PartyDeleteConfirmDialogCloseAction } from "../../../../reducers/party/popup";
import { useEffect, useState } from "react";

const PartyDeleteConfirmDialog = ({ roomStatus, userStatus, isHostUser, currentUserCount, clickDelete, clickCancel, paymentCycleDate }) => {

  const dispatch = useDispatch();
  const { partyDeleteConfirmDialogStatus } = useSelector(state => state.party.popup);

  const [deleteTitleMsg, setDeleteTitleMsg] = useState("");
  const [deleteSubtitleMsg, setDeleteSubtitleMsg] = useState("");

  const [cancelTitleMsg, setCancelTitleMsg] = useState("");
  const [cancelSubtitleMsg, setCancelSubtitleMsg] = useState("");

  useEffect(() => {

    // 파티 삭제 메시지
    setDeleteTitleMsg(`파티를 ${isHostUser === 'Y' ? '삭제' : '해지'}하시겠어요?`);

    if (isHostUser === 'Y') {
      if (currentUserCount === 1) {
        setDeleteSubtitleMsg("파티를 삭제하면 파티원을\n다시 모집할 수 없게됩니다.");
      } else {
        setDeleteSubtitleMsg(`지금 파티를 삭제하면 다음 결제주기인 ${(paymentCycleDate || "").replace(/-/gi, ".")}에 종료됩니다.`);
      }
    }
    else {
      setDeleteSubtitleMsg(`지금 파티를 해지하면 다음 결제주기인 ${(paymentCycleDate || "").replace(/-/gi, ".")}에 종료됩니다.`);
    }

    // 파티 삭제 취소 메시지
    setCancelTitleMsg(`${isHostUser === 'Y' ? '삭제' : '해지'}를 취소하시겠어요?`);
    setCancelSubtitleMsg(`결제일 전이라면\n언제든 취소할 수 있습니다.`);

  }, [roomStatus, userStatus, isHostUser, currentUserCount, clickDelete, clickCancel, paymentCycleDate])

  // 다이얼로그에서 취소 버튼 눌렀을 때 
  const onClickCancel = () => {
    dispatch(PartyDeleteConfirmDialogCloseAction);
  }

  return (
    <ConfirmWrapPopup openStatus={partyDeleteConfirmDialogStatus}>
      <ConfirmPopup openStatus={partyDeleteConfirmDialogStatus}>
        {
          isHostUser === 'Y' ?
            <ConfirmDialog
              title={roomStatus === 'RESERVED' ? cancelTitleMsg : deleteTitleMsg}
              subTitle={roomStatus === 'RESERVED' ? cancelSubtitleMsg : deleteSubtitleMsg}
              onClickConfirm={roomStatus === 'RESERVED' ? clickCancel : clickDelete}
              onClickCancel={onClickCancel}
            /> :
            <ConfirmDialog
              title={userStatus === 'RESERVED' ? cancelTitleMsg : deleteTitleMsg}
              subTitle={userStatus === 'RESERVED' ? cancelSubtitleMsg : deleteSubtitleMsg}
              onClickConfirm={userStatus === 'RESERVED' ? clickCancel : clickDelete}
              onClickCancel={onClickCancel}
            />
        }
      </ConfirmPopup>
    </ConfirmWrapPopup>
  );
}

export default PartyDeleteConfirmDialog;