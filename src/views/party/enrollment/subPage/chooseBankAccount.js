import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import BottomButton from "../../../../components/party/BottomButton";
import { UpdateCurrentPageAction } from "../../../../reducers/party/enrollment/setPage";
import { TitleWrap } from "../../../../styled/main/enrollment";
import InputComponent from "../../../../styled/shared/inputComponent";
import { MainText } from "../../../../styled/shared/text";
import { NoticeWrap } from "../../../../styled/shared/wrap";
import Slider from "react-slick";

import icon_notice_duck from "../../../../assets/icon-notice-duck.svg";
import ic_pay_cardtab from "../../../../assets/ic_pay_cardtab.svg";
import ic_pay_cardtab_g from "../../../../assets/ic_pay_cardtab_g.svg";

import { customApiClient } from "../../../../shared/apiClient";
import BankComponent from "../../../card/bankComponent";
import { settings } from "../../../payment/slide";
import Card from "../../../payment/card";

const ChooseBankAccount = () => {

  const dispatch = useDispatch();

  const [accountOwnerName, setAccountOwnerName] = useState('');
  const [currentSlide, setCurrentSlide] = useState('0');
  const [bankIdx, setBankIdx] = useState();
  const [bankAccountData, setBankAccountData] = useState({});

  const [nextBtnStatus, setNextBtnStatus] = useState(false);

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
      </div>

      <BottomButton clickFunc={nextPage} text={'다음'} activeStatus={nextBtnStatus} isBottomStatus={false}/>
      
    </ChooseBankAccountWrap>
  );
}

export default ChooseBankAccount;

const ChooseBankAccountWrap = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 0 1.25rem;
`;

