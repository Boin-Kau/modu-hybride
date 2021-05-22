import React, { useState, useRef, useEffect, useCallback } from 'react';

import clamp from 'lodash-es/clamp'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-with-gesture'

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import Fade from 'react-reveal/Fade';


import backgroundImg from '../../assets/group-2.svg'
import BottomCard from '../../components/main/bottomCard';
import TopCard from '../../components/main/topCard';
import ConsumCard from '../../components/main/consumCard';

import AnalysisPage from './analysis';
import SubscribePage from './subscribe';
import { SubscribePageWrapOpenAction, SubscribePageOpenAction } from '../../reducers/main/subscribe';
import { GetServerPlatformList } from '../../reducers/main/platform';

import EnrollmentRevisePage from './subscribe/enrollment/revise';
import AlertPage from './alert';
import { customApiClient } from '../../shared/apiClient';
import { GetAnalyPageList, AnalyPageReloadFalseAction } from '../../reducers/main/analysis';

const CardStyle = {
    height: '100vh',
    backgroundColor: '#f7f7f7',
    borderRadius: "0.4375rem",
    boxShadow: "0 0 0.25rem 0.0625rem #eeb102"
}

const BottomChildOpenStyle = {
    overflowY: "scroll"
}
const BottomChildCloseStyle = {
    overflowY: "hidden"
}

const Main = () => {

    //페이지 상태값
    const {
        openAnalyPageWrapStatus,
        openAnalyPageStatus,
        analysisList,
        analysisReloadStatus
    } = useSelector(state => state.main.analysis);

    const {
        openSubscribePageWrapStatus,
        openSubscribePageStatus
    } = useSelector(state => state.main.subscribe);

    const {
        openEnrollmentRevisePageWrapStatus,
        openEnrollmentRevisePageStatus
    } = useSelector(state => state.main.enrollmentRevise);

    const {
        openAlertPageWrapStatus,
        openAlertPageStatus
    } = useSelector(state => state.main.alert);

    //구독 플랫폼 리스트 상태값
    const {
        serverPlatformList,
    } = useSelector(state => state.main.platform);


    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))

    let isScrollParent = true;

    const [isScrollChild, setIsScrollChild] = useState(false);

    const titleDivbRef = useRef();
    const bottomDivbRef = useRef();
    const bottomChildDivbRef = useRef();


    let isBottomViewOpen = false;
    let bottomViewY = 0;

    useEffect(() => {
        const titleDivY = titleDivbRef.current.getBoundingClientRect().bottom;
        const bottomDivY = bottomDivbRef.current.getBoundingClientRect().top;

        bottomViewY = titleDivY - bottomDivY;
    }, [titleDivbRef, bottomDivbRef])

    const bind = useGesture(({ down, delta, velocity }) => {
        velocity = clamp(velocity, 1, 1)

        //자식이 스크롤 가능할 때는 스크롤 못하게 처리
        const childScrollY = bottomChildDivbRef.current.scrollTop;


        if (!isScrollParent && delta[1] < 0 && childScrollY >= 0 && down) return
        if (!isScrollParent && delta[1] > 0 && childScrollY != 0) return
        if (delta[1] == 0) return

        if (!down && isBottomViewOpen) {


            if (childScrollY != 0) return


            if (delta[1] > -200) {


                isBottomViewOpen = false;
                isScrollParent = true;
                setIsScrollChild(false);

                set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })

                return
            }
            else {

                set({ xy: down ? delta : [0, bottomViewY], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
            }

        }

        if (delta[1] > -100) {

            let defaultLocation = [0, 0];

            if (isBottomViewOpen) {

                defaultLocation = [0, bottomViewY];
                delta[1] = delta[1] + bottomViewY;
            }

            if (!down && isBottomViewOpen) {

                if (delta[1] > -300) {
                    isBottomViewOpen = false;
                    defaultLocation = [0, 0];
                }
            }

            set({ xy: down ? delta : defaultLocation, config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
        }
        else {

            set({ xy: down ? delta : [0, bottomViewY], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })


            if (!down) {
                isBottomViewOpen = true;
                isScrollParent = false;
                setIsScrollChild(true);
            }
        }


    })

    const dispatch = useDispatch();

    //구독등록 페이지 열기
    const openSubscribePage = useCallback(async () => {

        dispatch(SubscribePageWrapOpenAction);
        dispatch(SubscribePageOpenAction);

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

    //소비분석 데이터
    useEffect(async () => {
        if (analysisList.length < 1) {

            //소비분석 리스트 조회
            const data = await customApiClient('get', '/subscribe/analysis');

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                return
            }

            console.log(data);
            //리덕스에 넣어주기
            dispatch({
                type: GetAnalyPageList,
                data: data.result
            })
        }
    }, [analysisList]);

    useEffect(async () => {

        console.log("reload : " + analysisReloadStatus)

        if (analysisReloadStatus) {

            //소비분석 리스트 조회
            const data = await customApiClient('get', '/subscribe/analysis');

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                return
            }

            console.log(data);
            //리덕스에 넣어주기
            dispatch({
                type: GetAnalyPageList,
                data: data.result
            })

            dispatch(AnalyPageReloadFalseAction);

        }

    }, [analysisReloadStatus]);

    return (
        <>
            <div className="page" style={{ display: "flex", flexDirection: "column", backgroundImage: `url(${backgroundImg})` }}>

                <div>
                    <div ref={titleDivbRef}>
                        <TopCard />
                    </div>

                    <ConsumCard />
                </div>
                <div style={{ flexGrow: "1", flexBasis: "0", zIndex: "20" }}>
                    <animated.div ref={bottomDivbRef} {...bind()} style={{ ...CardStyle, transform: xy.interpolate((x, y) => `translate3d(0,${y}px,0)`) }}>
                        <TitleWrap>
                            <div>구독내역</div>
                            <div onClick={openSubscribePage} style={{ position: "absolute", top: "50%", right: "20px", transform: "translate(0, -50%)" }}>+</div>
                        </TitleWrap>

                        <BottomChildWrap ref={bottomChildDivbRef} style={isScrollChild ? BottomChildOpenStyle : BottomChildCloseStyle}>
                            <BottomCard />
                            <div style={{ height: "1.25rem" }}></div>
                        </BottomChildWrap>
                    </animated.div>
                </div>

            </div>

            {/* 소비분석 페이지 */}
            <div style={openAnalyPageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openAnalyPageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <AnalysisPage />
                    </div>
                </Fade>
            </div>

            {/* 구독 등록 페이지 */}
            <div style={openSubscribePageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openSubscribePageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <SubscribePage />
                    </div>
                </Fade>
            </div>

            {/* 구독 수정 페이지 */}
            <div style={openEnrollmentRevisePageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openEnrollmentRevisePageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <EnrollmentRevisePage />
                    </div>
                </Fade>
            </div>

            {/* 알림 페이지 */}
            {/* <div style={openAlertPageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openAlertPageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#ffffff" }}>
                        <AlertPage />
                    </div>
                </Fade>
            </div> */}


        </>
    )
};


const TitleWrap = styled.div`
    position:relative;
    padding:0.9375rem 1.25rem 0.5rem 1.25rem;
`;

const BottomChildWrap = styled.div`
    height: 26.25rem;
    /* border: 1px solid black; */
    overflow-y: scroll;
`;

export default Main;