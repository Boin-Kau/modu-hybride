import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AlertPageWrapCloseAction, AlertPageCloseAction } from "../../reducers/main/alert";

import icon_back from "../../assets/icon-back-arrow.svg";

import { TextMiddle } from '../../styled/shared';
import { PageClose, PageWrapClose } from '../../reducers/info/page';


const PhoneChangePage = () => {

    const dispatch = useDispatch();

    const closePage = () => {

        test = false;

        dispatch({
            type: PageClose,
            data: 'loginPhone'
        });

        setTimeout(() => {
            dispatch({
                type: PageWrapClose,
                data: 'loginPhone'
            });
        }, 300)
    };



    return (
        <PageWrap>
            <HeaderWrap className="spoqaBold" onClick={closePage}>
                <div className="back_link_sub" style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>

                <TextMiddle>휴대폰 번호 변경 안내</TextMiddle>
            </HeaderWrap>
            <div style={{ padding: '2.0625rem 1.25rem 0 1.25rem' }}>
                <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem', marginBottom: '0.625rem' }}>
                    <span style={{ marginRight: '0.375rem' }}>01</span>휴대폰 번호를 변경
                </div>
                <div className="notoRegular" style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.65)', wordBreak: 'keep-all', marginBottom: '4.375rem' }}>
                    휴대폰 번호가 변경되었을 시, 마이페이지에서 전화번호 변경 기능을 사용하여 데이터 이전이 가능합니다.
                </div>

                <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem', marginBottom: '0.625rem' }}>
                    <span style={{ marginRight: '0.375rem' }}>02</span>휴대폰 번호와 휴대폰 기기 모두 변경
                </div>
                <div className="notoRegular" style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.65)', wordBreak: 'keep-all' }}>
                    휴대폰 번호와 핸드폰 전부 변경되어서 불가능한 경우,  아래 내용을 1:1 문의로 남겨주시면 데이터를 이전해드립니다.
                    <br /><br />
                    1. 기존 전화번호<br />
                    2. 모두에서 제공한 고유번호 4자리
                </div>
            </div>

            <QuestionButtonWrap pageConfirmStatus={false}>
                <div className="spoqaBold" style={{ width: '100%', textAlign: 'center' }}>
                    1:1 문의하기
                </div>
            </QuestionButtonWrap>

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


const QuestionButtonWrap = styled.div`
    position:absolute;

    left:0;
    right:0;
    bottom: 0;

    display:flex;
    margin:1.25rem;

    background-color:#ffca17;
    border-radius:0.375rem;

    padding:0.875rem 0 0.8125rem 0;

    font-size:0.8125rem;
    color:#ffffff;
`;

export default PhoneChangePage;