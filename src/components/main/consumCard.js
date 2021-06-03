import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AnalyPageWrapOpenAction, AnalyPageOpenAction } from "../../reducers/main/analysis";


import icon_arrow from "../../assets/icon-arrow.svg";

import icon_chain_front_left from "../../assets/group-5.svg";
import icon_chain_front_right from "../../assets/group-6.svg";
import icon_chain_back_left from "../../assets/stroke-1-copy-6.svg";
import icon_chain_back_right from "../../assets/stroke-1-copy-5.svg";

import category_ott from "../../assets/category-ott.svg";
import category_music from "../../assets/category-music.svg";
import category_tool from "../../assets/category-tool.svg";
import category_game from "../../assets/category-game.svg";
import category_shopping from "../../assets/category-shopping.svg";
import category_book from "../../assets/category-book.svg";
import category_lifestyle from "../../assets/category-lifestyle.svg";
import category_etc from "../../assets/category-etc.svg";

import icon_triangle_up from "../../assets/triangle.svg";
import { TextMiddle } from '../../styled/shared';
import { priceToString } from './bottomCard';
import { useHistory } from 'react-router-dom';

export const getCategoryImg = categoryIdx => {
    switch (categoryIdx) {
        case 1: return category_ott
        case 2: return category_music
        case 3: return category_book
        case 4: return category_tool
        case 5: return category_game
        case 6: return category_shopping
        case 7: return category_lifestyle
        default: return category_etc
    }
}

const ConsumContent = ({ data }) => {

    return (
        <>
            <ConsumContentWrap>
                <div>
                    <img src={getCategoryImg(data.idx)} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} />
                </div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.8125rem", color: "#313131", marginTop: '0.125rem' }}>{data.name}</div>
                    <div className="notoMedium" style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem", color: "#313131", opacity: "0.4" }}>{data.platform.length}개 이용중</div>
                </div>
                <div>{priceToString(data.totalPrice)}원</div>
            </ConsumContentWrap>
        </>
    )
};

const ConsumCard = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const openAnalyPage = useCallback(() => {
        history.push('/analysis');
    }, []);

    const {
        currentPrice,
        pastPrice,
        analysisCategorySub
    } = useSelector(state => state.main.analysis);

    return (
        <>
            <ConsumCardWrap>
                <TitleWrap className="spoqaBold">
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
                    <ConsumListWrap className="spoqaBold">
                        {
                            analysisCategorySub.length != 0 ?
                                <div style={{ paddingBottom: "0.875rem" }}>
                                    {
                                        analysisCategorySub.map((data, index) => {
                                            return (<ConsumContent data={data} key={index}></ConsumContent>)
                                        })
                                    }
                                </div>
                                :
                                <TextMiddle style={{ textAlign: "center", opacity: "0.25", fontSize: '0.8125rem' }}>등록된 구독내역이 없습니다</TextMiddle>
                        }
                    </ConsumListWrap>
                    <img src={icon_chain_front_left} style={{ position: "absolute", bottom: "3.4rem", left: "1.25rem", zIndex: "15" }} />
                    <img src={icon_chain_back_left} style={{ position: "absolute", bottom: "3.4rem", left: "1.5625rem", zIndex: "5" }} />
                    <img src={icon_chain_back_right} style={{ position: "absolute", bottom: "3.4rem", right: "1.5625rem", zIndex: "5" }} />
                    <img src={icon_chain_front_right} style={{ position: "absolute", bottom: "3.4rem", right: "1.25rem", zIndex: "15" }} />
                    <ConsumCompareWrap className="spoqaBold">

                        <div style={{ flexGrow: "1", display: "flex", margin: "0 0.8125rem 0 0.8125rem" }}>
                            <div style={{ position: "relative", width: "6.25rem", fontSize: "0.8125rem" }}>
                                <TextMiddle>
                                    저번달 대비
                                </TextMiddle>
                            </div>
                            <div style={{ flexGrow: "1", flexBasis: "0" }}></div>
                            <div style={{ position: "relative", width: "1.25rem" }}>
                                <div style={{ position: 'absolute', top: '50%', transform: 'translate(0,-50%)' }}>
                                    {
                                        currentPrice - pastPrice == 0 ?
                                            <MinIcon /> :
                                            <GapIcon src={icon_triangle_up} gap={currentPrice - pastPrice > 0} />
                                    }
                                </div>
                            </div>
                            <div style={{ display: 'flex', fontSize: "1.25rem", flexDirection: 'column' }}>
                                <div style={{ flexGrow: '1.4' }}></div>
                                <div>
                                    {priceToString(Math.abs(currentPrice - pastPrice))}원
                                </div>
                                <div style={{ flexGrow: '1' }}></div>
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
    padding:0.625rem 1.25rem 1.25rem 1.25rem;

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

const GapIcon = styled.img`
    -ms-transform:${props => props.gap ? 'rotate(0deg)' : 'rotate(180deg);'}; /* IE 9 */
    -webkit-transform: ${props => props.gap ? 'rotate(0deg)' : 'rotate(180deg);'}; /* Chrome, Safari, Opera */
    transform: ${props => props.gap ? 'rotate(0deg)' : 'rotate(180deg);'};
`;
const MinIcon = styled.div`
    width: 0.5625rem;
    height:4px;
    opacity: 0.62;
    background-color:#ffca17; 
`;

export default ConsumCard;