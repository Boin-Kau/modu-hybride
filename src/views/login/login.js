import React, { useState, useCallback, useContext } from 'react';

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from 'react-router-dom';

import { LoginButton, LoginInput, TextMiddle } from '../../styled/shared';

import icon_back from "../../assets/icon-back-arrow.svg";
import icon_info from "../../assets/info-black-192-x-192@3x.png";

import icon_timeout from "../../assets/icon-timeout.svg";

import Fade from 'react-reveal/Fade';


import { customApiClient } from '../../shared/apiClient';
import { BottomNavOpenAction } from '../../reducers/container/bottomNav';
import { UserInfoUpdate } from '../../reducers/info/user';
import PhoneChangePage from './phoneChange';
import { PageWrapOpen, PageOpen, LoginSubPageKind } from '../../reducers/info/page';

import { PageTransContext } from '../../containers/pageTransContext';
import { GA_CATEOGRY, GA_USER_ACTION, GAEventSubmit } from '../../shared/gaSetting';
import { HeaderWrap, PageWrap } from '../../styled/shared/wrap';
import { MainText } from '../../styled/shared/text';


const Login = () => {

    //모듈 선언
    const history = useHistory();
    const dispatch = useDispatch();

    //context
    const { setPageTrans } = useContext(PageTransContext);

    //Global State 선언
    const {
        openLoginPhonePageWrapStatus,
        openLoginPhonePageStatus
    } = useSelector(state => state.info.page);


    //현재 페이지
    const [currentPage, setCurrentPage] = useState(1);

    //페이지내 최종 벨리데이션
    const [pageConfirmStatus, setPageConfirmStatus] = useState(false);

    //페이지별 벨리데이션
    const [phoneNumberPageStatus, setPhoneNumberPageStatus] = useState(false);
    const [phoneAuthPageStatus, setphoneAuthPageStatus] = useState(false);


    //input 데이터
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneAuthCode, setPhoneAuthCode] = useState('');

    //타이머 데이터
    const [timeMin, setTimeMin] = useState(3);
    const [timeSec, setTimeSec] = useState(0);
    const [codeInputAccess, setCodeInputAccess] = useState(false);
    const [intervalId, setIntervalId] = useState();


    //에러 메세지
    const [phoneErrorText, setPhoneErrorText] = useState('');
    const [timerErrorText, setTimerErrorText] = useState('');


    //확인버튼 텍스트
    const [buttonText, setButtonText] = useState('다음');

    const onClickBackButton = () => {

        //currentPage 값과 pageStatus 값으로 검증 후 넘겨주기
        switch (currentPage) {
            case 1:
                setPageTrans('trans toLeft');
                history.goBack();
                break
            case 2:
                setCurrentPage(1);
                setPageConfirmStatus(true);
                setCodeInputAccess(false);
                clearInterval(intervalId);
                setphoneAuthPageStatus(false);
                break
            case 3:
                setCurrentPage(2);
                setPageConfirmStatus(true);
                break
            default:
                break
        }
    }

    const onclickNextButton = async () => {
        //currentPage 값과 pageStatus 값으로 검증 후 넘겨주기


        if (currentPage == 1 && phoneNumberPageStatus) {

            //애플 검수를 위한 임시 로그인 처리
            if (phoneNumber == '01092756351') {

                await localStorage.setItem('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHgiOjIsIm5hbWUiOiLsnbTquLDtg50iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYyNDI4NjMxNCwiZXhwIjoxNjU1ODIyMzE0fQ.bnZz0MZW8VcRAAKOU8PzG8y68Ur1RoiFMJv9W3GYChI');

                const authData = await customApiClient('get', '/user/jwt');

                //벨리데이션
                if (!authData || authData.statusCode != 200) {
                    alert("오류가 발생하였습니다. 다시 시도해주세요.");
                    return
                }
                dispatch({
                    type: UserInfoUpdate,
                    data: authData.result
                })

                localStorage.setItem("phone", authData.result.phone);
                localStorage.setItem("isAuth", authData.result.isAuth);
                localStorage.setItem("isAdult", authData.result.isAdult);

                dispatch(BottomNavOpenAction);
                setPageTrans('trans toRight');
                history.push('/main');
                return

            }


            //인증번호 전송 API 호출
            const data = await customApiClient('post', '/user/code/generate', {
                phone: phoneNumber
            })

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                setPhoneErrorText(data.message);
                return
            }

            //성공시 로직
            setPhoneErrorText('');
            beginTimer();
            setCurrentPage(2);
            setPageConfirmStatus(phoneAuthPageStatus);
            return
        }

        if (currentPage == 2 && phoneAuthPageStatus && codeInputAccess) {

            //인정코드 인증 API 호출
            const data = await customApiClient('post', '/user/code/auth', {
                phone: phoneNumber,
                code: phoneAuthCode
            })

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 100 && data.statusCode != 200) {
                setTimerErrorText(data.message);
                return
            }

            //로그인 로직
            if (data.statusCode == 200) {
                clearInterval(intervalId);

                await localStorage.setItem('x-access-token', data.jwt);

                const authData = await customApiClient('get', '/user/jwt');

                //벨리데이션
                if (!authData || authData.statusCode != 200) {
                    alert("오류가 발생하였습니다. 다시 시도해주세요.");
                    return
                }

                GAEventSubmit(GA_CATEOGRY.USER, GA_USER_ACTION.LOGIN);

                dispatch({
                    type: UserInfoUpdate,
                    data: authData.result
                })

                localStorage.setItem("phone", authData.result.phone);
                localStorage.setItem("isAuth", authData.result.isAuth);
                localStorage.setItem("isAdult", authData.result.isAdult);

                dispatch(BottomNavOpenAction);
                setPageTrans('trans toRight');
                history.push('/main');
                return
            }
        }
    }


    const handlePhoneNumber = useCallback((e) => {
        setPhoneNumber(e.target.value);

        const reg = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;

        //휴대폰번호 벨리데이션
        if (!reg.test(e.target.value)) {
            setPageConfirmStatus(false);
            setPhoneNumberPageStatus(false);
            setPhoneErrorText('올바른 휴대폰 번호를 입력해주세요.');
            return
        }

        setPhoneErrorText('');
        setPageConfirmStatus(true);
        setPhoneNumberPageStatus(true);
    }, [phoneNumber]);

    const handlePhoneAuthCode = useCallback((e) => {
        setPhoneAuthCode(e.target.value);

        //타이머 벨리데이션
        if (!codeInputAccess) {
            setPageConfirmStatus(false);
            setphoneAuthPageStatus(false);
            setTimerErrorText('인증시간이 만료되었습니다. 재발송을 해주세요.');
            return
        }

        //인증코드 벨리데이션
        if (e.target.value.length != 4) {
            setPageConfirmStatus(false);
            setphoneAuthPageStatus(false);
            // setTimerErrorText('올바른 인증코드를 입력해주세요.');
            setTimerErrorText('');
            return
        }

        setTimerErrorText('');
        setPageConfirmStatus(true);
        setphoneAuthPageStatus(true);
    }, [codeInputAccess, phoneAuthCode]);

    let min = 3;
    let sec = 0;

    //타이머 시작 함수
    const beginTimer = () => {

        setCodeInputAccess(true);
        setTimerErrorText('');
        setPhoneAuthCode('');

        min = 3;
        sec = 0;
        setTimeMin(min);
        setTimeSec(sec);

        //시간 감소
        const timer = setInterval(() => {

            if (min == 0 && sec == 0) {
                setTimerErrorText('인증시간이 만료되었습니다. 재발송을 해주세요.');
                clearInterval(timer);
                setCodeInputAccess(false);
                setPageConfirmStatus(false);
            }
            else {

                if (sec == 0) {
                    min = min - 1;
                    sec = 59;
                    setTimeMin(parseInt(min));
                    setTimeSec(sec);
                }
                else {
                    sec = sec - 1;
                    setTimeSec(parseInt(sec));
                }

            }

        }, 1000);

        setIntervalId(timer);
    };

    //재발송 함수
    const reGenrateCode = async () => {

        if (codeInputAccess) return

        //인증번호 전송 API 호출
        const data = await customApiClient('post', '/user/code/generate', {
            phone: phoneNumber
        })

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode != 200) {
            setPhoneErrorText(data.message);
            return
        }

        //성공시 로직
        setPhoneErrorText('');

        //타이머 함수 실행
        beginTimer();

    }



    //페이지 열기
    const openPage = (data) => {

        test = true;

        dispatch({
            type: LoginSubPageKind,
            data: data
        })

        dispatch({
            type: PageWrapOpen,
            data: 'loginPhone'
        });
        dispatch({
            type: PageOpen,
            data: 'loginPhone'
        });

    };


    return (
        <>
            <div className="page" style={{ backgroundColor: "#ffffff", position: 'relative' }}>

                <PageWrap>
                    {/* 뒤로가기 버튼 */}
                    {currentPage &&
                        <HeaderWrap id="back_link" className="spoqaBold" onClick={onClickBackButton} style={{ boxShadow: "none" }}>
                            <div
                                style={{
                                    position: "absolute",
                                    top: "55%",
                                    left: "1.25rem",
                                    transform: "translate(0,-55%)",
                                }}
                            >
                                <img src={icon_back}></img>
                            </div>
                            <TextMiddle>로그인</TextMiddle>
                        </HeaderWrap>
                    }

                    {/* 내용 부분 */}

                    {currentPage == 1 &&
                        <ContentWrap>
                            <MainText>
                                <span className="yellowText">휴대폰 번호</span>를 <br />
                                입력해주세요.
                            </MainText>
                            <LoginInput className="spoqaBold" value={phoneNumber} onChange={handlePhoneNumber} type="tel" placeholder="휴대폰 번호 (- 없이 입력)" />
                            <div className="spoqaRegular" style={{ height: '1.0625rem', margin: "0.125rem 0 1.125rem 0", fontSize: "0.6875rem", color: "#fb5e5e", lineHeight: "1.0625rem" }}>
                                {phoneErrorText}
                            </div>
                            <div className="spoqaRegular" onClick={() => { openPage('loginPhone') }} style={{ display: "flex" }}>
                                <div style={{ marginRight: "0.3125rem" }}>
                                    <img src={icon_info} style={{ width: "0.875rem", height: "0.875rem" }} />
                                </div>
                                <div style={{ paddingTop: '0.1563rem', fontSize: "0.6875rem", color: "#313131", opacity: "0.4", textDecoration: "underline", textDecorationColor: "#adadad", textUnderlinePosition: "under" }}>
                                    휴대폰 번호가 변경되었나요?
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                            </div>
                        </ContentWrap>
                    }

                    {currentPage == 2 &&
                        <ContentWrap>
                            <MainText>
                                <span className="yellowText">인증번호</span>를 <br />
                                입력해주세요.
                            </MainText>
                            <LoginInput className="spoqaBold" value={phoneAuthCode} onChange={handlePhoneAuthCode} type="tel" placeholder="인증번호 입력" />
                            <div className="spoqaRegular" style={{ height: '1.0625rem', margin: "0.125rem 0 0.0625rem 0", fontSize: "0.6875rem", color: "#fb5e5e", lineHeight: "1.0625rem" }}>
                                {timerErrorText}
                            </div>
                            <div className="spoqaBold" style={{ display: 'flex' }}>
                                <div style={{ flexGrow: '1' }}></div>
                                <div style={{ position: 'relative', width: '1.375rem' }}>
                                    <img style={{ position: 'absolute', top: "55%", transform: 'translate(0,-55%)', width: '1rem', height: '0.8125rem' }} src={icon_timeout} />
                                </div>
                                <div style={{ position: 'relative', width: '2.5rem', fontSize: '0.8125rem', color: '#fb5e5e' }}>
                                    <TextMiddle>
                                        {timeMin}:{timeSec < 10 ? `0${timeSec}` : timeSec}
                                    </TextMiddle>
                                </div>
                                <ReGenerateButton activateStatus={!codeInputAccess} onClick={reGenrateCode}>
                                    <div style={{ fontSize: '0.8125rem', color: '#ffffff' }}>재발송</div>
                                </ReGenerateButton>
                            </div>
                        </ContentWrap>
                    }


                    {/* 하단 '다음' 버튼 */}
                    <LoginButton className="spoqaBold" pageConfirmStatus={pageConfirmStatus} onClick={onclickNextButton}>
                        {buttonText}
                    </LoginButton>
                </PageWrap>
            </div>

            {/* 휴대폰 변경 안내 페이지 */}
            <div style={openLoginPhonePageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openLoginPhonePageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#ffffff" }}>
                        <PhoneChangePage />
                    </div>
                </Fade>
            </div>
        </>
    )
};

const ContentWrap = styled.div`
    display:flex;
    flex-direction:column;
    padding: 0 1.25rem;
`;

const ReGenerateButton = styled.div`
    padding: 0.375rem 0.7188rem 0.3125rem 0.7188rem;
    border-radius: 0.1875rem;
    background-color: ${props => props.activateStatus ? '#ffca17' : '#e3e3e3'};
`;

export default Login;