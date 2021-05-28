import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";

import Fade from 'react-reveal/Fade';
import { getCategoryImg } from '../consumCard';
import { priceToString } from '../bottomCard';

import platform_none from "../../../assets/platform-none.svg";
import ContentNone from './contentNone';


export const getCategoryColor = categoryIdx => {
    switch (categoryIdx) {
        case 1: return '#20c8ed'
        case 2: return '#ffd121'
        case 3: return '#0fd9a5'
        case 4: return '#ff3465'
        case 5: return '#ff9250'
        case 6: return '#8f7deb'
        case 7: return '#3c94ff'
        default: return '#e3e3e3'
    }
}
const ItemDetail = ({ data }) => {

    return (
        <>
            <ItemDetailWrap>
                <div>
                    {
                        data.color && data.initial ?
                            <div style={{ position: 'relative', width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem", backgroundColor: data.color }}>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '1.375rem', height: '1.375rem', color: '#ffffff' }}>
                                    {data.initial}
                                </div>
                            </div>
                            :
                            <img src={data.serverImgUrl ? data.serverImgUrl : platform_none} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} />
                    }
                </div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0", lineHeight: "1.3125rem" }}>{data.registerType == 'CUSTOM' ? data.customName : data.serverName}</div>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem", opacity: "0.3", lineHeight: "1.375rem" }}>{data.registerType == 'CUSTOM' ? data.customCategory : data.serverCategory}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0", lineHeight: "1.3125rem" }}>{priceToString(data.price)}원</div>
                </div>
            </ItemDetailWrap>
        </>
    )
};

const Item = ({ data }) => {

    const [openStatus, setOpenStatus] = useState(false);

    const onclickOpenContent = () => {
        if (openStatus) {
            setOpenStatus(false);
        }
        else {
            setOpenStatus(true);
        }
    }

    return (
        <>
            <ItemWrap onClick={onclickOpenContent}>
                <div>
                    <img src={getCategoryImg(data.idx)} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} />
                </div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0" }}>{data.name}</div>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem" }}>{data.platform ? data.platform.length : 0}개 이용중</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0" }}>{data.totalPrice ? priceToString(data.totalPrice) : 0}원</div>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem", color: "#ffca17" }}>{data.ratio}%</div>
                </div>
            </ItemWrap>

            <Fade collapse when={openStatus} duration={500}>
                <div style={{ border: "1px solid white" }}>
                    {
                        data.platform ? data.platform.map((list, index) => {
                            return (<ItemDetail data={list} key={index}></ItemDetail>)
                        }) : <div />
                    }
                </div>
            </Fade>

        </>
    )
};


const ContentFill = ({ data }) => {

    const [firstIdx, setFirstIdx] = useState(0);
    const [lastIdx, setLastIdx] = useState(0);
    const [isData, setIsData] = useState(false);

    useEffect(() => {
        // console.log(data);
        setFirstIdx(0);
        setLastIdx(0);

        let flag = 0;

        data.map((d, i) => {

            if (d.ratio && d.ratio != 0) {
                if (flag == 0) setFirstIdx(d.idx);
                setLastIdx(d.idx);
                flag++;
                setIsData(true);
            }

        })

    }, [data])

    return (
        <div>
            {
                isData ?

                    <div>
                        <GrapWrap>
                            {
                                data.map((d, idx) => {
                                    return (
                                        <GrapBar width={d.ratio} color={getCategoryColor(d.idx)} isFirst={firstIdx == d.idx} isLast={lastIdx == d.idx} key={idx} />
                                    )
                                })
                            }
                        </GrapWrap>
                        <ContentWrap>

                            {
                                data.map((list, index) => {
                                    if (list.ratio && list.ratio != 0) {
                                        return (<Item data={list} key={index}></Item>)
                                    }
                                })
                            }

                        </ContentWrap>
                    </div > :

                    <div>
                        <ContentNone />
                    </div>

            }
        </div>
    )
};



const GrapWrap = styled.div`
    display:flex;
    width:100%;
    height: 0.4375rem;

    margin:1rem 0 1.8125rem 0;

    border-radius:0.4375rem;
    /* border:1px solid red; */
    /* background-color:#e3e3e3; */

`;
const GrapBar = styled.div`
    display:${props => props.width != 0 ? 'block' : 'none'};
    flex-grow:${props => props.width};
    height: 0.4375rem;
    background-color:${props => props.color};

    border-top-left-radius:${props => props.isFirst ? '0.4375rem' : '0'};
    border-bottom-left-radius: ${props => props.isFirst ? '0.4375rem' : '0'};

    border-top-right-radius: ${props => props.isLast ? '0.4375rem' : '0'};
    border-bottom-right-radius: ${props => props.isLast ? '0.4375rem' : '0'};
`;

const ContentWrap = styled.div`
    /* border:1px solid red; */
`;


const ItemWrap = styled.div`
    display:flex;

    margin-top:0.75rem;
    background-color:#ffffff;

    border-radius:0.4375rem;

    padding:0.875rem 0.75rem 0.625rem 0.75rem;

    box-shadow: 0 0 0.25rem 0.0625rem #efefef;

    font-size:0.8125rem;
`;

const ItemDetailWrap = styled.div`
    display:flex;

    margin: 0.75rem 0.4375rem 0 0.4375rem;
    background-color:#f7f7f7;

    border-radius:0.4375rem;

    padding:0.875rem 0.75rem 0.625rem 0.75rem;

    box-shadow: 0 0 0.25rem 0.0625rem #efefef;

    font-size:0.8125rem;
    color:#313131;
`;

export default ContentFill;