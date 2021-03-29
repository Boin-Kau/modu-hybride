import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AnalyPageWrapCloseAction, AnalyPageCloseAction } from "../../../reducers/main";

import icon_back from "../../../assets/icon-back-arrow.svg";
import MainCard from '../../../components/main/analysis/mainCard';


const AnalysisPage = () => {

    const dispatch = useDispatch();

    const closeAnalyPage = useCallback(() => {
        dispatch(AnalyPageCloseAction);

        setTimeout(() => {
            dispatch(AnalyPageWrapCloseAction);
        }, 300)
    }, []);



    return (
        <PageWrap>
            <HeaderWrap onClick={closeAnalyPage}>
                <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>

                <TextMiddle>소비분석</TextMiddle>
            </HeaderWrap>
            <MainCard />
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

    position:absolute;
    top:2.5625rem;
    left:0;
    right:0;
    bottom:0;

    overflow-y:scroll;

    /* border:1px solid red; */
    padding:1.25rem;
`;

const MainTopWrap = styled.div`

    background-color:#ffca17;
    border-radius:0.4375rem;

    margin-bottom:0.8125rem;

    padding:1.125rem 1.25rem;
`;
const MainContentWrap = styled.div`

    padding:1.375rem 0.875rem 0.875rem 0.875rem;

    background-color:#ffffff;
    border-radius:0.4375rem;

    margin-bottom:0.8125rem;
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;

    text-align:center;
`;

const TextMiddle = styled.div`
    position:absolute;
    top:55%;
    transform:translate(0,-55%);

    width:100%;

`;
export default AnalysisPage;