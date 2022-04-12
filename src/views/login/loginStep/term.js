import React, { useContext, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ContentWrap, HeaderWrap, PageWrap } from "../../../styled/shared/wrap";
import { TextMiddle } from "../../../styled/shared";
import { useHistory } from "react-router-dom";

import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";

import icon_back from "../../../assets/icon-back-arrow.svg";

const SignUpName = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);


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
          <TextMiddle>개인정보 처리 방침</TextMiddle>
        </HeaderWrap>
        <ContentWrap>


        </ContentWrap>
      </PageWrap>
    </div>
  );
};

export default SignUpName;

