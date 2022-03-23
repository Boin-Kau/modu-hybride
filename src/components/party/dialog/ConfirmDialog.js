import { useSelector } from "react-redux";
import { DangerPopup, DangerWrapPopup } from "../../../styled/shared";

const ConfirmDialog = ( {title, subTitle, onClickConfirm}) => {

  const { confirmDialogStatus } = useSelector(state => state.party.popup);
  const onClickCancel = () => {
    // 취소 버튼 클릭
  }

  return (
    <DangerWrapPopup openStatus={confirmDialogStatus}>
      <DangerPopup>
        <div style={{ position: 'relative', height: '1.25rem' }}>
        </div>
        <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
          {title}
        </div>
        <div className="notoMedium" style={{ marginTop: '0.625rem', marginBottom: '1.625rem', fontSize: '0.75rem', color: 'rgba(49,49,49,0.4)' }}>{subTitle}</div>
        <div className="spoqaBold" style={{ display: 'flex' }}>
          <div onClick={onClickCancel} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#e3e3e3', borderRadius: '0.375rem', marginRight: '0.625rem' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: 'rgba(0,0,0,0.26)' }}>취소</div>
          </div>
          <div onClick={onClickConfirm} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#ffca17', borderRadius: '0.375rem' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: '#ffffff' }}>로그아웃</div>
          </div>
        </div>
      </DangerPopup>
    </DangerWrapPopup>

  );
}

export default ConfirmDialog;