import React, { useCallback, useState, useEffect } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import icon_back from "../../../assets/icon-back-arrow.svg";
import duck_family from "../../../assets/duck-family@2x.png";

import { TextMiddle } from '../../../styled/shared';

import { PageClose, PageWrapClose } from '../../../reducers/info/page';

const NoticeDetailPage = () => {

    const dispatch = useDispatch();

    //페이지 상태값
    const {
        noticePageIdx
    } = useSelector(state => state.info.page);

    const closePage = useCallback(() => {

        test = false;

        dispatch({
            type: PageClose,
            data: 'noticeDetail'
        });

        setTimeout(() => {
            dispatch({
                type: PageWrapClose,
                data: 'noticeDetail'
            });
        }, 300)
    }, []);

    return (

        <>
            <PageWrap>
                <HeaderWrap className="spoqaBold" onClick={closePage}>
                    <div className="back_link_sub" style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>상세보기</TextMiddle>
                </HeaderWrap>

                {noticePageIdx == 1 &&
                    <div style={{ padding: '0 1.25rem 0 1.25rem' }}>

                        <div style={{ padding: '0.9688rem 0 1.0313rem 0', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', marginBottom: '0.3125rem' }}>
                                모두가 개편되었습니다!
                        </div>
                            <div className="notoMedium" style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                                2021.06.26
                        </div>
                        </div>

                        <div className="notoRegular" style={{ marginTop: '0.9688rem', fontSize: '0.8125rem', lineHeight: '1.3125rem', wordBreak: 'keep-all' }}>
                            늘 모두를 사용해주시는 사용자 여러분들께 감사드립니다. <br />
                        모두가 더 좋은 서비스를 제공하기위해 개편되었습니다! <br />
                            <br />
                        [개편 내용]<br />
                        - 전체적으로 모두의 인터페이스 개선<br />
                        - 브랜드 리뉴얼<br />
                            <br />
                        그리고 모두의 새 마스코트 <span className="notoMedium">구덕(GUDUCK)</span>도 앞으로 많이 사랑해주세요! 감사합니다. 😀
                    </div>

                        <img src={duck_family} style={{ width: '100%', marginTop: '1.875rem' }} />

                    </div>
                }

                {noticePageIdx == 2 &&
                    <div style={{ padding: '0 1.25rem 0 1.25rem' }}>

                        <div style={{ padding: '0.9688rem 0 1.0313rem 0', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', marginBottom: '0.3125rem' }}>
                                일부 기능이 업데이트 되었습니다 !
                        </div>
                            <div className="notoMedium" style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                                2021.07.19
                        </div>
                        </div>

                        <div className="notoRegular" style={{ margin: '0.9688rem 0', fontSize: '0.8125rem', lineHeight: '1.3125rem', wordBreak: 'keep-all' }}>
                            안녕하세요. 모두 입니다.<br />
                            여러분들의 피드백을 반영하여 일부 기능이 업데이트 되었습니다!<br />
                            <br />
                            여러분들이 남겨주신 피드백은 다음과 같습니다.<br />
                            <br />
                            <span className="notoMedium">[피드백 내용]</span><br />
                            - 멤버십 타이틀이 필수값이 아니었으면 좋겠습니다~!<br />
                            - 멤버십이 없는 구독 서비스의 경우 등록하기 곤란합니다.<br />
                            <br />
                            해당 피드백을 적극 반영하여 업데이트된 내용은 다음과 같습니다.<br />
                            <br />
                            <span className="notoMedium">[기능 수정 내용]</span><br />
                            - '멤버십 타이틀'을 '한줄 메모'로 기능 변경<br />
                            - 필수값이 아닌 선택적으로 등록하는 값으로 변경<br />
                            <br />
                            앞으로도 여러분들의 피드백을 적극 수용하여 발전해나아가는 모습 보여드리겠습니다.<br /><br />
                            기능상에 불편한 점이 있거나 새로 추가되었으면 재미있는 아이디어가 있다면 언제든지 문의하기로 연락 주세요! 감사합니다 <span style={{ fontSize: '1rem' }}>🥰</span>
                        </div>

                    </div>
                }
            </PageWrap>

        </>
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
    
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;



export default NoticeDetailPage;