import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { customApiClient } from '../../shared/apiClient';
import { BottomNavOpenAction, BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { useDispatch } from "react-redux";
import { UserInfoUpdate } from '../../reducers/info/user';
import { checkMobile } from '../../App';


const Splash = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(async () => {

        localStorage.removeItem('isFcmLoad');

        let localFcm = localStorage.getItem("fcmToken");
        if (localFcm == undefined || localFcm == 'undefined' || localFcm.length == 0) localFcm = null;

        const current_user_platform = checkMobile();

        //fcm token 가져오기 -> 앱 업데이트 되면 주석처리
        if (current_user_platform == 'android' && !localFcm) {

            try {
                const fcmToken = await window.android.getFcmToken();
                localStorage.setItem('fcmToken', fcmToken);
            }
            catch (err) {
                console.log(err);
            }

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