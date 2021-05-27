import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AlertPageWrapCloseAction, AlertPageCloseAction } from "../../../reducers/main/alert";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_profile from "../../../assets/duck-profile.svg";
import icon_info from "../../../assets/info-black-192-x-192@3x.png";

import danger_icon from "../../../assets/danger-icon.svg";


import { TextMiddle, DangerWrapPopup, DangerPopup } from '../../../styled/shared';
import NamePage from './name';

import Fade from 'react-reveal/Fade';
import PhonePage from './phone';
import { PageClose, PageWrapClose, PageWrapOpen, PageOpen } from '../../../reducers/info/page';
import { BottomNavCloseAction } from '../../../reducers/container/bottomNav';
import { useHistory } from 'react-router-dom';
import { customApiClient } from '../../../shared/apiClient';

const DetailPage = () => {

    //페이지 상태값
    const {
        openNamePageWrapStatus,
        openNamePageStatus,

        openPhonePageWrapStatus,
        openPhonePageStatus,
    } = useSelector(state => state.info.page);

    const {
        name,
        uniqueNumber
    } = useSelector(state => state.info.user);

    const [dangerPopupWrap, setDangerPopupWrap] = useState(false);
    const [dangerPopup, setDangerPopup] = useState(false);

    const [logoutPopupWrap, setLogoutPopupWrap] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();


    const closePage = useCallback(() => {
        dispatch({
            type: PageClose,
            data: 'info'
        });

        setTimeout(() => {
            dispatch({
                type: PageWrapClose,
                data: 'info'
            });
        }, 300)
    }, []);

    //페이지 열기
    const openPage = useCallback(async (data) => {

        dispatch({
            type: PageWrapOpen,
            data: data
        });
        dispatch({
            type: PageOpen,
            data: data
        });

    }, []);

    const onCickLogout = () => {
        setLogoutPopupWrap(true);
        setLogoutPopup(true);
    }

    const onCickLogoutConfirm = () => {
        localStorage.removeItem('x-access-token');
        window.location.href = '/login';
        return
    }

    const onClickDelete = async () => {
        setDangerPopupWrap(true);
        setDangerPopup(true);
    }
    const onClickCancel = () => {
        setDangerPopupWrap(false);
        setDangerPopup(false);
        setLogoutPopupWrap(false);
        setLogoutPopup(false);
    }

    const onClickDeleteConfirm = async () => {

        //서버통신
        const res = await customApiClient('delete', `/user`);

        //서버에러
        if (!res) return

        //벨리데이션
        if (res.statusCode != 200) {
            alert(res.message);
            return
        }

        localStorage.removeItem('x-access-token');
        window.location.href = '/login';

        return
    }

    return (

        <>
            <PageWrap>
                <HeaderWrap onClick={closePage}>
                    <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>내 정보</TextMiddle>
                </HeaderWrap>
                <div style={{ backgroundColor: '#f7f7f7', padding: '2rem 0 1.25rem 0', textAlign: 'center' }}>
                    <div>
                        <img style={{ width: '3.8125rem', height: '3.8125rem' }} src={icon_profile} />
                    </div>
                    <div style={{ margin: '0.5625rem 0 0.25rem 0', fontSize: '0.875rem' }}>{name}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'rgba(49,49,49,0.4)', lineHeight: '1.3125rem' }}>
                        고유번호 #{uniqueNumber}
                        <img src={icon_info} style={{ width: '0.6875rem', height: '0.6875rem', marginLeft: '0.1875rem', position: 'relative', top: '0.0625rem' }} />
                    </div>
                </div>

                <div style={{ padding: '1.875rem 1.25rem 0 1.25rem' }}>

                    <ContentWrap onClick={() => { openPage('name') }}>이름 변경</ContentWrap>
                    <ContentWrap onClick={() => { openPage('phone') }}>전화번호 변경</ContentWrap>

                    <div style={{ height: '0.0437rem', backgroundColor: 'rgba(0,0,0,0.06)', marginBottom: '1.875rem' }}></div>

                    <ContentWrap onClick={onCickLogout}>로그아웃</ContentWrap>
                    <ContentWrap onClick={onClickDelete} style={{ color: '#fb5e5e' }}>탈퇴하기</ContentWrap>
                </div>
            </PageWrap>


            {/* 이름 변경 페이지 */}
            <div style={openNamePageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openNamePageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <NamePage />
                    </div>
                </Fade>
            </div>

            {/* 전화번호 변경 페이지 */}
            <div style={openPhonePageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openPhonePageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <PhonePage />
                    </div>
                </Fade>
            </div>

            {/* 회원탈퇴 알림창 */}
            <DangerWrapPopup openStatus={dangerPopupWrap}>
                <DangerPopup openStatus={dangerPopup}>
                    <div style={{ position: 'relative', height: '3.125rem' }}>
                        <div style={{ position: 'absolute', top: '-1.875rem', left: '50%', width: '3.8125rem', height: '3.8125rem', backgroundColor: '#fb5e5e', transform: 'translate(-50%,0)', borderRadius: '50%', border: '0.25rem solid #ffffff' }}>
                            <img src={danger_icon} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '0.5625rem', height: '2.0625rem' }} />
                        </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
                        정말 탈퇴하시겠어요?
                    </div>
                    <div style={{ marginTop: '0.625rem', marginBottom: '1.625rem', fontSize: '0.75rem', color: 'rgba(49,49,49,0.4)' }}>탈퇴 시, 모두에 기록된 모든 정보가 사라져요.</div>
                    <div style={{ display: 'flex' }}>
                        <div onClick={onClickCancel} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#e3e3e3', borderRadius: '0.375rem', marginRight: '0.625rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', height: '0.875rem', color: 'rgba(0,0,0,0.26)' }}>취소</div>
                        </div>
                        <div onClick={onClickDeleteConfirm} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#fb5e5e', borderRadius: '0.375rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', height: '0.875rem', color: '#ffffff' }}>탈퇴</div>
                        </div>
                    </div>
                </DangerPopup>
            </DangerWrapPopup>

            {/* 로그아웃 알림창 */}
            <DangerWrapPopup openStatus={logoutPopupWrap}>
                <DangerPopup openStatus={logoutPopup}>
                    <div style={{ position: 'relative', height: '1.25rem' }}>
                    </div>
                    <div style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
                        로그아웃 하기
                    </div>
                    <div style={{ marginTop: '0.625rem', marginBottom: '1.625rem', fontSize: '0.75rem', color: 'rgba(49,49,49,0.4)' }}>정말 로그아웃 하시겠어요?</div>
                    <div style={{ display: 'flex' }}>
                        <div onClick={onClickCancel} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#e3e3e3', borderRadius: '0.375rem', marginRight: '0.625rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', height: '0.875rem', color: 'rgba(0,0,0,0.26)' }}>취소</div>
                        </div>
                        <div onClick={onCickLogoutConfirm} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#ffca17', borderRadius: '0.375rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', height: '0.875rem', color: '#ffffff' }}>로그아웃</div>
                        </div>
                    </div>
                </DangerPopup>
            </DangerWrapPopup>
        </>
    )
};

const PageWrap = styled.div`

    position:absolute;
    top:2.5625rem;
    left:0;
    right:0;
    bottom:0;

    display:flex;
    flex-direction:column;

    overflow-y:scroll;

    background-color: #ffffff;
`;
const HeaderWrap = styled.div`
    position: fixed;
    top:0;
    left:0;
    right:0;

    height:2.5625rem;

    background-color:#ffffff;
    text-align:center;

    font-size:0.875rem;
    color:#313131;
    
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;

const ContentWrap = styled.div`
    margin-bottom:1.9375rem;
    font-size:0.8125rem;
`;




export default DetailPage;