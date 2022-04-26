import styled from "styled-components";
import { MainText, PartyDetailSubtitleSpan } from "../../../../styled/shared/text";
import { NoticeWrap } from "../../../../styled/shared/wrap";

import icon_notice_duck from "../../../../assets/icon-notice-duck.svg";
import icon_question_about_link from "../../../../assets/icon-partyregist-kakao.svg";

import { TitleWrap } from "../../../../styled/main/enrollment";
import InputComponent from "../../../../styled/shared/inputComponent";
import { useEffect, useState } from "react";
import BottomButton from "../../../../components/party/BottomButton";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCurrentPageAction } from "../../../../reducers/party/enrollment/setPage";
import { ResetPartyInfo, UpdatePartyInfoAction } from "../../../../reducers/party/enrollment/partyInfo";

const ChoosePartyInfo = ({ updatePage }) => {

  const dispatch = useDispatch();
  const { title, membership, openChatLink } = useSelector(state => state.party.enrollment.partyInfo);

  const [partyTitle, setPartyTitle] = useState(title || "");
  const [partyMembership, setPartyMembership] = useState(membership || "");
  const [partyLink, setPartyLink] = useState(openChatLink || "");

  const [nextBtnStatus, setNextBtnStatus] = useState(false);

  useEffect(() => {
    if (partyTitle && partyLink) {
      //카카오 오픈채팅 링크 벨리데이션
      if (partyLink.includes('https://open.kakao.com')) {
        setNextBtnStatus(true);
        return
      }
    }
    setNextBtnStatus(false);

  }, [partyTitle, partyMembership, partyLink])

  const handleChangePartyTitle = (e) => {
    // if (e.target.value.length == 5) return false;
    setPartyTitle(e.target.value);
  };
  const handleChangePartyMembership = (e) => {
    // if (e.target.value.length == 5) return false;
    setPartyMembership(e.target.value);
  };
  const handleChangePartyLink = (e) => {
    // if (e.target.value.length == 5) return false;
    setPartyLink(e.target.value);
  };
  const nextPage = () => {
    nextBtnStatus && dispatch(UpdatePartyInfoAction({
      title: partyTitle,
      membership: partyMembership,
      openChatLink: partyLink
    }));
    nextBtnStatus && dispatch(UpdateCurrentPageAction({ page: 4 }));
  };

  return (
    <ChoosePartyInfoWrap style={{ flexGrow: '1' }}>
      <div style={{ flexGrow: '1' }}>
        <MainText style={{ margin: '1rem 0 0', padding: '0' }}>
          <span className="yellowText">파티와 관련된 정보</span>
          를<br />
          입력해주세요.
        </MainText>

        {/* Notice Div */}
        <NoticeWrap style={{ boxShadow: 'none', backgroundColor: '#fff8e8', margin: '1.1563rem 0 1.2813rem' }}>
          <div className="notice_sub_wrap">
            <div>
              <img className="notice_img mutiple_line_margin" src={icon_notice_duck}></img>
            </div>
            <div className="notice_text_div">
              파티에 대한 정보는 파티에 참여할 수 있는 모든 유저에게 노출돼요.
            </div>
          </div>
        </NoticeWrap>

        <PartyDetailSubtitleSpan>파티 정보</PartyDetailSubtitleSpan>

        <TitleWrap style={{ marginTop: '0.5rem' }}>파티 개설 제목</TitleWrap>
        <InputComponent
          id={"partyTitle"}
          type={"text"}
          placeholder={"구독 서비스명을 입력하세요"}
          maxLength={200}
          value={partyTitle}
          onChange={handleChangePartyTitle}
        />

        <TitleWrap style={{ marginTop: '0.5rem' }}>멤버십 종류</TitleWrap>
        <InputComponent
          id={"partyMembership"}
          type={"text"}
          placeholder={"멤버십 종류를 입력하세요 (ex. 프리미엄)"}
          maxLength={200}
          value={partyMembership}
          onChange={handleChangePartyMembership}
        />

        <TitleWrap style={{ marginTop: '0.5rem' }}>
          오픈카톡방 링크
          <MoreInfoWrap>
            <img src={icon_question_about_link} className="moreInfoBtn" />
            <span className="moreInfoText">더보기</span>
          </MoreInfoWrap>
        </TitleWrap>
        <InputComponent
          id={"partyLink"}
          type={"text"}
          placeholder={"오픈카톡방 링크를 입력하세요"}
          maxLength={200}
          value={partyLink}
          onChange={handleChangePartyLink}
        />

      </div>
      <BottomButton clickFunc={nextPage} text={'다음'} activeStatus={nextBtnStatus} isBottomStatus={false} />

    </ChoosePartyInfoWrap>
  );
}

export default ChoosePartyInfo;

const ChoosePartyInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem;
`;

const MoreInfoWrap = styled.div`
  display: flex;
  align-items: center;

  margin-left: 0.3125rem;

  .moreInfoBtn {
    width: 0.875rem;
    height: 0.875rem;
  }
  .moreInfoText {
    font-size: 0.625rem;
    color: #ffd55f;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    margin-left: 0.25rem;
  }



`;
