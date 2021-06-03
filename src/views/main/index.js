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
import { useHistory } from 'react-router-dom';
import { BottomNavOpenAction } from '../../reducers/container/bottomNav';

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

            console.log(data);
            //리덕스에 넣어주기
            dispatch({
                type: GetAnalyPageList,
                data: data.result
            })

            // set({ xy: [0, 0] });

        }
    }, [analysisList]);

    useEffect(async () => {

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

            // set({ xy: [0, 0] });

        }

    }, [analysisReloadStatus]);

    useEffect(() => {
        dispatch(BottomNavOpenAction);

        const bottomDivHeight = titleDivbRef.current.getBoundingClientRect().height;
        const height = window.innerHeight || document.body.clientHeight;

        setBottomCardHeight(height - bottomDivHeight);

    }, []);

    return (
        <>
            <div className="page" style={{ display: "flex", flexDirection: "column", backgroundImage: `url(${backgroundImg})` }}>

                <div ref={bottomDivbRef}>
                    <div ref={titleDivbRef}>
                        <TopCard />
                    </div>

                    <ConsumCard />
                </div>
                <div style={{ flexGrow: "1", flexBasis: "0", zIndex: "20" }}>
                    <animated.div {...bind()} style={{ ...CardStyle, transform: xy.interpolate((x, y) => `translate3d(0,${y}px,0)`) }}>
                        <TitleWrap className="notoMedium">
                            <div>구독내역</div>
                            <div onClick={openSubscribePage} style={{ position: "absolute", top: "50%", right: "0px", transform: "translate(0, -50%)", width: '50px', paddingRight: '1.25rem', textAlign: 'right' }}>+</div>
                        </TitleWrap>

                        <BottomChildWrap height={bottomCardHeight} ref={bottomChildDivbRef} style={isScrollChild ? BottomChildOpenStyle : BottomChildCloseStyle}>
                            <BottomCard cardOpen={isScrollChild} />
                            <div style={{ height: "7.5rem" }}></div>
                        </BottomChildWrap>
                    </animated.div>
                </div>

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

export default Main;