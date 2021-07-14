import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";


import icon_back from "../../../../assets/icon-back-arrow.svg";
import icon_arrow_down from "../../../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../../../assets/icon-arrow-up-gray.svg";

import icon_check from "../../../../assets/icon-check-white.svg";
import icon_trsah from "../../../../assets/icon-trash-can.svg";
import icon_pen from "../../../../assets/pen-icon-white.svg";

import danger_icon from "../../../../assets/danger-icon.svg";
import trash_black from "../../../../assets/trash-black.svg";


import { TextMiddle, DangerWrapPopup, DangerPopup } from '../../../../styled/shared';
import { TitleWrap, ItemWrap, InputWrap, Input, PartyIconWrap, PartyIcon, PartyText, DeleteButtonWrap } from '../../../../styled/main/enrollment';

import { customApiClient } from '../../../../shared/apiClient';

import Fade from 'react-reveal/Fade';
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from '../../../../reducers/container/message';
import { SubscribeReloadTrueAction } from '../../../../reducers/main/subscribe';
import { ImgColorList, ImgInitialList, getUnit, NumberList, UnitList, MonthList, YearList } from '.';
import { AnalyPageReloadTrueAction } from '../../../../reducers/main/analysis';
import { BottomNavCloseAction } from '../../../../reducers/container/bottomNav';
import { GetPlatformCategoryList } from '../../../../reducers/main/platform';


const EnrollmentRevisePage = ({ location }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    //store
    const {
        platformCategoryList: categoryList
    } = useSelector(state => state.main.platform);

    const {
        platformCategoryList
    } = useSelector(state => state.main.platform);

    const [subscribeDetail, setSubscribeDetail] = useState(location.state.data);

    //첫번째 페이지 state
    const [pageConfirmStatus, setPageConfirmStatus] = useState(false);
    const [subscribeIdx, setSubscirbeIdx] = useState(null);
    const [platformIdx, setPlatformIdx] = useState(null);
    const [registerType, setRegisterType] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
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

    const [dangerPopupWrap, setDangerPopupWrap] = useState(false);
    const [dangerPopup, setDangerPopup] = useState(false);

    useEffect(async () => {

        setSubscribeDetail(location.state.data);

        //카테고리 조회 -> 리덕스에서 없으면 호출, 있으면 호출 X => 최초 1회만 불러오기
        if (platformCategoryList.length < 1) {

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

    useEffect(() => {

        if (!subscribeDetail) return

        let year = null;
        let month = null;
        let day = null;

        if (subscribeDetail.paymentCycleDate) {
            year = parseInt(subscribeDetail.paymentCycleDate.substr(0, 4));
            month = parseInt(subscribeDetail.paymentCycleDate.substr(5, 2));
            day = parseInt(subscribeDetail.paymentCycleDate.substr(8, 2));
        }


        setSubscirbeIdx(subscribeDetail.idx);
        setRegisterType(subscribeDetail.registerType);

        setPlatformIdx(subscribeDetail.platform.idx);
        setThumbnail(subscribeDetail.platform.imgUrl);
        setImgColor(subscribeDetail.color);
        setImgInitial(subscribeDetail.initial);
        setImgEnrollOpen(false);

        setName(subscribeDetail.platform.name);
        setPrice(subscribeDetail.price || '');
        setCategoryIndex(subscribeDetail.platform.category.idx);
        setMembership(subscribeDetail.membershipTitle || '');

        setCategoryOpen(false);

        setCycleData(subscribeDetail.paymentCycleData);
        setCycleUnit(subscribeDetail.paymentCycleUnit);
        setCycleDateOpen(false);
        setCycleUnitOpen(false);

        setPaymentYear(year);
        setPaymentMonth(month);
        setPaymentDay(day);

        setPaymentYearOpen(false);
        setPaymentMonthOpen(false);
        setPaymentDayOpen(false);

        setIsFree(subscribeDetail.isFree);
        setUseageData(subscribeDetail.usageData);
        setUseageUnit(subscribeDetail.usageUnit);
        setUseageDataOpen(false);
        setUseageUnitOpen(false);

    }, [subscribeDetail]);


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

    /////////////

    //페이지 벨리데이션
    useEffect(() => {

        if (name && price && categoryIndex != -1
            && (thumbnail || (imgColor && imgInitial))
            && cycleData && cycleUnit && paymentYear && paymentMonth && paymentDay
            && isFree && ((useageData && useageUnit) || (!useageData && !useageUnit))
        ) {

            //paymentCycleDate 벨리데이션
            const now = new Date();
            const nowDate = new Date(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate());
            const updateDate = new Date(paymentYear + '-' + paymentMonth + '-' + paymentDay);

            if (nowDate.getTime() > updateDate.getTime()) {
                setPageConfirmStatus(false);
                return
            }

            setPageConfirmStatus(true);
        }
        else {
            setPageConfirmStatus(false);
        }

    }, [
        name, price, categoryIndex, membership, thumbnail, imgColor, imgInitial,
        cycleData, cycleUnit, paymentYear, paymentMonth, paymentDay,
        isFree, useageData, useageUnit
    ]);


    const closeEnrollmentRevisePage = () => {
        history.goBack();
    };

    const onClickRevise = useCallback(async () => {

        if (!pageConfirmStatus) return

        let month = paymentMonth;
        let day = paymentDay;

        if (paymentMonth < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        console.log(
            {
                subscribeIdx: subscribeIdx,
                platformIdx: platformIdx,
                registerType: registerType,
                name: name,
                color: imgColor,
                initial: imgInitial,
                categoryIdx: categoryIndex,
                price: parseInt(price),
                isFree: isFree,
                membershipTitle: membership,
                paymentCycleDate: paymentYear + '-' + month + '-' + day,
                paymentCycleData: cycleData,
                paymentCycleUnit: cycleUnit,
                usageData: useageData,
                usageUnit: useageUnit
            }
        )

        //구독 플랫폼 수정
        const data = await customApiClient('put', '/subscribe', {
            subscribeIdx: subscribeIdx,
            platformIdx: platformIdx,
            registerType: registerType,
            name: name,
            color: imgColor,
            initial: imgInitial,
            categoryIdx: categoryIndex,
            price: parseInt(price),
            isFree: isFree,
            membershipTitle: membership,
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
            data: '구독 정보가 수정되었습니다.'
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
        history.goBack();

    }, [
        pageConfirmStatus,
        subscribeIdx, registerType, platformIdx,
        name, imgColor, imgInitial, categoryIndex,
        price, isFree, membership,
        paymentYear, paymentMonth, paymentDay,
        cycleData, cycleUnit,
        useageData, useageUnit
    ]);

    const onClickDelete = () => {
        setDangerPopupWrap(true);
        setDangerPopup(true);
    }

    const onClickCancel = () => {
        setDangerPopupWrap(false);
        setDangerPopup(false);
    }

    const onClickDeleteConfirm = useCallback(async () => {

        //구독 플랫폼 삭제
        const data = await customApiClient('delete', `/subscribe/${subscribeIdx}`);

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode != 200) {
            return
        }

        //삭제완료 팝업창 띄우기
        dispatch({
            type: MessageWrapOpen
        })
        dispatch({
            type: MessageOpen,
            data: '구독 정보가 삭제되었습니다.'
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
        history.goBack();

    }, [subscribeIdx]);


    useEffect(() => {
        dispatch(BottomNavCloseAction);

        const userPlatform = localStorage.getItem('userPlatform');

        if (userPlatform == 'ios') {
            //IOS 배경색 설정
            try {
                window.webkit.messageHandlers.setColorWhite.postMessage("hihi");
            }
            catch (err) {
            }
        }
    }, []);

    return (
        <div className="page">

            <PageWrap className="notoMedium">
                <HeaderWrap className="spoqaBold">
                    <div id="back_link" onClick={closeEnrollmentRevisePage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>
                    <TextMiddle>
                        {
                            registerType == 'SERVER' ?
                                name : '직접 입력하기'
                        }
                    </TextMiddle>
                    {/* <SaveButton confimStatus={pageConfirmStatus} onClick={onClickRevise}>저장</SaveButton> */}
                    <div onClick={onClickDelete} style={{ position: 'absolute', width: '3.5rem', height: '3.0625rem', right: '0' }}>
                        <img src={trash_black} style={{ width: "1rem", height: "1rem", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                    </div>
                </HeaderWrap>

                <ContentWrap>

                    <SectionTitle>기본 정보</SectionTitle>
                    <SectionWrap>

                        {/* 플랫폼 썸네일 */}
                        {
                            thumbnail ?
                                <div style={{ margin: "1.125rem 0 0.9375rem 0", textAlign: "center" }}>
                                    <img src={thumbnail} style={{ width: "4.25rem", height: "4.25rem", borderRadius: "0.375rem" }} />
                                </div> :
                                <div style={{ display: 'flex', margin: "1.125rem 0 0.9375rem 0" }}>
                                    <div style={{ flexGrow: '1' }}></div>
                                    <ImgColorWrap className="spoqaBold" backgroundColor={imgColor} onClick={openImgEnrollPopup}>
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '1.875rem', color: '#ffffff' }}>{imgInitial ? imgInitial : '?'}</div>
                                        <div style={{ position: 'absolute', right: '-0.4375rem', bottom: '-0.4375rem', width: '1.4375rem', height: '1.4375rem', borderRadius: '50%', backgroundColor: '#ffca17' }}>
                                            <img src={icon_pen} style={{ width: '0.8125rem', height: '1rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                                        </div>
                                    </ImgColorWrap>
                                    <div style={{ flexGrow: '1' }}></div>
                                </div>
                        }

                        {/* 플랫폼 이름 */}
                        <TitleWrap>구독 서비스명</TitleWrap>
                        <ItemWrap>
                            {
                                registerType == 'SERVER' ?
                                    <InputWrap>{name}</InputWrap> :
                                    <InputWrap>
                                        <Input placeholder="구독 서비스명을 입력하세요" onChange={onChangeName} value={name}></Input>
                                    </InputWrap>
                            }
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
                        {
                            registerType == 'SERVER' ?
                                <ItemWrap>
                                    <InputWrap>
                                        {categoryList.map((data) => {
                                            if (data.idx == categoryIndex) return data.name;
                                        })}
                                    </InputWrap>
                                </ItemWrap> :
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
                        }
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
                            <div>맴버십 종류</div>
                        </TitleWrap>
                        <ItemWrap>
                            <InputWrap>
                                <Input placeholder="멤버십명을 입력해주세요" onChange={onChangeMembership} value={membership}></Input>
                            </InputWrap>
                        </ItemWrap>

                    </SectionWrap>

                    <SectionTitle>결제 정보</SectionTitle>
                    <SectionWrap>

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

                    <SectionTitle>세부 정보</SectionTitle>
                    <SectionWrap>

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

                    <SaveButton className="spoqaBold" pageConfirmStatus={pageConfirmStatus} onClick={onClickRevise}>
                        저장
                    </SaveButton>
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

            {/* 삭제 알림창 */}
            <DangerWrapPopup openStatus={dangerPopupWrap}>
                <DangerPopup className="spoqaBold" openStatus={dangerPopup}>
                    <div style={{ position: 'relative', height: '3.125rem' }}>
                        <div style={{ position: 'absolute', top: '-1.875rem', left: '50%', width: '3.8125rem', height: '3.8125rem', backgroundColor: '#fb5e5e', transform: 'translate(-50%,0)', borderRadius: '50%', border: '0.25rem solid #ffffff' }}>
                            <img src={danger_icon} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '0.5625rem', height: '2.0625rem' }} />
                        </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', lineHeight: '1.4375rem' }}>
                        구독 내역을 삭제하시겠어요?
                    </div>
                    <div className="notoMedium" style={{ marginTop: '0.625rem', marginBottom: '1.25rem', fontSize: '0.75rem', color: 'rgba(49,49,49,0.4)' }}>구독 내역을 삭제하면 복구가 불가능합니다.</div>
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
        </div >
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
    margin:1.25rem 0 0.8125rem 0;

    font-size:1.0625rem;
    color:#313131;

    font-family: 'Spoqa Han Sans';
    font-weight: 600;
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

const ImgEnrollButton = styled.div`
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

const SaveButton = styled.div`
    cursor: pointer;

    width:100%;

    padding:0.8125rem 0 0.875rem 0;

    font-size:0.875rem;
    color:#ffffff;

    margin-top:2.3125rem;

    text-align:center;

    border-radius:0.375rem;

    background-color: ${props => props.pageConfirmStatus ? '#ffca17' : '#e3e3e3'};
`;


export default EnrollmentRevisePage;