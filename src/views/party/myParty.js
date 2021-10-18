import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";


import Fade from 'react-reveal/Fade';
import icon_back from "../../assets/icon-back-arrow.svg";
import icon_party_memeber from "../../assets/icon-party-member.svg";
import icon_party_host from "../../assets/icon-party-host.svg";
import ReportIcon from '../../assets/icon-report.svg';

import { TextMiddle } from '../../styled/shared';
import { customApiClient } from '../../shared/apiClient';

import { DetailRowWrap, DetailItemWrap, DetailItemTitle, DetailItemContent, DetailButton, DetailItemFillContent } from '../../styled/main';

import { useHistory } from 'react-router-dom';
import { BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { PageTransContext } from '../../containers/pageTransContext';
import { priceToString, ContentWrap, ContentDetailWrap } from '../../components/main/bottomCard';


const { result: ProgressData } = {
    result: [
        {
            "idx": 28,
            "status": "ACTIVATE",
            "createdAt": "2021-10-04T14:50:32.686Z",
            "updatedAt": "2021-10-05T15:44:57.731Z",
            "deletedAt": null,
            "partyRoom": {
                "idx": 29,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 15,
                "color": null,
                "initial": null,
                "price": 4500,
                "openChatLink": "https://naver.com",
                "membership": null,
                "personnel": 4,
                "status": "MATCHING",
                "createdAt": "2021-09-29T16:38:17.817Z",
                "deletedAt": "2021-09-30T15:00:00.000Z",
                "partyUser": [
                    {
                        "idx": 27,
                        "status": "ACTIVATE",
                        "createdAt": "2021-09-29T16:38:17.831Z",
                        "updatedAt": "2021-10-05T15:44:57.709Z",
                        "deletedAt": null,
                        "user": {
                            "idx": 2,
                            "name": "테스트",
                            "phone": "01000000000",
                            "sex": "MALE",
                            "age": 1,
                            "uniqueNumber": "401594",
                            "isAlert": "Y",
                            "isMarketing": "Y",
                            "isMarketingUpdatedAt": "2021-07-08T04:34:37.263Z",
                            "fcmToken": null,
                            "platform": "WEB",
                            "status": "ACTIVATE",
                            "createdAt": "2021-07-08T04:34:37.263Z",
                            "updatedAt": "2021-09-15T05:26:11.000Z"
                        }
                    },
                    {
                        "idx": 28,
                        "status": "ACTIVATE",
                        "createdAt": "2021-10-04T14:50:32.686Z",
                        "updatedAt": "2021-10-05T15:44:57.731Z",
                        "deletedAt": null,
                        "user": {
                            "idx": 1,
                            "name": "이기택",
                            "phone": "01092756351",
                            "sex": "MALE",
                            "age": 1,
                            "uniqueNumber": "401597",
                            "isAlert": "Y",
                            "isMarketing": "Y",
                            "isMarketingUpdatedAt": "2021-07-08T04:34:37.263Z",
                            "fcmToken": null,
                            "platform": "WEB",
                            "status": "ACTIVATE",
                            "createdAt": "2021-07-08T04:34:37.263Z",
                            "updatedAt": "2021-09-15T05:26:11.000Z"
                        }
                    }
                ]
            },
            "partyDetail": {
                "idx": 29,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 15,
                "price": 4500,
                "color": null,
                "initial": null,
                "membership": null,
                "personnel": 4,
                "openChatLink": "https://naver.com",
                "customName": null,
                "customCategoryIdx": null,
                "customCategory": null,
                "serverName": "윌라",
                "serverImgUrl": "https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2FWelaaa.png?alt=media&token=e1bf1ec0-8ddb-446f-9c3f-9dfbd94fef1d",
                "serverCategoryIdx": 3,
                "serverCategory": "독서·학습",
                "IsHost": "Y"
            }
        },
        {
            "idx": 25,
            "status": "ACTIVATE",
            "createdAt": "2021-09-29T16:38:15.774Z",
            "updatedAt": "2021-09-29T16:38:15.774Z",
            "deletedAt": null,
            "partyRoom": {
                "idx": 28,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 2,
                "color": null,
                "initial": null,
                "price": 4500,
                "openChatLink": "https://naver.com",
                "membership": null,
                "personnel": 4,
                "status": "MATCHING",
                "createdAt": "2021-09-29T16:38:15.759Z",
                "deletedAt": null,
                "partyUser": [
                    {
                        "idx": 25,
                        "status": "ACTIVATE",
                        "createdAt": "2021-09-29T16:38:15.774Z",
                        "updatedAt": "2021-09-29T16:38:15.774Z",
                        "deletedAt": null,
                        "user": {
                            "idx": 1,
                            "name": "이기택",
                            "phone": "01092756351",
                            "sex": "MALE",
                            "age": 1,
                            "uniqueNumber": "401597",
                            "isAlert": "Y",
                            "isMarketing": "Y",
                            "isMarketingUpdatedAt": "2021-07-08T04:34:37.263Z",
                            "fcmToken": null,
                            "platform": "WEB",
                            "status": "ACTIVATE",
                            "createdAt": "2021-07-08T04:34:37.263Z",
                            "updatedAt": "2021-09-15T05:26:11.000Z"
                        }
                    }
                ]
            },
            "partyDetail": {
                "idx": 28,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 2,
                "price": 4500,
                "color": null,
                "initial": null,
                "membership": null,
                "personnel": 4,
                "openChatLink": "https://naver.com",
                "customName": null,
                "customCategoryIdx": null,
                "customCategory": null,
                "serverName": "왓챠",
                "serverImgUrl": "https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2Fwatcha.png?alt=media&token=cb80e781-d453-4224-9bce-505305174bd1",
                "serverCategoryIdx": 1,
                "serverCategory": "OTT",
                "IsHost": "Y"
            }
        },
        {
            "idx": 24,
            "status": "ACTIVATE",
            "createdAt": "2021-09-29T16:38:13.763Z",
            "updatedAt": "2021-09-29T16:38:13.763Z",
            "deletedAt": null,
            "partyRoom": {
                "idx": 27,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 1,
                "color": null,
                "initial": null,
                "price": 4500,
                "openChatLink": "https://naver.com",
                "membership": null,
                "personnel": 4,
                "status": "MATCHING",
                "createdAt": "2021-09-29T16:38:13.743Z",
                "deletedAt": null,
                "partyUser": [
                    {
                        "idx": 24,
                        "status": "ACTIVATE",
                        "createdAt": "2021-09-29T16:38:13.763Z",
                        "updatedAt": "2021-09-29T16:38:13.763Z",
                        "deletedAt": null,
                        "user": {
                            "idx": 1,
                            "name": "이기택",
                            "phone": "01092756351",
                            "sex": "MALE",
                            "age": 1,
                            "uniqueNumber": "401597",
                            "isAlert": "Y",
                            "isMarketing": "Y",
                            "isMarketingUpdatedAt": "2021-07-08T04:34:37.263Z",
                            "fcmToken": null,
                            "platform": "WEB",
                            "status": "ACTIVATE",
                            "createdAt": "2021-07-08T04:34:37.263Z",
                            "updatedAt": "2021-09-15T05:26:11.000Z"
                        }
                    }
                ]
            },
            "partyDetail": {
                "idx": 27,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 1,
                "price": 4500,
                "color": null,
                "initial": null,
                "membership": null,
                "personnel": 4,
                "openChatLink": "https://naver.com",
                "customName": null,
                "customCategoryIdx": null,
                "customCategory": null,
                "serverName": "넷플릭스",
                "serverImgUrl": "https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2Fnetflix.png?alt=media&token=96cf7411-2b79-4050-97cc-6ba683532b14",
                "serverCategoryIdx": 1,
                "serverCategory": "OTT",
                "IsHost": "Y"
            }
        },
        {
            "idx": 23,
            "status": "ACTIVATE",
            "createdAt": "2021-09-23T17:03:10.871Z",
            "updatedAt": "2021-10-05T15:44:57.682Z",
            "deletedAt": null,
            "partyRoom": {
                "idx": 25,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 9,
                "color": null,
                "initial": null,
                "price": 4500,
                "openChatLink": "https://naver.com",
                "membership": null,
                "personnel": 2,
                "status": "COMPELETE",
                "createdAt": "2021-09-23T16:04:02.687Z",
                "deletedAt": null,
                "partyUser": [
                    {
                        "idx": 14,
                        "status": "ACTIVATE",
                        "createdAt": "2021-09-23T16:31:56.984Z",
                        "updatedAt": "2021-09-23T16:33:25.766Z",
                        "deletedAt": null,
                        "user": {
                            "idx": 2,
                            "name": "테스트",
                            "phone": "01000000000",
                            "sex": "MALE",
                            "age": 1,
                            "uniqueNumber": "401594",
                            "isAlert": "Y",
                            "isMarketing": "Y",
                            "isMarketingUpdatedAt": "2021-07-08T04:34:37.263Z",
                            "fcmToken": null,
                            "platform": "WEB",
                            "status": "ACTIVATE",
                            "createdAt": "2021-07-08T04:34:37.263Z",
                            "updatedAt": "2021-09-15T05:26:11.000Z"
                        }
                    },
                    {
                        "idx": 23,
                        "status": "ACTIVATE",
                        "createdAt": "2021-09-23T17:03:10.871Z",
                        "updatedAt": "2021-10-05T15:44:57.682Z",
                        "deletedAt": null,
                        "user": {
                            "idx": 1,
                            "name": "이기택",
                            "phone": "01092756351",
                            "sex": "MALE",
                            "age": 1,
                            "uniqueNumber": "401597",
                            "isAlert": "Y",
                            "isMarketing": "Y",
                            "isMarketingUpdatedAt": "2021-07-08T04:34:37.263Z",
                            "fcmToken": null,
                            "platform": "WEB",
                            "status": "ACTIVATE",
                            "createdAt": "2021-07-08T04:34:37.263Z",
                            "updatedAt": "2021-09-15T05:26:11.000Z"
                        }
                    }
                ]
            },
            "partyDetail": {
                "idx": 25,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 9,
                "price": 4500,
                "color": null,
                "initial": null,
                "membership": null,
                "personnel": 2,
                "openChatLink": "https://naver.com",
                "customName": null,
                "customCategoryIdx": null,
                "customCategory": null,
                "serverName": "바이브",
                "serverImgUrl": "https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2Fvibe.png?alt=media&token=f81f2f2a-f068-48f3-8858-724a5c25cc43",
                "serverCategoryIdx": 2,
                "serverCategory": "음악",
                "IsHost": "N"
            }
        }
    ],
    statusCode: 200,
    message: "나의 리스트 조회 성공"
}


const { result: FinishData } = {
    result: [
        {
            "idx": 28,
            "status": "ACTIVATE",
            "createdAt": "2021-10-04T14:50:32.686Z",
            "updatedAt": "2021-10-05T15:44:57.731Z",
            "deletedAt": null,
            "partyRoom": {
                "idx": 29,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 15,
                "color": null,
                "initial": null,
                "price": 4500,
                "openChatLink": "https://naver.com",
                "membership": null,
                "personnel": 4,
                "status": "MATCHING",
                "createdAt": "2021-09-29T16:38:17.817Z",
                "deletedAt": "2021-09-30T15:00:00.000Z",
                "partyUser": [
                    {
                        "idx": 27,
                        "status": "ACTIVATE",
                        "createdAt": "2021-09-29T16:38:17.831Z",
                        "updatedAt": "2021-10-05T15:44:57.709Z",
                        "deletedAt": null,
                        "user": {
                            "idx": 2,
                            "name": "테스트",
                            "phone": "01000000000",
                            "sex": "MALE",
                            "age": 1,
                            "uniqueNumber": "401594",
                            "isAlert": "Y",
                            "isMarketing": "Y",
                            "isMarketingUpdatedAt": "2021-07-08T04:34:37.263Z",
                            "fcmToken": null,
                            "platform": "WEB",
                            "status": "ACTIVATE",
                            "createdAt": "2021-07-08T04:34:37.263Z",
                            "updatedAt": "2021-09-15T05:26:11.000Z"
                        }
                    },
                    {
                        "idx": 28,
                        "status": "ACTIVATE",
                        "createdAt": "2021-10-04T14:50:32.686Z",
                        "updatedAt": "2021-10-05T15:44:57.731Z",
                        "deletedAt": null,
                        "user": {
                            "idx": 1,
                            "name": "이기택",
                            "phone": "01092756351",
                            "sex": "MALE",
                            "age": 1,
                            "uniqueNumber": "401597",
                            "isAlert": "Y",
                            "isMarketing": "Y",
                            "isMarketingUpdatedAt": "2021-07-08T04:34:37.263Z",
                            "fcmToken": null,
                            "platform": "WEB",
                            "status": "ACTIVATE",
                            "createdAt": "2021-07-08T04:34:37.263Z",
                            "updatedAt": "2021-09-15T05:26:11.000Z"
                        }
                    }
                ]
            },
            "partyDetail": {
                "idx": 29,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 15,
                "price": 4500,
                "color": null,
                "initial": null,
                "membership": null,
                "personnel": 4,
                "openChatLink": "https://naver.com",
                "customName": null,
                "customCategoryIdx": null,
                "customCategory": null,
                "serverName": "윌라",
                "serverImgUrl": "https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2FWelaaa.png?alt=media&token=e1bf1ec0-8ddb-446f-9c3f-9dfbd94fef1d",
                "serverCategoryIdx": 3,
                "serverCategory": "독서·학습",
                "IsHost": "Y"
            }
        },
        {
            "idx": 25,
            "status": "ACTIVATE",
            "createdAt": "2021-09-29T16:38:15.774Z",
            "updatedAt": "2021-09-29T16:38:15.774Z",
            "deletedAt": null,
            "partyRoom": {
                "idx": 28,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 2,
                "color": null,
                "initial": null,
                "price": 4500,
                "openChatLink": "https://naver.com",
                "membership": null,
                "personnel": 4,
                "status": "MATCHING",
                "createdAt": "2021-09-29T16:38:15.759Z",
                "deletedAt": null,
                "partyUser": [
                    {
                        "idx": 25,
                        "status": "ACTIVATE",
                        "createdAt": "2021-09-29T16:38:15.774Z",
                        "updatedAt": "2021-09-29T16:38:15.774Z",
                        "deletedAt": null,
                        "user": {
                            "idx": 1,
                            "name": "이기택",
                            "phone": "01092756351",
                            "sex": "MALE",
                            "age": 1,
                            "uniqueNumber": "401597",
                            "isAlert": "Y",
                            "isMarketing": "Y",
                            "isMarketingUpdatedAt": "2021-07-08T04:34:37.263Z",
                            "fcmToken": null,
                            "platform": "WEB",
                            "status": "ACTIVATE",
                            "createdAt": "2021-07-08T04:34:37.263Z",
                            "updatedAt": "2021-09-15T05:26:11.000Z"
                        }
                    }
                ]
            },
            "partyDetail": {
                "idx": 28,
                "title": "쏘카 같이하실분 ~~",
                "registerType": "SERVER",
                "platformIdx": 2,
                "price": 4500,
                "color": null,
                "initial": null,
                "membership": null,
                "personnel": 4,
                "openChatLink": "https://naver.com",
                "customName": null,
                "customCategoryIdx": null,
                "customCategory": null,
                "serverName": "왓챠",
                "serverImgUrl": "https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2Fwatcha.png?alt=media&token=cb80e781-d453-4224-9bce-505305174bd1",
                "serverCategoryIdx": 1,
                "serverCategory": "OTT",
                "IsHost": "Y"
            }
        },
    ],
    statusCode: 200,
    message: "나의 리스트 조회 성공"
}


const MyParty = () => {

    //import
    const dispatch = useDispatch();
    const history = useHistory();

    //store

    //context
    const { setPageTrans } = useContext(PageTransContext);


    //state
    const [progressMenuStatus, setProgressMenuStatus] = useState(true);
    const [terminateMenuStatus, setTerminateMenuStatus] = useState(false);

    useEffect(() => {
        dispatch(BottomNavCloseAction);
    }, []);

    const closeSubscribePage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    };


    const onClickMenu = useCallback(async (type) => {

        //똑같은 탭 누르면 리턴 처리
        if (progressMenuStatus && type == 'progress') return
        if (terminateMenuStatus && type == 'terminate') return

        //전체 조회와 카테고리를 동기화 해줘야함! 구독 값이 바뀌면 각 탭 리스트를 다시한번 조회해줘야함

        if (type == 'progress') {
            setProgressMenuStatus(true);
            setTerminateMenuStatus(false);
        }
        else {

            setProgressMenuStatus(false);
            setTerminateMenuStatus(true);
        }
    }, [
        progressMenuStatus,
        terminateMenuStatus,
    ]);

    return (
        <div className="page">

            <PageWrap>
                <HeaderWrap className="spoqaBold">
                    <div id="back_link" onClick={closeSubscribePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>
                    <TextMiddle>내 파티</TextMiddle>
                </HeaderWrap>
                <MainWrap>
                    <CategoryTapWrap className="spoqaBold">
                        <CategoryTapItem selectedStatus={progressMenuStatus} onClick={() => onClickMenu('progress')}>참여중</CategoryTapItem>
                        <CategoryTapItem selectedStatus={terminateMenuStatus} onClick={() => onClickMenu('terminate')}>종료됨</CategoryTapItem>
                    </CategoryTapWrap>
                    <ItemListWrap className="notoMedium">

                        {/* 참여중 리스트 */}
                        <ItemListView selectedStatus={progressMenuStatus}>
                            {
                                ProgressData.length != 0 ?
                                    ProgressData.map((data, index) => {
                                        return (<BottomContent data={data.partyDetail} room={data.partyRoom} isProgress={progressMenuStatus} key={index}></BottomContent>)
                                    }) :
                                    <div style={{ marginTop: "3.4375rem", textAlign: "center" }}>
                                        <div>
                                            없음
                                    </div>
                                        <div className="notoMedium" style={{ fontSize: "0.8125rem", color: "#313131", opacity: "0.25" }}>구독 서비스를 등록해주세요</div>
                                    </div>
                            }
                        </ItemListView>

                        {/* 종료됨 리스트 */}
                        <ItemListView selectedStatus={terminateMenuStatus}>
                            {
                                FinishData.length != 0 ?
                                    FinishData.map((data, index) => {
                                        return (<BottomContent data={data.partyDetail} room={data.partyRoom} isProgress={progressMenuStatus} key={index}></BottomContent>)
                                    }) :
                                    <div style={{ marginTop: "3.4375rem", textAlign: "center" }}>
                                        <div>
                                            없음
                                    </div>
                                        <div className="notoMedium" style={{ fontSize: "0.8125rem", color: "#313131", opacity: "0.25" }}>구독 서비스를 등록해주세요</div>
                                    </div>
                            }
                        </ItemListView>
                    </ItemListWrap>
                </MainWrap>
            </PageWrap>
        </div >
    )
};


const BottomContent = ({ data, room, isProgress }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [openStatus, setOpenStatus] = useState(false);

    const onclickOpenContent = () => {

        if (openStatus) {
            setOpenStatus(false);
        }
        else {
            setOpenStatus(true);
        }
    }

    console.log(data)
    console.log(room);

    return (
        <>
            <ContentWrap onClick={onclickOpenContent}>
                <div>
                    {
                        data.color && data.initial ?
                            <div className="spoqaBold" style={{ position: 'relative', width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem", backgroundColor: data.color }}>
                                <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-30%)', fontSize: '1.375rem', color: '#ffffff' }}>
                                    {data.initial}
                                </div>
                            </div>
                            :
                            data.serverImgUrl ?
                                <img src={data.serverImgUrl} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} /> :
                                <div className="spoqaBold" style={{ position: 'relative', width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem", backgroundColor: '#e1e1e1' }}>
                                    <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-30%)', fontSize: '1.375rem', color: '#ffffff' }}>
                                        ?
                                    </div>
                                </div>
                    }
                </div>
                <div className="spoqaBold" style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0", display: 'flex' }}>
                        <div>{data.title}</div>
                        <div style={{ marginLeft: '0.3125rem' }}>
                            <img src={data.IsHost === 'Y' ? icon_party_host : icon_party_memeber} style={{ width: '0.875rem', height: '0.625rem' }} />
                        </div>
                    </div>
                    <div className="notoMedium" style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem", opacity: '0.4' }}>{data.customName ? data.customName : data.serverName}</div>
                </div>
            </ContentWrap>

            <Fade collapse when={openStatus} duration={500}>
                <ContentDetailWrap>

                    <DetailRowWrap>
                        <DetailItemWrap mr>
                            <DetailItemTitle>멤버십 종류</DetailItemTitle>
                            {data.membership ?
                                <DetailItemFillContent>{data.membership}</DetailItemFillContent> :
                                <DetailItemContent>없음 </DetailItemContent>
                            }
                        </DetailItemWrap>
                        <DetailItemWrap>
                            <DetailItemTitle>카테고리</DetailItemTitle>
                            <DetailItemFillContent>{data.customName ? data.customCategory : data.serverCategory}</DetailItemFillContent>
                        </DetailItemWrap>
                    </DetailRowWrap>

                    <DetailRowWrap>
                        <DetailItemWrap mr>
                            <DetailItemTitle>모집인원</DetailItemTitle>
                            {
                                isProgress ?
                                    <DetailItemFillContent>{room.partyUser.length}/{room.personnel}</DetailItemFillContent> :
                                    <DetailItemFillContent>{room.personnel}인</DetailItemFillContent>
                            }
                        </DetailItemWrap>
                        <DetailItemWrap>
                            <DetailItemTitle>결제 금액</DetailItemTitle>
                            {room.price ?
                                <DetailItemFillContent>1인당 {priceToString(room.price)}원</DetailItemFillContent> :
                                <DetailItemContent>없음 </DetailItemContent>
                            }
                        </DetailItemWrap>
                    </DetailRowWrap>

                    <DetailRowWrap>
                        <DetailItemWrap mr>
                            <DetailItemTitle>파티 가입일</DetailItemTitle>
                            <DetailItemFillContent>2021-01-01</DetailItemFillContent>
                        </DetailItemWrap>
                        {!isProgress &&
                            <DetailItemWrap>
                                <DetailItemTitle>파티 종료일</DetailItemTitle>
                                <DetailItemFillContent>2021-01-01</DetailItemFillContent>
                            </DetailItemWrap>
                        }
                    </DetailRowWrap>



                    <DetailRowWrap style={{ margin: "0" }}>
                        <div className="spoqaBold" style={{ position: 'relative', flexGrow: '1', marginRight: '0.75rem', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>오픈채팅방 열기</div>
                        </div>
                        <div style={{ padding: '0.5rem 0.875rem 0.5437rem 0.9187rem', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
                            <img src={ReportIcon} style={{ width: '1.2563rem', height: '1.3938rem' }} />
                        </div>
                    </DetailRowWrap>
                    {isProgress &&
                        <DetailRowWrap style={{ margin: "0", marginTop: '1rem' }}>
                            <div className="spoqaBold" style={{ position: 'relative', flexGrow: '1', padding: '0.5625rem 0 0.75rem 0', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
                                <div style={{ color: '#ffffff', fontSize: '0.8125rem', textAlign: 'center' }}>파티 나가기</div>
                            </div>

                            {data.IsHost === 'Y' &&
                                <div className="spoqaBold" style={{ position: 'relative', flexGrow: '1', padding: '0.5625rem 0 0.75rem 0', backgroundColor: '#ffbc26', borderRadius: '0.375rem', marginLeft: '0.75rem' }}>
                                    <div style={{ color: '#ffffff', fontSize: '0.8125rem', textAlign: 'center' }}>파티원 강제 퇴장</div>
                                </div>
                            }
                        </DetailRowWrap>
                    }

                </ContentDetailWrap>
            </Fade>

        </>
    )
};





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

    border:1px solid #f7f7f7;

    padding-bottom:0.875rem;

    border-radius:0.4375rem;
    border-top-left-radius:0;
`;

const ItemListView = styled.div`
    display:${props => props.selectedStatus ? 'block' : 'none'};
    position: relative;
`;


export default MyParty;