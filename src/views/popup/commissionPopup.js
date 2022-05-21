import React from "react";
import styled from "styled-components";
import ic_cancle from "../../assets/ic_popup_cancle@3x.png";
import { DangerWrapPopup } from "../../styled/shared";


const CommissionPopup = ({ status, closeFunc }) => {

  return (
    <DangerWrapPopup
      openStatus={status}
      style={{ backgroundColor: "transparent" }}
    >
      <Popup className="spoqaBold" openStatus={true}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ fontSize: "1rem" }}>수수료</div>
          <img src={ic_cancle} onClick={closeFunc} />
        </div>
        <div className="spoqaMedium detail-box">
          <div className="text" style={{ wordBreak: "keep-all" }}>
            파티원의 파티 이용 수수료는 결제금액의 10%로 책정하고 있어요. <br /><br />
            파티 금액을 결제하고 파티장에게 정산해주는 기능을 제공하기 위해서는 카드 결제 수수료, 계좌 송금 수수료, 서버 유지비 등 다양한 비용이 발생하게되어요. <br /> <br />
            여러분들께 해당 기능을 제공하고 유지하기 위해 최소한의 수수료율로 책정하였어요. 여러분의 수수료가 아깝지 않도록 보다 더 쾌적한 서비스를 제공하도록 노력할게요.
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

export default CommissionPopup;
