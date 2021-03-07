import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";


const AnalysisPage = ({ stateManager }) => {

    const { analysisPageClose } = stateManager;


    return (
        <PageWrap>
            <div onClick={analysisPageClose}>
                <h1>닫기</h1>
            </div>
        </PageWrap>
    )
};

const PageWrap = styled.div`

`;

export default AnalysisPage;