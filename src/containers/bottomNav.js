import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageTransContext } from './pageTransContext';
import { useSelector } from "react-redux";


import icon_main_fill from "../assets/icon_main_fill.svg";
import icon_main_def from "../assets/icon_main_def.svg";
import icon_party_fill from "../assets/icon_party_fill.svg";
import icon_party_def from "../assets/icon_party_def.svg";
import icon_my_page_def from "../assets/icon_my_page_def.svg";
import icon_my_page_fill from "../assets/icon_my_page_fill.svg";


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

    const { setPageTrans } = useContext(PageTransContext);

    //store
    const {
        openBottomNavStatus,
    } = useSelector(state => state.container.bottomNav);

    const pathname = window.location.pathname;

    const [viewStatus, setViewStatus] = useState(true);

    const [iconMain, setIconMain] = useState(true);
    const [iconParty, setIconParty] = useState(false);
    const [iconInfo, setIconInfo] = useState(false);

    const gnb = getGnb();


    useEffect(() => {
        switch (pathname) {
            case '/main':
                setIconMain(true);
                setIconParty(false);
                setIconInfo(false);
                break;
            case '/party':
                setIconMain(false);
                setIconParty(true);
                setIconInfo(false);
                break;
            case '/info':
                setIconMain(false);
                setIconParty(false);
                setIconInfo(true);
                break;
            default:
                break;
        }
    })

    useEffect(() => {
        if (openBottomNavStatus) {
            setViewStatus(true);
        }
        else {
            setTimeout(() => {
                setViewStatus(false);
            }, 300);
        }
    }, [openBottomNavStatus])

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
            <BottomNavWrap openStatue={openBottomNavStatus} viewStatus={viewStatus}>
                <Link
                    key={`gnb-1`}
                    to="/main"
                    onClick={() => handleOnClick(0)}>
                    <BottomNavItem>

                        {iconMain ?
                            <BottomNavIcon src={icon_main_fill} /> :
                            <BottomNavIcon src={icon_main_def} />
                        }

                    </BottomNavItem>
                </Link>
                <BottomNavTemp></BottomNavTemp>
                <Link
                    key={`gnb-2`}
                    to="/party"
                    onClick={() => handleOnClick(1)}>
                    <BottomNavItem>
                        {iconParty ?
                            <BottomNavIcon src={icon_party_fill} /> :
                            <BottomNavIcon src={icon_party_def} />
                        }
                    </BottomNavItem>
                </Link>
                <BottomNavTemp></BottomNavTemp>
                <Link
                    key={`gnb-3`}
                    to="/info"
                    onClick={() => handleOnClick(2)}>
                    <BottomNavItem>
                        {iconInfo ?
                            <BottomNavIcon src={icon_my_page_fill} /> :
                            <BottomNavIcon src={icon_my_page_def} />
                        }
                    </BottomNavItem>
                </Link>
            </BottomNavWrap>
        </>
    );
};


const BottomNavWrap = styled.div`

    z-index:50;

    position: fixed;

    display:${props => props.viewStatus ? 'flex' : 'none'};

    bottom:0;
    left: 0;
    right: 0;
    height: 2.9063rem;

    padding:0 2.8125rem 0 2.8125rem;

    border-top:0.0625rem solid #e2e2e2;
    background-color:#ffffff;

    /* 애니메이션 적용 */
    transition: bottom 300ms ease-in-out;

    bottom : ${props => props.openStatue ? '0' : '-2.9063rem;'};
`;

const BottomNavItem = styled.div`
    position: relative;

    width:3.125rem;
    height: 100%;
    text-align:center;
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