import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import icon_search_none from "../../../../assets/icon-search-none.svg";
import icon_back from "../../../../assets/icon-back-arrow.svg";

import { TextMiddle } from '../../../../styled/shared';

import icon_check from "../../../../assets/icon-main-check.svg";

import { customApiClient } from '../../../../shared/apiClient';
import { GetPopularPlatformList, GetSearchPlatformList } from '../../../../reducers/main/platform';
import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../../../containers/pageTransContext';
import { BottomNavCloseAction } from '../../../../reducers/container/bottomNav';
import { UpdatePlatformAction } from '../../../../reducers/party/enrollment/platform';

const PartyPlatformSearch = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        popularPlatformList,
        searchPlatformList,
    } = useSelector(state => state.main.platform);

    const {
        selectedPlatformIdx,
        selectedPlatformImgUrl
    } = useSelector(state => state.party.enrollment.platform);

    const { setPageTrans } = useContext(PageTransContext);

    const [searchSatus, setSearchSatus] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [searchPlatform, setSearchPlatform] = useState([]);

    useEffect(async () => {
        dispatch(BottomNavCloseAction);

        if (popularPlatformList.length < 1) {

            const data = await customApiClient('get', '/subscribe/platform?type=POPULAR');

            if (!data) return

            if (data.statusCode != 200) {
                return
            }

            dispatch({
                type: GetPopularPlatformList,
                data: data.result
            })

        }

        if (searchPlatformList.length < 1) {

            const search = await customApiClient('get', '/subscribe/platform?type=ALL');

            if (!search) return

            if (search.statusCode != 200) {
                return
            }

            dispatch({
                type: GetSearchPlatformList,
                data: search.result
            })

        }

    }, []);

    const closeSearchPage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    };


    const onChangeSearch = useCallback((e) => {
        setKeyword(e.target.value);

        const value = e.target.value;

        if (!value) {
            setSearchSatus(false);
            return
        }

        setSearchSatus(true);

        const serachData = searchPlatformList.filter((data, index) => {
            return data.name.includes(value);
        })

        setSearchPlatform(serachData);

    }, [keyword]);

    const onClickCancel = () => {
        setKeyword('');
        setSearchSatus(false);
    };

    const onClickConfrim = () => {

        if (selectedPlatformIdx === null) return

        if (!selectedPlatformImgUrl) {
            setPageTrans('trans toRight');
            history.push('/party/enroll/platform/detail');
        }

        else {
            setPageTrans('trans toLeft');
            history.push('/party/enroll');
        }
    }


    return (

        <div className="page" style={{ backgroundColor: "#ffffff" }}>

            <PageWrap>
                <HeaderWrap className="spoqaBold">
                    <div id="back_link" onClick={closeSearchPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <SearchInputWrap searchSatus={searchSatus}>
                        <SearchIconWrap>
                            <SearchIcon src={icon_search_none} />
                        </SearchIconWrap>

                        <SearchInput className="spoqaBold" placeholder="찾는 구독 서비스 검색" onChange={onChangeSearch} value={keyword}></SearchInput>

                    </SearchInputWrap>

                    <SearchCancelWrap searchSatus={searchSatus} onClick={onClickCancel}>
                        취소
                    </SearchCancelWrap>
                </HeaderWrap>

                <PopularSearchWrap className="spoqaBold" searchSatus={searchSatus}>

                    <div style={{ margin: "1.1875rem 0 0.5188rem 0" }}>실시간 인기 구독 서비스</div>

                    {
                        popularPlatformList.map((list, index) => {
                            if (index < 3) {
                                return (<PopularItemComponent props={list} rank={index + 1} key={list.platformIdx} isPopular={true}></PopularItemComponent>)
                            }
                            else {
                                return (<PopularItemComponent props={list} rank={index + 1} key={list.platformIdx} isPopular={false}></PopularItemComponent>)
                            }
                        })
                    }

                </PopularSearchWrap>

                <SearchResultWrap searchSatus={searchSatus}>


                    {
                        searchPlatform.map((list) => {
                            return (<TotalItemComponent data={list} key={list.idx}></TotalItemComponent>)
                        })

                    }

                </SearchResultWrap>

            </PageWrap>

            <ButtonWrap onClick={onClickConfrim} className="spoqaBold" isSelected={selectedPlatformIdx !== null}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>완료</div>
            </ButtonWrap>
        </div>
    )

};


const TotalItemComponent = ({ data }) => {

    const dispatch = useDispatch();

    const {
        selectedPlatformIdx,
    } = useSelector(state => state.party.enrollment);

    const onClickItem = async () => {
        dispatch(UpdatePlatformAction({
            selectedPlatformIdx: data.idx,
            selectedPlatformName: data.name,
            selectedPlatformCategoryIdx: data.categoryIdx,
            selectedPlatformImgUrl: data.imgUrl,
            selectedPlatformImgColor: null,
            selectedPlatformImgInitial: null,
        }))
    };

    return (
        <ItemWrap onClick={onClickItem} className="notoMedium" isSelected={selectedPlatformIdx == data.idx}>
            <ItemImgWrap>
                {
                    data.imgUrl ?
                        <img src={data.imgUrl} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem" }} /> :
                        <div className="spoqaBold" style={{ position: 'relative', width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", backgroundColor: '#e1e1e1' }}>
                            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-30%)', fontSize: '1.375rem', color: '#ffffff' }}>
                                ?
                            </div>
                        </div>
                }
            </ItemImgWrap>
            <ItemTitleWrap>
                <TextMiddle>
                    <TextMiddle>
                        {data.name}
                    </TextMiddle>
                </TextMiddle>
            </ItemTitleWrap>
            <ItemIconWrap>
                {selectedPlatformIdx == data.idx && <ItemIcon src={icon_check}></ItemIcon>}
            </ItemIconWrap>
        </ItemWrap>
    )
}


const PopularItemComponent = ({ props, rank, isPopular }) => {

    return (
        <PopularItemWrap>
            <PopularItemRank popular={isPopular}>
                {rank}
            </PopularItemRank>

            <PopularItemImgWrap>
                {
                    props.imgUrl ?
                        <PopularItemImg src={props.imgUrl} /> :
                        <div className="spoqaBold" style={{ position: 'relative', width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", backgroundColor: '#e1e1e1' }}>
                            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-30%)', fontSize: '1.375rem', color: '#ffffff' }}>
                                ?
                            </div>
                        </div>
                }
            </PopularItemImgWrap>

            <div style={{ fontSize: "0.75rem", color: "#313131" }}>
                <div>{props.name}</div>
                <div className="notoMedium" style={{ lineHeight: "1.3125rem", opacity: "0.4" }}>{props.categoryName}</div>
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

    height:3.0625rem;

    background-color:#ffffff;
    text-align:center;

    font-size:0.875rem;
    color:#313131;
`;


const SearchInputWrap = styled.div`

    position:absolute;
    display:flex;

    width : ${props => props.searchSatus ? '15.0625rem' : '17.875rem'};

    height: 1.875rem;

    top:50%;
    left:3.375rem;
    
    transform:translate(0,-50%);

    /* padding:4px 0; */

    border-radius: 0.4375rem;
    border:none;
    /* border:1px solid red; */

    background-color: #f7f7f7;
`;

const SearchCancelWrap = styled.div`

    display : ${props => props.searchSatus ? 'block' : 'none'};

    position:absolute;
    top:50%;
    transform:translate(0,-50%);
    right: 1.25rem;

    font-size:0.8125rem;
    color:#313131;
`;

const SearchIconWrap = styled.div`
    position:relative;
    max-width:2.25rem;
    min-width:2.25rem;

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
    width:100%;

    border:none;
    border-radius: 0.4375rem;

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
    display : ${props => props.searchSatus ? 'none' : 'block'};

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



const SearchResultWrap = styled.div`
    display : ${props => props.searchSatus ? 'block' : 'none'};

    padding:0.5rem 1.25rem 5.5625rem 1.25rem;

    position:absolute;
    top:2.5625rem;
    left:0;
    right:0;
    bottom:0;

    overflow-y:scroll;
`;

const ItemWrap = styled.div`
    position:relative;
    padding: 0.75rem 0.6875rem;
    margin-top: 0.75rem ;

    display:flex;

    background-color:${props => props.isSelected ? '#ffefbb' : '#f7f7f7'};

    border-radius:0.4375rem;

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
`;
const ItemIcon = styled.img`
    position: absolute;
    top:50%;
    right:0;

    transform:translate(0,-50%);
`;

const ButtonWrap = styled.div`
    z-index:100;
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    height: 2.9375rem;
    margin: 0 1.25rem 1.375rem 1.25rem;
    background-color: ${props => props.isSelected ? '#ffbc26' : '#e3e3e3'};
    border-radius: 0.375rem;
`;

export default PartyPlatformSearch;