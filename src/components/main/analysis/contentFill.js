import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";

import Fade from 'react-reveal/Fade';



const ItemDetail = ({ data }) => {

    console.log("test1")

    return (
        <>
            <ItemDetailWrap>
                <div>
                    <img src={data.logoImg} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} />
                </div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0" }}>{data.title}</div>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem" }}>{data.category}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0" }}>{data.price + "원"}</div>
                </div>
            </ItemDetailWrap>

        </>
    )
};

const Item = ({ data }) => {

    console.log("test2")

    console.log(data.itemList);
    const itemList = data.itemList;

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
                    <img src={data.categoryImg} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} />
                </div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0" }}>{data.category}</div>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem" }}>{data.itemCount + "개 이용중"}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0" }}>{data.totalPrice + "원"}</div>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem", color: "#ffca17" }}>{data.ratio + "%"}</div>
                </div>
            </ItemWrap>

            <Fade collapse when={openStatus} duration={500}>
                <div style={{ border: "1px solid white" }}>
                    {
                        itemList.map((list, index) => {
                            return (<ItemDetail data={list} key={index}></ItemDetail>)
                        })
                    }
                </div>
            </Fade>

        </>
    )
};


const ContentFill = ({ data }) => {

    console.log(data)

    return (
        <>
            <GrapWrap>
            </GrapWrap>
            <ContentWrap>

                {
                    data.map((list, index) => {
                        return (<Item data={list} key={index}></Item>)
                    })
                }

            </ContentWrap>
        </>
    )
};



const GrapWrap = styled.div`
    width:100%;
    height: 0.4375rem;

    margin:16px 0 29px 0;

    border-radius:7px;

    background-color:red;
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
    background-color:#ffffff;

    border-radius:0.4375rem;

    padding:0.875rem 0.75rem 0.625rem 0.75rem;

    box-shadow: 0 0 0.25rem 0.0625rem #efefef;

    font-size:0.8125rem;
`;

export default ContentFill;