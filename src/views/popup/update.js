import { useState, useContext, useEffect } from "react";

import ReportDuckImg from "../../assets/character-main-report.svg";
import TeminateDuckImg from "../../assets/character-main-party-ban.svg";

import { DangerWrapPopup, DangerPopup } from "../../styled/shared";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { checkMobile } from "../../App";



const UpdatePopUp = ({ openStatus }) => {

    const [platform, setPlatform] = useState('');

    useEffect(() => {

        const userPlatform = checkMobile();
        setPlatform(userPlatform);

    }, [])

    const onClickClose = () => {
        return
    }

    return (
        <DangerWrapPopup openStatus={openStatus}>

            {/* 파티 탈퇴 컨텐츠 */}
            <DangerPopup openStatus={openStatus} style={{ zIndex: '10', left: '1.125rem', right: '1.125rem', transform: 'translate(0,-50%)' }}>


                <div>
                    <div className="spoqaBold" style={{ marginTop: '0.9375rem', fontSize: "1.25rem", lineHeight: '1.9375rem', textAlign: 'left' }}>버전 업데이트</div>
                    <img src={ReportDuckImg} style={{ height: '10rem', margin: '1.7625rem 0 1.6438rem 0' }} />
                    <div className="notoMedium" style={{ fontSize: '0.875rem', lineHeight: '1.3125rem', color: '#5b5b5b', marginBottom: '1.5rem' }}>
                        점검을 통해 버그와 기능을 업데이트 했습니다. <br />
                        새로운 기능으로 달라진 모두를 확인해보세요!
                    </div>

                    {
                        platform === 'android' ?
                            <a href="https://play.google.com/store/apps/details?id=com.softsquared.Modu" target="blank" style={{ textDecoration: 'none' }}>
                                <ButtonWrap className="spoqaBold" isComplete>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>업데이트 하기</div>
                                </ButtonWrap>
                            </a> :
                            <a href="https://apps.apple.com/us/app/id1573142805" target="blank" style={{ textDecoration: 'none' }}>
                                <ButtonWrap className="spoqaBold" isComplete>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>업데이트 하기</div>
                                </ButtonWrap>
                            </a>
                    }
                </div>
            </DangerPopup>

            {/* 바깥 터치시 종료 로직 */}
            <div onClick={onClickClose} style={{ zIndex: '5', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }} />
        </DangerWrapPopup >
    )
}


const ButtonWrap = styled.div`
    position: relative;
    background-color: ${props => props.isComplete ? '#ffbc26' : '#e3e3e3'};
    border-radius: 0.375rem;
    height: 2.4375rem;
    margin-top: 1rem;
`;

export default UpdatePopUp;