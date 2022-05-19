import { TextMiddle } from "../../../styled/shared";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import { useDispatch, useSelector } from "react-redux";
import { TitleWrap, ItemWrap, InputWrap, Input } from "../../../styled/main/enrollment";


import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_arrow_down from "../../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../../assets/icon-arrow-up-gray.svg";
import icon_enroll_default from "../../../assets/party-enroll-choose.svg";


import Fade from 'react-reveal/Fade';
import { ResetPlatform } from "../../../reducers/party/enrollment";
import { customApiClient } from "../../../shared/apiClient";
import { checkMobile } from "../../../App";
import { GAEventSubmit, GA_CATEOGRY, GA_PARTY_ACTION } from "../../../shared/gaSetting";

const OldPartyEnrollment = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //store
    const {
        selectedPlatformIdx,
        selectedPlatformName,
        selectedPlatformCategoryIdx,
        selectedPlatformImgUrl,
        selectedPlatformImgColor,
        selectedPlatformImgInitial
    } = useSelector(state => state.party.enrollment);

    const {
        platformCategoryList: categoryList
    } = useSelector(state => state.main.platform);

    //context
    const { setPageTrans } = useContext(PageTransContext);

    //state
    const [pageConfirmStatus, setPageConfirmStatus] = useState(false);
    const [partyTitle, setPartyTitle] = useState('');

    const [partyPersonel, setPartyPersonel] = useState(0);
    const [personelOpen, setPersonelOpen] = useState(false);

    const [partyPrice, setPartyPrice] = useState('');
    const [partyMembership, setPartyMembership] = useState('');
    const [partyOpenChat, setPartyOpenChat] = useState('');

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
    }, [])

    //뒤로가기
    const closeEnrollmentPage = () => {

        //선택한 플랫폼 초기화
        dispatch({
            type: ResetPlatform
        });

        setPageTrans('trans toLeft');
        history.push('/party');
    }

    //구독 서비스 선택 열기
    const openSubscribePage = () => {

        setPageTrans('trans toRight');
        history.push('/party/enroll/platform');

    };

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

    const onChangePrice = (e) => {
        setPartyPrice(e.target.value);
    }

    const onChangeMembership = (e) => {
        setPartyMembership(e.target.value);
    }

    const onChangeOpenChat = (e) => {
        setPartyOpenChat(e.target.value);
    }

    //벨리데이션
    useEffect(() => {

        if (selectedPlatformName && partyTitle && partyPersonel && partyPrice && partyOpenChat) {


            //카카오 오픈채팅 링크 벨리데이션
            if (partyOpenChat.startsWith('https://open.kakao.com')) {
                setPageConfirmStatus(true);
                return
            }

        }

        setPageConfirmStatus(false);

    }, [selectedPlatformName, partyTitle, partyPersonel, partyPrice, partyMembership, partyOpenChat])

    //파티 최종 등록
    const onClickSubmit = async () => {
        //필수사항 만족하지 않으면 return 처리
        if (!pageConfirmStatus) return

        //서버 통신 후 성공하면 성공 페이지 이동
        let registerType = '';

        if (selectedPlatformIdx) {
            registerType = 'SERVER';
        }
        else {
            registerType = 'CUSTOM';
        }

        const body = {
            registerType: registerType,
            platformIdx: selectedPlatformIdx,
            name: selectedPlatformName,
            categoryIdx: selectedPlatformCategoryIdx,
            color: selectedPlatformImgColor,
            initial: selectedPlatformImgInitial,
            title: partyTitle,
            price: parseInt(partyPrice),
            personnel: partyPersonel,
            membership: partyMembership,
            openChatLink: partyOpenChat,
        }

        const data = await customApiClient('post', '/party', body);

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode != 200) {
            return
        }

        //선택한 플랫폼 초기화
        dispatch({
            type: ResetPlatform
        });

        GAEventSubmit(GA_CATEOGRY.PARTY, GA_PARTY_ACTION.SUBMIT);

        setPageTrans('trans toRight');
        history.push('/party/enroll/finish');
    }

    return (
        <div className="page" style={{ backgroundColor: "#f7f7f7" }}>
            <HeaderWrap className="spoqaBold">
                <div id="back_link" onClick={closeEnrollmentPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>
                <TextMiddle>구독 파티 개설</TextMiddle>
            </HeaderWrap>

            <div style={{ position: 'absolute', top: '3.0625rem', bottom: '0', left: '0', right: '0', padding: '1.25rem', overflowY: 'scroll' }}>
                <SectionWrap className="notoMedium">

                    {/* 구독 서비스 */}
                    <div style={{ display: 'flex', marginTop: '1.5rem' }}>
                        <div onClick={openSubscribePage} style={{ width: '5rem', height: '5rem', marginLeft: '0.875rem', marginRight: '1.875rem' }}>
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
                        <div>
                            <div style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem' }}>서비스</div>
                            <div className="spoqaBold" style={{ fontSize: '0.6875rem', marginBottom: '0.375rem' }}>
                                {selectedPlatformName ? selectedPlatformName : "없음"}
                            </div>
                            <div style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem' }}>카테고리</div>
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
                            <Input value={partyTitle} onChange={onChangeTitle} placeholder="파티 개설 제목을 입력하세요" />
                        </InputWrap>
                    </ItemWrap>

                    {/* 모집 인원 */}
                    <TitleWrap>
                        <div>파티 인원</div>
                        <div style={{ marginLeft: '0.3125rem', fontSize: "0.7188rem", color: "#313131", opacity: "0.3" }}>* 자신을 포함한 인원으로 선택해주세요.</div>
                    </TitleWrap>
                    <ItemWrap onClick={onClickPersonelOpen}>
                        <InputWrap style={{ marginRight: "0.3125rem" }} openStatus={personelOpen} isBlocked={partyPersonel === 0}>
                            <div>
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
                        <div style={{ marginRight: "0.5rem" }}>1인당 결제 금액</div>
                        {/* <div style={{ fontSize: "0.7188rem", color: "#313131", opacity: "0.3" }}>* 1인당 결제금액으로 입력해주세요.</div> */}
                    </TitleWrap>
                    <ItemWrap>
                        <InputWrap style={{ flexGrow: "1", flexBasis: "0" }}>
                            <Input value={partyPrice} onChange={onChangePrice} type="number" placeholder="결제금액을 입력하세요" ></Input>
                            <div className="notoBold" style={{ fontSize: '0.8125rem', color: 'rgba(49,49,49,0.31)' }}>￦(원)</div>
                        </InputWrap>
                    </ItemWrap>

                    {/* 맴버십 종류 */}
                    <TitleWrap>
                        <div>멤버십 종류</div>
                    </TitleWrap>
                    <ItemWrap>
                        <InputWrap>
                            <Input value={partyMembership} onChange={onChangeMembership} placeholder="멤버십 종류를 입력해주세요"></Input>
                        </InputWrap>
                    </ItemWrap>

                    {/* 오픈 카카오톡 링크 */}
                    <TitleWrap>
                        <div>오픈 카카오톡 링크</div>
                        <div style={{ marginLeft: '0.3125rem', fontSize: "0.7188rem", color: "#313131", opacity: "0.3" }}>* 공백 없이 링크만 입력해주세요.</div>
                    </TitleWrap>
                    <ItemWrap>
                        <InputWrap>
                            <Input value={partyOpenChat} onChange={onChangeOpenChat} placeholder="오픈 카카오톡 링크를 입력해주세요"></Input>
                        </InputWrap>
                    </ItemWrap>
                </SectionWrap>
                <ButtonWrap onClick={onClickSubmit} className="spoqaBold" isConfirm={pageConfirmStatus}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>완료</div>
                </ButtonWrap>
            </div>
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

export default OldPartyEnrollment;