import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { SubscribePageCloseAction, SubscribePageWrapCloseAction } from "../../../reducers/main";

import icon_back from "../../../assets/icon-back-arrow.svg";

import { TextMiddle } from '../../../styled/shared';


const SubscribePage = () => {

    const dispatch = useDispatch();

    const closeSubscribePage = useCallback(() => {
        console.log("hihi")

        dispatch(SubscribePageCloseAction);

        setTimeout(() => {
            dispatch(SubscribePageWrapCloseAction);
        }, 300)
    }, []);


    return (
        <PageWrap>
            <HeaderWrap onClick={closeSubscribePage}>
                <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>

                <TextMiddle>구독 내역 추가</TextMiddle>
            </HeaderWrap>
            <MainWrap>
                hihi
            </MainWrap>
        </PageWrap>
    )
};

const PageWrap = styled.div`

`;
const HeaderWrap = styled.div`
    position: relative;
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
const MainWrap = styled.div`
    border:1px solid red;
    position:absolute;
    top:2.5625rem;
    left:0;
    right:0;
    bottom:0;

    overflow-y:scroll;

    /* border:1px solid red; */
    padding:1.25rem;
`;

export default SubscribePage;