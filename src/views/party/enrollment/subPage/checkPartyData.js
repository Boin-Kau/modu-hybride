import styled from "styled-components";
import { MainText, PartyDetailSubtitleSpan } from "../../../../styled/shared/text";
import PartyTitleDiv from "../../../../components/party/PartyTitleDiv";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { TitleWrap } from "../../../../styled/main/enrollment";
import PartyDataListItem from "../../../../components/party/PartyList";
import PartyMembershipDiv from "../../../../components/party/PartyMembershipDiv";
import BottomButton from "../../../../components/party/BottomButton";
import { customApiClient } from "../../../../shared/apiClient";
import { PageTransContext } from "../../../../containers/pageTransContext";
import { useHistory, useParams } from "react-router-dom";
import { UpdatePlatformAction } from "../../../../reducers/party/enrollment/platform";
import { ResetAccount } from "../../../../reducers/party/enrollment/account";
import { ResetPartyInfo } from "../../../../reducers/party/enrollment/partyInfo";
import { ResetPayment } from "../../../../reducers/party/enrollment/payment";
import { ResetBankAccount } from "../../../../reducers/party/enrollment/bankAccount";
import { AnalyPageReloadTrueAction } from "../../../../reducers/main/analysis";
import { SubscribeReloadTrueAction } from "../../../../reducers/main/subscribe";
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from "../../../../reducers/container/message";

const CheckPartyData = () => {
  const platformState = useSelector(state => state.party.enrollment.platform);
  const { accountId, accountPw } = useSelector(state => state.party.enrollment.account);
  const { title, membership, openChatLink } = useSelector(state => state.party.enrollment.partyInfo);
  const { originalPrice, nextPaymentDate, pricePerPerson, personnel, typeList, formatDate } = useSelector(state => state.party.enrollment.payment);
  const {
    selectedBankIdx,
    selectedBankAccountUserName,
    selectedBankAccountNum,
    selectedBankAccountIdx,
    selectedBankNameState
  } = useSelector(state => state.party.enrollment.bankAccount);

  //Context
  const { setPageTrans } = useContext(PageTransContext);

  const history = useHistory();
  const dispatch = useDispatch();

  //서버통신 로딩 state
  const [loading, setLoading] = useState(false);

  //기존 파티장 등록 로직
  const { idx } = useParams();

  const enrollBtn = async () => {

    if (loading) return
    setLoading(true);

    console.log(idx)

    let body = {};
    let url = "";

    //신규 파티 등록 로직
    if (!idx) {
      console.log("신규 파티 등록 로직");
      body = {
        title: title,
        registerType: platformState.selectedPlatformImgUrl ? "SERVER" : "CUSTOM",
        price: Number(pricePerPerson),
        originalPrice: Number(originalPrice),
        openChatLink: openChatLink,
        membership: membership,
        personnel: personnel,
        platformIdx: platformState.selectedPlatformIdx,
        name: platformState.selectedPlatformImgUrl ? platformState.selectedPlatformName : platformState.selectedPlatformName,
        color: platformState.selectedPlatformImgColor,
        initial: platformState.selectedPlatformImgInitial,
        categoryIdx: platformState.selectedPlatformCategoryIdx,
        accountId: accountId,
        accountPw: accountPw,
        bankAccountIdx: selectedBankAccountIdx,
        paymentDate: formatDate,
        paymentCycleData: 1,
        paymentCycleUnit: "MONTH"
      }

      url = "/party";
    }
    //기존 파티장 등록 로직
    else {
      console.log("기존 파티 등록 로직");
      body = {
        partyIdx: Number(idx),
        title: title,
        price: Number(pricePerPerson),
        originalPrice: Number(originalPrice),
        openChatLink: openChatLink,
        membership: membership,
        personnel: personnel,
        accountId: accountId,
        accountPw: accountPw,
        bankAccountIdx: selectedBankAccountIdx,
        paymentDate: formatDate,
        paymentCycleData: 1,
        paymentCycleUnit: "MONTH"
      }

      url = "/party/past";
    }

    const data = await customApiClient('post', url, body);

    console.log(data.message);
    // Server Error
    if (!data) {
      setLoading(false);
      return
    };
    // Validation 
    if (data.statusCode !== 200) {
      setLoading(false);
      return
    };

    console.log('API 호출 성공 :', data);

    dispatch(UpdatePlatformAction({
      selectedPlatformIdx: null,
      selectedPlatformName: null,
      selectedPlatformCategoryIdx: null,
      selectedPlatformImgUrl: null,
      selectedPlatformImgColor: null,
      selectedPlatformImgInitial: null,
      isAccount: "N",
      isAdult: "N",
    }))
    dispatch({ type: ResetAccount });
    dispatch({ type: ResetPartyInfo });
    dispatch({ type: ResetPayment });
    dispatch({ type: ResetBankAccount });

    //소비분석 리로드
    dispatch(AnalyPageReloadTrueAction);
    dispatch(SubscribeReloadTrueAction);

    setLoading(false);

    dispatch({
      type: MessageWrapOpen
    })
    dispatch({
      type: MessageOpen,
      data: '파티가 정상적으로 등록되었어요.'
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

    setPageTrans('trans toRight');
    history.push('/party');
  }

  return (
    <CheckPartyDataWrap>
      <MainText style={{ margin: '1rem 0 1.25rem', padding: '0' }}>
        파티 등록 전,<br />
        <span className="yellowText">아래 정보를 확인</span>
        해주세요.
      </MainText>

      {/* Subtitle */}
      <PartyDetailSubtitleSpan style={{ marginBottom: '1rem', display: 'block' }}>멤버십 정보</PartyDetailSubtitleSpan>

      <GrayWrap style={{ borderBottom: 'dashed #eaeaea 1.5px', padding: '0.875rem 0.75rem' }}>
        <div className="partyTitleWrap">
          <PartyTitleDiv
            title={title}
            isDetail={false}
            info={{
              platformIdx: platformState.selectedPlatformIdx,
              serverName: platformState.selectedPlatformName,
              customName: platformState.selectedPlatformName,
              serverCategoryIdx: platformState.selectedPlatformCategoryIdx,
              serverImgUrl: platformState.selectedPlatformImgUrl,
              color: platformState.selectedPlatformImgColor,
              initial: platformState.selectedPlatformImgInitial,
              registerType: platformState.selectedPlatformImgUrl ? "SERVER" : "CUSTOM",
              serverCategory: platformState.selectedPlatformCatgoryName,
              customCategory: platformState.selectedPlatformCatgoryName
            }}
          />
        </div>
      </GrayWrap>
      <GrayWrap style={{ padding: '0.8125rem 1rem 2.1875rem', marginBottom: '2.0313rem' }}>
        {/* 파티정보 */}
        <TitleWrap style={{ margin: '0 0 0.625rem' }}>파티 정보</TitleWrap>
        <PartyPersonnelWrap personnel={personnel}>
          {
            typeList.map((item, idx) => {
              return (
                <PartyDataListItem
                  type={item}
                  margin={personnel > 4 ? "0.9375rem" : "0"}
                  isHost={idx === 0 ? "Y" : "N"}
                  isEnrollment={true}
                  key={idx} />
              )
            })
          }
        </PartyPersonnelWrap>

        {/* 멤버십 정보 */}
        <TitleWrap style={{ marginBottom: '0.625rem' }}>멤버십 정보</TitleWrap>
        <PartyMembershipDiv
          membershipInfo={{
            paymentCycleDate: formatDate,
            price: pricePerPerson,
            membership: membership
          }}
          platformInfo={{
            serverCategory: platformState.selectedPlatformCatgoryName,
            customCategory: platformState.selectedPlatformCatgoryName
          }}
        />

        {/* 정산 정보 */}
        <TitleWrap style={{ marginBottom: '0.625rem' }}>정산 정보</TitleWrap>
        <BankAccountWrap>
          <div className="contents_div margin_bottom">
            <span className="contents_name">정산수단</span>
            <span className="contents_description">계좌입금</span>
          </div>
          <div className="contents_div">
            <span className="contents_name">상세</span>
            <span className="contents_description">{selectedBankNameState} {selectedBankAccountNum}</span>
          </div>
        </BankAccountWrap>

      </GrayWrap>

      <BottomButton clickFunc={enrollBtn} text={'확인'} activeStatus={true} isBottomStatus={false} />


    </CheckPartyDataWrap>
  );
}

export default CheckPartyData;

const CheckPartyDataWrap = styled.div`
  padding: 0 1.25rem;
`;

const GrayWrap = styled.div`
  border-radius: 0.4375rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  background-color: #fcfcfc;

  .partyTitleWrap {
    display: flex;
  }
`;

const PartyPersonnelWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow-x: auto;
`;

const BankAccountWrap = styled.div`
  border-radius: 0.4375rem;
  box-shadow: 0 0.1875rem 0.25rem 0 rgba(233, 233, 233, 0.38);
  background-color: #fff;
  padding: 19px 15px;

  .contents_div {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 0.75rem;
    display: flex;
    justify-content: space-between;
  }
  .contents_name {
    color: #313131;
  }
  .contents_description {
    color: #464646;
  }
  .margin_bottom {
    margin-bottom: 0.875rem;
  }
`;