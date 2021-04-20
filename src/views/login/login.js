import React, { useState, useCallback, useEffect } from 'react';

import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from 'react-router-dom';

import { LoginButton, LoginInput, TextMiddle } from '../../styled/shared';

import icon_back from "../../assets/icon-back-arrow.svg";
import icon_info from "../../assets/info-black-192-x-192@3x.png";

import icon_male_fill from "../../assets/icon-male-fill.svg";
import icon_male_none from "../../assets/icon-male-none.svg";
import icon_female_fill from "../../assets/icon-female-fill.svg";
import icon_female_none from "../../assets/icon-female-none.svg";
import icon_timeout from "../../assets/icon-timeout.svg";


import { customApiClient } from '../../shared/apiClient';
import { BottomNavOpenAction } from '../../reducers/container/bottomNav';


const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    //현재 페이지
    const [currentPage, setCurrentPage] = useState(1);

    //현재 페이지의 타이틀
    const [currentPageTitle, setCurrentPageTitle] = useState("이름을\n알려주세요.");

    //페이지내 최종 벨리데이션
    const [pageConfirmStatus, setPageConfirmStatus] = useState(false);

    //페이지별 벨리데이션
    const [namePageStatus, setNamePageStatus] = useState(false);
    const [phoneNumberPageStatus, setPhoneNumberPageStatus] = useState(false);
    const [phoneAuthPageStatus, setphoneAuthPageStatus] = useState(false);
    const [etcPageStatus, setEtcPageStatus] = useState(true);

    //회원가입 데이터
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneAuthCode, setPhoneAuthCode] = useState('');

    //타이머 데이터
    const [timeMin, setTimeMin] = useState(3);
    const [timeSec, setTimeSec] = useState(0);
    const [codeInputAccess, setCodeInputAccess] = useState(false);
    const [intervalId, setIntervalId] = useState();


    //에러 메세지
    const [nameErrorText, setNameErrorText] = useState('');
    const [phoneErrorText, setPhoneErrorText] = useState('');
    const [timerErrorText, setTimerErrorText] = useState('');

    //성별 및 연령 데이터
    const [sex, setSex] = useState({
        MALE: true,
        FEMALE: false
    })
    const [age, setAge] = useState({
        ONE: true,
        TWO: false,
        THREE: false,
        FOUR: false,
        FIVE: false,
        MORE: false,
    })



    const onClickBackButton = () => {

        //currentPage 값과 pageStatus 값으로 검증 후 넘겨주기

        switch (currentPage) {
            case 2:
                setCurrentPage(1);
                setPageConfirmStatus(true);
                setCurrentPageTitle("이름을\n알려주세요.");
                break
            case 3:
                setCurrentPage(2);
                setPageConfirmStatus(true);
                setCodeInputAccess(false);
                clearInterval(intervalId);
                setphoneAuthPageStatus(false)
                setCurrentPageTitle("본인 인증을\n진행해주세요.");
                break
            case 4:
                setCurrentPage(3);
                setPageConfirmStatus(true);
                setCurrentPageTitle("인증번호를\n입력해주세요.");
                break
            default:
                break
        }
    }

    const onclickNextButton = async () => {
        console.log("hihi")
        //currentPage 값과 pageStatus 값으로 검증 후 넘겨주기

        if (currentPage == 1 && namePageStatus) {
            setCurrentPage(2);
            setPhoneErrorText('');
            setCurrentPageTitle("본인 인증을\n진행해주세요.");
            setPageConfirmStatus(phoneNumberPageStatus);
            return
        }

        if (currentPage == 2 && phoneNumberPageStatus) {

            //인증번호 전송 API 호출
            const data = await customApiClient('post', '/user/code/generate', {
                name: name,
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
            setCurrentPage(3);
            setCurrentPageTitle("인증번호를\n입력해주세요.");
            setPageConfirmStatus(phoneAuthPageStatus);
            return
        }

        if (currentPage == 3 && phoneAuthPageStatus && codeInputAccess) {

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

            //회원가입 로직
            if (data.statusCode == 100) {
                clearInterval(intervalId);
                setCurrentPage(4);
                setCurrentPageTitle("당신에 대해서\n알려주세요!")
                setPageConfirmStatus(etcPageStatus);
                return
            }

            //로그인 로직
            if (data.statusCode == 200) {
                localStorage.setItem('x-access-token', data.jwt);
                dispatch(BottomNavOpenAction);
                history.push('/main');
                return
            }
        }

        if (currentPage == 4 && etcPageStatus) {
            console.log("회원가입 로직 실행");

            let userSex = '';
            let userAge = -1;

            //sex
            userSex = sex.MALE ? "MALE" : "FEMALE";

            //age
            if (age.ONE) {
                userAge = 1;
            }
            else if (age.TWO) {
                userAge = 2;
            }
            else if (age.THREE) {
                userAge = 3;
            }
            else if (age.FOUR) {
                userAge = 4;
            }
            else if (age.FIVE) {
                userAge = 5;
            }
            else {
                userAge = 6;
            }

            const data = await customApiClient('post', '/user', {
                name: name,
                phone: phoneNumber,
                sex: userSex,
                age: userAge
            })

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                alert(data.message);
                return
            }

            //토큰저장
            localStorage.setItem('x-access-token', data.jwt);

            //메인 페이지 이동 로직
            dispatch(BottomNavOpenAction);
            history.push('/main');
            return
        }
    }

    const handleName = useCallback((e) => {
        setName(e.target.value);

        console.log(e.target.value);
        console.log(name)

        //이름 벨리데이션
        //한글 이름 2~4자 이내
        const reg = /^[가-힣]{2,4}$/;

        if (!reg.test(e.target.value)) {
            setPageConfirmStatus(false);
            setNamePageStatus(false);
            // setNameErrorText("올바른 이름을 입력해주세요.");
            return
        }

        // setNameErrorText("");
        setPageConfirmStatus(true);
        setNamePageStatus(true);
    }, [name]);

    const handlePhoneNumber = useCallback((e) => {
        setPhoneNumber(e.target.value);

        const reg = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;

        //휴대폰번호 벨리데이션
        if (!reg.test(e.target.value)) {
            setPageConfirmStatus(false);
            setPhoneNumberPageStatus(false);
            return
        }

        setPageConfirmStatus(true);
        setPhoneNumberPageStatus(true);
    }, [phoneNumber]);

    const handlePhoneAuthCode = useCallback((e) => {
        setPhoneAuthCode(e.target.value);

        console.log(codeInputAccess)

        //타이머 벨리데이션
        if (!codeInputAccess) {
            setPageConfirmStatus(false);
            setphoneAuthPageStatus(false);
            setTimerErrorText('인증시간이 만료되었습니다. 재발송을 해주세요.');
            return
        }

        //휴대폰번호 벨리데이션
        if (phoneNumber.length < 2) {
            setPageConfirmStatus(false);
            setphoneAuthPageStatus(false);
            setTimerErrorText('올바른 인증코드를 입력해주세요.');
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
                console.log("test 3");

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
    const reGenrateCode = () => {

        if (codeInputAccess) return

        //코드 발송 api 호출

        //타이머 함수 실행
        beginTimer();

    }

    const handleOnclickSex = (type) => {

        setSex({
            MALE: type == "MALE",
            FEMALE: type == "FEMALE"
        })

    }

    const handelOnclickAge = (type) => {

        setAge({
            ONE: type == "ONE",
            TWO: type == "TWO",
            THREE: type == "THREE",
            FOUR: type == "FOUR",
            FIVE: type == "FIVE",
            MORE: type == "MORE"
        })

    }

    return (
        <>
            <div className="page" style={{ backgroundColor: "#ffffff", position: 'relative' }}>

                {/* 뒤로가기 버튼 */}
                {currentPage != 1 &&
                    <BackIconWrap onClick={onClickBackButton}>
                        <BackIcon src={icon_back} />
                    </BackIconWrap>
                }

                {/* 제목 부분 */}
                <TitleTextWrap>
                    {
                        currentPageTitle.split('\n').map(line => {
                            return (<span key={line}>{line}<br /></span>)
                        })
                    }
                </TitleTextWrap>

                {/* 내용 부분 */}
                {currentPage == 1 &&
                    <ContentWrap>
                        <LoginInput value={name} onChange={handleName} type="text" placeholder="이름" />
                        <div style={{ height: '1.0625rem', margin: "0.125rem 0 0.0625rem 0", fontSize: "0.6875rem", color: "#fb5e5e", lineHeight: "1.0625rem" }}>
                            {nameErrorText}
                        </div>
                    </ContentWrap>
                }

                {currentPage == 2 &&
                    <ContentWrap>
                        <LoginInput value={phoneNumber} onChange={handlePhoneNumber} type="tel" placeholder="휴대폰 번호 (- 없이 입력)" />
                        <div style={{ height: '1.0625rem', margin: "0.125rem 0 0.4375rem 0", fontSize: "0.6875rem", color: "#fb5e5e", lineHeight: "1.0625rem" }}>
                            {phoneErrorText}
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ marginRight: "0.3125rem" }}>
                                <img src={icon_info} style={{ width: "0.875rem", height: "0.875rem" }} />
                            </div>
                            <div style={{ fontSize: "0.6875rem", color: "#313131", opacity: "0.4", textDecoration: "underline", textDecorationColor: "#adadad", textUnderlinePosition: "under" }}>
                                휴대폰 번호가 변경되었나요?
                            </div>
                            <div style={{ flexGrow: "1" }}></div>
                        </div>
                    </ContentWrap>
                }

                {currentPage == 3 &&
                    <ContentWrap>
                        <LoginInput value={phoneAuthCode} onChange={handlePhoneAuthCode} type="number" placeholder="인증번호 입력" />
                        <div style={{ height: '1.0625rem', margin: "0.125rem 0 0.0625rem 0", fontSize: "0.6875rem", color: "#fb5e5e", lineHeight: "1.0625rem" }}>
                            {timerErrorText}
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flexGrow: '1' }}></div>
                            <div style={{ position: 'relative', width: '1.375rem' }}>
                                <img style={{ position: 'absolute', top: "46%", transform: 'translate(0,-46%)', width: '1rem', height: '0.8125rem' }} src={icon_timeout} />
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

                {currentPage == 4 &&
                    <ContentWrap>

                        {/* 성별 선택 */}
                        <EtcButtonWrap style={{ marginBottom: "2.125rem" }}>
                            <EtcButton selectedStatus={sex.MALE} type="sex" style={{ marginRight: "0.625rem" }} onClick={() => { handleOnclickSex("MALE") }}>
                                <EtcButtonIconWrap>
                                    {
                                        sex.MALE ?
                                            <EtcButtonIcon src={icon_male_fill} /> :
                                            <EtcButtonIcon src={icon_male_none} />
                                    }
                                </EtcButtonIconWrap>
                                <EtcButtonText selectedStatus={sex.MALE} type="sex">남자</EtcButtonText>
                            </EtcButton>
                            <EtcButton selectedStatus={sex.FEMALE} type="sex" onClick={() => { handleOnclickSex("FEMALE") }}>
                                <EtcButtonIconWrap>
                                    {
                                        sex.FEMALE ?
                                            <EtcButtonIcon src={icon_female_fill} /> :
                                            <EtcButtonIcon src={icon_female_none} />
                                    }
                                </EtcButtonIconWrap>
                                <EtcButtonText selectedStatus={sex.FEMALE} type="sex">여자</EtcButtonText>
                            </EtcButton>
                        </EtcButtonWrap>

                        {/* 연령대 선택 */}
                        <EtcButtonWrap style={{ marginBottom: "0.625rem" }}>
                            <EtcButton selectedStatus={age.ONE} type="age" style={{ marginRight: "0.625rem" }} onClick={() => { handelOnclickAge("ONE") }}>
                                <EtcButtonText selectedStatus={age.ONE} type="age">10대</EtcButtonText>
                            </EtcButton>
                            <EtcButton selectedStatus={age.TWO} type="age" style={{ marginRight: "0.625rem" }} onClick={() => { handelOnclickAge("TWO") }}>
                                <EtcButtonText selectedStatus={age.TWO} type="age">20대</EtcButtonText>
                            </EtcButton>
                            <EtcButton selectedStatus={age.THREE} type="age" onClick={() => { handelOnclickAge("THREE") }}>
                                <EtcButtonText selectedStatus={age.THREE} type="age">30대</EtcButtonText>
                            </EtcButton>
                        </EtcButtonWrap>

                        <EtcButtonWrap>
                            <EtcButton selectedStatus={age.FOUR} type="age" style={{ marginRight: "0.625rem" }} onClick={() => { handelOnclickAge("FOUR") }}>
                                <EtcButtonText selectedStatus={age.FOUR} type="age">40대</EtcButtonText>
                            </EtcButton>
                            <EtcButton selectedStatus={age.FIVE} type="age" style={{ marginRight: "0.625rem" }} onClick={() => { handelOnclickAge("FIVE") }}>
                                <EtcButtonText selectedStatus={age.FIVE} type="age">50대</EtcButtonText>
                            </EtcButton>
                            <EtcButton selectedStatus={age.MORE} type="age" onClick={() => { handelOnclickAge("MORE") }}>
                                <EtcButtonText selectedStatus={age.MORE} type="age">50대 이상</EtcButtonText>
                            </EtcButton>
                        </EtcButtonWrap>
                    </ContentWrap>
                }

                {/* 하단 '다음' 버튼 */}
                <LoginButton pageConfirmStatus={pageConfirmStatus} onClick={onclickNextButton}>
                    다음
                </LoginButton>
            </div>
        </>
    )
};

const TitleTextWrap = styled.div`
    padding-top:3.5rem;
    margin: 0 0 3.0625rem 1.25rem;

    font-size:1.25rem;
    line-height:1.9375rem;

    color:#313131;
`;

const ContentWrap = styled.div`
    display:flex;
    flex-direction:column;
    padding: 0 1.25rem;
`;

const BackIconWrap = styled.div`
    position:absolute;
    padding:0.9375rem 1.25rem;

    top:0;
    left:0;
`;
const BackIcon = styled.img`
    width:0.9375rem;
    height:0.8125rem;
`;

const ReGenerateButton = styled.div`
    padding: 0.375rem 0.7188rem 0.3125rem 0.7188rem;
    border-radius: 0.1875rem;
    background-color: ${props => props.activateStatus ? '#ffca17' : '#e3e3e3'};
`;

const EtcButtonWrap = styled.div`
    display:flex;
`;

const EtcButton = styled.div`
    flex-grow:1;
    flex-basis:0;

    background-color: ${props => props.selectedStatus ? '#ffca17' : '#e3e3e3'};
    border-radius: ${props => props.type == 'age' ? '0.4375rem' : '0.25rem'};
`;

const EtcButtonIconWrap = styled.div`
    position: relative;
    margin:0.8125rem 0 0.125rem 0;
`;

const EtcButtonIcon = styled.img`
    position: relative;
    left:50%;
    transform:translate(-50%,0);

    width:1.75rem;
    height:2.5625rem;
`;

const EtcButtonText = styled.div`
    text-align:center;

    /* border:1px solid red; */

    color: ${props => props.selectedStatus ? '#ffffff' : '#313131'};
    opacity: ${props => props.selectedStatus ? 1 : 0.4};

    font-size: ${props => props.type == 'age' ? '0.875rem' : '0.75rem'};
    line-height: ${props => props.type == 'age' && '1.4375rem'};
    margin: ${props => props.type == 'age' ? '10px 0 7px 0' : '0 0 0.5rem 0'};
`;

export default Login;