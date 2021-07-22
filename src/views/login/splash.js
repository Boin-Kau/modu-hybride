import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { customApiClient } from '../../shared/apiClient';
import { BottomNavOpenAction, BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { useDispatch, useSelector } from "react-redux";
import { UserInfoUpdate } from '../../reducers/info/user';
import { checkMobile } from '../../App';


const Splash = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(async () => {

        const userPlatform = localStorage.getItem('userPlatform');

        if (userPlatform != 'android' && userPlatform != 'ios' && userPlatform != 'other') {
            localStorage.setItem('userPlatform', checkMobile());
        }

        const data = await customApiClient('get', '/user/jwt');

        //벨리데이션
        if (!data || data.statusCode != 200) {
            localStorage.removeItem('x-access-token');
            dispatch(BottomNavCloseAction);
            history.push('/login');
            return
        }

        dispatch({
            type: UserInfoUpdate,
            data: data.result
        })
        dispatch(BottomNavOpenAction);
        history.push('/main');
        return

    }, []);

    return (
        <>
            <div className="page" style={{ backgroundColor: "white" }}>

            </div>
        </>
    )
};


export default Splash;