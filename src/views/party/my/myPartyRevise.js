import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageTransContext } from "../../../containers/pageTransContext";
import { ContentWrap, HeaderWrap } from "../../../styled/shared/wrap";

import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_info from "../../../assets/info-black-192-x-192@3x.png";
import icon_arrow_down from "../../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../../assets/icon-arrow-up-gray.svg";

import { TextMiddle } from "../../../styled/shared";
import styled from "styled-components";
import { PartyDetailSubtitleSpan } from "../../../styled/shared/text";
import { InputWrap, ItemWrap, TitleWrap } from "../../../styled/main/enrollment";
import InputComponent from "../../../styled/shared/inputComponent";
import { InfoWrap, MiniInfoDialog } from "../enrollment/subPage/chooseAccount";

import Fade from 'react-reveal/Fade';
import { SelectContent, SelectWrap } from "../enrollment/subPage/choosePayment";
import BottomButton from "../../../components/party/BottomButton";
import { customApiClient } from "../../../shared/apiClient";
import { useDispatch } from "react-redux";
import { MessageClose, MessageOpen, MessageWrapClose, MessageWrapOpen } from "../../../reducers/container/message";
import { GAEventSubmit, GA_CATEOGRY, GA_PARTY_ACTION } from "../../../shared/gaSetting";
import PartyLinkPopup from "../../../components/party/PartyLinkPopup";

const MyPartyRevise = ({ location }) => {

  // Module
  const history = useHistory();
  const dispatch = useDispatch();

  //Context
  const { setPageTrans } = useContext(PageTransContext);

  // State
  const [serverImgUrl, setServerImgUrl] = useState('');
  const [initial, setInitial] = useState('');
  const [color, setColor] = useState('');
  const [serverName, setServerName] = useState('');
  const [customName, setCustomName] = useState('');
  const [serverCategory, setServerCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [partyTitle, setPartyTitle] = useState('');
  const [partyMembership, setPartyMembership] = useState('');
  const [partyLink, setPartyLink] = useState('');
  const [partyPersonnel, setPartyPersonnel] = useState('');
  const [partyIdx, setPartyIdx] = useState(0);

  const [personnelInfoStatus, setPersonnelInfoStatus] = useState(false);
  const [personnelOpenStatus, setPersonnelOpenStatus] = useState(false);
  const [confirmBtnStatus, setConfirmBtnStatus] = useState(true);

  const [partyLinkPopupStatus, setPartyLinkPopupStatus] = useState(false);

  useEffect(() => {
    //에러 처리
    if (!location.data) {
      closePage();
    }
    console.log('데이터 확인 : ', location.data);

    setServerImgUrl(location.data.platformInfo.serverImgUrl);
    setInitial(location.data.platformInfo.initial);
    setColor(location.data.platformInfo.color);
    setServerName(location.data.platformInfo.serverName);
    setCustomName(location.data.platformInfo.customName);
    setServerCategory(location.data.platformInfo.serverCategory);
    setCustomCategory(location.data.platformInfo.customCategory);
    setPartyTitle(location.data.title);
    setPartyMembership(location.data.membershipInfo.membership ? location.data.membershipInfo.membership : "");
    setPartyLink(location.data.openChatLink);
    setPartyPersonnel(location.data.partyInfo.personnel);
    setPartyIdx(location.data.idx);
  }, []);

  useEffect(() => {
    if (partyTitle && partyLink && partyPersonnel) {
      //카카오 오픈채팅 링크 벨리데이션
      if (partyLink.includes('https://open.kakao.com')) {
        setConfirmBtnStatus(true);
        return
      }
    }
    setConfirmBtnStatus(false);

  }, [partyTitle, partyLink, partyPersonnel, partyMembership]);

  const handleChangePartyTitle = (e) => {
    setPartyTitle(e.target.value);
  };
  const handleChangePartyMembership = (e) => {
    setPartyMembership(e.target.value);
  };
  const handleChangePartyLink = (e) => {
    setPartyLink(e.target.value);
  };
  const onChangePersonnel = (personel) => {
    setPartyPersonnel(personel);
    setPersonnelOpenStatus(false);
  }

  const onClickConfirmButton = async () => {
    if (!confirmBtnStatus) return

    // 파티 수정하기
    const body = {
      title: partyTitle,
      personnel: partyPersonnel,
      membership: partyMembership,
      openChatLink: partyLink,
    }

    const data = await customApiClient('put', `/party/${partyIdx}`, body);

    //서버에러
    if (!data) return

    //벨리데이션
    if (data.statusCode != 200) {
      alert(data.message);
      return
    }

    //수정완료 팝업 띄우기
    dispatch({
      type: MessageWrapOpen
    })
    dispatch({
      type: MessageOpen,
      data: '파티 정보가 수정되었습니다.'
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

    GAEventSubmit(GA_CATEOGRY.PARTY, GA_PARTY_ACTION.UPDATE);

    closePage();
  }

  const onClickPersonnelOpen = () => setPersonnelOpenStatus(!personnelOpenStatus);

  // 페이지 뒤로 이동
  const closePage = () => {
    // 뒤로 가기
    setPageTrans('trans toLeft');
    history.goBack();
  };

  const handleClickPartyLink = () => {
    setPartyLinkPopupStatus(!partyLinkPopupStatus);
  }

  return (
    <div className="page">
      <HeaderWrap>
        <div id="back_link" onClick={closePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
          <img src={icon_back}></img>
        </div>
        <TextMiddle>파티 정보 수정</TextMiddle>
      </HeaderWrap>

      <ContentWrap style={{ position: 'absolute', padding: '1.25rem 1.25rem 0 1.25rem', display: 'flex', flexDirection: 'column', top: '3.0625rem' }}>
        <SectionWrap>
          {/* 플랫폼 정보 */}
          <PlatformWrap>
            {
              serverImgUrl ?
                <ServerImg src={serverImgUrl} alt="구독서비스이미지" />
                :
                color && initial ?
                  <CustomImg color={color}>
                    <CustomInitial className="spoqaBold">
                      {initial}
                    </CustomInitial>
                  </CustomImg>
                  :
                  <CustomImg color="#e1e1e1">
                    <CustomInitial className="spoqaBold">
                      ?
                    </CustomInitial>
                  </CustomImg>
            }
            <div className="platformInfoWrap">
              <div className="infoTitle">서비스</div>
              <div className="infoContents space">{serverName ? serverName : customName}</div>
              <div className="infoTitle">카테고리</div>
              <div className="infoContents">{serverCategory ? serverCategory : customCategory}</div>
            </div>
          </PlatformWrap>

          {/* Subtitle : 파티 정보 */}
          <PartyDetailSubtitleSpan style={{ marginTop: '1.8125rem', display: 'block' }}>파티 정보</PartyDetailSubtitleSpan>

          {/* 파티 개설 제목 */}
          <TitleWrap style={{ marginTop: '0.75rem' }}>파티 개설 제목</TitleWrap>
          <InputComponent
            id={"partyTitle"}
            type={"text"}
            placeholder={"구독 서비스명을 입력하세요"}
            maxLength={200}
            value={partyTitle}
            onChange={handleChangePartyTitle}
          />

          {/* 멤버십 종류 */}
          <TitleWrap style={{ marginTop: '0.5625rem' }}>멤버십 종류</TitleWrap>
          <InputComponent
            id={"partyMembership"}
            type={"text"}
            placeholder={"멤버십 종류를 입력하세요 (ex. 프리미엄)"}
            maxLength={200}
            value={partyMembership}
            onChange={handleChangePartyMembership}
          />

          {/* 오픈카톡방 링크 */}
          <TitleWrap style={{ marginTop: '0.5625rem' }}>오픈카톡방 링크</TitleWrap>
          <div style={{ position: "relative" }}>
            <InputComponent
              id={"partyLink"}
              type={"text"}
              placeholder={"오픈카톡방 링크를 입력하세요"}
              maxLength={200}
              value={partyLink}
              onChange={handleChangePartyLink}
            />
            <div onClick={handleClickPartyLink} style={{ zIndex: "10", position: "absolute", top: "0", left: "0", bottom: "0", right: "0" }} />
          </div>

          {/* 필요한 인원 */}
          <TitleWrap style={{ marginTop: '0.5625rem', position: 'relative' }}>
            파티 인원
            <InfoWrap>
              <div style={{ fontSize: "0.7188rem", color: "#ff0000" }}>* 자신을 포함한 인원으로 선택해주세요.</div>
              {/* <img onClick={onClickPersonnelInfo} className="infoBtn" src={icon_info} /> */}
            </InfoWrap>
            <MiniInfoDialog trianglePosition={'28%'} openStatus={personnelInfoStatus}>
              설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다.
            </MiniInfoDialog>
          </TitleWrap>
          <ItemWrap onClick={onClickPersonnelOpen}>
            <InputWrap openStatus={personnelOpenStatus} isBlocked={partyPersonnel === 0}>
              <div>
                {
                  partyPersonnel !== 0 ? partyPersonnel :
                    '모집 인원을 선택해주세요'
                }
              </div>
              <div style={{ flexGrow: "1" }}></div>
              <div>
                {
                  personnelOpenStatus ?
                    <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                    <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                }
              </div>
            </InputWrap>
          </ItemWrap>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: '1', flexBasis: '0' }}>
              <Fade collapse when={personnelOpenStatus} duration={500}>
                <SelectWrap>

                  {
                    [2, 3, 4, 5, 6].map((data, index) => {
                      return (
                        <SelectContent selectSatus={data === partyPersonnel} onClick={() => { onChangePersonnel(data) }} key={index}>
                          {data}
                        </SelectContent>
                      )
                    })
                  }

                </SelectWrap>
              </Fade>
            </div>
          </div>
        </SectionWrap>

        <BottomButton clickFunc={onClickConfirmButton} text={'확인'} activeStatus={confirmBtnStatus} isBottomStatus={false} />

        {/* 오픈카톡 팝업 */}
        <PartyLinkPopup
          openStatus={partyLinkPopupStatus}
          closeFunc={handleClickPartyLink}
          setPartyLink={setPartyLink}
        />
      </ContentWrap>

    </div>
  );
}

export default MyPartyRevise;

const SectionWrap = styled.div`
  padding: 1.5rem 0.9375rem 1.125rem 0.9375rem;
  border:1px solid #ffffff;
  border-radius: 0.4375rem;
  box-shadow: 0 0 0.25rem 0.0625rem #efefef;
  background-color: #ffffff;
  flex: 1;
  margin-bottom: 0.7188rem;
`;

const PlatformWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.8125rem;

  .platformInfoWrap {
    margin-left: 1.875rem;
  }

  .infoTitle {
    font-size: 0.75rem;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    color: #313131;
    opacity: 0.4;
    margin-bottom: 0.375rem;
  }
  .infoContents {
    font-size: 0.6875rem;
    font-family: 'Spoqa Han Sans';
    font-weight: 400;
    color: #313131;
  }
  .space {
    margin-bottom: 0.4375rem;
  }
`;

const ServerImg = styled.img`
  width: 5rem;
  height: 5rem;
`;

const CustomImg = styled.div`
  position: relative;
  background-color: ${(props) => props.color};
  border-radius: 0.375rem;
  width: 5rem;
  height: 5rem;
`;

const CustomInitial = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-30%);
  color: #ffffff;
  font-size: 2.1875rem;
`;