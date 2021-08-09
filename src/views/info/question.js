import React, { useState, useCallback, useContext, useEffect } from 'react';
import styled from "styled-components";

import { useDispatch } from "react-redux";

import icon_back from "../../assets/icon-back-arrow.svg";
import icon_arrow_down from "../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../assets/icon-arrow-up-gray.svg";

import { TextMiddle } from '../../styled/shared';
import Fade from 'react-reveal/Fade';
import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../containers/pageTransContext';
import { BottomNavCloseAction } from '../../reducers/container/bottomNav';


const QuestionPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { setPageTrans } = useContext(PageTransContext);


    const closePage = useCallback(() => {
        setPageTrans('trans toLeft');
        history.goBack();
    }, []);

    const [oneOpen, setOneOpen] = useState(false);
    const [twoOpen, setTwoOpen] = useState(false);
    const [threeOpen, setThreeOpen] = useState(false);

    const onClickContentOpen = useCallback((index) => {

        if (index == 0) {
            if (oneOpen) {
                setOneOpen(false);
            }
            else {
                setOneOpen(true);
            }
        }
        else if (index == 1) {
            if (twoOpen) {
                setTwoOpen(false);
            }
            else {
                setTwoOpen(true);
            }
        }
        else {
            if (threeOpen) {
                setThreeOpen(false);
            }
            else {
                setThreeOpen(true);
            }
        }

    }, [oneOpen, twoOpen, threeOpen]);

    useEffect(() => {
        dispatch(BottomNavCloseAction);
    }, [])


    return (


        <div className="page">
            <PageWrap>
                <HeaderWrap id="back_link" className="spoqaBold" onClick={closePage}>
                    <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>문의하기</TextMiddle>
                </HeaderWrap>
                <div style={{ flexGrow: '1', padding: '1.25rem' }}>

                    <div className="spoqaBold" style={{ borderBottom: '0.0437rem solid rgba(0,0,0,0.06)', paddingBottom: '0.875rem' }}>
                        자주 묻는 질문
                </div>
                    <ContentWrap onClick={() => { onClickContentOpen(0) }}>
                        <div style={{ display: 'flex', fontSize: '0.8125rem', height: '0.8125rem' }}>
                            <div className="notoMedium" style={{ marginRight: '0.5625rem' }}>01</div>
                            <div className="notoMedium">휴대폰 번호 변경 시 어떻게 해야하나요?</div>
                            {
                                !oneOpen ?
                                    <ContentMoreIcon src={icon_arrow_down} /> :
                                    <ContentMoreIcon src={icon_arrow_up} />
                            }
                        </div>
                    </ContentWrap>
                    <Fade collapse when={oneOpen} duration={500}>
                        <ContentDetailWrap className="notoRegular">
                            휴대폰 번호가 변경되었을 시, 마이페이지에서 전화번호 변경 기능을 사용하여 데이터 이전이 가능합니다.
                    <br /><br />
                    그러나 휴대폰 번호와 핸드폰 전부 변경되어서 불가능한 경우,  아래 내용을 1:1 문의로 남겨주시면 데이터를 이전해드립니다.
                    <br /><br />
                    1. 기존 전화번호 <br />
                    2. 모두에서 제공한 고유번호 6자리 <br />
                        </ContentDetailWrap>
                    </Fade>

                    <ContentWrap onClick={() => { onClickContentOpen(1) }}>
                        <div style={{ display: 'flex', fontSize: '0.8125rem', height: '0.8125rem' }}>
                            <div className="notoMedium" style={{ marginRight: '0.5625rem' }}>02</div>
                            <div className="notoMedium">구독 서비스 결제일이 말일인 경우 어떻게 되나요?</div>
                            {
                                !twoOpen ?
                                    <ContentMoreIcon src={icon_arrow_down} /> :
                                    <ContentMoreIcon src={icon_arrow_up} />
                            }
                        </div>
                    </ContentWrap>
                    <Fade collapse when={twoOpen} duration={500}>
                        <ContentDetailWrap className="notoRegular">
                            입력하신 결제일이 다음 달에 존재하지 않을 경우는 (예: 31일) 자동으로 직전일(예: 30일)이 정기 결제일로 변경됩니다.
                        <br /><br />
                        구독 플랫폼마다 결제 시스템의 차이가 존재할 수 있으니, 서비스 센터를 참고하시기 바랍니다.
                    </ContentDetailWrap>
                    </Fade>

                    <ContentWrap onClick={() => { onClickContentOpen(2) }}>
                        <div style={{ display: 'flex', fontSize: '0.8125rem', height: '0.8125rem' }}>
                            <div className="notoMedium" style={{ marginRight: '0.5625rem' }}>03</div>
                            <div className="notoMedium">화면이 가끔 끊기는 것 같아요.</div>
                            {
                                !threeOpen ?
                                    <ContentMoreIcon src={icon_arrow_down} /> :
                                    <ContentMoreIcon src={icon_arrow_up} />
                            }
                        </div>
                    </ContentWrap>
                    <Fade collapse when={threeOpen} duration={500}>
                        <ContentDetailWrap className="notoRegular">
                            아이폰의 경우, 저전력 모드를 사용 시 애니메이션 효과와 같은 일부 시각적인 효과가 최소화될 수 있습니다.
                       <br /><br />
                       자연스러운 현상이니 걱정하지마세요!
                    </ContentDetailWrap>
                    </Fade>

                </div>

                <a href="https://pf.kakao.com/_tKfKs" target="blank" style={{ textDecoration: 'none' }}>
                    <QuestionButtonWrap className="spoqaBold" pageConfirmStatus={false}>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            1:1 문의하기
                    </div>
                    </QuestionButtonWrap>
                </a>
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

const QuestionButtonWrap = styled.div`
    display:flex;
    margin:1.25rem;

    background-color:#ffca17;
    border-radius:0.375rem;

    padding:0.875rem 0 0.8125rem 0;

    font-size:0.8125rem;
    color:#ffffff;
`;

const ContentWrap = styled.div`
    position: relative;
    padding:0.8125rem 0 0.8125rem 0;

    border-bottom:0.0437rem solid rgba(0,0,0,0.06);
`;
const ContentDetailWrap = styled.div`
    padding:0.875rem 0.9375rem 1.1875rem 0.9375rem;

    font-size:0.8125rem;
    color:rgba(49,49,49,0.65);

    word-break:keep-all;
    line-height:1.3125rem;

    background-color:#f7f7f7;
`;
const ContentMoreIcon = styled.img`
    width:0.6875rem;
    height:0.5rem;

    position:absolute;
    top:50%;
    right:0;

    transform:translate(0,-50%);
`;

export default QuestionPage;