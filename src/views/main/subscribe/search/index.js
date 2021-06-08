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
import { UpdateSubscribeStatus, GetServerPlatformList, GetCategoryPlatformList, DeletePopupClose, DeletePopupOpen, SearchDeleteFalse, GetPopularPlatformList, GetSearchPlatformList } from '../../../../reducers/main/platform';
import { AnalyPageReloadTrueAction } from '../../../../reducers/main/analysis';
import { useHistory } from 'react-router-dom';


const SearchPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //store
    const {
        popularPlatformList,
        searchPlatformList,

        searchDeleteStatus,

        deletePopupWrap,
        deletePopup,
        deletePlatformName,
        deletePlatformIdx
    } = useSelector(state => state.main.platform);

    //state
    const [searchSatus, setSearchSatus] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [searchPlatform, setSearchPlatform] = useState([]);

    useEffect(async () => {

        //인기 리스트, 전체 플랫폼 조회 -> 리덕스에서 없으면 호출, 있으면 호출 X => 최초 1회만 불러오기
        if (popularPlatformList.length < 1) {

            //인기 구독 플랫폼 리스트 조회
            const data = await customApiClient('get', '/subscribe/platform?type=POPULAR');

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                return
            }

            //리덕스에 넣어주기
            dispatch({
                type: GetPopularPlatformList,
                data: data.result
            })

        }

        if (searchPlatformList.length < 1) {
            //전체 구독 플랫폼 리스트 조회
            const search = await customApiClient('get', '/subscribe/platform?type=ALL');

            //서버에러
            if (!search) return

            //벨리데이션
            if (search.statusCode != 200) {
                return
            }

            //리덕스에 넣어주기
            dispatch({
                type: GetSearchPlatformList,
                data: search.result
            })

        }

    }, []);

    const closeSearchPage = () => {
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


    //삭제 확인 창
    const conFirmDelete = useCallback(async () => {

        const res = await customApiClient('delete', `/subscribe/platform/${deletePlatformIdx}`)

        //서버에러
        if (!res) return

        //벨리데이션
        if (res.statusCode != 200) {
            return
        }

        //삭제완료 팝업창 띄우기
        dispatch({
            type: MessageWrapOpen
        })
        dispatch({
            type: MessageOpen,
            data: '해당 구독 서비스가 삭제되었습니다.'
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
            type: DeletePopupClose
        })

        dispatch({
            type: UpdateSubscribeStatus,
            data: {
                platformIdx: deletePlatformIdx,
                status: 'N'
            }
        })

        //검색어 초기화
        onClickCancel();

        //소비분석 리로드
        dispatch(CategoryReloadTrueAction);
        dispatch(TotalReloadTrueAction);
        dispatch(AnalyPageReloadTrueAction);
        dispatch(SubscribeReloadTrueAction);


    }, [deletePlatformIdx]);

    //삭제 확인 취소 창
    const closeDelete = () => {
        dispatch({
            type: DeletePopupClose
        })
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


            {/* 삭제 알림창 */}
            <DangerWrapPopup openStatus={deletePopupWrap}>
                <DangerPopup className="spoqaBold" openStatus={deletePopup}>
                    <div style={{ position: 'relative', height: '3.125rem' }}>
                        <div style={{ position: 'absolute', top: '-1.875rem', left: '50%', width: '3.8125rem', height: '3.8125rem', backgroundColor: '#fb5e5e', transform: 'translate(-50%,0)', borderRadius: '50%', border: '0.25rem solid #ffffff' }}>
                            <img src={danger_icon} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '0.5625rem', height: '2.0625rem' }} />
                        </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
                        {deletePlatformName}을(를) 리스트에서<br />
                        삭제하시겠어요?
                    </div>
                    <div className="notoMedium" style={{ marginTop: '0.625rem', marginBottom: '1.25rem', fontSize: '0.75rem', color: 'rgba(49,49,49,0.4)' }}>구독 내역을 삭제하면 복구가 불가능합니다.</div>
                    <div style={{ display: 'flex' }}>
                        <div onClick={closeDelete} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#e3e3e3', borderRadius: '0.375rem', marginRight: '0.625rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: 'rgba(0,0,0,0.26)' }}>취소</div>
                        </div>
                        <div onClick={conFirmDelete} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#fb5e5e', borderRadius: '0.375rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: '#ffffff' }}>삭제</div>
                        </div>
                    </div>
                </DangerPopup>
            </DangerWrapPopup>


        </div>
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

            dispatch(CategoryReloadTrueAction);
            dispatch(TotalReloadTrueAction);
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
    /* border:1px solid red; */
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