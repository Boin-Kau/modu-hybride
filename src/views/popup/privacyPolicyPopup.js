import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DangerWrapPopup } from "../../styled/shared";

import ic_cancle from "../../assets/ic_popup_cancle@3x.png";

const PrivacyPolicyPopup = (status) => {
  const dispatch = useDispatch();

  const PopupClose = () => {
    dispatch({ type: "PolicyPopupClose" });
  };

  return (
    <DangerWrapPopup
      openStatus={status}
      style={{ backgroundColor: "transparent" }}
    >
      <Popup className="spoqaBold" openStatus={true}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ fontSize: "1rem" }}>서비스 이용약관</div>
          <img src={ic_cancle} onClick={PopupClose}/>
        </div>
        <div className="spoqaMedium detail-box">
          <div className="text">
            팝업에 관한 내용이 들어갑니다. 팝업에 관한 내용이 들어갑니다. 팝업에
            관한 내용이 들어갑니다. 팝업에 관한 내용이 들어갑니다. 팝업에 관한
            내용이 들어갑니다. 팝업에 관한 내용이 들어갑니다. 팝업에 관한 내용이
            들어갑니다. 팝업에 관한 내용이 들어갑니다. 팝업에 관한 내용이
            들어갑니다. 팝업에 관한 내용이 들어갑니다. 팝업에 관한 내용이
            들어갑니다. 팝업에 관한 내용이 들어갑니다. 팝업에 관한 내용이
            들어갑니다.
          </div>
        </div>
      </Popup>
    </DangerWrapPopup>
  );
};

const Popup = styled.div`
  position: absolute;

  top: 40%;
  left: 50%;

  padding: 1.1875rem 0 2.3125rem 0;

  width: 16.3125rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  transform: translate(-50%, -50%);

  border-radius: 1.3125rem;
  box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.05);
  background-color: #ffffff;

  text-align: center;

  /* 애니메이션 적용 */
  transition: opacity 300ms ease-out;
  opacity: ${(props) => (props.openStatus ? "1" : "0")};

  img {
    width: 1.5625rem;
    height: 1.5625rem;
    object-fit: contain;
    position: absolute;
    right: 1.1875rem;
  }

  .detail-box {
    display: flex;
    width: 12.9375rem;
    height: 13.375rem;
    margin-top: 1rem;
    border-radius: 0.5625rem;
    background-color: #f4f4f4;
  }

  .text {
    color: #5c5c5c;
    font-size: 0.75rem;
    text-align: left;
    overflow-y: scroll;
    margin: 1rem;
  }

  .text::-webkit-scrollbar-thumb {
    width: 0.375rem;
    height: 5.9375rem;
    border-radius: 0.1875rem;
    background-color: #d5d5d5;
  }
`;

export default PrivacyPolicyPopup;
