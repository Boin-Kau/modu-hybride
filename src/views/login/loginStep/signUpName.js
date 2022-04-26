import React, { useContext, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ContentWrap, HeaderWrap, PageWrap } from "../../../styled/shared/wrap";
import { TextMiddle } from "../../../styled/shared";
import { useHistory } from "react-router-dom";

import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";

import icon_back from "../../../assets/icon-back-arrow.svg";
import { MainText } from "../../../styled/shared/text";
import { LoginInput } from "../../../styled/shared";
import styled from "styled-components";
import BottomButton from "../../../components/party/BottomButton";

const SignUpName = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [name, setName] = useState("");

  //페이지별 벨리데이션
  const [namePageStatus, setNamePageStatus] = useState(false);
  //페이지내 최종 벨리데이션
  const [pageConfirmStatus, setPageConfirmStatus] = useState(false);

  //에러 메세지
  const [nameErrorText, setNameErrorText] = useState("");

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);

  const handleName = useCallback(
    (e) => {
      setName(e.target.value);

      //이름 벨리데이션
      //한글 이름 2~4자 이내
      const reg = /^[가-힣]{2,5}$/;

      if (!reg.test(e.target.value)) {
        setPageConfirmStatus(false);
        setNamePageStatus(false);
        setNameErrorText("올바른 닉네임을 입력해주세요.");
        return;
      }

      setNameErrorText("");
      setPageConfirmStatus(true);
      setNamePageStatus(true);
    },
    [name]
  );

  return (
    <div className="page">
      <PageWrap>
        <HeaderWrap id="back_link" className="spoqaBold" onClick={closePage}>
          <div
            style={{
              position: "absolute",
              top: "55%",
              left: "1.25rem",
              transform: "translate(0,-55%)",
            }}
          >
            <img src={icon_back}></img>
          </div>
          <TextMiddle>회원가입</TextMiddle>
        </HeaderWrap>
        <ContentWrap>
          <MainText>
            모두에서 사용할
            <br />
            <span className="yellowText">닉네임</span>을 입력해주세요.
          </MainText>
          <LoginInput
            value={name}
            onChange={handleName}
            className="spoqaBold"
            type="text"
            placeholder="닉네임을 입력하세요."
          />
          <ErrorText className="spoqaRegular">{nameErrorText}</ErrorText>
          <BottomButton text={"다음"} activeStatus={namePageStatus} isBottomStatus={true}/>
        </ContentWrap>
      </PageWrap>
    </div>
  );
};

export default SignUpName;

const ErrorText = styled.div`
    height: 1.0625rem;
    margin: 0.125rem 0 1.125rem 0;
    font-size: 0.6875rem;
    color: #fb5e5e;
    line-height: 1.0625rem;
`;
