import React from 'react';


import clamp from 'lodash-es/clamp'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-with-gesture'

//여기서 분기처리를 해줘야할 것 같은데 ??

const Main = () => {

    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
    const bind = useGesture(({ down, delta, velocity }) => {
        velocity = clamp(velocity, 1, 8)
        set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
    })

    return (
        <>
            <div>Main</div>
            <animated.div {...bind()} style={{ transform: xy.interpolate((x, y) => `translate3d(0,${y}px,0)`), width: '100%', height: '100px', backgroundColor: 'red' }} />

        </>
    )
};


export default Main;