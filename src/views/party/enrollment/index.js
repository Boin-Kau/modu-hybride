import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";


import icon_back from "../../../assets/icon-back-arrow.svg";
import party_notice_icon from "../../../assets/party-notice-icon.svg";
import icon_info from "../../../assets/party-icon-info@2x.png";

import crown_fill from "../../../assets/crown-fill.svg";
import crown_none from "../../../assets/crown-none.svg";
import user_fill from "../../../assets/user-fill.svg";
import user_none from "../../../assets/user-none.svg";

import party_netflix from "../../../assets/party-netflix.svg";
import party_whatcha from "../../../assets/party-whatcha.svg";
import party_wave from "../../../assets/party-wave.svg";

import icon_party_time from "../../../assets/party-time-icon.svg";

import check_icon from "../../../assets/card-check-icon.svg";

import match_personal_icon from "../../../assets/match-personal-icon.svg";
import match_auto_icon from "../../../assets/match-auto-icon.svg";


import { TextMiddle, LoginButton } from '../../../styled/shared';
import { EnrollmentPageCloseAction, EnrollmentPageWrapCloseAction } from '../../../reducers/party/enrollment';
import CardList from '../../../components/party/CardList';


const PartyEnrollmentPage = () => {

    const dispatch = useDispatch();

    const closeEnrollmentPage = () => {

        dispatch(EnrollmentPageCloseAction);

        setTimeout(() => {
            dispatch(EnrollmentPageWrapCloseAction);
        }, 300)
    };

    return (
        <PageWrap>
            <HeaderWrap>
                <div onClick={closeEnrollmentPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>
                <TextMiddle>파티 매칭</TextMiddle>
                <div>
                    <div style={{ position: 'absolute', bottom: '-0.1875rem', width: '33.33%', height: '0.1875rem', backgroundColor: '#ffca17' }}></div>
                </div>
            </HeaderWrap>

            {/* 진행도 및 가이드 텍스트 */}
            <div style={{ position: 'relative', margin: '1.1875rem 1.25rem 1.8125rem 1.25rem', fontSize: '1.25rem', lineHeight: '2rem' }}>
                <span style={{ color: '#ffbc26' }}>어떤 포지션</span>으로 <br />
                매칭하시겠어요?

                <div style={{ position: 'absolute', top: '0.25rem', right: '0', lineHeight: '1.3125rem', fontSize: '0.8125rem', color: '#313131', opacity: '0.35' }}>
                    1 / 3
                </div>
            </div>

            {/* <공통> 첫번째 페이지 (파티장/파티원) */}
            <div style={{ display: 'none' }}>

                <div style={{ display: 'flex', textAlign: 'center', margin: '0 1.25rem' }}>
                    <div style={{ flexGrow: '1', flexBasis: '0', marginRight: '0.625rem' }}>

                        <div style={{ display: 'flex', height: '1.4375rem', borderRadius: '0.9688rem', marginBottom: '0.4375rem', fontSize: '0.75rem', color: '#ffb40c', backgroundColor: 'rgba(255, 202, 23,0.15)' }}>
                            <div style={{ flexGrow: "1" }}></div>
                            <div style={{ position: 'relative', width: '1.4375rem' }}>
                                <TextMiddle>
                                    추천
                                </TextMiddle>
                            </div>
                            <div style={{ position: 'relative', width: '0.75rem', marginLeft: '0.25rem' }}>
                                <img style={{ position: 'absolute', top: '50%', left: '0', transform: 'translate(0,-50%)', width: '0.75rem', height: '0.75rem' }} src={party_notice_icon} />
                            </div>
                            <div style={{ flexGrow: "1" }}></div>
                        </div>

                        <RoleButton>
                            <div style={{ flexGrow: '1' }}></div>
                            <RoleTextWrap>
                                <img style={{ width: '3.625rem', height: '2.75rem', marginBottom: '0.4375rem' }} src={crown_none} />
                                <RoleText>파티장</RoleText>
                            </RoleTextWrap>
                        </RoleButton>

                    </div>
                    <div style={{ flexGrow: '1', flexBasis: '0' }}>
                        <div style={{ height: '1.4375rem', borderRadius: '0.9688rem', marginBottom: '0.4375rem' }}></div>

                        <RoleButton>
                            <div style={{ flexGrow: '1' }}></div>
                            <RoleTextWrap>
                                <img style={{ width: '2.3125rem', height: '2.6875rem', marginBottom: '0.6875rem' }} src={user_none} />
                                <RoleText>파티원</RoleText>
                            </RoleTextWrap>
                        </RoleButton>
                    </div>
                </div>

            </div>

            {/* <공통> 두번째 페이지 (플랫폼 선택) */}
            <div style={{ display: 'none' }}>
                <div style={{ margin: '0 1.25rem' }}>
                    <PlatformWrap>
                        <PlatformLogoWrap>
                            <PlatformLogo style={{ width: '0.75rem', height: '1.5rem' }} src={party_netflix} />
                        </PlatformLogoWrap>
                        <PlatformTextWrap>
                            <PlatformTextMiddle>넷플릭스</PlatformTextMiddle>
                        </PlatformTextWrap>
                        <PlatformPriceWrap>
                            <PlatformTextMiddle>
                                <span style={{ marginRight: '0.25rem' }}>매월</span>
                                4,000원
                            </PlatformTextMiddle>
                        </PlatformPriceWrap>
                    </PlatformWrap>

                    <PlatformWrap>
                        <PlatformLogoWrap>
                            <PlatformLogo style={{ width: '1.125rem', height: '1.1875rem' }} src={party_whatcha} />
                        </PlatformLogoWrap>
                        <PlatformTextWrap>
                            <PlatformTextMiddle>왓챠</PlatformTextMiddle>
                        </PlatformTextWrap>
                        <PlatformPriceWrap>
                            <PlatformTextMiddle>
                                <span style={{ marginRight: '0.25rem' }}>매월</span>
                                4,000원
                            </PlatformTextMiddle>
                        </PlatformPriceWrap>
                    </PlatformWrap>

                    <PlatformWrap>
                        <PlatformLogoWrap>
                            <PlatformLogo style={{ width: '1.125rem', height: '1.4375rem' }} src={party_wave} />
                        </PlatformLogoWrap>
                        <PlatformTextWrap>
                            <PlatformTextMiddle>웨이브</PlatformTextMiddle>
                        </PlatformTextWrap>
                        <PlatformPriceWrap>
                            <PlatformTextMiddle>
                                <span style={{ marginRight: '0.25rem' }}>매월</span>
                                4,000원
                            </PlatformTextMiddle>
                        </PlatformPriceWrap>
                    </PlatformWrap>


                    <div style={{ marginTop: '0.875rem', display: 'flex' }}>
                        <div style={{ marginRight: '0.3125rem' }}>
                            <img src={icon_info} style={{ width: "0.875rem", height: "0.875rem" }} />
                        </div>
                        <div style={{ fontSize: '0.6875rem', opacity: '0.4', textDecoration: 'underline', textUnderlinePosition: 'under' }}>요금 책정 안내</div>
                    </div>
                </div>
            </div>

            {/* <파티원> 세번째 페이지 (카드등록) */}
            <div style={{ display: 'none' }}>

                <CardList />

            </div>

            {/* <파티원> 최종 완료 문구 */}
            <div style={{ display: 'none', position: 'absolute', width: '100%', top: '40%', transform: 'translate(0,-40%)' }}>
                <div style={{ position: 'relative', height: '2.625rem' }}>
                    <div style={{ position: 'absolute', left: "50%", transform: 'translate(-50%,0)', width: '2.625rem', height: '2.625rem', backgroundColor: '#ffca17', borderRadius: '50%' }}>
                        <img src={check_icon} style={{ position: 'absolute', width: '1.5rem', height: '1.125rem', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                    </div>
                </div>
                <div style={{ margin: '0.875rem 0 0.625rem 0', textAlign: 'center', fontSize: '1.25rem', lineHeight: '1.75rem' }}>매칭 준비 완료!</div>
                <div style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', opacity: '0.4', textAlign: 'center' }}>
                    파티원이 모일 때까지 대기해주세요.<br />
                    매칭이 완료되면 알림을 보내드립니다.
                </div>
            </div>


            {/* <파티장> 매칭방식 페이지 */}
            <div style={{ display: 'block' }}>

                {/* 버튼 wrap */}
                <div style={{ display: 'flex', textAlign: 'center', margin: '0 1.25rem' }}>

                    {/* 직접 매칭 버튼 */}
                    <div style={{ flexGrow: '1', flexBasis: '0', marginRight: '0.625rem' }}>

                        <div style={{ height: '1.4375rem', borderRadius: '0.9688rem', marginBottom: '0.4375rem' }}></div>

                        <div style={{ backgroundColor: '#f7f7f7', borderRadius: '0.25rem', padding: '1.375rem 0 0.875rem 0' }}>
                            <div style={{ textAlign: 'center', marginBottom: '0.625rem' }}>
                                <img src={match_personal_icon} style={{ width: '2.9375rem', height: '2.75rem' }} />
                            </div>

                            <div style={{ marginBottom: '0.75rem', fontSize: '1.0625rem' }}>직접 초대</div>
                            <div style={{ fontSize: '0.75rem', lineHeight: '1.25rem', opacity: '0.5' }}>
                                지인을 초대해 함께 <br />
                                파티를 할 수 있어요
                            </div>
                        </div>

                    </div>

                    {/* 자동 매칭 버튼 */}
                    <div style={{ flexGrow: '1', flexBasis: '0' }}>

                        <div style={{ height: '1.4375rem', borderRadius: '0.9688rem', marginBottom: '0.4375rem' }}></div>

                        <div style={{ backgroundColor: '#f7f7f7', borderRadius: '0.25rem', padding: '1.375rem 0 0.875rem 0' }}>
                            <div style={{ textAlign: 'center', marginBottom: '0.625rem' }}>
                                <img src={match_auto_icon} style={{ width: '2.9375rem', height: '2.75rem' }} />
                            </div>

                            <div style={{ marginBottom: '0.75rem', fontSize: '1.0625rem' }}>자동 매칭</div>
                            <div style={{ fontSize: '0.75rem', lineHeight: '1.25rem', opacity: '0.5' }}>
                                모두가 자동으로 <br />
                                파티원들을 모아드려요
                            </div>
                        </div>

                    </div>
                </div>

            </div>



            <div style={{ flexGrow: '1' }}></div>

            <div style={{ margin: '1.25rem' }}>

                {/* 예상 매칭 대기시간 */}
                <div style={{ display: 'none' }}>
                    <WaitingTimeWrap >
                        <div style={{ flexGrow: '1' }}></div>
                        <div style={{ position: 'relative', width: '1rem', marginRight: '0.625rem' }}>
                            <img style={{ position: 'absolute', top: '50%', left: '0', transform: 'translate(0,-50%)' }} src={icon_party_time} />
                        </div>
                        <div style={{ position: 'relative', width: '6.5625rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '0', transform: 'translate(0,-50%)' }}>매칭 예상시간 10분</div>
                        </div>
                        <div style={{ flexGrow: '1' }}></div>
                    </WaitingTimeWrap>
                </div>

                {/* 다음 페이지 */}
                <NextButton>다음</NextButton>
            </div>




        </PageWrap >
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

const RoleButton = styled.div`
    display:flex;
    flex-direction:column;
    height: 8rem;
    border-radius: 0.25rem;
    background-color: #f7f7f7;
`;

const RoleTextWrap = styled.div`

    margin-bottom:1.625rem;

    font-size:1.0625rem;
    color:#313131;
`;

const RoleText = styled.div`
    opacity:0.49;
`;




const PlatformWrap = styled.div`
    display:flex;
    height: 3.5rem;

    margin-bottom:0.5rem;

    border-radius: 0.25rem;
    background-color: #f7f7f7;
`;
const PlatformLogoWrap = styled.div`
    position: relative;
    width:3.1875rem;
`;
const PlatformLogo = styled.img`
    position:absolute;
    top:50%;
    left:1.3125rem;

    transform:translate(0, -50%);
`;

const PlatformTextWrap = styled.div`
    flex-grow:1;
    position: relative;

    font-size:0.875rem;
`;
const PlatformTextMiddle = styled.div`
    position:absolute;
    top:50%;
    transform:translate(0,-50%);
    width:100%;
`;
const PlatformPriceWrap = styled.div`
    width:6.25rem;
    position: relative;

    font-size:0.875rem;
`;

const WaitingTimeWrap = styled.div`
    position:relative;
    display:flex;

    text-align:center;

    margin-bottom:0.625rem;
    height:1.9375rem;

    font-size:0.8125rem;
    color:#ffb40c;

    border-radius: 0.9688rem;
    background-color:rgba(255, 202, 23,0.15);   
`;



const NextButton = styled.div`
    cursor: pointer;

    padding:0.8125rem 0 0.875rem 0;

    font-size:0.875rem;
    color:#ffffff;

    text-align:center;

    border-radius:0.375rem;

    background-color: ${props => props.pageConfirmStatus ? '#ffca17' : '#e3e3e3'};
`;

export default PartyEnrollmentPage;