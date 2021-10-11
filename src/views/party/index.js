import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

import { onClickTerminate, checkMobile } from '../../App';
import backgroundImg from '../../assets/back-money.svg';
import partyPlusIcon from '../../assets/party_plus_icon.svg';
import ReportIcon from '../../assets/icon-report.svg';
import MyPartyIcon from '../../assets/my_party_icon.svg';
import ActiveDuckIcon from '../../assets/icon-activate-people.svg';

import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../containers/pageTransContext';
import { ContentWrap, ContentDetailWrap } from '../../components/main/bottomCard';
import { DetailRowWrap, DetailItemTitle, DetailItemContent, DetailItemWrap, DetailItemFillContent } from '../../styled/main';


const categoryData = [
    {
        idx: 1,
        name: 'OTT'
    },
    {
        idx: 2,
        name: '음악'
    },
    {
        idx: 3,
        name: '카테고리2'
    },
    {
        idx: 4,
        name: '카테고리3'
    },
    {
        idx: 5,
        name: '카테고리4'
    },
    {
        idx: 6,
        name: '카테고리5'
    }
]


const Party = () => {

    const history = useHistory();

    //페이지 전환
    const { setPageTrans } = useContext(PageTransContext);

    //페이지 열기
    const openPage = (path) => {
        setPageTrans('trans toRight');
        history.push(path);
    }

    useEffect(() => {
        const userPlatform = checkMobile();

        if (userPlatform == 'ios') {
            //IOS 배경색 설정
            try {
                window.webkit.messageHandlers.setColorGray.postMessage("hihi");
            }
            catch (err) {
            }
        }
    }, [])

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
                        <span style={{ color: '#ffffff' }}>23</span> 개의 파티가<br />
                        파티원을 찾고 있어요!
                    </div>
                    <CategoryWrap className="spoqaBold">
                        <div style={{ width: '1.25rem', flex: '0 0 auto' }} />
                        <CategoryItem>전체</CategoryItem>
                        {
                            categoryData.map((value) => {
                                return (
                                    <CategoryItem key={value.idx}>{value.name}</CategoryItem>
                                )
                            })
                        }
                        <div style={{ width: '0.9375rem', flex: '0 0 auto' }} />
                    </CategoryWrap>
                </div>

                <CardWrap>
                    <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem', marginLeft: '1.25rem', marginBottom: '0.8875rem' }}>선택된 카테고리</div>
                    <PartyContent />
                </CardWrap>


            </div>

        </>
    )
};


const PartyContent = (props) => {
    return (
        <>
            <ContentWrap style={{ display: 'block', position: 'relative', zIndex: '-1' }}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <img src="https://firebasestorage.googleapis.com/v0/b/softsquared-modu.appspot.com/o/SubscribeIcon%2Ficon_sub_spotify.svg?alt=media&token=0836ca41-fd8d-4ccd-a0e6-cb229ff80a1e" style={{ width: "2.3125rem", height: "2.3125rem", borderRadius: "0.3125rem", marginRight: "0.9375rem" }} />
                    </div>
                    <div className="spoqaBold" style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
                        <div style={{ flexGrow: "1", flexBasis: "0" }}>
                            스포티파이 같이 결제하실분 ~~~!!
                    </div>
                        <div style={{ flexGrow: "1", flexBasis: "0", display: 'flex', fontSize: "0.75rem" }}>
                            {
                                true &&
                                <div className="notoBold" style={{ marginRight: '0.375rem', color: '#ffca17', lineHeight: '1.4375rem' }}>참여중</div>
                            }
                            <div className="notoMedium" style={{ color: '#acacac', lineHeight: '1.4375rem' }}>음악</div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: '0.3125rem' }}>
                    <img src={ActiveDuckIcon} style={{ width: '1.5625rem', height: '1.5625rem', marginRight: '0.5rem' }} />
                    <img src={ActiveDuckIcon} style={{ width: '1.5625rem', height: '1.5625rem', marginRight: '0.5rem' }} />
                    <img src={ActiveDuckIcon} style={{ width: '1.5625rem', height: '1.5625rem', marginRight: '0.5rem' }} />
                    <img src={ActiveDuckIcon} style={{ width: '1.5625rem', height: '1.5625rem', marginRight: '0.5rem' }} />
                </div>
                <div className="spoqaBold" style={{ position: 'absolute', right: '0.75rem', bottom: '0.6875rem', fontSize: '0.8125rem', lineHeight: '1.4375rem' }}>
                    3,533원
                </div>
            </ContentWrap>

            <Fade collapse when={true} duration={500}>
                <ContentDetailWrap>
                    <DetailRowWrap>
                        <DetailItemWrap>
                            <DetailItemTitle>서비스</DetailItemTitle>
                            <DetailItemFillContent>스포티파이</DetailItemFillContent>
                        </DetailItemWrap>
                        <DetailItemWrap>
                            <DetailItemTitle>멤버십 종류</DetailItemTitle>
                            {true ?
                                <DetailItemFillContent>프리미엄 맴버십</DetailItemFillContent> :
                                <DetailItemContent>없음 </DetailItemContent>
                            }
                        </DetailItemWrap>
                    </DetailRowWrap>
                    <div className="spoqaBold" style={{ display: 'flex' }}>
                        <div style={{ position: 'relative', flexGrow: '1', marginRight: '0.75rem', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>파티 참여하기</div>
                        </div>
                        <div style={{ padding: '0.4375rem 0.875rem 0.5rem 0.9187rem', backgroundColor: '#ffbc26', borderRadius: '0.375rem' }}>
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

    padding:0.9375rem 0rem;
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
    background-color:${props => props.isSeleted ? '#ffeeb5' : '#ffffff'};

    border-radius:0.875rem;
    font-size:0.75rem;
    flex: 0 0 auto;

    margin-right:0.3125rem;
`;

export default Party;