import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import { TextMiddle } from '../../../styled/shared';
import { PageTransContext } from '../../../containers/pageTransContext';
import { checkMobile } from "../../../App";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_more from "../../../assets/icon-partydetail-more.svg";



const PartyDetail = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  const closePage = () => {
    setPageTrans('trans toLeft');
    history.goBack();
  };

  const openBottomDialog = () => {
    console.log('파티장 : 수정하기,삭제하기 / 취소');
    console.log('파티원 : 신고하기 / 취소');
  }

  //inital logic
  useEffect(() => {
      dispatch(BottomNavCloseAction);

      const userPlatform = checkMobile();

      if (userPlatform == 'ios') {
          //IOS 배경색 설정
          try {
              window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
          }
          catch (err) {
          }
      }
  }, [])

  return (
    <div className="page">
      <PageWrap>
        <HeaderWrap className="spoqaBold">
          <div id="back_link" onClick={closePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
            <img src={icon_back} alt="뒤로가기"></img>
          </div>
          <TextMiddle>구독 내역 추가</TextMiddle>
          <div onClick={openBottomDialog} style={{ zIndex: "10", position: "absolute", right: '0', height: '100%', width: '4.375rem' }}>
            <img src={icon_more} alt="BottomDialog 띄우기" style={{ position: "absolute", top: "55%", right: "1.3125rem", transform: "translate(0,-55%)" }}></img>
          </div>
        </HeaderWrap>
        
      </PageWrap>
    </div>
  );
};

export default PartyDetail;

const PageWrap = styled.div`

    position:absolute;
    top:3.0625rem;
    left:0;
    right:0;
    bottom:0;

    display:flex;
    flex-direction:column;

    overflow-y:scroll;

    background-color: #ffffff;
`;

const HeaderWrap = styled.div`
    position: fixed;
    top:0;
    left:0;
    right:0;

    height:3.0625rem;

    background-color:#ffffff;
    text-align:center;

    font-size:0.875rem;
    color:#313131;
    
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;