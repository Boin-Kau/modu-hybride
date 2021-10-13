import { TextMiddle } from "../../../styled/shared";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PageTransContext } from "../../../containers/pageTransContext";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";
import { useDispatch } from "react-redux";
import { TitleWrap, ItemWrap, InputWrap, Input } from "../../../styled/main/enrollment";


import icon_back from "../../../assets/icon-back-arrow.svg";
import icon_arrow_down from "../../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../../assets/icon-arrow-up-gray.svg";
import icon_enroll_default from "../../../assets/party-enroll-choose.svg";


import Fade from 'react-reveal/Fade';

const PartyEnrollment = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { setPageTrans } = useContext(PageTransContext);

    //inital logic
    useEffect(() => {
        dispatch(BottomNavCloseAction);
    }, [])

    const closeEnrollmentPage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    }

    //구독 서비스 선택 열기
    const openSubscribePage = () => {

        setPageTrans('trans toRight');
        history.push('/party/enroll/platform');

    };


    //파티 최종 등록
    const onClickSubmit = () => {
        //필수사항 만족하지 않으면 return 처리

        //서버 통신 후 성공하면 성공 페이지 이동
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
                            <img src={icon_enroll_default} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem' }}>서비스</div>
                            <div className="spoqaBold" style={{ fontSize: '0.6875rem', marginBottom: '0.375rem' }}>없음</div>
                            <div style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem' }}>카테고리</div>
                            <div className="spoqaBold" style={{ fontSize: '0.6875rem' }}>없음</div>
                        </div>
                    </div>

                    {/* 플랫폼 이름 */}
                    <TitleWrap>파티 개설 제목</TitleWrap>
                    <ItemWrap>
                        <InputWrap>
                            <Input placeholder="파티 개설 제목을 입력하세요" ></Input>
                        </InputWrap>
                    </ItemWrap>

                    {/* 모집 인원 */}
                    <TitleWrap>
                        <div>모집 인원</div>
                    </TitleWrap>
                    <ItemWrap>
                        <InputWrap style={{ marginRight: "0.3125rem" }} openStatus={false} isBlocked={!false}>
                            <div>
                                {
                                    false ? 1 :
                                        '모집 인원을 선택하세요'
                                }
                            </div>
                            <div style={{ flexGrow: "1" }}></div>
                            <div>
                                {
                                    false ?
                                        <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                                        <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                                }
                            </div>
                        </InputWrap>
                    </ItemWrap>

                    <div style={{ display: 'flex' }}>
                        <div style={{ flexGrow: '1', flexBasis: '0', marginRight: "0.3125rem" }}>
                            <Fade collapse when={false} duration={500}>
                                <SelectWrap>

                                    {
                                        [1, 2, 3, 4, 5].map((data, index) => {
                                            return (
                                                <SelectContent selectSatus={data == 1} key={index}>
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
                            <Input type="number" placeholder="결제금액을 입력하세요" ></Input>
                            <div className="notoBold" style={{ fontSize: '0.8125rem', color: 'rgba(49,49,49,0.31)' }}>￦(원)</div>
                        </InputWrap>
                    </ItemWrap>

                    {/* 맴버십 종류 */}
                    <TitleWrap>
                        <div>멤버십 종류</div>
                    </TitleWrap>
                    <ItemWrap>
                        <InputWrap>
                            <Input placeholder="멤버십 종류를 입력해주세요"></Input>
                        </InputWrap>
                    </ItemWrap>

                    {/* 오픈 카카오톡 링크 */}
                    <TitleWrap>
                        <div>오픈 카카오톡 링크</div>
                    </TitleWrap>
                    <ItemWrap>
                        <InputWrap>
                            <Input placeholder="오픈 카카오톡 링크를 입력해주세요"></Input>
                        </InputWrap>
                    </ItemWrap>
                </SectionWrap>
                <ButtonWrap onClick={onClickSubmit} className="spoqaBold" isConfirm={false}>
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

export default PartyEnrollment;