import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch } from "react-redux";

import Fade from 'react-reveal/Fade';
import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_party_memeber from "../../../assets/icon-party-member.svg";
import icon_party_host from "../../../assets/icon-party-host.svg";
import ReportIcon from '../../../assets/icon-report.svg';
import MyPartyEmptyImg from '../../../assets/banner-party-new-party-activated.svg';
import notionIcon from "../../../assets/party/detail/ic-partydetail-delete.png";

import { TextMiddle } from '../../../styled/shared';
import { customApiClient } from '../../../shared/apiClient';

import { DetailRowWrap, DetailItemWrap, DetailItemTitle, DetailItemContent, DetailItemFillContent } from '../../../styled/main';

import { useHistory } from 'react-router-dom';
import { BottomNavCloseAction } from '../../../reducers/container/bottomNav';
import { PageTransContext } from '../../../containers/pageTransContext';
import { priceToString, ContentWrap, ContentDetailWrap } from '../../../components/main/bottomCard';
import { ReportPopupOpenAction, BanishPopupCloseAction, ReportPopupCloseAction } from '../../../reducers/party/popup';
import { checkMobile } from '../../../App';


const MyParty = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { setPageTrans } = useContext(PageTransContext);

    const [progressMenuStatus, setProgressMenuStatus] = useState(true);
    const [terminateMenuStatus, setTerminateMenuStatus] = useState(false);

    const [progressData, setProgressData] = useState([]);
    const [finishData, setFinishData] = useState([]);

    useEffect(() => {
        dispatch(BottomNavCloseAction);

        getMyPartyList("PROGRESS");
        getMyPartyList("TERMINATE");

        const userPlatform = checkMobile();

        if (userPlatform === 'ios') {

            try {
                window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
            }
            catch (err) {
            }
        }

    }, []);

    const getMyPartyList = async (type) => {

        const data = await customApiClient('get', `/party/my?type=${type}`);

        if (!data) return

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
        history.push("/party");
    };

    const onClickMenu = useCallback(async (type) => {

        if (progressMenuStatus && type === 'progress') return
        if (terminateMenuStatus && type === 'terminate') return


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

    const onClickDetailButton = (partyIdx) => {
        if (partyIdx === 0) return;

        setPageTrans('trans toRight');

        history.push(`/party/my/${partyIdx}`);
    }

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

                        <ItemListView selectedStatus={progressMenuStatus}>
                            {
                                progressData.length !== 0 ?
                                    progressData.map((data, index) => {
                                        return (<BottomContent
                                            key={index}
                                            onClickDetailButton={onClickDetailButton}
                                            data={data.partyDetail}
                                            room={data.partyRoom}
                                            enrolledAt={data.createdAt}
                                            endedAt={data.deletedAt}
                                            isProgress={progressMenuStatus}
                                            status={data.status}
                                        ></BottomContent>)
                                    }) :
                                    <div style={{ marginTop: "4.5938rem", marginBottom: '4.25rem', textAlign: "center" }}>
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <img src={MyPartyEmptyImg} style={{ width: '12rem', height: '2.8125rem' }} />
                                        </div>
                                        <div className="spoqaBold" style={{ fontSize: "0.8125rem", color: "#313131", opacity: "0.25" }}>구독 파티에 참여해보세요!</div>
                                    </div>
                            }
                        </ItemListView>

                        <ItemListView selectedStatus={terminateMenuStatus}>
                            {
                                finishData.length !== 0 ?
                                    finishData.map((data, index) => {
                                        return (<BottomContent onClickDetailButton={onClickDetailButton} data={data.partyDetail} room={data.partyRoom} enrolledAt={data.createdAt} endedAt={data.deletedAt} isProgress={progressMenuStatus} key={index}></BottomContent>)
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
        </div >
    )
};


const BottomContent = ({ data, room, enrolledAt, endedAt, isProgress, onClickDetailButton, status }) => {

    const dispatch = useDispatch();

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
        dispatch(ReportPopupOpenAction({
            reportPartyIdx: data.idx
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
                    <NotionWrap>
                        <div className="notoMedium" style={{ fontSize: "0.75rem", opacity: '0.4', lineHeight: "1.25rem" }}>{data.customName ? data.customName : data.serverName}</div>

                        {isProgress &&
                            room.status === "RESERVED" ?
                            <div className="notionWrap">
                                <div>
                                    <img className="notionImg" src={notionIcon} alt="notionIcon" />
                                </div>
                                <div className="notionText notoMedium">삭제예정</div>
                            </div> :
                            status === "RESERVED" &&
                            <div className="notionWrap">
                                <div>
                                    <img className="notionImg" src={notionIcon} alt="notionIcon" />
                                </div>
                                <div className="notionText notoMedium">해지예정</div>
                            </div>
                        }
                    </NotionWrap>
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
                        {isProgress ?
                            <div onClick={() => { onClickDetailButton(data.idx) }} className="spoqaBold" style={{ position: 'relative', flexGrow: '1', backgroundColor: '#ffbc26', minHeight: "2.4375rem", borderRadius: '0.375rem' }}>
                                <div style={{ height: '100%' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>내 파티 상세보기</div>
                                </div>
                            </div> :
                            <div onClick={() => { window.open(data.openChatLink, "_blank") }} className="spoqaBold" style={{ position: 'relative', flexGrow: '1', backgroundColor: '#ffbc26', minHeight: "2.4375rem", borderRadius: '0.375rem' }}>
                                <div style={{ height: '100%' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>오픈채팅방 열기</div>
                                </div>
                            </div>
                        }
                        {!isProgress &&
                            <div onClick={onClickReport} style={{ padding: '0.375rem 0.875rem 0.4187rem 0.9187rem', backgroundColor: '#ffbc26', marginLeft: '0.75rem', borderRadius: '0.375rem' }}>
                                <img src={ReportIcon} style={{ width: '1.2563rem', height: '1.3938rem' }} />
                            </div>
                        }
                    </DetailRowWrap>

                </ContentDetailWrap>
            </Fade>

        </>
    )
};





const PageWrap = styled.div`

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
`;
const MainWrap = styled.div`

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

const NotionWrap = styled.div`
    display: flex;
    flex-grow: 1;
    flex-basis: 0;

    .notionWrap {
        display:flex;
        margin-left:0.3438rem;
    }
    .notionImg {
        width:0.8125rem;
        height:0.6875rem;
        margin-right:0.0875rem;
    }
    .notionText {
        font-size:0.75rem;
        color:#fb5e5e;

        line-height:1.25rem;
    }
`;


export default MyParty;