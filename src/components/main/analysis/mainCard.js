import React from 'react';
import styled from "styled-components";

import duck_img from "../../../assets/group-61@3x.png";
import duck_none_img from "../../../assets/duck-none.svg";
import ContentNone from './contentNone';
import ContentFill from './contentFill';
import { priceToString } from '../bottomCard';
import { useSelector } from 'react-redux';


const dummy = [
    {
        "idx": 1,
        "category": "OTT",
        "categoryImg": "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
        "itemCount": 3,
        "itemList": [
            {
                id: 1,
                logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
                title: "멜론",
                category: "음악",
                price: 8690
            },
            {
                id: 2,
                logoImg: "https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI",
                title: "넷플릭스",
                category: "OTT",
                price: 3625
            },
            {
                id: 3,
                logoImg: "data:image/png;base64,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",
                title: "왓챠",
                category: "OTT",
                price: 3625
            }
        ],
        "totalPrice": 28000,
        "ratio": 60
    },
    {
        "idx": 2,
        "category": "음악",
        "categoryImg": "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
        "itemCount": 1,
        "itemList": [
            {
                id: 1,
                logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
                title: "멜론",
                category: "음악",
                price: 8690
            }
        ],
        "totalPrice": 15000,
        "ratio": 20
    },
    {
        "idx": 3,
        "category": "기타",
        "categoryImg": "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
        "itemCount": 1,
        "itemList": [
            {
                id: 1,
                logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
                title: "멜론",
                category: "음악",
                price: 8690
            }
        ],
        "totalPrice": 3625,
        "ratio": 20
    },
]

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

            <MainTopWrap>
                <div style={{ position: "relative", border: "1px solid #ffca17" }}>
                    <div style={{ fontSize: "0.8125rem" }}>이번달 결제 예정</div>
                    <div style={{ margin: "0.5rem 0 1.25rem 0", fontSize: "1.25rem" }}>{priceToString(currentPrice)}원</div>
                    <img style={{ position: "absolute", bottom: "-0.625rem", right: "0", width: "5.625rem", height: "4.5rem" }} src={duck_img}></img>
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
            <MainContentWrap>
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
    top:2.5625rem;
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