import { useState, useContext } from "react";

import TeminateDuckImg from "../../../assets/character-main-party-ban.svg";
import ReportDuckImg from "../../../assets/character-main-report.svg";

import { DangerWrapPopup, DangerPopup } from "../../../styled/shared";
import { useDispatch, useSelector } from "react-redux";
import { BanishPopupCloseAction } from "../../../reducers/party/popup";
import { ItemWrap, InputWrap } from "../../../styled/main/enrollment";
import styled from "styled-components";

import icon_arrow_down from "../../../assets/icon-arrow-down-gray.svg";
import icon_arrow_up from "../../../assets/icon-arrow-up-gray.svg";


import Fade from 'react-reveal/Fade';
import { customApiClient } from "../../../shared/apiClient";
import { PageTransContext } from "../../../containers/pageTransContext";
import { useHistory } from "react-router-dom";



const BanishPopUp = ({ openStatus }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        banishPartyIdx,
        banishUserList
    } = useSelector(state => state.party.popup);

    const { setPageTrans } = useContext(PageTransContext);


    const [contentPagetatus, setContentPageStatus] = useState(true);
    const [completePagetatus, setCompletePageStatus] = useState(false);

    const [banishUserIdx, setBanishUserIdx] = useState(0);
    const [banishUserName, setBanishUserName] = useState('');

    const [banishUserOpen, setBanishUserOpen] = useState(false);


    const onClickBanishUserOpen = () => {
        setBanishUserOpen(!banishUserOpen);
    };
    const onChangeBanishUser = (idx, name) => {
        setBanishUserIdx(idx);
        setBanishUserName(name);
        setBanishUserOpen(!banishUserOpen);
    }
    const onClickClose = () => {

        dispatch(BanishPopupCloseAction());

        setContentPageStatus(true);
        setCompletePageStatus(false);
        setBanishUserIdx(0);
        setBanishUserName('');
        setBanishUserOpen(false);

        if (completePagetatus) {
            setPageTrans('trans toLeft');
            history.push('/party');
        }
    }
    const onClickBanishUser = async () => {
        if (banishUserIdx === 0 || banishUserName === '') return

        //서버통신
        const data = await customApiClient('delete', `/party/${banishPartyIdx}/user/${banishUserIdx}`);

        //서버에러
        if (!data) return

        //벨리데이션
        if (data.statusCode !== 200) {
            alert(data.message);
            return
        }

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

                        <img src={TeminateDuckImg} style={{ width: '3.9562rem', height: '5.8438rem', margin: '1.25rem 0 1.0313rem 0' }} />
                        <div className="spoqaBold" style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#000000' }}>어떤 구독 파티원을 강제 퇴장할까요?</div>
                        <div className="notoMedium" style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem', marginBottom: '0.5rem' }}>
                            선택한 파티원은 다시 파티에 입장하실 수 <br />
                            없습니다. 신중하게 선택하세요!
                        </div>
                        <div className="notoMedium" style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.75rem', lineHeight: '1.125rem', marginBottom: '0.5625rem' }}>
                                구독 파티원
                            </div>
                            <ItemWrap onClick={() => { onClickBanishUserOpen() }}>
                                <InputWrap openStatus={banishUserOpen} isBlocked={banishUserIdx === 0}>
                                    <div>
                                        {
                                            banishUserIdx !== 0 ? banishUserName :
                                                '구독 파티원을 선택하세요'
                                        }
                                    </div>
                                    <div style={{ flexGrow: "1" }}></div>
                                    <div>
                                        {
                                            banishUserOpen ?
                                                <img src={icon_arrow_up} style={{ width: "0.6875rem", height: "0.5rem" }} /> :
                                                <img src={icon_arrow_down} style={{ width: "0.6875rem", height: "0.5rem" }} />
                                        }
                                    </div>
                                </InputWrap>
                            </ItemWrap>

                            <div style={{ display: 'flex' }}>
                                <div style={{ flexGrow: '1', flexBasis: '0', marginRight: "0.3125rem" }}>
                                    <Fade collapse when={banishUserOpen} duration={500}>
                                        <SelectWrap>

                                            {
                                                banishUserList.map((data, index) => {
                                                    return (
                                                        <SelectContent selectSatus={data.user.idx === banishUserIdx} onClick={() => { onChangeBanishUser(data.user.idx, data.user.name) }} key={index}>
                                                            {data.user.name}
                                                        </SelectContent>
                                                    )
                                                })
                                            }

                                        </SelectWrap>
                                    </Fade>
                                </div>
                            </div>

                        </div>
                        <ButtonWrap onClick={onClickBanishUser} className="spoqaBold" isComplete={banishUserIdx !== 0 && banishUserName !== ''}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#ffffff', fontSize: '0.8125rem' }}>해당 구독원 강제 퇴장</div>
                        </ButtonWrap>
                    </div>

                }

                {
                    completePagetatus &&
                    <div>
                        <img src={ReportDuckImg} style={{ width: '3.9562rem', height: '5.8438rem', margin: '1.25rem 0 1.0313rem 0' }} />
                        <div className="spoqaBold" style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#000000' }}>선택하신 구독파티원을 강제 퇴장했습니다.</div>
                        <div className="notoMedium" style={{ fontSize: '0.75rem', opacity: '0.4', lineHeight: '1.3125rem', marginBottom: '0.5rem' }}>
                            선택하신 구독파티원은 자동으로 구독파티에 <br />
                            강제퇴장됩니다. 감사합니다.
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


const ButtonWrap = styled.div`
    position: relative;
    background-color: ${props => props.isComplete ? '#ffbc26' : '#e3e3e3'};
    border-radius: 0.375rem;
    height: 2.4375rem;
    margin-top: 1rem;
`;

export default BanishPopUp;