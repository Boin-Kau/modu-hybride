import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { SubscribePageCloseAction, SubscribePageWrapCloseAction } from "../../../reducers/main";

import icon_back from "../../../assets/icon-back-arrow.svg";

import icon_sub_ect from "../../../assets/icon-sub-ect.svg";
import icon_plus from "../../../assets/icon-plus.svg";


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
            <HeaderWrap>
                <div onClick={closeSubscribePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>
                <TextMiddle>구독 내역 추가</TextMiddle>
                <div style={{ zIndex: "10", position: "absolute", top: "55%", right: "1.3125rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>
            </HeaderWrap>
            <MainWrap>
                <CategoryTapWrap>
                    <CategoryTapItem>전체</CategoryTapItem>
                    <CategoryTapItem style={{ top: "10px", color: "rgba(0,0,0,0.2)" }}>카테고리</CategoryTapItem>
                </CategoryTapWrap>
                <ItemListWrap>
                    <div>
                        {/* 직접입력 */}
                        <ItemWrap style={{ border: "none" }}>
                            <ItemImgWrap>
                                <img src={icon_sub_ect} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem" }} />
                            </ItemImgWrap>
                            <ItemTitleWrap>
                                <TextMiddle>
                                    직접 입력하기
                                </TextMiddle>
                            </ItemTitleWrap>
                            <ItemIconWrap>
                                <ItemIcon src={icon_plus}></ItemIcon>
                            </ItemIconWrap>
                        </ItemWrap>

                        {/* 그외 리스트 */}
                        <ItemWrap>
                            <ItemImgWrap>
                                <img src={"https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg"} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem" }} />
                            </ItemImgWrap>
                            <ItemTitleWrap>
                                <TextMiddle>
                                    <TextMiddle>
                                        멜론
                                </TextMiddle>
                                </TextMiddle>
                            </ItemTitleWrap>
                            <ItemIconWrap>
                                <ItemIconMin />
                            </ItemIconWrap>
                        </ItemWrap>
                    </div>
                    {/* <div>카테고리 나누기</div> */}
                </ItemListWrap>
            </MainWrap>
        </PageWrap>
    )
};

const PageWrap = styled.div`
    /* border:1px solid red; */
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
    /* border:1px solid red; */
    position:absolute;
    top:2.5625rem;
    left:0;
    right:0;
    bottom:0;

    overflow-y:scroll;

    padding:0.875rem 1.25rem 1.25rem 1.25rem;

    background-color:#ffffff;
`;


const CategoryTapWrap = styled.div`
    display:flex;
`;
const CategoryTapItem = styled.div`

    position: relative;
    /* top:10px; */
    border-top-right-radius:0.4375rem;
    border-top-left-radius:0.4375rem;


    padding:0.4375rem 0.8125rem 0.6875rem 0.8125rem;

    margin-right:0.5rem;

    background-color : #f7f7f7;

    font-size:0.875rem;
    color:#313131;
`;

const ItemListWrap = styled.div`
    position: relative;
    z-index:100;
    background-color :  #f7f7f7;

    padding:0 0.6875rem;

    border-radius:0.4375rem;
    border-top-left-radius:0;
`;


const ItemWrap = styled.div`
    padding: 0.75rem 0px;

    display:flex;

    border-top:0.0625rem solid rgba(0,0,0,0.07);
`;
const ItemImgWrap = styled.div`
    width:2.3125rem;
    height:2.3125rem;

    margin-right:1rem;

`;
const ItemTitleWrap = styled.div`
    flex-grow:1;
    position: relative;

    font-size:13px;
    color:#313131;
`;

const ItemIconWrap = styled.div`
    margin-right:0.5625rem;
    position: relative;
    width:0.75rem;

    /* border:1px solid red; */
`;
const ItemIcon = styled.img`
    position: absolute;
    top:50%;
    right:0;

    transform:translate(0,-50%);
`;
const ItemIconMin = styled.div`
    position: absolute;
    top:50%;
    right:0;

    transform:translate(0,-50%);
    width: 0.75rem;
    border-radius:0.4375rem;
    border-bottom: solid 0.125rem #ffca17;
`;

export default SubscribePage;