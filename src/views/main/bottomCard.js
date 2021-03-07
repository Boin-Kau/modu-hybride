import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";

import Fade from 'react-reveal/Fade';



const BottomContent = ({ data }) => {

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
            <ContentWrap onClick={onclickOpenContent}>
                <div>
                    <img src={data.logoImg} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} />
                </div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
                    <div style={{ flexGrow: "1", flexBasis: "0" }}>{data.title}</div>
                    <div style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem" }}>{data.category}</div>
                </div>
                <div>{data.price}</div>
            </ContentWrap>

            <Fade collapse when={openStatus} duration={500}>
                <ContentDetailWrap>
                    hihi
                </ContentDetailWrap>
            </Fade>

        </>
    )
};


const BottomCard = () => {


    const testArray = [
        {
            id: 1,
            logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
            title: "멜론",
            category: "음악",
            price: "8,690원"
        },
        {
            id: 2,
            logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
            title: "멜론",
            category: "음악",
            price: "8,690원"
        },
        {
            id: 3,
            logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
            title: "멜론",
            category: "음악",
            price: "8,690원"
        },
        // {
        //     id: 4,
        //     logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
        //     title: "멜론",
        //     category: "음악",
        //     price: "8,690원"
        // },
        // {
        //     id: 5,
        //     logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
        //     title: "멜론",
        //     category: "음악",
        //     price: "8,690원"
        // },
        // {
        //     id: 6,
        //     logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
        //     title: "멜론",
        //     category: "음악",
        //     price: "8,690원"
        // },
        // {
        //     id: 7,
        //     logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
        //     title: "멜론",
        //     category: "음악",
        //     price: "8,690원"
        // },
        // {
        //     id: 8,
        //     logoImg: "https://pbs.twimg.com/profile_images/777742232484843520/B2B_FOZY_400x400.jpg",
        //     title: "멜론",
        //     category: "음악",
        //     price: "8,690원"
        // }
    ];

    useEffect(() => {
        console.log("hihi");
    }, [])



    return (
        <>
            {
                testArray.length != 0 ?
                    testArray.map((list, index) => {
                        return (<BottomContent data={list} key={index}></BottomContent>)
                    }) :
                    <div>없어요 !</div>
            }
        </>
    )
};

const ContentWrap = styled.div`

    display:flex;

    margin:0.75rem 1.25rem 0 1.25rem;
    background-color:#ffffff;

    border-radius:0.4375rem;

    padding:0.875rem 0.75rem;

    box-shadow: 0 0 0.25rem 0.0625rem #efefef;

    font-size:0.8125rem;
`;

const ContentDetailWrap = styled.div`

    margin:0 1.25rem 0 1.25rem;
    background-color:#ffffff;

    border-radius:0.4375rem;

    border-top: 0.0938rem dashed rgba(0,0,0,0.04);

    padding:0.875rem 0.75rem;

    box-shadow: 0 0.25rem 0.25rem 0.0625rem #efefef;


    height:100px;

`;



export default BottomCard;