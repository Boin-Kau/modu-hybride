import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { SubscribePageCloseAction, SubscribePageWrapCloseAction, TotalReloadFalseAction, CategoryReloadFalseAction, CategoryReloadTrueAction, TotalReloadTrueAction } from "../../../reducers/main/subscribe";


import Fade from 'react-reveal/Fade';


import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_search from "../../../assets/icon-search.svg";

import icon_sub_ect from "../../../assets/icon-sub-ect.svg";
import icon_plus from "../../../assets/icon-plus.svg";


import { TextMiddle } from '../../../styled/shared';
import AnalysisPage from '../analysis';
import SearchPage from './search';
import { SearchPageWrapOpenAction, SearchPageOpenAction } from '../../../reducers/main/search';
import { EnrollmentPageWrapOpenAction, EnrollmentPageOpenAction } from '../../../reducers/main/enrollment';

import EnrollmentPage from './enrollment';
import { GetPopularPlatformList, GetCategoryPlatformList, GetSearchPlatformList, GetServerPlatformList, UpdateSubscribeStatus } from '../../../reducers/main/platform';
import { customApiClient } from '../../../shared/apiClient';
import { MessageOpen, MessageClose, MessageWrapOpen, MessageWrapClose } from '../../../reducers/container/message';


const SubscribePage = () => {

    //import
    const dispatch = useDispatch();

    //store
    const {
        openSearchPageWrapStatus,
        openSearchPageStatus
    } = useSelector(state => state.main.search);

    const {
        openEnrollmentPageWrapStatus,
        openEnrollmentPageStatus
    } = useSelector(state => state.main.enrollment);

    const {
        serverPlatformList,
        categoryPlatformList,
        popularPlatformList,
        searchPlatformList
    } = useSelector(state => state.main.platform);

    const {
        totalReloadStatus,
        categoryReloadStatus
    } = useSelector(state => state.main.subscribe);

    //state
    const [totalMenuStatus, setTotalMenuStatus] = useState(true);
    const [categoryMenuStatus, setcategoryMenuStatus] = useState(false);

    const openSearchPage = useCallback(async () => {
        dispatch(SearchPageWrapOpenAction);
        dispatch(SearchPageOpenAction);

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
    }, [popularPlatformList, searchPlatformList]);

    const openEnrollmentPage = useCallback(() => {
        dispatch(EnrollmentPageWrapOpenAction);
        dispatch(EnrollmentPageOpenAction);
    }, []);

    const closeSubscribePage = useCallback(() => {
        dispatch(SubscribePageCloseAction);
        setTimeout(() => {
            dispatch(SubscribePageWrapCloseAction);
        }, 300)
    }, []);


    const onClickMenu = useCallback(async (type) => {

        //똑같은 탭 누르면 리턴 처리
        if (totalMenuStatus && type == 'total') return
        if (categoryMenuStatus && type == 'category') return

        //전체 조회와 카테고리를 동기화 해줘야함! 구독 값이 바뀌면 각 탭 리스트를 다시한번 조회해줘야함

        if (type == 'total') {
            setTotalMenuStatus(true);
            setcategoryMenuStatus(false);

            if (totalReloadStatus) {
                reloadTotalPlatform();
            }
        }
        else {

            setTotalMenuStatus(false);
            setcategoryMenuStatus(true);

            //최초 클릭시 api 호출
            if (categoryPlatformList.length < 1) {
                reloadCategoryPlatform();
                return
            }

            if (categoryReloadStatus) {
                reloadCategoryPlatform();
                return
            }
        }
    }, [
        categoryPlatformList,
        totalMenuStatus,
        categoryMenuStatus,
        totalReloadStatus,
        categoryReloadStatus
    ]);

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
        <>
            <PageWrap>
                <HeaderWrap>
                    <div onClick={closeSubscribePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>
                    <TextMiddle>구독 내역 추가</TextMiddle>
                    <div onClick={openSearchPage} style={{ zIndex: "10", position: "absolute", top: "55%", right: "1.3125rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_search}></img>
                    </div>
                </HeaderWrap>
                <MainWrap>
                    <CategoryTapWrap>
                        <CategoryTapItem selectedStatus={totalMenuStatus} onClick={() => onClickMenu('total')}>전체</CategoryTapItem>
                        <CategoryTapItem selectedStatus={categoryMenuStatus} onClick={() => onClickMenu('category')}>카테고리</CategoryTapItem>
                    </CategoryTapWrap>
                    <ItemListWrap>

                        {/* 전체 구독 리스트 */}
                        <ItemListView selectedStatus={totalMenuStatus}>

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
                                <ItemIconWrap onClick={openEnrollmentPage}>
                                    <ItemIcon src={icon_plus}></ItemIcon>
                                </ItemIconWrap>
                            </ItemWrap>

                            {/* 그외 리스트 */}
                            {
                                serverPlatformList.map((list) => {
                                    return (<TotalItemComponent data={list} key={list.idx}></TotalItemComponent>)
                                })

                            }



                        </ItemListView>

                        {/* 카테고리 구독 리스트 */}
                        <ItemListView selectedStatus={categoryMenuStatus}>

                            {/* 직접입력 */}
                            <ItemWrap style={{ border: "none", paddingBottom: '0' }}>
                                <ItemImgWrap>
                                    <img src={icon_sub_ect} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem" }} />
                                </ItemImgWrap>
                                <ItemTitleWrap>
                                    <TextMiddle>
                                        직접 입력하기
                                </TextMiddle>
                                </ItemTitleWrap>
                                <ItemIconWrap onClick={openEnrollmentPage}>
                                    <ItemIcon src={icon_plus}></ItemIcon>
                                </ItemIconWrap>
                            </ItemWrap>

                            {/* 그외 리스트 */}
                            {
                                categoryPlatformList.map((list, index) => {

                                    if ((index + 1 == categoryPlatformList.length)) {
                                        return (<CategoryItemComponent props={list} key={list.idx} isLast={true}></CategoryItemComponent>)
                                    }
                                    else {
                                        return (<CategoryItemComponent props={list} key={list.idx}></CategoryItemComponent>)
                                    }
                                })

                            }

                        </ItemListView>

                    </ItemListWrap>
                </MainWrap>
            </PageWrap>

            <div style={openSearchPageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openSearchPageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#ffffff" }}>
                        <SearchPage />
                    </div>
                </Fade>
            </div>

            <div style={openEnrollmentPageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openEnrollmentPageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <EnrollmentPage />
                    </div>
                </Fade>
            </div>
        </>
    )
};

const TotalItemComponent = ({ data, isCategory, isLastItem }) => {

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

        }
        //삭제 로직
        else {

            const res = await customApiClient('delete', `/subscribe/platform/${data.idx}`)

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
                type: UpdateSubscribeStatus,
                data: {
                    platformIdx: data.idx,
                    status: 'N'
                }
            })

            setStatus('N');

        }

        dispatch(CategoryReloadTrueAction);
        dispatch(TotalReloadTrueAction);
    };

    return (
        <ItemWrap isCategory={isCategory} isCategoryLast={isLastItem}>
            <ItemImgWrap>
                <img src={data.imgUrl} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem" }} />
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

const CategoryItemComponent = ({ props, isLast }) => {

    return (
        <div>
            <CategoryTitle>{props.name}</CategoryTitle>
            {
                props.platformServer.map((list, index) => {
                    if ((index + 1 == props.platformServer.length) && isLast) {
                        return (<TotalItemComponent data={list} isCategory={true} isLastItem={true} key={list.idx}></TotalItemComponent>)
                    }
                    else {
                        return (<TotalItemComponent data={list} isCategory={true} key={list.idx}></TotalItemComponent>)
                    }
                })
            }
        </div>
    )

}

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

    border-top-right-radius:0.4375rem;
    border-top-left-radius:0.4375rem;


    padding:0.4375rem 0.8125rem 0.6875rem 0.8125rem;

    margin-right:0.5rem;

    background-color : #f7f7f7;

    font-size:0.875rem;

    /* 애니메이션 적용 */
    transition: top 100ms ease-in-out;

    top : ${props => props.selectedStatus ? '0' : '0.625rem'};
    color : ${props => props.selectedStatus ? '#313131' : 'rgba(0,0,0,0.2)'};

`;

const ItemListWrap = styled.div`
    position: relative;
    z-index:100;
    background-color :  #f7f7f7;

    padding:0 0.6875rem;

    border-radius:0.4375rem;
    border-top-left-radius:0;
`;
const ItemListView = styled.div`
    display:${props => props.selectedStatus ? 'block' : 'none'};

    min-height:12.5rem;
`;


const ItemWrap = styled.div`
    position:relative;
    padding: 0.75rem 0px;

    display:flex;

    border-top : ${props => props.isCategory ? 'none' : '0.0625rem solid rgba(0,0,0,0.07)'};
    border-bottom : ${props => props.isCategory && !props.isCategoryLast ? '0.0625rem solid rgba(0,0,0,0.07)' : 'none'};

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

const CategoryTitle = styled.div`
    margin-top: 1.375rem;
    font-size: 0.875rem;
    line-height: 1.4375rem;
    color: rgba(0,0,0,0.26);
`;

export default SubscribePage;