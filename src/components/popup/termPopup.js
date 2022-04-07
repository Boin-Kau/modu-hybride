import React from 'react';
import styled from 'styled-components';

const TermPopup = () => {
  return (
    <div>TermPopup</div>
  )
}

export const ConfirmWrapPopup = styled.div`
    display : ${props => props.openStatus ? 'block' : 'none'};
    z-index:10000;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    background-color:rgba(110,110,110,0.35);
`;

export default TermPopup;