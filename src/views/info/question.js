import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AlertPageWrapCloseAction, AlertPageCloseAction } from "../../reducers/main/alert";

import icon_back from "../../assets/icon-back-arrow.svg";
import icon_profile from "../../assets/duck-profile.svg";
import icon_info from "../../assets/info-black-192-x-192@3x.png";
import icon_arrow_down from "../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../assets/icon-arrow-up-gray.svg";

import { TextMiddle, LoginButton } from '../../styled/shared';
import { TitleWrap, ItemWrap, InputWrap, Input } from '../../styled/main/enrollment';


const QuestionPage = () => {

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

                <TextMiddle>문의하기</TextMiddle>
            </HeaderWrap>
            <div style={{ flexGrow: '1', padding: '1.25rem' }}>

                <div style={{ borderBottom: '0.0437rem solid rgba(0,0,0,0.06)', paddingBottom: '0.875rem' }}>
                    자주 묻는 질문
                </div>
                <ContentWrap>
                    <div style={{ display: 'flex', fontSize: '0.8125rem', height: '0.8125rem' }}>
                        <div style={{ marginRight: '0.5625rem' }}>01</div>
                        <div>휴대폰 번호 변경 시 어떻게 해야하나요?</div>
                        <ContentMoreIcon src={icon_arrow_up} />
                    </div>
                </ContentWrap>
                <ContentDetailWrap>
                    휴대폰 번호가 변경되었을 시, 마이페이지에서 전화번호 변경 기능을 사용하여 데이터 이전이 가능합니다.
                    <br /><br />
                    그러나 휴대폰 번호와 핸드폰 전부 변경되어서 불가능한 경우,  아래 내용을 1:1 문의로 남겨주시면 데이터를 이전해드립니다.
                    <br /><br />
                    1. 기존 전화번호 <br />
                    2. 모두에서 제공한 고유번호 4자리 <br />
                </ContentDetailWrap>

                <ContentWrap>
                    <div style={{ display: 'flex', fontSize: '0.8125rem', height: '0.8125rem' }}>
                        <div style={{ marginRight: '0.5625rem' }}>02</div>
                        <div>구독 서비스 결제일이 말일인 경우 어떻게 되나요?</div>
                        <ContentMoreIcon src={icon_arrow_down} />
                    </div>
                </ContentWrap>

            </div>

            <QuestionButtonWrap pageConfirmStatus={false}>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    1:1 문의하기
                </div>
            </QuestionButtonWrap>
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

const QuestionButtonWrap = styled.div`
    display:flex;
    margin:1.25rem;

    background-color:#ffca17;
    border-radius:0.375rem;

    padding:0.875rem 0 0.8125rem 0;

    font-size:0.8125rem;
    color:#ffffff;
`;

const ContentWrap = styled.div`
    position: relative;
    padding:0.8125rem 0 0.8125rem 0;

    border-bottom:0.0437rem solid rgba(0,0,0,0.06);
`;
const ContentDetailWrap = styled.div`
    padding:0.875rem 0.9375rem 1.1875rem 0.9375rem;

    font-size:0.8125rem;
    color:rgba(49,49,49,0.65);

    word-break:keep-all;
    line-height:1.3125rem;

    background-color:#f7f7f7;
`;
const ContentMoreIcon = styled.img`
    width:0.6875rem;
    height:0.5rem;

    position:absolute;
    top:50%;
    right:0;

    transform:translate(0,-50%);
`;

export default QuestionPage;