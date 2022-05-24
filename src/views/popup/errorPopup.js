import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DangerWrapPopup } from "../../styled/shared";

const ErrorPopup = (status, popupMessage) => {
  const dispatch = useDispatch();

  const PopupClose=()=>{
    dispatch({type:'PopupClose'});
  }

  return (
    <DangerWrapPopup
      openStatus={status}
      style={{ backgroundColor: "rgba(110,110,110,0.35)" }}
    >
      <Popup className="spoqaBold" openStatus={true}>
        <div style={{ fontSize: "0.875rem" }}>카드등록오류</div>
        <div
          className="spoqaRegular"
          style={{
            fontSize: "0.75rem",
            margin: "0.625rem 0 1.5625rem 0",
            padding: "0 1.25rem 0 1.25rem",
          }}
        >
          [C00001] 등록할 수 없는 카드입니다.
          <br />
          {popupMessage}
        </div>
        <div style={{ width: "100%", border: "solid 0.7px #b4b4b4" }} />
        <div
          className="spoqaRegular"
          style={{ fontSize: "0.875rem", marginTop: "0.6875rem" }}
          onClick={PopupClose}
        >
          확인
        </div>
      </Popup>
    </DangerWrapPopup>
  );
};

const Popup = styled.div`
  position: absolute;

  top: 40%;
  left: 50%;

  padding: 2rem 0 0.75rem 0;

  width: 17.375rem;
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
`;

export default ErrorPopup;
