import React, { useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch } from "react-redux";
import icon_back from "../../../assets/icon-back-arrow.svg";
import MainCard from '../../../components/main/analysis/mainCard';

import { TextMiddle } from '../../../styled/shared';
import { useHistory } from 'react-router-dom';
import { BottomNavCloseAction } from '../../../reducers/container/bottomNav';


const AnalysisPage = () => {

    const dispatch = useDispatch();
    const histroy = useHistory();


    const closeAnalyPage = useCallback(() => {
        histroy.goBack();
    }, []);

    useEffect(() => {
        dispatch(BottomNavCloseAction);

        const userPlatform = localStorage.getItem('userPlatform');

        if (userPlatform == 'ios') {
            //IOS 배경색 설정
            try {
                window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
            }
            catch (err) {
            }
        }
    }, []);

    return (

        <div className="page">

            <PageWrap>
                <HeaderWrap id="back_link" className="spoqaBold" onClick={closeAnalyPage}>
                    <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>소비분석</TextMiddle>
                </HeaderWrap>
                <MainCard />
            </PageWrap>

        </div>
    )
};

const PageWrap = styled.div`

`;
const HeaderWrap = styled.div`
    position: relative;
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

export default AnalysisPage;