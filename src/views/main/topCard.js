import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";


import icon_alarm from "../../assets/icon-alarm-new.svg";


const TopCard = () => {


    return (
        <TopCardWrap>
            <TitleWrap>
                <div>
                    <TextMiddle>이번달 결제 예정</TextMiddle>
                </div>
                <div style={{ flexGrow: "1" }}></div>
                <div>
                    <img src={icon_alarm} />
                </div>
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

const TextMiddle = styled.div`
    position:absolute;
    top:50%;
    transform:translate(0,-50%);
`;

export default TopCard;