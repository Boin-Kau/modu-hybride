import styled from "styled-components";
import { useContext } from "react";
import { PageTransContext } from "../../../containers/pageTransContext";
import { useHistory } from "react-router-dom";


import confirm_duck_img from "../../../assets/character-main-party-confirm@3x.png";

const PartyEnrollFinish = () => {

    const histroy = useHistory();
    const { setPageTrans } = useContext(PageTransContext);

    const onClickConfrim = () => {
        setPageTrans('trans toRight');
        histroy.push('/party');
    }

    return (
        <div className="page" style={{ backgroundColor: "#ffffff" }}>


            <div style={{ position: 'absolute', top: '40%', left: '0', right: '0', transform: 'translate(0,-40%)' }}>
                <div style={{ margin: '0 2.75rem 2.8438rem 2.75rem' }}>
                    <img src={confirm_duck_img} style={{ width: '100%' }} />
                </div>
                <div className="spoqaBold" style={{ marginBottom: '0.75rem', textAlign: 'center', fontSize: '1.375rem', color: '#000000' }}>파티 개설 완료!</div>
                <div className="notoMedium" style={{ textAlign: 'center', fontSize: '0.875rem', lineHeight: '1.3125rem', opacity: '0.4' }}>
                    파티 개설이 완료되었습니다.<br />
                    파티원이 참가하면 알림을 보내드립니다.
                </div>
            </div>

            <ButtonWrap onClick={onClickConfrim} className="spoqaBold">
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>확인</div>
            </ButtonWrap>
        </div>
    )
}

const ButtonWrap = styled.div`
    position: absolute;
    bottom:0;
    left:0;
    right:0;
    height: 2.9375rem;
    margin: 0 1.25rem 1.375rem 1.25rem;
    background-color: #ffbc26;
    border-radius: 0.375rem;
`;

export default PartyEnrollFinish;