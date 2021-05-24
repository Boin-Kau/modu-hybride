import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AlertPageWrapCloseAction, AlertPageCloseAction } from "../../../reducers/main/alert";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_profile from "../../../assets/duck-profile.svg";
import icon_info from "../../../assets/info-black-192-x-192@3x.png";

import { TextMiddle } from '../../../styled/shared';

import Fade from 'react-reveal/Fade';

const NoticeDetailPage = () => {

    const dispatch = useDispatch();

    const closeAlertPage = useCallback(() => {
        dispatch(AlertPageCloseAction);

        setTimeout(() => {
            dispatch(AlertPageWrapCloseAction);
        }, 300)
    }, []);



    return (

        <>
            <PageWrap>
                <HeaderWrap onClick={closeAlertPage}>
                    <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>상세보기</TextMiddle>
                </HeaderWrap>
                <div style={{ padding: '0 1.25rem 0 1.25rem' }}>

                    <div style={{ padding: '0.9688rem 0 1.0313rem 0', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                        <div style={{ fontSize: '0.875rem', marginBottom: '0.3125rem' }}>
                            모두가 개편되었습니다!
                        </div>
                        <div style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                            2021.05.16
                        </div>
                    </div>

                    <div style={{ marginTop: '0.9688rem', fontSize: '0.8125rem', lineHeight: '1.3125rem', wordBreak: 'keep-all' }}>
                        늘 모두를 사용해주시는 사용자 여러분들께 감사드립니다. <br />
                        모두가 더 좋은 서비스를 제공하기위해 개편되었습니다! <br />
                        <br />
                        [개편 내용]<br />
                        - 전체적으로 모두의 인터페이스 개선<br />
                        - 브랜드 리뉴얼<br />
                        <br />
                        그리고 모두의 새 마스코트 구덕(GUDUCK)도 앞으로 많이 사랑해주세요! 감사합니다. 😀
                    </div>

                </div>
            </PageWrap>

        </>
    )
};

const PageWrap = styled.div`

    position:absolute;
    top:2.5625rem;
    left:0;
    right:0;
    bottom:0;

    display:flex;
    flex-direction:column;

    overflow-y:scroll;

    background-color: #ffffff;
`;
const HeaderWrap = styled.div`
    position: fixed;
    top:0;
    left:0;
    right:0;

    height:2.5625rem;

    background-color:#ffffff;
    text-align:center;

    font-size:0.875rem;
    color:#313131;
    
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;



export default NoticeDetailPage;