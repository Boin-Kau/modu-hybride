import styled from "styled-components";


export const DetailRowWrap = styled.div`

    display:flex;

    margin-bottom:1.5625rem;

`;
export const DetailItemWrap = styled.div`
    flex-grow:1;
    flex-basis:0;

    margin-right: ${props => props.mr ? '1.5rem' : '0'};

`;

export const DetailItemTitle = styled.div`

    margin-bottom:0.1875rem;

    font-size:0.75rem;
    color:#313131;

    line-height:1.3125rem;
    opacity:0.4;
`;

export const DetailItemContent = styled.div`
    font-size:0.8125rem;
    color:#313131;
    opacity:0.25;
`;

export const DetailButton = styled.div`
    position: relative;
    display:flex;
    flex-grow:1;
    flex-basis:0;

    padding:0.625rem;

    border-radius:0.375rem;
    
    text-align:center;

    line-height:1.1875rem;

    font-size:0.8125rem;

    margin-left: ${props => props.revise ? '0.625rem' : '0'};
    color: ${props => props.revise ? '#ffffff' : 'rgba(0,0,0,0.48)'};
    background-color: ${props => props.revise ? '#ffca17' : '#e3e3e3'};
`;