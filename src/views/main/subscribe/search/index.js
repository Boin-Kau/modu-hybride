import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import icon_search_none from "../../../../assets/icon-search-none.svg";
import icon_back from "../../../../assets/icon-back-arrow.svg";

import { TextMiddle } from '../../../../styled/shared';
import { SearchPageCloseAction, SearchPageWrapCloseAction } from '../../../../reducers/main/search';


const SearchPage = () => {

    const dispatch = useDispatch();

    //store
    const {
        popularPlatformList,
        searchPlatformList
    } = useSelector(state => state.main.platform);

    const closeSearchPage = () => {
        console.log("hihi")

        dispatch(SearchPageCloseAction);

        setTimeout(() => {
            dispatch(SearchPageWrapCloseAction);
        }, 300)
    };

    return (
        <PageWrap>
            <HeaderWrap>
                <div onClick={closeSearchPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>

                <SearchInputWrap>
                    <SearchIconWrap>
                        <SearchIcon src={icon_search_none} />
                    </SearchIconWrap>

                    <SearchInput placeholder="찾는 구독 서비스 검색"></SearchInput>

                </SearchInputWrap>
            </HeaderWrap>
            <PopularSearchWrap>

                <div style={{ margin: "1.1875rem 0 0.5188rem 0" }}>인기 구독 서비스</div>

                {
                    popularPlatformList.map((list, index) => {
                        console.log(index)
                        if (index < 3) {
                            return (<PopularItemComponent props={list} key={list.idx} isPopular={true}></PopularItemComponent>)
                        }
                        else {
                            return (<PopularItemComponent props={list} key={list.idx} isPopular={false}></PopularItemComponent>)
                        }
                    })
                }

            </PopularSearchWrap>

        </PageWrap>
    )

};

const PopularItemComponent = ({ props, isPopular }) => {

    return (
        <PopularItemWrap>
            <PopularItemRank popular={isPopular}>
                {props.rank}
            </PopularItemRank>

            <PopularItemImgWrap>
                <PopularItemImg src={props.platform.imgUrl} />
            </PopularItemImgWrap>

            <div style={{ fontSize: "0.75rem", color: "#313131" }}>
                <div style={{ lineHeight: "1.375rem" }}>{props.platform.name}</div>
                <div style={{ lineHeight: "1.3125rem", opacity: "0.4" }}>{props.platform.category.name}</div>
            </div>
        </PopularItemWrap>
    )
}

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
`;


const SearchInputWrap = styled.div`

    position:absolute;
    display:flex;

    width:17.875rem;
    height: 1.875rem;

    top:50%;
    left:3.375rem;
    
    transform:translate(0,-50%);

    /* padding:4px 0; */

    border-radius: 0.4375rem;
    border:none;

    background-color: #f7f7f7;
`;

const SearchIconWrap = styled.div`
    position:relative;
    width:2.25rem;
`;
const SearchIcon = styled.img`
    position:absolute;

    width:0.75rem;
    height:0.8125rem;

    top:50%;
    left:60%;

    transform:translate(-60%,-50%);
`;

const SearchInput = styled.input`
    flex-grow:1;

    margin-right:0.75rem;
    border:none;

    font-size:12px;
    color:#313131;

    background-color: #f7f7f7;

    :focus {
        outline:none;
    }
    ::placeholder {
        opacity:0.3;
    }
`;

const PopularSearchWrap = styled.div`
    padding: 0 1.25rem;
`;

const PopularItemWrap = styled.div`

    position:relative;
    display:flex;

    padding:0.8rem 0 0.6937rem 0;

    border-bottom:0.0625rem solid rgba(0,0,0,0.04);
`;
const PopularItemRank = styled.div`

    margin-right:0.8125rem;

    font-size:0.8125rem;
    line-height:1.375rem;

    color : ${props => props.popular ? '#ffca17' : 'rgba(49, 49, 49,0.3)'};

`;
const PopularItemImgWrap = styled.div`
    margin-right:1.625rem;
`;
const PopularItemImg = styled.img`
    width:2.3125rem;
    height:2.3125rem;

    border-radius:0.4375rem;
`;

export default SearchPage;