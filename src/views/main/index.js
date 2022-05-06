import clamp from 'lodash-es/clamp';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import styled from "styled-components";
import { checkMobile, onClickTerminate } from '../../App';
import backgroundImg from '../../assets/back-money.svg';
import cardPlus from '../../assets/card-plus.svg';
import duck_see from "../../assets/duck-see.png";
import mainLoading from '../../assets/main-loading.gif';
import BottomCard from '../../components/main/bottomCard';
import ConsumCard from '../../components/main/consumCard';
import TopCard from '../../components/main/topCard';
import { PageTransContext } from '../../containers/pageTransContext';
import { BottomNavOpenAction } from '../../reducers/container/bottomNav';
import { AnalyPageReloadFalseAction, GetAnalyPageList } from '../../reducers/main/analysis';
import { CloseItemFalseAction } from '../../reducers/main/subscribe';
import { customApiClient } from '../../shared/apiClient';
import UpdatePopUp from '../popup/update';

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

let isScrollParent = true;
let isBottomViewOpen = false;

const Main = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //페이지 상태값
    const {
        analysisList,
        analysisReloadStatus
    } = useSelector(state => state.main.analysis);
    const {
        subscribeList,
        closeItemClick
    } = useSelector(state => state.main.subscribe);

    //페이지 전환
    const { setPageTrans } = useContext(PageTransContext);

    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))

    const [isScrollChild, setIsScrollChild] = useState(false);

    const [bottomCardHeight, setBottomCardHeight] = useState(0);

    const [subLoading, setSubLoading] = useState(true);
    const [analysisLoading, setAnalysisLoading] = useState(true);
    const [analysisReloadLoading, setAnalysisReloadLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const titleDivbRef = useRef();
    const bottomDivbRef = useRef();
    const bottomChildDivbRef = useRef();

    //강제 업데이트 팝업
    const [updatePopupStatus, setUpdatePopupStatus] = useState(false);

    //구독내역 하단 스크롤 배너 관련 함수
    const bind = useGesture(({ down, delta, velocity }) => {
        velocity = clamp(velocity, 1, 1);

        //자식이 스크롤 가능할 때는 스크롤 못하게 처리
        const childScrollY = bottomChildDivbRef.current.scrollTop;

        const titleDivY = titleDivbRef.current.getBoundingClientRect().bottom;
        const bottomDivY = bottomDivbRef.current.getBoundingClientRect().bottom;
        const bottomViewY = titleDivY - bottomDivY;

        //펼쳐지기전 아래로 당기기 금지
        // if (isScrollParent && delta[1] > 0) return

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

        }

        setAnalysisLoading(false);

    }, [analysisList]);

    // 소비분석 리로드 관련
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
        setAnalysisReloadLoading(false);

    }, [analysisReloadStatus]);

    //로딩 관리
    useEffect(() => {

        if (!subLoading && !analysisLoading && !analysisReloadLoading) {
            setTimeout(() => {
                setIsLoading(false);
            }, 350);
        }
        else {
            setIsLoading(true);
        }

    }, [subLoading, analysisLoading, analysisReloadLoading])

    //첫 랜더링시
    useEffect(async () => {
        dispatch(BottomNavOpenAction);

        const bottomDivHeight = titleDivbRef.current.getBoundingClientRect().height;
        const height = window.innerHeight || document.body.clientHeight;

        setBottomCardHeight(height - bottomDivHeight);

        const userPlatform = checkMobile();
        let platform = '';

        //fcm token
        if (!localStorage.getItem("isFcmLoad") || localStorage.getItem("isFcmLoad") != 'deactive') {

            localStorage.setItem('isFcmLoad', 'deactive');

            if (userPlatform == 'android') {

                platform = 'AOS';

                //splash close 함수 호출
                try {
                    window.android.closeSplash();
                }
                catch (err) {
                    console.log(err);
                }

                //업데이트되기전까지는 이 로직 사용 -> 업데이트 되고나서는 밑에 로직 사용
                let tokenTest = localStorage.getItem("fcmToken");
                if (tokenTest == undefined || tokenTest == 'undefined' || tokenTest.length == 0) tokenTest = null;
                if (!tokenTest) {
                    //fcm token 가져오기 함수
                    try {
                        const deviceToken = await window.android.getFcmToken();
                        localStorage.setItem('fcmToken', deviceToken);
                    }
                    catch (err) {
                        console.log(err);
                    }
                }

                // //fcm token 가져오기 함수
                // try {
                //     const deviceToken = await window.android.getFcmToken();
                //     localStorage.setItem('fcmToken', deviceToken);
                // }
                // catch (err) {
                //     console.log(err);
                // }

            }
            else if (userPlatform == 'ios') {

                platform = 'IOS';

                //splash close 함수 호출
                try {
                    window.webkit.messageHandlers.closeSplash.postMessage("hihi");
                }
                catch (err) {
                    console.log(err);
                }

                //fcm token 가져오기 함수
                try {
                    window.webkit.messageHandlers.getFcmToken.postMessage("hihi");
                }
                catch (err) {
                    console.log(err);
                }

            }
            else {
                platform = 'WEB';
                localStorage.setItem('fcmToken', null);
            }


            setTimeout(() => {

                let fcmToken = localStorage.getItem("fcmToken");

                if (!fcmToken || fcmToken == 'null' || fcmToken == undefined || fcmToken == 'undefined' || fcmToken.length == 0) fcmToken = null;

                //fcm 등록
                customApiClient('patch', '/user/fcm', {
                    fcmToken: fcmToken,
                    platform: platform,
                    type: "UPDATE"
                });

            }, 3000);

        }

        if (userPlatform == 'ios') {
            //IOS 배경색 설정
            try {
                window.webkit.messageHandlers.setColorMain.postMessage("hihi");
            }
            catch (err) {
            }
        }

        //앱 버전 체크
        const verson = localStorage.getItem('versonName');

        if (!verson || verson < '2.0.0') {
            if (process.env.NODE_ENV !== 'development') {
                setUpdatePopupStatus(true);
            }
        }

    }, []);

    //닫혀있을 때 내용물 클릭시 펼쳐지게 하기
    useEffect(() => {

        if (closeItemClick) {
            const titleDivY = titleDivbRef.current.getBoundingClientRect().bottom;
            const bottomDivY = bottomDivbRef.current.getBoundingClientRect().bottom;
            const bottomViewY = titleDivY - bottomDivY;

            set({ xy: [0, bottomViewY], config: { mass: 1, tension: 500 * 1, friction: 50 } })

            isBottomViewOpen = true;
            isScrollParent = false;
            setIsScrollChild(true);

            dispatch(CloseItemFalseAction);
        }

    }, [closeItemClick])


    //구독등록 페이지 열기
    const openSubscribePage = () => {
        setPageTrans('trans toRight');
        history.push('/subscribe');
    };

    return (
        <>
            <div className="page" style={{ display: "flex", flexDirection: "column", backgroundColor: '#FFCA17', backgroundSize: 'cover' }}>
                <img src={backgroundImg} alt="backgroundImg" style={{ position: 'absolute', width: '100vw' }} />
                <div id="back_link" onClick={onClickTerminate} style={{ display: 'none' }}></div>
                <div ref={bottomDivbRef} style={{ position: 'relative' }}>
                    <div ref={titleDivbRef}>
                        <TopCard />
                    </div>
                    <ConsumCard />
                    <div style={{ position: 'absolute', marginTop: '0.625rem', left: '0', right: '0', textAlign: 'center' }}>
                        <img src={duck_see} alt="duck_img" style={{ position: 'absolute', right: '0', top: '0', width: '38%' }} />
                    </div>
                </div>
                <div style={{ flexGrow: "1", flexBasis: "0", zIndex: "20" }}>
                    <animated.div {...bind()} style={{ ...CardStyle, transform: xy.interpolate((x, y) => `translate3d(0,${y}px,0)`) }}>
                        <TitleWrap className="notoMedium" style={{ paddingRight: '0' }}>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', position: 'relative', display: "flex" }}>
                                <div style={{ lineHeight: "1.4375rem" }}>구독내역</div>
                                <div style={{ fontSize: "0.75rem", color: "white", backgroundColor: "#ffca17", borderRadius: "0.75rem", marginLeft: "0.3438rem", padding: "0 0.5rem" }}>
                                    <div style={{ lineHeight: "1.4375rem" }}>{subscribeList.length || 0}개</div>
                                </div>
                                <div onClick={openSubscribePage} style={{ position: "absolute", top: "50%", right: "0px", transform: "translate(0, -50%)", width: '50px', paddingRight: '1.25rem', textAlign: 'right' }}>
                                    <img src={cardPlus} alt="pluse" style={{ width: '0.75rem', height: '0.75rem' }} />
                                </div>
                            </div>
                        </TitleWrap>

                        <BottomChildWrap height={bottomCardHeight} ref={bottomChildDivbRef} style={isScrollChild ? BottomChildOpenStyle : BottomChildCloseStyle}>
                            <BottomCard cardOpen={isScrollChild} loadingFalse={() => { setSubLoading(false); }} />
                            <div style={{ height: "7.5rem" }}></div>
                        </BottomChildWrap>
                    </animated.div>
                </div>

                <MainLoading isLoading={isLoading} style={{ background: `#ffca17 url(${mainLoading}) no-repeat top center`, backgroundSize: '100% auto' }} />
            </div>

            {/* 업데이트 팝업 */}
            <UpdatePopUp openStatus={updatePopupStatus} />
        </>
    )
};


export const TitleWrap = styled.div`
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