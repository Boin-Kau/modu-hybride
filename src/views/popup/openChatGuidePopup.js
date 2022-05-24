import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DangerWrapPopup } from "../../styled/shared";

import img_step1 from "../../assets/img_openkakao_guide_01@3x.png";
import img_step2 from "../../assets/img_openkakao_guide_02@3x.png";
import img_step3 from "../../assets/img_openkakao_guide_03@3x.png";
import img_step4 from "../../assets/img_openkakao_guide_04@3x.png";
import img_step5 from "../../assets/img_openkakao_guide_05@3x.png";
import img_step6 from "../../assets/img_openkakao_guide_06@3x.png";
import img_step7 from "../../assets/img_openkakao_guide_07@3x.png";

const OpenChatGuidePopup = (status) => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const guidePopupClose = () => {
    dispatch({ type: "GuidePopupClose" });
    setStep(0);
  };

  const onClickBackButton = () => {
    setStep(step-1);
  };

  const onClickNextButton = () => {
    setStep(step+1);
  };

  return (
    <DangerWrapPopup
      openStatus={status}
      style={{ backgroundColor: "rgba(110,110,110,0.35)" }}
    >
      <Popup className="spoqaBold" openStatus={true}>
        {step === 1 && (
          <div>
            <div className="title">오픈카톡방 가이드</div>
            <div className="step">Step 01</div>
            <div className="spoqaMedium detail">
              카카오톡 채팅탭 우측상단의<br/> 2번째 아이콘을 눌러주세요.
            </div>
            <img src={img_step1} />
            <ButtonWrap className="spoqaMedium">
              <div onClick={onClickBackButton} style={{visibility:'hidden'}}>이전</div>
              <div className="yellow-button spoqaBold" onClick={guidePopupClose}>확인</div>
              <div onClick={onClickNextButton}>다음</div>
            </ButtonWrap>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="title">오픈카톡방 가이드</div>
            <div className="step">Step 02</div>
            <div className="spoqaMedium detail">새로운 채팅에서<br/> “오픈채팅”을 클릭해주세요.</div>
            <img src={img_step2} />
            <ButtonWrap className="spoqaMedium">
              <div onClick={onClickBackButton}>이전</div>
              <div className="yellow-button spoqaBold" onClick={guidePopupClose}>확인</div>
              <div onClick={onClickNextButton}>다음</div>
            </ButtonWrap>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="title">오픈카톡방 가이드</div>
            <div className="step">Step 03</div>
            <div className="spoqaMedium detail">오픈채팅 화면에서 <br/>“+만들기” 버튼을 클릭해주세요.</div>
            <img src={img_step3} />
            <ButtonWrap className="spoqaMedium">
              <div onClick={onClickBackButton}>이전</div>
              <div className="yellow-button spoqaBold" onClick={guidePopupClose}>확인</div>
              <div onClick={onClickNextButton}>다음</div>
            </ButtonWrap>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="title">오픈카톡방 가이드</div>
            <div className="step">Step 04</div>
            <div className="spoqaMedium detail">해당화면에서 <br/>“그룹 채팅방” 을 클릭해주세요.</div>
            <img src={img_step4} />
            <ButtonWrap className="spoqaMedium">
              <div onClick={onClickBackButton}>이전</div>
              <div className="yellow-button spoqaBold" onClick={guidePopupClose}>확인</div>
              <div onClick={onClickNextButton}>다음</div>
            </ButtonWrap>
          </div>
        )}

        {step === 5 && (
          <div>
            <div className="title">오픈카톡방 가이드</div>
            <div className="step">Step 05</div>
            <div className="spoqaMedium detail">오픈채팅방 화면에서 <br/>우측 상단 아이콘을 눌러주세요.</div>
            <img src={img_step5} />
            <ButtonWrap className="spoqaMedium">
              <div onClick={onClickBackButton}>이전</div>
              <div className="yellow-button spoqaBold" onClick={guidePopupClose}>확인</div>
              <div onClick={onClickNextButton}>다음</div>
            </ButtonWrap>
          </div>
        )}

        {step === 6 && (
          <div>
            <div className="title">오픈카톡방 가이드</div>
            <div className="step">Step 06</div>
            <div className="spoqaMedium detail">해당 화면에서 <br/>우측 상단 아이콘을 눌러주세요.</div>
            <img src={img_step6} />
            <ButtonWrap className="spoqaMedium">
              <div onClick={onClickBackButton}>이전</div>
              <div className="yellow-button spoqaBold" onClick={guidePopupClose}>확인</div>
              <div onClick={onClickNextButton}>다음</div>
            </ButtonWrap>
          </div>
        )}

        {step === 7 && (
          <div>
            <div className="title">오픈카톡방 가이드</div>
            <div className="step">Step 07</div>
            <div className="spoqaMedium detail">해당 화면에서 공유하기를 누른 후, <br/>URL 복사를 해주세요.</div>
            <img src={img_step7} />
            <ButtonWrap className="spoqaMedium">
              <div onClick={onClickBackButton}>이전</div>
              <div className="yellow-button spoqaBold" onClick={guidePopupClose}>확인</div>
              <div onClick={onClickNextButton} style={{visibility:'hidden'}}>다음</div>
            </ButtonWrap>
          </div>
        )}
      </Popup>
    </DangerWrapPopup>
  );
};

const Popup = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  padding: 2rem 0 0.75rem 0;

  width: 18.3125rem;
  display: flex;
  flex-direction: column;

  transform: translate(-50%, -50%);

  border-radius: 0.4375rem;
  box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.05);
  background-color: #ffffff;

  text-align: center;

  /* 애니메이션 적용 */
  transition: opacity 300ms ease-out;
  opacity: ${(props) => (props.openStatus ? "1" : "0")};

  .title{
    font-size: 1rem;
    color: #313131;
  }

  .step{
    font-size: 0.875rem;
    color: #ffca2c;
    margin:0.6563rem 0 0.5rem 0;
  }

  .detail{
    font-size: 0.875rem;
    color: #313131;
  }

  img {
    width: 7.6875rem;
    height: 16.625rem;
    margin: 1.3125rem 0 1.4375rem 0;
  }
`;

const ButtonWrap = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 0.875rem;
  margin-bottom: 2.4312rem;


  .yellow-button {
    width: 7.6875rem;
    height: 2.4375rem;
    border-radius: 6px;
    background-color: #ffca17;
    color: #fff;
    line-height: 2.4375rem;
  }
`;

export default OpenChatGuidePopup;
