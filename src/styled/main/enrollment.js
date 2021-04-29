import styled from "styled-components";


export const TitleWrap = styled.div`
    display:flex;

    margin-top:1.125rem;
    margin-bottom:0.3125rem;

    font-size:0.75rem;
    line-height:1.3125rem;

    color:#313131;
`;

export const ItemWrap = styled.div`
    display:flex;
`;

export const InputWrap = styled.div`
    display:flex;
    flex-grow:1;
    flex-basis:0;

    padding:0.625rem 0.875rem;

    border:0.0625rem solid #e8e8e8;
    border-radius:0.25rem;

    font-size:0.8125rem;

    color: ${props => props.isBlocked ? 'rgba(49, 49, 49,0.26)' : '#313131'};
    background-color: ${props => props.isBlocked ? '#f0f0f0' : '#ffffff'};
`;

export const Input = styled.input`
    flex-grow:1;
    flex-basis:0;

    border:none;

    :focus {
        outline:none;
    }
    ::placeholder {
        opacity:0.3;
    }
`;


export const PartyIconWrap = styled.div`
    position:relative;

    width:0.9375rem;
    height: 0.9375rem;

    border-radius:50%;

    background-color: ${props => props.isParty ? '#ffca17' : '#e3e3e3'};
`;

export const PartyIcon = styled.img`
    position:absolute;

    top:50%;
    left:45%;
    
    width:0.6875rem;
    height:0.5625rem;

    transform:translate(-45%,-50%);
`;

export const PartyText = styled.div`
    margin-top:0.0625rem;
    margin-left:0.4375rem;
    font-size:0.75rem;
    color:#313131;
`;

export const DeleteButtonWrap = styled.div`
    display:flex;
    margin-top:2.375rem;

    background-color:#fb5e5e;
    border-radius:0.375rem;

    padding:0.875rem 0 0.8125rem 0;

    text-align:center;

    font-size:0.8125rem;
    color:#ffffff;
`;