import { useState } from "react";

import TeminateDuckImg from "../../../assets/character-main-party-ban.svg";
import ReportDuckImg from "../../../assets/character-main-report.svg";

import { DangerWrapPopup, DangerPopup } from "../../../styled/shared";
import { useDispatch, useSelector } from "react-redux";
import { ReportPopupCloseAction } from "../../../reducers/party/popup";
import { ItemWrap, InputWrap } from "../../../styled/main/enrollment";
import styled from "styled-components";

import icon_arrow_down from "../../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../../assets/icon-arrow-up-gray.svg";


import Fade from 'react-reveal/Fade';
import { customApiClient } from "../../../shared/apiClient";
import { GAEventSubmit, GA_CATEOGRY, GA_PARTY_ACTION } from "../../../shared/gaSetting";



const ReportPopUp = ({ openStatus }) => {

    const dispatch = useDispatch();

    const {
        reportCategoryList,
        reportPartyIdx
    } = useSelector(state => state.party.popup);

    const [contentPagetatus, setContentPageStatus] = useState(true);
    const [completePagetatus, setCompletePageStatus] = useState(false);

    const [reportCategoryIdx, setReportCategoryIdx] = useState(0);
    const [reportCategoryName, setReportCategoryName] = useState('');

    const [reportContent, setReportContent] = useState('');

    const [categoryOpen, setCategoryOpen] = useState(false);


    const onClickCategoryOpen = () => {
        setCategoryOpen(!categoryOpen);
    };
    const onChangeCateogry = (idx, name) => {
        setReportCategoryIdx(idx);
        setReportCategoryName(name);
        setCategoryOpen(!categoryOpen);
    }
    const onChangeReportContent = (e) => {
        setReportContent(e.target.value);
    }
    const onClickClose = () => {

        dispatch(ReportPopupCloseAction());

        setContentPageStatus(true);
        setCompletePageStatus(false);
        setReportCategoryIdx(0);
        setReportCategoryName('');
        setReportContent('');
        setCategoryOpen(false);
    }
    const onClickReport = async () => {
        if (reportCategoryIdx === 0 || reportContent === '') return

        //서버통신
        const body = {
            partyRoomIdx: reportPartyIdx,
            categoryIdx: reportCategoryIdx,
            content: reportContent,
        }

        const data = await customApiClient('post', '/party/report/user', body);

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode !== 200) {
            return
        }

        GAEventSubmit(GA_CATEOGRY.PARTY, GA_PARTY_ACTION.REPORT);

        //콘텐츠 전환
        setContentPageStatus(false);
        setCompletePageStatus(true);
    }

    return (
        <DangerWrapPopup openStatus={openStatus}>

            {/* 신고하기 컨텐츠 */}
            <DangerPopup openStatus={openStatus} style={{ zIndex: '10', left: '1.125rem', right: '1.125rem', transform: 'translate(0,-50%)' }}>


                {
                    contentPagetatus &&
                    <div>

                        <img src={TeminateDuckImg} style={{ width: '3.9562rem', height: '5.8438rem', margin: '1.25rem 0 1.0313rem 0' }} alt="duckImg" />
                        <div className="spoqaBold" style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#000000' }}>구독 파티를 신고하실건가요?</div>
                        <div className="notoMedium" style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem', marginBottom: '0.5rem' }}>
                            구독파티를 신고하시면 검토 이후에 <br />
                            파티방에 재제를 진행합니다.
                        </div>
                        <div className="notoMedium" style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.75rem', lineHeight: '1.125rem', marginBottom: '0.5625rem' }}>
                                신고 사유
                            </div>
                            <ItemWrap onClick={() => { onClickCategoryOpen() }}>
                                <InputWrap openStatus={categoryOpen} isBlocked={reportCategoryIdx === 0}>
                                    <div>
                                        {
                                            reportCategoryIdx !== 0 ? reportCategoryName :
                                                '신고 사유를 선택하세요'
                                        }
                                    </div>
                                    <div style={{ flexGrow: "1" }}></div>
                                    <div>
                                        {
                                            categoryOpen ?
                                                <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} alt="arrowIcon" /> :
                                                <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} alt="arrowIcon" />
                                        }
                                    </div>
                                </InputWrap>
                            </ItemWrap>

                            <div style={{ display: 'flex' }}>
                                <div style={{ flexGrow: '1', flexBasis: '0', marginRight: "0.3125rem" }}>
                                    <Fade collapse when={categoryOpen} duration={500}>
                                        <SelectWrap>

                                            {
                                                reportCategoryList.map((data, index) => {
                                                    return (
                                                        <SelectContent selectSatus={data.idx === reportCategoryIdx} onClick={() => { onChangeCateogry(data.idx, data.name) }} key={index}>
                                                            {data.name}
                                                        </SelectContent>
                                                    )
                                                })
                                            }

                                        </SelectWrap>
                                    </Fade>
                                </div>
                            </div>

                            <div style={{ fontSize: '0.75rem', lineHeight: '1.125rem', marginTop: '0.5625rem', marginBottom: '0.5625rem' }}>
                                상세 내용
                            </div>
                            <ItemWrap>
                                <InputWrap>
                                    <TextImput value={reportContent} onChange={onChangeReportContent} placeholder="상세 신고 내용을 입력하세요" />
                                </InputWrap>
                            </ItemWrap>

                        </div>
                        <ButtonWrap onClick={onClickReport} className="spoqaBold" isComplete={reportCategoryIdx !== 0 && reportContent !== ''}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>파티 신고하기</div>
                        </ButtonWrap>
                    </div>

                }

                {
                    completePagetatus &&
                    <div>
                        <img src={ReportDuckImg} style={{ width: '3.9562rem', height: '5.8438rem', margin: '1.25rem 0 1.0313rem 0' }} alt="duckImg" />
                        <div className="spoqaBold" style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#000000' }}>선택하신 구독파티가 신고되었습니다.</div>
                        <div className="notoMedium" style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem', marginBottom: '0.5rem' }}>
                            신고된 구독파티는 운영진의 검토 이후에 <br />
                            파티방에 재제를 진행하겠습니다.
                        </div>
                        <ButtonWrap onClick={onClickClose} className="spoqaBold" isComplete>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>확인</div>
                        </ButtonWrap>
                    </div>
                }
            </DangerPopup>

            {/* 바깥 터치시 종료 로직 */}
            <div onClick={onClickClose} style={{ zIndex: '5', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0' }} />
        </DangerWrapPopup >
    )
}



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

const TextImput = styled.textarea`
    flex-grow:1;
    flex-basis:0;

    border:none;
    font-size:0.8125rem;

    padding:0;

    resize:none;

    :focus {
        outline:none;
    }
    ::placeholder {
        opacity:0.3;
    }
`;


const ButtonWrap = styled.div`
    position: relative;
    background-color: ${props => props.isComplete ? '#ffbc26' : '#e3e3e3'};
    border-radius: 0.375rem;
    height: 2.4375rem;
    margin-top: 1rem;
`;

export default ReportPopUp;