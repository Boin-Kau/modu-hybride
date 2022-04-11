import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

import { customApiClient } from "../../../../shared/apiClient";
import BankComponent from "../../../card/bankComponent";
import { settings } from "../../../payment/slide";
import Card from "../../../payment/card";

const ChooseBankAccount = () => {

  const dispatch = useDispatch();

  const [accountOwnerName, setAccountOwnerName] = useState('');
  const [bankAccountNum, setBankAccountNum] = useState('');
  const [currentSlide, setCurrentSlide] = useState('0');
  const [bankIdx, setBankIdx] = useState();
  const [bankAccountData, setBankAccountData] = useState({});
  const [isFocus, setIsFocus] = useState(false);
  const [agreeStatus, setAgreeStatus] = useState('N');
  const [nextBtnStatus, setNextBtnStatus] = useState(false);
  const [isChooseBankClicked, setIsChooseBankClicked] = useState(false);

  useEffect(() => {
    getBankAccountList();
  },[])

  const getBankAccountList = async () => {
    const bankAccountUri = '/party/user/bankAccount';
    const data = await customApiClient('get', bankAccountUri);

    // Server Error
    if (!data) { return };
    // Validation 
    if (data.statusCode !== 200) { return };

    console.log('API 호출 성공 :', data);
    setBankAccountData(data);
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
  },[agreeStatus])

  const nextPage = () => {
    nextBtnStatus && dispatch(UpdateCurrentPageAction({page: 6}));
  };

  return (
    <ChooseBankAccountWrap style={{flexGrow: '1'}}>
      <div style={{flexGrow: '1'}}>
        <MainText style={{margin:'1rem 0 0',padding:'0'}}>
          <span className="yellowText">정산받을 계좌</span>
          를<br/> 
          알려주세요.
        </MainText>

        <AddBankAccountWrap isAddAccount={true}>
          {/* Notice Div */}
            <NoticeWrap style={{boxShadow:'none', backgroundColor:'#fff8e8', margin:'1.1563rem 0 1.2813rem'}}>
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
          <TitleWrap style={{marginTop:'0.9688rem'}}>계좌 소유자</TitleWrap>
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
              <span>은행선택</span>
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
            <PartyText style={{color:'#6a6a6a'}} className="notoMedium">
              [필수] 개인정보 수집 및 이용동의
            </PartyText>
          </div>

          {/* 은행 선택 다이얼로그 */}
          <ChooseBankDialog openStatus={isChooseBankClicked} />
        </AddBankAccountWrap>

        

        


        {/* {bankAccountData.length === 0 ?
          (<></>)
        : 
          (
            <Slider
              {...settings}
              afterChange={(current, next) => {
                setCurrentSlide(current);
              }}
            >
              {bankAccountData.result.map((bankData, index) => {
                {(currentSlide==index) && setBankIdx(bankData.idx)}
                return (
                  <div key={bankData.idx}>
                    {(currentSlide == index ) ? (
                      <Card
                        cardImg={ic_pay_cardtab}
                        cardName={bankData.bankName}
                        cardNo={bankData.bankAccountNum}
                      />
                    ) : (
                      <Card
                        cardImg={ic_pay_cardtab_g}
                        cardName={bankData.bankName}
                        cardNo={bankData.bankAccountNum}
                      />
                    )}
                  </div>
                );
              })}
              <></>
            </Slider>
          )
        } */}

        

        
      </div>

      <BottomButton clickFunc={nextPage} text={'다음'} activeStatus={nextBtnStatus} isBottomStatus={false}/>
      
    </ChooseBankAccountWrap>
  );
}

export default ChooseBankAccount;

const AddBankAccountWrap = styled.div`
  display: ${props => props.isAddAccount ? 'block':'none'};
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

export const ChooseBankDialog = ({openStatus}) => {

  const [normalBankList, setNormalBankList] = useState([]);
  const [stockBankList, setStockBankList] = useState([]);

  useEffect(() => {
    getBankList();
  },[])

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

  return (
    <ChooseBankWrap openStatus={openStatus}>
      hi
      
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

