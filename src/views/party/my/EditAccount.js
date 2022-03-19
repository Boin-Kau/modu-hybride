import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import { ContentWrap, HeaderWrap, MainWrap, NoticeWrap, PageWrap } from "../../../styled/shared/wrap";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_notice_duck from "../../../assets/icon-notice-duck.svg";
import { useHistory } from "react-router-dom";
import { PageTransContext } from "../../../containers/pageTransContext";
import { TextMiddle } from "../../../styled/shared";
import { MainText } from "../../../styled/shared/text";
import { TitleWrap } from "../../../styled/main/enrollment";

import InputComponent from "../../../styled/shared/inputComponent";
import BottomButton from "../../../components/party/BottomButton";

const EditAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setPageTrans } = useContext(PageTransContext);

  const [accountId, setAccountId] = useState('');
  const [accountPw, setAccountPw] = useState('');
  const [pageConfirmStatus, setPageConfirmStatus] = useState(false);

  useEffect(() => {
    dispatch(BottomNavCloseAction);
  },[]);

  useEffect(() => {
    if(accountId&&accountPw) {
      setPageConfirmStatus(true);
    } else {
      setPageConfirmStatus(false);
    }
  },[accountId, accountPw])

  const closePage = () => {
    // 뒤로 가기
    setPageTrans('trans toLeft');
    history.goBack();
  };
  const handleChangeAccountId = (e) => {
    // if (e.target.value.length == 5) return false;
    setAccountId(e.target.value);
  };
  const handleChangeAccountPw = (e) => {
    // if (e.target.value.length == 5) return false;
    setAccountPw(e.target.value);
  };

  return(
    <div className="page">
      <HeaderWrap className="spoqaBold">
        <div id="back_link" onClick={closePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
          <img src={icon_back} alt="뒤로가기"></img>
        </div>
        <TextMiddle>계정 정보 변경</TextMiddle>
      </HeaderWrap>
      
      <MainWrap>
        <div style={{flexGrow: '1'}}>
          {/* Title */}
          <MainText style={{margin:'1rem 0 0.9063rem 0'}}>
            <span>변경할 </span>
            <span className="yellowText">구독 계정 정보</span>
            <span>를</span><br/>
            <span>입력해주세요.</span>
          </MainText>
          {/* Notice Div */}
          <NoticeWrap style={{backgroundColor:'#fff8e8'}}>
            <div className="notice_sub_wrap align_center">
              <div>
                <img className="notice_img" src={icon_notice_duck}></img>
              </div>
              <div className="notice_text_div">
                <span>계정정보 입력 시, </span>
                <span className="boldText">성인인증을 완료</span>
                <span>됐는지 확인해주세요! </span>
                <span className="boldText">SNS연동 계정</span>
                <span>은 공유가 불가능해요.</span>
              </div>
            </div>
          </NoticeWrap>
          {/* Account Div */}
          <TitleWrap>아이디</TitleWrap>
          <InputComponent
            id={"accountId"}
            type={"text"}
            placeholder={"아이디를 입력해주세요"}
            maxLength={200}
            value={accountId}
            onChange={handleChangeAccountId}
          />
          <TitleWrap>비밀번호</TitleWrap>
          <InputComponent
            id={"accountPw"}
            type={"password"}
            placeholder={"비밀번호를 입력해주세요"}
            maxLength={200}
            value={accountPw}
            onChange={handleChangeAccountPw}
          />

        </div>
        
        {/* 최하단 Yellow 버튼 */}
        <BottomButton clickFunc={()=>console.log('hi')} text={'확인'} />
        </MainWrap>
      
      
        
      
    </div>

  );
}

export default EditAccount;