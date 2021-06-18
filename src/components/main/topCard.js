import React from 'react';
import styled from "styled-components";

import { useSelector } from "react-redux";

import { TextMiddle } from '../../styled/shared';
import { priceToString } from './bottomCard';


const TopCard = () => {


    const {
        currentPrice
    } = useSelector(state => state.main.analysis);

    return (
        <TopCardWrap className="spoqaBold">
            <TitleWrap>
                <div>
                    이번달 결제 예정
                </div>
            </TitleWrap>
            <PriceWrap>
                <TextMiddle>
                    <span>{priceToString(currentPrice)}</span>원
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