import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import icon_back from "../../../assets/icon-back-arrow.svg";
import { TextMiddle, LoginButton } from '../../../styled/shared';
import { TitleWrap, ItemWrap, InputWrap, Input } from '../../../styled/main/enrollment';
import { customApiClient } from '../../../shared/apiClient';
import { NameUpdate } from '../../../reducers/info/user';
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from '../../../reducers/container/message';
import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../../containers/pageTransContext';


const NamePage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        name: currentName,
    } = useSelector(state => state.info.user);

    //context
    const { setPageTrans } = useContext(PageTransContext);

    const [name, setName] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const handleName = (e) => {
        setError(false);
        setErrorMsg('');

        setName(e.target.value);
    }
    useEffect(() => {

        //이름 벨리데이션
        //한글 이름 2~4자 이내
        const reg = /^[가-힣]{2,4}$/;

        if (!reg.test(name)) {
            setConfirm(false);
            return
        }

        setConfirm(true);

    }, [name]);

    const onClickConfirmButton = useCallback(async () => {
        if (!confirm) return

        if (name == currentName) {
            setError(true);
            setErrorMsg('현재 등록된 이름과 동일한 이름입니다');
            return
        }

        //서버통신
        const res = await customApiClient('put', `/user/name`, {
            name: name
        });

        //서버에러
        if (!res) return

        //벨리데이션
        if (res.statusCode != 200) {
            setError(true);
            setErrorMsg(res.message);
            return
        }

        //store 이름 수정
        dispatch({
            type: NameUpdate,
            data: name
        })

        closePage();

        //변경완료 팝업창 띄우기
        dispatch({
            type: MessageWrapOpen
        })
        dispatch({
            type: MessageOpen,
            data: '이름 변경이 완료되었습니다.'
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

    }, [confirm, name, currentName]);

    const closePage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    };


    return (
        <div className="page">
            <PageWrap>
                <HeaderWrap id="back_link" className="spoqaBold" onClick={closePage}>
                    <div className="back_link_sub" style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>이름 변경하기</TextMiddle>
                </HeaderWrap>
                <div className="notoMedium" style={{ padding: '1.25rem' }}>
                    <TitleWrap style={{ marginTop: '0' }}>이름</TitleWrap>
                    <ItemWrap>
                        <InputWrap style={error ? { border: '0.0625rem solid #fb5e5e' } : { border: '0.0625rem solid #e8e8e8' }}>
                            <Input placeholder="이름을 입력하세요" onChange={handleName} value={name}></Input>
                        </InputWrap>
                    </ItemWrap>
                    <div style={{ marginTop: '0.3125rem', fontSize: '0.6875rem', color: '#fb5e5e' }}>{errorMsg}</div>
                </div>

                <LoginButton className="spoqaBold" pageConfirmStatus={confirm} onClick={onClickConfirmButton}>
                    변경
            </LoginButton>
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




export default NamePage;