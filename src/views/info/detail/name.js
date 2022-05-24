import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import icon_back from "../../../assets/icon-back-arrow.svg";
import { TextMiddle, LoginButton } from '../../../styled/shared';
import { TitleWrap, ItemWrap, InputWrap, Input } from '../../../styled/main/enrollment';
import { customApiClient } from '../../../shared/apiClient';
import { NameUpdate, UserInfoUpdate } from '../../../reducers/info/user';
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from '../../../reducers/container/message';
import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../../containers/pageTransContext';
import { BottomNavCloseAction } from '../../../reducers/container/bottomNav';


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

    useEffect(async () => {
        dispatch(BottomNavCloseAction);

        if (!currentName) {
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

    useEffect(() => {

        if (name.length < 1) {
            setConfirm(false);
            setError(false);
            setErrorMsg('');
            return
        }

        //닉네임 벨리데이션
        //특수문자&띄어쓰기 제외 6자리
        const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;
        if (reg.test(name) || name.length > 5) {
            setConfirm(false);
            setError(true);
            setErrorMsg('특수문자/띄어쓰기 제외 5자리로 입력해주세요.');
            return
        }

        setConfirm(true);
        setError(false);

    }, [name]);

    const onClickConfirmButton = useCallback(async () => {
        if (!confirm) return

        if (name == currentName) {
            setConfirm(false);
            setError(true);
            setErrorMsg('현재 등록된 닉네임과 동일한 이름입니다');
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
            setConfirm(false);
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
            data: '닉네임 변경이 완료되었습니다.'
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
                    <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>닉네임 변경하기</TextMiddle>
                </HeaderWrap>
                <div className="notoMedium" style={{ padding: '1.25rem' }}>
                    <TitleWrap style={{ marginTop: '0' }}>닉네임</TitleWrap>
                    <ItemWrap>
                        <InputWrap style={error ? { border: '0.0625rem solid #fb5e5e' } : { border: '0.0625rem solid #e8e8e8' }}>
                            <Input placeholder="닉네임을 입력하세요" onChange={handleName} value={name}></Input>
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
`;




export default NamePage;