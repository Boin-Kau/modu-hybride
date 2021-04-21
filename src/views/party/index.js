import React from 'react';
import styled from 'styled-components';

import icon_arrow_gray from "../../assets/icon-arrow-right-gray.svg";


const Party = () => {

    return (
        <>
            <div className="page" style={{ backgroundColor: "#f7f7f7" }}>
                <PageWrap>

                    <div style={{ display: 'flex' }}>
                        <div style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>파티</div>
                        <div style={{ flexGrow: '1' }}></div>
                        <div>

                        </div>
                    </div>

                    <div style={{ fontSize: '1.25rem', lineHeight: '2rem' }}>
                        <span style={{ color: '#ffbc26' }}>23개</span>의 파티가 <br />
                        파티원을 찾고 있어요!
                    </div>

                    <div style={{ border: '1px solid red', height: '60px' }}></div>

                    <div style={{ position: 'relative', height: '3.75rem', backgroundColor: '#ffca17', borderRadius: '0.4375rem', boxShadow: '0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.04)' }}>
                        <div style={{ position: 'absolute', left: '1.125rem', top: '50%', transform: 'translate(0,-50%)', fontSize: '0.875rem' }}>
                            파티 시작하기
                        </div>
                    </div>

                    <div style={{ margin: '1.75rem 0 0.625rem 0', fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
                        나의 파티
                    </div>

                    <TableWrap>
                        <TableContent isActivate={true}>
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

                    </TableWrap>

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

    padding:2.375rem 1.25rem 0 1.25rem;


    color:#313131;
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