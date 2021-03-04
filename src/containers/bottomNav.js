import React, { useContext, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageTransContext } from '../contexts/pageTransContext';


import icon_main_fill from "../assets/icon_main_fill.svg";
import icon_main_def from "../assets/icon_main_def.svg";
import icon_party_fill from "../assets/icon_party_fill.svg";
import icon_party_def from "../assets/icon_party_def.svg";
import icon_my_page_def from "../assets/icon_my_page_def.svg";

const getGnb = () => {
    return [
        {
            to: '/main',
            name: 'main'
        },
        {
            to: '/party',
            name: 'party'
        },
        {
            to: '/info',
            name: 'info'
        }
    ]
}

const getTransDirection = (gnb, gnbIndex) => {
    let pageDirection = 'trans toRight'
    const matched = gnb.find(menu => menu.to === window.location.pathname)
    let matchedIndex = gnb.indexOf(matched)

    if (matchedIndex === -1) {
        matchedIndex = 1
    }

    if (gnbIndex !== matchedIndex) {
        if (gnbIndex >= matchedIndex) {
            pageDirection = 'trans toRight'
        } else {
            pageDirection = 'trans toLeft'
        }
    }

    return pageDirection
}
const BottomNav = () => {

    const { setPageTrans } = useContext(PageTransContext)

    const pathname = window.location.pathname;

    const [iconMain, setIconMain] = useState(false);
    const [iconParty, setIconParty] = useState(false);
    const [iconInfo, setIconInfo] = useState(false);

    const gnb = getGnb();


    useEffect(() => {
        switch (pathname) {
            case '/main':
                setIconMain(true);
                break;
            case '/party':
                setIconParty(true);
                break;
            case '/info':
                setIconInfo(true);
                break;
            default:
                break;
        }
    })

    const handleOnClick = (index) => {
        const direction = getTransDirection(gnb, index)
        setPageTrans(direction)

        setIconMain(false);
        setIconParty(false);
        setIconInfo(false);

        switch (gnb[index].to) {
            case '/main':
                setIconMain(true);
                break;
            case '/party':
                setIconParty(true);
                break;
            case '/info':
                setIconInfo(true);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <BottomNavWrap>
                <BottomNavItem>
                    <Link
                        key={`gnb-1`}
                        to="/main"
                        onClick={() => handleOnClick(0)}>
                        {iconMain ?
                            <BottomNavIcon src={icon_main_fill} /> :
                            <BottomNavIcon src={icon_main_def} />
                        }
                    </Link>
                </BottomNavItem>
                <BottomNavTemp></BottomNavTemp>
                <BottomNavItem>
                    <Link
                        key={`gnb-2`}
                        to="/party"
                        onClick={() => handleOnClick(1)}>
                        {iconParty ?
                            <BottomNavIcon src={icon_party_fill} /> :
                            <BottomNavIcon src={icon_party_def} />
                        }                    </Link>
                </BottomNavItem>
                <BottomNavTemp></BottomNavTemp>
                <BottomNavItem>
                    <Link
                        key={`gnb-3`}
                        to="/info"
                        onClick={() => handleOnClick(2)}>
                        {iconInfo ?
                            <BottomNavIcon src={icon_my_page_def} /> :
                            <BottomNavIcon src={icon_my_page_def} />
                        }                    </Link>
                </BottomNavItem>

            </BottomNavWrap>
        </>
    );
};


const BottomNavWrap = styled.div`

    z-index:10;

    position:fixed;

    display:flex;

    bottom:0;
    left: 0;
    right: 0;
    height: 2.9063rem;

    padding:0 2.8125rem 0 2.8125rem;

    border-top:0.0625rem solid #e2e2e2;
    background-color:#ffffff;
`;

const BottomNavItem = styled.div`
    position: relative;
`;

const BottomNavIcon = styled.img`
    position: relative;
    top:50%;
    transform:translate(0,-50%);

    height:1.25rem;
`;

const BottomNavTemp = styled.div`
    flex-grow:1;
`;


export default BottomNav;