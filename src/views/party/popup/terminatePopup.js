import { useState, useContext } from "react";

import ReportDuckImg from "../../../assets/character-main-report.svg";
import TeminateDuckImg from "../../../assets/character-main-party-ban.svg";

import { DangerWrapPopup, DangerPopup } from "../../../styled/shared";
import { useDispatch, useSelector } from "react-redux";
import { TerminatePopupCloseAction } from "../../../reducers/party/popup";
import styled from "styled-components";

import { customApiClient } from "../../../shared/apiClient";
import { useHistory } from "react-router-dom";
import { PageTransContext } from "../../../containers/pageTransContext";
import { GAEventSubmit, GA_CATEOGRY, GA_PARTY_ACTION } from "../../../shared/gaSetting";



const TerminatePopUp = ({ openStatus }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        terminatePartyIdx,
        terminatePartyRole
    } = useSelector(state => state.party.popup);

    const { setPageTrans } = useContext(PageTransContext);


    const [contentPagetatus, setContentPageStatus] = useState(true);
    const [completePagetatus, setCompletePageStatus] = useState(false);

    const onClickClose = () => {
        dispatch(TerminatePopupCloseAction());

        setContentPageStatus(true);
        setCompletePageStatus(false);

        if (completePagetatus) {
            setPageTrans('trans toLeft');
            history.push('/party');
        }
    }

    const onClickTerminate = async () => {

        //서버통신
        const data = await customApiClient('delete', `/party/${terminatePartyIdx}?userRole=${terminatePartyRole}`);

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode !== 200) {
            alert(data.message);
            return
        }

        GAEventSubmit(GA_CATEOGRY.PARTY, GA_PARTY_ACTION.LEAVE);

        //콘텐츠 전환
        setContentPageStatus(false);
        setCompletePageStatus(true);
    }

    return (
        <DangerWrapPopup openStatus={openStatus}>

            {/* 파티 탈퇴 컨텐츠 */}
            <DangerPopup openStatus={openStatus} style={{ zIndex: '10', left: '1.125rem', right: '1.125rem', transform: 'translate(0,-50%)' }}>


                {
                    contentPagetatus &&
                    <div>

                        <img src={TeminateDuckImg} style={{ width: '4.5625rem', height: '6.7188rem', margin: '1.7625rem 0 1.6438rem 0' }} alt="duckImg" />
                        <div className="spoqaBold" style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#000000' }}>구독 파티 나가기를 나가실건가요?</div>
                        <div className="notoMedium" style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem', marginBottom: '0.5rem' }}>
                            파티를 나가시면 다시 파티에 입장하실 수 <br />
                            없습니다. 신중하게 선택하세요!
                        </div>
                        <ButtonWrap onClick={onClickTerminate} className="spoqaBold" isComplete>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>파티 나가기</div>
                        </ButtonWrap>
                    </div>

                }

                {
                    completePagetatus &&
                    <div>
                        <img src={ReportDuckImg} style={{ width: '3.9562rem', height: '5.8438rem', margin: '1.25rem 0 1.0313rem 0' }} alt="duckImg" />
                        <div className="spoqaBold" style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#000000' }}>선택하신 구독파티를 나가셨습니다.</div>
                        <div className="notoMedium" style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem', marginBottom: '0.5rem' }}>
                            종료된 파티는 내파티에서 확인 가능합니다. <br />
                            내파티를 확인해주세요!
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


const ButtonWrap = styled.div`
    position: relative;
    background-color: ${props => props.isComplete ? '#ffbc26' : '#e3e3e3'};
    border-radius: 0.375rem;
    height: 2.4375rem;
    margin-top: 1rem;
`;

export default TerminatePopUp;