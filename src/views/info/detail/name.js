import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AlertPageWrapCloseAction, AlertPageCloseAction } from "../../../reducers/main/alert";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_profile from "../../../assets/duck-profile.svg";
import icon_info from "../../../assets/info-black-192-x-192@3x.png";

import { TextMiddle, LoginButton } from '../../../styled/shared';
import { TitleWrap, ItemWrap, InputWrap, Input } from '../../../styled/main/enrollment';


const NamePage = () => {

    const dispatch = useDispatch();

    const closeAlertPage = useCallback(() => {
        dispatch(AlertPageCloseAction);

        setTimeout(() => {
            dispatch(AlertPageWrapCloseAction);
        }, 300)
    }, []);



    return (
        <PageWrap>
            <HeaderWrap onClick={closeAlertPage}>
                <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>

                <TextMiddle>이름 변경하기</TextMiddle>
            </HeaderWrap>
            <div style={{ padding: '1.25rem' }}>
                <TitleWrap style={{ marginTop: '0' }}>이름</TitleWrap>
                <ItemWrap>
                    <InputWrap>
                        <Input placeholder="구독 서비스명을 입력하세요"></Input>
                    </InputWrap>
                </ItemWrap>
            </div>

            <LoginButton pageConfirmStatus={false}>
                변경
            </LoginButton>
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




export default NamePage;