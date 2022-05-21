import styled from "styled-components";
import danger_icon from "../../assets/danger-icon.svg";
import { DangerWrapPopup, DangerPopup } from "../../styled/shared";

const DangerDialog = ({
    openStatus,
    title, subTitle,
    leftButtonText, rightButtonText,
    onClickLeft, onClickRight }) => {

    return (

        <DangerWrapPopup openStatus={openStatus} style={{ backgroundColor: "rgba(110,110,110,0.35)" }}>
            <DangerPopup openStatus={openStatus}>
                <div style={{ position: 'relative', height: '3.125rem' }}>
                    <div style={{ position: 'absolute', top: '-1.875rem', left: '50%', width: '3.8125rem', height: '3.8125rem', backgroundColor: '#fb5e5e', transform: 'translate(-50%,0)', borderRadius: '50%', border: '0.25rem solid #ffffff' }}>
                        <img src={danger_icon} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '0.5625rem', height: '2.0625rem' }} />
                    </div>
                </div>
                <div className="spoqaBold" style={{ fontSize: '1.0625rem', lineHeight: '1.3125rem' }}>
                    {title}
                </div>
                <div className="notoMedium" style={{ marginTop: '0.6875rem', marginBottom: '0.9375rem', fontSize: '0.75rem', lineHeight: "1.3125rem", color: 'rgba(49,49,49,0.4)', whiteSpace: "pre-line" }}>{subTitle}</div>
                <div className="spoqaBold" style={{ display: 'flex' }}>
                    <div onClick={onClickLeft} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#e3e3e3', borderRadius: '0.375rem', marginRight: '0.625rem' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: 'rgba(0,0,0,0.26)' }}>{leftButtonText}</div>
                    </div>
                    <div onClick={onClickRight} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#fb5e5e', borderRadius: '0.375rem' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: '#ffffff' }}>{rightButtonText}</div>
                    </div>
                </div>
            </DangerPopup>
        </DangerWrapPopup>
    );
}
export default DangerDialog;