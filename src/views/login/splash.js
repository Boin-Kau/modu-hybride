import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { customApiClient } from '../../shared/apiClient';
import { BottomNavOpenAction, BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { useDispatch, useSelector } from "react-redux";
import { UserInfoUpdate } from '../../reducers/info/user';


const Splash = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

        setTimeout(async () => {

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

        }, 1000)

    }, []);

    return (
        <>
            <div className="page" style={{ backgroundColor: "red" }}>스플레시 페이지</div>
        </>
    )
};


export default Splash;