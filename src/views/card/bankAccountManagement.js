import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PageTransContext } from "../../containers/pageTransContext";
import { ContentWrap, HeaderWrap, PageWrap } from "../../styled/shared/wrap";
import { TextMiddle } from "../../styled/shared";
import { customApiClient } from "../../shared/apiClient";
import { BottomNavCloseAction } from "../../reducers/container/bottomNav";
import { AddButton, CardWrap } from "./cardManagement";

import icon_back from "../../assets/icon-back-arrow.svg";
import blank_duck from "../../assets/ic_cardadmin_duck@2x.png"
import BankComponent from "./bankComponent";
import DangerDialog from "../../components/party/DangerDialog";
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from "../../reducers/container/message";
import LoadingBox from "../../components/LoadingBox";

const BankAccountManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //state
  const [cardData, setCardData] = useState([]);

  //로딩 스테이트
  const [loading, setLoading] = useState(true);

  //삭제 팝업
  const [deletePopupStatus, setDeletePopupStatus] = useState(false);
  //삭제 선택한 account idx
  const [deleteAccountIdx, setDeleteAccountIdx] = useState(-1);

  const closePage = () => {
    setPageTrans("trans toLeft");
    history.push("/info");
  };

  const goToBankEnrollment = () => {

    const isAuth = localStorage.getItem("isAuth");

    if (isAuth !== "Y") {
      sessionStorage.setItem("pastPath", "/bank/manage");
      setPageTrans('trans toRight');
      history.push("/realName/auth?path=/bank/enrollment");
      return
    }

    setPageTrans("trans toRight");
    history.push("/bank/enrollment");
  };

  useEffect(async () => {
    dispatch(BottomNavCloseAction);
  }, []);

  //life cycle
  useEffect(async () => {
    setLoading(true);

    const data = await customApiClient("get", "/party/user/bankAccount");

    if (data.statusCode == 200) {
      setCardData(data.result);
    }

    setLoading(false);

  }, []);

  //삭제 버튼 클릭 함수
  const handleClickDeleteOpen = (idx) => {
    setDeletePopupStatus(true);
    setDeleteAccountIdx(idx);
  }

  //삭제 팝업 취소 함수
  const handleClickDeleteClose = () => {
    setDeletePopupStatus(false);
    setDeleteAccountIdx(-1);
  }

  //최종 삭제 함수
  const handleClickDeleteConfirm = async () => {

    if (deleteAccountIdx === -1) return

    //서버통신
    const res = await customApiClient("delete", `party/user/bankAccount/${deleteAccountIdx}`);

    setDeletePopupStatus(false);
    setDeleteAccountIdx(-1);

    //서버에러
    if (!res) {
      alert("오류가 발생하였습니다. 관리자에게 문의해주세요.");
      return;
    }

    //벨리데이션
    if (res.statusCode != 200) {
      alert(res.message);
      return;
    }

    setCardData(cardData.filter((cardData) => cardData.idx !== deleteAccountIdx));

    //토스트 메시지
    //수정완료 팝업 띄우기
    dispatch({
      type: MessageWrapOpen
    })
    dispatch({
      type: MessageOpen,
      data: '계좌가 정상적으로 삭제되었어요.'
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

  }

  return (
    <div className="page">
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
          <TextMiddle>계좌 관리</TextMiddle>
        </HeaderWrap>
        <ContentWrap>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "1rem 0 1.125rem 0",
            }}
          >
            <div className="spoqaBold" style={{ fontSize: "0.875rem" }}>
              계좌 목록
            </div>
            <AddButton className="notoMedium" onClick={goToBankEnrollment}><div>+ 계좌 추가</div></AddButton>
          </div>
          {loading === true ?
            <LoadingBox /> :
            cardData.length === 0 ? (
              <CardWrap>
                <img src={blank_duck} />
                <div className="notoBold title-text">등록된 계좌가 없습니다.</div>
                <div className="notoMedium sub-text">우측 상단의"계좌추가"버튼을 통해<br /> 정산계좌를 등록해주세요.</div>
              </CardWrap>
            ) : (
                <div>
                  {cardData.map((card) => {
                    return (
                      <div key={card.idx}>
                        <BankComponent
                          cardName={card.bankName}
                          cardNo={card.bankAccountNum}
                          id={card.idx}
                          cardData={cardData}
                          setCardData={setCardData}
                          deleteFunc={handleClickDeleteOpen}
                        ></BankComponent>
                      </div>
                    );
                  })}
                </div>
              )
          }
        </ContentWrap>

        {/* 삭제 컨펌 창 */}
        <DangerDialog
          openStatus={deletePopupStatus}
          title={"정말 삭제하실건가요 ?"}
          subTitle={"해당 정보는 즉시 삭제되며,\n다시 되돌릴 수 없습니다."}
          leftButtonText={"취소"}
          rightButtonText={"확인"}
          onClickLeft={handleClickDeleteClose}
          onClickRight={handleClickDeleteConfirm}
        />
      </PageWrap>
    </div>
  );
};


export default BankAccountManagement;
