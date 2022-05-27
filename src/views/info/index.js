import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import icon_setting from "../../assets/icon-setting.svg";
import icon_profile from "../../assets/duck-profile.svg";
import icon_arrow_right from "../../assets/icon-arrow-right-gray.svg";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BottomNavOpenAction } from '../../reducers/container/bottomNav';
import { onClickTerminate, checkMobile } from '../../App';
import { PageTransContext } from '../../containers/pageTransContext';
import { customApiClient } from '../../shared/apiClient';
import { UserInfoUpdate } from '../../reducers/info/user';

const Info = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        name,
        uniqueNumber
    } = useSelector(state => state.info.user);

    //context
    const { setPageTrans } = useContext(PageTransContext);

    //약관 동의 페이지 열기
    const openAgreePage = (title) => {

        setPageTrans('trans toRight');

        history.push({
            pathname: '/agree',
            state: title
        });

    };

    //상세페이지 이동
    const openPage = (domain) => {
        setPageTrans('trans toRight');
        history.push(domain);
    }

    useEffect(async () => {
        dispatch(BottomNavOpenAction);

        const userPlatform = checkMobile();

        if (userPlatform == 'ios') {
            //IOS 배경색 설정
            try {
                window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
            }
            catch (err) {
            }
        }

        if (!name || !uniqueNumber) {
            const data = await customApiClient('get', '/user/jwt');

            if (data == 'Network Error') {
                history.push('/inspection');
                return
            }

            //벨리데이션
            if (!data || data.statusCode != 200) {
                localStorage.removeItem('x-access-token');
                history.push('/login');
                return
            }

            dispatch({
                type: UserInfoUpdate,
                data: data.result
            })
        }

    }, [])


    return (
        <>
            <div className="page" style={{ backgroundColor: "#ffffff" }}>
                <PageWrap>

                    <div id="back_link" onClick={onClickTerminate} style={{ display: 'none' }}></div>


                    <div className="spoqaBold" style={{ display: 'flex', margin: '0.875rem 1.25rem 1.625rem 1.25rem' }}>
                        <div style={{ flexGrow: '1', fontSize: '0.875rem', lineHeight: '1.4375rem' }}>마이페이지</div>
                        <div onClick={() => { openPage('/setting') }} style={{ marginTop: '0.125rem' }}>
                            <img src={icon_setting} style={{ width: '1rem', height: '1rem' }} />
                        </div>
                    </div>


                    <div className="notoMedium" style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)', margin: '0 0 0.8125rem 1.25rem' }}>내정보</div>

                    <InfoWrap onClick={() => { openPage('/info/detail') }}>
                        <img style={{ width: '2.9375rem', height: '2.9375rem' }} src={icon_profile} />
                        <div style={{ marginLeft: "0.6875rem", flexGrow: '1' }}>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', margin: '0.25rem 0' }}>{name}</div>
                            <div className="notoMedium" style={{ fontSize: '0.6875rem', lineHeight: '1.3125rem', opacity: '0.4' }}>고유번호 #{uniqueNumber}</div>
                        </div>
                        <div style={{ marginTop: '0.25rem' }}>
                            <img src={icon_arrow_right} style={{ width: '0.4375rem', height: '0.625rem' }} />
                        </div>
                    </InfoWrap>

                    <TitelWrap className="notoMedium">결제수단 관리</TitelWrap>
                    <ContentWrap onClick={() => { openPage('/bank/manage') }} className="spoqaBold">계좌 관리</ContentWrap>
                    <ContentWrap onClick={() => { openPage('/card/manage') }} className="spoqaBold">카드 관리</ContentWrap>


                    <TitelWrap className="notoMedium">고객센터</TitelWrap>
                    <ContentWrap onClick={() => { openPage('/notice') }} className="spoqaBold">공지사항</ContentWrap>
                    <ContentWrap onClick={() => { openPage('/faq') }} className="spoqaBold">문의하기</ContentWrap>
                    <ContentWrap className="spoqaBold" onClick={() => { openAgreePage('serviceDetail') }}>이용 약관</ContentWrap>
                    <ContentWrap className="spoqaBold" onClick={() => { openAgreePage('personDetail') }}>개인정보 처리방침</ContentWrap>

                    <div className="businessInfo">
                        상호명ㅣ(주)스프레드와이<br />
                        대표자명ㅣ신민재<br />
                        사업자 등록번호ㅣ706-88-02443<br />
                        주소ㅣ서울 금천구 시흥대로51길 55, 1동 804<br />
                        이메일ㅣbusiness.modu21@gmail.com<br />
                        전화번호ㅣ070-8095-1408<br />
                        통신판매업 신고번호ㅣ2022-서울금천-2441
                    </div>
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

    display:flex;
    flex-direction:column;

    color:#313131;

    .businessInfo {
        padding:1.8125rem 0;
        flex-grow:1;
        flex-basis:1;
        background-color:#f4f4f4;
        font-size:0.5625rem;
        color:#c3c3c3;
        line-height:0.9375rem;
        text-align:center;
    }
`;


const InfoWrap = styled.div`

    display:flex;

    margin:0 1.25rem 2.125rem 1.25rem;

    padding:0.75rem 1rem 0.875rem 0.75rem;
    border-radius:0.4375rem;

    background-color:#f7f7f7;
`;


const TitelWrap = styled.div`
    margin: 0 1.25rem 1.9375rem 1.25rem;
    font-size:0.75rem;
    line-height:1.3125rem;
    opacity:0.4;
`;

const ContentWrap = styled.div`
    margin:0 1.25rem 1.9375rem 1.25rem;
    font-size:0.8125rem;
`;


export default Info;