import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import Fade from 'react-reveal/Fade';

import icon_content_none from "../../assets/img-bottom-item-none.svg";
import icon_phone from "../../assets/icon-phone.svg";
import icon_edit from "../../assets/icon-edit.svg";

import platform_none from "../../assets/platform-none.svg";



import { DetailRowWrap, DetailItemWrap, DetailItemTitle, DetailItemContent, DetailButton, DetailItemFillContent } from '../../styled/main';
import { EnrollmentRevisePageWrapOpenAction, EnrollmentRevisePageOpenAction } from '../../reducers/main/enrollmentRevise';
import { SubscribeReloadFalseAction, GetSubscirbeList, GetSubscirbeDetail } from '../../reducers/main/subscribe';
import { customApiClient } from '../../shared/apiClient';
import { GetPlatformCategoryList } from '../../reducers/main/platform';

const BottomContent = ({ data }) => {

    const dispatch = useDispatch();

    const {
        platformCategoryList
    } = useSelector(state => state.main.platform);

    const [openStatus, setOpenStatus] = useState(false);

    const onclickOpenContent = () => {
        if (openStatus) {
            setOpenStatus(false);
        }
        else {
            setOpenStatus(true);
        }
    }

    const openRevisePage = useCallback(async () => {
        //페이지 이동
        dispatch(EnrollmentRevisePageWrapOpenAction);
        dispatch(EnrollmentRevisePageOpenAction);

        //상세 데이터 삽입
        dispatch({
            type: GetSubscirbeDetail,
            data: data
        })

        //카테고리 조회 -> 리덕스에서 없으면 호출, 있으면 호출 X => 최초 1회만 불러오기
        if (platformCategoryList.length < 1) {

            //인기 구독 플랫폼 리스트 조회
            const data = await customApiClient('get', '/subscribe/category');

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                return
            }

            //리덕스에 넣어주기
            dispatch({
                type: GetPlatformCategoryList,
                data: data.result
            })

        }
    }, [platformCategoryList, data]);

    const getUnit = unit => {
        switch (unit) {
            case 'DAY': return '일'
            case 'WEEK': return '주'
            case 'MONTH': return '달'
            case 'YEAR': return '년'
            default: return '-'
        }
    }
    const getDDay = day => {
        if (day != 0) {
            return day
        }
        else {
            return "Day"
        }
    }

    const priceToString = price => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <>
            <ContentWrap onClick={onclickOpenContent}>
                <div>
                    {
                        data.color && data.initial ?
                            <div style={{ position: 'relative', width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem", backgroundColor: data.color }}>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '1.375rem', height: '1.375rem', color: '#ffffff' }}>
                                    {data.initial}
                                </div>
                            </div>
                            :
                            <img src={data.platform.imgUrl ? data.platform.imgUrl : platform_none} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} />
                    }
                </div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0", display: 'flex' }}>
                        <div>{data.platform.name}</div>
                        {
                            data.dDay && <DDayWrap dDay={data.dDay}>D-{getDDay(data.dDay)}</DDayWrap>
                        }
                    </div>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem", opacity: '0.4' }}>{data.platform.category.name}</div>
                </div>
                <div>{priceToString(data.price)}원</div>
            </ContentWrap>

            <Fade collapse when={openStatus} duration={500}>
                <ContentDetailWrap>
                    <DetailRowWrap>
                        <DetailItemWrap mr>
                            <DetailItemTitle>멤버십 종류</DetailItemTitle>
                            {data.membershipTitle ?
                                <DetailItemFillContent>{data.membershipTitle}</DetailItemFillContent> :
                                <DetailItemContent>없음 </DetailItemContent>
                            }
                        </DetailItemWrap>
                        <DetailItemWrap>
                            <DetailItemTitle>카테고리</DetailItemTitle>
                            <DetailItemFillContent>{data.platform.category.name}</DetailItemFillContent>
                        </DetailItemWrap>
                    </DetailRowWrap>

                    <DetailRowWrap>
                        <DetailItemWrap mr>
                            <DetailItemTitle>결제주기</DetailItemTitle>
                            {data.paymentCycleData ?
                                <DetailItemFillContent>{data.paymentCycleData}{getUnit(data.paymentCycleUnit)}</DetailItemFillContent> :
                                <DetailItemContent>없음 </DetailItemContent>
                            }
                        </DetailItemWrap>
                        <DetailItemWrap>
                            <DetailItemTitle>체험기간</DetailItemTitle>
                            {data.isFree == 'Y' && data.freeDate > 0 ?
                                <DetailItemFillContent>{data.freeDate}일 남음</DetailItemFillContent> :
                                <DetailItemContent>없음 </DetailItemContent>
                            }
                        </DetailItemWrap>
                    </DetailRowWrap>

                    <DetailRowWrap>
                        <DetailItemWrap mr>
                            <DetailItemTitle>다음 결제일</DetailItemTitle>
                            {data.paymentCycleDate ?
                                <DetailItemFillContent>{data.paymentCycleDate}</DetailItemFillContent> :
                                <DetailItemContent>없음 </DetailItemContent>
                            }
                        </DetailItemWrap>
                    </DetailRowWrap>

                    <DetailRowWrap style={{ margin: "0" }}>
                        {/* <DetailButton>
                            <div style={{ flexGrow: "1" }}></div>
                            <div style={{ position: "relative", width: "0.9375rem", marginRight: "0.5rem" }}>
                                <img src={icon_phone} style={{ position: "absolute", top: "50%", left: "0", transform: "translate(0,-50%)", width: "0.9375rem", height: "0.9375rem" }} />
                            </div>
                            <div style={{ position: "relative" }}>
                                <div style={{ marginTop: "0.125rem" }}>해지하기</div>
                            </div>
                            <div style={{ flexGrow: "1" }}></div>
                        </DetailButton> */}
                        <DetailButton onClick={openRevisePage} revise>
                            <div style={{ flexGrow: "1" }}></div>
                            <div style={{ position: "relative", width: "0.75rem", marginRight: "0.3125rem" }}>
                                <img src={icon_edit} style={{ position: "absolute", top: "50%", left: "0", transform: "translate(0,-50%)", width: "0.75rem", height: "1.0625rem" }} />
                            </div>
                            <div style={{ position: "relative" }}>
                                <div style={{ marginTop: "0.125rem" }}>수정하기</div>
                            </div>
                            <div style={{ flexGrow: "1" }}></div>
                        </DetailButton>
                    </DetailRowWrap>

                </ContentDetailWrap>
            </Fade>

        </>
    )
};


const BottomCard = () => {

    //import
    const dispatch = useDispatch();

    //store
    const {
        subscribeList,
        subscribeReloadStatus
    } = useSelector(state => state.main.subscribe);

    useEffect(async () => {

        //내 구독 API 호출
        if (subscribeList.length == 0 || subscribeReloadStatus) {

            //나의 구독 리스트 조회
            const data = await customApiClient('get', '/subscribe');

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                return
            }

            dispatch({
                type: GetSubscirbeList,
                data: data.result
            })

        }

        dispatch(SubscribeReloadFalseAction);

    }, [subscribeReloadStatus]);


    return (
        <div style={{ border: "1px solid #f7f7f7" }}>
            {
                subscribeList.length != 0 ?
                    subscribeList.map((list, index) => {
                        return (<BottomContent data={list} key={index}></BottomContent>)
                    }) :
                    <div style={{ marginTop: "3.4375rem", textAlign: "center" }}>
                        <div>
                            <img src={icon_content_none} style={{ width: "12.1875rem", height: "2.8125rem", marginBottom: "0.75rem" }} />
                        </div>
                        <div style={{ fontSize: "0.8125rem", color: "#313131", opacity: "0.25" }}>구독 서비스를 등록해주세요</div>
                    </div>
            }
        </div>
    )
};

const ContentWrap = styled.div`

    display:flex;

    margin:0.75rem 1.25rem 0 1.25rem;
    background-color:#ffffff;

    border-radius:0.4375rem;

    padding:0.875rem 0.75rem;

    box-shadow: 0 0 0.25rem 0.0625rem #efefef;

    font-size:0.8125rem;
`;

const ContentDetailWrap = styled.div`

    margin:0 1.25rem;
    background-color:#ffffff;

    border-radius:0.4375rem;

    border-top: 0.0938rem dashed rgba(0,0,0,0.04);

    padding:0.875rem 1rem;

    box-shadow: 0 0.25rem 0.25rem 0.0625rem #efefef;

`;

const DDayWrap = styled.div`
    margin-left:0.375rem;
    font-size:0.6875rem;

    height: 1rem;
    text-align:center;

    padding:0 0.375rem;
    line-height:1.125rem;

    background-color : ${props => props.dDay > 5 ? '#e3e3e3' : '#fb5e5e'};
    color : ${props => props.dDay > 5 ? 'rgba(49,49,49,0.4)' : '#ffffff'};

    border-radius:0.5rem;
`;

export default BottomCard;