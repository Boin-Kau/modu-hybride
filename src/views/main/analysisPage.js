import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";

import icon_back from "../../assets/icon-back-arrow.svg";
import duck_img from "../../assets/group-61@3x.png";
import duck_none_img from "../../assets/duck-none.svg";


const AnalysisPage = ({ stateManager }) => {

    const { analysisPageClose } = stateManager;


    return (
        <PageWrap>
            <HeaderWrap onClick={analysisPageClose}>
                <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>

                <TextMiddle>소비분석</TextMiddle>
            </HeaderWrap>
            <MainWrap>

                <MainTopWrap>
                    <div style={{ position: "relative", border: "1px solid #ffca17" }}>
                        <div style={{ fontSize: "0.8125rem" }}>이번달 결제 예정</div>
                        <div style={{ margin: "0.5rem 0 1.25rem 0", fontSize: "1.25rem" }}>58,000원</div>
                        <img style={{ position: "absolute", bottom: "-0.625rem", right: "0", width: "5.625rem", height: "4.5rem" }} src={duck_img}></img>
                    </div>
                    <div style={{ display: "flex", padding: "0.8125rem 0", backgroundColor: "rgba(0,0,0,0.05)", color: "#ffffff", borderRadius: "0.4375rem" }}>
                        <div style={{ flexGrow: "1", textAlign: "center", borderRight: "0.0938rem solid rgba(255,255,255,0.29" }}>
                            <div style={{ marginBottom: "0.5rem", fontSize: "0.75rem" }}>1월 결제 금액</div>
                            <div style={{ fontSize: "1.0625rem" }}>0원</div>
                        </div>
                        <div style={{ flexGrow: "1", textAlign: "center" }}>
                            <div style={{ marginBottom: "0.5rem", fontSize: "0.75rem" }}>2월 결제 금액</div>
                            <div style={{ fontSize: "1.0625rem" }}>0원</div>
                        </div>
                    </div>
                </MainTopWrap>
                <MainContentWrap>
                    <div style={{ marginBottom: "0.625rem", fontSize: "0.8125rem", color: "#313131", opacity: "0.25" }}>이번달 결제 내역 분석</div>
                    <div style={{ fontSize: "1.25rem" }}>0원</div>
                    <div style={{ padding: "2.5625rem 0 3.9375rem 0" }}>
                        <div style={{ textAlign: "left", marginBottom: "1.1875rem" }}>
                            <img style={{ marginLeft: "38.8%" }} src={duck_none_img} />
                        </div>
                        <div style={{ fontSize: "0.75rem", lineHeight: "1.375rem", color: "#313131", opacity: "0.20" }}>
                            등록된 구독 내역이 없습니다.<br />
                            구독 내역을 추가해주세요.
                        </div>
                    </div>
                </MainContentWrap>

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