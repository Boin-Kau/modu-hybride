import React, { useState, useRef, useEffect, useCallback } from 'react';

import clamp from 'lodash-es/clamp'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-with-gesture'

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";


import backgroundImg from '../../assets/group-2.svg';
import mainLoading from '../../assets/main-loading.gif';

import BottomCard from '../../components/main/bottomCard';
import TopCard from '../../components/main/topCard';
import ConsumCard from '../../components/main/consumCard';

import { customApiClient } from '../../shared/apiClient';
import { GetAnalyPageList, AnalyPageReloadFalseAction } from '../../reducers/main/analysis';
import { useHistory } from 'react-router-dom';
import { BottomNavOpenAction } from '../../reducers/container/bottomNav';

import { onClickTerminate } from '../../App';

const CardStyle = {
    height: '100vh',
    backgroundColor: '#f7f7f7',
    borderRadius: "0.4375rem",
    boxShadow: "0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.15)"
}

const BottomChildOpenStyle = {
    overflowY: "scroll"
}
const BottomChildCloseStyle = {
    overflowY: "hidden"
}

const Main = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //페이지 상태값
    const {
        analysisList,
        analysisReloadStatus
    } = useSelector(state => state.main.analysis);

    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))

    const [isScrollChild, setIsScrollChild] = useState(false);

    const [bottomCardHeight, setBottomCardHeight] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    const titleDivbRef = useRef();
    const bottomDivbRef = useRef();
    const bottomChildDivbRef = useRef();

    let isScrollParent = true;
    let isBottomViewOpen = false;

    const bind = useGesture(({ down, delta, velocity }) => {
        velocity = clamp(velocity, 1, 1);

        //자식이 스크롤 가능할 때는 스크롤 못하게 처리
        const childScrollY = bottomChildDivbRef.current.scrollTop;

        const titleDivY = titleDivbRef.current.getBoundingClientRect().bottom;
        const bottomDivY = bottomDivbRef.current.getBoundingClientRect().bottom;
        const bottomViewY = titleDivY - bottomDivY;

        if (!isScrollParent && delta[1] < 0 && childScrollY >= 0 && down) {
            return
        }
        if (!isScrollParent && delta[1] > 0 && childScrollY != 0) {
            return
        }

        //사파리 스크롤 가속도 처리
        if (!isScrollParent && delta[1] > 0 && childScrollY == 0) {
            setIsScrollChild(false);
        }
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

    //구독등록 페이지 열기
    const openSubscribePage = () => {

        history.push('/subscribe');

    };

    // 소비분석 데이터
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

            //리덕스에 넣어주기
            dispatch({
                type: GetAnalyPageList,
                data: data.result
            })

            // set({ xy: [0, 0] });

        }

        // setIsLoading(false);

    }, [analysisList]);

    useEffect(async () => {

        if (analysisReloadStatus) {

            setIsLoading(true);

            //소비분석 리스트 조회
            const data = await customApiClient('get', '/subscribe/analysis');

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                return
            }

            //리덕스에 넣어주기
            dispatch({
                type: GetAnalyPageList,
                data: data.result
            })

            dispatch(AnalyPageReloadFalseAction);

            // set({ xy: [0, 0] });
        }

        // setIsLoading(false);

    }, [analysisReloadStatus]);

    useEffect(() => {
        dispatch(BottomNavOpenAction);

        const bottomDivHeight = titleDivbRef.current.getBoundingClientRect().height;
        const height = window.innerHeight || document.body.clientHeight;

        setBottomCardHeight(height - bottomDivHeight);

        setTimeout(() => {
            setIsLoading(false);
        }, 350)


        //fcm token
        let fcmToken = localStorage.getItem("fcmToken");
        if (fcmToken == undefined || fcmToken == 'undefined' || fcmToken.length == 0) fcmToken = null;

        if (!fcmToken) {
            setTimeout(() => {

                fcmToken = localStorage.getItem("fcmToken");
                if (fcmToken == undefined || fcmToken == 'undefined' || fcmToken.length == 0) fcmToken = null;

                //fcm 등록
                customApiClient('patch', '/user/fcm', {
                    fcmToken: fcmToken
                });

            }, 1500)
        }

        //fcm 등록
        customApiClient('patch', '/user/fcm', {
            fcmToken: fcmToken
        });

        //IOS 배경색 설정
        try {
            window.webkit.messageHandlers.setColorMain.postMessage("hihi");
        }
        catch (err) {
        }

    }, []);


    return (
        <>
            <div className="page" style={{ display: "flex", flexDirection: "column", background: `#ffca17 url(${backgroundImg}) no-repeat top center`, backgroundSize: 'cover' }}>
                <div id="back_link" onClick={onClickTerminate} style={{ display: 'none' }}></div>
                <div ref={bottomDivbRef}>
                    <div ref={titleDivbRef}>
                        <TopCard />
                    </div>

                    <ConsumCard />
                </div>
                <div style={{ flexGrow: "1", flexBasis: "0", zIndex: "20" }}>
                    <animated.div {...bind()} style={{ ...CardStyle, transform: xy.interpolate((x, y) => `translate3d(0,${y}px,0)`) }}>
                        <TitleWrap className="notoMedium" style={{ paddingRight: '0' }}>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', position: 'relative' }}>구독내역
                                <div onClick={openSubscribePage} style={{ position: "absolute", top: "50%", right: "0px", transform: "translate(0, -50%)", width: '50px', paddingRight: '1.25rem', textAlign: 'right' }}>+</div>
                            </div>
                        </TitleWrap>

                        <BottomChildWrap height={bottomCardHeight} ref={bottomChildDivbRef} style={isScrollChild ? BottomChildOpenStyle : BottomChildCloseStyle}>
                            <BottomCard cardOpen={isScrollChild} />
                            <div style={{ height: "7.5rem" }}></div>
                        </BottomChildWrap>
                    </animated.div>
                </div>

                <MainLoading isLoading={isLoading} style={{ background: `#ffca17 url(${mainLoading}) no-repeat top center`, backgroundSize: '100% auto' }} />
            </div>
        </>
    )
};


const TitleWrap = styled.div`
    position:relative;
    padding:0.9375rem 1.25rem 0.5rem 1.25rem;
`;

const BottomChildWrap = styled.div`
    height: ${props => props.height}px;
    overflow-y: scroll;
    -webkit-overflow-scrolling:auto;
`;

const MainLoading = styled.div`
    visibility:${props => props.isLoading ? 'visible' : 'hidden'};
    opacity:${props => props.isLoading ? '1' : '0'};

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;

    border:'1px solid red';

    background-repeat:no-repeat;

    /* 애니메이션 적용 */
    transition: visibility 0.1s, opacity 0.1s linear;
`;
export default Main;