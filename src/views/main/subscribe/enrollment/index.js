import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";


import icon_back from "../../../../assets/icon-back-arrow.svg";
import icon_arrow_down from "../../../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../../../assets/icon-arrow-up-gray.svg";

import icon_check from "../../../../assets/icon-check-white.svg";
import icon_pen from "../../../../assets/pen-icon-white.svg";

import { TextMiddle } from '../../../../styled/shared';
import { TitleWrap, ItemWrap, InputWrap, Input, PartyIconWrap, PartyIcon, PartyText } from '../../../../styled/main/enrollment';

import { customApiClient } from '../../../../shared/apiClient';

import Fade from 'react-reveal/Fade';
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from '../../../../reducers/container/message';
import { SubscribeReloadTrueAction } from '../../../../reducers/main/subscribe';
import { AnalyPageReloadTrueAction } from '../../../../reducers/main/analysis';
import { useHistory } from 'react-router-dom';
import { GetPlatformCategoryList } from '../../../../reducers/main/platform';
import { PageTransContext } from '../../../../containers/pageTransContext';
import { BottomNavCloseAction } from '../../../../reducers/container/bottomNav';


export const ImgColorList = ['#e96a6a', '#fa9754', '#f8cc54', '#9de154', '#82e3cd', '#76d7fd', '#54b5fd', '#9578fd', '#cd6ae9', '#9c9c9c'];
export const ImgInitialList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export const NumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
export const UnitList = ['DAY', 'WEEK', 'MONTH', 'YEAR'];
export const YearList = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
export const MonthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const getUnit = unit => {
    switch (unit) {
        case 'DAY': return '일'
        case 'WEEK': return '주'
        case 'MONTH': return '달'
        case 'YEAR': return '년'
        default: return '-'
    }
}

const EnrollmentPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //store
    const {
        platformCategoryList: categoryList
    } = useSelector(state => state.main.platform);

    //context
    const { setPageTrans } = useContext(PageTransContext);

    //state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageConfirm, setPageConfirm] = useState(false);
    const [nextButtonText, setNextButtonText] = useState('다음');

    //첫번째 페이지 state
    const [imgColor, setImgColor] = useState('');
    const [imgInitial, setImgInitial] = useState('');
    const [imgEnrollOpen, setImgEnrollOpen] = useState(false);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    // const [categoryList, setCategoryList] = useState([]);
    const [categoryIndex, setCategoryIndex] = useState(-1);
    const [membership, setMembership] = useState('');

    const [categoryOpen, setCategoryOpen] = useState(false);

    //두번째 페이지 state
    const [cycleData, setCycleData] = useState(null);
    const [cycleUnit, setCycleUnit] = useState(null);

    const [cycleDataOpen, setCycleDateOpen] = useState(false);
    const [cycleUnitOpen, setCycleUnitOpen] = useState(false);

    const [paymentYear, setPaymentYear] = useState(null);
    const [paymentMonth, setPaymentMonth] = useState(null);
    const [paymentDay, setPaymentDay] = useState(null);

    const [paymentYearOpen, setPaymentYearOpen] = useState(false);
    const [paymentMonthOpen, setPaymentMonthOpen] = useState(false);
    const [paymentDayOpen, setPaymentDayOpen] = useState(false);

    //세번째 페이지 state
    const [isFree, setIsFree] = useState('N');
    const [useageData, setUseageData] = useState(null);
    const [useageUnit, setUseageUnit] = useState(null);

    const [useageDataOpen, setUseageDataOpen] = useState(false);
    const [useageUnitOpen, setUseageUnitOpen] = useState(false);

    useEffect(async () => {
        dispatch(BottomNavCloseAction);

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
    }, []);


    const openImgEnrollPopup = () => {
        setImgEnrollOpen(true);
    }
    const closeImgEnrollPopup = () => {
        setImgEnrollOpen(false);
    }

    const onClickImgColor = (index) => {
        setImgColor(ImgColorList[index]);
    }
    const onClickImgInitial = (index) => {
        setImgInitial(ImgInitialList[index]);
    }
    const onClickImgConfirm = useCallback(() => {
        if (imgColor && imgInitial) {
            setImgEnrollOpen(false);
        }
        else {
            return
        }
    }, [imgColor, imgInitial]);

    const onClickCategoryOpen = useCallback(() => {
        if (categoryOpen) {
            setCategoryOpen(false);
        }
        else {
            setCategoryOpen(true);
        }
    }, [categoryOpen]);

    const onClickCategoryContent = (index) => {
        setCategoryIndex(index);
        setCategoryOpen(false);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }
    const onChangeMembership = (e) => {
        setMembership(e.target.value);
    }

    const onClickCycleDataOpen = useCallback(() => {
        if (cycleDataOpen) {
            setCycleDateOpen(false);
        }
        else {
            setCycleDateOpen(true);
        }
    }, [cycleDataOpen]);

    const onClickCycleDataContent = (data) => {
        setCycleData(data);
        setCycleDateOpen(false);
    }

    const onClickCycleUnitOpen = useCallback(() => {
        if (cycleUnitOpen) {
            setCycleUnitOpen(false);
        }
        else {
            setCycleUnitOpen(true);
        }
    }, [cycleUnitOpen]);

    const onClickCycleUnitContent = (data) => {
        setCycleUnit(data);
        setCycleUnitOpen(false);
    }

    //year
    const onClickPaymentYearOpen = useCallback(() => {
        if (paymentYearOpen) {
            setPaymentYearOpen(false);
        }
        else {
            setPaymentYearOpen(true);
        }
    }, [paymentYearOpen]);

    const onClickPaymentYearContent = (data) => {
        setPaymentYear(data);
        setPaymentYearOpen(false);
    }
    //month
    const onClickPaymentMonthOpen = useCallback(() => {
        if (paymentMonthOpen) {
            setPaymentMonthOpen(false);
        }
        else {
            setPaymentMonthOpen(true);
        }
    }, [paymentMonthOpen]);

    const onClickPaymentMonthContent = (data) => {
        setPaymentMonth(data);
        setPaymentMonthOpen(false);
    }
    //day
    const onClickPaymentDayOpen = useCallback(() => {
        if (paymentDayOpen) {
            setPaymentDayOpen(false);
        }
        else {
            setPaymentDayOpen(true);
        }
    }, [paymentDayOpen]);

    const onClickPaymentDayContent = (data) => {
        setPaymentDay(data);
        setPaymentDayOpen(false);
    }

    //isFree
    const onClickIsFree = useCallback(() => {
        if (isFree == 'N') {
            setIsFree('Y');
        }
        else {
            setIsFree('N');
        }
    }, [isFree]);

    const onClickUseageDataOpen = useCallback(() => {
        if (useageDataOpen) {
            setUseageDataOpen(false);
        }
        else {
            setUseageDataOpen(true);
        }
    }, [useageDataOpen]);

    const onClickUseageDataContent = (data) => {
        setUseageData(data);
        setUseageDataOpen(false);
    }

    const onClickUseageUnitOpen = useCallback(() => {
        if (useageUnitOpen) {
            setUseageUnitOpen(false);
        }
        else {
            setUseageUnitOpen(true);
        }
    }, [useageUnitOpen]);

    const onClickUseageUnitContent = (data) => {
        setUseageUnit(data);
        setUseageUnitOpen(false);
    }

    //첫번째 페이지 벨리데이션
    useEffect(() => {
        checkFirstPage();
    }, [name, price, categoryIndex, membership, imgColor, imgInitial]);

    const checkFirstPage = useCallback(() => {
        if (name && price && categoryIndex != -1 && imgColor && imgInitial) {

            setPageConfirm(true);
        }
        else {
            setPageConfirm(false);
        }
    }, [name, price, categoryIndex, membership, imgColor, imgInitial])


    //두번째 페이지 벨리데이션
    useEffect(() => {
        checkSecondPage();
    }, [cycleData, cycleUnit, paymentYear, paymentMonth, paymentDay]);

    const checkSecondPage = useCallback(() => {
        if (cycleData && cycleUnit && paymentYear && paymentMonth && paymentDay) {

            //paymentCycleDate 벨리데이션
            const now = new Date();
            const nowDate = new Date(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate());
            const updateDate = new Date(paymentYear + '-' + paymentMonth + '-' + paymentDay);

            if (nowDate.getTime() > updateDate.getTime()) {
                setPageConfirm(false);
                return
            }

            setPageConfirm(true);
        }
        else {
            setPageConfirm(false);
        }
    }, [cycleData, cycleUnit, paymentYear, paymentMonth, paymentDay]);

    //세번째 페이지 벨리데이션
    useEffect(() => {
        checkThirdPage();
    }, [isFree, useageData, useageUnit]);

    const checkThirdPage = useCallback(() => {

        if (isFree && ((useageData && useageUnit) || (!useageData && !useageUnit))) {

            if (currentPage != 3) return
            setPageConfirm(true);
        }
        else {
            setPageConfirm(false);
        }
    }, [currentPage, isFree, useageData, useageUnit]);



    //다음 버튼
    const onClickNextButton = useCallback(async () => {
        if (!pageConfirm) return

        //다음 페이지
        if (currentPage != 3) {
            if (currentPage == 1) {
                checkSecondPage();
            }
            if (currentPage == 2) {
                checkThirdPage();
                setNextButtonText("완료");
            }
            setCurrentPage(currentPage + 1);
        }

        //최종 등록
        else {

            let month = paymentMonth;
            let day = paymentDay;

            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }

            //구독 플랫폼 등록
            const data = await customApiClient('post', '/subscribe/platform/custom', {
                name: name,
                color: imgColor,
                initial: imgInitial,
                categoryIdx: categoryIndex,
                price: parseInt(price),
                isFree: isFree,
                membershipTitle: membership,
                paymentDate: paymentYear + '-' + month + '-' + day,
                paymentCycleDate: paymentYear + '-' + month + '-' + day,
                paymentCycleData: cycleData,
                paymentCycleUnit: cycleUnit,
                usageData: useageData,
                usageUnit: useageUnit
            });

            //서버에러
            if (!data) return

            //벨리데이션
            if (data.statusCode != 200) {
                return
            }

            //등록완료 팝업창 띄우기
            dispatch({
                type: MessageWrapOpen
            })
            dispatch({
                type: MessageOpen,
                data: '해당 구독 서비스가 추가되었습니다.'
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

            //구독 리스트 리로드
            dispatch(SubscribeReloadTrueAction);

            //소비분석 리로드
            dispatch(AnalyPageReloadTrueAction);

            //뒤로가기
            setPageTrans('trans toLeft');
            history.goBack();
        }
    }, [
        pageConfirm, currentPage,
        name, imgColor, imgInitial, categoryIndex,
        price, isFree, membership,
        paymentYear, paymentMonth, paymentDay,
        cycleData, cycleUnit,
        useageData, useageUnit
    ]);

    //뒤로가기 버튼
    const closeEnrollmentPage = useCallback(() => {
        if (currentPage != 1) {
            if (currentPage == 2) {
                checkFirstPage();
            }
            if (currentPage == 3) {
                checkSecondPage();
                setNextButtonText("다음");
            }
            setCurrentPage(currentPage - 1);
        }
        else {
            setPageTrans('trans toLeft');
            history.goBack();
        }
    }, [currentPage]);

    return (
        <div className="page">

            <PageWrap className="notoMedium">
                <HeaderWrap className="spoqaBold">
                    <div id="back_link" onClick={closeEnrollmentPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>
                    <TextMiddle>직접 입력하기</TextMiddle>
                    <SaveButton confimStatus={pageConfirm} onClick={onClickNextButton}>{nextButtonText}</SaveButton>
                </HeaderWrap>
                <ContentWrap>
                    <SectionTitle>
                        <div className="spoqaBold">기본 정보</div>
                        <div style={{ flexGrow: '1' }}></div>
                        <div style={{ fontSize: '0.8125rem', color: 'rgba(49,49,49,0.35)', lineHeight: '1.3125rem' }}>{currentPage} / 3</div>
                    </SectionTitle>

                    {/* 첫번째 페이지 */}
                    <SectionWrap style={{ display: currentPage == 1 ? 'block' : 'none' }}>

                        {/* 플랫폼 썸네일 */}
                        <div style={{ display: 'flex', margin: "1.125rem 0 0.9375rem 0" }}>
                            <div style={{ flexGrow: '1' }}></div>
                            <ImgColorWrap backgroundColor={imgColor} onClick={openImgEnrollPopup}>
                                <div className="spoqaBold" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '1.875rem', color: '#ffffff' }}>{imgInitial ? imgInitial : '?'}</div>
                                <div style={{ position: 'absolute', right: '-0.4375rem', bottom: '-0.4375rem', width: '1.4375rem', height: '1.4375rem', borderRadius: '50%', backgroundColor: '#ffca17' }}>
                                    <img src={icon_pen} style={{ width: '0.8125rem', height: '1rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                                </div>
                            </ImgColorWrap>
                            <div style={{ flexGrow: '1' }}></div>
                        </div>

                        {/* 플랫폼 이름 */}
                        <TitleWrap>구독 서비스명</TitleWrap>
                        <ItemWrap>
                            <InputWrap>
                                <Input placeholder="구독 서비스명을 입력하세요" onChange={onChangeName} value={name}></Input>
                            </InputWrap>
                        </ItemWrap>

                        {/* 결제금액 */}
                        <TitleWrap>
                            <div style={{ marginRight: "0.5rem" }}>결제 금액</div>
                            <div style={{ fontSize: "0.7188rem", color: "#313131", opacity: "0.3" }}>* 최종 결제금액으로 입력해주세요.</div>
                        </TitleWrap>
                        <ItemWrap>
                            <InputWrap style={{ flexGrow: "1", flexBasis: "0" }}>
                                <Input type="number" placeholder="결제금액을 입력하세요" onChange={onChangePrice} value={price}></Input>
                                <div className="notoBold" style={{ fontSize: '0.8125rem', color: 'rgba(49,49,49,0.31)' }}>￦(원)</div>
                            </InputWrap>
                        </ItemWrap>

                        {/* 카테고리 */}
                        <TitleWrap>
                            <div>카테고리</div>
                        </TitleWrap>
                        <ItemWrap onClick={onClickCategoryOpen}>
                            <InputWrap openStatus={categoryOpen} isBlocked={categoryIndex == -1}>
                                <div>
                                    {categoryIndex != -1 ? categoryList.map((data) => {
                                        if (data.idx == categoryIndex) return data.name;
                                    }) : '카테고리를 선택해주세요'}
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                                <div>
                                    {
                                        categoryOpen ?
                                            <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                                    }
                                </div>
                            </InputWrap>
                        </ItemWrap>
                        <Fade collapse when={categoryOpen} duration={500}>
                            <SelectWrap>

                                {
                                    categoryList.map((data) => {
                                        return (
                                            <SelectContent selectSatus={data.idx == categoryIndex} onClick={() => { onClickCategoryContent(data.idx) }} key={data.idx}>
                                                {data.name}
                                            </SelectContent>
                                        )
                                    })
                                }

                            </SelectWrap>
                        </Fade>

                        {/* 맴버십 종류 */}
                        <TitleWrap>
                            <div>한줄 메모</div>
                        </TitleWrap>
                        <ItemWrap>
                            <InputWrap>
                                <Input placeholder="한줄 메모를 입력해주세요" onChange={onChangeMembership} value={membership}></Input>
                            </InputWrap>
                        </ItemWrap>
                    </SectionWrap>

                    {/* 두번째 페이지 */}
                    <SectionWrap style={{ display: currentPage == 2 ? 'block' : 'none' }}>

                        {/* 결제주기 */}
                        <TitleWrap>
                            <div>결제주기</div>
                        </TitleWrap>
                        <ItemWrap>
                            <InputWrap style={{ marginRight: "0.3125rem" }} openStatus={cycleDataOpen} isBlocked={!cycleData} onClick={onClickCycleDataOpen}>
                                <div>
                                    {
                                        cycleData ? cycleData :
                                            '숫자 선택'
                                    }
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                                <div>
                                    {
                                        cycleDataOpen ?
                                            <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                                    }
                                </div>
                            </InputWrap>
                            <InputWrap openStatus={cycleUnitOpen} isBlocked={!cycleUnit} onClick={onClickCycleUnitOpen}>
                                <div>
                                    {
                                        cycleUnit ? getUnit(cycleUnit) :
                                            '일,주,달,년'
                                    }
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                                <div>
                                    {
                                        cycleUnitOpen ?
                                            <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                                    }
                                </div>
                            </InputWrap>
                        </ItemWrap>

                        <div style={{ display: 'flex' }}>
                            <div style={{ flexGrow: '1', flexBasis: '0', marginRight: "0.3125rem" }}>
                                <Fade collapse when={cycleDataOpen} duration={500}>
                                    <SelectWrap>

                                        {
                                            NumberList.map((data, index) => {
                                                return (
                                                    <SelectContent selectSatus={data == cycleData} onClick={() => { onClickCycleDataContent(data) }} key={index}>
                                                        {data}
                                                    </SelectContent>
                                                )
                                            })
                                        }

                                    </SelectWrap>
                                </Fade>
                            </div>
                            <div style={{ flexGrow: '1', flexBasis: '0' }}>
                                <Fade collapse when={cycleUnitOpen} duration={500}>
                                    <SelectWrap>

                                        {
                                            UnitList.map((data, index) => {
                                                return (
                                                    <SelectContent selectSatus={data == cycleUnit} onClick={() => { onClickCycleUnitContent(data) }} key={index}>
                                                        {getUnit(data)}
                                                    </SelectContent>
                                                )
                                            })
                                        }

                                    </SelectWrap>
                                </Fade>
                            </div>
                        </div>

                        {/* 마지막 결제일 */}
                        <TitleWrap>
                            <div>다음 결제일</div>
                        </TitleWrap>
                        <ItemWrap>
                            <InputWrap style={{ marginRight: "0.3125rem" }} openStatus={paymentYearOpen} isBlocked={!paymentYear} onClick={onClickPaymentYearOpen}>
                                <div>
                                    {
                                        paymentYear ? paymentYear :
                                            '연도'
                                    }
                                </div>
                                <div style={{ flexGrow: "1" }}></div>

                                <div>
                                    {
                                        paymentYearOpen ?
                                            <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                                    }
                                </div>
                            </InputWrap>
                            <InputWrap style={{ marginRight: "0.3125rem" }} openStatus={paymentMonthOpen} isBlocked={!paymentMonth} onClick={onClickPaymentMonthOpen}>
                                <div>
                                    {
                                        paymentMonth ? paymentMonth :
                                            '월'
                                    }
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                                <div>
                                    {
                                        paymentMonthOpen ?
                                            <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                                    }
                                </div>
                            </InputWrap>
                            <InputWrap openStatus={paymentDayOpen} isBlocked={!paymentDay} onClick={onClickPaymentDayOpen}>
                                <div>
                                    {
                                        paymentDay ? paymentDay :
                                            '일'
                                    }
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                                <div>
                                    {
                                        paymentDayOpen ?
                                            <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                                    }
                                </div>
                            </InputWrap>
                        </ItemWrap>

                        <div style={{ display: 'flex' }}>
                            <div style={{ flexGrow: '1', flexBasis: '0', marginRight: "0.3125rem" }}>
                                <Fade collapse when={paymentYearOpen} duration={500}>
                                    <SelectWrap>

                                        {
                                            YearList.map((data, index) => {
                                                return (
                                                    <SelectContent selectSatus={data == paymentYear} onClick={() => { onClickPaymentYearContent(data) }} key={index}>
                                                        {data}
                                                    </SelectContent>
                                                )
                                            })
                                        }

                                    </SelectWrap>
                                </Fade>
                            </div>
                            <div style={{ flexGrow: '1', flexBasis: '0', marginRight: "0.3125rem" }}>
                                <Fade collapse when={paymentMonthOpen} duration={500}>
                                    <SelectWrap>

                                        {
                                            MonthList.map((data, index) => {
                                                return (
                                                    <SelectContent selectSatus={data == paymentMonth} onClick={() => { onClickPaymentMonthContent(data) }} key={index}>
                                                        {data}
                                                    </SelectContent>
                                                )
                                            })
                                        }

                                    </SelectWrap>
                                </Fade>
                            </div>
                            <div style={{ flexGrow: '1', flexBasis: '0' }}>
                                <Fade collapse when={paymentDayOpen} duration={500}>
                                    <SelectWrap>

                                        {
                                            NumberList.map((data, index) => {
                                                return (
                                                    <SelectContent selectSatus={data == paymentDay} onClick={() => { onClickPaymentDayContent(data) }} key={index}>
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

                    {/* 세번째 페이지 */}
                    <SectionWrap style={{ display: currentPage == 3 ? 'block' : 'none' }}>

                        {/* 체험 기간 */}
                        <TitleWrap>
                            <div>체험 기간</div>
                        </TitleWrap>
                        <div style={{ display: "flex", margin: "0.1875rem 0 0 0" }} onClick={onClickIsFree}>
                            <PartyIconWrap isFree={isFree}>
                                <PartyIcon src={icon_check} />
                            </PartyIconWrap>
                            <PartyText>
                                체험 기간으로 사용 중인 서비스입니다.
                        </PartyText>
                        </div>

                        {/* 서비스 누적 이용 기간 */}
                        <TitleWrap style={{ marginTop: '2.5rem' }}>
                            <div>서비스 누적 이용 기간</div>
                            <div style={{ marginLeft: '0.1875rem', color: '#ffbc26' }}>(선택)</div>
                        </TitleWrap>
                        <ItemWrap>
                            <InputWrap style={{ marginRight: "0.3125rem" }} openStatus={useageDataOpen} isBlocked={!useageData} onClick={onClickUseageDataOpen}>
                                <div>
                                    {
                                        useageData ? useageData :
                                            '숫자 선택'
                                    }
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                                <div>
                                    {
                                        useageDataOpen ?
                                            <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                                    }
                                </div>
                            </InputWrap>
                            <InputWrap openStatus={useageUnitOpen} isBlocked={!useageUnit} onClick={onClickUseageUnitOpen}>
                                <div>
                                    {
                                        useageUnit ? getUnit(useageUnit) :
                                            '일,주,달,년'
                                    }
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                                <div>
                                    {
                                        useageUnitOpen ?
                                            <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                                            <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                                    }
                                </div>
                            </InputWrap>
                        </ItemWrap>

                        <div style={{ display: 'flex' }}>
                            <div style={{ flexGrow: '1', flexBasis: '0', marginRight: "0.3125rem" }}>
                                <Fade collapse when={useageDataOpen} duration={500}>
                                    <SelectWrap>

                                        <SelectContent selectSatus={!useageData} onClick={() => { onClickUseageDataContent(null) }} key={-1} style={{ color: 'rgba(49, 49, 49,0.2)' }}>
                                            선택안함
                                        </SelectContent>

                                        {
                                            NumberList.map((data, index) => {
                                                return (
                                                    <SelectContent selectSatus={data == useageData} onClick={() => { onClickUseageDataContent(data) }} key={index}>
                                                        {data}
                                                    </SelectContent>
                                                )
                                            })
                                        }

                                    </SelectWrap>
                                </Fade>
                            </div>
                            <div style={{ flexGrow: '1', flexBasis: '0' }}>
                                <Fade collapse when={useageUnitOpen} duration={500}>
                                    <SelectWrap>

                                        <SelectContent selectSatus={!useageUnit} onClick={() => { onClickUseageUnitContent(null) }} key={-1} style={{ color: 'rgba(49, 49, 49,0.2)' }}>
                                            선택안함
                                        </SelectContent>

                                        {
                                            UnitList.map((data, index) => {
                                                return (
                                                    <SelectContent selectSatus={data == useageUnit} onClick={() => { onClickUseageUnitContent(data) }} key={index}>
                                                        {getUnit(data)}
                                                    </SelectContent>
                                                )
                                            })
                                        }

                                    </SelectWrap>
                                </Fade>
                            </div>
                        </div>

                    </SectionWrap>


                </ContentWrap>

                {/* 썸네일 이미지 등록 페이지 */}
                <div style={{ display: imgEnrollOpen ? 'block' : 'none' }}>
                    <ImgEnrollWrap>
                        <div style={{ flexGrow: '1' }} onClick={closeImgEnrollPopup}></div>
                        <ImgEnrollContentWrap>
                            <div className="spoqaBold" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem', marginBottom: '1.0625rem', marginLeft: '1.25rem' }}>구독 아이콘 설정</div>
                            <div style={{ fontSize: '0.8125rem', marginBottom: '0.75rem', marginLeft: '1.25rem' }}>색상</div>
                            <ImgEnrollColorWrap>
                                {
                                    ImgColorList.map((data, index) => {
                                        return (
                                            <ImgEnrollColor selectedStatus={imgColor == data} backgroundColor={data} onClick={() => onClickImgColor(index)} key={index}>
                                                <ImgEnrollColorCheck src={icon_check} selectedStatus={imgColor == data}></ImgEnrollColorCheck>
                                            </ImgEnrollColor>
                                        )
                                    })
                                }
                            </ImgEnrollColorWrap>
                            <div style={{ fontSize: '0.8125rem', marginBottom: '0.9375rem', marginLeft: '1.25rem' }}>이니셜</div>
                            <ImgEnrollInitialContainer >
                                <div style={{ width: '1.25rem', flex: '0 0 auto' }}></div>
                                {
                                    ImgInitialList.map((data, index) => {
                                        return (
                                            <ImgEnrollInitialWrap className="spoqaBold" selectedStatus={imgInitial == data} onClick={() => onClickImgInitial(index)} key={index}>
                                                {data}
                                            </ImgEnrollInitialWrap>
                                        )
                                    })
                                }
                                <div style={{ width: '1.25rem', flex: '0 0 auto' }}></div>
                            </ImgEnrollInitialContainer>
                            <ImgEnrollButton className="spoqaBold" pageConfirmStatus={imgColor && imgInitial} onClick={onClickImgConfirm}>확인</ImgEnrollButton>

                        </ImgEnrollContentWrap>
                    </ImgEnrollWrap>
                </div>
            </PageWrap>
        </div>
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
    
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;

const SaveButton = styled.div`
    position:absolute;
    top:50%;
    transform:translate(0,-50%);
    right:1.25rem;

    font-size:0.8125rem;
    color:${props => props.confimStatus ? '#313131' : 'rgba(49,49,49,0.25)'};
`;


const ContentWrap = styled.div`
    position:absolute;
    top:3.0625rem;
    left:0;
    right:0;
    bottom:0;

    overflow-y:scroll;

    padding:0 1.25rem 1.25rem 1.25rem;

`;

const SectionTitle = styled.div`
    display:flex;
    margin:1.25rem 0 0.8125rem 0;

    font-size:1.0625rem;
    color:#313131;
`;
const SectionWrap = styled.div`
    padding: 0 0.9375rem 1.125rem 0.9375rem;
    border:1px solid #ffffff;
    border-radius: 0.4375rem;
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
    background-color: #ffffff;
`;

const ImgColorWrap = styled.div`
    position: relative;
    width: 4.25rem;
    height: 4.25rem;
    border-radius: 0.375rem;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : '#e1e1e1'};
`;
const ImgEnrollWrap = styled.div`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    display:flex;
    flex-direction:column;

    background-color:rgba(0,0,0,0.7);
`;

const ImgEnrollContentWrap = styled.div`
    padding:1.0625rem 0 1.375rem 0;
    background-color: #ffffff;

    border-top-left-radius : 0.4375rem;
    border-top-right-radius : 0.4375rem;
`;
const ImgEnrollColorWrap = styled.div`
    display:grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 2.875rem);

    grid-row-gap:1.4375rem;

    margin-bottom:1.375rem;

    margin-left:1.25rem;
`;
const ImgEnrollColorCheck = styled.img`

    display:${props => props.selectedStatus ? 'block' : 'none'};

    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);

    width:1.125rem;
    height:0.875rem;
`;
const ImgEnrollColor = styled.div`
    position:relative;
    border-radius:50%;

    width:${props => props.selectedStatus ? '2.8125rem' : '2.1875rem'};
    height:${props => props.selectedStatus ? '2.8125rem' : '2.1875rem'};
    background-color:${props => props.backgroundColor};

`;

const ImgEnrollInitialContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

`;
const ImgEnrollInitialWrap = styled.div`
    width:3.125rem;

    flex: 0 0 auto;

    margin-right:0.4375rem;

    font-size:0.875rem;
    border-radius:0.8125rem;

    padding:0.0938rem 0 0.1875rem 0;

    text-align:center;

    background-color:${props => props.selectedStatus ? '#ffca17' : 'none'};
    color:${props => props.selectedStatus ? '#ffffff' : 'rgba(49,49,49,0.5)'};
    border:${props => props.selectedStatus ? '0.0625rem solid #ffca17' : '0.0938rem solid #eeeeee'};

`;

export const ImgEnrollButton = styled.div`
    cursor: pointer;

    position: relative;
    padding:0.8125rem 0 0.875rem 0;

    margin:1.75rem 1.25rem 0 1.25rem;

    font-size:0.875rem;
    color:#ffffff;

    text-align:center;

    border-radius:0.375rem;

    background-color: ${props => props.pageConfirmStatus ? '#ffca17' : '#e3e3e3'};
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

export default EnrollmentPage;