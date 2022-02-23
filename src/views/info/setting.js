import React, { useCallback, useState, useEffect, useContext } from 'react';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import icon_back from "../../assets/icon-back-arrow.svg";

import { TextMiddle } from '../../styled/shared';

import { IsAlertUpdate, IsMarketingUpdate, UserInfoUpdate } from '../../reducers/info/user';
import { customApiClient } from '../../shared/apiClient';
import { MessageWrapOpen, MessageOpen, MessageClose, MessageWrapClose } from '../../reducers/container/message';
import { useHistory } from 'react-router-dom';
import { BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { PageTransContext } from '../../containers/pageTransContext';
import { GAEventSubmit, GA_CATEOGRY, GA_SYSTEM_ACTION } from '../../shared/gaSetting';


const SettingPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        isAlert,
        isMarketing,
        marketingUpdatedAt
    } = useSelector(state => state.info.user);

    //context
    const { setPageTrans } = useContext(PageTransContext);

    const [requestCount, setRequestCount] = useState(0);
    const [requestBlock, setRequestBlock] = useState(false);

    const [versonName, setVersonName] = useState('');
    const [isRecentVerson, setIsRecentVerson] = useState(false);

    //첫 로딩시 실행 로직
    useEffect(async () => {

        dispatch(BottomNavCloseAction);

        //앱 버전 체크
        const verson = localStorage.getItem('versonName');
        setVersonName(verson);

        //유저 정보
        if (!isAlert || !isMarketing || !marketingUpdatedAt) {
            const data = await customApiClient('get', '/user/jwt');

            if (data == 'Network Error') {
                history.push('/inspection');
                return
            }

            //벨리데이션
            if (!data || data.statusCode != 200) {
                localStorage.removeItem('x-access-token');
                history.push('/login');
                return
            }

            dispatch({
                type: UserInfoUpdate,
                data: data.result
            })
        }

    }, [])

    //최신버전 검사
    useEffect(() => {

        //최신
        if (versonName == '2.0.1') {
            setIsRecentVerson(true);
        }
        else {
            setIsRecentVerson(false);
        }

    }, [versonName])

    const closePage = () => {
        setPageTrans('trans toLeft');
        history.goBack();
    };

    const onClickRadio = useCallback(async () => {

        if (requestBlock) {
            showMessage();
            return
        }

        //서버통신
        const res = await customApiClient('put', `/user/alert`);
        setRequestCount(requestCount + 1);

        //서버에러
        if (!res) return

        //벨리데이션
        if (res.statusCode != 200) {
            alert('오류가 발생하였습니다. 잠시후 다시 시도해주세요.');
            return
        }

        //store 변경
        if (isAlert == 'Y') {
            dispatch({
                type: IsAlertUpdate,
                data: 'N'
            })
            GAEventSubmit(GA_CATEOGRY.SYSTEM, GA_SYSTEM_ACTION.PUSHNOTIOFF);
        }
        else {
            dispatch({
                type: IsAlertUpdate,
                data: 'Y'
            })
            GAEventSubmit(GA_CATEOGRY.SYSTEM, GA_SYSTEM_ACTION.PUSHNOTION);
        }


    }, [isAlert, requestBlock]);

    const onClickMarketingRadio = useCallback(async () => {

        if (requestBlock) {
            showMessage();
            return
        }

        let today = new Date();

        let year = today.getFullYear();
        let month = new String(today.getMonth() + 1);
        let day = new String(today.getDate());

        // 한자리수일 경우 0을 채워준다. 
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }

        const currentDate = year + '-' + month + '-' + day;

        //서버통신
        const res = await customApiClient('put', `/user/alert/marketing`);
        setRequestCount(requestCount + 1);

        //서버에러
        if (!res) return

        //벨리데이션
        if (res.statusCode != 200) {
            alert('오류가 발생하였습니다. 잠시후 다시 시도해주세요.');
            return
        }

        //store 변경
        if (isMarketing == 'Y') {
            dispatch({
                type: IsMarketingUpdate,
                data: {
                    isMarketing: 'N',
                    marketingUpdatedAt: currentDate
                }
            })
            GAEventSubmit(GA_CATEOGRY.SYSTEM, GA_SYSTEM_ACTION.MARKETINGNOTIOFF);
        }
        else {
            dispatch({
                type: IsMarketingUpdate,
                data: {
                    isMarketing: 'Y',
                    marketingUpdatedAt: currentDate
                }
            })
            GAEventSubmit(GA_CATEOGRY.SYSTEM, GA_SYSTEM_ACTION.MARKETINGNOTION);
        }


    }, [isMarketing, requestBlock]);

    //악의적인 request 방지
    useEffect(() => {
        if (requestCount > 6) {

            //10초뒤 초기화
            setRequestBlock(true);
            setTimeout(() => {
                setRequestCount(0);
                setRequestBlock(false);
            }, 10000);
        }
    }, [requestCount]);

    const showMessage = () => {
        dispatch({
            type: MessageWrapOpen
        })
        dispatch({
            type: MessageOpen,
            data: '잠시후 다시 시도해주세요.'
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
    }

    return (
        <div className="page">
            <PageWrap>

                <HeaderWrap id="back_link" className="spoqaBold" onClick={closePage}>
                    <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                        <img src={icon_back}></img>
                    </div>
                    <TextMiddle>설정</TextMiddle>
                </HeaderWrap>

                <div style={{ padding: '0.875rem 1.25rem 0 1.25rem' }}>
                    <div style={{ position: 'relative', paddingBottom: '1.875rem' }}>
                        <div className="spoqaBold" style={{ fontSize: '0.8125rem', marginBottom: '0.3125rem' }}>서비스 알림</div>
                        <div className="notoMedium" style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>구독 결제일 알림, 업데이트 안내 등</div>

                        <AlertRadioButtonWrap onClick={onClickRadio} isAlert={isAlert == 'Y'}>
                            <AlertRadioGrow isAlert={isAlert != 'Y'} />
                            <AlertRadioButton />
                            <AlertRadioGrow isAlert={isAlert == 'Y'} />
                        </AlertRadioButtonWrap>
                    </div>
                    <div style={{ position: 'relative', paddingBottom: '1.875rem', borderBottom: '0.0437rem solid rgba(0,0,0,0.06)' }}>
                        <div className="spoqaBold" style={{ fontSize: '0.8125rem', marginBottom: '0.3125rem' }}>마케팅 정보 수신 동의</div>
                        <div className="notoMedium" style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                            마케팅 정보 수신 {isMarketing == 'Y' ? '동의' : '해제'} {marketingUpdatedAt}
                        </div>

                        <AlertRadioButtonWrap onClick={onClickMarketingRadio} isAlert={isMarketing == 'Y'}>
                            <AlertRadioGrow isAlert={isMarketing != 'Y'} />
                            <AlertRadioButton />
                            <AlertRadioGrow isAlert={isMarketing == 'Y'} />
                        </AlertRadioButtonWrap>
                    </div>
                    <div style={{ display: 'flex', marginTop: '1.875rem', marginBottom: '0.25rem', fontSize: '0.8125rem' }}>
                        <div className="spoqaBold" style={{ flexGrow: '1' }}>버전 정보</div>
                        <div className="spoqaBold" style={{ color: '#ffbc26' }}>
                            {
                                versonName ? versonName : '알수없음'
                            }
                        </div>
                    </div>
                    <div className="notoMedium" style={{ fontSize: '0.75rem', lineHeight: '1.3125rem', color: 'rgba(49,49,49,0.4)' }}>
                        {
                            isRecentVerson ? '최신 버전 사용 중' : '업데이트가 필요합니다'
                        }
                    </div>
                </div>

            </PageWrap>
        </div>
    )
};

const PageWrap = styled.div`

    position:absolute;
    top:3.0625rem;
    left:0;
    right:0;
    bottom:0;

    display:flex;
    flex-direction:column;

    overflow-y:scroll;

    background-color: #ffffff;
`;

const HeaderWrap = styled.div`
    position: fixed;
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

const AlertRadioButtonWrap = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    width: 2.75rem;
    padding: 0.125rem;
    background-color:${props => props.isAlert ? '#ffca17' : '#e3e3e3'} ;
    border-radius: 0.9688rem ;
`;
const AlertRadioButton = styled.div`
    width: 1.375rem;
    height: 1.4375rem;
    background-color: #ffffff;
    border-radius: 50%;
`;
const AlertRadioGrow = styled.div`
    transition: all 200ms ease-out;
    flex-grow:${props => props.isAlert ? '0' : '1'} ;
`;

export default SettingPage;