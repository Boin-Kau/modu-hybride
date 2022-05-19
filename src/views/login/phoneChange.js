import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import icon_back from "../../assets/icon-back-arrow.svg";
import PrivacyAgreeTerm from '../../components/term/privacyAgreeTerm';
import ServiceTerm from '../../components/term/serviceTerm';
import { PageClose, PageWrapClose } from '../../reducers/info/page';
import { TextMiddle } from '../../styled/shared';

const PhoneChangePage = () => {

    const dispatch = useDispatch();

    //global state
    const {
        loginSubPageKind
    } = useSelector(state => state.info.page);

    //local state
    const [title, setTitle] = useState('');

    useEffect(() => {

        switch (loginSubPageKind) {
            case 'serviceDetail': {
                setTitle('서비스 이용약관');
                break
            }
            case 'personDetail': {
                setTitle('개인정보 수집 동의서');
                break
            }
            case 'marketingDetail': {
                setTitle('마케팅 정보 수집 동의서');
                break
            }
            default: {
                break
            }
        }

    }, [loginSubPageKind])

    const closePage = () => {

        test = false;

        dispatch({
            type: PageClose,
            data: 'loginPhone'
        });

        setTimeout(() => {
            dispatch({
                type: PageWrapClose,
                data: 'loginPhone'
            });
        }, 300)
    };



    return (
        <div>
            <PageWrap style={loginSubPageKind == 'loginPhone' ? { display: 'block' } : { display: 'none' }}>
                <HeaderWrap className="spoqaBold" onClick={closePage}>
                    <div className="back_link_sub" style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>휴대폰 번호 변경 안내</TextMiddle>
                </HeaderWrap>
                <div style={{ padding: '2.0625rem 1.25rem 0 1.25rem' }}>
                    <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem', marginBottom: '0.625rem' }}>
                        <span style={{ marginRight: '0.375rem' }}>01</span>휴대폰 번호를 변경
                </div>
                    <div className="notoRegular" style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.65)', wordBreak: 'keep-all', marginBottom: '4.375rem' }}>
                        휴대폰 번호가 변경되었을 시, 마이페이지에서 전화번호 변경 기능을 사용하여 데이터 이전이 가능합니다.
                </div>

                    <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem', marginBottom: '0.625rem' }}>
                        <span style={{ marginRight: '0.375rem' }}>02</span>휴대폰 번호와 휴대폰 기기 모두 변경
                </div>
                    <div className="notoRegular" style={{ fontSize: '0.8125rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.65)', wordBreak: 'keep-all' }}>
                        휴대폰 번호와 핸드폰 전부 변경되어서 불가능한 경우,  아래 내용을 1:1 문의로 남겨주시면 데이터를 이전해드립니다.
                    <br /><br />
                    1. 기존 전화번호<br />
                    2. 모두에서 제공한 고유번호 6자리
                </div>
                </div>
                <a href="https://pf.kakao.com/_tKfKs" target="blank" style={{ textDecoration: 'none' }}>
                    <QuestionButtonWrap pageConfirmStatus={false}>
                        <div className="spoqaBold" style={{ width: '100%', textAlign: 'center' }}>
                            1:1 문의하기
                </div>
                    </QuestionButtonWrap>
                </a>

            </PageWrap>

            <PageWrap style={loginSubPageKind != 'loginPhone' ? { display: 'block' } : { display: 'none' }}>
                <HeaderWrap className="spoqaBold" onClick={closePage}>
                    <div className="back_link_sub" style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>
                    <TextMiddle>
                        {title}
                    </TextMiddle>
                </HeaderWrap>

                {/* 이용약관 */}
                <AgreeContentWrap className="notoRegular" style={loginSubPageKind == 'serviceDetail' ? { display: 'block' } : { display: 'none' }}>
                    <ServiceTerm />
                </AgreeContentWrap>

                {/* 개인정보 수집 동의서 */}
                <AgreeContentWrap className="notoRegular" style={loginSubPageKind == 'personDetail' ? { display: 'block' } : { display: 'none' }}>
                    <PrivacyAgreeTerm />
                </AgreeContentWrap>

                {/* 마케팅 정보 수집 동의서 */}
                <AgreeContentWrap className="notoRegular" style={loginSubPageKind == 'marketingDetail' ? { display: 'block' } : { display: 'none' }}>
                    마케팅 정보 수신 동의 약관<br />
                    <br />
                    ‘팀모두’는 ‘모두 - 나의 구독 서비스 관리’를 운용함에 있어 각종 정보를 SMS, 푸시알림 등의 방법으로 회원에게 제공할 수 있으며, 결제 사전 알림 등 의무적으로 안내되어야 하는 정보성 내용 및 일부 혜택성 정보는 수신동의 여부와 무관하게 제공합니다.<br />
                    <br />
                    마케팅 활용 목적<br />
                    새로운 콘텐츠 및 기능의 안내 또는 이벤트 및 프로모션 등 광고성 정보 제공을 위해 본 약관에 동의하신 회원님의 개인정보를 활용합니다.<br />
                    <br />
                    전송방법<br />
                    SMS, 푸시알림 등으로 마케팅 정보를 전달합니다.<br />
                    <br />
                    수신 동의 변경<br />
                    모바일 애플리케이션 내부 메뉴를 통해 수신 동의를 변경(동의/철회)할 수 있습니다.<br />
                    <br />
                    개인정보 보유 및 이용 기간<br />
                    마케팅 정보 수신 동의일로부터 회원 탈퇴 또는 마케팅 정보 수신 동의 철회 시까지 보유 및 이용합니다.<br />
                    <br />
                    본 약관은 2021년 07월 01일부터 시행합니다.
                </AgreeContentWrap>

            </PageWrap>
        </div>
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


const QuestionButtonWrap = styled.div`
    position:absolute;

    left:0;
    right:0;
    bottom: 0;

    display:flex;
    margin:1.25rem;

    background-color:#ffca17;
    border-radius:0.375rem;

    padding:0.875rem 0 0.8125rem 0;

    font-size:0.8125rem;
    color:#ffffff;
`;

const AgreeContentWrap = styled.div`
    padding:1rem 1.25rem;
    font-size:0.8125rem;

    line-height:1.3125rem;

    color:#313131;
    opacity:0.65;

    word-break:keep-all;
`;

export default PhoneChangePage;