import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import Fade from 'react-reveal/Fade';

import icon_arrow from "../../assets/icon-arrow.svg";

import icon_chain_front_left from "../../assets/group-5.svg";
import icon_chain_front_right from "../../assets/group-6.svg";
import icon_chain_back_left from "../../assets/stroke-1-copy-6.svg";
import icon_chain_back_right from "../../assets/stroke-1-copy-5.svg";

import icon_triangle_up from "../../assets/triangle.svg";


const ConsumCard = ({ stateManager }) => {

    const { analysisPageOpen } = stateManager;

    return (
        <>
            <ConsumCardWrap>
                <TitleWrap>
                    <div>소비분석</div>
                    <div style={{ flexGrow: "1" }}></div>
                    <div onClick={analysisPageOpen}>
                        전체보기
                <img src={icon_arrow} style={{ marginLeft: "0.3125rem" }} />
                    </div>
                </TitleWrap>

                <ContentWrap>
                    <ConsumListWrap>
                        <TextMiddle style={{ textAlign: "center", color: "rgba(49, 49, 49,0.25)" }}>등록된 구독내역이 없습니다</TextMiddle>
                    </ConsumListWrap>
                    <img src={icon_chain_front_left} style={{ position: "absolute", top: "3.5rem", left: "1.25rem", zIndex: "15" }} />
                    <img src={icon_chain_back_left} style={{ position: "absolute", top: "3.5rem", left: "1.5625rem", zIndex: "5" }} />
                    <img src={icon_chain_back_right} style={{ position: "absolute", top: "3.5rem", right: "1.5625rem", zIndex: "5" }} />
                    <img src={icon_chain_front_right} style={{ position: "absolute", top: "3.5rem", right: "1.25rem", zIndex: "15" }} />
                    <ConsumCompareWrap>

                        <div style={{ flexGrow: "1", display: "flex", margin: "0 0.8125rem 0 0.8125rem" }}>
                            <div style={{ position: "relative", width: "3.9375rem", fontSize: "0.8125rem" }}>
                                <TextMiddle>
                                    저번달 대비
                                </TextMiddle>
                            </div>
                            <div style={{ flexGrow: "1", flexBasis: "0" }}></div>
                            <div style={{ position: "relative", width: "1.25rem" }}>
                                <TextMiddle>
                                    <img src={icon_triangle_up} />
                                </TextMiddle>
                            </div>
                            <div style={{ position: "relative", width: "4.5rem", fontSize: "1.25rem" }}>
                                <TextMiddle>
                                    5,000원
                                </TextMiddle>
                            </div>
                        </div>

                    </ConsumCompareWrap>
                </ContentWrap>

            </ConsumCardWrap>
        </>
    )
};

const ConsumCardWrap = styled.div`
    /* border:1px solid red; */
    padding: 1.25rem;

`;

const TitleWrap = styled.div`
    display:flex;
    height:1.5625rem;

    margin-bottom:0.625rem;
`;
const ContentWrap = styled.div`
    position: relative;
`;
const ConsumListWrap = styled.div`
    z-index:10;

    position:relative;
    min-height:3.9375rem;

    background-color:#ffffff;
    border-radius:0.4375rem;

    box-shadow: 0 0 0.25rem 0.0625rem #eeb102;
`;
const ConsumCompareWrap = styled.div`
    z-index:10;

    display:flex;

    position:relative;
    height:3.9375rem;

    margin-top:0.75rem;


    background-color:#ffffff;
    border-radius:0.4375rem;

    box-shadow: 0 0 0.25rem 0.0625rem #eeb102;

`;

const TextMiddle = styled.div`
    position:absolute;
    top:55%;
    transform:translate(0,-55%);

    width:100%;

`;

export default ConsumCard;