import React, { useState, useRef, useEffect } from 'react';

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

    const { openAnalyPageWrapStatus, openAnalyPageStatus } = useSelector(state => state.main);

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
    })

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
                            <div style={{ position: "absolute", top: "50%", right: "20px", transform: "translate(0, -50%)" }}>+</div>
                        </TitleWrap>

                        <BottomChildWrap ref={bottomChildDivbRef} style={isScrollChild ? BottomChildOpenStyle : BottomChildCloseStyle}>
                            <BottomCard />
                            <div style={{ height: "1.25rem" }}></div>
                        </BottomChildWrap>
                    </animated.div>
                </div>

            </div>
            <div style={openAnalyPageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openAnalyPageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <AnalysisPage />
                    </div>
                </Fade>
            </div>


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