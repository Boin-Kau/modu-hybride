import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BottomButton from "../../../../components/party/BottomButton";
import { UpdateCurrentPageAction } from "../../../../reducers/party/enrollment/setPage";
import { PartyIcon, PartyIconWrap, PartyText, TitleWrap } from "../../../../styled/main/enrollment";
import InputComponent from "../../../../styled/shared/inputComponent";
import { MainText } from "../../../../styled/shared/text";
import { NoticeWrap } from "../../../../styled/shared/wrap";
import Slider from "react-slick";

import icon_notice_duck from "../../../../assets/icon-notice-duck.svg";
import ic_pay_cardtab from "../../../../assets/ic_pay_cardtab.svg";
import ic_pay_cardtab_g from "../../../../assets/ic_pay_cardtab_g.svg";
import icon_arrow_down from "../../../../assets/icon-arrow-down-black.svg";
import icon_check from "../../../../assets/icon-check-white.svg";
import icon_delete from "../../../../assets/icon-popup-delete.svg";

import { customApiClient } from "../../../../shared/apiClient";
import BankComponent from "../../../card/bankComponent";
import { settings } from "../../../payment/slide";
import Card from "../../../payment/card";

import { UpdateBankAccountAction } from "../../../../reducers/party/enrollment/bankAccount";
import AccountSlide from "../../../payment/accountSlide";

const ChooseBankAccount = () => {

  const dispatch = useDispatch();

  const {
    selectedBankIdx,
    selectedBankAccountUserName,
    selectedBankAccountNum,
    selectedBankAccountIdx,
  } = useSelector(state => state.party.enrollment.bankAccount);

  const [accountOwnerName, setAccountOwnerName] = useState(selectedBankAccountUserName || "");
  const [bankAccountNum, setBankAccountNum] = useState(selectedBankAccountNum || "");
  const [bankIdx, setBankIdx] = useState(selectedBankIdx || null);
  const [bankAccountIdx, setBankAccountIdx] = useState(0);

  const [isFocus, setIsFocus] = useState(false);
  const [agreeStatus, setAgreeStatus] = useState('N');
  const [nextBtnStatus, setNextBtnStatus] = useState(false);
  const [isChooseBankClicked, setIsChooseBankClicked] = useState(false);
  const [selectedBankName, setSelectedBankName] = useState('');
  const [isBankAccountStatus, setIsBankAccountStatus] = useState(false);
  const [bankAccountList, setBankAccountList] = useState([]);

  useEffect(() => {
    dispatch(UpdateBankAccountAction({
      selectedBankIdx: null,
      selectedBankAccountUserName: null,
      selectedBankAccountNum: null,
      selectedBankAccountIdx: null
    }));

    getBankAccountList();
  }, [])

  useEffect(() => {
    if (!isBankAccountStatus) {
      if (accountOwnerName && selectedBankName && bankAccountNum && (agreeStatus === 'Y')) {
        setNextBtnStatus(true);
        return
      }
      setNextBtnStatus(false);
    } else {
      bankAccountIdx === -1 ? setNextBtnStatus(false) : setNextBtnStatus(true);
    }

  }, [accountOwnerName, selectedBankName, bankAccountNum, agreeStatus, bankAccountIdx])

  const getBankAccountList = async () => {
    const bankAccountUri = '/party/user/bankAccount';
    const data = await customApiClient('get', bankAccountUri);

    // Server Error
    if (!data) { return };
    // Validation 
    if (data.statusCode !== 200) { return }
    // 등록된 정산계좌 유무 확인
    if (data.result.length === 0) {
      setIsBankAccountStatus(false);
      console.log(isBankAccountStatus);
    } else {
      setIsBankAccountStatus(true);
      console.log(isBankAccountStatus);
    }

    console.log('API 호출 성공 :', data);
    setBankAccountList(data.result);
  };

  const handleChangeAccountOwnerName = (e) => {
    setAccountOwnerName(e.target.value);
  };
  const handleChangeBankAccountNum = (e) => {
    setBankAccountNum(e.target.value);
  };
  const onClickChooseBank = () => {
    setIsChooseBankClicked(!isChooseBankClicked);
  };
  const onClickCheckBox = useCallback(() => {
    if (agreeStatus == "N") {
      setAgreeStatus("Y");
    } else {
      setAgreeStatus("N");
    }
  }, [agreeStatus])

  //서버통신 로딩 state
  const [loading, setLoading] = useState(false);

  const nextPage = async () => {

    if (isBankAccountStatus) {
      // 정산계좌가 존재할 때 
      nextBtnStatus && bankAccountList.map((account, index) => {
        if (account.idx === bankAccountIdx) {
          dispatch(UpdateBankAccountAction({
            selectedBankIdx: account.idx,
            selectedBankAccountUserName: '',
            selectedBankAccountNum: account.bankAccountNum,
            selectedBankAccountIdx: bankAccountIdx
          }));
        }
      })
      nextBtnStatus && dispatch(UpdateCurrentPageAction({ page: 6 }));
    } else {

      if (loading) return
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

      console.log('API 호출 성공 :', data);

      data.result.bankAccountIdx && nextBtnStatus && dispatch(UpdateBankAccountAction({
        selectedBankIdx: bankIdx,
        selectedBankAccountUserName: accountOwnerName,
        selectedBankAccountNum: bankAccountNum,
        selectedBankAccountIdx: data.result.bankAccountIdx
      }));
      data.result.bankAccountIdx && nextBtnStatus && dispatch(UpdateCurrentPageAction({ page: 6 }));

      setLoading(false);
    }
  };

  return (
    <ChooseBankAccountWrap style={{ flexGrow: '1' }}>
      <div style={{ flexGrow: '1' }}>
        <MainText style={{ margin: '1rem 0 0', padding: '0' }}>
          <span className="yellowText">정산받을 계좌</span>
          를<br />
          알려주세요.
        </MainText>

        {/* 등록 계좌가 없을 때 */}
        <AddBankAccountWrap openStatus={isBankAccountStatus}>
          {/* Notice Div */}
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
            onClick={onClickCheckBox}
          >
            <PartyIconWrap isFree={agreeStatus}>
              <PartyIcon src={icon_check} />
            </PartyIconWrap>
            <PartyText style={{ color: '#6a6a6a' }} className="notoMedium">
              <span>[필수] </span>
              <span style={{ textDecoration: 'underline' }}>개인정보 수집</span>
              <span> 및 이용동의</span>
            </PartyText>
          </div>

          {/* 은행 선택 다이얼로그 */}
          <ChooseBankDialog
            openStatus={isChooseBankClicked}
            deleteFunc={setIsChooseBankClicked}
            selectBankFunc={setSelectedBankName}
            selectBankIdxFunc={setBankIdx} />

        </AddBankAccountWrap>

        {/* 등록 계좌가 있을 때 */}
        <AccountSlideWrap openStatus={isBankAccountStatus}>
          <AccountSlide
            setAccountIdx={setBankAccountIdx}
            setBankAccountOpenStatus={setIsBankAccountStatus} />
        </AccountSlideWrap>
      </div>

      <BottomButton clickFunc={nextPage} text={'다음'} activeStatus={nextBtnStatus} isBottomStatus={false} />

    </ChooseBankAccountWrap>
  );
}

export default ChooseBankAccount;

const AddBankAccountWrap = styled.div`
  display: ${props => props.openStatus ? 'none' : 'block'};
`;

const ChooseBankAccountWrap = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 0 1.25rem;
`;

const InputWrap = styled.div`
  display: flex;

  padding: 0.625rem 0.875rem;

  border: ${(props) =>
    props.openStatus ? "0.0625rem solid #ffca2c" : "0.0625rem solid #e8e8e8"};

  border-radius: 0.25rem;

  font-size: 0.8125rem;

  color: ${(props) => (props.isBlocked ? "rgba(49, 49, 49,0.2)" : "#313131")};
  background-color: #ffffff;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  font-size: 0.8125rem;

  padding: 0;

  :focus {
    outline: none;
  }
  ::placeholder {
    opacity: 0.3;
  }
`;

const ChooseBankBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.9375rem;

  span {
    margin-right: 0.5rem;
  }
`;

const AccountSlideWrap = styled.div`
  display: ${props => props.openStatus ? 'block' : 'none'};
`

export const ChooseBankDialog = ({ openStatus, deleteFunc, selectBankFunc, selectBankIdxFunc }) => {

  const [normalBankList, setNormalBankList] = useState([]);
  const [stockBankList, setStockBankList] = useState([]);

  useEffect(() => {
    getBankList();
  }, [])

  const getBankList = async () => {
    const bankUri = '/party/bankInfo';
    const data = await customApiClient('get', bankUri);

    // Server Error
    if (!data) { return };
    // Validation 
    if (data.statusCode !== 200) { return };

    console.log('API 호출 성공 :', data);
    setNormalBankList(data.result.normalBank);
    setStockBankList(data.result.stockBank);
  }
  const onClickDeleteDialog = () => {
    deleteFunc(!openStatus);
  }
  const onClickBankItem = (bankName, idx) => {
    selectBankFunc(bankName);
    selectBankIdxFunc(idx);
    deleteFunc(!openStatus);
  }

  return (
    <ChooseBankWrap openStatus={openStatus}>
      <ChooseBankDiv>
        <div className="titleDiv">
          <span>은행선택</span>
          <img onClick={onClickDeleteDialog} className="deleteBtn" src={icon_delete}></img>
        </div>

        <div className="gridWrap">
          {
            normalBankList && normalBankList.map((bank, index) => {
              return (
                <BankItem key={index} onClick={() => onClickBankItem(bank.bankName, bank.idx)}>
                  <img src={bank.bankImg}></img>
                  <span>{bank.bankName}</span>
                </BankItem>
              );
            })
          }
          {
            stockBankList && stockBankList.map((bank, index) => {
              return (
                <BankItem key={index} onClick={() => onClickBankItem(bank.bankName, bank.idx)}>
                  <img src={bank.bankImg}></img>
                  <span>{bank.bankName}</span>
                </BankItem>
              );
            })
          }
        </div>
      </ChooseBankDiv>
    </ChooseBankWrap>
  );
}

const ChooseBankWrap = styled.div`
  display : ${props => props.openStatus ? 'block' : 'none'};
  z-index:10000;
  position:absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ChooseBankDiv = styled.div`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.08);
  padding: 0 1.1563rem;
  overflow-y: scroll;

  height: 32.375rem;

  .titleDiv {
    position:sticky;
    top: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-family: 'Noto Sans KR';
    font-weight: 600;
    color: #313131;
    margin-bottom: 0.625rem;
    padding-top: 1.5625rem;
  }
  .deleteBtn {
    width: 0.75rem;
    height: 0.75rem;
  }
  .gridWrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(70px, auto);
    gap: 0.8125rem 0.9375rem;
  }
`;

const BankItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 1rem;
    height: 1.125rem;
    margin-bottom: 0.25rem;
  }
  span {
    font-size: 0.75rem;
    font-family: 'Noto Sans KR';
    font-weight: 500;
  }
`;