import React from 'react';
import styled from "styled-components";

import duck_img from "../../../assets/duck-money.gif";
import ContentNone from './contentNone';
import ContentFill from './contentFill';
import { priceToString } from '../bottomCard';
import { useSelector } from 'react-redux';


const MainCard = () => {

    const {
        currentPrice,
        pastPrice,
        pastMonth,
        pastPastPrice,
        pastPastMonth,
        analysisCategory
    } = useSelector(state => state.main.analysis);

    return (
        <MainWrap>

            <MainTopWrap className="spoqaBold">
                <div style={{ position: "relative", border: "1px solid #ffca17" }}>
                    <div style={{ fontSize: "0.8125rem" }}>이번달 총 결제 금액</div>
                    <div style={{ margin: "0.5rem 0 1.25rem 0", fontSize: "1.25rem" }}>{priceToString(currentPrice)}원</div>
                    <img style={{ position: "absolute", bottom: "-0.75rem", right: "0", width: "6.25rem" }} src={duck_img}></img>
                </div>
                <div style={{ display: "flex", padding: "0.8125rem 0", backgroundColor: "rgba(0,0,0,0.05)", color: "#ffffff", borderRadius: "0.4375rem" }}>
                    <div style={{ flexGrow: "1", textAlign: "center", borderRight: "0.0938rem solid rgba(255,255,255,0.29" }}>
                        <div style={{ marginBottom: "0.5rem", fontSize: "0.75rem" }}>{pastPastMonth}월 결제 금액</div>
                        <div style={{ fontSize: "1.0625rem" }}>{priceToString(pastPastPrice)}원</div>
                    </div>
                    <div style={{ flexGrow: "1", textAlign: "center" }}>
                        <div style={{ marginBottom: "0.5rem", fontSize: "0.75rem" }}>{pastMonth}월 결제 금액</div>
                        <div style={{ fontSize: "1.0625rem" }}>{priceToString(pastPrice)}원</div>
                    </div>
                </div>
            </MainTopWrap>
            <MainContentWrap className="spoqaBold">
                <div style={{ marginBottom: "0.625rem", fontSize: "0.8125rem", color: "#313131", opacity: "0.25" }}>이번달 결제 내역 분석</div>
                <div style={{ fontSize: "1.25rem" }}>{priceToString(currentPrice)}원</div>
                <div>
                    {analysisCategory.length > 0 ?
                        <ContentFill data={analysisCategory} /> :
                        <ContentNone />
                    }
                </div>
            </MainContentWrap>

        </MainWrap>
    )
};

const MainWrap = styled.div`

    position:absolute;
    top:3.0625rem;
    left:0;
    right:0;
    bottom:0;

    overflow-y:scroll;

    /* border:1px solid red; */
    padding:1.25rem;
`;

const MainTopWrap = styled.div`

    background-color:#ffca17;
    border-radius:0.4375rem;

    margin-bottom:0.8125rem;

    padding:1.125rem 1.25rem;
`;
const MainContentWrap = styled.div`

    padding:1.375rem 0.875rem 0.875rem 0.875rem;

    background-color:#ffffff;
    border-radius:0.4375rem;

    margin-bottom:0.8125rem;
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;

    text-align:center;
`;

export default MainCard;