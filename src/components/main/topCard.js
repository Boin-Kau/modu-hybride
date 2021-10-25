import React, { useContext } from 'react';
import styled from "styled-components";

import { useSelector } from "react-redux";

import { TextMiddle } from '../../styled/shared';
import { priceToString } from './bottomCard';

import notice_icon from '../../assets/icon-alarm.svg';
import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../containers/pageTransContext';

const TopCard = () => {

    const history = useHistory();

    const {
        willPayment
    } = useSelector(state => state.main.analysis);

    //context
    const { setPageTrans } = useContext(PageTransContext);

    const openAlertPage = () => {
        setPageTrans('trans toRight');
        history.push('/alert');
    };

    return (
        <TopCardWrap className="spoqaBold">
            <TitleWrap>
                <div>
                    이번달 결제 예정
                </div>
            </TitleWrap>
            <PriceWrap>
                <TextMiddle>
                    <span>{priceToString(willPayment)}</span>원
                </TextMiddle>
            </PriceWrap>
            <NoticeWrap onClick={openAlertPage}>
                <NoticeIcon src={notice_icon} />
                {/* <NoticeCount>1</NoticeCount> */}
            </NoticeWrap>
        </TopCardWrap>
    )
};

const TopCardWrap = styled.div`
    /* border:1px solid red; */

    position: relative;
    padding: 2.375rem 0.875rem 1.5rem 1.25rem;
`;

const TitleWrap = styled.div`
    /* border:1px solid red; */

    display: flex;
    position: relative;

    font-size:0.875rem;
`;

const PriceWrap = styled.div`
    /* border:1px solid red; */
    position: relative;

    height: 2.8125rem;
    font-size:1.875rem;
`;

const NoticeWrap = styled.div`
    position:absolute;
    top:1.5rem;
    right:0;
    padding:0.9688rem 1.5313rem;
    /* border:1px solid red; */
`;
const NoticeIcon = styled.img`
    width: 1.0313rem;
    height: 1.4875rem;
`;
const NoticeCount = styled.div`

    position: absolute;
    top:0.25rem;
    right:1.25rem;

    padding:0 0.1875rem;
    background-color:red;
    font-size:0.625rem;
    line-height:1.3125rem;
    color:white;
    text-align:center;
    border-radius:0.5rem;
`;

export default TopCard;