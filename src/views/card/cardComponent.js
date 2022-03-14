import React from 'react'

import { customApiClient } from "../../shared/apiClient";

import delete_icon from '../../assets/ic_cardadmin_delete.svg';
import card_img from '../../assets/ic_partydetail_paysucess.svg';


const CardComponent = ({cardName, cardNo, id, cardData, setCardData}) => {

  console.log(cardData);
  //회원탈퇴 버튼 최종 클릭
  const onClickDeleteCard = async ( cardIdx ) => {
    //서버통신
    const res = await customApiClient("delete", `party/user/card/${cardIdx}`);
    console.log(res);

    //서버에러
    if (!res) return;

    //벨리데이션
    if (res.statusCode != 200) {
      alert(res.message);
      return;
    }

    if(res.statusCode == 200){
      setCardData(cardData.filter(cardData=>cardData.idx !== cardIdx));
      console.log(cardData);
    }

  };

  return (
    <div style={{display:'flex', flexDirection:'row', marginBottom:'1.25rem', height:'1.625rem', alignItems:'center'}}>
        <img src={delete_icon} style={{width:'1.125rem'}} onClick={()=>onClickDeleteCard(id)}></img>
        <img src={card_img} style={{wieth:'2.8125rem', margin:'0 10px'}}></img>
        <span className='spoqaRegular' style={{fontSize:'0.875rem'}}>{cardName} ({cardNo})</span>
    </div>
  )
}

export default CardComponent