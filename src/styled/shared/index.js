import styled from "styled-components";


export const LoginInput = styled.input`
    flex-grow:1;

    font-size:0.8125rem;
    color:#313131;

    padding-bottom:0.25rem;
    border:none;
    border-bottom:0.0625rem solid rgba(0,0,0,0.1);

    border-radius:0;

    ::placeholder {
        opacity: 0.25;
    }
    :focus{
        outline:none;
        border-bottom:0.0625rem solid #ffca16;

    }
`;

export const LoginButton = styled.div`
    cursor: pointer;

    position:absolute;
    left:50%;
    bottom:1.375rem;

    transform:translate(-50%,0);

    width:20rem;

    padding:0.8125rem 0 0.875rem 0;

    font-size:0.875rem;
    color:#ffffff;

    text-align:center;

    border-radius:0.375rem;

    background-color: ${props => props.pageConfirmStatus ? '#ffca17' : '#e3e3e3'};
`;

export const TextMiddle = styled.div`
    position:absolute;
    top:55%;
    transform:translate(0,-55%);

    width:100%;
`;