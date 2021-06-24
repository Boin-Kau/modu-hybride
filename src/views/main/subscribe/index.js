import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { TotalReloadFalseAction, CategoryReloadFalseAction, CategoryReloadTrueAction, TotalReloadTrueAction, SubscribeReloadTrueAction } from "../../../reducers/main/subscribe";


import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_search from "../../../assets/icon-search.svg";

import icon_sub_ect from "../../../assets/icon-sub-ect.svg";
import icon_plus from "../../../assets/icon-plus.svg";

import icon_cancle from "../../../assets/icon-cancle-white.svg";

import danger_icon from "../../../assets/danger-icon.svg";

import duck_read from "../../../assets/duck-read.gif";
import duck_tech from "../../../assets/duck-tech.gif";
import sub_info from "../../../assets/open-page.gif";

import loading_gif from "../../../assets/gray-loading.gif";


import { TextMiddle, DangerWrapPopup, DangerPopup, DangerPopupTop } from '../../../styled/shared';
import { GetCategoryPlatformList, GetServerPlatformList, UpdateSubscribeStatus, DeletePopupOpen, DeletePopupClose, SearchDeleteTrue } from '../../../reducers/main/platform';
import { customApiClient } from '../../../shared/apiClient';
import { MessageOpen, MessageClose, MessageWrapOpen, MessageWrapClose } from '../../../reducers/container/message';
import { AnalyPageReloadTrueAction } from '../../../reducers/main/analysis';

import { useHistory } from 'react-router-dom';
import { BottomNavCloseAction } from '../../../reducers/container/bottomNav';


const SubscribePage = () => {

    //import
    const dispatch = useDispatch();
    const history = useHistory();

    //store

    const {
        serverPlatformList,
        categoryPlatformList,

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

    const [firstDisplay, setFirstDisplay] = useState(true);
    const [firstOpacity, setFirstOpacity] = useState(false);

    const [secondDisplay, setSecondDisplay] = useState(false);
    const [secondOpacity, setSecondOpacity] = useState(false);

    const [thirdDisplay, setThirdDisplay] = useState(false);
    const [thirdOpacity, setThirdOpacity] = useState(false);

    useEffect(() => {
        dispatch(BottomNavCloseAction);

        if (totalReloadStatus) {
            reloadTotalPlatform();
        }

        if (categoryReloadStatus) {
            reloadCategoryPlatform();
        }

        //초기 코치마크 판별
        const firstStatus = localStorage.getItem('isFirst');

        if (!firstStatus) {
            setIsFirst(true);

            setTimeout(() => {
                setFirstOpacity(true);
            }, 500)
        }
        else {
            setIsFirst(false);
        }

        const userPlatform = localStorage.getItem('userPlatform');

        if (userPlatform == 'ios') {
            //IOS 배경색 설정
            try {
                window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
            }
            catch (err) {
            }
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



    const openSearchPage = () => {
        history.push('/search');
    };

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

    //코치마크 다음 함수
    const onClickFirstInfoNext = (index) => {
        if (index == 0) {
            setFirstOpacity(false);
            setSecondDisplay(true);
            setTimeout(() => {
                setFirstDisplay(false);
                setSecondOpacity(true);
            }, 400);
        }
        else {
            setSecondOpacity(false);
            setThirdDisplay(true);
            setTimeout(() => {
                setSecondDisplay(false);
                setThirdOpacity(true);
            }, 400);
        }
    }

    //코치마크 닫기 함수
    const onClickFirstInfoCancle = () => {
        setFirstOpacity(false);
        setSecondOpacity(false);
        setThirdOpacity(false);

        setTimeout(() => {
            setIsFirst(false);
            localStorage.setItem('isFirst', 'true');
        }, 400)
    }

    return (
        <div className="page">

            <PageWrap>
                <HeaderWrap className="spoqaBold">
                    <div id="back_link" onClick={closeSubscribePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>
                    <TextMiddle>구독 내역 추가</TextMiddle>
                    <div onClick={openSearchPage} style={{ zIndex: "10", position: "absolute", right: '0', height: '100%', width: '4.375rem' }}>
                        <img src={icon_search} style={{ position: "absolute", top: "55%", right: "1.3125rem", transform: "translate(0,-55%)" }}></img>
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
                                serverPlatformList.length < 1 ? <LoadingIcon src={loading_gif} alt="loading" /> :
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
                                categoryPlatformList.length < 1 ? <LoadingIcon src={loading_gif} alt="loading" /> :
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
            <InitialInfoWrapPopup openStatus={isFirst}>

                {/* 첫번째 */}
                <InitialInfoContent displayStatus={firstDisplay} opacityStatus={firstOpacity}>
                    <div style={{ position: 'absolute', top: '8.75rem', right: '2.5rem', width: '16.3438rem' }}>
                        <div style={{ backgroundColor: '#ffbc26', padding: '0.75rem 0 0.9375rem 1rem', borderRadius: '0.375rem', color: '#ffffff', fontSize: '0.8125rem', lineHeight: '1.4375rem' }}>
                            <div className="notoBold" style={{ display: 'flex', lineHeight: '1.4375rem', marginBottom: '0.375rem', marginRight: '1.625rem' }}>
                                <div style={{ flexGrow: '1' }}>구독 추가하기</div>
                                <div style={{ color: 'rgba(255,255,255,0.65)' }}>1 of 3</div>
                            </div>
                            <div>
                                사용중인 구독 서비스를 선택해<br />
                                구독 리스트에 추가해보세요.
                            </div>
                            <div className="notoBold" style={{ display: 'flex', marginTop: '1.125rem', fontSize: '0.75rem', lineHeight: '1.4375rem' }}>
                                <div onClick={onClickFirstInfoCancle}>닫기</div>
                                <div onClick={() => { onClickFirstInfoNext(0) }} style={{ marginLeft: '1.3125rem', backgroundColor: 'white', color: '#ffbc26', width: '2.75rem', borderRadius: '0.7813rem', textAlign: 'center' }}>다음</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flexGrow: '1' }} />
                            <TriFirst />
                            <div style={{ width: '0.625rem' }} />
                        </div>
                        <img src={duck_read} style={{ position: 'absolute', right: '1.375rem', bottom: '0.625rem', width: '3.375rem', height: '3.875rem' }} />

                    </div>
                    <div style={{ position: 'absolute', top: '17.9375rem', left: '0', right: '0', margin: '0 1.9375rem' }}>
                        <ItemWrap style={{ border: 'none' }}>
                            <ItemImgWrap>
                                <img src="https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2Fyoutubepremium.png?alt=media&token=183d1cea-c07a-4c1c-84d3-10a48f656aea" style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem" }} />
                            </ItemImgWrap>
                            <ItemTitleWrap>
                                <TextMiddle>
                                    <TextMiddle className="notoMedium">
                                        유튜브 프리미엄
                                    </TextMiddle>
                                </TextMiddle>
                            </ItemTitleWrap>
                            <ItemIconWrap>
                                <ItemIcon src={icon_plus}></ItemIcon>
                            </ItemIconWrap>
                        </ItemWrap>
                    </div>
                </InitialInfoContent>

                {/* 두번째 */}
                <InitialInfoContent displayStatus={secondDisplay} opacityStatus={secondOpacity}>

                    <div style={{ position: 'absolute', top: '3.125rem', right: '1rem', width: '16.3438rem' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flexGrow: '1' }} />
                            <TriSec />
                            <div style={{ width: '0.875rem' }} />
                        </div>
                        <div style={{ backgroundColor: '#ffbc26', padding: '1.0625rem 0 1.125rem 1rem', borderRadius: '0.375rem', color: '#ffffff', fontSize: '0.8125rem', lineHeight: '1.4375rem' }}>
                            <div className="notoBold" style={{ display: 'flex', lineHeight: '1.4375rem', marginBottom: '0.375rem', marginRight: '1.625rem' }}>
                                <div style={{ flexGrow: '1' }}>구독 서비스 찾기</div>
                                <div style={{ color: 'rgba(255,255,255,0.65)' }}>2 of 3</div>
                            </div>
                            <div style={{ lineHeight: '1.3125rem' }}>
                                검색기능을 사용하면 더 많은<br />
                                구독 서비스를 찾아볼 수 있어요.
                            </div>
                            <div className="notoBold" style={{ display: 'flex', marginTop: '1.125rem', fontSize: '0.75rem', lineHeight: '1.4375rem' }}>
                                <div onClick={onClickFirstInfoCancle}>닫기</div>
                                <div onClick={() => { onClickFirstInfoNext(1) }} style={{ marginLeft: '1.3125rem', backgroundColor: 'white', color: '#ffbc26', width: '2.75rem', borderRadius: '0.7813rem', textAlign: 'center' }}>다음</div>
                            </div>
                        </div>
                        <img src={duck_tech} style={{ position: 'absolute', right: '0.875rem', bottom: '0rem', width: '5rem' }} />

                    </div>
                    <div style={{ position: 'absolute', top: '0.125rem', right: '0.3125rem', padding: '1rem' }}>
                        <img src={icon_search} style={{ width: '1rem', height: '1rem' }} />
                    </div>
                </InitialInfoContent>

                {/* 세번째 */}
                <InitialInfoContent displayStatus={thirdDisplay} opacityStatus={thirdOpacity}>

                    <div onClick={onClickFirstInfoCancle} style={{ position: 'absolute', top: '0', right: '0', padding: '0.625rem 1rem' }}>
                        <img src={icon_cancle} />
                    </div>

                    <div style={{ position: 'absolute', top: '3.125rem', left: '1.5625rem' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '0.875rem' }} />
                            <TriThi />
                            <div style={{ flexGrow: '1' }} />
                        </div>
                        <div style={{ backgroundColor: '#ffbc26', padding: '0.75rem 0.625rem 0.6875rem 0.625rem', borderRadius: '0.375rem', color: '#ffffff', fontSize: '0.8125rem', lineHeight: '1.4375rem', textAlign: 'center' }}>
                            <div className="notoBold" style={{ display: 'flex', lineHeight: '1.4375rem', marginBottom: '0.75rem', margin: '0 0.5625rem' }}>
                                <div style={{ flexGrow: '1', textAlign: 'left' }}>구독 정보 수정</div>
                                <div style={{ color: 'rgba(255,255,255,0.65)' }}>3 of 3</div>
                            </div>
                            <div>
                                <img src={sub_info} style={{ width: '12.5rem' }} />
                            </div>
                            <div style={{ textAlign: 'left', margin: '0 0.5625rem', lineHeight: '1.3125rem' }}>
                                상세 정보는 메인에서 입력 및 <br />
                                수정이 가능해요.
                            </div>
                            <div className="notoBold" style={{ display: 'flex', fontSize: '0.75rem', lineHeight: '1.4375rem', marginRight: '0.5625rem' }}>
                                <div style={{ flexGrow: '1' }} />
                                <div onClick={onClickFirstInfoCancle} style={{ backgroundColor: 'white', color: '#ffbc26', width: '2.75rem', borderRadius: '0.7813rem', textAlign: 'center' }}>확인</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: 'absolute', top: '0.125rem', left: '4px', padding: '1rem' }}>
                        <img src={icon_back} style={{ width: '0.9375rem', height: '0.8125rem' }} />
                    </div>
                </InitialInfoContent>

            </InitialInfoWrapPopup>
        </div >
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
    position: relative;
    min-height:25rem;
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

    background-color:rgba(255,255,255,0.9);
`;

const InitialInfoContent = styled.div`
    position: relative;
    height: 100vh; 

    display:${props => props.displayStatus ? 'block' : 'none'};
    opacity:${props => props.opacityStatus ? '1' : '0'};

    transition: opacity 0.3s ease;
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

const LoadingIcon = styled.img`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:1.875rem;
    height:1.875rem;
`;

export default SubscribePage;