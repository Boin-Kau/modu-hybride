import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";

import check_icon from "../../assets/card-check-icon.svg";
import card_plus_icon from "../../assets/card-plus.svg";
import card_img_none from "../../assets/card-active-none.svg";
import card_img_fill from "../../assets/card-active-fill.svg";
import { TitleWrap, InputWrap, ItemWrap, Input } from '../../styled/main/enrollment';


const CardList = () => {

    //props 를 2가지 받아야함. 1개는 카드 등록 리스트, 나머지 1개는 파티가입하는 상황인지, 파티 관리인지. 파티 관리에서는 등록하는 card가 나타나서는 안됨 !

    return (
        <ComponentWrap>

            {/* 카드 리스트 */}
            <CardListWrap>

                <div style={{ minWidth: "1.25rem" }}></div>

                {/* 정보가 있는 카드 컴포넌트 */}
                <CardWrap style={{ display: 'none' }}>
                    <div style={{ position: 'relative', height: '1.4375rem', textAlign: 'center', marginBottom: '0.5rem' }}>
                        <CheckWrap>
                            <img src={check_icon} style={{ position: 'absolute', width: '0.8125rem', height: '0.6875rem', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                        </CheckWrap>
                    </div>

                    <ActiveCard style={{ backgroundImage: `url(${true && card_img_none || card_img_fill})` }}>

                    </ActiveCard>

                </CardWrap>

                {/* 카드 등록하기 컴포넌트 */}
                <CardWrap style={{ display: 'none' }}>
                    <div style={{ position: 'relative', height: '1.4375rem', textAlign: 'center', marginBottom: '0.5rem' }}>
                    </div>
                    <EnrollCard>
                        <EnrollCardTextWrap>
                            <img src={card_plus_icon} style={{ width: '0.6875rem', height: '0.6875rem', marginRight: '0.5625rem' }} />
                            카드 등록하기
                        </EnrollCardTextWrap>
                    </EnrollCard>
                </CardWrap>

                {/* 아무것도 없을때 나오는 초기 컴포넌트 */}
                <CardWrap>
                    <div style={{ position: 'relative', height: '1.4375rem', textAlign: 'center', marginBottom: '0.5rem' }}>
                    </div>
                    <EnrollCard>
                        <EnrollCardTextWrap>
                            등록된 카드가 없습니다 <br />
                            카드를 등록해주세요
                        </EnrollCardTextWrap>
                    </EnrollCard>
                </CardWrap>

                <div style={{ minWidth: "0.625rem" }}></div>

            </CardListWrap>



            {/* 카드 등록 form */}
            <CardEnrollWrap>
                <TitleWrap>
                    <div>카드번호</div>
                </TitleWrap>
                <ItemWrap>
                    <InputWrap>
                        <Input placeholder="카드번호" />
                    </InputWrap>
                </ItemWrap>

                <TitleWrap>
                    <div>유효기간</div>
                </TitleWrap>
                <ItemWrap>
                    <InputWrap>
                        <Input placeholder="MM" />
                    </InputWrap>
                    <InputWrap>
                        <Input placeholder="DD" />
                    </InputWrap>
                </ItemWrap>

                <TitleWrap>
                    <div>비밀번호 앞 2자리</div>
                </TitleWrap>
                <ItemWrap>
                    <InputWrap style={{ marginRight: '0.625rem' }}>
                        <Input type="password" placeholder="비밀번호 앞 2자리" />
                    </InputWrap>

                    <div style={{ flexGrow: '1', flexBasis: '0', border: '1px solid red' }} />
                </ItemWrap>

                <TitleWrap>
                    <div>생년월일 / 사업자번호</div>
                </TitleWrap>
                <ItemWrap>
                    <InputWrap>
                        <Input placeholder="생년월일 6자리 또는 사업자번호 10자리 " />
                    </InputWrap>
                </ItemWrap>

                <div style={{ display: 'flex', marginTop: '3.0625rem' }}>
                    <div style={{ position: 'relative', width: '1.1875rem', height: '1.1875rem', borderRadius: '50%', backgroundColor: '#e3e3e3', marginRight: '0.5625rem' }}>
                        <img src={check_icon} style={{ position: 'absolute', width: '0.6875rem', height: '0.5625rem', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                    </div>
                    <div style={{ fontSize: '0.75rem', lineHeight: '1.3125rem' }}>19세 이상 성인입니다.</div>
                </div>
            </CardEnrollWrap>

        </ComponentWrap >
    )
};


const ComponentWrap = styled.div`
    /* border: 1px solid red; */
`;

const CardListWrap = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

`;

const CardWrap = styled.div`
    flex: 0 0 11.1875rem;

    margin-right:0.625rem;
`;

const BaseCard = styled.div`
    position: relative;
    width:11.1875rem;
    height:6.9375rem;

    border-radius:0.4375rem;
`;

const ActiveCard = styled(BaseCard)`
`;

const EnrollCard = styled(BaseCard)`
    background-color:rgba(227, 227, 227,0.36);
`;

const EnrollCardTextWrap = styled.div`
    position:absolute;

    top:50%;

    transform:translate(0,-50%);

    font-size:0.75rem;
    color:rgba(49, 49, 49,0.3);

    line-height:1.375rem;

    width:100%;
    text-align:center;
`;

const CheckWrap = styled.div`
    position:absolute;
    left:50%;
    transform:translate(-50%,0);

    width:1.4375rem;
    height:1.4375rem;

    border-radius:50%;

    text-align:center;
    
    background-color:#e3e3e3;
`;

const CardEnrollWrap = styled.div`
    margin:0 1.25rem;
`;

export default CardList;