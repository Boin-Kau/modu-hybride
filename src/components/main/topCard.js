import React, { useCallback } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { AlertPageWrapOpenAction, AlertPageOpenAction } from '../../reducers/main/alert';


import icon_alarm from "../../assets/icon-alarm-new.svg";
import { TextMiddle } from '../../styled/shared';


const TopCard = () => {

    const dispatch = useDispatch();

    //알림페이지 열기
    // const openAlertPage = useCallback(() => {
    //     dispatch(AlertPageWrapOpenAction);
    //     dispatch(AlertPageOpenAction);
    // }, []);

    return (
        <TopCardWrap>
            <TitleWrap>
                <div >
                    <TextMiddle>이번달 결제 예정</TextMiddle>
                </div>
                <div style={{ flexGrow: "1" }}></div>
                {/* <div onClick={openAlertPage} style={{ zIndex: '10' }}>
                    <img src={icon_alarm} />
                </div> */}
            </TitleWrap>
            <PriceWrap>
                <TextMiddle>
                    <span>58,000</span>원
                </TextMiddle>
            </PriceWrap>
        </TopCardWrap>
    )
};

const TopCardWrap = styled.div`
    /* border:1px solid red; */
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

export default TopCard;