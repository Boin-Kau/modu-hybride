import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import icon_back from "../../assets/icon-back-arrow.svg";

import { TextMiddle } from '../../styled/shared';
import { PageClose, PageWrapClose } from '../../reducers/info/page';

import { IsAlertUpdate } from '../../reducers/info/user';
import { customApiClient } from '../../shared/apiClient';


const SettingPage = () => {

    const dispatch = useDispatch();

    const {
        isAlert
    } = useSelector(state => state.info.user);

    const closePage = useCallback(() => {

        test = false;


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


    const onClickRadio = useCallback(async () => {

        //서버통신
        const res = await customApiClient('put', `/user/alert`);

        //서버에러
        if (!res) return

        //벨리데이션
        if (res.statusCode != 200) {
            alert('오류가 발생하였습니다. 잠시후 다시 시도해주세요.');
            return
        }

        //store 변경
        if (isAlert == 'Y') {
            dispatch({
                type: IsAlertUpdate,
                data: 'N'
            })
        }
        else {
            dispatch({
                type: IsAlertUpdate,
                data: 'Y'
            })
        }


    }, [isAlert]);

    return (
        <PageWrap>

            <HeaderWrap className="spoqaBold" onClick={closePage}>
                <div className="back_link_sub" style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>
                <TextMiddle>설정</TextMiddle>
            </HeaderWrap>

            <div style={{ padding: '0.875rem 1.25rem 0 1.25rem' }}>
                <div style={{ position: 'relative', paddingBottom: '1.875rem', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                    <div className="spoqaBold" style={{ fontSize: '0.8125rem', marginBottom: '0.3125rem' }}>서비스 알림</div>
                    <div className="notoMedium" style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>구독 결제일 알림, 업데이트 안내 등</div>

                    <AlertRadioButtonWrap onClick={onClickRadio} isAlert={isAlert == 'Y'}>
                        <AlertRadioGrow isAlert={isAlert != 'Y'} />
                        <AlertRadioButton />
                        <AlertRadioGrow isAlert={isAlert == 'Y'} />
                    </AlertRadioButtonWrap>
                </div>
                <div style={{ display: 'flex', marginTop: '1.875rem', marginBottom: '0.25rem', fontSize: '0.8125rem' }}>
                    <div className="spoqaBold" style={{ flexGrow: '1' }}>버전 정보</div>
                    <div className="spoqaBold" style={{ color: '#ffbc26' }}>1.0.0</div>
                </div>
                <div className="notoMedium" style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>최신 버전 사용 중</div>
            </div>

        </PageWrap>
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

const AlertRadioButtonWrap = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    width: 2.75rem;
    padding: 0.125rem;
    background-color:${props => props.isAlert ? '#ffca17' : '#e3e3e3'} ;
    border-radius: 0.9688rem ;
`;
const AlertRadioButton = styled.div`
    width: 1.375rem;
    height: 1.4375rem;
    background-color: #ffffff;
    border-radius: 50%;
`;
const AlertRadioGrow = styled.div`
    transition: all 200ms ease-out;
    flex-grow:${props => props.isAlert ? '0' : '1'} ;
`;

export default SettingPage;