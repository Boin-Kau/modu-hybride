import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import icon_back from "../../../assets/icon-back-arrow.svg";
import { PageTransContext } from '../../../containers/pageTransContext';
import { customApiClient } from '../../../shared/apiClient';
import { GAEventSubmit, GA_CATEOGRY, GA_SYSTEM_ACTION } from '../../../shared/gaSetting';
import '../../../styled/css/textEditer.css';
import { TextMiddle } from '../../../styled/shared';

const NoticeDetailPage = ({ location }) => {

    const history = useHistory();

    //context
    const { setPageTrans } = useContext(PageTransContext);

    const [noticeDetail, setNoticeDetail] = useState({
        title: '',
        content: '',
        createdAt: ''
    });

    useEffect(async () => {

        if (location) {
            const idx = location.state.idx;

            //공지사항 상세 조회
            const data = await customApiClient('get', `/user/notice/${idx}`);

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                return
            }

            setNoticeDetail(data.result);
            GAEventSubmit(GA_CATEOGRY.SYSTEM, GA_SYSTEM_ACTION.NOTICE);
        }


    }, [])

    const closePage = useCallback(() => {
        setPageTrans('trans toLeft');
        history.goBack();
    }, []);

    return (

        <div className="page">
            <PageWrap>
                <HeaderWrap id="back_link" className="spoqaBold" onClick={closePage}>
                    <div className="back_link_sub" style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>상세보기</TextMiddle>
                </HeaderWrap>
                <div style={{ padding: '0 1.25rem 0 1.25rem' }}>
                    <div style={{ padding: '0.9688rem 0 1.0313rem 0', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                        <div className="spoqaBold" style={{ fontSize: '0.875rem', marginBottom: '0.3125rem' }}>
                            {noticeDetail.title}
                        </div>
                        <div className="notoMedium" style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                            {noticeDetail.createdAt.substr(0, 10)}
                        </div>
                    </div>
                    <div className="notoRegular ql-editor" dangerouslySetInnerHTML={{ __html: noticeDetail.content }} style={{ marginTop: '0.9688rem', fontSize: '0.8125rem', lineHeight: '1.3125rem', wordBreak: 'keep-all' }} />
                </div>
            </PageWrap>

        </div >
    )
};

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



export default NoticeDetailPage;