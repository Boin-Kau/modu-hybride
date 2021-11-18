import React, { useEffect } from 'react';
import styled from 'styled-components';
import icon_notion from "../../assets/party-notion.svg";
import duck_notion from "../../assets/saft-duck.gif";
import duck_con from "../../assets/safe-con@3x.png";

// import { useHistory } from 'react-router-dom';
import { onClickTerminate, checkMobile } from '../../App';
// import { LoginButton } from '../../styled/shared';
import { DetailButton } from '../../styled/main';
import { BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { useDispatch } from 'react-redux';

const Inspection = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const userPlatform = checkMobile();
        dispatch(BottomNavCloseAction);

        if (userPlatform == 'android') {

            //splash close 함수 호출
            try {
                window.android.closeSplash();
            }
            catch (err) {
                console.log(err);
            }

        }
        else if (userPlatform == 'ios') {

            //splash close 함수 호출
            try {
                window.webkit.messageHandlers.setColorGray.postMessage("hihi");
                window.webkit.messageHandlers.closeSplash.postMessage("hihi");
            }
            catch (err) {
                console.log(err);
            }

        }

    }, []);


    const onClickTerminateService = () => {

        const userPlatform = checkMobile();

        if (userPlatform == 'android') {

            //종료 함수 호출
            try {
                window.android.terminateService();
            }
            catch (err) {
                console.log(err);
            }

        }
        else if (userPlatform == 'ios') {

            //종료 함수 호출
            try {
                window.webkit.messageHandlers.terminateService.postMessage("hihi");
            }
            catch (err) {
                console.log(err);
            }

        }
    }

    return (
        <>
            <div className="page" style={{ backgroundColor: "#e3e3e3" }}>
                <PageWrap>
                    <div id="back_link" onClick={onClickTerminate} style={{ display: 'none' }}></div>

                    <div style={{ margin: '2.125rem 2rem 0 2rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', padding: '1.5rem 1.375rem', color: '#313131' }}>
                        <div className="spoqaBold" style={{ display: 'flex', fontSize: '1.375rem', marginBottom: '0.875rem' }}>
                            <div>
                                점검중 입니다.
                            </div>
                            <div style={{ marginLeft: '0.625rem' }}>
                                <img src={icon_notion} style={{ width: '1.5625rem', height: '1.4375rem', marginTop: '5px' }} />
                            </div>
                        </div>
                        <div className="notoRegular" style={{ fontSize: '0.875rem', lineHeight: '1.4375rem', wordBreak: 'keep-all' }}>
                            설문조사 및 유저 피드백을 바탕으로 업데이트를
                            진행합니다. 모두 서버 및 기능 업데이트를 완료중
                            이니 조금만 기다려주세요.
                            <br /><br />
                            새롭게 찾아올 '모두' 기대해주세요!
                        </div>

                        <DetailButton onClick={onClickTerminateService} className="spoqaBold" revise style={{ marginTop: '1.5rem' }}>
                            <div style={{ position: "relative", textAlign: 'center', width: '100%' }}>
                                <div>모두 종료하기</div>
                            </div>
                        </DetailButton>
                    </div>
                    <div style={{ display: 'flex', margin: '0 2rem 1.4375rem 2rem' }}>
                        <div style={{ flexGrow: '1' }}></div>
                        <ChatArrow />
                        <div style={{ width: '4.9375rem' }}></div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flexGrow: '1.5' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flexGrow: '1' }}></div>
                            <div>
                                <img src={duck_con} style={{ width: '8.75rem', height: '4.5625rem' }} />
                            </div>
                        </div>
                        <div>
                            <img src={duck_notion} style={{ height: '11.875rem', marginLeft: '1.5rem' }} />
                        </div>
                        <div style={{ flexGrow: '1' }}></div>
                    </div>

                </PageWrap>
            </div>

        </>
    )
};

const PageWrap = styled.div`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:2.9063rem;
`;

const ChatArrow = styled.div`
    width: 0px;height: 0px;
    border-top:0.6875rem solid #ffffff;
    border-bottom:0.6875rem solid transparent;
    border-right: 0.5313rem solid #ffffff;
    border-left: 0.5313rem solid transparent;
`;

export default Inspection;