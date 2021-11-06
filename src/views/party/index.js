import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

import { onClickTerminate, checkMobile } from '../../App';
import backgroundImg from '../../assets/background-sub-party.svg';
import partyPlusIcon from '../../assets/party_plus_icon.svg';
import ReportIcon from '../../assets/icon-report.svg';
import MyPartyIcon from '../../assets/my_party_icon.svg';
import ActiveDuckIcon from '../../assets/icon-activate-people.svg';
import DeActiveDuckIcon from '../../assets/icon-non-activate-people.svg';
import PartyEmprtyImg from '../../assets/banner-main-new-party.svg';
import PartyEnrollDuckImg from '../../assets/character-main-party-paticipate.svg';


import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../containers/pageTransContext';
import { ContentWrap, ContentDetailWrap, priceToString } from '../../components/main/bottomCard';
import { DetailRowWrap, DetailItemTitle, DetailItemContent, DetailItemWrap, DetailItemFillContent } from '../../styled/main';
import { BottomNavOpenAction } from '../../reducers/container/bottomNav';
import { useDispatch, useSelector } from 'react-redux';
import { customApiClient } from '../../shared/apiClient';
import { GetPlatformCategoryList } from '../../reducers/main/platform';
import { DangerWrapPopup, DangerPopup } from '../../styled/shared';
import ReportPopUp from './popup/reportPopup';
import { ReportPopupOpenAction, SetReportCategoryListAction } from '../../reducers/party/popup';

const Party = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //store
    const {
        platformCategoryList: categoryList
    } = useSelector(state => state.main.platform);
    const {
        reportPopupStatus,
    } = useSelector(state => state.party.popup);

    //페이지 전환
    const { setPageTrans } = useContext(PageTransContext);


    //state
    const [seletedCategory, setSelectedCategory] = useState(0);
    const [seletedCategoryName, setSelectedCategoryName] = useState('전체');
    const [totalPartyList, setTotalPartyList] = useState([]);
    const [partyList, setPartyList] = useState([]);

    const [enrollPartyIdx, setEnrollPartyIdx] = useState(0);
    const [enrollPartyChatLink, setEnrollPartyChatLink] = useState('');
    const [enrollPopupStatus, setEnrollPopupStatus] = useState(false);

    const [completePopupStatus, setCompletePopupStatus] = useState(false);

    //페이지 열기
    const openPage = (path) => {
        setPageTrans('trans toRight');
        history.push(path);
    }

    //initial logic
    useEffect(async () => {

        //bottom nav logic
        dispatch(BottomNavOpenAction);

        //구독 카테고리 조회 -> 리덕스에서 없으면 호출, 있으면 호출 X => 최초 1회만 불러오기
        if (categoryList.length < 1) {

            //인기 구독 플랫폼 리스트 조회
            const data = await customApiClient('get', '/subscribe/category');

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                return
            }

            //리덕스에 넣어주기
            dispatch({
                type: GetPlatformCategoryList,
                data: data.result
            })

        }

        getPartyList();

        //배경색 logic
        const userPlatform = checkMobile();
        if (userPlatform == 'ios') {
            //IOS 배경색 설정
            try {
                window.webkit.messageHandlers.setColorMain.postMessage("hihi");
            }
            catch (err) {
            }
        }

    }, []);

    const getPartyList = async () => {
        //파티 리스트 조회
        const partyUri = `/party?categoryIdx=${seletedCategory}`;

        //인기 구독 플랫폼 리스트 조회
        const partyListData = await customApiClient('get', partyUri);

        //서버에러
        if (!partyListData) { return }

        //벨리데이션
        if (partyListData.statusCode != 200) { return }

        setSelectedCategory(0);
        setSelectedCategoryName('전체');
        setTotalPartyList(partyListData.result);
        setPartyList(partyListData.result);

    }

    const onClickCategory = async (index, name) => {

        //카테고리 변경
        setSelectedCategory(index);
        setSelectedCategoryName(name);


        if (index === 0) {
            setPartyList(totalPartyList);
        }
        else {
            //게시물 변경 (처음엔 서버 통신했다가 비효율 적이여서 변경)
            const partyResult = totalPartyList.filter((value) => {

                if (value.registerType === 'SERVER') {
                    return value.serverCategoryIdx === index
                }
                else {
                    return value.customCategoryIdx === index
                }

            })

            setPartyList(partyResult);
        }

    }


    const onClickEnrollButton = (partyIdx, chatLink) => {
        setEnrollPartyIdx(partyIdx);
        setEnrollPartyChatLink(chatLink);
        setEnrollPopupStatus(true);
    }
    const onClickEnrollCancel = () => {
        setEnrollPartyIdx(0);
        setEnrollPartyChatLink('');
        setEnrollPopupStatus(false);
    }
    const onClickEnrollConfirm = async () => {
        if (enrollPartyIdx === 0) return

        //서버통신
        const data = await customApiClient('post', `/party/${enrollPartyIdx}`);

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode != 200) {
            alert(data.message);
            return
        }

        setEnrollPopupStatus(false);
        setCompletePopupStatus(true);
        getPartyList();
    }

    const onClickCompleteClose = () => {
        setCompletePopupStatus(false);
        setPageTrans('trans toRight');
        history.push('/party/my');
    }

    return (
        <>
            <div className="page" style={{ display: "flex", flexDirection: "column", backgroundColor: '#FFCA17', backgroundSize: 'cover' }}>
                <img src={backgroundImg} alt="backgroundImg" style={{ position: 'absolute', width: '100vw' }} />
                <div id="back_link" onClick={onClickTerminate} style={{ display: 'none' }}></div>
                <div style={{ zIndex: '10' }}>
                    <div className="spoqaBold" style={{ marginTop: '2.3125rem', marginLeft: '1.25rem', fontSize: '0.875rem', lineHeight: '1.4375rem' }}>구독 파티</div>
                    <PartyIconWrap onClick={() => { openPage('/party/enroll') }} style={{ right: '3.375rem' }}>
                        <img src={partyPlusIcon} style={{ width: '1.4375rem', height: '1.4375rem' }} />
                    </PartyIconWrap>
                    <PartyIconWrap onClick={() => { openPage('/party/my') }} style={{ right: '0.625rem' }}>
                        <img src={MyPartyIcon} style={{ width: '1.5rem', height: '1.4375rem' }} />
                    </PartyIconWrap>
                    <div className="spoqaBold" style={{ marginTop: '0.375rem', marginLeft: '1.25rem', fontSize: '1.25rem', lineHeight: '1.625rem' }}>
                        <span style={{ color: '#ffffff' }}>{totalPartyList.length}</span> 개의 파티가<br />
                        파티원을 찾고 있어요!
                    </div>
                    <CategoryWrap className="spoqaBold">
                        <div style={{ width: '1.25rem', flex: '0 0 auto' }} />
                        <CategoryItem onClick={() => onClickCategory(0, '전체')} isSelected={seletedCategory === 0}>전체</CategoryItem>
                        {
                            categoryList.map((value) => {
                                return (
                                    <CategoryItem onClick={() => { onClickCategory(value.idx, value.name) }} isSelected={seletedCategory === value.idx} key={value.idx}>{value.name}</CategoryItem>
                                )
                            })
                        }
                        <div style={{ width: '0.9375rem', flex: '0 0 auto' }} />
                    </CategoryWrap>
                </div>

                <CardWrap>
                    <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem', marginLeft: '1.25rem' }}>
                        {seletedCategoryName}
                    </div>
                    <div style={{ position: 'relative', overflowY: 'scroll', height: '25rem' }}>

                        {partyList.length === 0 ?
                            <div className="spoqaBold" style={{ textAlign: 'center' }}>
                                <div style={{ marginTop: '6.25rem', marginBottom: '3rem' }}>
                                    <img src={PartyEmprtyImg} style={{ width: '17.95rem', height: '7.5rem' }} />
                                </div>
                                <div style={{ fontSize: '0.8125rem', opacity: '0.25' }}>
                                    새로운 구독 파티를 등록해주세요!
                                </div>
                            </div>
                            :
                            partyList.map((data, index) => {
                                return (<PartyContent data={data} key={index} onClickEnrollButton={onClickEnrollButton} />)
                            })
                        }
                        <div style={{ height: '6.25rem' }} />
                    </div>
                </CardWrap>
            </div>

            {/* 참여하기 버튼 팝업 */}
            <DangerWrapPopup openStatus={enrollPopupStatus}>
                <DangerPopup openStatus={enrollPopupStatus}>
                    <div style={{ position: 'relative', height: '1.25rem' }}>
                    </div>
                    <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
                        파티 참여하기
                    </div>
                    <div className="notoMedium" style={{ marginTop: '0.625rem', marginBottom: '1.625rem', fontSize: '0.75rem', color: 'rgba(49,49,49,0.4)' }}>정말 해당 파티에 참여 하시겠어요?</div>
                    <div className="spoqaBold" style={{ display: 'flex' }}>
                        <div onClick={onClickEnrollCancel} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#e3e3e3', borderRadius: '0.375rem', marginRight: '0.625rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: 'rgba(0,0,0,0.26)' }}>취소</div>
                        </div>
                        <div onClick={onClickEnrollConfirm} style={{ position: 'relative', width: '7.6875rem', height: '2.4375rem', backgroundColor: '#ffca17', borderRadius: '0.375rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.875rem', color: '#ffffff' }}>참여하기</div>
                        </div>
                    </div>
                </DangerPopup>
            </DangerWrapPopup>

            {/* 참여 완료 팝업 */}
            <EnrollCompeletePopUp
                openStatus={completePopupStatus}
                openChatLink={enrollPartyChatLink}
                onClickCompleteClose={onClickCompleteClose} />

            {/* 신고 하기 팝업 */}
            <ReportPopUp
                openStatus={reportPopupStatus}
            />
        </>
    )
};

const EnrollCompeletePopUp = ({ openStatus, openChatLink, onClickCompleteClose }) => {
    return (
        <DangerWrapPopup openStatus={openStatus}>
            <DangerPopup openStatus={openStatus} style={{ zIndex: '10', left: '1.125rem', right: '1.125rem', transform: 'translate(0,-50%)' }}>
                <img src={PartyEnrollDuckImg} style={{ width: '5.625rem', height: '8.125rem', margin: '1.875rem 0 1.3125rem 0' }} />
                <div className="spoqaBold" style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#000000' }}>참가 신청 완료</div>
                <div className="notoMedium" style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem', marginBottom: '2.25rem' }}>
                    파티 참가 신청이 완료되었습니다.<br />
                    오픈 카톡방에서 파티원들과 만나보세요.
                </div>
                <a href={openChatLink} target="blank" style={{ textDecoration: 'none' }}>
                    <div className="spoqaBold" style={{ position: 'relative', backgroundColor: '#ffbc26', borderRadius: '0.375rem', height: '2.4375rem' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>오픈카톡방 연결</div>
                    </div>
                </a>
            </DangerPopup>
            <div onClick={onClickCompleteClose} style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }} />
        </DangerWrapPopup >
    )
}

const PartyContent = ({ data, onClickEnrollButton }) => {

    const dispatch = useDispatch();

    const {
        reportCategoryList,
    } = useSelector(state => state.party.popup);

    const [openStatus, setOpenStatue] = useState(false);

    const onClickReport = async () => {

        //신고 카테고리 조회 -> 리덕스에서 없으면 호출, 있으면 호출 X => 최초 1회만 불러오기
        if (reportCategoryList.length < 1) {

            //리스트 조회
            const data = await customApiClient('get', '/party/report/category');

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                return
            }

            //리덕스에 넣어주기
            dispatch(SetReportCategoryListAction({
                reportCategoryList: data.result
            }));

        }


        dispatch(ReportPopupOpenAction({
            reportPartyIdx: data.idx
        }))
    }

    return (
        <>
            <ContentWrap onClick={() => { setOpenStatue(!openStatus) }} style={{ display: 'block', position: 'relative' }}>
                <div style={{ display: 'flex' }}>
                    <div>
                        {
                            data.color && data.initial ?
                                <div className="spoqaBold" style={{ position: 'relative', width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem", backgroundColor: data.color }}>
                                    <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-30%)', fontSize: '1.375rem', color: '#ffffff' }}>
                                        {data.initial}
                                    </div>
                                </div>
                                :
                                data.serverImgUrl ?
                                    <img src={data.serverImgUrl} style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} /> :
                                    <div className="spoqaBold" style={{ position: 'relative', width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem", backgroundColor: '#e1e1e1' }}>
                                        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-30%)', fontSize: '1.375rem', color: '#ffffff' }}>
                                            ?
                                        </div>
                                    </div>
                        }
                    </div>
                    <div className="spoqaBold" style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
                        <div style={{ flexGrow: "1", flexBasis: "0" }}>
                            {data.title}
                        </div>
                        <div style={{ flexGrow: "1", flexBasis: "0", display: 'flex', fontSize: "0.75rem" }}>
                            {
                                data.IsEnrolled === "Y" &&
                                <div className="notoBold" style={{ marginRight: '0.375rem', color: '#ffca17', lineHeight: '1.4375rem' }}>참여중</div>
                            }
                            <div className="notoMedium" style={{ color: '#acacac', lineHeight: '1.4375rem' }}>
                                {
                                    data.registerType === 'SERVER' ?
                                        data.serverCategory : data.customCategory
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: '0.3125rem' }}>
                    {
                        Array(data.personnel).fill(1).map((e, index) => {
                            return (
                                <img key={index} src={index < data.currentUserCount ? ActiveDuckIcon : DeActiveDuckIcon} style={{ width: '1.5625rem', height: '1.5625rem', marginRight: '0.5rem' }} />
                            )
                        })
                    }
                </div>
                <div className="spoqaBold" style={{ position: 'absolute', right: '0.75rem', bottom: '0.6875rem', fontSize: '0.8125rem', lineHeight: '1.4375rem' }}>
                    {priceToString(data.price)}원
                </div>
            </ContentWrap>

            <Fade collapse when={openStatus} duration={500}>
                <ContentDetailWrap>
                    <DetailRowWrap>
                        <DetailItemWrap>
                            <DetailItemTitle>서비스</DetailItemTitle>
                            <DetailItemFillContent>
                                {
                                    data.registerType === 'SERVER' ?
                                        data.serverName : data.customName
                                }
                            </DetailItemFillContent>
                        </DetailItemWrap>
                        <DetailItemWrap>
                            <DetailItemTitle>멤버십 종류</DetailItemTitle>
                            {data.membership ?
                                <DetailItemFillContent>{data.membership}</DetailItemFillContent> :
                                <DetailItemContent>없음 </DetailItemContent>
                            }
                        </DetailItemWrap>
                    </DetailRowWrap>
                    <div className="spoqaBold" style={{ display: 'flex' }}>
                        {
                            data.IsEnrolled === "Y" ?
                                <div style={{ position: 'relative', flexGrow: '1', marginRight: '0.75rem', backgroundColor: '#e3e3e3', borderRadius: '0.375rem' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>파티 참여하기</div>
                                </div>
                                :
                                <div onClick={() => { onClickEnrollButton(data.idx, data.openChatLink) }} style={{ position: 'relative', flexGrow: '1', marginRight: '0.75rem', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>파티 참여하기</div>
                                </div>
                        }
                        <div onClick={onClickReport} style={{ padding: '0.4375rem 0.875rem 0.5rem 0.9187rem', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
                            <img src={ReportIcon} style={{ width: '1.3938rem', height: '1.5rem' }} />
                        </div>
                    </div>
                </ContentDetailWrap>
            </Fade>
        </>
    )
}


const CardWrap = styled.div`
    z-index: 10;
    flex-grow: 1;
    background-color: #f7f7f7;
    border-radius: 0.4375rem;
    box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.15);

    padding:0.8313rem 0rem;
`;

const PartyIconWrap = styled.div`
    position: absolute;
    top:1.8125rem;
    padding:10px;
`;

const CategoryWrap = styled.div`
    display:flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    margin:1.5rem 0 0.8438rem 0;
`;
const CategoryItem = styled.div`
    padding:0.25rem 0.75rem 0.3125rem 0.75rem;
    background-color:${props => props.isSelected ? '#ffeeb5' : '#ffffff'};

    border-radius:0.875rem;
    font-size:0.75rem;
    flex: 0 0 auto;

    margin-right:0.3125rem;
`;

export default Party;