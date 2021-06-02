import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { SubscribePageCloseAction, SubscribePageWrapCloseAction, TotalReloadFalseAction, CategoryReloadFalseAction, CategoryReloadTrueAction, TotalReloadTrueAction, SubscribeReloadTrueAction } from "../../../reducers/main/subscribe";


import Fade from 'react-reveal/Fade';


import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_search from "../../../assets/icon-search.svg";

import icon_sub_ect from "../../../assets/icon-sub-ect.svg";
import icon_plus from "../../../assets/icon-plus.svg";

import icon_cancle from "../../../assets/icon-cancle-white.svg";

import danger_icon from "../../../assets/danger-icon.svg";

import duck_read from "../../../assets/duct-read.svg";
import duck_tech from "../../../assets/duct-tech.svg";
import sub_info from "../../../assets/sub-info@3x.png";


import { TextMiddle, DangerWrapPopup, DangerPopup, DangerPopupTop } from '../../../styled/shared';
import SearchPage from './search';
import { SearchPageWrapOpenAction, SearchPageOpenAction, SearchPageCloseAction, SearchPageWrapCloseAction } from '../../../reducers/main/search';
import { EnrollmentPageWrapOpenAction, EnrollmentPageOpenAction } from '../../../reducers/main/enrollment';

import EnrollmentPage from './enrollment';
import { GetPopularPlatformList, GetCategoryPlatformList, GetSearchPlatformList, GetServerPlatformList, UpdateSubscribeStatus, GetPlatformCategoryList, DeletePopupOpen, DeletePopupClose, SearchDeleteTrue } from '../../../reducers/main/platform';
import { customApiClient } from '../../../shared/apiClient';
import { MessageOpen, MessageClose, MessageWrapOpen, MessageWrapClose } from '../../../reducers/container/message';
import { AnalyPageReloadTrueAction } from '../../../reducers/main/analysis';


import Slider from "react-slick";
import { useHistory } from 'react-router-dom';
import { BottomNavCloseAction } from '../../../reducers/container/bottomNav';


const SubscribePage = () => {

    //import
    const dispatch = useDispatch();
    const history = useHistory();

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
        searchPlatformList,
        platformCategoryList,

        deletePopupWrap,
        deletePopup,
        deletePlatformName,
        deletePlatformIdx
    } = useSelector(state => state.main.platform);

    const {
        totalReloadStatus,
        categoryReloadStatus
    } = useSelector(state => state.main.subscribe);

    //state
    const [totalMenuStatus, setTotalMenuStatus] = useState(true);
    const [categoryMenuStatus, setcategoryMenuStatus] = useState(false);
    const [isFirst, setIsFirst] = useState(false);

    useEffect(() => {
        dispatch(BottomNavCloseAction);

        //초기 코치마크 판별
        const firstStatus = localStorage.getItem('isFirst');

        console.log(firstStatus);
        if (!firstStatus) {

            //시간차 두고 하기
            setTimeout(() => {
                setIsFirst(true);
            }, 300);
        }
        else {
            setIsFirst(false);
        }

    }, []);

    useEffect(async () => {

        //플랫폼 리스트 조회 -> 리덕스에서 없으면 호출, 있으면 호출 X => 최초 1회만 불러오기
        if (serverPlatformList.length < 1) {

            console.log("hihi")
            //구독 플랫폼 리스트 조회
            const data = await customApiClient('get', '/subscribe/platform?type=REP')

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

        }
    }, [serverPlatformList]);



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

    const openEnrollmentPage = () => {

        history.push('/subscribe/enroll');

    };


    const closeSubscribePage = () => {
        history.goBack();
    };


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
        dispatch({
            type: SearchDeleteTrue
        })

        //소비분석 리로드
        dispatch(AnalyPageReloadTrueAction);
        dispatch(SubscribeReloadTrueAction);

        reloadTotalPlatform();
        reloadCategoryPlatform();

    }, [deletePlatformIdx]);

    //삭제 확인 취소 창
    const closeDelete = () => {
        dispatch({
            type: DeletePopupClose
        })
    }

    //안내창 관련
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div
                style={{
                    position: 'absolute',
                    bottom: '3.125rem',
                }}
            >
                <ul style={{ margin: "0px", padding: '0px' }}> {dots} </ul>
            </div>
        ),
    };

    const onClickFirstInfoCancle = () => {
        setIsFirst(false);
        localStorage.setItem('isFirst', 'true');
    }

    return (
        <div className="page">

            <PageWrap>
                <HeaderWrap className="spoqaBold">
                    <div onClick={closeSubscribePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>
                    <TextMiddle>구독 내역 추가</TextMiddle>
                    <div onClick={openSearchPage} style={{ zIndex: "10", position: "absolute", top: "55%", right: "1.3125rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_search}></img>
                    </div>
                </HeaderWrap>
                <MainWrap>
                    <CategoryTapWrap className="spoqaBold">
                        <CategoryTapItem selectedStatus={totalMenuStatus} onClick={() => onClickMenu('total')}>전체</CategoryTapItem>
                        <CategoryTapItem selectedStatus={categoryMenuStatus} onClick={() => onClickMenu('category')}>카테고리</CategoryTapItem>
                    </CategoryTapWrap>
                    <ItemListWrap className="notoMedium">

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
                                serverPlatformList.map((list, index) => {
                                    return (<TotalItemComponent data={list} key={index}></TotalItemComponent>)
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
                                        return (<CategoryItemComponent props={list} key={index} isLast={true}></CategoryItemComponent>)
                                    }
                                    else {
                                        return (<CategoryItemComponent props={list} key={index}></CategoryItemComponent>)
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

            {/* 구독등록 안내창 */}
            <InitialInfoWrapPopup className="notoMedium" openStatus={isFirst}>
                <Slider {...settings} style={{ height: '100vh' }}>
                    <div>
                        <div style={{ position: 'relative', height: '100vh' }}>

                            <div style={{ position: 'absolute', top: '7.75rem', right: '3.0625rem', width: '17.125rem' }}>
                                <div style={{ backgroundColor: '#ffbc26', padding: '0.75rem 0 0.9375rem 1rem', borderRadius: '0.375rem', borderBottomRightRadius: '0', color: '#ffffff', fontSize: '0.8125rem', lineHeight: '1.4375rem' }}>
                                    사용중인 구독 서비스를 선택해<br />
                                    <span className="spoqaBold">구독 리스트에 추가</span>해보세요.
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flexGrow: '1' }} />
                                    <TriFirst />
                                </div>
                                <img src={duck_read} style={{ position: 'absolute', right: '0.875rem', bottom: '0.625rem', width: '3.375rem', height: '3.875rem' }} />

                            </div>
                            <div style={{ position: 'absolute', top: '14.375rem', right: '1.4375rem', padding: '1rem', borderRadius: '50%', backgroundColor: 'white' }}>
                                <img src={icon_plus} style={{ width: '0.75rem', height: '0.75rem' }} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ position: 'relative', height: '100vh' }}>

                            <div style={{ position: 'absolute', top: '3.75rem', right: '1rem', width: '17.4375rem' }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flexGrow: '1' }} />
                                    <TriSec />
                                    <div style={{ width: '0.875rem' }} />
                                </div>
                                <div style={{ backgroundColor: '#ffbc26', padding: '1.0625rem 0 1.125rem 1rem', borderRadius: '0.375rem', color: '#ffffff', fontSize: '0.8125rem', lineHeight: '1.4375rem' }}>
                                    <span className="spoqaBold">검색기능</span>을 사용하면 <span className="spoqaBold">더 많은</span><br />
                                    <span className="spoqaBold">구독 서비스</span>를 찾아볼 수 있어요.
                                </div>
                                <img src={duck_tech} style={{ position: 'absolute', right: '0.875rem', bottom: '0rem', width: '4.125rem', height: '3.9375rem' }} />

                            </div>
                            <div style={{ position: 'absolute', top: '0.125rem', right: '0.3125rem', padding: '1rem', borderRadius: '50%', backgroundColor: 'white' }}>
                                <img src={icon_search} style={{ width: '1rem', height: '1rem' }} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ position: 'relative', height: '100vh' }}>

                            <div onClick={onClickFirstInfoCancle} style={{ position: 'absolute', top: '0', right: '0', padding: '0.625rem 1rem' }}>
                                <img src={icon_cancle} />
                            </div>

                            <div style={{ position: 'absolute', top: '3.75rem', left: '1.5625rem' }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '0.875rem' }} />
                                    <TriThi />
                                    <div style={{ flexGrow: '1' }} />
                                </div>
                                <div style={{ backgroundColor: '#ffbc26', padding: '22px 1.125rem 0.6875rem 1.125rem', borderRadius: '0.375rem', color: '#ffffff', fontSize: '0.8125rem', lineHeight: '1.4375rem', textAlign: 'center' }}>
                                    <div style={{ marginBottom: '0.5625rem' }}>
                                        <img src={sub_info} style={{ width: '11.25rem', height: '11.75rem' }} />
                                    </div>
                                    <div>상세정보는 <span className="spoqaBold">메인에서 입력</span> 가능!</div>
                                </div>
                            </div>
                            <div style={{ position: 'absolute', top: '0.125rem', left: '4px', padding: '1rem', borderRadius: '50%', backgroundColor: 'white' }}>
                                <img src={icon_back} style={{ width: '0.9375rem', height: '0.8125rem' }} />
                            </div>
                        </div>
                    </div>
                </Slider>
            </InitialInfoWrapPopup>
        </div>
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

    height:3.0625rem;

    background-color:#ffffff;
    text-align:center;

    font-size:0.875rem;
    color:#313131;
    
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;
const MainWrap = styled.div`
    /* border:1px solid red; */
    position:absolute;
    top:3.0625rem;
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


const InitialInfoWrapPopup = styled.div`
    display : ${props => props.openStatus ? 'block' : 'none'};
    z-index:10000;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    background-color:rgba(0,0,0,0.7);
`;


const TriFirst = styled.div`
    width: 0px;height: 0px;
    border-top:0.3125rem solid #ffbc26;
    border-bottom:0.3125rem solid transparent;
    border-right: 0.3125rem solid #ffbc26;
    border-left: 0.3125rem solid transparent;
`;
const TriSec = styled.div`
    width: 0px;height: 0px;
    border-top:0.3125rem solid transparent;
    border-bottom:0.3125rem solid #ffbc26;
    border-right: 0.3125rem solid #ffbc26;
    border-left: 0.3125rem solid transparent;
`;
const TriThi = styled.div`
    width: 0px;height: 0px;
    border-top:0.3125rem solid transparent;
    border-bottom:0.3125rem solid #ffbc26;
    border-right: 0.3125rem solid transparent;
    border-left: 0.3125rem solid #ffbc26;
`;

export default SubscribePage;