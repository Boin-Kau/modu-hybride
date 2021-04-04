import React from 'react';

import styled from "styled-components";


import { LoginButton, LoginInput } from '../../styled/shared';

const Login = () => {

    return (
        <>
            <div className="page" style={{ backgroundColor: "#ffffff", position: 'relative' }}>
                <TitleTextWrap>
                    이름을<br />
                    알려주세요.
                </TitleTextWrap>
                <ContentWrap>
                    <LoginInput placeholder="이름" />
                </ContentWrap>

                <LoginButton>
                    다음
                </LoginButton>
            </div>
        </>
    )
};

const TitleTextWrap = styled.div`
    padding-top:3.5rem;
    margin: 0 0 3.0625rem 1.25rem;

    font-size:1.25rem;
    line-height:1.9375rem;

    color:#313131;
`;

const ContentWrap = styled.div`
    display:flex;
    flex-direction:row;
    padding: 0 1.25rem;
`;

export default Login;