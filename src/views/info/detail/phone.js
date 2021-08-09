import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import icon_back from "../../../assets/icon-back-arrow.svg";

import { TextMiddle } from '../../../styled/shared';

import { TitleWrap, ItemWrap, InputWrap, Input } from '../../../styled/main/enrollment';
import { customApiClient } from '../../../shared/apiClient';
import { PhoneUpdate } from '../../../reducers/info/user';
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from '../../../reducers/container/message';
import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../../containers/pageTransContext';


const PhonePage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //store
    const {
        phone: currentPhone,
    } = useSelector(state => state.info.user);

    //context
    const { setPageTrans } = useContext(PageTransContext);

    //state
    const [phone, setPhone] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const [openAuth, setOpenAuth] = useState(false);
    const [code, setCode] = useState('');
    const [confirmCode, setConfirmCode] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const [errorMsgCode, setErrorMsgCode] = useState('');

    const [isSend, setIsSend] = useState(false);

    const closePage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    };

    const handelPhone = (e) => {
        setError(false);
        setErrorMsg('');

        setPhone(e.target.value);
    }

    useEffect(() => {

        const reg = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;

        //휴대폰번호 벨리데이션
        if (!reg.test(phone)) {
            setConfirm(false);
            return
        }

        setConfirm(true);

    }, [phone]);

    const onClickCodeGenerate = useCallback(async () => {
        if (!confirm) return

        if (phone == currentPhone) {
            setError(true);
            setErrorMsg('현재 등록된 번호와 동일한 번호입니다');
        }
        //서버통신
        const res = await customApiClient('put', `/user/phone/generate`, {
            phone: phone
        });

        //서버에러
        if (!res) return

        //벨리데이션
        if (res.statusCode != 200) {
            setError(true);
            setErrorMsg(res.message);
            return
        }

        setIsSend(true);
        setOpenAuth(true);
    }, [confirm, phone]);

    const handelCode = (e) => {
        setErrorCode(false);
        setErrorMsgCode('');

        setCode(e.target.value);
    }

    useEffect(() => {
        if (code.length != 4) {
            setConfirmCode(false);
            return
        }
        setConfirmCode(true);
    }, [code])

    const onClickCodeAuth = useCallback(async () => {
        if (!confirmCode) return

        //서버통신
        const res = await customApiClient('put', `/user/phone/auth`, {
            phone: phone,
            code: code
        });

        //서버에러
        if (!res) return

        //벨리데이션
        if (res.statusCode != 200) {
            setErrorCode(true);
            setErrorMsgCode(res.message);
            return
        }

        //store 이름 수정
        dispatch({
            type: PhoneUpdate,
            data: phone
        })

        closePage();

        //변경완료 팝업창 띄우기
        dispatch({
            type: MessageWrapOpen
        })
        dispatch({
            type: MessageOpen,
            data: '전화번호 변경이 완료되었습니다.'
        })
        setTimeout(() => {
            dispatch({
                type: MessageClose
            })
        }, 2000);
        setTimeout(() => {
            dispatch({
                type: MessageWrapClose
            })
        }, 2300);


    }, [confirmCode, code, phone]);

    return (
        <div className="page">
            <PageWrap>
                <HeaderWrap id="back_link" className="spoqaBold" onClick={closePage}>
                    <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>전화번호 변경하기</TextMiddle>
                </HeaderWrap>

                <div className="notoMedium" style={{ padding: '1.25rem 1.25rem 0.1875rem 1.25rem' }}>
                    <TitleWrap style={{ marginTop: '0' }}>전화번호</TitleWrap>
                    <ItemWrap>
                        <InputWrap style={error ? { border: '0.0625rem solid #fb5e5e' } : { border: '0.0625rem solid #e8e8e8' }}>
                            <Input placeholder="새 전화번호를 입력해주세요" type='tel' onChange={handelPhone} value={phone}></Input>
                        </InputWrap>
                        {!isSend ?
                            <SubmitButton className="spoqaBold" confirmStatus={confirm} onClick={onClickCodeGenerate}>
                                <SubmitText>
                                    {/* {
                                    openAuth ?
                                        "재발송" : "인증받기"
                                } */}
                                인증받기
                            </SubmitText>
                            </SubmitButton> :
                            <SubmitButton className="spoqaBold" confirmStatus={false} >
                                <SubmitText>
                                    발송완료
                            </SubmitText>
                            </SubmitButton>
                        }
                    </ItemWrap>
                    <div style={{ marginTop: '0.3125rem', fontSize: '0.6875rem', color: '#fb5e5e', height: '1.0625rem' }}>{errorMsg}</div>
                </div>

                <ConfirmWrap className="notoMedium" confirmStatus={openAuth}>
                    <TitleWrap style={{ marginTop: '0' }}>인증번호</TitleWrap>
                    <ItemWrap>
                        <InputWrap style={errorCode ? { border: '0.0625rem solid #fb5e5e' } : { border: '0.0625rem solid #e8e8e8' }}>
                            <Input placeholder="인증번호를 입력해주세요" type='tel' onChange={handelCode} value={code}></Input>
                        </InputWrap>
                        <SubmitButton className="spoqaBold" confirmStatus={confirmCode} onClick={onClickCodeAuth}>
                            <SubmitText>
                                확인
                        </SubmitText>
                        </SubmitButton>
                    </ItemWrap>
                    <div style={{ marginTop: '0.3125rem', fontSize: '0.6875rem', color: '#fb5e5e', height: '1.0625rem' }}>{errorMsgCode}</div>
                </ConfirmWrap>

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

const SubmitButton = styled.div`
    position: relative;
    width:6.25rem;

    background-color:${props => props.confirmStatus ? '#ffca17' : '#e3e3e3'};
    border-radius:0.375rem;

    margin-left:0.625rem;

`;
const SubmitText = styled.div`
    position:absolute;

    font-size:0.875rem;
    /* height:0.875rem; */

    width:100%;
    text-align:center;

    top:50%;
    transform:translate(0,-50%);

    color:#ffffff;
`;

const ConfirmWrap = styled.div`
    display:${props => props.confirmStatus ? 'block' : 'none'};
    padding: 0 1.25rem 0 1.25rem;
`;
export default PhonePage;