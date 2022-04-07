

import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { TotalReloadFalseAction, CategoryReloadFalseAction } from "../../../../reducers/main/subscribe";


import icon_back from "../../../../assets/icon-back-arrow.svg";
import icon_search from "../../../../assets/icon-search.svg";

import icon_sub_ect from "../../../../assets/icon-sub-ect.svg";
import icon_plus from "../../../../assets/icon-plus.svg";

import icon_check from "../../../../assets/icon-main-check.svg";


import loading_gif from "../../../../assets/gray-loading.gif";


import { TextMiddle } from '../../../../styled/shared';
import { GetCategoryPlatformList, GetServerPlatformList } from '../../../../reducers/main/platform';
import { customApiClient } from '../../../../shared/apiClient';

import { useHistory } from 'react-router-dom';
import { BottomNavCloseAction } from '../../../../reducers/container/bottomNav';
import { PageTransContext } from '../../../../containers/pageTransContext';
import { UpdatePlatformAction } from '../../../../reducers/party/enrollment/platform';


const PartyPlatform = () => {

    //import
    const dispatch = useDispatch();
    const history = useHistory();

    //store
    const {
        serverPlatformList,
        categoryPlatformList,
    } = useSelector(state => state.main.platform);

    const {
        selectedPlatformIdx,
        selectedPlatformImgUrl
    } = useSelector(state => state.party.enrollment.platform);

    const {
        totalReloadStatus,
        categoryReloadStatus
    } = useSelector(state => state.main.subscribe);

    //context
    const { setPageTrans } = useContext(PageTransContext);

    //state
    const [totalMenuStatus, setTotalMenuStatus] = useState(true);
    const [categoryMenuStatus, setcategoryMenuStatus] = useState(false);

    useEffect(() => {
        dispatch(BottomNavCloseAction);

        if (totalReloadStatus) {
            reloadTotalPlatform();
        }

        if (categoryReloadStatus) {
            reloadCategoryPlatform();
        }

    }, []);

    useEffect(async () => {

        //플랫폼 리스트 조회 -> 리덕스에서 없으면 호출, 있으면 호출 X => 최초 1회만 불러오기
        if (serverPlatformList.length < 1) {

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

        //redux에 selectedPlatformIdx 초기화 시켜주기 ??

        setPageTrans('trans toRight');
        history.push('/party/enroll/platform/search');
    };

    const closeSubscribePage = () => {
        setPageTrans('trans toLeft');
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

    //직접 선택
    const onClickCustomEnroll = () => {
        dispatch(UpdatePlatformAction({
            selectedPlatformIdx: 0,
            selectedPlatformName: null,
            selectedPlatformCategoryIdx: null,
            selectedPlatformImgUrl: null,
            selectedPlatformImgColor: null,
            selectedPlatformImgInitial: null,
        }))
    }

    //구독 서비스 선택 후 확인 버튼 
    const onClickConfrim = () => {

        //selectedIdx가 없으면 종료처리
        if (selectedPlatformIdx === null) return

        //직접입력하기 혹은 이미지가 없는 플랫폼 클릭시 detail 설정 페이지로 이동시키기
        if (!selectedPlatformImgUrl) {
            setPageTrans('trans toRight');
            history.push('/party/enroll/platform/detail');
        }
        //그게 아니라면 뒤로 이동
        else {
            setPageTrans('trans toLeft');
            history.goBack();
        }
    }

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
        <div className="page">

            <PageWrap>
                <HeaderWrap className="spoqaBold">
                    <div id="back_link" onClick={closeSubscribePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>
                    <TextMiddle>구독 서비스 선택</TextMiddle>
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
                            <ItemWrap onClick={onClickCustomEnroll} style={{ border: "none" }}>
                                <ItemImgWrap>
                                    <img src={icon_sub_ect} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem" }} />
                                </ItemImgWrap>
                                <ItemTitleWrap>
                                    <TextMiddle>
                                        직접 입력하기
                                    </TextMiddle>
                                </ItemTitleWrap>
                                <ItemIconWrap>
                                    {selectedPlatformIdx === 0 && <ItemIcon src={icon_check}></ItemIcon>}
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
                            <ItemWrap onClick={onClickCustomEnroll} style={{ border: "none", paddingBottom: '0' }}>
                                <ItemImgWrap>
                                    <img src={icon_sub_ect} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem" }} />
                                </ItemImgWrap>
                                <ItemTitleWrap>
                                    <TextMiddle>
                                        직접 입력하기
                                    </TextMiddle>
                                </ItemTitleWrap>
                                <ItemIconWrap>
                                    {selectedPlatformIdx === 0 && <ItemIcon src={icon_check}></ItemIcon>}
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

                <ButtonWrap onClick={onClickConfrim} className="spoqaBold" isSelected={selectedPlatformIdx !== null}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>확인</div>
                </ButtonWrap>
            </PageWrap>
        </div >
    )
};

const TotalItemComponent = ({ data, isCategory, isLastItem }) => {

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
        <ItemWrap onClick={onClickItem} isCategory={isCategory} isCategoryLast={isLastItem} isSelected={data.idx == selectedPlatformIdx}>
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
            <ItemIconWrap>
                {data.idx == selectedPlatformIdx && <ItemIcon src={icon_check}></ItemIcon>}
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

    padding:0.875rem 1.25rem 5.5625rem 1.25rem;

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

    /* padding:0 0.6875rem; */

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
    padding: 0.75rem 0.6875rem;

    display:flex;

    border-top : ${props => props.isCategory ? 'none' : '0.0625rem solid rgba(0,0,0,0.07)'};
    border-bottom : ${props => props.isCategory && !props.isCategoryLast ? '0.0625rem solid rgba(0,0,0,0.07)' : 'none'};
    background-color:${props => props.isSelected ? '#ffefbb' : 'none'};
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

const CategoryTitle = styled.div`
    margin-top: 1.375rem;
    margin-left:0.6875rem;
    font-size: 0.875rem;
    line-height: 1.4375rem;
    color: rgba(0,0,0,0.26);
`;

const LoadingIcon = styled.img`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:1.875rem;
    height:1.875rem;
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


export default PartyPlatform;