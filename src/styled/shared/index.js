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
    top:50%;
    transform:translate(0,-50%);

    width:100%;
`;




export const DangerWrapPopup = styled.div`
    display : ${props => props.openStatus ? 'block' : 'none'};
    z-index:10000;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    background-color:rgba(0,0,0,0.7);
`;
export const DangerPopup = styled.div`

  position:absolute;

  top:50%;
  left:50%;

  transform:translate(-50%,-50%);

  border-radius: 0.4375rem;
  box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.05);
  background-color: #ffffff;

  padding:0 1.125rem 1.125rem 1.125rem;

  text-align:center;

  /* 애니메이션 적용 */
  transition: opacity 300ms ease-out;
  opacity : ${props => props.openStatus ? '1' : '0'};
`;