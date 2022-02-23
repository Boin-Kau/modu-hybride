import { TextMiddle, DangerWrapPopup, DangerPopup } from "../../../styled/shared";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction, BottomNavOpenAction } from "../../../reducers/container/bottomNav";
import { useDispatch, useSelector } from "react-redux";
import { TitleWrap, ItemWrap, InputWrap, Input } from "../../../styled/main/enrollment";

import danger_icon from "../../../assets/danger-icon.svg";
import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_arrow_down from "../../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../../assets/icon-arrow-up-gray.svg";
import icon_enroll_default from "../../../assets/party-enroll-choose.svg";
import trash_black from "../../../assets/trash-black.svg";

import Fade from 'react-reveal/Fade';
import { customApiClient } from "../../../shared/apiClient";
import { checkMobile } from "../../../App";
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from "../../../reducers/container/message";
import { GAEventSubmit, GA_CATEOGRY, GA_PARTY_ACTION } from "../../../shared/gaSetting";

const PartyRevise = ({ location }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        platformCategoryList: categoryList
    } = useSelector(state => state.main.platform);

    //context
    const { setPageTrans } = useContext(PageTransContext);

    //state
    const [partyIdx] = useState(location.data.idx);
    // const [selectedPlatformIdx] = useState(location.data.platformIdx);
    const [selectedPlatformName] = useState(location.data.customName ?? location.data.serverName);
    const [selectedPlatformCategoryIdx] = useState(location.data.customCategoryIdx ?? location.data.serverCategoryIdx);
    const [selectedPlatformImgUrl] = useState(location.data.serverImgUrl);
    const [selectedPlatformImgColor] = useState(location.data.color);
    const [selectedPlatformImgInitial] = useState(location.data.initial);



    const [pageConfirmStatus, setPageConfirmStatus] = useState(true);
    const [partyTitle, setPartyTitle] = useState(location.data.title);

    const [partyPersonel, setPartyPersonel] = useState(location.data.personnel);
    const [personelOpen, setPersonelOpen] = useState(false);

    // const [partyPrice, setPartyPrice] = useState(location.data.price);
    const [partyMembership, setPartyMembership] = useState(location.data.membership);
    const [partyOpenChat, setPartyOpenChat] = useState(location.data.openChatLink);

    const [dangerPopupWrap, setDangerPopupWrap] = useState(false);
    const [dangerPopup, setDangerPopup] = useState(false);

    //inital logic
    useEffect(() => {
        dispatch(BottomNavCloseAction);

        const userPlatform = checkMobile();

        if (userPlatform == 'ios') {
            //IOS 배경색 설정
            try {
                window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
            }
            catch (err) {
            }
        }

        //에러 처리
        if (!location.data) {
            dispatch(BottomNavOpenAction);
            history.push('/party');
        }

    }, [])

    //뒤로가기
    const closeEnrollmentPage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    }


    const onChangeTitle = (e) => {
        setPartyTitle(e.target.value);
    }

    const onClickPersonelOpen = () => {
        setPersonelOpen(!personelOpen);
    };


    const onChangePersonel = (personel) => {
        setPartyPersonel(personel);
        setPersonelOpen(false);
    }

    const onChangeMembership = (e) => {
        setPartyMembership(e.target.value);
    }

    const onChangeOpenChat = (e) => {
        setPartyOpenChat(e.target.value);
    }

    //벨리데이션
    useEffect(() => {

        if (partyTitle && partyPersonel && partyOpenChat) {


            //카카오 오픈채팅 링크 벨리데이션
            if (partyOpenChat.includes('https://open.kakao.com')) {
                setPageConfirmStatus(true);
                return
            }

        }

        setPageConfirmStatus(false);

    }, [partyTitle, partyPersonel, partyMembership, partyOpenChat])

    //파티 최종 수정
    const onClickSubmit = async () => {
        //필수사항 만족하지 않으면 return 처리
        if (!pageConfirmStatus) return

        //서버 통신 후 성공하면 성공 페이지 이동

        const body = {
            title: partyTitle,
            personnel: partyPersonel,
            membership: partyMembership,
            openChatLink: partyOpenChat,
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

        setPageTrans('trans toLeft');
        history.goBack();
    }

    //파티 삭제하기
    const onClickDelete = () => {
        setDangerPopupWrap(true);
        setDangerPopup(true);
    }

    const onClickCancel = () => {
        setDangerPopupWrap(false);
        setDangerPopup(false);
    }

    //피타 삭제 컨펌하기
    const onClickDeleteConfirm = async () => {

        //구독 플랫폼 삭제
        const data = await customApiClient('delete', `/party/${partyIdx}?userRole=HOST`);

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode != 200) {
            alert(data.message);
            return
        }

        //삭제완료 팝업창 띄우기
        dispatch({
            type: MessageWrapOpen
        })
        dispatch({
            type: MessageOpen,
            data: '파티가 삭제되었습니다.'
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

        GAEventSubmit(GA_CATEOGRY.PARTY, GA_PARTY_ACTION.DELETE);


        //뒤로가기
        setPageTrans('trans toLeft');
        history.goBack();

    };


    return (
        <div className="page" style={{ backgroundColor: "#f7f7f7" }}>
            <HeaderWrap className="spoqaBold">
                <div id="back_link" onClick={closeEnrollmentPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>
                <TextMiddle>구독 파티 수정</TextMiddle>
                <div onClick={onClickDelete} style={{ position: 'absolute', width: '3.5rem', height: '3.0625rem', right: '0' }}>
                    <img src={trash_black} style={{ width: "1rem", height: "1rem", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                </div>
            </HeaderWrap>

            <div style={{ position: 'absolute', top: '3.0625rem', bottom: '0', left: '0', right: '0', padding: '1.25rem', overflowY: 'scroll' }}>
                <SectionWrap className="notoMedium">

                    {/* 구독 서비스 */}
                    <div style={{ display: 'flex', marginTop: '1.5rem' }}>
                        <div style={{ width: '5rem', height: '5rem', marginLeft: '0.875rem', marginRight: '1.875rem' }}>
                            {selectedPlatformName ?
                                selectedPlatformImgUrl ?
                                    <img src={selectedPlatformImgUrl} style={{ width: '100%', height: '100%' }} />
                                    :
                                    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: selectedPlatformImgColor, borderRadius: '0.375rem' }}>
                                        <div className="spoqaBold" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '2.1875rem', color: '#ffffff' }}>
                                            {selectedPlatformImgInitial}
                                        </div>
                                    </div>
                                :
                                <img src={icon_enroll_default} style={{ width: '100%', height: '100%' }} />
                            }
                        </div>
                        <div >
                            <div style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem' }}>서비스 (수정불가)</div>
                            <div className="spoqaBold" style={{ fontSize: '0.6875rem', marginBottom: '0.375rem' }}>
                                {selectedPlatformName ? selectedPlatformName : "없음"}
                            </div>
                            <div style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem' }}>카테고리 (수정불가)</div>
                            <div className="spoqaBold" style={{ fontSize: '0.6875rem' }}>
                                {selectedPlatformCategoryIdx ?
                                    categoryList.map((data) => {
                                        if (data.idx === selectedPlatformCategoryIdx) return data.name;
                                    })
                                    : "없음"}
                            </div>
                        </div>
                    </div>

                    {/* 플랫폼 이름 */}
                    <TitleWrap>파티 개설 제목</TitleWrap>
                    <ItemWrap>
                        <InputWrap>
                            <Input className="notoMedium" value={partyTitle} onChange={onChangeTitle} placeholder="파티 개설 제목을 입력하세요" />
                        </InputWrap>
                    </ItemWrap>

                    {/* 모집 인원 */}
                    <TitleWrap>
                        <div>파티 인원</div>
                        <div style={{ marginLeft: '0.3125rem', fontSize: "0.7188rem", color: "#313131", opacity: "0.3" }}>* 자신을 포함한 인원으로 선택해주세요.</div>
                    </TitleWrap>
                    <ItemWrap onClick={onClickPersonelOpen}>
                        <InputWrap style={{ marginRight: "0.3125rem" }} openStatus={personelOpen} isBlocked={partyPersonel === 0}>
                            <div className="notoMedium">
                                {
                                    partyPersonel !== 0 ? partyPersonel :
                                        '자신을 포함한 파티 인원을 선택하세요'
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
                        <div style={{ flexGrow: '1', flexBasis: '0', marginRight: "0.3125rem" }}>
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

                    {/* 결제금액 */}
                    <TitleWrap>
                        <div>1인당 결제 금액</div>
                        <div style={{ marginLeft: '0.3125rem', fontSize: "0.7188rem", color: "#313131", opacity: "0.3" }}>(수정불가)</div>
                        {/* <div style={{ fontSize: "0.7188rem", color: "#313131", opacity: "0.3" }}>* 1인당 결제금액으로 입력해주세요.</div> */}
                    </TitleWrap>
                    <ItemWrap>
                        <InputWrap style={{ flexGrow: "1", flexBasis: "0" }}>
                            <InputText className="notoMedium">3000</InputText>
                            <div className="notoMedium" style={{ fontSize: '0.8125rem', color: 'rgba(49,49,49,0.31)' }}>￦(원)</div>
                        </InputWrap>
                    </ItemWrap>

                    {/* 맴버십 종류 */}
                    <TitleWrap>
                        <div>멤버십 종류</div>
                    </TitleWrap>
                    <ItemWrap>
                        <InputWrap>
                            <Input className="notoMedium" value={partyMembership} onChange={onChangeMembership} placeholder="멤버십 종류를 입력해주세요"></Input>
                        </InputWrap>
                    </ItemWrap>

                    {/* 오픈 카카오톡 링크 */}
                    <TitleWrap>
                        <div>오픈 카카오톡 링크</div>
                    </TitleWrap>
                    <ItemWrap>
                        <InputWrap>
                            <Input className="notoMedium" value={partyOpenChat} onChange={onChangeOpenChat} placeholder="오픈 카카오톡 링크를 입력해주세요"></Input>
                        </InputWrap>
                    </ItemWrap>
                </SectionWrap>
                <ButtonWrap onClick={onClickSubmit} className="spoqaBold" isConfirm={pageConfirmStatus}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>수정하기</div>
                </ButtonWrap>
            </div>


            {/* 삭제 알림창 */}
            <DangerWrapPopup openStatus={dangerPopupWrap}>
                <DangerPopup className="spoqaBold" openStatus={dangerPopup}>
                    <div style={{ position: 'relative', height: '3.125rem' }}>
                        <div style={{ position: 'absolute', top: '-1.875rem', left: '50%', width: '3.8125rem', height: '3.8125rem', backgroundColor: '#fb5e5e', transform: 'translate(-50%,0)', borderRadius: '50%', border: '0.25rem solid #ffffff' }}>
                            <img src={danger_icon} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '0.5625rem', height: '2.0625rem' }} />
                        </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
                        구독 파티를 삭제하시겠어요?
                    </div>
                    <div className="notoMedium" style={{ marginTop: '0.625rem', marginBottom: '1.25rem', fontSize: '0.75rem', color: 'rgba(49,49,49,0.4)' }}>구독 파티를 삭제하면 복구가 불가능합니다.</div>
                    <div style={{ display: 'flex' }}>
                        <div onClick={onClickCancel} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#e3e3e3', borderRadius: '0.375rem', marginRight: '0.625rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: 'rgba(0,0,0,0.26)' }}>취소</div>
                        </div>
                        <div onClick={onClickDeleteConfirm} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#fb5e5e', borderRadius: '0.375rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: '#ffffff' }}>삭제</div>
                        </div>
                    </div>
                </DangerPopup>
            </DangerWrapPopup>

        </div>
    )
}

const HeaderWrap = styled.div`
    position: relative;
    top:0;
    left:0;
    right:0;

    height:3.0625rem;

    background-color:#ffffff;
    text-align:center;

    font-size:0.875rem;
    color:#313131;
    
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;

const SectionWrap = styled.div`
    padding: 0 0.9375rem 1.125rem 0.9375rem;
    border:1px solid #ffffff;
    border-radius: 0.4375rem;
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
    background-color: #ffffff;
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

const ButtonWrap = styled.div`
    position: relative;
    height: 2.9375rem;
    margin-top: 1.25rem;
    background-color: ${props => props.isConfirm ? '#ffbc26' : '#e3e3e3'};
    border-radius: 0.375rem;
`;

const InputText = styled.div`
    flex-grow:1;
    flex-basis:0;

    border:none;
    font-size:0.8125rem;

    padding:0;
`;

export default PartyRevise;