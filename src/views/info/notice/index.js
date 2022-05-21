import React, { useEffect, useContext, useState } from 'react';
import styled from "styled-components";

import { useDispatch } from "react-redux";
import icon_back from "../../../assets/icon-back-arrow.svg";
import { TextMiddle } from '../../../styled/shared';

import { useHistory } from 'react-router-dom';
import { BottomNavCloseAction } from '../../../reducers/container/bottomNav';
import { PageTransContext } from '../../../containers/pageTransContext';
import { customApiClient } from '../../../shared/apiClient';

const NoticePage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //context
    const { setPageTrans } = useContext(PageTransContext);

    const [notice, setNotice] = useState([]);

    const closePage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    };

    //페이지 열기
    const openPage = (idx) => {

        setPageTrans('trans toRight');
        history.push({
            pathname: '/notice/detail',
            state: {
                idx
            }
        })

    };

    useEffect(async () => {
        dispatch(BottomNavCloseAction);

        //공지사항 리스트 조회
        const data = await customApiClient('get', '/user/notice');

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode != 200) {
            return
        }

        setNotice(data.result);

    }, [])


    return (

        <div className="page">
            <PageWrap>
                <HeaderWrap className="spoqaBold" onClick={closePage}>
                    <div id="back_link" style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>공지사항</TextMiddle>
                </HeaderWrap>

                {/* 새부내용 */}
                {
                    notice.map((value) => {
                        return (
                            <NoticeContent title={value.title} createdAt={value.createdAt} action={() => { openPage(value.idx) }} key={value.idx} />
                        )
                    })
                }
            </PageWrap>

        </div>
    )
};


const NoticeContent = (props) => {
    return (
        <div className="notoMedium" onClick={props.action} style={{ padding: '0 1.25rem 0 1.25rem' }}>

            <div style={{ padding: '0.9688rem 0 1.0313rem 0', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '0.8125rem', marginBottom: '0.3125rem' }}>
                    {props.title}
                </div>
                <div style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                    {props.createdAt.substr(0, 10)}
                </div>
            </div>

        </div>
    )
}

const PageWrap = styled.div`

    position:absolute;
    top:3.0625rem;
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

    height:3.0625rem;

    background-color:#ffffff;
    text-align:center;

    font-size:0.875rem;
    color:#313131;
`;



export default NoticePage;