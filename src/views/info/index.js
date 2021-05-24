import React from 'react';
import styled from 'styled-components';

import icon_setting from "../../assets/icon-setting.svg";
import icon_profile from "../../assets/duck-profile.svg";
import icon_arrow_right from "../../assets/icon-arrow-right-gray.svg";
import DetailPage from './detail';
import Fade from 'react-reveal/Fade';
import SettingPage from './setting';
import QuestionPage from './question';
import NoticePage from './notice';

const Info = () => {

    return (
        <>
            <div className="page" style={{ backgroundColor: "#ffffff" }}>
                <PageWrap>

                    <div style={{ display: 'flex', margin: '0.875rem 1.25rem 1.625rem 1.25rem' }}>
                        <div style={{ flexGrow: '1', fontSize: '0.875rem', lineHeight: '1.4375rem' }}>마이페이지</div>
                        <div style={{ marginTop: '0.125rem' }}>
                            <img src={icon_setting} style={{ width: '1rem', height: '1rem' }} />
                        </div>
                    </div>


                    <div style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)', margin: '0 0 0.8125rem 1.25rem' }}>내정보</div>

                    <InfoWrap>
                        <img style={{ width: '2.9375rem', height: '2.9375rem' }} src={icon_profile} />
                        <div style={{ marginLeft: "0.6875rem", flexGrow: '1' }}>
                            <div style={{ fontSize: '0.875rem', margin: '0.25rem 0' }}>신민재</div>
                            <div style={{ fontSize: '0.6875rem', lineHeight: '1.3125rem', opacity: '0.4' }}>신민재#1234</div>
                        </div>
                        <div style={{ marginTop: '0.25rem' }}>
                            <img src={icon_arrow_right} style={{ width: '0.4375rem', height: '0.625rem' }} />
                        </div>
                    </InfoWrap>


                    <TitelWrap>고객센터</TitelWrap>
                    <ContentWrap>공지사항</ContentWrap>
                    <ContentWrap>문의하기</ContentWrap>
                    <ContentWrap>이용 약관</ContentWrap>
                    <ContentWrap>개인정보 처리방침</ContentWrap>

                </PageWrap>
            </div>


            {/* 내정보 상세 페이지 */}
            <div style={false ? { display: "block" } : { display: "none" }}>
                <Fade right when={false} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <DetailPage />
                    </div>
                </Fade>
            </div>

            {/* 설정 페이지 */}
            <div style={false ? { display: "block" } : { display: "none" }}>
                <Fade right when={false} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <SettingPage />
                    </div>
                </Fade>
            </div>

            {/* 공지사항 페이지 */}
            <div style={false ? { display: "block" } : { display: "none" }}>
                <Fade right when={false} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <NoticePage />
                    </div>
                </Fade>
            </div>

            {/* 문의하기 페이지 */}
            <div style={false ? { display: "block" } : { display: "none" }}>
                <Fade right when={false} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#f7f7f7" }}>
                        <QuestionPage />
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