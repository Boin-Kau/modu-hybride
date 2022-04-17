import React from "react";
import styled from "styled-components";
import { customApiClient } from "../../shared/apiClient";

import delete_icon from "../../assets/ic_cardadmin_delete.svg";
import card_img from "../../assets/ic_partydetail_paysucess.svg";

const BankComponent = ({ cardName, cardNo, id, cardData, setCardData }) => {
  console.log(cardData);
  //회원탈퇴 버튼 최종 클릭
  const onClickDeleteCard = async (bankAccountIdx) => {
    //서버통신
    const res = await customApiClient("delete", `party/user/bankAccount/${bankAccountIdx}`);
    console.log(res);

    //서버에러
    if (!res) return;

    //벨리데이션
    if (res.statusCode != 200) {
      alert(res.message);
      return;
    }

    if (res.statusCode == 200) {
      setCardData(cardData.filter((cardData) => cardData.idx !== bankAccountIdx));
      console.log(cardData);
    }
  };

  return (
    <ListWrap>
      <img
        className="delete_icon"
        src={delete_icon}
        onClick={() => onClickDeleteCard(id)}
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
