import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AlertPageWrapCloseAction, AlertPageCloseAction } from "../../reducers/main/alert";

import icon_back from "../../assets/icon-back-arrow.svg";

import { TextMiddle, LoginButton } from '../../styled/shared';
import { PageClose, PageWrapClose } from '../../reducers/info/page';


const SettingPage = () => {

    const dispatch = useDispatch();

    const closePage = useCallback(() => {
        dispatch({
            type: PageClose,
            data: 'setting'
        });

        setTimeout(() => {
            dispatch({
                type: PageWrapClose,
                data: 'setting'
            });
        }, 300)
    }, []);

    return (
        <PageWrap>

            <HeaderWrap onClick={closePage}>
                <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>
                <TextMiddle>설정</TextMiddle>
            </HeaderWrap>

            <div style={{ padding: '0.875rem 1.25rem 0 1.25rem' }}>
                <div style={{ position: 'relative', paddingBottom: '1.875rem', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                    <div style={{ fontSize: '0.8125rem', marginBottom: '0.3125rem' }}>서비스 알림</div>
                    <div style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>구독 결제일 알림, 업데이트 안내 등</div>

                    <div style={{ position: 'absolute', display: 'flex', top: '0', right: '0', width: '2.75rem', padding: '0.125rem', backgroundColor: '#e3e3e3', borderRadius: '0.9688rem' }}>
                        <div style={{ flexGrow: '0' }} />
                        <AlertRadioButton />
                        <div style={{ flexGrow: '1' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: '1.875rem', marginBottom: '0.25rem', fontSize: '0.8125rem' }}>
                    <div style={{ flexGrow: '1' }}>버전 정보</div>
                    <div style={{ color: '#ffbc26' }}>1.0.0</div>
                </div>
                <div style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>최신 버전 사용 중</div>
            </div>

        </PageWrap>
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

const AlertRadioButton = styled.div`
    width: 1.375rem;
    height: 1.4375rem;
    background-color: #ffffff;
    border-radius: 50%;
`;


export default SettingPage;