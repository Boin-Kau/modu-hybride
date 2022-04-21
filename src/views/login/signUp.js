import React, { useState, useCallback, useEffect, useContext } from 'react';

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { useHistory, useLocation } from 'react-router-dom';

import { LoginButton, LoginInput, TextMiddle } from '../../styled/shared';

import icon_back from "../../assets/icon-back-arrow.svg";
import icon_info from "../../assets/info-black-192-x-192@3x.png";

import icon_male_fill from "../../assets/icon-male-fill.svg";
import icon_male_none from "../../assets/icon-male-none.svg";
import icon_female_fill from "../../assets/icon-female-fill.svg";
import icon_female_none from "../../assets/icon-female-none.svg";
import icon_timeout from "../../assets/icon-timeout.svg";
import icon_check from "../../assets/icon-check-white.svg";
import icon_arrow_right from "../../assets/icon-arrow-right-gray.svg";

import Fade from 'react-reveal/Fade';


import { customApiClient } from '../../shared/apiClient';
import { BottomNavOpenAction, BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { UserInfoUpdate } from '../../reducers/info/user';
import PhoneChangePage from './phoneChange';
import { PageWrapOpen, PageOpen, LoginSubPageKind } from '../../reducers/info/page';


import { onClickTerminate, checkMobile } from '../../App';
import { PartyIconWrap, PartyIcon } from '../../styled/main/enrollment';

import UpdatePopUp from '../popup/update';
import { PageTransContext } from '../../containers/pageTransContext';
import { GA_CATEOGRY, GA_USER_ACTION, GAEventSubmit } from '../../shared/gaSetting';
import { HeaderWrap } from '../../styled/shared/wrap';


const SignUp = () => {

    //모듈 선언
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    //context
    const { setPageTrans } = useContext(PageTransContext);

    //Global State 선언
    const {
        openLoginPhonePageWrapStatus,
        openLoginPhonePageStatus
    } = useSelector(state => state.info.page);

    //강제 업데이트 팝업
    const [updatePopupStatus, setUpdatePopupStatus] = useState(false);

    //현재 페이지
    const [currentPage, setCurrentPage] = useState(1);

    //현재 페이지의 타이틀
    const [currentPageTitle, setCurrentPageTitle] = useState("모두에서 사용할\n<span>닉네임</span>을 입력해주세요.");

    //페이지내 최종 벨리데이션
    const [pageConfirmStatus, setPageConfirmStatus] = useState(false);

    //페이지별 벨리데이션
    const [namePageStatus, setNamePageStatus] = useState(false);
    const [phoneNumberPageStatus, setPhoneNumberPageStatus] = useState(false);
    const [phoneAuthPageStatus, setphoneAuthPageStatus] = useState(false);
    const [etcPageStatus, setEtcPageStatus] = useState(true);
    const [agreePageStatus, setAgreePageStatus] = useState(false);


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

    //동의 데이터
    const [totalAgree, setTotalAgree] = useState(false);
    const [serviceAgree, setServiceAgree] = useState(false);
    const [personAgree, setPersonAgree] = useState(false);
    const [marketAgree, setMarketAgree] = useState(false);

    //확인버튼 텍스트
    const [buttonText, setButtonText] = useState('다음');

    //페이지 랜더링 시
    useEffect(() => {
        dispatch(BottomNavCloseAction);

        localStorage.removeItem('isFcmLoad');

        const userPlatform = checkMobile();

        if (userPlatform == 'android') {

            //splash close 함수 호출
            try {
                window.android.closeSplash();
            }
            catch (err) {
                console.log(err);
            }

        }
        else if (userPlatform == 'ios') {

            //splash close 함수 호출
            try {
                window.webkit.messageHandlers.closeSplash.postMessage("hihi");
            }
            catch (err) {
                console.log(err);
            }

        }

        //앱 버전 체크
        const verson = localStorage.getItem('versonName');

        if (!verson || verson < '2.0.0') {
            if (process.env.NODE_ENV !== 'development') {
                setUpdatePopupStatus(true);
            }
        }

        //이름 찾기 완료시 바로 입력되게 처리
        if (location.props && location.props.name) {
            setName(location.props.name);
            setNameErrorText("");
            setPageConfirmStatus(true);
            setNamePageStatus(true);
        }

    }, []);

    //개별선택 이벤트 감지
    useEffect(() => {

        //초기 실행 로직 방지
        if (!phoneAuthPageStatus) return

        //선택 처리 로직
        if (serviceAgree && personAgree) {
            setPageConfirmStatus(true);
            setAgreePageStatus(true);
        }
        else {
            setPageConfirmStatus(false);
            setAgreePageStatus(false);
        }

        //전체선택 처리 로직
        if (serviceAgree && personAgree && marketAgree) {
            setTotalAgree(true);
        }
        else {
            setTotalAgree(false);
        }

    }, [serviceAgree, personAgree, marketAgree])


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
            case 5:
                setCurrentPage(4);
                setButtonText('다음');
                setPageConfirmStatus(true);
                setCurrentPageTitle("당신에 대해서\n알려주세요!");
                break
            default:
                break
        }
    }

    const onclickNextButton = async () => {
        //currentPage 값과 pageStatus 값으로 검증 후 넘겨주기

        if (currentPage == 1 && namePageStatus) {

            //닉네임 중복 벨리데이션
            const res = await customApiClient('post', `/user/name/check`, {
                name: name
            });

            //서버에러
            if (!res) return

            if (res.statusCode !== 200) {
                setPageConfirmStatus(false);
                setNamePageStatus(false);
                setNameErrorText("이미 사용중인 닉네임 입니다.");
                return
            }

            setCurrentPage(2);
            setPhoneErrorText('');
            setCurrentPageTitle("본인 인증을\n진행해주세요.");
            setPageConfirmStatus(phoneNumberPageStatus);
            return
        }

        if (currentPage == 2 && phoneNumberPageStatus) {

            //인증번호 전송 API 호출
            const data = await customApiClient('post', '/user/signup/generate', {
                phone: phoneNumber
            })

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                setPhoneErrorText(data.message);
                setPageConfirmStatus(false);
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

            //인증코드 인증 API 호출
            const data = await customApiClient('post', '/user/signup/auth', {
                phone: phoneNumber,
                code: phoneAuthCode
            })

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                setTimerErrorText(data.message);
                return
            }

            clearInterval(intervalId);
            setCurrentPage(4);
            setCurrentPageTitle("당신에 대해서\n알려주세요!")
            setPageConfirmStatus(etcPageStatus);
        }

        if (currentPage == 4 && etcPageStatus) {
            setCurrentPage(5);
            setButtonText('확인');
            setCurrentPageTitle("모두의 서비스 이용을 위해\n약관에 동의해주세요.")
            setPageConfirmStatus(agreePageStatus);
        }

        if (currentPage == 5 && agreePageStatus) {

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

            //marketing
            const marketingAgree = marketAgree ? 'Y' : 'N';

            const data = await customApiClient('post', '/user', {
                name: name,
                phone: phoneNumber,
                sex: userSex,
                age: userAge,
                marketingAgree: marketingAgree
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

            // ReactGA.event({
            //     category: 'User',
            //     action: 'SignUp an Account'
            // });

            GAEventSubmit(GA_CATEOGRY.USER, GA_USER_ACTION.SIGNIN);

            //메인 페이지 이동 로직
            dispatch(BottomNavOpenAction);
            setPageTrans('trans toRight');
            history.push('/main');
            return
        }
    }

    const handleName = useCallback((e) => {
        setName(e.target.value);

        if (e.target.value.length < 1) {
            setPageConfirmStatus(false);
            setNamePageStatus(false);
            setNameErrorText("");
            return
        }

        //닉네임 벨리데이션
        //특수문자&띄어쓰기 제외 6자리
        const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;

        if (reg.test(e.target.value) || e.target.value.length > 5) {
            setPageConfirmStatus(false);
            setNamePageStatus(false);
            setNameErrorText("특수문자/띄어쓰기 제외 5자리로 입력해주세요.");
            return
        }

        setNameErrorText("");
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

    //전체선택 클릭
    const handleOnclickTotal = () => {
        setTotalAgree(!totalAgree);

        setServiceAgree(!totalAgree);
        setPersonAgree(!totalAgree);
        setMarketAgree(!totalAgree);
    }

    //개별선택 클릭
    const handleOnclickSub = (index) => {

        if (index == 0) {
            setServiceAgree(!serviceAgree);
        }
        else if (index == 1) {
            setPersonAgree(!personAgree);
        }
        else {
            setMarketAgree(!marketAgree);
        }

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

    //이름찾기 페이지 이동
    const handleClickFindName = () => {
        setPageTrans('trans toRight');
        history.push('phone');
    }

    return (
        <>
            <div className="page" style={{ backgroundColor: "#ffffff", position: 'relative' }}>

                <HeaderWrap id="back_link" className="spoqaBold" onClick={onClickBackButton}>
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
                    <TextMiddle>회원가입</TextMiddle>
                </HeaderWrap>

                {/* 제목 부분 */}
                <TitleTextWrap className="spoqaBold">
                    {
                        currentPage === 1 &&
                        <div>
                            <div>모두에서 사용할</div>
                            <div><span className="yellowText">닉네임</span>을 입력해주세요.</div>
                        </div>
                    }
                    {
                        currentPage === 2 &&
                        <div>
                            <div>회원가입을 위한</div>
                            <div><span className="yellowText">휴대폰 번호</span>를 입력해주세요.</div>
                        </div>
                    }
                    {
                        currentPage === 3 &&
                        <div>
                            <div><span className="yellowText">인증번호</span>를</div>
                            <div>입력해주세요.</div>
                        </div>
                    }
                    {
                        currentPage === 4 &&
                        <div>
                            <div>당신에 대해서</div>
                            <div>입력해주세요!</div>
                        </div>
                    }
                    {
                        currentPage === 5 &&
                        <div>
                            <div>모두의 서비스 이용을 위해</div>
                            <div><span className="yellowText">약관에 동의</span>해주세요.</div>
                        </div>
                    }
                </TitleTextWrap>

                {/* 내용 부분 */}
                {currentPage == 1 &&
                    <ContentWrap>
                        <LoginInput className="spoqaBold" value={name} onChange={handleName} type="text" placeholder="닉네임" />
                        <div className="spoqaRegular" style={{ height: '1.0625rem', margin: "0.125rem 0 1.125rem 0", fontSize: "0.6875rem", color: "#fb5e5e", lineHeight: "1.0625rem" }}>
                            {nameErrorText}
                        </div>
                    </ContentWrap>
                }

                {currentPage == 2 &&
                    <ContentWrap>
                        <LoginInput className="spoqaBold" value={phoneNumber} onChange={handlePhoneNumber} type="tel" placeholder="휴대폰 번호 (- 없이 입력)" />
                        <div className="spoqaRegular" style={{ height: '1.0625rem', margin: "0.125rem 0 1.125rem 0", fontSize: "0.6875rem", color: "#fb5e5e", lineHeight: "1.0625rem" }}>
                            {phoneErrorText}
                        </div>
                        {/* <div className="spoqaRegular" onClick={() => { openPage('loginPhone') }} style={{ display: "flex" }}>
                            <div style={{ marginRight: "0.3125rem" }}>
                                <img src={icon_info} style={{ width: "0.875rem", height: "0.875rem" }} />
                            </div>
                            <div style={{ paddingTop: '0.1563rem', fontSize: "0.6875rem", color: "#313131", opacity: "0.4", textDecoration: "underline", textDecorationColor: "#adadad", textUnderlinePosition: "under" }}>
                                휴대폰 번호가 변경되었나요?
                            </div>
                            <div style={{ flexGrow: "1" }}></div>
                        </div> */}
                    </ContentWrap>
                }

                {currentPage == 3 &&
                    <ContentWrap>
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

                {currentPage == 4 &&
                    <ContentWrap>

                        {/* 성별 선택 */}
                        <div className="notoMedium" style={{ fontSize: '0.8125rem', color: 'rgba(49,49,49,0.34)', marginBottom: '0.5rem' }}>성별을 알려주세요</div>
                        <EtcButtonWrap className="spoqaBold" style={{ marginBottom: "2.125rem" }}>
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
                        <div className="notoMedium" style={{ fontSize: '0.8125rem', color: 'rgba(49,49,49,0.34)', marginBottom: '0.5rem' }}>연령대를 알려주세요</div>
                        <EtcButtonWrap className="spoqaBold" style={{ marginBottom: "0.625rem" }}>
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

                        <EtcButtonWrap className="spoqaBold">
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

                {currentPage == 5 &&
                    <ContentWrap>
                        <div style={{ display: "flex", backgroundColor: '#f7f7f7', padding: '1.1875rem', marginBottom: '1.25rem' }} onClick={handleOnclickTotal}>
                            <PartyIconWrap isFree={totalAgree ? 'Y' : 'N'} style={{ width: '1.1875rem', height: '1.1875rem' }}>
                                <PartyIcon src={icon_check} />
                            </PartyIconWrap>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', color: '#313131', marginLeft: '0.5rem' }}>
                                모두 동의하기
                            </div>
                        </div>

                        <div style={{ display: "flex", padding: '0.6875rem 1.1875rem' }}>
                            <PartyIconWrap isFree={serviceAgree ? 'Y' : 'N'} style={{ width: '1.1875rem', height: '1.1875rem' }} onClick={() => { handleOnclickSub(0) }}>
                                <PartyIcon src={icon_check} />
                            </PartyIconWrap>
                            <div className="notoRegular" style={{ fontSize: '0.875rem', color: '#313131', marginLeft: '0.5rem' }} onClick={() => { handleOnclickSub(0) }}>
                                서비스 이용약관 (필수)
                            </div>
                            <div style={{ flexGrow: '1', marginTop: '0.125rem', textAlign: 'right' }} onClick={() => { openPage('serviceDetail') }}>
                                <img src={icon_arrow_right} style={{ width: '0.4375rem', height: '0.625rem' }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", padding: '0.6875rem 1.1875rem' }}>
                            <PartyIconWrap isFree={personAgree ? 'Y' : 'N'} style={{ width: '1.1875rem', height: '1.1875rem' }} onClick={() => { handleOnclickSub(1) }}>
                                <PartyIcon src={icon_check} />
                            </PartyIconWrap>
                            <div className="notoRegular" style={{ fontSize: '0.875rem', color: '#313131', marginLeft: '0.5rem' }} onClick={() => { handleOnclickSub(1) }}>
                                개인정보 수집 이용 동의 (필수)
                            </div>
                            <div style={{ flexGrow: '1', marginTop: '0.125rem', textAlign: 'right' }} onClick={() => { openPage('personDetail') }}>
                                <img src={icon_arrow_right} style={{ width: '0.4375rem', height: '0.625rem' }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", padding: '0.6875rem 1.1875rem' }}>
                            <PartyIconWrap isFree={marketAgree ? 'Y' : 'N'} style={{ width: '1.1875rem', height: '1.1875rem' }} onClick={() => { handleOnclickSub(2) }}>
                                <PartyIcon src={icon_check} />
                            </PartyIconWrap>
                            <div className="notoRegular" style={{ fontSize: '0.875rem', color: '#313131', marginLeft: '0.5rem' }} onClick={() => { handleOnclickSub(2) }}>
                                마케팅 정보 수신 동의 (선택)
                            </div>
                            <div style={{ flexGrow: '1', marginTop: '0.125rem', textAlign: 'right' }} onClick={() => { openPage('marketingDetail') }}>
                                <img src={icon_arrow_right} style={{ width: '0.4375rem', height: '0.625rem' }} />
                            </div>
                        </div>

                    </ContentWrap>
                }

                {/* 하단 '다음' 버튼 */}
                <LoginButton className="spoqaBold" pageConfirmStatus={pageConfirmStatus} onClick={onclickNextButton}>
                    {buttonText}
                </LoginButton>
            </div>

            {/* 휴대폰 변경 안내 페이지 */}
            <div style={openLoginPhonePageWrapStatus ? { display: "block" } : { display: "none" }}>
                <Fade right when={openLoginPhonePageStatus} duration={300}>
                    <div style={{ zIndex: "1000", position: "absolute", top: "0", right: "0", left: "0", bottom: "0", backgroundColor: "#ffffff" }}>
                        <PhoneChangePage />
                    </div>
                </Fade>
            </div>

            {/* 업데이트 팝업 */}
            <UpdatePopUp openStatus={updatePopupStatus} />
        </>
    )
};

const TitleTextWrap = styled.div`
    padding-top:4.8125rem;
    margin: 0 0 3.0625rem 1.25rem;

    font-size:1.25rem;
    line-height:1.9375rem;

    color:#313131;

    .yellowText{
        color: #ffbc26;
    }
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

export default SignUp;