import React, { useState } from 'react';

import clamp from 'lodash-es/clamp'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-with-gesture'

import backgroundImg from '../../assets/group-2.svg'

const Main = () => {

    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))


    let isBottomViewOpen = false;
    const bottomViewY = -400;

    const bind = useGesture(({ down, delta, velocity }) => {
        velocity = clamp(velocity, 1, 8)

        if (delta[1] == 0) return


        if (!down && isBottomViewOpen) {

            if (delta[1] > -300) {

                isBottomViewOpen = false;
                set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })

                return
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
                isBottomViewOpen = true
            }
        }


    })

    return (
        <>
            <div className="page" style={{ display: "flex", flexDirection: "column", backgroundImage: `url(${backgroundImg})` }}>

                <div style={{ flexGrow: "1" }}></div>
                <div style={{ height: "9.8125rem" }}>


                    <animated.div {...bind()} style={{ transform: xy.interpolate((x, y) => `translate3d(0,${y}px,0)`), width: '100%', height: '200vh', backgroundColor: '#f7f7f7', borderRadius: "0.2188rem" }} />

                </div>

            </div>

        </>
    )
};


export default Main;