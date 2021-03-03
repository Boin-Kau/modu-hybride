import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import icon_main_fill from "../assets/icon_main_fill.svg";
import icon_main_def from "../assets/icon_main_def.svg";
import icon_party_fill from "../assets/icon_party_fill.svg";
import icon_party_def from "../assets/icon_party_def.svg";
import icon_my_page_def from "../assets/icon_my_page_def.svg";


const BottomNav = ({ path }) => {

    console.log(path);

    return (
        <>
            <BottomNavWrap>
                <BottomNavItem>
                    <Link to="/main">
                        {path.pathname == '/main' ?
                            <BottomNavIcon src={icon_main_fill} /> :
                            <BottomNavIcon src={icon_main_def} />
                        }
                    </Link>
                </BottomNavItem>
                <BottomNavTemp></BottomNavTemp>
                <BottomNavItem>
                    <Link to="/party">
                        {path.pathname == '/party' ?
                            <BottomNavIcon src={icon_party_fill} /> :
                            <BottomNavIcon src={icon_party_def} />
                        }
                    </Link>
                </BottomNavItem>
                <BottomNavTemp></BottomNavTemp>
                <BottomNavItem>
                    <Link to="/info">
                        <BottomNavIcon src={icon_my_page_def} />
                    </Link>
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