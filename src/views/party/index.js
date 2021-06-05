import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";

import Fade from 'react-reveal/Fade';


import icon_notion from "../../assets/party-notion.svg";
import duck_notion from "../../assets/duck-notion@3x.png";


import icon_arrow_gray from "../../assets/icon-arrow-right-gray.svg";
import duck_group from "../../assets/group-duck@2x.png";
import icon_arrow_black from "../../assets/icon-back-arrow-right.svg";
import icon_party_invite from "../../assets/party-invite.svg";
import PartyEnrollmentPage from './enrollment';


import { EnrollmentPageWrapOpenAction, EnrollmentPageOpenAction } from '../../reducers/party/enrollment';
import { InfoPageWrapOpenAction, InfoPageOpenAction } from '../../reducers/party/info';

import PartyInfoPage from './info';

const Party = () => {

    // const dispatch = useDispatch();


    // const {
    //     openEnrollmentPageWrapStatus,
    //     openEnrollmentPageStatus
    // } = useSelector(state => state.party.enrollment);

    // const {
    //     openInfoPageWrapStatus,
    //     openInfoPageStatus
    // } = useSelector(state => state.party.info);

    // const openEnrollmentPage = useCallback(() => {
    //     console.log("hihihihii")
    //     dispatch(EnrollmentPageWrapOpenAction);
    //     dispatch(EnrollmentPageOpenAction);
    // }, []);

    // const openInfoPage = useCallback(() => {
    //     console.log("hihihihii")
    //     dispatch(InfoPageWrapOpenAction);
    //     dispatch(InfoPageOpenAction);
    // }, []);

    return (
        <>
            <div className="page" style={{ backgroundColor: "#e3e3e3" }}>
                <PageWrap>

                    <div style={{ margin: '9rem 2rem 0 2rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', padding: '1.5rem 1.375rem', color: '#313131' }}>
                        <div className="spoqaBold" style={{ display: 'flex', fontSize: '1.375rem', marginBottom: '0.875rem' }}>
                            <div>
                                기능 업데이트 예정
                            </div>
                            <div style={{ marginLeft: '0.625rem' }}>
                                <img src={icon_notion} style={{ width: '1.5625rem', height: '1.4375rem', marginTop: '5px' }} />
                            </div>
                        </div>
                        <div className="notoRegular" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem', wordBreak: 'keep-all' }}>
                            모두가 새로운 기능을 선보이기 위해 열심히 준비 중에 있습니다. 많이 기대해주세요!
                        </div>
                    </div>
                    <div style={{ display: 'flex', margin: '0 2rem 1.4375rem 2rem' }}>
                        <div style={{ flexGrow: '1' }}></div>
                        <ChatArrow />
                        <div style={{ width: '4.9375rem' }}></div>
                    </div>

                    <img src={duck_notion} style={{ width: '17.75rem', marginLeft: '2.75rem' }} />



                    {/* 
                    <div style={{ display: 'flex' }}>
                        <div style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>파티</div>
                        <div style={{ flexGrow: '1' }}></div>
                        <div>
                            <img style={{ width: '1.25rem', height: '1rem' }} src={icon_party_invite} />
                        </div>
                    </div>

                    <div style={{ fontSize: '1.25rem', lineHeight: '2rem' }}>
                        <span style={{ color: '#ffbc26' }}>23개</span>의 파티가 <br />
                        파티원을 찾고 있어요!
                    </div>

                    <div style={{ zIndex: '100', position: 'relative', height: '60px' }}>
                        <img style={{ position: 'absolute', bottom: '-0.75rem', right: '0.875rem', width: '10.6875rem', height: '5.8125rem' }} src={duck_group} />
                    </div>

                    <div style={{ position: 'relative', height: '3.75rem', backgroundColor: '#ffca17', borderRadius: '0.4375rem', boxShadow: '0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.04)' }}>
                        <div style={{ position: 'absolute', left: '1.125rem', top: '50%', transform: 'translate(0,-50%)', fontSize: '0.875rem' }}>
                            파티 시작하기
                        </div>
                        <div onClick={openEnrollmentPage} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translate(0,-50%)', width: '1.5625rem', height: '1.5625rem', backgroundColor: 'rgba(49, 49, 49,0.08)', borderRadius: '50%' }}>
                            <img style={{ position: 'absolute', left: '48%', top: '48%', transform: 'translate(-48%,-48%)', width: '0.9375rem', height: '0.5625rem' }} src={icon_arrow_black} />
                        </div>
                    </div>

                    <div style={{ margin: '1.75rem 0 0.625rem 0', fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
                        나의 파티
                    </div>

                    <TableWrap>
                        <TableContent isActivate={true} onClick={openInfoPage}>
                            <TitleWrap>
                                <PlatformImg src='https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2Fnetflix.png?alt=media&token=96cf7411-2b79-4050-97cc-6ba683532b14' />
                                <ArrowIcon src={icon_arrow_gray} />
                            </TitleWrap>

                            <ContentName>
                                넷플릭스 프리미엄
                            </ContentName>
                            <ContentRole isHead={true}>
                                파티장
                            </ContentRole>
                        </TableContent>

                        <TableContent isActivate={false}>
                            <TitleWrap>
                                <PlatformImg src='https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2Fnetflix.png?alt=media&token=96cf7411-2b79-4050-97cc-6ba683532b14' />
                                <MatchingWrap>
                                    <div style={{ position: 'absolute', top: '55%', left: '50%', width: '3.125rem', transform: 'translate(-50%,-55%)', textAlign: 'center' }}>매칭중</div>
                                </MatchingWrap>
                                <ArrowIcon src={icon_arrow_gray} />
                            </TitleWrap>

                            <ContentName>
                                넷플릭스 프리미엄
                            </ContentName>
                            <ContentRole isHead={false}>
                                파티원
                            </ContentRole>
                        </TableContent>

                    </TableWrap> */}

                </PageWrap>
            </div>


            {/* 파티 등록 페이지 */}
            {/* <div style={openEnrollmentPageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openEnrollmentPageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#ffffff" }}>
                        <PartyEnrollmentPage />
                    </div>
                </Fade>
            </div> */}


            {/* 파티 상세 페이지 */}
            {/* <div style={openInfoPageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openInfoPageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#ffffff" }}>
                        <PartyInfoPage />
                    </div>
                </Fade>
            </div> */}

        </>
    )
};

const PageWrap = styled.div`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:2.9063rem;
`;

const ChatArrow = styled.div`
    width: 0px;height: 0px;
    border-top:0.6875rem solid #ffffff;
    border-bottom:0.6875rem solid transparent;
    border-right: 0.5313rem solid #ffffff;
    border-left: 0.5313rem solid transparent;
`;

const TableWrap = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;

    grid-column-gap: 0.625rem;
    grid-row-gap: 0.625rem;

    margin-bottom:1.25rem;
`;

const TableContent = styled.div`
    border-radius: 0.4375rem;
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
    background-color: #ffffff;

    opacity: ${props => props.isActivate ? '1' : '0.5'};
`;

const TitleWrap = styled.div`
    position:relative;
    display:flex;
    margin:1rem 0.9375rem 1.1875rem 0.9375rem;
`;
const PlatformImg = styled.img`
    width:2.3125rem;
    height:2.3125rem;
`;
const ArrowIcon = styled.img`
    position:absolute;
    top:0;
    right:0;
`;
const ContentName = styled.div`
    margin-left:0.9375rem;
    font-size:0.8125rem;
`;
const ContentRole = styled.div`
    margin-left:0.9375rem;
    margin-bottom:0.5625rem;

    font-size:0.75rem;
    color:#ffbc26;
    line-height:1.4375rem;

    color: ${props => props.isHead ? '#ffbc26' : '#313131'};
    opacity: ${props => props.isHead ? '1' : '0.4'};
`;

const MatchingWrap = styled.div`
    position:relative;

    width:3.125rem;
    height:1.4375rem;

    margin-left:1.4375rem;

    background-color: rgba(255, 202, 23,0.15);
    border-radius: 0.9688rem;

    font-size:0.75rem;
    color:#ffb40c;
`;

export default Party;