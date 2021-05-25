import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AlertPageWrapCloseAction, AlertPageCloseAction } from "../../../reducers/main/alert";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_profile from "../../../assets/duck-profile.svg";
import icon_info from "../../../assets/info-black-192-x-192@3x.png";

import { TextMiddle } from '../../../styled/shared';

import Fade from 'react-reveal/Fade';
import NoticeDetailPage from './detail';
import { PageClose, PageWrapClose, PageWrapOpen, PageOpen } from '../../../reducers/info/page';

const NoticePage = () => {

    const dispatch = useDispatch();

    //페이지 상태값
    const {
        openNoticeDetailPageWrapStatus,
        openNoticeDetailPageStatus
    } = useSelector(state => state.info.page);

    const closePage = useCallback(() => {
        dispatch({
            type: PageClose,
            data: 'notice'
        });

        setTimeout(() => {
            dispatch({
                type: PageWrapClose,
                data: 'notice'
            });
        }, 300)
    }, []);

    //페이지 열기
    const openPage = useCallback(async (data) => {

        dispatch({
            type: PageWrapOpen,
            data: data
        });
        dispatch({
            type: PageOpen,
            data: data
        });

    }, []);



    return (

        <>
            <PageWrap>
                <HeaderWrap onClick={closePage}>
                    <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>공지사항</TextMiddle>
                </HeaderWrap>
                <div onClick={() => { openPage('noticeDetail') }} style={{ padding: '0 1.25rem 0 1.25rem' }}>

                    <div style={{ padding: '0.9688rem 0 1.0313rem 0', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                        <div style={{ fontSize: '0.8125rem', marginBottom: '0.3125rem' }}>
                            모두가 개편되었습니다!
                        </div>
                        <div style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                            2021.05.16
                        </div>
                    </div>

                </div>
            </PageWrap>


            {/* 이름 변경 페이지 */}
            <div style={openNoticeDetailPageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openNoticeDetailPageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <NoticeDetailPage />
                    </div>
                </Fade>
            </div>

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



export default NoticePage;