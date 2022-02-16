import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { PageTransContext } from "../../containers/pageTransContext";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BottomNavCloseAction } from "../../reducers/container/bottomNav";

const Finish = () => {
  const dispatch = useDispatch();
  const histroy = useHistory();

  const { setPageTrans } = useContext(PageTransContext);

  const onClickOpenChat = () => {
    setPageTrans("trans toRight");
    histroy.push("/party");
  };

  //initial logic
  useEffect(() => {
    dispatch(BottomNavCloseAction);
  }, []);

  return (
    <div className="page" style={{ backgroundColor: "#f7f7f7" }}>
      <Container>
        <img
          src="../assets/ic-paysuccess-check.svg"
          className="ic_paysuccess_check"
        />
        <span className="spoqaBold firstText">파티 결제 완료!</span>
        <span className="spoqaMedium secondText">
          오픈카톡으로 파티장에게 계정정보를 받을 수 있습니다.
        </span>
      </Container>
      <ButtonWrap onClick={onClickOpenChat} className="spoqaBold">
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "#ffffff",
            fontSize: "0.8125rem",
          }}
        >
          오픈카톡으로 이동
        </div>
      </ButtonWrap>
    </div>
  );
};

const Container = styled.div`
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin: 0 5.5625rem 0 5.5625rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img.ic_paysuccess_check {
    width: 2.625rem;
    height: 2.625rem;
    object-fit: contain;
  }

  .firstText {
    font-size: 1.25rem;
    text-align: center;
    color: #313131;
  }

  .secondText {
    font-size: 0.75rem;
    line-height: 1.75;
    text-align: center;
    color: #575757;
  }
`;

const ButtonWrap = styled.div`
  cursor:pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2.9375rem;
  margin: 0 1.25rem 1.375rem 1.25rem;
  background-color: #ffbc26;
  border-radius: 0.375rem;
`;

export default Finish;
