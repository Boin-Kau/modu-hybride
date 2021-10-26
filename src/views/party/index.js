import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

import { onClickTerminate, checkMobile } from '../../App';
import backgroundImg from '../../assets/back-money.svg';
import partyPlusIcon from '../../assets/party_plus_icon.svg';
import ReportIcon from '../../assets/icon-report.svg';
import MyPartyIcon from '../../assets/my_party_icon.svg';
import ActiveDuckIcon from '../../assets/icon-activate-people.svg';
import DeActiveDuckIcon from '../../assets/icon-non-activate-people.svg';
import PartyEmprtyImg from '../../assets/banner-main-new-party.svg';


import { useHistory } from 'react-router-dom';
import { PageTransContext } from '../../containers/pageTransContext';
import { ContentWrap, ContentDetailWrap, priceToString } from '../../components/main/bottomCard';
import { DetailRowWrap, DetailItemTitle, DetailItemContent, DetailItemWrap, DetailItemFillContent } from '../../styled/main';
import { BottomNavOpenAction } from '../../reducers/container/bottomNav';
import { useDispatch, useSelector } from 'react-redux';
import { customApiClient } from '../../shared/apiClient';
import { GetPlatformCategoryList } from '../../reducers/main/platform';

const Party = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //store
    const {
        platformCategoryList: categoryList
    } = useSelector(state => state.main.platform);

    //페이지 전환
    const { setPageTrans } = useContext(PageTransContext);


    //state
    const [seletedCategory, setSelectedCategory] = useState(0);
    const [seletedCategoryName, setSelectedCategoryName] = useState('전체');
    const [totalPartyList, setTotalPartyList] = useState([]);
    const [partyList, setPartyList] = useState([]);

    //페이지 열기
    const openPage = (path) => {
        setPageTrans('trans toRight');
        history.push(path);
    }

    //initial logic
    useEffect(async () => {

        //bottom nav logic
        dispatch(BottomNavOpenAction);

        //카테고리 조회 -> 리덕스에서 없으면 호출, 있으면 호출 X => 최초 1회만 불러오기
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

        //파티 리스트 조회
        const partyUri = `/party?categoryIdx=${seletedCategory}`;

        //인기 구독 플랫폼 리스트 조회
        const partyListData = await customApiClient('get', partyUri);

        //서버에러
        if (!partyListData) { return }

        //벨리데이션
        if (partyListData.statusCode != 200) { return }

        setTotalPartyList(partyListData.result);
        setPartyList(partyListData.result);

        //배경색 logic
        const userPlatform = checkMobile();
        if (userPlatform == 'ios') {
            //IOS 배경색 설정
            try {
                window.webkit.messageHandlers.setColorGray.postMessage("hihi");
            }
            catch (err) {
            }
        }
    }, []);

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
                                return (<PartyContent data={data} key={index} />)
                            })
                        }
                        <div style={{ height: '6.25rem' }} />
                    </div>
                </CardWrap>


            </div>

        </>
    )
};


const PartyContent = ({ data }) => {

    const [openStatus, setOpenStatue] = useState(false);

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