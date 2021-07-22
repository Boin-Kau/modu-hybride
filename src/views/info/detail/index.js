import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_profile from "../../../assets/duck-profile.svg";
import icon_info from "../../../assets/info-black-192-x-192@3x.png";

import danger_icon from "../../../assets/danger-icon.svg";


import { TextMiddle, DangerWrapPopup, DangerPopup } from '../../../styled/shared';
import NamePage from './name';

import Fade from 'react-reveal/Fade';
import PhonePage from './phone';
import { PageWrapOpen, PageOpen } from '../../../reducers/info/page';
import { BottomNavCloseAction } from '../../../reducers/container/bottomNav';
import { useHistory } from 'react-router-dom';
import { customApiClient } from '../../../shared/apiClient';
import { PageTransContext } from '../../../containers/pageTransContext';
import { checkMobile } from '../../../App';

const DetailPage = () => {

    const histroy = useHistory();

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

    const [uniqueInfoStatus, setUniqueInfoStatus] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    //context
    const { setPageTrans } = useContext(PageTransContext);


    const closePage = useCallback(() => {
        setPageTrans('trans toLeft');
        history.goBack();
    }, []);

    useEffect(() => {
        dispatch(BottomNavCloseAction);
    }, [])

    //페이지 열기
    const openPage = useCallback(async (data) => {

        test = true;

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

    const onCickLogoutConfirm = async () => {

        //fcm 삭제
        const userPlatform = checkMobile();
        let platform = '';

        if (userPlatform == 'android') {
            platform = 'AOS';
        }
        else if (userPlatform == 'ios') {
            platform = 'IOS';
        }
        else {
            platform = 'WEB';
        }

        await customApiClient('patch', '/user/fcm', {
            fcmToken: null,
            platform: platform
        });

        localStorage.removeItem('x-access-token');
        dispatch(BottomNavCloseAction);
        dispatch({
            type: 'RESET'
        });
        histroy.push('/login');
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

        //fcm 삭제
        const userPlatform = checkMobile();
        let platform = '';

        if (userPlatform == 'android') {
            platform = 'AOS';
        }
        else if (userPlatform == 'ios') {
            platform = 'IOS';
        }
        else {
            platform = 'WEB';
        }

        await customApiClient('patch', '/user/fcm', {
            fcmToken: null,
            platform: platform
        });

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
        dispatch(BottomNavCloseAction);
        dispatch({
            type: 'RESET'
        })
        histroy.push('/login');
    }


    const onClickUniqueInfo = useCallback(() => {
        setUniqueInfoStatus(!uniqueInfoStatus);
    }, [uniqueInfoStatus]);
    return (

        <div className="page">

            <PageWrap>
                <HeaderWrap id="back_link" onClick={closePage}>
                    <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle className="spoqaBold">내 정보</TextMiddle>
                </HeaderWrap>
                <div style={{ backgroundColor: '#f7f7f7', padding: '2rem 0 1.25rem 0', textAlign: 'center' }}>
                    <div>
                        <img style={{ width: '3.8125rem', height: '3.8125rem' }} src={icon_profile} />
                    </div>
                    <div className="spoqaBold" style={{ margin: '0.5625rem 0 0.25rem 0', fontSize: '0.875rem' }}>{name}</div>
                    <div className="notoMedium" onClick={onClickUniqueInfo} style={{ position: 'relative', fontSize: '0.6875rem', color: 'rgba(49,49,49,0.4)', lineHeight: '1.3125rem' }}>
                        고유번호 #{uniqueNumber}
                        <img src={icon_info} style={{ width: '0.625rem', height: '0.625rem', marginLeft: '0.1875rem', position: 'relative', top: '0.0625rem' }} />
                        <UniqueInfo className="spoqaBold" openStatus={uniqueInfoStatus}>
                            변경된 전화번호로 인증이 불가능할 때 고유 <br />
                            번호로 인증할 수 있어요. (문의하기 참고)
                        </UniqueInfo>
                    </div>
                </div>

                <div className="spoqaBold" style={{ padding: '1.875rem 1.25rem 0 1.25rem' }}>

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
                    <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
                        정말 탈퇴하시겠어요?
                    </div>
                    <div className="notoMedium" style={{ marginTop: '0.625rem', marginBottom: '1.625rem', fontSize: '0.75rem', color: 'rgba(49,49,49,0.4)' }}>탈퇴 시, 모두에 기록된 모든 정보가 사라져요.</div>
                    <div className="spoqaBold" style={{ display: 'flex' }}>
                        <div onClick={onClickCancel} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#e3e3e3', borderRadius: '0.375rem', marginRight: '0.625rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: 'rgba(0,0,0,0.26)' }}>취소</div>
                        </div>
                        <div onClick={onClickDeleteConfirm} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#fb5e5e', borderRadius: '0.375rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: '#ffffff' }}>탈퇴</div>
                        </div>
                    </div>
                </DangerPopup>
            </DangerWrapPopup>

            {/* 로그아웃 알림창 */}
            <DangerWrapPopup openStatus={logoutPopupWrap}>
                <DangerPopup openStatus={logoutPopup}>
                    <div style={{ position: 'relative', height: '1.25rem' }}>
                    </div>
                    <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
                        로그아웃 하기
                    </div>
                    <div className="notoMedium" style={{ marginTop: '0.625rem', marginBottom: '1.625rem', fontSize: '0.75rem', color: 'rgba(49,49,49,0.4)' }}>정말 로그아웃 하시겠어요?</div>
                    <div className="spoqaBold" style={{ display: 'flex' }}>
                        <div onClick={onClickCancel} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#e3e3e3', borderRadius: '0.375rem', marginRight: '0.625rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: 'rgba(0,0,0,0.26)' }}>취소</div>
                        </div>
                        <div onClick={onCickLogoutConfirm} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#ffca17', borderRadius: '0.375rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: '#ffffff' }}>로그아웃</div>
                        </div>
                    </div>
                </DangerPopup>
            </DangerWrapPopup>
        </div>
    )
};

const PageWrap = styled.div`

    position:absolute;
    top:3.0625rem;
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

    height:3.0625rem;

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


const UniqueInfo = styled.div`

    display: ${props => props.openStatus ? 'block' : 'none'};
    position:absolute;

    top:100%;
    right: 1.875rem;

    margin-top:0.5rem;

    word-break:keep-all;

    background-color:#ffca17;
    /* width:14.875rem; */
    padding: 0.5625rem 0.75rem 0.4375rem 0.75rem;
    border-radius: 0.4375rem;

    font-size:0.75rem;
    line-height:1.25rem;
    color:#ffffff;

    letter-spacing:0rem;

    ::after{
        border-top:0px solid transparent; 
        border-left: 8px solid transparent; 
        border-right: 8px solid transparent; 
        border-bottom: 8px solid #ffca17; 
        content:"";
        position:absolute;
        top:-8px;
        left:50%;
        transform:translate(-50%,0);
    }
`;

export default DetailPage;