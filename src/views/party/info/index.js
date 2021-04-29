import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";


import icon_back from "../../../assets/icon-back-arrow.svg";
import card_img_fill from "../../../assets/card-active-fill.svg";
import icon_arrow_gray from "../../../assets/icon-arrow-right-gray.svg";


import { TextMiddle } from '../../../styled/shared';
import { InfoPageCloseAction, InfoPageWrapCloseAction } from '../../../reducers/party/info';


const PartyInfoPage = () => {

    const dispatch = useDispatch();

    const closeInfoPage = () => {

        dispatch(InfoPageCloseAction);

        setTimeout(() => {
            dispatch(InfoPageWrapCloseAction);
        }, 300)
    };

    return (
        <PageWrap>

            <HeaderWrap>
                <div onClick={closeInfoPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>
                <TextMiddle>나의 파티</TextMiddle>
            </HeaderWrap>

            {/* 플랫폼 정보 */}
            <div style={{ margin: '1.375rem 1.25rem 1.25rem 1.25rem' }}>

                <div style={{ display: 'flex', marginBottom: '2rem' }}>
                    <div style={{ marginRight: '0.875rem' }}>
                        <img style={{ width: '3.25rem', height: '3.25rem' }} src={'https://firebasestorage.googleapis.com/v0/b/modu-b210e.appspot.com/o/Platform%2FPlatformImg%2Fwatcha.png?alt=media&token=cb80e781-d453-4224-9bce-505305174bd1'} />
                    </div>
                    <div>
                        <div style={{ fontSize: '1.0625rem', lineHeight: '1.6875rem' }}>
                            왓챠 프리미엄
                    </div>
                        <div style={{ fontSize: '0.875rem', lineHeight: '1.4375rem', opacity: '0.35' }}>
                            파티원
                    </div>
                    </div>
                </div>

                <div style={{ display: 'flex' }}>
                    <ButtonWrap style={{ backgroundColor: '#ffca17', color: '#ffffff', fontSize: '0.8125rem', lineHeight: '1.3125rem', marginRight: '0.625rem' }}>파티 채팅방</ButtonWrap>
                    <ButtonWrap style={{ backgroundColor: '#e3e3e3', color: 'rgba(49, 49, 49,0.67)', fontSize: '0.8125rem', lineHeight: '1.3125rem' }}>문의하기</ButtonWrap>
                </div>

            </div>


            <div style={{ borderBottom: '0.5rem solid #f7f7f7' }} />

            {/* 계정 정보 */}

            <div>
                <div style={{ margin: '1.0625rem 1.25rem', fontSize: '0.875rem', lineHeight: '1.4375rem' }}>계정 정보</div>

                <div style={{ margin: '0 1.25rem 1.5625rem 1.25rem', position: 'relative' }}>
                    <div style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', opacity: '0.6', marginBottom: '0.125rem' }}>아이디</div>
                    <div style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>kiteak9275</div>
                    <ButtonWrap style={{ position: 'absolute', top: '50%', right: '0', transform: 'translate(0,-50%)', backgroundColor: '#e3e3e3', color: 'rgba(49, 49, 49,0.67)', fontSize: '0.75rem', lineHeight: '1.3125rem', width: '3.125rem' }}>복사</ButtonWrap>
                </div>

                <div style={{ margin: '0 1.25rem 1.5625rem 1.25rem', position: 'relative' }}>
                    <div style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', opacity: '0.6', marginBottom: '0.125rem' }}>비밀번호</div>
                    <div style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>pass1234</div>
                    <ButtonWrap style={{ position: 'absolute', top: '50%', right: '0', transform: 'translate(0,-50%)', backgroundColor: '#e3e3e3', color: 'rgba(49, 49, 49,0.67)', fontSize: '0.75rem', lineHeight: '1.3125rem', width: '3.125rem' }}>복사</ButtonWrap>
                </div>
            </div>

            <div style={{ borderBottom: '0.5rem solid #f7f7f7' }} />

            {/* 파티 정보 */}

            <div>
                <div style={{ margin: '1.0625rem 1.25rem', fontSize: '0.875rem', lineHeight: '1.4375rem' }}>파티 정보</div>

                {/* 파티원 리스트 */}
                <div style={{ display: 'flex', borderRadius: '0.4375rem', backgroundColor: '#f7f7f7', margin: '0 1.25rem', padding: '1rem 0.875rem 0.6875rem 0.875rem' }}>

                    <div>
                        <div style={{ position: 'relative', width: '3.25rem', height: '3.25rem', borderRadius: '0.4375rem', backgroundColor: '#ffffff' }}>
                            <img />
                        </div>
                        <div style={{ fontSize: '0.75rem', textAlign: 'center', lineHeight: '1.3125rem', marginTop: '0.1875rem' }}>김연우</div>
                    </div>

                    <div style={{ flexGrow: '1' }} />

                    <div>
                        <div style={{ position: 'relative', width: '3.25rem', height: '3.25rem', borderRadius: '0.4375rem', backgroundColor: '#ffffff' }}>
                            <img />
                        </div>
                        <div style={{ fontSize: '0.75rem', textAlign: 'center', lineHeight: '1.3125rem', marginTop: '0.1875rem' }}>김연우</div>
                    </div>

                    <div style={{ flexGrow: '1' }} />

                    <div>
                        <div style={{ position: 'relative', width: '3.25rem', height: '3.25rem', borderRadius: '0.4375rem', backgroundColor: '#ffffff' }}>
                            <img />
                        </div>
                        <div style={{ fontSize: '0.75rem', textAlign: 'center', lineHeight: '1.3125rem', marginTop: '0.1875rem' }}>김연우</div>
                    </div>

                    <div style={{ flexGrow: '1' }} />

                    <div>
                        <div style={{ position: 'relative', width: '3.25rem', height: '3.25rem', borderRadius: '0.4375rem', backgroundColor: '#ffffff' }}>
                            <img />
                        </div>
                        <div style={{ fontSize: '0.75rem', textAlign: 'center', lineHeight: '1.3125rem', marginTop: '0.1875rem' }}>김연우</div>
                    </div>

                </div>

                <div style={{ margin: '0.625rem 1.25rem 1.5625rem 1.25rem', padding: '0.8125rem 0.875rem', display: 'flex', backgroundColor: '#f7f7f7', borderRadius: '0.4375rem' }}>
                    <div style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem' }}>파티 시작일</div>
                    <div style={{ flexGrow: '1' }} />
                    <div style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem' }}>2021.01.26</div>
                </div>
            </div>

            <div style={{ borderBottom: '0.5rem solid #f7f7f7' }} />


            {/* 결제 정보 */}
            <div style={{ marginBottom: '3.75rem' }}>
                <div style={{ margin: '1.0625rem 1.25rem', fontSize: '0.875rem', lineHeight: '1.4375rem' }}>결제 정보</div>

                <div style={{ display: "flex", margin: '0 1.25rem', padding: "0.8125rem 0", backgroundColor: "#f7f7f7", borderRadius: "0.4375rem" }}>
                    <div style={{ flexGrow: "1", textAlign: "center", borderRight: "0.0625rem solid rgba(0,0,0,0.09" }}>
                        <div style={{ marginBottom: "0.5rem", fontSize: "0.75rem", opacity: '0.6' }}>이번달 정산예정</div>
                        <div style={{ fontSize: "0.875rem", lineHeight: '1.4375rem' }}>10,000원</div>
                    </div>
                    <div style={{ flexGrow: "1", textAlign: "center" }}>
                        <div style={{ marginBottom: "0.5rem", fontSize: "0.75rem", opacity: '0.6' }}>파티 정기결제일</div>
                        <div style={{ fontSize: "0.875rem", lineHeight: '1.4375rem' }}>매달 15일</div>
                    </div>
                </div>

                <div style={{ margin: '0.625rem 1.25rem 0 1.25rem', border: '1px solid #ffffff', borderRadius: '0.4375rem', backgroundImage: `url(${card_img_fill})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <div style={{ padding: '2.5625rem 1.3125rem 0.1875rem 1.3125rem', fontSize: '1.0625rem', color: '#ffffff' }}>신한카드</div>
                    <div style={{ padding: '0 1.3125rem 2.0625rem 1.3125rem', lineHeight: '1.9375rem', fontSize: '1.0625rem', color: '#ffffff' }}>1234********5678</div>

                    <div style={{ position: 'relative', margin: '0 0.625rem 0.8125rem 0.625rem', padding: '0.625rem 0 0.5rem 0.8125rem', backgroundColor: '#ffffff', borderRadius: '0.4375rem', fontSize: '0.8125rem', lineHeight: '1.3125rem' }}>
                        결제카드 변경

                        <img src={icon_arrow_gray} style={{ position: 'absolute', top: '50%', right: '0.8125rem', transform: 'translate(0,-50%)' }} />
                    </div>

                </div>

            </div>


            <div style={{ margin: '0 1.25rem 1.125rem 1.25rem', backgroundColor: '#fb5e5e', borderRadius: '0.375rem', textAlign: 'center', padding: '0.8125rem 0 0.6875rem 0', fontSize: '0.875rem', color: '#ffffff' }}>
                파티 탈퇴
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


const ButtonWrap = styled.div`
    flex-grow:1;
    padding:0.5rem 0 0.375rem 0;
    text-align:center;
    border-radius:0.375rem;
`;

export default PartyInfoPage;