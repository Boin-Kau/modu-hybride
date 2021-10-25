import { TextMiddle } from "../../../../styled/shared";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState, useCallback } from "react";
import { PageTransContext } from "../../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../../reducers/container/bottomNav";
import { useDispatch, useSelector } from "react-redux";
import { TitleWrap, ItemWrap, InputWrap, Input } from "../../../../styled/main/enrollment";


import icon_back from "../../../../assets/icon-back-arrow.svg";
import icon_arrow_down from "../../../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../../../assets/icon-arrow-up-gray.svg";
import icon_pen from "../../../../assets/pen-icon-white.svg";
import icon_check from "../../../../assets/icon-check-white.svg";

import { ImgColorList, ImgInitialList } from '../../../main/subscribe/enrollment';

import Fade from 'react-reveal/Fade';
import { UpdatePlatformAction } from "../../../../reducers/party/enrollment";

const PartyPlatformDetail = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { setPageTrans } = useContext(PageTransContext);

    //store
    const {
        platformCategoryList: categoryList
    } = useSelector(state => state.main.platform);

    const {
        selectedPlatformIdx,
        selectedPlatformName,
        selectedPlatformCategoryIdx,
    } = useSelector(state => state.party.enrollment);

    const [imgColor, setImgColor] = useState('');
    const [imgInitial, setImgInitial] = useState('');
    const [imgEnrollOpen, setImgEnrollOpen] = useState(false);

    const [platformName, setPlatformName] = useState('');

    const [categoryIndex, setCategoryIndex] = useState(-1);
    const [categoryOpen, setCategoryOpen] = useState(false);

    const [pageConfirmStatus, setPageConfirmStatus] = useState(false);

    //inital logic
    useEffect(() => {
        dispatch(BottomNavCloseAction);
    }, [])

    const closeEnrollmentPage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    }

    const openImgEnrollPopup = () => {
        setImgEnrollOpen(true);
    }
    const closeImgEnrollPopup = () => {
        setImgEnrollOpen(false);
    }

    const onChangePlatformNme = (e) => {
        setPlatformName(e.target.value);
    }

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

    //페이지 벨리데이션
    useEffect(() => {

        //서버 플랫폼이라면 img color, initial만 체크
        if (selectedPlatformIdx) {
            if (imgColor && imgInitial) {
                setPageConfirmStatus(true);
            }
            else {
                setPageConfirmStatus(false);
            }
        }
        else {
            if (platformName && categoryIndex !== -1 && imgColor && imgInitial) {
                setPageConfirmStatus(true);
            }
            else {
                setPageConfirmStatus(false);
            }
        }

    }, [
        selectedPlatformIdx,
        platformName, categoryIndex,
        imgColor, imgInitial
    ])

    //구독 서비스 디테일 후 확인 버튼 
    const onClickConfrim = () => {

        //모두 만적하지 않으면 종료처리
        if (!pageConfirmStatus) return

        let data = {};

        if (selectedPlatformIdx) {
            data = {
                selectedPlatformIdx: selectedPlatformIdx,
                selectedPlatformName: selectedPlatformName,
                selectedPlatformCategoryIdx: selectedPlatformCategoryIdx,
                selectedPlatformImgUrl: null,
                selectedPlatformImgColor: imgColor,
                selectedPlatformImgInitial: imgInitial,
            };
        }
        else {
            data = {
                selectedPlatformIdx: null,
                selectedPlatformName: platformName,
                selectedPlatformCategoryIdx: categoryIndex,
                selectedPlatformImgUrl: null,
                selectedPlatformImgColor: imgColor,
                selectedPlatformImgInitial: imgInitial,
            };
        }

        dispatch(UpdatePlatformAction(data));

        setPageTrans('trans toLeft');
        history.push('/party/enroll');
    }

    return (
        <div className="page" style={{ backgroundColor: "#f7f7f7" }}>
            <HeaderWrap className="spoqaBold">
                <div id="back_link" onClick={closeEnrollmentPage} style={{ zIndex: "10", position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                    <img src={icon_back}></img>
                </div>
                <TextMiddle>
                    {selectedPlatformName ? selectedPlatformName : "직접 입력하기"}
                </TextMiddle>
            </HeaderWrap>

            <div style={{ position: 'absolute', top: '3.0625rem', bottom: '0', left: '0', right: '0', padding: '1.25rem', overflowY: 'scroll' }}>

                <SectionTitle>
                    <div className="spoqaBold">구독 서비스 정보</div>
                </SectionTitle>

                <SectionWrap className="notoMedium">


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
                            {selectedPlatformIdx ?
                                selectedPlatformName
                                : <Input value={platformName} onChange={onChangePlatformNme} placeholder="구독 서비스명을 입력하세요" ></Input>
                            }
                        </InputWrap>
                    </ItemWrap>

                    {/* 모집 인원 */}
                    <TitleWrap>
                        <div>구독 카테고리</div>
                    </TitleWrap>

                    {
                        selectedPlatformCategoryIdx ?
                            <ItemWrap>
                                <InputWrap>
                                    {categoryList.map((data) => {
                                        if (data.idx === selectedPlatformCategoryIdx) return data.name;
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



                </SectionWrap>
                <ButtonWrap onClick={onClickConfrim} isConfirm={pageConfirmStatus} className="spoqaBold" >
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>확인</div>
                </ButtonWrap>


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
    
    box-shadow: 0 0 0.25rem 0.0625rem #efefef;
`;

const SectionTitle = styled.div`
    display:flex;
    margin-bottom:0.8125rem;

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
    position: absolute;
    bottom:0;
    left:0;
    right:0;
    height: 2.9375rem;
    margin: 0 1.25rem 1.375rem 1.25rem;
    background-color: ${props => props.isConfirm ? '#ffbc26' : '#e3e3e3'};
    border-radius: 0.375rem;
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


export default PartyPlatformDetail;