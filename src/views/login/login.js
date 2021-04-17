import React, { useState, useCallback } from 'react';

import styled, { css } from "styled-components";

import { useHistory } from 'react-router-dom';

import { LoginButton, LoginInput } from '../../styled/shared';

import icon_back from "../../assets/icon-back-arrow.svg";
import icon_info from "../../assets/info-black-192-x-192@3x.png";

import icon_male_fill from "../../assets/icon-male-fill.svg";
import icon_male_none from "../../assets/icon-male-none.svg";
import icon_female_fill from "../../assets/icon-female-fill.svg";
import icon_female_none from "../../assets/icon-female-none.svg";
import { apiClient, customApiClient } from '../../shared/apiClient';


const Login = () => {
    const history = useHistory();

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

    const onClickBackButton = () => {
        console.log("hoho")
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
            setCurrentPageTitle("본인 인증을\n진행해주세요.")
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
                alert(data.message);
                return
            }

            //성공시 로직
            setCurrentPage(3);
            setCurrentPageTitle("인증번호를\n입력해주세요.")
            setPageConfirmStatus(phoneAuthPageStatus);
            return
        }

        if (currentPage == 3 && phoneAuthPageStatus) {

            //인정코드 인증 API 호출

            //성공시 로직
            setCurrentPage(4);
            setCurrentPageTitle("당신에 대해서\n알려주세요!")
            setPageConfirmStatus(etcPageStatus);
            return
        }

        if (currentPage == 4 && etcPageStatus) {
            console.log("회원가입 로직 실행");
            // history.push('/main');
            window.location.href = '/main';
            return
        }
    }

    const handleName = useCallback((e) => {
        setName(e.target.value);

        //이름 벨리데이션
        if (name.length < 2) {
            setPageConfirmStatus(false);
            setNamePageStatus(false);
            return
        }

        setPageConfirmStatus(true);
        setNamePageStatus(true);
    }, [name]);

    const handlePhoneNumber = useCallback((e) => {
        setPhoneNumber(e.target.value);

        //휴대폰번호 벨리데이션
        if (phoneNumber.length < 2) {
            setPageConfirmStatus(false);
            setPhoneNumberPageStatus(false);
            return
        }

        setPageConfirmStatus(true);
        setPhoneNumberPageStatus(true);
    }, [phoneNumber]);

    const handlePhoneAuthCode = useCallback((e) => {
        setPhoneAuthCode(e.target.value);

        //휴대폰번호 벨리데이션
        if (phoneNumber.length < 2) {
            setPageConfirmStatus(false);
            setphoneAuthPageStatus(false);
            return
        }

        setPageConfirmStatus(true);
        setphoneAuthPageStatus(true);
    }, [phoneAuthCode]);

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
                    </ContentWrap>
                }

                {currentPage == 2 &&
                    <ContentWrap>
                        <LoginInput value={phoneNumber} onChange={handlePhoneNumber} type="tel" placeholder="휴대폰 번호 (- 없이 입력)" />
                        <div style={{ display: "flex", marginTop: "1.625rem" }}>
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
                    </ContentWrap>
                }

                {currentPage == 4 &&
                    <ContentWrap>

                        {/* 성별 선택 */}
                        <EtcButtonWrap style={{ marginBottom: "2.125rem" }}>
                            <EtcButton selectedStatus={true} type="sex" style={{ marginRight: "0.625rem" }}>
                                <EtcButtonIconWrap>
                                    <EtcButtonIcon src={icon_male_fill} />
                                </EtcButtonIconWrap>
                                <EtcButtonText selectedStatus={true} type="sex">남자</EtcButtonText>
                            </EtcButton>
                            <EtcButton selectedStatus={false} type="sex" >
                                <EtcButtonIconWrap>
                                    <EtcButtonIcon src={icon_female_none} />
                                </EtcButtonIconWrap>
                                <EtcButtonText selectedStatus={false} type="sex">여자</EtcButtonText>
                            </EtcButton>
                        </EtcButtonWrap>

                        {/* 연령대 선택 */}
                        <EtcButtonWrap style={{ marginBottom: "0.625rem" }}>
                            <EtcButton selectedStatus={true} type="age" style={{ marginRight: "0.625rem" }}>
                                <EtcButtonText selectedStatus={true} type="age">10대</EtcButtonText>
                            </EtcButton>
                            <EtcButton selectedStatus={false} type="age" style={{ marginRight: "0.625rem" }}>
                                <EtcButtonText selectedStatus={false} type="age">20대</EtcButtonText>
                            </EtcButton>
                            <EtcButton selectedStatus={false} type="age">
                                <EtcButtonText selectedStatus={false} type="age">30대</EtcButtonText>
                            </EtcButton>
                        </EtcButtonWrap>

                        <EtcButtonWrap>
                            <EtcButton selectedStatus={false} type="age" style={{ marginRight: "0.625rem" }}>
                                <EtcButtonText selectedStatus={false} type="age">40대</EtcButtonText>
                            </EtcButton>
                            <EtcButton selectedStatus={false} type="age" style={{ marginRight: "0.625rem" }}>
                                <EtcButtonText selectedStatus={false} type="age">50대</EtcButtonText>
                            </EtcButton>
                            <EtcButton selectedStatus={false} type="age">
                                <EtcButtonText selectedStatus={false} type="age">50대 이상</EtcButtonText>
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