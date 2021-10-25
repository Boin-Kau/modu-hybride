import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch } from "react-redux";

import icon_back from "../../../assets/icon-back-arrow.svg";

import { TextMiddle } from '../../../styled/shared';
import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../../containers/pageTransContext';
import { BottomNavCloseAction } from '../../../reducers/container/bottomNav';


const AlertPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { setPageTrans } = useContext(PageTransContext);

    //inital logic
    useEffect(() => {
        dispatch(BottomNavCloseAction);
    }, [])

    const closeAlertPage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    };

    return (

        <div className="page" style={{ backgroundColor: "#ffffff" }}>
            <PageWrap>
                <HeaderWrap className="spoqaBold">
                    <div id="back_link" onClick={closeAlertPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>

                    <TextMiddle>알림</TextMiddle>
                </HeaderWrap>

                <div>

                    <AlertWrap isRead={false}>
                        <div style={{ marginRight: '0.875rem' }}>
                            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', backgroundColor: '#fb5e5e' }}>
                                <img />
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8125rem', lineHeight: '1.375rem' }}>‘왓챠 프리미엄’ 파티가 해체되었어요. 해체 요인을 확인해주세요.</div>
                            <div style={{ fontSize: '0.6875rem', marginTop: '0.1875rem', opacity: '0.4' }}>10분 전</div>
                        </div>
                    </AlertWrap>

                    <AlertWrap isRead={true}>
                        <div style={{ marginRight: '0.875rem' }}>
                            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', backgroundColor: '#fb5e5e' }}>
                                <img />
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8125rem', lineHeight: '1.375rem' }}>‘넷플릭스 프리미엄’ 파티에서 추방되었어요. 추방 요인을 확인해주세요.</div>
                            <div style={{ fontSize: '0.6875rem', marginTop: '0.1875rem', opacity: '0.4' }}>1일 전</div>
                        </div>
                    </AlertWrap>

                </div>
            </PageWrap>
        </div>
    )
};

const PageWrap = styled.div`

    position:absolute;
    top:2.5625rem;
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
    
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;

const AlertWrap = styled.div`
    display:flex;
    padding:1.25rem 1.5625rem 1.0625rem 1.25rem;

    background-color: ${props => props.isRead ? '#ffffff' : 'rgba(255, 202, 23,0.09)'};
`;




export default AlertPage;