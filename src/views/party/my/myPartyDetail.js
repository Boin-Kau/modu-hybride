import { TextMiddle } from "../../../styled/shared";
import { HeaderWrap, NoticeWrap, PartyDetailSubWrap } from "../../../styled/shared/wrap";
import { PageTransContext } from '../../../containers/pageTransContext';

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_more from "../../../assets/icon-partydetail-more.svg";
import icon_small_duck from "../../../assets/icon-partydetail-ducknumber.svg";
import icon_notice_duck from '../../../assets/icon-notice-duck.svg';

import { useHistory, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import styled from "styled-components";
import { checkMobile } from "../../../App";
import { customApiClient } from "../../../shared/apiClient";
import PartyTitleDiv from "../../../components/party/PartyTitleDiv";
import { PartyDetailSubtitleSpan } from "../../../styled/shared/text";
import PartyDataListItem, { CustomPartyListItem } from "../../../components/party/PartyList";
import PartyMembershipDiv from "../../../components/party/PartyMembershipDiv";
import AccountInfoComponent from "./accountInfoComponent";
import BottomButton from "../../../components/party/BottomButton";
import { HostBottomDialogOpenAction, MemberBottomDialogOpenAction, PartyDeleteConfirmDialogCloseAction, SetReportCategoryListAction, ReportPopupOpenAction, MemberBottomDialogCloseAction } from "../../../reducers/party/popup";
import HostBottomDialog from "./dialog/hostBottomDialog";
import MemberBottomDialog from "./dialog/memberBottomDialog";
import PartyDeleteConfirmDialog from "./dialog/partyDeleteConfirmDialog";
import ChoiceDialog from "../../../components/party/ChoiceDialog";

import PayDuck from "../../../assets/party/ic-popup-pay-duck.png";
import DeleteDuck from "../../../assets/party/ic-popup-delete-duck.png";
import InfoDuck from "../../../assets/party/ic-popup-info-duck.png";
import WaitingDuck from "../../../assets/party/ic-popup-waiting-duck.png";
import { priceToString } from "../../../components/main/bottomCard";
import DangerDialog from "../../../components/party/DangerDialog";
import OneButtonDialog from "../../../components/party/OneButtonDialog";
import { UpdatePartyAction } from "../../../reducers/party/detail";

const MyPartyDetail = () => {

  // 테스트 코드
  let list = [];
  const [typeList, setTypeList] = useState([]);

  // Module
  const history = useHistory();
  const dispatch = useDispatch();
  const { idx } = useParams();

  //Context
  const { setPageTrans } = useContext(PageTransContext);

  // Local State
  const [partyIdx, setPartyIdx] = useState(0);
  const [payMonth, setPayMonth] = useState(0);
  const [payDay, setPayDay] = useState(0);

  const [partyTitle, setPartyTitle] = useState('');
  const [isHostUser, setIsHostUser] = useState('');
  const [openChatLink, setOpenChatLink] = useState('');
  const [roomStatus, setRoomStatus] = useState('');
  const [userStatus, setUserStatus] = useState(''); // 유저 상태값
  const [partyInfoObj, setPartyInfoObj] = useState({});
  const [platformInfoObj, setPlatformInfoObj] = useState({});
  const [membershipInfoObj, setMembershipInfoObj] = useState({});
  const [accountInfoObj, setAccountInfoObj] = useState({});
  const [bankAccountInfoObj, setBankAccountInfoObj] = useState({});
  const [userCardInfoObj, setUserCardInfoObj] = useState({});
  const [result, setResult] = useState({}); // 파티 상세정보 전체 데이터

  const [leftDay, setLeftDay] = useState(0); // 결제일 남은 일수

  const [regularFailPopupStatus, setRegularFailPopupStatus] = useState(false); //정기결제 실패 팝업 데이터
  const [regularFailConfirmPopupStatus, setRegularFailConfirmPopupStatus] = useState(false); //정기결제 실패 최종확인 팝업 데이터
  const [regularFailConfirmPopupTitle, setRegularFailConfirmPopupTitle] = useState(""); //정기결제 실패 최종확인 팝업 제목
  const [hostInfoPopupStatus, setHostInfoPopupStatus] = useState(false); //기존 파티장 정보 등록로직 처리
  const [userInfoBeforePopupStatus, setUserInfoBeforePopupStatus] = useState(false); //기존 파티원 로직 처리 (파티장이 정보 등록 전)
  const [userInfoPopupStatus, setUserInfoPopupStatus] = useState(false); //기존 파티원 로직 처리 (파티장이 정보 등록 후)
  const [deleteopupStatus, setDeletePopupStatus] = useState(false); //정말 해지하시겠습니까 팝업

  const [finishPopupStatus, setFinishPopupStatus] = useState(false); //최종확인 팝업 데이터
  const [finishPopupTitle, setFinishPopupTitle] = useState(false); //최종확인 팝업 제목
  const [finishPopupSubTitle, setFinishPopupSubTitle] = useState(false); //최종확인 팝업 내용

  // Lifecycle - Initial Logic
  useEffect(() => {
    // Bottom Nav 
    dispatch(BottomNavCloseAction);

    if (idx) {
      setPartyIdx(idx);
    } else {
      closePage();
    }

    // 배경색 LOGIC
    const userPlatform = checkMobile();
    if (userPlatform == 'ios') {
      //IOS 배경색 설정
      try {
        window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
      }
      catch (err) {
      }
    }
  }, []);

  useEffect(() => {

    setFinishPopupTitle("");
    setFinishPopupSubTitle("");
    setFinishPopupStatus(false);

    getPartyDetail();
  }, [partyIdx])

  useEffect(() => {
    if (isNotEmpty(membershipInfoObj)) {

      if (!membershipInfoObj.paymentCycleDate) return

      if (isHostUser === 'N') {
        if (!membershipInfoObj.nextPaymentDate) return
        setPayMonth(Number((membershipInfoObj.nextPaymentDate).split('-')[1]));
        setPayDay(Number((membershipInfoObj.nextPaymentDate).split('-')[2]));
      } else if (isHostUser === 'Y') {
        setPayMonth(Number((membershipInfoObj.paymentCycleDate).split('-')[1]));
        setPayDay(Number((membershipInfoObj.paymentCycleDate).split('-')[2]));
      }
    }
  }, [membershipInfoObj])

  useEffect(() => {
    list = [];

    console.log(partyInfoObj)
    if (partyInfoObj.currentUserCount && partyInfoObj.personnel) {
      const maxLength = partyInfoObj.personnel > 4 ? partyInfoObj.personnel : 4;

      for (let i = 0; i < partyInfoObj.personnel - partyInfoObj.currentUserCount; i++) list.push('대기중');
      for (let i = partyInfoObj.personnel; i !== maxLength; i++) list.push('-');
      setTypeList(list);
    }
  }, [partyInfoObj])

  // Function 
  const getPartyDetail = async () => {

    if (!partyIdx || partyIdx === 0) return
    // 파티 상세 조회 
    const partyDetailUri = `/party/${partyIdx}`;
    const partyDetailData = await customApiClient('get', partyDetailUri);

    // Server Error
    if (!partyDetailData) {
      setFinishPopupTitle("탈퇴 혹은 해지된 파티입니다");
      setFinishPopupSubTitle("해당 파티는 탈퇴 혹은 해지된 파티입니다.\n종료됨 파티탭을 확인해주세요.");
      setFinishPopupStatus(true);
      return
    };
    // Validation 
    if (partyDetailData.statusCode !== 200) {
      setFinishPopupTitle("탈퇴 혹은 해지된 파티입니다");
      setFinishPopupSubTitle("해당 파티는 탈퇴 혹은 해지된 파티입니다.\n종료됨 파티탭을 확인해주세요.");
      setFinishPopupStatus(true);
      return
    };
    console.log('API 호출 성공 :', partyDetailData);

    setResult(partyDetailData.result);
    setPartyTitle(partyDetailData.result.title);
    setIsHostUser(partyDetailData.result.isHostUser);
    setOpenChatLink(partyDetailData.result.openChatLink);
    setRoomStatus(partyDetailData.result.roomStatus);
    setUserStatus(partyDetailData.result.userStatus);
    setPlatformInfoObj(partyDetailData.result.platformInfo);
    setPartyInfoObj(partyDetailData.result.partyInfo);
    setMembershipInfoObj(partyDetailData.result.membershipInfo);
    setAccountInfoObj(partyDetailData.result.accountInfo);
    setBankAccountInfoObj(partyDetailData.result.bankAccountInfo);
    setUserCardInfoObj(partyDetailData.result.userCardInfo);

    //남은일수 계산
    if (partyDetailData.result.membershipInfo.paymentCycleDate) {
      const paymentCycleDate = partyDetailData.result.membershipInfo.paymentCycleDate;
      const now = new Date();

      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      const currentDay = now.getDate();

      const startDate = new Date(currentYear, currentMonth, currentDay);
      const endDate = new Date(parseInt(paymentCycleDate.substr(0, 4)), parseInt(paymentCycleDate.substr(5, 2)), parseInt(paymentCycleDate.substr(8, 2)));

      const dateDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

      setLeftDay(dateDiff);
    }

    //파티원 정기결제 실패로직 처리
    if (partyDetailData.result.userStatus === "PENDING") {
      setRegularFailPopupStatus(true);
      return
    }

    //기존 파티장 정보 등록로직 처리
    if (partyDetailData.result.isHostUser === "Y" &&
      !partyDetailData.result.membershipInfo.paymentCycleDate) {
      setHostInfoPopupStatus(true);
      return
    }

    //기존 파티원 로직 처리 (파티장이 정보 등록전)
    if (partyDetailData.result.isHostUser === "N" &&
      !partyDetailData.result.membershipInfo.paymentCycleDate) {
      setUserInfoBeforePopupStatus(true);
      return
    }

    //기존 파티원 로직 처리 (파티장이 정보 등록후)
    if (partyDetailData.result.isHostUser === "N" &&
      partyDetailData.result.membershipInfo.paymentCycleDate &&
      !partyDetailData.result.userCardInfo.cardNo) {
      setUserInfoPopupStatus(true);
      return
    }
  };

  const closePage = () => {
    // 뒤로 가기
    setPageTrans('trans toLeft');
    history.goBack();
  };

  const openBottomDialog = () => {
    isHostUser === 'Y' ?
      dispatch(HostBottomDialogOpenAction)
      :
      dispatch(MemberBottomDialogOpenAction)
  }
  // 오픈채팅방 링크 열기 Function 
  const onClickChatLink = () => window.open(openChatLink, '_blank');

  const isNotEmpty = (param) => Object.keys(param).length !== 0;

  const onDeleteParty = async () => {
    // 파티 삭제
    const partyDeleteUri = `/party/${partyIdx}?userRole=${isHostUser === 'Y' ? 'HOST' : 'USER'}`;
    const partyDeleteData = await customApiClient('delete', partyDeleteUri);

    // Server Error
    if (!partyDeleteData) { return };

    //파티 삭제/해지 예약 완료
    if (partyDeleteData.statusCode === 200) {
      if (isHostUser === 'Y') {
        setFinishPopupTitle("삭제 예약이 완료되었습니다.");
      }
      else {
        setFinishPopupTitle("해지 예약이 완료되었습니다.");
      }
      setFinishPopupSubTitle("해당 예약은 결제일 전이라면\n언제든 취소할 수 있습니다.");
    }
    //파티 삭제 완료
    else if (partyDeleteData.statusCode === 201) {
      setFinishPopupTitle("삭제가 완료되었습니다.");
      setFinishPopupSubTitle("종료된 파티는 내파티에서 확인 가능합니다.\n내파티를 확인해주세요!");
    }
    //파티 즉시 탈퇴 완료
    else if (partyDeleteData.statusCode === 201) {
      setFinishPopupTitle("탈퇴가 완료되었습니다.");
      setFinishPopupSubTitle("종료된 파티는 내파티에서 확인 가능합니다.\n내파티를 확인해주세요!");
    }
    // Validation
    else {
      alert(partyDeleteData.message);
      return
    }
    console.log('API 호출 성공 :', partyDeleteData);

    dispatch(PartyDeleteConfirmDialogCloseAction);
    setFinishPopupStatus(true);
  }

  const onDeletePartyCancel = async () => {
    // 파티 삭제 취소
    const partyDeleteCancelUri = `/party/${partyIdx}/revert?userRole=${isHostUser === 'Y' ? 'HOST' : 'USER'}`;
    const partyDeleteCancelData = await customApiClient('patch', partyDeleteCancelUri);

    // Server Error
    if (!partyDeleteCancelData) { return };

    // Validation 
    if (partyDeleteCancelData.statusCode !== 200) {
      alert(partyDeleteCancelData.message);
      return
    };
    console.log('API 호출 성공 :', partyDeleteCancelData);


    dispatch(PartyDeleteConfirmDialogCloseAction);

    const type = isHostUser === "Y" ? "삭제" : "해지";
    setFinishPopupTitle(`${type} 취소가 완료되었습니다.`);
    setFinishPopupSubTitle("다시 파티를 정상적으로\n이용하실 수 있습니다.");
    setFinishPopupStatus(true);
  }

  //정기결제 실패 - 재결제하기
  const handleClickRePay = () => {
    // 리덕스 설정
    dispatch(UpdatePartyAction({
      type: "PENDING",
      selectedPartyIdx: result.idx,
      selectedPartyTitle: result.title,
      selectedPartyOpenChatLink: result.openChatLink,
      selectedPartyRoomStatus: result.roomStatus,
      selectedPartyIsEnrolled: result.IsEnrolled,
      selectedPartyPlatformInfo: result.platformInfo,
      selectedPartyPartyInfo: result.partyInfo,
      selectedPartyMembershipInfo: result.membershipInfo,
    }))

    // 페이지 전환
    setPageTrans('trans toRight');
    history.push('/payment');
  }

  //정기결제 실패 - 해지하기 -> 정기결제 해지컨펌 팝업 띄우기
  const handleClickRePayDelete = () => {

    //아낀금액
    const savePrice = membershipInfoObj.originalPrice - membershipInfoObj.price;

    setRegularFailPopupStatus(false);
    setRegularFailConfirmPopupTitle(`지금 구독을 유지하면\n한달에 ${priceToString(savePrice)}원을 아낄 수 있어요!`);
    setRegularFailConfirmPopupStatus(true);
  }

  //기존 파티장 - 파티정보 등록하기
  const handleClickHostInfo = () => {
    alert("기존 파티장 - 파티정보 등록하기");
  }

  //기존 파티원 - 결제정보 등록하기
  const handleClickUserInfo = () => {
    // 리덕스 설정
    dispatch(UpdatePartyAction({
      type: "PASTUSER",
      selectedPartyIdx: result.idx,
      selectedPartyTitle: result.title,
      selectedPartyOpenChatLink: result.openChatLink,
      selectedPartyRoomStatus: result.roomStatus,
      selectedPartyIsEnrolled: result.isEnrolled,
      selectedPartyPlatformInfo: result.platformInfo,
      selectedPartyPartyInfo: result.partyInfo,
      selectedPartyMembershipInfo: result.membershipInfo,
    }))

    // 페이지 전환
    setPageTrans('trans toRight');
    history.push('/payment');
  }

  //해지하기 (기존파티원 동일 함수 사용) -> 해지컨펌 팝업 띄우기
  const handleClickDelete = () => {
    setUserInfoBeforePopupStatus(false);
    setUserInfoPopupStatus(false);
    setDeletePopupStatus(true);
  }

  //해지하기 팝업 취소 -> 이전 팝업 띄워주기
  const handleClickDeleteCancle = () => {
    setDeletePopupStatus(false);

    //기존 파티원 로직 처리 (파티장이 정보 등록전)
    if (result.isHostUser === "N" &&
      !result.membershipInfo.paymentCycleDate) {
      setUserInfoBeforePopupStatus(true);
      return
    }

    //기존 파티원 로직 처리 (파티장이 정보 등록후)
    if (result.isHostUser === "N" &&
      result.membershipInfo.paymentCycleDate &&
      !result.userCardInfo.cardNo) {
      setUserInfoPopupStatus(true);
      return
    }
  }

  //최종 해지 함수 -> API 실행
  const handleClickDeleteConfirm = async () => {
    // 파티 삭제
    const partyDeleteUri = `/party/${partyIdx}?userRole=USER`;
    const partyDeleteData = await customApiClient('delete', partyDeleteUri);

    // Server Error
    if (!partyDeleteData) { return };

    // Validation
    if (partyDeleteData.statusCode !== 202) { return alert(partyDeleteData.message) };
    console.log('API 호출 성공 :', partyDeleteData);

    setFinishPopupTitle("해지가 완료되었습니다.");
    setFinishPopupSubTitle("해지가 모두 완료되었습니다.\n해지된 데이터는 다시 조회할 수 없습니다.");
    setFinishPopupStatus(true);
  }

  // 정산계좌 변경하기
  const changeBankAccount = () => {
    setPageTrans('trans toRight');
    history.push('/party/detail/change/account');
  }
  // 결제수단 변경하기
  const changePaymentCard = () => {
    setPageTrans('trans toRight');
    history.push({
      pathname: '/party/detail/change/card',
      data: partyIdx
    });
  }

  //신고하기 팝업
  const handleClickReport = async () => {
    dispatch(MemberBottomDialogCloseAction);
    dispatch(ReportPopupOpenAction({
      reportPartyIdx: partyIdx
    }))
  }

  return (
    <div className="page">
      <HeaderWrap>
        <div id="back_link" onClick={closePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
          <img src={icon_back} alt="뒤로가기"></img>
        </div>
        <TextMiddle>파티 상세보기</TextMiddle>
        <div onClick={openBottomDialog} style={{ zIndex: "10", position: "absolute", right: '0', height: '100%', width: '4.375rem' }}>
          <img src={icon_more} alt="BottomDialog 띄우기" style={{ position: "absolute", top: "55%", right: "1.3125rem", transform: "translate(0,-55%)" }}></img>
        </div>
      </HeaderWrap>
      <MainWrap>
        {/* 파티 제목 컴포넌트 */}
        <TopContentWrap>
          <PartyTitleDiv
            title={partyTitle}
            info={platformInfoObj}
            isDetail={true}
            isUserReserved={userStatus === "RESERVED"}
            isPartyReserved={roomStatus === "RESERVED"}
            leftDay={leftDay} />
        </TopContentWrap>

        {/* 파티 정보 */}
        <PartyDetailSubWrap style={{ borderBottom: '0.5rem #f7f7f7 solid' }}>
          {/* 서브 타이틀 & 인원 수 */}
          <PartyDataTitleDiv>
            <PartyDetailSubtitleSpan>파티 정보</PartyDetailSubtitleSpan>
            <div className="memberCountBox">
              <img className="memberCountImg" src={icon_small_duck} alt="오리" />
              <div className="memberCountSpan spoqaBold">{partyInfoObj.personnel}명</div>
            </div>
          </PartyDataTitleDiv>
          {/* 참여인원 내용 */}
          {/* 수정필요!!!! */}
          <PartyDataContentWrap personnel={partyInfoObj.personnel}>
            {
              partyInfoObj.partyUsers && partyInfoObj.partyUsers.map((item, idx) => {
                return (
                  <CustomPartyListItem
                    name={item.name}
                    margin={partyInfoObj.personnel > 4 ? "0.9375rem" : "0"}
                    isHost={idx === 0 ? "Y" : "N"}
                    status={item.status}
                    isEnrollment={false}
                    key={item.userIdx} />
                )
              })
            }
            {
              typeList.map((item, idx) => {
                return (
                  <PartyDataListItem
                    type={item}
                    margin={partyInfoObj.personnel > 4 ? "0.9375rem" : "0"}
                    isEnrollment={false}
                    key={idx} />
                )
              })
            }
          </PartyDataContentWrap>
        </PartyDetailSubWrap>

        {/* 멤버십 정보 */}
        {membershipInfoObj.paymentCycleDate &&
          <PartyDetailSubWrap style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', borderBottom: '0.5rem #f7f7f7 solid' }}>
            {/* 서브타이틀 */}
            <div style={{ marginBottom: '0.625rem' }}>
              <PartyDetailSubtitleSpan>멤버십 정보</PartyDetailSubtitleSpan>
            </div>
            {/* 아낀금액 알려주기 */}
            <NoticeWrap style={{ marginBottom: '0.5313rem' }}>
              <div className="notice_sub_wrap align_center">
                <img className="notice_img" src={icon_notice_duck}></img>
                <div className="notice_text_div">
                  <span>파티를 이용하면 매달 </span>
                  <span className="notice_text_yellow">{priceToString(membershipInfoObj.originalPrice - membershipInfoObj.price)}원</span>
                  <span>을 아낄 수 있어요 ! </span>
                </div>
              </div>
            </NoticeWrap>
            {/* 파티 멤버십 정보 컴포넌트 */}
            <PartyMembershipDiv
              membershipInfo={membershipInfoObj}
              platformInfo={platformInfoObj}
              isDetail={true} />
          </PartyDetailSubWrap>
        }

        {/* 계정 정보 */}
        {
          (isNotEmpty(accountInfoObj) && accountInfoObj.accountId && accountInfoObj.accountPw) &&
          <PartyDetailSubWrap style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', borderBottom: '0.5rem #f7f7f7 solid' }} >
            {/* 서브타이틀 */}
            <div style={{ marginBottom: '1.25rem' }}>
              <PartyDetailSubtitleSpan>계정 정보</PartyDetailSubtitleSpan>
            </div>
            {/* 파티장은 계정변경, 파티원은 계정복사로 버튼 구성 */}
            <AccountInfoComponent
              isHostUser={isHostUser}
              accountInfo={accountInfoObj}
              partyIdx={partyIdx} />
          </PartyDetailSubWrap>
        }

        {/* 파티장은 정산정보, 파티원은 결제수단 */}
        <PartyDetailSubWrap style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          {/* 서브타이틀 */}
          <div style={{ marginBottom: '0.625rem' }}>
            <PartyDetailSubtitleSpan>{isHostUser === 'Y' ? '정산정보' : '결제수단'}</PartyDetailSubtitleSpan>
          </div>
          {/* 정산정보or결제수단 Notice Wrap */}
          <NoticeWrap style={{ marginBottom: '0.5rem' }}>
            <div className="notice_sub_wrap align_center">
              <div>
                <img className="notice_img" src={icon_notice_duck}></img>
              </div>
              <div className="notice_text_div">
                <span>다음 </span>
                <span>{isHostUser === 'Y' ? '정산' : '결제'}</span>
                <span>예정일은 </span>
                <span className="notice_text_yellow">{payMonth}월 {payDay}일</span>
                <span>입니다!</span><br />
                <span className="notice_text_yellow">
                  {
                    (membershipInfoObj.nextCalculatePrice || (membershipInfoObj.price && membershipInfoObj.commissionPrice)) &&
                      isHostUser === 'Y' ?
                      `${priceToString(membershipInfoObj.nextCalculatePrice || 0)}원이 정산` :
                      `${priceToString(membershipInfoObj.price + membershipInfoObj.commissionPrice)}원이 결제`
                  }
                </span>
                <span>될 예정이에요.</span>
              </div>
            </div>
          </NoticeWrap>
          {/* 정산정보or결제수단 Contents */}
          <PaymentContentsWrap>
            <div className="contents_div">
              <span className="contents_name">{isHostUser === 'Y' ? '정산' : '결제'}수단</span>
              <span className="contents_description">{isHostUser === 'Y' ? '계좌입금' : '신용/체크카드'}</span>
            </div>
            <div className="contents_div">
              <span className="contents_name">상세</span>
              <span className="contents_description">
                {
                  isHostUser === 'Y' ?
                    bankAccountInfoObj.bankName ?
                      bankAccountInfoObj.bankName + " " + bankAccountInfoObj.bankAccountNum
                      :
                      "없음"
                    :
                    userCardInfoObj.cardName ?
                      userCardInfoObj.cardName + " " + userCardInfoObj.cardNo
                      :
                      "없음"
                }
              </span>
            </div>
            <div onClick={isHostUser === 'Y' ? changeBankAccount : changePaymentCard} className="change_contents_btn">
              <span>{isHostUser === 'Y' ? "정산계좌" : "결제수단"} 변경하기</span>
            </div>
          </PaymentContentsWrap>

        </PartyDetailSubWrap>

        {/* 최하단 Yellow 버튼 */}
        <div style={{ margin: '1.25rem' }}>
          <BottomButton 
            clickFunc={onClickChatLink} 
            text={'오픈채팅방 열기'} 
            activeStatus={true}
            isBottomStatus={false} />
        </div>
      </MainWrap>

      <HostBottomDialog dataForRevise={result} roomStatus={roomStatus} partyIdx={partyIdx} />
      <MemberBottomDialog userStatus={userStatus} handleClickReport={handleClickReport} />
      <PartyDeleteConfirmDialog
        roomStatus={roomStatus}
        userStatus={userStatus}
        isHostUser={isHostUser}
        currentUserCount={partyInfoObj.currentUserCount || 0}
        clickDelete={onDeleteParty}
        clickCancel={onDeletePartyCancel}
        paymentCycleDate={membershipInfoObj.paymentCycleDate} />

      {/* 선택 다이얼로그 시작*/}

      {/* 파티원 정기결제 실패로직 처리 */}
      <ChoiceDialog
        openStatus={regularFailPopupStatus}
        imgUrl={PayDuck}
        imgWidth={"10.8875"}
        imgHeight={"7.775"}
        title={"정기결제가 아직 안됐어요."}
        subTitle={"해당 파티에 대한 정기결제가 아직 안됐어요.\n재결제 혹은 파티해지를 선택해주세요."}
        leftButtonText={"해지하기"}
        rightButtonText={"재결제하기"}
        onClickLeft={handleClickRePayDelete}
        onClickRight={handleClickRePay}
      />

      {/* 파티원 정기결제 실패 -> 해지하기 처리 */}
      <ChoiceDialog
        openStatus={regularFailConfirmPopupStatus}
        imgUrl={DeleteDuck}
        imgWidth={"8.1375"}
        imgHeight={"8.3125"}
        title={regularFailConfirmPopupTitle}
        subTitle={"해지시 즉시 해지가 되고,\n이전 데이터는 사라지게 됩니다."}
        leftButtonText={"구독 유지하기"}
        rightButtonText={"지금 해지"}
        onClickLeft={handleClickRePay}
        onClickRight={handleClickDeleteConfirm}
      />

      {/* 기존 파티장 정보 등록로직 처리 */}
      <ChoiceDialog
        openStatus={hostInfoPopupStatus}
        imgUrl={InfoDuck}
        imgWidth={"4.6375"}
        imgHeight={"7.1875"}
        title={"정산정보를 등록해주세요."}
        subTitle={"정보를 등록하지 않으면 신규 파티원을\n모집할 수 없어요."}
        leftButtonText={"다음에 하기"}
        rightButtonText={"등록하기"}
        onClickLeft={closePage}
        onClickRight={handleClickHostInfo}
      />

      {/* 기존 파티원 로직 처리 (파티장이 정보 등록 전) */}
      <ChoiceDialog
        openStatus={userInfoBeforePopupStatus}
        imgUrl={WaitingDuck}
        imgWidth={"5.8875"}
        imgHeight={"8.1875"}
        title={"파티장이 파티정보 등록하지않았을때"}
        subTitle={"내용 들어가야함 !!"}
        leftButtonText={"기다리기"}
        rightButtonText={"해지하기"}
        onClickLeft={closePage}
        onClickRight={handleClickDelete}
      />

      {/* 기존 파티원 로직 처리 (파티장이 정보 등록 후) */}
      <ChoiceDialog
        openStatus={userInfoPopupStatus}
        imgUrl={InfoDuck}
        imgWidth={"4.6375"}
        imgHeight={"7.1875"}
        title={"결제정보를 등록해주세요."}
        subTitle={"결제정보를 등록해야\n파티를 유지할 수 있어요."}
        leftButtonText={"해지하기"}
        rightButtonText={"등록하기"}
        onClickLeft={handleClickDelete}
        onClickRight={handleClickUserInfo}
      />

      {/* 탈퇴 컨펌 창 */}
      <DangerDialog
        openStatus={deleteopupStatus}
        title={"정말 해지하시겠습니까 ?"}
        subTitle={"내용 필요함"}
        leftButtonText={"취소"}
        rightButtonText={"확인"}
        onClickLeft={handleClickDeleteCancle}
        onClickRight={handleClickDeleteConfirm}
      />

      {/* 최종 확인 버튼 */}
      <OneButtonDialog
        openStatus={finishPopupStatus}
        title={finishPopupTitle}
        subTitle={finishPopupSubTitle}
        buttonText={"확인"}
        onClickConfirm={closePage}
      />
    </div>
  );
}

export default MyPartyDetail;

// Styled Components
const MainWrap = styled.div`
  /* 임시 border */
  /* border:1px solid red; */
  position:absolute;
  top:3.0625rem;
  left:0;
  right:0;
  bottom:0;

  overflow-y:scroll;

  padding-top: 0.875rem;

  background-color:#ffffff;
`;

const TopContentWrap = styled.div`
  border-bottom: 0.5rem #f7f7f7 solid;
  display: flex;
  padding: 0 1.25rem 1.2188rem;
`;

const PartyDataTitleDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  margin-bottom: 1.5rem;

  .memberCountBox {
    display: flex;
    margin-left: 0.2188rem;
    background-color: #ffca35;
    border-radius: 0.5rem;
    align-items: center;
    padding: 0.0625rem 0.3125rem 0.125rem 0.3125rem;
  }
  .memberCountImg {
    width: 0.6062rem;
    height: 0.6062rem;
    margin-right: 0.2rem;
  }
  .memberCountSpan {
    color: #ffffff;
    font-size: 0.5rem;
  }
`;

const PartyDataContentWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-left: 1.25rem;
  padding-right: ${props => props.personnel > 4 ? '0rem' : '1.25rem'};
  justify-content: space-between;
  overflow-x: auto;

`;

const PaymentContentsWrap = styled.div`
  border-radius: 0.4375rem;
  box-shadow: 0 0.1875rem 0.25rem 0 rgba(233, 233, 233, 0.38);
  background-color: #fff;

  padding: 1.25rem 1.1563rem 1.125rem 1.1875rem;

  .contents_div {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 0.8125rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  .contents_name {
    color: #313131;
  }
  .contents_description {
    color: #464646;
  }
  .change_contents_btn {
    color: #8b8b8b;
    font-size: 0.75rem;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    text-decoration: underline;
    text-align: end;
  }
`;