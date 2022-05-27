import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../containers/pageTransContext';
import { BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { ContentWrap, HeaderWrap, NoticeWrap, PageWrap } from '../../styled/shared/wrap';

import icon_back from "../../assets/icon-back-arrow.svg";
import icon_notice_duck from "../../assets/icon-notice-duck.svg";
import icon_arrow_down from "../../assets/icon-arrow-down-black.svg";
import icon_check from "../../assets/icon-check-white.svg";

import { TextMiddle } from '../../styled/shared';
import { MainText } from '../../styled/shared/text';
import { Input, InputWrap, PartyIcon, PartyIconWrap, PartyText, TitleWrap } from '../../styled/main/enrollment';
import InputComponent from '../../styled/shared/inputComponent';
import styled from 'styled-components';
import { ChooseBankDialog } from '../party/enrollment/subPage/chooseBankAccount';
import BottomButton from '../../components/party/BottomButton';
import { customApiClient } from '../../shared/apiClient';
import { MessageClose, MessageOpen, MessageWrapClose, MessageWrapOpen } from '../../reducers/container/message';

const BankAccountEnrollment = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  // state
  const [accountOwnerName, setAccountOwnerName] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isChooseBankClicked, setIsChooseBankClicked] = useState(false);
  const [selectedBankName, setSelectedBankName] = useState('');
  const [bankAccountNum, setBankAccountNum] = useState('');
  const [agreeStatus, setAgreeStatus] = useState('N');
  const [bankIdx, setBankIdx] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState(false);

  //서버통신 로딩 state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(BottomNavCloseAction);
  }, []);

  useEffect(() => {
    if (accountOwnerName && selectedBankName && bankAccountNum && (agreeStatus === 'Y')) {
      setEnrollmentStatus(true);
      return;
    }
    setEnrollmentStatus(false);

  }, [accountOwnerName, selectedBankName, bankAccountNum, agreeStatus])

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.goBack();
  };

  const handleChangeAccountOwnerName = (e) => {
    setAccountOwnerName(e.target.value);
  };
  const handleChangeBankAccountNum = (e) => {
    setBankAccountNum(e.target.value);
  };

  const onClickChooseBank = () => {
    setIsChooseBankClicked(!isChooseBankClicked);
  }
  const onClickCheckBox = useCallback(() => {
    if (agreeStatus == "N") {
      setAgreeStatus("Y");
    } else {
      setAgreeStatus("N");
    }
  }, [agreeStatus])

  const onClickBankAccountEnrollment = async () => {

    if (loading) return
    if (!enrollmentStatus) return
    setLoading(true);

    // 정산계좌가 없을 땐 정산계좌 등록 후 페이지 전환
    const body = {
      bankAccountUserName: accountOwnerName,
      bankIdx: bankIdx,
      bankAccountNum: bankAccountNum
    };
    const postBankAccountUri = 'party/user/bankAccount'
    const data = await customApiClient('post', postBankAccountUri, body);

    // Server Error
    if (!data) {
      setLoading(false);
      return
    };
    // Validation 
    if (data.statusCode !== 200) {
      setLoading(false);
      alert(data.message);
      return
    };

    dispatch({
      type: MessageWrapOpen
    })
    dispatch({
      type: MessageOpen,
      data: '계좌가 정상적으로 등록되었어요.'
    })

    setTimeout(() => {
      dispatch({
        type: MessageClose
      })
    }, 2000);
    setTimeout(() => {
      dispatch({
        type: MessageWrapClose
      })
    }, 2300);

    // 정산계좌 등록 완료 후 페이지 이동
    data.result.bankAccountIdx && closePage();

    setLoading(false);
  };

  const TermPopupOpen = () => {
    dispatch({ type: "DetailPopupOpen" });
  };

  return (
    <div className='page'>
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
          <TextMiddle>계좌 등록</TextMiddle>
        </HeaderWrap>
        <ContentWrap>
          <MainText style={{ margin: '1rem 0 0', padding: '0' }}>
            <span className="yellowText">정산받을 계좌</span>
            를<br />
            알려주세요.
          </MainText>

          <NoticeWrap style={{ boxShadow: 'none', backgroundColor: '#fff8e8', margin: '1.1563rem 0 1.2813rem' }}>
            <div className="notice_sub_wrap align_center">
              <div>
                <img className="notice_img" src={icon_notice_duck}></img>
              </div>
              <div className="notice_text_div">
                파티금액을
            <span className="boldText"> 입금받을 계좌</span>
            를 알려주세요. 계좌는 본인명의의 계좌만 등록이 가능합니다.
          </div>
            </div>
          </NoticeWrap>

          {/* 계좌 소유자 */}
          <TitleWrap style={{ marginTop: '0.9688rem' }}>계좌 소유자</TitleWrap>
          <InputComponent
            id={"accountOwnerName"}
            type={"text"}
            placeholder={"계좌 소유자의 이름을 입력해주세요."}
            maxLength={200}
            value={accountOwnerName}
            onChange={handleChangeAccountOwnerName}
          />

          {/* 계좌번호 */}
          <TitleWrap >계좌 번호</TitleWrap>
          <InputWrap openStatus={isFocus}>
            <ChooseBankBtn onClick={onClickChooseBank}>
              <span>{selectedBankName ? selectedBankName : '은행선택'}</span>
              <img src={icon_arrow_down}></img>
            </ChooseBankBtn>
            <Input
              type={'number'}
              placeholder={"계좌번호 (-제외)"}
              value={bankAccountNum}
              onChange={handleChangeBankAccountNum}
              onFocus={(e) => {
                setIsFocus(true);
              }}
              onBlur={(e) => {
                setIsFocus(false);
              }}
            ></Input>
          </InputWrap>

          {/* 개인정보 동의 체크박스 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "0.75rem",
            }}
          >
            <PartyIconWrap isFree={agreeStatus} onClick={onClickCheckBox}>
              <PartyIcon src={icon_check} />
            </PartyIconWrap>
            <PartyText style={{ color: '#6a6a6a' }} className="notoMedium">
              <span>[필수] </span>
              <span onClick={TermPopupOpen} style={{ textDecoration: 'underline' }}>개인정보 수집</span>
              <span> 및 이용동의</span>
            </PartyText>
          </div>

          {/* 은행 선택 다이얼로그 */}
          <ChooseBankDialog
            openStatus={isChooseBankClicked}
            deleteFunc={setIsChooseBankClicked}
            selectBankFunc={setSelectedBankName}
            selectBankIdxFunc={setBankIdx} />

          <BottomButton
            clickFunc={onClickBankAccountEnrollment}
            text={"확인"}
            activeStatus={enrollmentStatus}
            isBottomStatus={true} />

        </ContentWrap>
      </PageWrap>

    </div>
  );
}

export default BankAccountEnrollment;

const ChooseBankBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.9375rem;

  span {
    margin-right: 0.5rem;
  }
`;