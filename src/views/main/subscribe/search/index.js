import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import icon_search_none from "../../../../assets/icon-search-none.svg";
import icon_back from "../../../../assets/icon-back-arrow.svg";

import danger_icon from "../../../../assets/danger-icon.svg";

import { TextMiddle, DangerWrapPopup, DangerPopup } from '../../../../styled/shared';
import { SearchPageCloseAction, SearchPageWrapCloseAction } from '../../../../reducers/main/search';

import icon_plus from "../../../../assets/icon-plus.svg";
import platform_none from "../../../../assets/platform-none.svg";
import { customApiClient } from '../../../../shared/apiClient';
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from '../../../../reducers/container/message';
import { CategoryReloadTrueAction, TotalReloadTrueAction, TotalReloadFalseAction, CategoryReloadFalseAction, SubscribeReloadTrueAction } from '../../../../reducers/main/subscribe';
import { UpdateSubscribeStatus, GetServerPlatformList, GetCategoryPlatformList, DeletePopupClose, DeletePopupOpen, SearchDeleteFalse } from '../../../../reducers/main/platform';
import { AnalyPageReloadTrueAction } from '../../../../reducers/main/analysis';


const SearchPage = () => {

    const dispatch = useDispatch();

    //store
    const {
        popularPlatformList,
        searchPlatformList,

        searchDeleteStatus
    } = useSelector(state => state.main.platform);

    //state
    const [searchSatus, setSearchSatus] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [searchPlatform, setSearchPlatform] = useState([]);


    useEffect(() => {

        if (searchDeleteStatus) {

            onClickCancel();

            dispatch({
                type: SearchDeleteFalse
            })
        }

    }, [searchDeleteStatus]);

    const closeSearchPage = () => {
        setKeyword('');
        setSearchSatus(false);
        dispatch(SearchPageCloseAction);

        setTimeout(() => {
            dispatch(SearchPageWrapCloseAction);
        }, 300)

        reloadTotalPlatform();
        reloadCategoryPlatform();
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

    const reloadTotalPlatform = async () => {

        //구독 플랫폼 리스트 조회
        const data = await customApiClient('get', '/subscribe/platform?type=REP');

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode != 200) {
            return
        }

        //리덕스에 넣어주기
        dispatch({
            type: GetServerPlatformList,
            data: data.result
        })

        dispatch(TotalReloadFalseAction);
    }

    const reloadCategoryPlatform = async () => {
        //구독 플랫폼 리스트 조회
        const data = await customApiClient('get', '/subscribe/platform?type=CATEGORY');

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode != 200) {
            return
        }

        //리덕스에 넣어주기
        dispatch({
            type: GetCategoryPlatformList,
            data: data.result
        })

        dispatch(CategoryReloadFalseAction);
    }

    return (
        <PageWrap>
            <HeaderWrap className="spoqaBold">
                <div onClick={closeSearchPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
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

            {/* 인기 플랫폼 화면 */}
            <PopularSearchWrap className="spoqaBold" searchSatus={searchSatus}>

                <div style={{ margin: "1.1875rem 0 0.5188rem 0" }}>인기 구독 서비스</div>

                {
                    popularPlatformList.map((list, index) => {
                        if (index < 3) {
                            return (<PopularItemComponent props={list} key={list.idx} isPopular={true}></PopularItemComponent>)
                        }
                        else {
                            return (<PopularItemComponent props={list} key={list.idx} isPopular={false}></PopularItemComponent>)
                        }
                    })
                }

            </PopularSearchWrap>

            {/* 검색 플랫폼 화면 */}
            <SearchResultWrap searchSatus={searchSatus}>


                {
                    searchPlatform.map((list) => {
                        return (<TotalItemComponent data={list} key={list.idx}></TotalItemComponent>)
                    })

                }

            </SearchResultWrap>


        </PageWrap>
    )

};


const TotalItemComponent = ({ data }) => {

    const dispatch = useDispatch();

    const [status, setStatus] = useState(data.isSubscribe);

    //구독 상태값 바뀌면 업데이트 해주기
    useEffect(() => {
        setStatus(data.isSubscribe);
    }, [data]);

    const onClickItem = async () => {

        //등록 로직
        if (status == 'N') {
            const res = await customApiClient('post', `/subscribe/platform/server/${data.idx}`)

            //서버에러
            if (!res) return

            //벨리데이션
            if (res.statusCode != 200) {
                return
            }

            //등록완료 팝업창 띄우기
            dispatch({
                type: MessageWrapOpen
            })
            dispatch({
                type: MessageOpen,
                data: '해당 구독 서비스가 추가되었습니다.'
            })

            setTimeout(() => {
                dispatch({
                    type: MessageClose
                })
            }, 2000);
            setTimeout(() => {
                dispatch({
                    type: MessageWrapClose
                })
            }, 2300);

            dispatch({
                type: UpdateSubscribeStatus,
                data: {
                    platformIdx: data.idx,
                    status: 'Y'
                }
            })

            setStatus('Y');

            dispatch(SubscribeReloadTrueAction);

        }
        //삭제 로직
        else {

            dispatch({
                type: DeletePopupOpen,
                data: {
                    idx: data.idx,
                    name: data.name
                }
            })

        }

    };

    return (
        <ItemWrap className="notoMedium">
            <ItemImgWrap>
                <img src={data.imgUrl ? data.imgUrl : platform_none} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem" }} />
            </ItemImgWrap>
            <ItemTitleWrap>
                <TextMiddle>
                    <TextMiddle>
                        {data.name}
                    </TextMiddle>
                </TextMiddle>
            </ItemTitleWrap>
            <ItemIconWrap onClick={onClickItem}>
                {status == 'N' ?
                    <ItemIcon src={icon_plus}></ItemIcon>
                    :
                    <ItemIconMin />
                }
            </ItemIconWrap>
        </ItemWrap>
    )
}


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
                <div>{props.platform.name}</div>
                <div className="notoMedium" style={{ lineHeight: "1.3125rem", opacity: "0.4" }}>{props.platform.category.name}</div>
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

    padding:0.5rem 1.25rem 1.25rem 1.25rem;

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

    background-color:#f7f7f7;

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
const ItemIconMin = styled.div`
    position: absolute;
    top:50%;
    right:0;

    transform:translate(0,-50%);
    width: 0.75rem;
    border-radius:0.4375rem;
    border-bottom: solid 0.125rem #ffca17;
`;


export default SearchPage;