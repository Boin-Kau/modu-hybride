import React from "react";
import styled from "styled-components";

import delete_icon from "../../assets/ic_cardadmin_delete.svg";
import card_img from "../../assets/ic_partydetail_paysucess.svg";

const BankComponent = ({ cardName, cardNo, id, deleteFunc }) => {

  return (
    <ListWrap>
      <img
        className="delete_icon"
        src={delete_icon}
        onClick={() => deleteFunc(id)}
      ></img>
      <img
        src={card_img}
        className="card_img"
      ></img>
      <span className="spoqaRegular font_style">
        {cardName} ({cardNo})
      </span>
    </ListWrap>
  );
};

const ListWrap = styled.div`
  display:flex;
  flex-direction:row;
  margin-bottom:1.25rem; 
  height:1.625rem;
  align-items:center;

  .delete_icon{
    width: 1.125rem;
  }

  .card_img{
    width: 2.8125rem;
    margin: 0 0.625rem;
  }

  .font_style{
    font-size: 0.875rem;
  }
`;

export default BankComponent;
