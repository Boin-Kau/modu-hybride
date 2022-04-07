import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./card";
import Register from "./register";
import { customApiClient } from "../../shared/apiClient";

import ic_pay_cardtab from "../../assets/ic_pay_cardtab.svg";
import ic_pay_cardtab_g from "../../assets/ic_pay_cardtab_g.svg";

const AccountSlide = ({setAccountIdx}) => {
  //state
  const [cardData, setCardData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState('0');

  //life cycle
  useEffect(async () => {
    const data = await customApiClient("get", "/party/user/bankAccount");
    setCardData(data);
    console.log(data);

    //서버에러
    if (!data) return;

    //벨리데이션
    if (data.statusCode != 200) {
      return;
    }
  }, []);

  return (
    <div>
      {cardData.length === 0 ? (
        <Register />
      ) : (
        <Slider
          {...settings}
          afterChange={(current, next) => {
            setCurrentSlide(current);
          }}
        >
          {cardData.result.map((cardData, index) => {
            {(currentSlide==index) && setAccountIdx(cardData.idx)}
            return (
              <div key={cardData.idx}>
                {(currentSlide == index ) ? (
                  <Card
                    cardImg={ic_pay_cardtab}
                    cardName={cardData.bankName}
                    cardNo={cardData.bankAccountNum}
                  />
                ) : (
                  <Card
                    cardImg={ic_pay_cardtab_g}
                    cardName={cardData.bankName}
                    cardNo={cardData.bankAccountNum}
                  />
                )}
              </div>
            );
          })}
          <Register />
        </Slider>
      )}
    </div>
  );
};

export default AccountSlide;

const settings = {
  className: "center",
  dots: false,
  centerMode: true,
  infinite: false,
  centerPadding: "2%", //px아니면 slick-slider에서 인식을 안해줌..
  slidesToshow: 2,
  speed: 400,
  focusOnSelect: true,
  // beforeChange: (crruent, next) => setImageIndex(next)
};


