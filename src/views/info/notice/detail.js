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

                {noticePageIdx == 3 &&
                    <div style={{ padding: '0 1.25rem 0 1.25rem' }}>

                        <div style={{ padding: '0.9688rem 0 1.0313rem 0', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', marginBottom: '0.3125rem' }}>
                                새로운 카테고리 및 플랫폼이 업데이트 되었습니다. <span style={{ fontSize: '1rem' }}>🎉</span>
                            </div>
                            <div className="notoMedium" style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                                2021.09.16
                        </div>
                        </div>

                        <div className="notoRegular" style={{ margin: '0.9688rem 0', fontSize: '0.8125rem', lineHeight: '1.3125rem', wordBreak: 'keep-all' }}>
                            안녕하세요 여러분 ~!<br />
                            여러분들의 구독 관리를 위해 하루하루를 살고있는 모두 입니다.<br />
                            <br />
                            이번에도 여러분들이 요청주신 다양한 아이디어와 플랫폼을 바탕으로 새로운 구독 카테고리 및 플랫폼을 업데이트를 진행 하였습니다.<br />
                            <br />
                            업데이트된 내용은 다음과 같습니다.<br />
                            <br />
                            - <span className="notoMedium">모빌리티</span> 카테고리 추가<br />
                            - <span className="notoMedium">디즈니 플러스</span> 플랫폼 추가<br />
                            - <span className="notoMedium">이모티콘 플러스</span> 플랫폼 추가<br />
                            - <span className="notoMedium">스포티파이</span> 플랫폼 추가<br />
                            - <span className="notoMedium">월세</span> 플랫폼 추가<br />
                            - <span className="notoMedium">교통비</span> 플랫폼 추가<br />
                            - <span className="notoMedium">통신비</span> 플랫폼 추가<br />
                            <br />
                            다음 업데이트 사항으로는 결제 단위를 <span className="notoMedium">원화(₩)</span> 뿐만 아니라 <span className="notoMedium">달러($)</span> 단위도 추가가 될 예정입니다. <span style={{ fontSize: '1rem' }}>💰💰💰</span><br />
                            <br />
                            비록 부족한 점이 많지만, 항상 의견과 피드백을 수용하고 이를 반영하고 성장하는 모습을 보여드리도록 최선을 다하겠습니다! 감사합니다. <span style={{ fontSize: '1rem' }}>🥰</span>
                        </div>

                    </div>
                }

                {noticePageIdx == 4 &&
                    <div style={{ padding: '0 1.25rem 0 1.25rem' }}>

                        <div style={{ padding: '0.9688rem 0 1.0313rem 0', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', marginBottom: '0.3125rem' }}>
                                개인정보 처리방침 및 이용약관 개정안내
                            </div>
                            <div className="notoMedium" style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                                2021.11.03
                        </div>
                        </div>

                        <div className="notoRegular" style={{ margin: '0.9688rem 0', fontSize: '0.8125rem', lineHeight: '1.3125rem', wordBreak: 'keep-all' }}>
                            유저 여러분 안녕하세요. '모두'입니다!<br /><br />
                            2021년이 벌써 2개월만 남은 시점에 마무리는 잘 하고 계신가요?<br />
                            저희 '모두'는 새로운 기능 업데이트를 위해 열심히 달리며 시간이 너무 빨리 지나간 것 같습니다.<br />
                            <br />
                            여러분께 새로운 모습으로 찾아뵌지 4달이 지나가는 시점에 곧 업데이트로 새 기능을 선보일 생각을 하니 벌써부터 떨리고 설레는 기분입니다.<br />
                            <br />
                            본 내용은 업데이트 전 새로운 기능과 서비스 소유주의 변화로 인한 개인정보 처리방침과 이용약관의 변경에 대한 사전공지의 형태입니다. 내용은 다음과 같습니다.<br />
                            <br />

                            1. 주요 변경 내용<br />
                            <br />
                            서비스 소유자 변경과 새로운 기능 업데이트로 인한 개인정보처리방침 및 이용약관 내용 개정<br />
                            <br />
                            2. 개정 공지일<br />
                            <br />
                            2021.11.03(수)<br />
                            <br />
                            3. 변경내용 적용일<br />
                            <br />
                            2021.11.10(수)<br />
                            <br />
                            4. 상세 변경 내용<br />
                            <br />
                            [개인정보 처리방침]<br />
                            - '팀 모두'에서 '(주) 스프레드와이'로 변경<br />
                            - 제 6조 필수항목 '선호 카테고리' 추가<br />
                            - 제 6조 1번에 이용기간 추가<br />
                            - 제 6조 2번 추가<br />
                            - 제 9조 쿠기 사용으로 변경 및 목적 추가<br />
                            - 제 11조 연락처 부분 변경('전화번호'에서 '이메일'로)<br />
                            <br />
                            [서비스 이용약관]<br />
                            - 제 3조 3항 '서비스 초기화면'에서 '서비스 공지사항 화면'으로<br />
                            - 제 10조 2항의 h추가<br />
                            - 제 10조 5항 추가<br />
                            - 제 12조 1항 e추가<br />
                            - 제 14조 4,5항 추가<br />
                            - 제 17조 8~12항 추가<br />
                            <br />

                            <a href="https://spready.modoo.at/?link=2qz0xwok&viewType=list&messageNo=4&mode=view&query=&queryType=0&myList=0&page=1" target="blank" style={{ textDecoration: 'none' }}>
                                개정될 개인정보 처리방침
                            </a>
                            <br />
                            <br />
                            <a href="https://spready.modoo.at/?link=2qz0xwok&viewType=list&messageNo=6&mode=view&query=&queryType=0&myList=0&page=1" target="blank" style={{ textDecoration: 'none' }}>
                                개정될 서비스 이용약관
                            </a>
                            <br />
                            <br />
                            <a href="https://spready.modoo.at/?link=2qz0xwok&viewType=list&messageNo=1&mode=view&query=&queryType=0&myList=0&page=1" target="blank" style={{ textDecoration: 'none' }}>
                                이전 개인정보 처리방침
                            </a>
                            <br />
                            <br />
                            <a href="https://spready.modoo.at/?link=2qz0xwok&viewType=list&messageNo=3&mode=view&query=&queryType=0&myList=0&page=1" target="blank" style={{ textDecoration: 'none' }}>
                                이전 서비스 이용약관
                            </a>
                            <br />
                            <br />
                            해당 공지사항 관련 문의사항은 앱 내 '고객센터'의 '문의하기'를 이용해주세요!
                        </div>

                    </div>
                }

                {noticePageIdx == 5 &&
                    <div style={{ padding: '0 1.25rem 0 1.25rem' }}>

                        <div style={{ padding: '0.9688rem 0 1.0313rem 0', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', marginBottom: '0.3125rem' }}>
                                파티기능 업데이트 안내
                        </div>
                            <div className="notoMedium" style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                                2021.11.22
                        </div>
                        </div>

                        <div className="notoRegular" style={{ margin: '0.9688rem 0', fontSize: '0.8125rem', lineHeight: '1.3125rem', wordBreak: 'keep-all' }}>
                            안녕하세요. 사용자 여러분!<br />
                            이번 공지는 최근 업데이트 된 '구독 파티'에 대한 이야기를 하려고 합니다.<br />
                            <br />
                            우선, 구독 파티의 목적은 점점 늘어가는 구독 서비스에서 유저분들의 가격적인 부담을 줄이기 위함이며<br />
                            이용에 불편함과 문제가 발생하지 않기 위해 본 공지를 꼭 읽어주시기 바랍니다.<br />
                            <br />
                            <span className="notoMedium">[용어 설명]</span><br />
                            파티장: 구독 파티를 만들어 파티원을 모집하는 유저<br />
                            파티원: 구독 파티에 참가하는 유저<br />
                            오픈채팅방: 구독 파티원간 소통 채널<br />
                            <br />
                            <span className="notoMedium">[사용방법]</span><br />
                            - 파티장<br />
                            1) '파티 개설'을 통해 원하는 구독 서비스와 자세한 모집 정보를 입력합니다.(오픈채팅방 선 개설 필수, 채팅방 설정에서 '검색 허용' 비활성화)<br />
                            2) 파티매칭이 완료되면 오픈채팅방을 통해 파티원들과 대화를 통해 계산과 서비스 공유를 시작합니다.<br />
                            3) 파티 이용 중 파티원 문제(공유 계정에 피해, 송금 거부, 등)가 발생하면 '내파티'에서 '파티원 강제 퇴장'을 이용해 파티원 관리를 합니다.<br />
                            <br />
                            - 파티원<br />
                            1) 모집중인 파티 중 원하는 파티에 '파티 참여하기'를 통해 참여합니다.<br />
                            2) 참여 이후 바로 '오픈카톡방 연결'을 통해 파티 소통 채널에 입장합니다.('내파티' 화면에서도 참가가능)<br />
                            3) 오픈채팅방에서 대화 후 파티장에게 송금을 하고 계정 공유를 받습니다.<br />
                            4) 파티 이용 중 파티장 문제(파티 이용 중 계정 정보 변경, 문제 없는 파티원 강제 퇴장, 등)가 발생하면 '내파티'화면에서 '파티 신고'기능을 통해 해당 파티를 신고합니다. (신고 사유와 상세 내용을 상세히 적어주세요)<br />
                            <br />
                            <span className="notoMedium">[주의사항]</span><br />
                            1) 파티에 참가 후 반드시 오픈채팅방에 참가해 파티원들과 소통해주세요.<br />
                            2) 위의 사용방법은 기본적인 파티 시작까지의 과정으로 이후 이뤄지는 파티 이용에 대해서는 파티원간의 소통을 통해 자율적으로 맞춰나가시길 바랍니다.<br />
                            3) 약관에 명시된 대로 개인간 금전적 거래에 있어서 발생한 문제에 '모두'는 책임을 지지 아니하니 신중한 결정과 이용을 부탁드립니다.<br />
                            <br />
                            <span className="notoMedium">[공지를 마치며]</span><br />
                            처음 선보이는 기능인 '구독 파티'는 현재 오픈채팅방을 통해 개인간 자율적인 거래의 형태입니다.<br /><br />
                            추후 개선을 통해 '정기 자동 결제 시스템' 도입과 '구독 관리'와의 연동을 진행할 예정이지만, 그전까지는 서비스를 이용하며 발생할 수 있는 문제들이 존재하며, 이를 방지하기 위해 우리 모두의 올바른 파티 이용이 필요합니다.<br /><br />
                            이 부분에 있어서 여러분의 너른 양해를 부탁드리며 불편함을 해소할 수 있는 업데이트로 빠른 시일 뵐 수 있도록하겟습니다.<br /><br />
                            감사합니다.<br />
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