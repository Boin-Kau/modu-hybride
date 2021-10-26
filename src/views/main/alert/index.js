import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch } from "react-redux";

import icon_back from "../../../assets/icon-back-arrow.svg";

import SubscribeIcon from "../../../assets/icon-notif-billing.svg";
import PartyIcon from "../../../assets/icon-notif-party.svg";
import SystemIcon from "../../../assets/icon-notif-system.svg";

import { TextMiddle } from '../../../styled/shared';
import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../../containers/pageTransContext';
import { BottomNavCloseAction } from '../../../reducers/container/bottomNav';
import { customApiClient } from '../../../shared/apiClient';

//카테고리별 아이콘 가져오기
const getAlertCategoryIcon = (categoryIdx) => {

    if (categoryIdx === 1) {
        return SubscribeIcon
    }
    else if (categoryIdx === 2) {
        return PartyIcon
    }
    else {
        return SystemIcon
    }

}

//카테고리별 이름 가져오기
const getAlertCategoryName = (categoryIdx) => {
    if (categoryIdx === 1) {
        return "구독"
    }
    else if (categoryIdx === 2) {
        return "파티"
    }
    else {
        return "시스템"
    }
}

//몇분전 시간 계산 함수
const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) {
        return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
}

const AlertPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //context
    const { setPageTrans } = useContext(PageTransContext);

    //state
    const [alertList, setAlertList] = useState([]);

    //inital logic
    useEffect(async () => {
        dispatch(BottomNavCloseAction);

        const data = await customApiClient('get', '/notification');

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode != 200) {
            return
        }

        setAlertList(data.result);

    }, [])

    const closeAlertPage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    };

    return (

        <div className="page" style={{ backgroundColor: "#ffffff" }}>
            <PageWrap>
                <HeaderWrap className="spoqaBold">
                    <div id="back_link" onClick={closeAlertPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>알림</TextMiddle>
                </HeaderWrap>

                <div className="notoMedium">

                    {alertList.length > 0 &&
                        alertList.map((data, index) => {


                            return (
                                <AlertWrap isRead={data.viewedAt !== null}>
                                    <div style={{ display: 'flex', paddingBottom: '1.25rem', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                                        <div style={{ marginRight: '1rem' }}>
                                            <div>
                                                <img style={{ width: '2.3125rem', height: '2.3125rem' }} src={getAlertCategoryIcon(data.category.idx)} />
                                            </div>
                                        </div>
                                        <div style={{ flexGrow: '1' }}>
                                            <div style={{ display: 'flex', fontSize: '0.75rem', marginBottom: '0.3125rem', opacity: '0.4' }}>
                                                <div style={{ flexGrow: '1' }}>{getAlertCategoryName(data.category.idx)}</div>
                                                <div>{timeForToday(data.createdAt)}</div>
                                            </div>
                                            <div style={{ fontSize: '0.8125rem', wordBreak: 'keep-all' }}>{data.content}</div>
                                        </div>
                                    </div>
                                </AlertWrap>
                            )
                        })
                    }

                </div>
            </PageWrap>
        </div>
    )
};

const PageWrap = styled.div`

    position:absolute;
    top:2.5625rem;
    left:0;
    right:0;
    bottom:0;

    display:flex;
    flex-direction:column;

    overflow-y:scroll;
`;
const HeaderWrap = styled.div`
    position: fixed;
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

const AlertWrap = styled.div`
    padding:1.5rem 1.5625rem 0 1.25rem;

    background-color: ${props => props.isRead ? '#ffffff' : 'rgba(255, 202, 23,0.09)'};
`;




export default AlertPage;