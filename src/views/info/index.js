import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import icon_setting from "../../assets/icon-setting.svg";
import icon_profile from "../../assets/duck-profile.svg";
import icon_arrow_right from "../../assets/icon-arrow-right-gray.svg";
import Fade from 'react-reveal/Fade';
import SettingPage from './setting';
import AgreePage from './agree';
import QuestionPage from './question';
import { useSelector, useDispatch } from 'react-redux';
import { PageWrapOpen, PageOpen, AgreePageKind } from '../../reducers/info/page';
import { useHistory, Link } from 'react-router-dom';
import { BottomNavOpenAction } from '../../reducers/container/bottomNav';
import { onClickTerminate } from '../../App';

const Info = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //페이지 상태값
    const {
        openSettingPageWrapStatus,
        openSettingPageStatus,

        openQuestionPageWrapStatus,
        openQuestionPageStatus,

        openAgreePageWrapStatus,
        openAgreePageStatus
    } = useSelector(state => state.info.page);

    const {
        name,
        uniqueNumber
    } = useSelector(state => state.info.user);

    //페이지 열기
    const openPage = useCallback(async (data) => {

        test = true;

        dispatch({
            type: PageWrapOpen,
            data: data
        });
        dispatch({
            type: PageOpen,
            data: data
        });

    }, []);

    //약관 동의 페이지 열기
    const openAgreePage = useCallback(async (data, title) => {

        test = true;

        dispatch({
            type: AgreePageKind,
            data: title
        })

        dispatch({
            type: PageWrapOpen,
            data: data
        });
        dispatch({
            type: PageOpen,
            data: data
        });

    }, []);

    //내정보 디테일
    const openDetailPage = () => {
        history.push('/info/detail');
    }

    useEffect(() => {
        dispatch(BottomNavOpenAction);

        //IOS 배경색 설정
        try {
            window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
        }
        catch (err) {
        }

    }, [])


    return (
        <>
            <div className="page" style={{ backgroundColor: "#ffffff" }}>
                <PageWrap>

                    <div id="back_link" onClick={onClickTerminate} style={{ display: 'none' }}></div>


                    <div className="spoqaBold" style={{ display: 'flex', margin: '0.875rem 1.25rem 1.625rem 1.25rem' }}>
                        <div style={{ flexGrow: '1', fontSize: '0.875rem', lineHeight: '1.4375rem' }}>마이페이지</div>
                        <div onClick={() => { openPage('setting') }} style={{ marginTop: '0.125rem' }}>
                            <img src={icon_setting} style={{ width: '1rem', height: '1rem' }} />
                        </div>
                    </div>


                    <div className="notoMedium" style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)', margin: '0 0 0.8125rem 1.25rem' }}>내정보</div>

                    <InfoWrap onClick={openDetailPage}>
                        <img style={{ width: '2.9375rem', height: '2.9375rem' }} src={icon_profile} />
                        <div style={{ marginLeft: "0.6875rem", flexGrow: '1' }}>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', margin: '0.25rem 0' }}>{name}</div>
                            <div className="notoMedium" style={{ fontSize: '0.6875rem', lineHeight: '1.3125rem', opacity: '0.4' }}>고유번호 #{uniqueNumber}</div>
                        </div>
                        <div style={{ marginTop: '0.25rem' }}>
                            <img src={icon_arrow_right} style={{ width: '0.4375rem', height: '0.625rem' }} />
                        </div>
                    </InfoWrap>


                    <TitelWrap className="notoMedium">고객센터</TitelWrap>
                    <Link to='/notice' style={{ textDecoration: 'none' }}>
                        <ContentWrap className="spoqaBold" style={{ color: 'rgb(49,49,49)' }}>공지사항</ContentWrap>
                    </Link>
                    <ContentWrap className="spoqaBold" onClick={() => { openPage('question') }}>문의하기</ContentWrap>
                    <ContentWrap className="spoqaBold" onClick={() => { openAgreePage('agree', 'serviceDetail') }}>이용 약관</ContentWrap>
                    <ContentWrap className="spoqaBold" onClick={() => { openAgreePage('agree', 'personDetail') }}>개인정보 처리방침</ContentWrap>

                </PageWrap>
            </div>

            {/* 설정 페이지 */}
            <div style={openSettingPageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openSettingPageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <SettingPage />
                    </div>
                </Fade>
            </div>

            {/* 문의하기 페이지 */}
            <div style={openQuestionPageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openQuestionPageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <QuestionPage />
                    </div>
                </Fade>
            </div>

            {/* 약관 페이지 */}
            <div style={openAgreePageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openAgreePageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <AgreePage />
                    </div>
                </Fade>
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

    margin:0 1.25rem 2rem 1.25rem;

    padding:0.75rem 1rem 0.875rem 0.75rem;
    border-radius:0.4375rem;

    background-color:#f7f7f7;
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