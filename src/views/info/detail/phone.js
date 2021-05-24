import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AlertPageWrapCloseAction, AlertPageCloseAction } from "../../../reducers/main/alert";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_profile from "../../../assets/duck-profile.svg";
import icon_info from "../../../assets/info-black-192-x-192@3x.png";

import { TextMiddle, LoginButton } from '../../../styled/shared';

import { TitleWrap, ItemWrap, InputWrap, Input } from '../../../styled/main/enrollment';


const PhonePage = () => {

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

                <TextMiddle>전화번호 변경하기</TextMiddle>
            </HeaderWrap>

            <div style={{ padding: '1.25rem' }}>
                <TitleWrap style={{ marginTop: '0' }}>전화번호</TitleWrap>
                <ItemWrap>
                    <InputWrap>
                        <Input placeholder="새 전화번호를 입력해주세요"></Input>
                    </InputWrap>
                    <SubmitButton confirmStatus={false}>
                        <SubmitText>
                            인증받기
                        </SubmitText>
                    </SubmitButton>
                </ItemWrap>
            </div>

            <ConfirmWrap confirmStatus={false}>
                <TitleWrap style={{ marginTop: '0' }}>인증번호</TitleWrap>
                <ItemWrap>
                    <InputWrap>
                        <Input placeholder="인증번호를 입력해주세요"></Input>
                    </InputWrap>
                    <SubmitButton confirmStatus={false}>
                        <SubmitText>
                            확인
                        </SubmitText>
                    </SubmitButton>
                </ItemWrap>
            </ConfirmWrap>

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

const SubmitButton = styled.div`
    position: relative;
    width:6.25rem;

    background-color:${props => props.confirmStatus ? '#ffca17' : '#e3e3e3'};
    border-radius:0.375rem;

    margin-left:0.625rem;

`;
const SubmitText = styled.div`
    position:absolute;

    font-size:0.875rem;
    height:0.875rem;

    top:50%;
    left:50%;
    transform:translate(-50%,-50%);

    color:#ffffff;
`;

const ConfirmWrap = styled.div`
    display:${props => props.confirmStatus ? 'block' : 'none'};
    padding: 0 1.25rem 0 1.25rem;
`;
export default PhonePage;