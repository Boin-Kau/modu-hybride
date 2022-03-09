import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./card";
import Register from "./register";
import { customApiClient } from "../../shared/apiClient";

const Slide = () => {
  //state
  const [cardData, setCardData] = useState([]);

  //life cycle
  useEffect(async () => {
    const data = await customApiClient("get", "/party/user/card");
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
        <Slider {...settings}>
          {cardData.result.map((cardData) => {
            return (
              <div key={cardData.idx}>
                <Card
                  cardName={cardData.cardName}
                  cardNo={cardData.cardNo}
                ></Card>
              </div>
            );
          })}
          <Register />
        </Slider>
      )}
    </div>
  );
};

export default Slide;

const settings = {
  className: "center",
  dots: false,
  centerMode: true,
  infinite: false,
  centerPadding: "8px",
  slidesToshow: 1,
  speed: 400,
};
