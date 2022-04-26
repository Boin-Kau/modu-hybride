import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./card";
import Register from "./register";
import { customApiClient } from "../../shared/apiClient";

import ic_pay_cardtab from "../../assets/ic_pay_cardtab.svg";
import ic_pay_cardtab_g from "../../assets/ic_pay_cardtab_g.svg";
import LoadingBox from "../../components/LoadingBox";

const AccountSlide = ({ setAccountIdx, setBankAccountOpenStatus }) => {
  //state
  const [cardData, setCardData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  //로딩 스테이트
  const [loading, setLoading] = useState(true);

  //life cycle
  useEffect(async () => {

    setLoading(true);

    const data = await customApiClient("get", "/party/user/bankAccount");

    //서버에러
    if (!data) {
      setLoading(false);
      return
    };

    //벨리데이션
    if (data.statusCode != 200) {
      setLoading(false);
      return;
    }

    setCardData(data.result);

    //카드 리스트가 없는경우
    if (data.result.length === 0) {
      setAccountIdx(-1);
    }
    //카드 리스트가 1개라도 있는경우 가장 처음에 카드를 셋팅
    else {
      setAccountIdx(data.result[0].idx);
    }

    setLoading(false);

  }, []);

  //카드 슬라이드가 변경될때를 감지해서 cardIdx 셋팅해주기
  useEffect(() => {
    if (cardData.length === 0) return

    if (cardData.length === currentSlide) {
      setAccountIdx(-1);
    }
    else {
      setAccountIdx(cardData[currentSlide].idx);
    }
  }, [currentSlide]);

  return (
    <div>
      {loading === true ?
        <LoadingBox /> :
        cardData.length === 0 ? (
          <Register setBankAccountOpenStatus={setBankAccountOpenStatus} />
        ) : (
            <Slider
              {...settings}
              afterChange={(current, next) => {
                setCurrentSlide(current);
              }}
            >
              {cardData.map((cardData, index) => {
                return (
                  <div key={cardData.idx}>
                    <Card
                      cardImg={currentSlide === index ? ic_pay_cardtab : ic_pay_cardtab_g}
                      cardName={cardData.bankName}
                      cardNo={cardData.bankAccountNum}
                    />
                  </div>
                );
              })}
              <Register card={false} setBankAccountOpenStatus={setBankAccountOpenStatus} />
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


