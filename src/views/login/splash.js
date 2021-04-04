import React from 'react';
import { useHistory } from 'react-router-dom';


const Splash = () => {

    const history = useHistory();

    setTimeout(() => {
        history.push('/login');
        // window.location.href = '/main';
    }, 100)

    return (
        <>
            <div className="page" style={{ backgroundColor: "red" }}>스플레시 페이지</div>
        </>
    )
};


export default Splash;