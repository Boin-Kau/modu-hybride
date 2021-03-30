import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";

import icon_back from "../../../../assets/icon-back-arrow.svg";

import { TextMiddle } from '../../../../styled/shared';


const SearchPage = () => {

    return (
        <PageWrap>
            <HeaderWrap>
                <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>

                <TextMiddle>검색창</TextMiddle>
            </HeaderWrap>
            <div>검색페이지</div>
        </PageWrap>
    )

};

const PageWrap = styled.div`

`;
const HeaderWrap = styled.div`
    position: relative;
    top:0;
    left:0;
    right:0;

    height:2.5625rem;

    background-color:#ffffff;
    text-align:center;

    font-size:0.875rem;
    color:#313131;
    
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;

export default SearchPage;