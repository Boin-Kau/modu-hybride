import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AnalyPageWrapOpenAction, AnalyPageOpenAction } from "../../reducers/main";


import icon_arrow from "../../assets/icon-arrow.svg";

import icon_chain_front_left from "../../assets/group-5.svg";
import icon_chain_front_right from "../../assets/group-6.svg";
import icon_chain_back_left from "../../assets/stroke-1-copy-6.svg";
import icon_chain_back_right from "../../assets/stroke-1-copy-5.svg";

import icon_triangle_up from "../../assets/triangle.svg";



const ConsumContent = ({ data }) => {

    return (
        <>
            <ConsumContentWrap>
                <div>
                    <img src={data.logoImg} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} />
                </div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.8125rem", color: "#313131" }}>{data.title}</div>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem", color: "#313131", opacity: "0.4" }}>{data.count}개 이용중</div>
                </div>
                <div>{data.price}</div>
            </ConsumContentWrap>
        </>
    )
};

const ConsumCard = () => {

    const dispatch = useDispatch();

    const openAnalyPage = useCallback(() => {
        dispatch(AnalyPageWrapOpenAction);
        dispatch(AnalyPageOpenAction);
    }, []);


    const testArray = [
        {
            id: 1,
            logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
            title: "OTT",
            count: 3,
            price: "28,000원"
        },
        {
            id: 2,
            logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
            title: "음악",
            count: 1,
            price: "15,000원"
        },
        {
            id: 3,
            logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
            title: "프로그램",
            count: 2,
            price: "18,000원"
        }
    ];

    return (
        <>
            <ConsumCardWrap>
                <TitleWrap>
                    <div style={{ position: "relative", width: "6.25rem", fontSize: "0.875rem" }}>
                        <TextMiddle>소비분석</TextMiddle>
                    </div>
                    <div style={{ flexGrow: "1" }}></div>
                    <div onClick={openAnalyPage} style={{ position: "relative", width: "6.25rem", fontSize: "0.6875rem", opacity: "0.4" }}>
                        <TextMiddle style={{ textAlign: "right" }}>
                            전체보기
                        <img src={icon_arrow} style={{ marginLeft: "0.3125rem" }} />
                        </TextMiddle>
                    </div>
                </TitleWrap>

                <ContentWrap>
                    <ConsumListWrap>
                        {
                            testArray.length != 0 ?
                                <div style={{ paddingBottom: "0.875rem" }}>
                                    {
                                        testArray.map((list, index) => {
                                            return (<ConsumContent data={list} key={index}></ConsumContent>)
                                        })
                                    }
                                </div>
                                :
                                <TextMiddle style={{ textAlign: "center", opacity: "0.25" }}>등록된 구독내역이 없습니다</TextMiddle>
                        }
                    </ConsumListWrap>
                    <img src={icon_chain_front_left} style={{ position: "absolute", bottom: "3.4rem", left: "1.25rem", zIndex: "15" }} />
                    <img src={icon_chain_back_left} style={{ position: "absolute", bottom: "3.4rem", left: "1.5625rem", zIndex: "5" }} />
                    <img src={icon_chain_back_right} style={{ position: "absolute", bottom: "3.4rem", right: "1.5625rem", zIndex: "5" }} />
                    <img src={icon_chain_front_right} style={{ position: "absolute", bottom: "3.4rem", right: "1.25rem", zIndex: "15" }} />
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

const ConsumContentWrap = styled.div`

    display:flex;

    padding:0.875rem 0.75rem 0.5rem 0.75rem;

    font-size:0.8125rem;
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