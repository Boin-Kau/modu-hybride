import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ic_check from '../../assets/ic_paysuccess_check.svg';
import { PageTransContext } from "../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../reducers/container/bottomNav";

const Finish = ({ location }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { setPageTrans } = useContext(PageTransContext);

  const onClickOpenChat = () => {
    setPageTrans("trans toRight");
    history.push({
      pathname: `/party/my/${location.props.partyIdx}`,
      props: {
        isFinish: true,
      }
    });
  };

  //initial logic
  useEffect(() => {
    dispatch(BottomNavCloseAction);
  }, []);

  return (
    <div className="page" style={{ backgroundColor: "#f7f7f7" }}>
      <Container>
        <img
          src={ic_check}
          className="ic_paysuccess_check"
        />
        <span className="spoqaBold firstText">파티 결제 완료!</span>
        <span className="notoMedium secondText">
          파티 상세 페이지에서 계정 정보를 <br />
          확인하고 오픈 카톡방에 참여해주세요 :)
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
          파티 상세보기
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
  display: flex;
  flex-direction: column;
  align-items: center;

  .ic_paysuccess_check {
    width: 2.625rem;
    height: 2.625rem;
    object-fit: contain;
    margin-bottom: 0.375rem;
  }

  .firstText {
    margin-bottom:0.625rem;
    font-size: 1.25rem;
    text-align: center;
    line-height:1.75rem;
    color: #313131;
  }

  .secondText {
    font-size: 0.75rem;
    line-height: 1.3125rem;
    text-align: center;
    color: #575757;

    word-break:keep-all;
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
