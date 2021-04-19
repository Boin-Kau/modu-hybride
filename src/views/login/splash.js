import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { customApiClient } from '../../shared/apiClient';
import { BottomNavOpenAction, BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { useDispatch, useSelector } from "react-redux";


const Splash = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

        setTimeout(async () => {

            const data = await customApiClient('get', '/user/jwt');

            console.log(data);

            //벨리데이션
            if (!data || data.statusCode != 200) {
                localStorage.removeItem('x-access-token');
                dispatch(BottomNavCloseAction);
                history.push('/login');
                return
            }

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