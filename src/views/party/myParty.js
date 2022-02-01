import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";


import Fade from 'react-reveal/Fade';
import icon_back from "../../assets/icon-back-arrow.svg";
import icon_party_memeber from "../../assets/icon-party-member.svg";
import icon_party_host from "../../assets/icon-party-host.svg";
import ReportIcon from '../../assets/icon-report.svg';
import MyPartyEmptyImg from '../../assets/banner-party-new-party-activated.svg';



import { TextMiddle } from '../../styled/shared';
import { customApiClient } from '../../shared/apiClient';

import { DetailRowWrap, DetailItemWrap, DetailItemTitle, DetailItemContent, DetailItemFillContent } from '../../styled/main';

import { useHistory } from 'react-router-dom';
import { BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { PageTransContext } from '../../containers/pageTransContext';
import { priceToString, ContentWrap, ContentDetailWrap } from '../../components/main/bottomCard';
import { SetReportCategoryListAction, ReportPopupOpenAction, TerminatePopupOpenAction, BanishPopupOpenAction, BanishPopupCloseAction, ReportPopupCloseAction } from '../../reducers/party/popup';
import ReportPopUp from './popup/reportPopup';
import TerminatePopUp from './popup/terminatePopup';
import { checkMobile } from '../../App';
import BanishPopUp from './popup/banishPopup';


const MyParty = () => {

    //import
    const dispatch = useDispatch();
    const history = useHistory();

    //store
    const {
        reportPopupStatus,
        terminatePopupStatus,
        banishPopupStatus,
    } = useSelector(state => state.party.popup);

    //context
    const { setPageTrans } = useContext(PageTransContext);


    //state
    const [progressMenuStatus, setProgressMenuStatus] = useState(true);
    const [terminateMenuStatus, setTerminateMenuStatus] = useState(false);

    const [progressData, setProgressData] = useState([]);
    const [finishData, setFinishData] = useState([]);

    useEffect(() => {
        dispatch(BottomNavCloseAction);

        //게시물 조회
        getMyPartyList("PROGRESS");
        getMyPartyList("TERMINATE");

        const userPlatform = checkMobile();

        if (userPlatform === 'ios') {
            //IOS 배경색 설정
            try {
                window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
            }
            catch (err) {
            }
        }

    }, []);

    const getMyPartyList = async (type) => {

        const data = await customApiClient('get', `/party/my?type=${type}`);

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode !== 200) {
            return
        }

        if (type === 'PROGRESS') {
            setProgressData(data.result);
        }
        else {
            setFinishData(data.result);
        }

    };

    const closeSubscribePage = () => {
        dispatch(BanishPopupCloseAction());
        dispatch(ReportPopupCloseAction());
        setPageTrans('trans toLeft');
        history.goBack();
    };

    const onClickMenu = useCallback(async (type) => {

        //똑같은 탭 누르면 리턴 처리
        if (progressMenuStatus && type === 'progress') return
        if (terminateMenuStatus && type === 'terminate') return

        //전체 조회와 카테고리를 동기화 해줘야함! 구독 값이 바뀌면 각 탭 리스트를 다시한번 조회해줘야함

        if (type === 'progress') {
            setProgressMenuStatus(true);
            setTerminateMenuStatus(false);
        }
        else {

            setProgressMenuStatus(false);
            setTerminateMenuStatus(true);
        }
    }, [
        progressMenuStatus,
        terminateMenuStatus,
    ]);

    return (
        <div className="page">

            <PageWrap>
                <HeaderWrap className="spoqaBold">
                    <div id="back_link" onClick={closeSubscribePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>
                    <TextMiddle>내 파티</TextMiddle>
                </HeaderWrap>
                <MainWrap>
                    <CategoryTapWrap className="spoqaBold">
                        <CategoryTapItem selectedStatus={progressMenuStatus} onClick={() => onClickMenu('progress')}>참여중</CategoryTapItem>
                        <CategoryTapItem selectedStatus={terminateMenuStatus} onClick={() => onClickMenu('terminate')}>종료됨</CategoryTapItem>
                    </CategoryTapWrap>
                    <ItemListWrap className="notoMedium">

                        {/* 참여중 리스트 */}
                        <ItemListView selectedStatus={progressMenuStatus}>
                            {
                                progressData.length !== 0 ?
                                    progressData.map((data, index) => {
                                        return (<BottomContent data={data.partyDetail} room={data.partyRoom} enrolledAt={data.createdAt} endedAt={data.deletedAt} isProgress={progressMenuStatus} key={index}></BottomContent>)
                                    }) :
                                    <div style={{ marginTop: "4.5938rem", marginBottom: '4.25rem', textAlign: "center" }}>
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <img src={MyPartyEmptyImg} style={{ width: '12rem', height: '2.8125rem' }} />
                                        </div>
                                        <div className="spoqaBold" style={{ fontSize: "0.8125rem", color: "#313131", opacity: "0.25" }}>구독 파티에 참여해보세요!</div>
                                    </div>
                            }
                        </ItemListView>

                        {/* 종료됨 리스트 */}
                        <ItemListView selectedStatus={terminateMenuStatus}>
                            {
                                finishData.length !== 0 ?
                                    finishData.map((data, index) => {
                                        return (<BottomContent data={data.partyDetail} room={data.partyRoom} enrolledAt={data.createdAt} endedAt={data.deletedAt} isProgress={progressMenuStatus} key={index}></BottomContent>)
                                    }) :
                                    <div style={{ marginTop: "4.5938rem", marginBottom: '4.25rem', textAlign: "center" }}>
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <img src={MyPartyEmptyImg} style={{ width: '12rem', height: '2.8125rem' }} />
                                        </div>
                                        <div className="spoqaBold" style={{ fontSize: "0.8125rem", color: "#313131", opacity: "0.25" }}>구독 파티에 참여해보세요!</div>
                                    </div>
                            }
                        </ItemListView>
                    </ItemListWrap>
                </MainWrap>
            </PageWrap>

            {/* 신고 하기 팝업 */}
            <ReportPopUp openStatus={reportPopupStatus} />

            {/* 파티 나가기 팝업 */}
            <TerminatePopUp openStatus={terminatePopupStatus} />

            {/* 추방하기 팝업 */}
            <BanishPopUp openStatus={banishPopupStatus} />
        </div >
    )
};


const BottomContent = ({ data, room, enrolledAt, endedAt, isProgress }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        reportCategoryList,
    } = useSelector(state => state.party.popup);

    //context
    const { setPageTrans } = useContext(PageTransContext);

    const [openStatus, setOpenStatus] = useState(false);

    const onclickOpenContent = () => {

        if (openStatus) {
            setOpenStatus(false);
        }
        else {
            setOpenStatus(true);
        }
    }

    const onClickReport = async () => {

        //신고 카테고리 조회 -> 리덕스에서 없으면 호출, 있으면 호출 X => 최초 1회만 불러오기
        if (reportCategoryList.length < 1) {

            //리스트 조회
            const data = await customApiClient('get', '/party/report/category');

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode !== 200) {
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

    const onClickTerminate = () => {

        const role = data.IsHost === 'Y' ? "HOST" : "USER";

        dispatch(TerminatePopupOpenAction({
            terminatePartyIdx: data.idx,
            terminatePartyRole: role
        }))
    }

    const handleClickRevise = () => {
        setPageTrans('trans toLRight');
        history.push({
            pathname: '/party/revise',
            data: data
        })
    }

    const onClickBanishUser = () => {
        if (room.partyUser.length <= 1) return

        dispatch(BanishPopupOpenAction({
            banishPartyIdx: data.idx,
            banishUserList: room.partyUser,
        }))
    }

    return (
        <>
            <ContentWrap onClick={onclickOpenContent}>
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
                    <div style={{ flexGrow: "1", flexBasis: "0", display: 'flex' }}>
                        <div>{data.title}</div>
                        <div style={{ marginLeft: '0.3125rem' }}>
                            <img src={data.IsHost === 'Y' ? icon_party_host : icon_party_memeber} style={{ width: '0.875rem', height: '0.625rem' }} />
                        </div>
                    </div>
                    <div className="notoMedium" style={{ flexGrow: "1", flexBasis: "0", fontSize: "0.75rem", opacity: '0.4' }}>{data.customName ? data.customName : data.serverName}</div>
                </div>
            </ContentWrap>

            <Fade collapse when={openStatus} duration={500}>
                <ContentDetailWrap>

                    <DetailRowWrap>
                        <DetailItemWrap mr>
                            <DetailItemTitle>멤버십 종류</DetailItemTitle>
                            {data.membership ?
                                <DetailItemFillContent>{data.membership}</DetailItemFillContent> :
                                <DetailItemContent>없음 </DetailItemContent>
                            }
                        </DetailItemWrap>
                        <DetailItemWrap>
                            <DetailItemTitle>카테고리</DetailItemTitle>
                            <DetailItemFillContent>{data.customName ? data.customCategory : data.serverCategory}</DetailItemFillContent>
                        </DetailItemWrap>
                    </DetailRowWrap>

                    <DetailRowWrap>
                        <DetailItemWrap mr>
                            <DetailItemTitle>모집인원</DetailItemTitle>
                            {
                                isProgress ?
                                    <DetailItemFillContent>{room.partyUser.length}/{room.personnel}</DetailItemFillContent> :
                                    <DetailItemFillContent>{room.personnel}인</DetailItemFillContent>
                            }
                        </DetailItemWrap>
                        <DetailItemWrap>
                            <DetailItemTitle>결제 금액</DetailItemTitle>
                            {room.price ?
                                <DetailItemFillContent>1인당 {priceToString(room.price)}원</DetailItemFillContent> :
                                <DetailItemContent>없음 </DetailItemContent>
                            }
                        </DetailItemWrap>
                    </DetailRowWrap>

                    <DetailRowWrap>
                        <DetailItemWrap mr>
                            <DetailItemTitle>파티 가입일</DetailItemTitle>
                            <DetailItemFillContent>{String(enrolledAt).substring(0, 10)}</DetailItemFillContent>
                        </DetailItemWrap>
                        {!isProgress &&
                            <DetailItemWrap>
                                <DetailItemTitle>파티 종료일</DetailItemTitle>
                                <DetailItemFillContent>{String(endedAt).substring(0, 10)}</DetailItemFillContent>
                            </DetailItemWrap>
                        }
                    </DetailRowWrap>



                    <DetailRowWrap style={{ margin: "0" }}>
                        <div className="spoqaBold" style={{ position: 'relative', flexGrow: '1', marginRight: '0.75rem', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
                            <a href={data.openChatLink} target="blank" style={{ textDecoration: 'none' }}>
                                <div style={{ height: '100%' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>오픈채팅방 열기</div>
                                </div>
                            </a>
                        </div>
                        <div onClick={onClickReport} style={{ padding: '0.5rem 0.875rem 0.5437rem 0.9187rem', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
                            <img src={ReportIcon} style={{ width: '1.2563rem', height: '1.3938rem' }} />
                        </div>
                    </DetailRowWrap>
                    {isProgress &&
                        <DetailRowWrap style={{ margin: "0", marginTop: '1rem' }}>
                            {data.IsHost === 'Y' ?
                                <div onClick={handleClickRevise} className="spoqaBold" style={{ position: 'relative', flexGrow: '1', padding: '0.5625rem 0 0.75rem 0', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
                                    <div style={{ color: '#ffffff', fontSize: '0.8125rem', textAlign: 'center' }}>파티 수정하기</div>
                                </div>
                                :
                                <div onClick={onClickTerminate} className="spoqaBold" style={{ position: 'relative', flexGrow: '1', padding: '0.5625rem 0 0.75rem 0', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
                                    <div style={{ color: '#ffffff', fontSize: '0.8125rem', textAlign: 'center' }}>파티 나가기</div>
                                </div>
                            }

                            {data.IsHost === 'Y' &&
                                <ButtonWrap onClick={onClickBanishUser} className="spoqaBold" isComplte={room.partyUser.length > 1} style={{ marginLeft: '0.75rem' }}>
                                    <div style={{ color: '#ffffff', fontSize: '0.8125rem', textAlign: 'center' }}>파티원 강제 퇴장</div>
                                </ButtonWrap>
                            }
                        </DetailRowWrap>
                    }

                </ContentDetailWrap>
            </Fade>

        </>
    )
};





const PageWrap = styled.div`
    /* border:1px solid red; */
`;
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
const MainWrap = styled.div`
    /* border:1px solid red; */
    position:absolute;
    top:3.0625rem;
    left:0;
    right:0;
    bottom:0;

    overflow-y:scroll;

    padding:0.875rem 1.25rem 5.5625rem 1.25rem;

    background-color:#ffffff;
`;


const CategoryTapWrap = styled.div`
    display:flex;
`;
const CategoryTapItem = styled.div`

    position: relative;

    border-top-right-radius:0.4375rem;
    border-top-left-radius:0.4375rem;


    padding:0.4375rem 0.8125rem 0.6875rem 0.8125rem;

    margin-right:0.5rem;

    background-color : #f7f7f7;

    font-size:0.875rem;

    /* 애니메이션 적용 */
    transition: top 100ms ease-in-out;

    top : ${props => props.selectedStatus ? '0' : '0.625rem'};
    color : ${props => props.selectedStatus ? '#313131' : 'rgba(0,0,0,0.2)'};

`;

const ItemListWrap = styled.div`
    position: relative;
    z-index:100;
    background-color :  #f7f7f7;

    border:1px solid #f7f7f7;

    padding-bottom:0.875rem;

    border-radius:0.4375rem;
    border-top-left-radius:0;
`;

const ItemListView = styled.div`
    display:${props => props.selectedStatus ? 'block' : 'none'};
    position: relative;
`;


const ButtonWrap = styled.div`
    position: relative;
    flex-grow: 1;
    padding: 0.5625rem 0 0.75rem 0;
    background-color: ${props => props.isComplte ? '#ffbc26' : '#e3e3e3'};
    border-radius: 0.375rem;
`;


export default MyParty;