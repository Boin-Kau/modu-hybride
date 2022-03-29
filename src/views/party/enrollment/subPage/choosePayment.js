import styled from "styled-components";
import { MainText, PartyDetailSubtitleSpan } from "../../../../styled/shared/text";
import { NoticeWrap } from "../../../../styled/shared/wrap";

import icon_notice_duck from "../../../../assets/icon-notice-duck.svg";
import icon_info from "../../../../assets/info-black-192-x-192@3x.png";
import icon_arrow_down from "../../../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../../../assets/icon-arrow-up-gray.svg";

import { Input, InputWrap, ItemWrap, TitleWrap } from "../../../../styled/main/enrollment";
import { InfoWrap, MiniInfoDialog } from "./chooseAccount";
import InputComponent from "../../../../styled/shared/inputComponent";
import { useCallback, useState } from "react";

import Fade from 'react-reveal/Fade';
import { NumberList } from "../../../main/subscribe/enrollment";

const ChoosePayment = () => {
  const [membershipPrice, setMembershipPrice] = useState('');
  const [paymentDay, setPaymentDay] = useState(null);

  const [paymentDayOpen, setPaymentDayOpen] = useState(false);
  const [personelOpen, setPersonelOpen] = useState(false);
  const [partyPersonel, setPartyPersonel] = useState(0);

  const [membershipPriceInfoStatus, setMembershipPriceInfoStatus] = useState(false)
  const [totalPersonnelInfoStatus, setTotalPersonnelInfoStatus] = useState(false);


  const onClickPaymentDayOpen = useCallback(() => {
    if (paymentDayOpen) {
      setPaymentDayOpen(false);
    }
    else {
      setPaymentDayOpen(true);
    }
  }, [paymentDayOpen]);

  const onClickPersonelOpen = () => {
    setPersonelOpen(!personelOpen);
  };

  const handleChangeMembershipPrice = (e) => {
    setMembershipPrice(e.target.value);
  }

  const onClickPaymentDayContent = (data) => {
    setPaymentDay(data);
    setPaymentDayOpen(false);
  }
  const onChangePersonel = (personel) => {
    setPartyPersonel(personel);
    setPersonelOpen(false);
  }

  // 멤버십 금액 Info Dialog를 Open / Close 하는 함수입니다. 
  const onClickMembershipPriceInfo = () => setMembershipPriceInfoStatus(!membershipPriceInfoStatus);

  // 총 금액 Info Dialog를 Open / Close 하는 함수입니다. 
  const onClickTotalPersonnelInfo = () => setTotalPersonnelInfoStatus(!totalPersonnelInfoStatus);

  return (
    <ChoosePaymentWrap >
      <MainText style={{margin:'1rem 0 0'}}>
        <span className="yellowText">파티의 결제정보</span>
        를<br/>
        입력해주세요.
      </MainText>

      {/* Notice Div */}
      <NoticeWrap style={{boxShadow:'none', backgroundColor:'#fff8e8', margin:'1.1563rem 0 1.2813rem'}}>
        <div className="notice_sub_wrap align_center">
          <div>
            <img className="notice_img" src={icon_notice_duck}></img>
          </div>
          <div className="notice_text_div">
            구독파티는 
            <span className="boldText"> 한달주기로 정산</span>
            이 이루어져요! 
            <span className="boldText"> 실제 멤버십 금액</span>
            을 기준으로 정보를 입력해주세요.
          </div>
        </div>
      </NoticeWrap>

      <PartyDetailSubtitleSpan>결제 정보</PartyDetailSubtitleSpan>

      {/* 멤버십 금액 */}
      <TitleWrap style={{marginTop:'0.5rem', position:'relative'}}>
        멤버십 금액
        <InfoWrap>
          <img onClick={onClickMembershipPriceInfo} className="infoBtn" src={icon_info} />
        </InfoWrap>
        <MiniInfoDialog trianglePosition={'28%'} openStatus={membershipPriceInfoStatus}>
          설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다.
        </MiniInfoDialog>
      </TitleWrap>
      <ItemWrap>
        <InputWrap style={{ flexGrow: "1", flexBasis: "0" }}>
          <Input type="number" placeholder="실제 멤버십 금액을 입력해주세요" onChange={handleChangeMembershipPrice} value={membershipPrice}></Input>
          <div className="notoBold" style={{ fontSize: '0.8125rem', color: 'rgba(49,49,49,0.31)' }}>￦(원)</div>
        </InputWrap>
      </ItemWrap>

      {/* 다음 결제일 */}
      <TitleWrap style={{marginTop:'0.5rem'}}>다음 결제일</TitleWrap>
      <InputWrap openStatus={paymentDayOpen} isBlocked={!paymentDay} onClick={onClickPaymentDayOpen}>
        <div>
          {
            paymentDay ? paymentDay :
              '결제일을 선택해주세요.'
          }
        </div>
        <div style={{ flexGrow: "1" }}></div>
        <div>
          {
            paymentDayOpen ?
              <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
              <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
          }
        </div>
      </InputWrap>
      <div>
        <Fade collapse when={paymentDayOpen} duration={500}>
          <SelectWrap>
            {
              NumberList.map((data, index) => {
                return (
                  <SelectContent selectSatus={data == paymentDay} onClick={() => { onClickPaymentDayContent(data) }} key={index}>
                      {data}
                  </SelectContent>
                )
              })
            }
          </SelectWrap>
        </Fade>
      </div>

      <TitleWrap style={{marginTop:'0.5rem', position:'relative'}}>
        총 인원
        <InfoWrap>
          <img onClick={onClickTotalPersonnelInfo} className="infoBtn" src={icon_info} />
        </InfoWrap>
        <MiniInfoDialog trianglePosition={'20%'} openStatus={totalPersonnelInfoStatus}>
          설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다.
        </MiniInfoDialog>
      </TitleWrap>
      <ItemWrap onClick={onClickPersonelOpen}>
        <InputWrap openStatus={personelOpen} isBlocked={partyPersonel === 0}>
          <div>
            {
              partyPersonel !== 0 ? partyPersonel :
                  '본인포함, 멤버십을 나눌 총인원을 선택하세요'
            }
          </div>
          <div style={{ flexGrow: "1" }}></div>
          <div>
            {
              personelOpen ?
                  <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                  <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
            }
          </div>
        </InputWrap>
      </ItemWrap>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: '1', flexBasis: '0'}}>
          <Fade collapse when={personelOpen} duration={500}>
            <SelectWrap>

              {
                [2, 3, 4, 5, 6].map((data, index) => {
                  return (
                      <SelectContent selectSatus={data === partyPersonel} onClick={() => { onChangePersonel(data) }} key={index}>
                          {data}
                      </SelectContent>
                  )
                })
              }

            </SelectWrap>
          </Fade>
        </div>
      </div>


    </ChoosePaymentWrap>
  );
}

export default ChoosePayment;

const ChoosePaymentWrap = styled.div`
  padding: 0 1.25rem;
`;

const SelectWrap = styled.div`
  background-color:#ffffff;
  border:0.0625rem solid #e8e8e8;
  border-radius:'0.25rem';

  max-height:10.75rem;
  overflow-y:scroll;

  margin-top:0.3125rem;
  margin-bottom:1.125rem;

  box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;

const SelectContent = styled.div`
  font-size:0.75rem;
  color:#313131;
  height:0.75rem;
  padding:0.8125rem 0.875rem;

  background-color:${props => props.selectSatus ? 'rgba(216, 216, 216,0.15)' : '#ffffff'};
`;

