import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";


import icon_back from "../../../../assets/icon-back-arrow.svg";
import icon_arrow_down from "../../../../assets/icon-arrow-down-gray.svg";
import icon_check from "../../../../assets/icon-check-white.svg";
import icon_trsah from "../../../../assets/icon-trash-can.svg";

import { TextMiddle } from '../../../../styled/shared';
import { EnrollmentRevisePageCloseAction, EnrollmentRevisePageWrapCloseAction } from '../../../../reducers/main/enrollmentRevise';
import { TitleWrap, ItemWrap, InputWrap, Input, PartyIconWrap, PartyIcon, PartyText, DeleteButtonWrap } from '../../../../styled/main/enrollment';


const EnrollmentRevisePage = () => {

    const dispatch = useDispatch();
    const history = useHistory();


    const closeEnrollmentRevisePage = () => {
        console.log("hihi")

        dispatch(EnrollmentRevisePageCloseAction);

        setTimeout(() => {
            dispatch(EnrollmentRevisePageWrapCloseAction);
        }, 300)
    };

    const onClickRevise = () => {

        dispatch(EnrollmentRevisePageCloseAction);

        setTimeout(() => {
            dispatch(EnrollmentRevisePageWrapCloseAction);
        }, 300)
    }

    return (
        <PageWrap>
            <HeaderWrap>
                <div onClick={closeEnrollmentRevisePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>
                <TextMiddle>플랫폼 이름</TextMiddle>
                <SaveButton onClick={onClickRevise}>저장</SaveButton>
            </HeaderWrap>
            <ContentWrap>

                {/* 플랫폼 썸네일 */}
                <div style={{ margin: "1.875rem 0", textAlign: "center" }}>
                    <img src={"https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI"} style={{ width: "4.25rem", height: "4.25rem", borderRadius: "0.375rem" }} />
                </div>

                {/* 플랫폼 이름 */}
                <TitleWrap>구독 서비스명</TitleWrap>
                <ItemWrap>
                    <InputWrap>플랫폼 이름</InputWrap>
                </ItemWrap>

                {/* 결제금액 */}
                <TitleWrap>
                    <div style={{ marginRight: "0.5rem" }}>결제 금액</div>
                    <div style={{ fontSize: "0.7188rem", color: "#313131", opacity: "0.3" }}>* 최종 결제금액으로 입력해주세요.</div>
                </TitleWrap>
                <ItemWrap>
                    <InputWrap style={{ flexGrow: "1", flexBasis: "0", marginRight: "0.3125rem" }}>
                        <Input type="number" placeholder="결제금액을 입력하세요"></Input>
                    </InputWrap>
                    <InputWrap style={{ flexGrow: "0", }}>
                        <div style={{ marginRight: "2.8125rem" }}>￦</div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                </ItemWrap>

                {/* 파티 정보 */}
                <TitleWrap>
                    <div>파티 정보</div>
                </TitleWrap>
                <div style={{ display: "flex", margin: "0.1875rem 0 0.5rem 0" }}>
                    <PartyIconWrap isParty={true}>
                        <PartyIcon src={icon_check} />
                    </PartyIconWrap>
                    <PartyText>
                        파티 중인 구독 서비스입니다.
                    </PartyText>
                </div>
                <ItemWrap>
                    <InputWrap>
                        <div>넷플릭스 / 4인 파티 / 3,625원 결제</div>
                        <div style={{ flexGrow: "1" }}></div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                </ItemWrap>

                {/* 카테고리 */}
                <TitleWrap>
                    <div>카테고리</div>
                </TitleWrap>
                <ItemWrap>
                    <InputWrap>
                        <div>OTT</div>
                        <div style={{ flexGrow: "1" }}></div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                </ItemWrap>

                {/* 맴버십 종류 */}
                <TitleWrap>
                    <div>맴버십 종류</div>
                </TitleWrap>
                <ItemWrap>
                    <InputWrap>
                        <div>프리미엄 요금제</div>
                        <div style={{ flexGrow: "1" }}></div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                </ItemWrap>

                {/* 체험 기간 */}
                <TitleWrap>
                    <div>체험 기간</div>
                </TitleWrap>
                <ItemWrap>
                    <InputWrap style={{ marginRight: "0.3125rem" }}>
                        <div>없음</div>
                        <div style={{ flexGrow: "1" }}></div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                    <InputWrap isBlocked={true}>
                        <div>없음</div>
                        <div style={{ flexGrow: "1" }}></div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                </ItemWrap>

                {/* 결제주기 */}
                <TitleWrap>
                    <div>결제주기</div>
                </TitleWrap>
                <ItemWrap>
                    <InputWrap style={{ marginRight: "0.3125rem" }}>
                        <div>1</div>
                        <div style={{ flexGrow: "1" }}></div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                    <InputWrap>
                        <div>달</div>
                        <div style={{ flexGrow: "1" }}></div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                </ItemWrap>

                {/* 마지막 결제일 */}
                <TitleWrap>
                    <div>마지막 결제일</div>
                </TitleWrap>
                <ItemWrap>
                    <InputWrap style={{ marginRight: "0.3125rem" }}>
                        <div>2020</div>
                        <div style={{ flexGrow: "1" }}></div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                    <InputWrap style={{ marginRight: "0.3125rem" }}>
                        <div>5</div>
                        <div style={{ flexGrow: "1" }}></div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                    <InputWrap>
                        <div>6</div>
                        <div style={{ flexGrow: "1" }}></div>
                        <div>
                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                        </div>
                    </InputWrap>
                </ItemWrap>

                <DeleteButtonWrap>
                    <div style={{ flexGrow: "1" }}></div>
                    <div style={{ marginTop: "0.0625rem" }}>
                        <img src={icon_trsah} style={{ width: "0.9375rem", height: "0.9375rem", marginRight: "0.5rem" }} />
                    </div>
                    <div style={{ marginTop: "0.125rem" }}>
                        삭제하기
                    </div>
                    <div style={{ flexGrow: "1" }}></div>
                </DeleteButtonWrap>
            </ContentWrap>

        </PageWrap>
    )

};

const PageWrap = styled.div`

`;
const HeaderWrap = styled.div`
    position: relative;
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

const SaveButton = styled.div`
    position:absolute;
    top:50%;
    transform:translate(0,-50%);
    right:1.25rem;

    font-size:0.8125rem;
    color:#313131;
`;


const ContentWrap = styled.div`

    position:absolute;
    top:2.5625rem;
    left:0;
    right:0;
    bottom:0;

    overflow-y:scroll;

    padding:0 1.25rem 1.25rem 1.25rem;

`;

export default EnrollmentRevisePage;