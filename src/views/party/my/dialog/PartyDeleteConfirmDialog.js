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


    setDeleteTitleMsg(`파티를 ${isHostUser === 'Y' ? '삭제' : '해지'}하시겠어요?`);

    if (isHostUser === 'Y') {
      if (currentUserCount === 1) {
        setDeleteSubtitleMsg("파티를 삭제하면 파티원을\n다시 모집할 수 없게 되어요.");
      } else {
        setDeleteSubtitleMsg(`지금 파티를 삭제하면\n다음 결제주기인 ${(paymentCycleDate || "").replace(/-/gi, ".")}에 종료되고,\n인원을 추가적으로 모집할 수 없게 되어요.`);
      }
    }
    else {
      setDeleteSubtitleMsg(`지금 파티를 해지하면\n다음 결제주기인 ${(paymentCycleDate || "").replace(/-/gi, ".")}에 종료 되어요.`);
    }

    setCancelTitleMsg(`${isHostUser === 'Y' ? '삭제' : '해지'}를 취소하시겠어요?`);
    setCancelSubtitleMsg(`결제일 전이라면\n언제든 취소할 수 있어요.`);

  }, [roomStatus, userStatus, isHostUser, currentUserCount, clickDelete, clickCancel, paymentCycleDate])


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