import React from 'react';
import styled from 'styled-components';

import icon_setting from "../../assets/icon-setting.svg";

const Info = () => {

    return (
        <>
            <div className="page" style={{ backgroundColor: "#ffffff" }}>
                <PageWrap>

                    <InfoWrap>
                        <img style={{ width: '2.9375rem', height: '2.9375rem' }} />
                        <div style={{ marginLeft: "0.6875rem", flexGrow: '1' }}>
                            <div style={{ fontSize: '1.0625rem', margin: '0.1875rem 0' }}>신민재</div>
                            <div style={{ fontSize: '0.6875rem', lineHeight: '1.3125rem', opacity: '0.4' }}>신민재#1234</div>
                        </div>
                        <div style={{ paddingLeft: '0.625rem' }}>
                            <img src={icon_setting} style={{ width: '1rem', height: '1rem' }} />
                        </div>
                    </InfoWrap>

                    <div style={{ height: '0.5rem', backgroundColor: '#f7f7f7', borderRadius: '0.25rem' }}></div>

                    <TitelWrap>내 정보</TitelWrap>
                    <ContentWrap>계정 관리</ContentWrap>
                    <ContentWrap>결제 정보 관리</ContentWrap>

                    <div style={{ height: '0.5rem', backgroundColor: '#f7f7f7', borderRadius: '0.25rem' }}></div>

                    <TitelWrap>고객센터</TitelWrap>
                    <ContentWrap>공지사항</ContentWrap>
                    <ContentWrap>문의하기</ContentWrap>
                    <ContentWrap>이용 약관</ContentWrap>
                    <ContentWrap>개인정보 처리방침</ContentWrap>

                </PageWrap>
            </div>

        </>
    )
};


const PageWrap = styled.div`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:2.9063rem;

    overflow-y:scroll;


    color:#313131;
`;


const InfoWrap = styled.div`

    display:flex;

    margin:2.5625rem 1.25rem 2.25rem 1.25rem;
`;


const TitelWrap = styled.div`
    margin: 1.0625rem 1.25rem 1.9375rem 1.25rem;
    font-size:0.75rem;
    line-height:1.3125rem;
    opacity:0.4;
`;

const ContentWrap = styled.div`
    margin:0 1.25rem 1.9375rem 1.25rem;
    font-size:0.8125rem;
`;


export default Info;