import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { checkMobile } from "../../../App";
import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_notice_duck from "../../../assets/icon-notice-duck.svg";
import icon_small_duck from "../../../assets/icon-partydetail-ducknumber.svg";
import icon_more from "../../../assets/icon-partydetail-more.svg";
import ic_partydetail_more from "../../../assets/party/detail/ic-partydetail-more.png";
import DeleteDuck from "../../../assets/party/ic-popup-delete-duck.png";
import InfoDuck from "../../../assets/party/ic-popup-info-duck.png";
import PayDuck from "../../../assets/party/ic-popup-pay-duck.png";
import WaitingDuck from "../../../assets/party/ic-popup-waiting-duck.png";
import { priceToString } from "../../../components/main/bottomCard";
import BottomButton from "../../../components/party/BottomButton";
import ChoiceDialog from "../../../components/party/ChoiceDialog";
import DangerDialog from "../../../components/party/DangerDialog";
import OneButtonDialog from "../../../components/party/OneButtonDialog";
import PartyCalculateDetail from "../../../components/party/PartyCalculateDetail";
import PartyDataListItem, { CustomPartyListItem } from "../../../components/party/PartyList";
import PartyMembershipDiv from "../../../components/party/PartyMembershipDiv";
import PartyTitleDiv from "../../../components/party/PartyTitleDiv";
import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import { AnalyPageReloadTrueAction } from "../../../reducers/main/analysis";
import { SubscribeReloadTrueAction } from "../../../reducers/main/subscribe";
import { ResetParty, UpdatePartyAction } from "../../../reducers/party/detail";
import { UpdatePartyInfoAction } from "../../../reducers/party/enrollment/partyInfo";
import { UpdatePaymentAction } from "../../../reducers/party/enrollment/payment";
import { UpdatePlatformAction } from "../../../reducers/party/enrollment/platform";
import {
  HostBottomDialogCloseAction, HostBottomDialogOpenAction,
  MemberBottomDialogCloseAction, MemberBottomDialogOpenAction,
  PartyDeleteConfirmDialogCloseAction,
  ReportPopupOpenAction
} from "../../../reducers/party/popup";
import { customApiClient } from "../../../shared/apiClient";
import { TextMiddle } from "../../../styled/shared";
import { PartyDetailSubtitleSpan } from "../../../styled/shared/text";
import {
  HeaderWrap,
  NoticeWrap,
  PartyDetailSubWrap
} from "../../../styled/shared/wrap";
import AccountInfoComponent from "./accountInfoComponent";
import HostBottomDialog from "./dialog/HostBottomDialog";
import MemberBottomDialog from "./dialog/MemberBottomDialog";
import PartyDeleteConfirmDialog from "./dialog/PartyDeleteConfirmDialog";


const MyPartyDetail = ({ location }) => {

  let list = [];
  const [typeList, setTypeList] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const { idx } = useParams();

  const { setPageTrans } = useContext(PageTransContext);

  const [partyIdx, setPartyIdx] = useState(0);
  const [payMonth, setPayMonth] = useState(0);
  const [payDay, setPayDay] = useState(0);

  const [partyTitle, setPartyTitle] = useState("");
  const [isHostUser, setIsHostUser] = useState("");
  const [openChatLink, setOpenChatLink] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [partyInfoObj, setPartyInfoObj] = useState({});
  const [platformInfoObj, setPlatformInfoObj] = useState({});
  const [membershipInfoObj, setMembershipInfoObj] = useState({});
  const [accountInfoObj, setAccountInfoObj] = useState({});
  const [bankAccountInfoObj, setBankAccountInfoObj] = useState({});
  const [userCardInfoObj, setUserCardInfoObj] = useState({});
  const [result, setResult] = useState({});

  const [leftDay, setLeftDay] = useState(0);

  const [regularFailPopupStatus, setRegularFailPopupStatus] = useState(false);
  const [regularFailConfirmPopupStatus, setRegularFailConfirmPopupStatus] =
    useState(false);
  const [regularFailConfirmPopupTitle, setRegularFailConfirmPopupTitle] =
    useState("");
  const [hostInfoPopupStatus, setHostInfoPopupStatus] = useState(false);
  const [userInfoBeforePopupStatus, setUserInfoBeforePopupStatus] =
    useState(false);
  const [userInfoPopupStatus, setUserInfoPopupStatus] = useState(false);
  const [deletePopupStatus, setDeletePopupStatus] = useState(false);

  const [finishPopupStatus, setFinishPopupStatus] = useState(false);
  const [finishPopupTitle, setFinishPopupTitle] = useState(false);
  const [finishPopupSubTitle, setFinishPopupSubTitle] = useState(false);

  const [calculateDetail, setCalculateDetail] = useState({});
  const [calculateDetailStatus, setCalculateDetailStatus] = useState(false);


  useEffect(() => {

    dispatch(BottomNavCloseAction);

    if (idx) {
      setPartyIdx(idx);
    } else {
      closePage();
    }


    const userPlatform = checkMobile();
    if (userPlatform == "ios") {

      try {
        window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
      } catch (err) { }
    }
  }, []);

  useEffect(() => {
    setFinishPopupTitle("");
    setFinishPopupSubTitle("");
    setFinishPopupStatus(false);

    getPartyDetail();
  }, [partyIdx]);

  useEffect(() => {
    if (isNotEmpty(membershipInfoObj)) {
      if (!membershipInfoObj.paymentCycleDate) return;

      if (isHostUser === "N") {
        if (!membershipInfoObj.nextPaymentDate) return;
        setPayMonth(Number(membershipInfoObj.nextPaymentDate.split("-")[1]));
        setPayDay(Number(membershipInfoObj.nextPaymentDate.split("-")[2]));
      } else if (isHostUser === "Y") {
        setPayMonth(Number(membershipInfoObj.paymentCycleDate.split("-")[1]));
        setPayDay(Number(membershipInfoObj.paymentCycleDate.split("-")[2]));
      }
    }
  }, [membershipInfoObj]);

  useEffect(() => {
    list = [];

    if (partyInfoObj.currentUserCount && partyInfoObj.personnel) {
      const maxLength = partyInfoObj.personnel > 4 ? partyInfoObj.personnel : 4;

      for (
        let i = 0;
        i < partyInfoObj.personnel - partyInfoObj.currentUserCount;
        i++
      )
        list.push("대기중");
      for (let i = partyInfoObj.personnel; i !== maxLength; i++) list.push("-");
      setTypeList(list);
    }
  }, [partyInfoObj]);


  const getPartyDetail = async () => {
    if (!partyIdx || partyIdx === 0) return;

    const partyDetailUri = `/party/${partyIdx}`;
    const partyDetailData = await customApiClient("get", partyDetailUri);


    if (!partyDetailData) {
      setFinishPopupTitle("탈퇴 혹은 해지된 파티입니다");
      setFinishPopupSubTitle(
        "해당 파티는 탈퇴 혹은 해지된 파티입니다.\n종료됨 파티탭을 확인해주세요."
      );
      setFinishPopupStatus(true);
      return;
    }

    if (partyDetailData.statusCode !== 200) {
      setFinishPopupTitle("탈퇴 혹은 해지된 파티입니다");
      setFinishPopupSubTitle(
        "해당 파티는 탈퇴 혹은 해지된 파티입니다.\n종료됨 파티탭을 확인해주세요."
      );
      setFinishPopupStatus(true);
      return;
    }

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


    if (partyDetailData.result.membershipInfo.paymentCycleDate) {
      const paymentCycleDate =
        partyDetailData.result.membershipInfo.paymentCycleDate;
      const now = new Date();

      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      const currentDay = now.getDate();

      const startDate = new Date(currentYear, currentMonth, currentDay);
      const endDate = new Date(
        parseInt(paymentCycleDate.substr(0, 4)),
        parseInt(paymentCycleDate.substr(5, 2)),
        parseInt(paymentCycleDate.substr(8, 2))
      );

      const dateDiff =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

      setLeftDay(dateDiff);
    }


    if (partyDetailData.result.userStatus === "PENDING") {
      setRegularFailPopupStatus(true);
      return;
    }


    if (
      partyDetailData.result.isHostUser === "Y" &&
      !partyDetailData.result.membershipInfo.paymentCycleDate
    ) {
      setHostInfoPopupStatus(true);
      return;
    }


    if (
      partyDetailData.result.isHostUser === "N" &&
      !partyDetailData.result.membershipInfo.paymentCycleDate
    ) {
      setUserInfoBeforePopupStatus(true);
      return;
    }


    if (
      partyDetailData.result.isHostUser === "N" &&
      partyDetailData.result.membershipInfo.paymentCycleDate &&
      !partyDetailData.result.userCardInfo.cardNo
    ) {
      setUserInfoPopupStatus(true);
      return;
    }
  };

  const closePage = () => {

    setRegularFailPopupStatus(false);
    setRegularFailConfirmPopupStatus(false);
    setHostInfoPopupStatus(false);
    setUserInfoBeforePopupStatus(false);
    setUserInfoPopupStatus(false);
    setDeletePopupStatus(false);
    setFinishPopupStatus(false);

    dispatch(HostBottomDialogCloseAction);
    dispatch(MemberBottomDialogCloseAction);
    dispatch(PartyDeleteConfirmDialogCloseAction);

    dispatch({ type: ResetParty });


    setPageTrans("trans toLeft");

    if (location.props && location.props.isFinish === true) {
      history.push("/party");
    } else {
      history.goBack();
    }
  };

  const openBottomDialog = () => {
    isHostUser === "Y"
      ? dispatch(HostBottomDialogOpenAction)
      : dispatch(MemberBottomDialogOpenAction);
  };

  const onClickChatLink = () => window.open(openChatLink, "_blank");

  const isNotEmpty = (param) => Object.keys(param).length !== 0;

  const onDeleteParty = async () => {

    const partyDeleteUri = `/party/${partyIdx}?userRole=${
      isHostUser === "Y" ? "HOST" : "USER"
      }`;
    const partyDeleteData = await customApiClient("delete", partyDeleteUri);


    if (!partyDeleteData) {
      return;
    }


    if (partyDeleteData.statusCode === 200) {
      if (isHostUser === "Y") {
        setFinishPopupTitle("삭제 예약이 완료되었습니다.");
      } else {
        setFinishPopupTitle("해지 예약이 완료되었습니다.");
      }
      setFinishPopupSubTitle(
        "해당 예약은 결제일 전이라면\n언제든 취소할 수 있습니다."
      );
    }

    else if (partyDeleteData.statusCode === 201) {
      setFinishPopupTitle("삭제가 완료되었습니다.");
      setFinishPopupSubTitle(
        "종료된 파티는 내파티에서 확인 가능합니다.\n내파티를 확인해주세요!"
      );
    }

    else if (partyDeleteData.statusCode === 201) {
      setFinishPopupTitle("탈퇴가 완료되었습니다.");
      setFinishPopupSubTitle(
        "종료된 파티는 내파티에서 확인 가능합니다.\n내파티를 확인해주세요!"
      );
    }

    else {
      alert(partyDeleteData.message);
      return;
    }

    dispatch(PartyDeleteConfirmDialogCloseAction);
    setFinishPopupStatus(true);


    dispatch(AnalyPageReloadTrueAction);
    dispatch(SubscribeReloadTrueAction);
  };

  const onDeletePartyCancel = async () => {

    const partyDeleteCancelUri = `/party/${partyIdx}/revert?userRole=${
      isHostUser === "Y" ? "HOST" : "USER"
      }`;
    const partyDeleteCancelData = await customApiClient(
      "patch",
      partyDeleteCancelUri
    );


    if (!partyDeleteCancelData) {
      return;
    }


    if (partyDeleteCancelData.statusCode !== 200) {
      alert(partyDeleteCancelData.message);
      return;
    }

    dispatch(PartyDeleteConfirmDialogCloseAction);

    const type = isHostUser === "Y" ? "삭제" : "해지";
    setFinishPopupTitle(`${type} 취소가 완료되었습니다.`);
    setFinishPopupSubTitle("다시 파티를 정상적으로\n이용하실 수 있습니다.");
    setFinishPopupStatus(true);


    dispatch(AnalyPageReloadTrueAction);
    dispatch(SubscribeReloadTrueAction);
  };

  const handleClickCalculateDetail = () => {
    setCalculateDetailStatus(!calculateDetailStatus);
  }


  const handleClickRePay = () => {

    dispatch(
      UpdatePartyAction({
        type: "PENDING",
        selectedPartyIdx: result.idx,
        selectedPartyTitle: result.title,
        selectedPartyOpenChatLink: result.openChatLink,
        selectedPartyRoomStatus: result.roomStatus,
        selectedPartyIsEnrolled: result.isEnrolled,
        selectedPartyPlatformInfo: result.platformInfo,
        selectedPartyPartyInfo: result.partyInfo,
        selectedPartyMembershipInfo: result.membershipInfo,
      })
    );

    const isAuth = localStorage.getItem("isAuth");

    if (isAuth !== "Y") {
      sessionStorage.setItem("pastPath", "/party/my");
      setPageTrans('trans toRight');
      history.push("/realName/auth?path=/payment");
      return
    }


    setPageTrans("trans toRight");
    history.push("/payment");
  };

  const handleClickRePayDelete = () => {

    const savePrice = membershipInfoObj.originalPrice - membershipInfoObj.price;

    setRegularFailPopupStatus(false);
    setRegularFailConfirmPopupTitle(
      `지금 구독을 유지하면\n한달에 ${priceToString(
        savePrice
      )}원을 아낄 수 있어요!`
    );
    setRegularFailConfirmPopupStatus(true);
  };


  const handleClickHostInfo = () => {


    dispatch(UpdatePlatformAction({
      selectedPlatformIdx: platformInfoObj.registerType === "SERVER" ? platformInfoObj.platformIdx : 0,
      selectedPlatformName: platformInfoObj.registerType === "SERVER" ? platformInfoObj.serverName : platformInfoObj.customName,
      selectedPlatformCategoryIdx: platformInfoObj.registerType === "SERVER" ? platformInfoObj.serverCategoryIdx : platformInfoObj.customCategoryIdx,
      selectedPlatformCatgoryName: platformInfoObj.registerType === "SERVER" ? platformInfoObj.serverCategory : platformInfoObj.customCategory,
      selectedPlatformImgUrl: platformInfoObj.serverImgUrl,
      selectedPlatformImgColor: platformInfoObj.color,
      selectedPlatformImgInitial: platformInfoObj.initial,
      isAccount: platformInfoObj.isAccount,
      isAdult: platformInfoObj.isAdult,
    }))


    dispatch(UpdatePartyInfoAction({
      title: partyTitle,
      membership: membershipInfoObj.membership,
      openChatLink: openChatLink
    }));


    dispatch(UpdatePaymentAction({
      originalPrice: null,
      nextPaymentDate: null,
      pricePerPerson: membershipInfoObj.price,
      personnel: partyInfoObj.personnel,
      typeList: null,
      formatDate: null
    }))

    const isAuth = localStorage.getItem("isAuth");

    if (isAuth !== "Y") {
      sessionStorage.setItem("pastPath", "/party/my");
      setPageTrans('trans toRight');
      history.push(`/realName/auth?path=/party/enroll/${result.idx}`);
      return
    }


    setPageTrans('trans toRight');
    history.push(`/party/enroll/${result.idx}`);
  }


  const handleClickUserInfo = () => {

    dispatch(
      UpdatePartyAction({
        type: "PASTUSER",
        selectedPartyIdx: result.idx,
        selectedPartyTitle: result.title,
        selectedPartyOpenChatLink: result.openChatLink,
        selectedPartyRoomStatus: result.roomStatus,
        selectedPartyIsEnrolled: result.isEnrolled,
        selectedPartyPlatformInfo: result.platformInfo,
        selectedPartyPartyInfo: result.partyInfo,
        selectedPartyMembershipInfo: result.membershipInfo,
      })
    );


    setPageTrans("trans toRight");
    history.push("/payment");
  };


  const handleClickDelete = () => {
    setUserInfoBeforePopupStatus(false);
    setUserInfoPopupStatus(false);
    setDeletePopupStatus(true);
  };


  const handleClickDeleteCancle = () => {
    setDeletePopupStatus(false);


    if (result.isHostUser === "N" && !result.membershipInfo.paymentCycleDate) {
      setUserInfoBeforePopupStatus(true);
      return;
    }


    if (
      result.isHostUser === "N" &&
      result.membershipInfo.paymentCycleDate &&
      !result.userCardInfo.cardNo
    ) {
      setUserInfoPopupStatus(true);
      return;
    }



    if (result.isHostUser === "Y" &&
      !result.membershipInfo.paymentCycleDate) {
      setHostInfoPopupStatus(true);
      return
    }
  }

  const handleClickPartyDelete = () => {
    setHostInfoPopupStatus(false);
    setDeletePopupStatus(true);
  }


  const handleClickDeleteConfirm = async () => {

    const userRole = result.isHostUser === "Y" ? "HOST" : "USER";
    const message = result.isHostUser === "Y" ? "삭제" : "해지";


    const partyDeleteUri = `/party/${partyIdx}?userRole=${userRole}`;
    const partyDeleteData = await customApiClient('delete', partyDeleteUri);


    if (!partyDeleteData) {
      return;
    }


    if (partyDeleteData.statusCode !== 201 && partyDeleteData.statusCode !== 202) { return alert(partyDeleteData.message) };

    setFinishPopupTitle(`${message}가 완료되었습니다.`);
    setFinishPopupSubTitle(`${message}가 모두 완료되었습니다.\n${message}된 데이터는 다시 조회할 수 없습니다.`);
    setRegularFailConfirmPopupStatus(false);
    setDeletePopupStatus(false);
    setFinishPopupStatus(true);


    dispatch(AnalyPageReloadTrueAction);
    dispatch(SubscribeReloadTrueAction);
  };


  const changeBankAccount = ({ partyIdx }) => {
    setPageTrans("trans toRight");
    history.push(`/party/${partyIdx}/detail/change/account`);
  };


  const changePaymentCard = ({ partyIdx }) => {
    setPageTrans("trans toRight");
    history.push(`/party/${partyIdx}/detail/change/card`);
  };


  const handleClickReport = async () => {
    dispatch(MemberBottomDialogCloseAction);
    dispatch(
      ReportPopupOpenAction({
        reportPartyIdx: partyIdx,
      })
    );
  };


  const onClickEnrollAccount = () => {
    setPageTrans("trans toRight");
    history.push({
      pathname: '/party/my/detail/account',
      state: {
        idx: partyIdx,
        id: ''
      }
    });
  }

  return (
    <div className="page">
      <HeaderWrap>
        <div
          id="back_link"
          onClick={closePage}
          style={{
            zIndex: "10",
            position: "absolute",
            top: "55%",
            left: "1.25rem",
            transform: "translate(0,-55%)",
          }}
        >
          <img src={icon_back} alt="뒤로가기"></img>
        </div>
        <TextMiddle>파티 상세보기</TextMiddle>
        <div
          onClick={openBottomDialog}
          style={{
            zIndex: "10",
            position: "absolute",
            right: "0",
            height: "100%",
            width: "4.375rem",
          }}
        >
          <img
            src={icon_more}
            alt="BottomDialog 띄우기"
            style={{
              position: "absolute",
              top: "55%",
              right: "1.3125rem",
              transform: "translate(0,-55%)",
            }}
          ></img>
        </div>
      </HeaderWrap>
      <MainWrap>

        <TopContentWrap>
          <PartyTitleDiv
            title={partyTitle}
            info={platformInfoObj}
            isDetail={true}
            isUserReserved={userStatus === "RESERVED"}
            isPartyReserved={roomStatus === "RESERVED"}
            leftDay={leftDay}
          />
        </TopContentWrap>


        <PartyDetailSubWrap style={{ borderBottom: "0.5rem #f7f7f7 solid" }}>

          <PartyDataTitleDiv>
            <PartyDetailSubtitleSpan>파티 정보</PartyDetailSubtitleSpan>
            <div className="memberCountBox">
              <img
                className="memberCountImg"
                src={icon_small_duck}
                alt="오리"
              />
              <div className="memberCountSpan spoqaBold">
                {partyInfoObj.personnel}명
              </div>
            </div>
          </PartyDataTitleDiv>

          <PartyDataContentWrap personnel={partyInfoObj.personnel}>
            {partyInfoObj.partyUsers &&
              partyInfoObj.partyUsers.map((item, idx) => {
                return (
                  <CustomPartyListItem
                    name={item.name}
                    margin={partyInfoObj.personnel > 4 ? "0.9375rem" : "0"}
                    isHost={idx === 0 ? "Y" : "N"}
                    status={item.status}
                    isEnrollment={false}
                    key={item.userIdx}
                  />
                );
              })}
            {typeList.map((item, idx) => {
              return (
                <PartyDataListItem
                  type={item}
                  margin={partyInfoObj.personnel > 4 ? "0.9375rem" : "0"}
                  isEnrollment={false}
                  key={idx}
                />
              );
            })}
          </PartyDataContentWrap>
        </PartyDetailSubWrap>


        {membershipInfoObj.paymentCycleDate && (
          <PartyDetailSubWrap
            style={{
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              borderBottom: "0.5rem #f7f7f7 solid",
            }}
          >

            <div style={{ marginBottom: "0.625rem" }}>
              <PartyDetailSubtitleSpan>멤버십 정보</PartyDetailSubtitleSpan>
            </div>

            <NoticeWrap style={{ marginBottom: "0.5313rem" }}>
              <div className="notice_sub_wrap align_center">
                <img className="notice_img" src={icon_notice_duck}></img>
                <div className="notice_text_div">
                  <span>파티를 이용하면 매달 </span>
                  <span className="notice_text_yellow">
                    {isHostUser === 'Y' ? priceToString(
                      membershipInfoObj.price * (partyInfoObj.personnel - 1)
                    ) : priceToString(
                      membershipInfoObj.originalPrice - membershipInfoObj.price
                    )}
                    원
                  </span>
                  <span>을 아낄 수 있어요 ! </span>
                </div>
              </div>
            </NoticeWrap>

            <PartyMembershipDiv
              membershipInfo={membershipInfoObj}
              platformInfo={platformInfoObj}
              isDetail={true}
            />
          </PartyDetailSubWrap>
        )}


        {
          (isHostUser === 'Y' || (accountInfoObj.accountId && accountInfoObj.accountPw)) &&
          <PartyDetailSubWrap style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', borderBottom: '0.5rem #f7f7f7 solid' }} >
            {/* 서브타이틀 */}
            <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
              <PartyDetailSubtitleSpan>계정 정보</PartyDetailSubtitleSpan>
              {
                isHostUser === 'Y' && !(accountInfoObj.accountId && accountInfoObj.accountPw) &&
                <div onClick={onClickEnrollAccount} style={{ position: "absolute", top: "0", right: "0", display: "flex", padding: "0.1875rem" }}>
                  <div className="notoMedium" style={{ marginRight: "0.25rem", fontSize: "0.75rem", color: "#939393", lineHeight: "1.125rem" }}>계정정보 등록</div>
                  <div>
                    <img style={{ width: "0.6875rem", height: "0.6875rem" }} src={ic_partydetail_more} alt="ic_partydetail_more" />
                  </div>
                </div>
              }
            </div>
            {/* 파티장은 계정변경, 파티원은 계정복사로 버튼 구성 */}
            <AccountInfoComponent
              isHostUser={isHostUser}
              accountInfo={accountInfoObj}
              partyIdx={partyIdx} />
          </PartyDetailSubWrap>
        }


        <PartyDetailSubWrap
          style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem" }}
        >

          <div style={{ position: "relative", marginBottom: '0.625rem' }}>
            <PartyDetailSubtitleSpan>{isHostUser === 'Y' ? '정산정보' : '결제수단'}</PartyDetailSubtitleSpan>
            {
              isHostUser === 'Y' &&
              <div onClick={handleClickCalculateDetail} style={{ position: "absolute", top: "0", right: "0", display: "flex", padding: "0.1875rem" }}>
                <div className="notoMedium" style={{ marginRight: "0.25rem", fontSize: "0.75rem", color: "#939393", lineHeight: "1.125rem" }}>자세히 보기</div>
                <div>
                  <img style={{ width: "0.6875rem", height: "0.6875rem" }} src={ic_partydetail_more} alt="ic_partydetail_more" />
                </div>
              </div>
            }
          </div>

          <NoticeWrap style={{ marginBottom: "0.5rem" }}>
            <div className="notice_sub_wrap">
              <div>
                <img
                  className="notice_img mutiple_line_margin"
                  src={icon_notice_duck}
                ></img>
              </div>
              <div className="notice_text_div">
                <span>다음 </span>
                <span>{isHostUser === "Y" ? "정산" : "결제"}</span>
                <span>예정일은 </span>
                <span className="notice_text_yellow">
                  {payMonth}월 {payDay}일
                </span>
                <span>입니다!</span>
                <br />
                <span className="notice_text_yellow">
                  {(membershipInfoObj.nextCalculatePrice ||
                    (membershipInfoObj.price &&
                      membershipInfoObj.commissionPrice)) &&
                    isHostUser === "Y"
                    ? `${priceToString(
                      membershipInfoObj.nextCalculatePrice || 0
                    )}원이 정산`
                    : `${priceToString(
                      membershipInfoObj.price +
                      membershipInfoObj.commissionPrice
                    )}원이 결제`}
                </span>
                <span>될 예정이에요.</span>
              </div>
            </div>
          </NoticeWrap>

          <PaymentContentsWrap>
            <div className="contents_div">
              <span className="contents_name">
                {isHostUser === "Y" ? "정산" : "결제"}수단
              </span>
              <span className="contents_description">
                {isHostUser === "Y" ? "계좌입금" : "신용/체크카드"}
              </span>
            </div>
            <div className="contents_div">
              <span className="contents_name">상세</span>
              <span className="contents_description">
                {isHostUser === "Y"
                  ? bankAccountInfoObj.bankName
                    ? bankAccountInfoObj.bankName +
                    " " +
                    bankAccountInfoObj.bankAccountNum
                    : "없음"
                  : userCardInfoObj.cardName
                    ? userCardInfoObj.cardName + " " + userCardInfoObj.cardNo
                    : "없음"}
              </span>
            </div>
            <div
              onClick={
                isHostUser === "Y" ? () => changeBankAccount({ partyIdx }) : () => changePaymentCard({ partyIdx })
              }
              className="change_contents_btn"
            >
              <span>
                {isHostUser === "Y" ? "정산계좌" : "결제수단"} 변경하기
              </span>
            </div>
          </PaymentContentsWrap>
        </PartyDetailSubWrap>


        <div style={{ margin: "1.25rem" }}>
          <BottomButton
            clickFunc={onClickChatLink}
            text={"오픈채팅방 열기"}
            activeStatus={true}
            isBottomStatus={false}
          />
        </div>
      </MainWrap>


      <PartyCalculateDetail
        openStatus={calculateDetailStatus}
        closeFunc={handleClickCalculateDetail}
        nextCalculatePrice={membershipInfoObj.nextCalculatePrice}
        nextCalculateDetail={membershipInfoObj.nextCalculateDetail}
      />

      <HostBottomDialog dataForRevise={result} roomStatus={roomStatus} partyIdx={partyIdx} />
      <MemberBottomDialog userStatus={userStatus} handleClickReport={handleClickReport} />
      <PartyDeleteConfirmDialog
        roomStatus={roomStatus}
        userStatus={userStatus}
        isHostUser={isHostUser}
        currentUserCount={partyInfoObj.currentUserCount || 0}
        clickDelete={onDeleteParty}
        clickCancel={onDeletePartyCancel}
        paymentCycleDate={membershipInfoObj.paymentCycleDate}
      />


      <ChoiceDialog
        openStatus={regularFailPopupStatus}
        imgUrl={PayDuck}
        imgWidth={"10.8875"}
        imgHeight={"7.775"}
        title={"정기결제가 아직 안됐어요."}
        subTitle={
          "해당 파티에 대한 정기결제가 아직 안됐어요.\n재결제 혹은 파티해지를 선택해주세요."
        }
        leftButtonText={"해지하기"}
        rightButtonText={"재결제하기"}
        onClickLeft={handleClickRePayDelete}
        onClickRight={handleClickRePay}
      />


      <ChoiceDialog
        openStatus={regularFailConfirmPopupStatus}
        imgUrl={DeleteDuck}
        imgWidth={"8.1375"}
        imgHeight={"8.3125"}
        title={regularFailConfirmPopupTitle}
        subTitle={"해지시 즉시 해지가 되고,\n이전 데이터는 사라지게 되어요."}
        leftButtonText={"구독 유지하기"}
        rightButtonText={"지금 해지"}
        onClickLeft={handleClickRePay}
        onClickRight={handleClickDeleteConfirm}
      />


      <ChoiceDialog
        openStatus={hostInfoPopupStatus}
        imgUrl={InfoDuck}
        imgWidth={"4.6375"}
        imgHeight={"7.1875"}
        title={"정산정보를 등록해주세요."}
        subTitle={"정보를 등록하지 않으면 신규 파티원을\n모집할 수 없어요."}
        leftButtonText={"삭제하기"}
        rightButtonText={"등록하기"}
        onClickLeft={handleClickPartyDelete}
        onClickRight={handleClickHostInfo}
      />


      <ChoiceDialog
        openStatus={userInfoBeforePopupStatus}
        imgUrl={WaitingDuck}
        imgWidth={"5.8875"}
        imgHeight={"8.1875"}
        title={"정산 정보가 아직 없어요."}
        subTitle={"파티장이 먼저 정산 정보를 등록해야\n결제정보를 입력할 수 있어요.\n파티장에게 등록 요청을 해주세요."}
        leftButtonText={"기다리기"}
        rightButtonText={"해지하기"}
        onClickLeft={closePage}
        onClickRight={handleClickDelete}
      />


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


      <DangerDialog
        openStatus={deletePopupStatus}
        title={result.isHostUser === "Y" ? "정말 삭제하시겠어요?" : "정말 해지하시겠어요?"}
        subTitle={result.isHostUser === "Y" ? "삭제시 즉시 삭제가 되고,\n이전 데이터는 사라지게 되어요." : "해지시 즉시 해지가 되고,\n이전 데이터는 사라지게 되어요."}
        leftButtonText={"취소"}
        rightButtonText={"확인"}
        onClickLeft={handleClickDeleteCancle}
        onClickRight={handleClickDeleteConfirm}
      />


      <OneButtonDialog
        openStatus={finishPopupStatus}
        title={finishPopupTitle}
        subTitle={finishPopupSubTitle}
        buttonText={"확인"}
        onClickConfirm={closePage}
      />
    </div>
  );
};

export default MyPartyDetail;


const MainWrap = styled.div`

  position: absolute;
  top: 3.0625rem;
  left: 0;
  right: 0;
  bottom: 0;

  overflow-y: scroll;

  padding-top: 0.875rem;

  background-color: #ffffff;
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
    font-size: 0.625rem;
  }
`;

const PartyDataContentWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-left: 1.25rem;
  padding-right: ${(props) => (props.personnel > 4 ? "0rem" : "1.25rem")};
  justify-content: space-between;
  overflow-x: auto;
`;

const PaymentContentsWrap = styled.div`
  border-radius: 0.4375rem;
  box-shadow: 0 0.1875rem 0.25rem 0 rgba(233, 233, 233, 0.38);
  background-color: #fff;

  padding: 1.25rem 1.1563rem 1.125rem 1.1875rem;

  .contents_div {
    font-family: "Noto Sans KR";
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
    font-family: "Noto Sans KR";
    font-weight: 500;
    text-decoration: underline;
    text-align: end;
  }
`;
