import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";

import { useDispatch } from "react-redux";

import icon_back from "../../assets/icon-back-arrow.svg";

import { TextMiddle } from '../../styled/shared';
import { PageTransContext } from '../../containers/pageTransContext';
import { BottomNavCloseAction } from '../../reducers/container/bottomNav';
import { useHistory } from 'react-router-dom';


const AgreePage = ({ history: historyProp }) => {

        const dispatch = useDispatch();
        const history = useHistory();

        //context
        const { setPageTrans } = useContext(PageTransContext);

        //state
        const [title, setTitle] = useState('');

        useEffect(() => {

                switch (historyProp.location.state) {
                        case 'serviceDetail': {
                                setTitle('서비스 이용약관');
                                break
                        }
                        case 'personDetail': {
                                setTitle('개인정보 처리방침');
                                break
                        }
                        default: {
                                break
                        }
                }

                dispatch(BottomNavCloseAction);

        }, [])

        const closePage = useCallback(() => {
                setPageTrans('trans toLeft');
                history.goBack();
        }, []);

        return (

                <div className="page">

                        <PageWrap id="content">
                                <HeaderWrap id="back_link" className="spoqaBold" onClick={closePage}>
                                        <div style={{ position: "absolute", top: "55%", left: "1.25rem", transform: "translate(0,-55%)" }}>
                                                <img src={icon_back}></img>
                                        </div>
                                        <TextMiddle>
                                                {title}
                                        </TextMiddle>
                                </HeaderWrap>

                                {/* 이용약관 */}
                                <AgreeContentWrap className="notoRegular" style={historyProp.location.state == 'serviceDetail' ? { display: 'block' } : { display: 'none' }}>
                                        <p>서비스 이용 약관</p>
                                        <p>사용자 여러분 안녕하세요.</p>
                                        <p>항상 저희 서비스를 이용해 주셔서 감사합니다. 구독 관리 서비스를 제공하는 모두가 준비한 약관을 읽어주시면 감사드리겠습니다.</p>
                                        <p>제 1조(목적)</p>
                                        <p>&nbsp;본 약관은 팀모두(이하 &ldquo;회사&rdquo;라고 함)가 제공하는 &lsquo;모두 - 나의 구독 서비스 관리&rsquo;(이하 &ldquo;모두 앱&rdquo;이라고 함)를 이용함에 있어 회사와 이용자의 권리ㆍ의무 및 책임사항, 서비스의 이용과 절차, 기타 필요한 사항을 목적으로 합니다.</p>
                                        <p>제 2조(정의)</p>
                                        <p>&nbsp;① 서비스 : 회사의 어플리케이션 및 웹 사이트를 통해 사용자에게 제공하는 모든 서비스를&nbsp;</p>
                                        <p>말합니다.</p>
                                        <p>&nbsp;② 회원 : 이 약관에 승인하고 회사와 서비스 이용계약을 체결한 자를 말합니다.</p>
                                        <p>&nbsp;③ 비회원 : 회원가입을 하지 않고 회사가 제공하는 서비스를 이용하는 모든 고객을&nbsp;</p>
                                        <p>말합니다.</p>
                                        <p>&nbsp;④ 사용자 : 회원과 비회원을 합한 모든 고객</p>
                                        <p>제 3조(약관 등의 명시와 설명 및 개정)</p>
                                        <p>회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스가 제공되는 모바일 어플리케이션 및 웹 사이트에 게시합니다.</p>
                                        <p>회사는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</p>
                                        <p>본 약관이 변경되는 경우 변경 사항을 서비스 공지사항 화면에 게시하며, 변경 된 약관은 게시한 날로부터 7일 후부터 효력이 발생합니다.</p>
                                        <p>변경된 약관을 게시한 날로부터 효력이 발생되는 날까지 약관변경에 대한 사용자의 의견을 기다릴 것이며, 위 기간이 지나도록 사용자의 의견이 접수되지 않으면, 사용자가 변경된 약관에 따라 서비스를 이용하는 데 동의하는 것으로 보겠습니다.</p>
                                        <p>사용자가 변경된 약관에 동의하지 않는 경우 해당 서비스의 이용이 더 이상 불가능하게 됩니다.</p>
                                        <p>제 4조(서비스의 이용계약의 성립)</p>
                                        <p>회사가 제공하는 서비스에 관한 이용계약</p>
                                        <p>이용신청자는 실명으로 가입신청을 하여야 하며, 실명이 아니거나 타인의 정보를 도용하여 회원으로 가입한 자는 회사가 제공하는 서비스를 이용할 수 없으며, 이용하여서도 안됩니다.</p>
                                        <p>회사와 회원 사이 서비스 이용계약은 이용하고자 하는 자가 애플리케이션 또는 웹 사이트를 통해 회사가 정한 양식에 따라 회원가입을 하고, &ldquo;이용약관&rdquo;과 &ldquo;개인정보 처리방침&rdquo;, &ldquo;개인 정보 수집, 이용 동의서&rdquo;의 내용에 동의를 해 회사가 승낙하며 이뤄집니다.</p>
                                        <p>회사는 가입신청자의 신청에 대하여 서비스 이용을 승낙함을 원칙으로합니다. 단, 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.</p>
                                        <p>다른 사람의 명의나 휴대전화 번호 등 개인정보를 이용해 계정을 생성하려 한 경우</p>
                                        <p>가입신청자가 이 약관에 의해 이전에 회원자격을 상실한 적이 있는 경우</p>
                                        <p>허위 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</p>
                                        <p>사기 정보 모음 사이트나 정부기관 사이트 등에서 거래 사기 이력이 있는 휴대전화 번호로 확인된 경우</p>
                                        <p>회원의 이용 목적이나 서비스 이용 방법이 회사의 재산권이나 영업권을 침해하거나 침해할 우려가 있는 경우</p>
                                        <p>회사의 정책에 적합하지 않는 회원으로 판단되는 경우 또는 서비스 제공이 곤란한 경우</p>
                                        <p>부정한 용도로 서비스를 사용하고자 하는 경우</p>
                                        <p>이용자의 귀책 사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</p>
                                        <p>제 5조(서비스의 중단)</p>
                                        <p>서비스는 장비의 유지ㆍ보수를 위한 정기 또는 임시 점검 또는 다른 상당한 이유로 서비스의 제공이 일시 중단될 수 있으며, 이때는 미리 공지하겠습니다. 만약, 예측할 수 없는 이유로 서비스가 중단된다면 상황을 파악하는 즉시 통지하도록 하겠습니다.</p>
                                        <p><br /><br /></p>
                                        <p>제 6조(이용신청 및 체결)</p>
                                        <p>서비스를 이용하고자 하는 자는 회사가 온라인으로 제공하는 가입신청양식에 따라 사실대로 기재하여야 합니다. 또한, 휴대번호를 이용한 본인인증 절차를 필요로 합니다.</p>
                                        <p>서비스 이용을 위해 필요한 개인 정보의 수집과 이용에 대한 동의를 받을 수 있습니다.</p>
                                        <p>가입 신청자가 1,2항에 정한 사항을 거부할 경우 회원가입 및 서비스 이용이 제한될 수 있으며, 타인의 정보를 도용하여 회원으로 가입한 자는 서비스를 이용할하여서는 안 됩니다.</p>
                                        <p>회원은 회원 가입 시 기재한 개인정보의 내용에 변경이 발생한 경우, 변경사항을 정정하여 기재하여야 합니다. 변경의 지체로 인해 발생한 회원의 불이익에 회사는 책임을 지지 않습니다.</p>
                                        <p>제 7조(이용계약의 종료)</p>
                                        <p>사용자는 서비스의 이용을 더 이상 원치 않을 때에는 언제든지 애플리케이션 내에서 제공되는 메뉴를 이용하여 서비스 이용계약의 해지 신청을 할 수 있으며, 회사는 법령이 정하는 바에 따라 신속히 처리합니다.</p>
                                        <p>이용계약은 회원의 해지의사가 회사에게 도달한 때에 종료됩니다.</p>
                                        <p>이용계약이 해지되면 법령 및 개인정보처리방침에 따라 사용자 정보를 보유하는 경우를 제외하고는 사양자 정보나 사용자가 작성한 게시물 등 모든 데이터는 삭제됩니다. 다만, 다른 회원에 의해 스크랩되어 등록된 게시물은 삭제되지 않습니다.</p>
                                        <p>제 4조 4항에 의한 이유에 의해서 회사가 계약을 해지할 수 있습니다.</p>
                                        <p>제 8조(회원에 대한 통지)</p>
                                        <p>회사가 회원에 대한 통지를 하는 경우, 회원이 지정한 휴대전화 번호로 통지합니다.</p>
                                        <p>회사는 불특정다수 회원에 대한 통지의 경우 1주일간 공지사항에 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.</p>
                                        <p>제 9조(회사의 의무)</p>
                                        <p>회사는 계속적이고 안정적인 서비스를 제공하기 위해 최선을 다합니다.</p>
                                        <p>회사는 회원이 안전하게 서비스를 이용할 수 있도록 제공하는 서비스에 적합한 보안시스템을 갖추고 운영합니다.</p>
                                        <p>회사는 회원으로부터 제기되는 불만이 정당하다고 인정할 경우 이를 처리하여야 합니다. 이때 처리과정을 회원에게 전달합니다.</p>
                                        <p>회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 전자상거래법 등의 서비스의 운영, 유지와 관련 있는 법규를 준수합니다.</p>
                                        <p>제 10조(회원의 의무)</p>
                                        <p>회원의 휴대폰번호의 관리책임은 회원에게 있으며, 이를 제3자가 이용하도록 해서는 안됩니다.</p>
                                        <p>회원은 다음 건에 해당하는 행위를 해서는 안됩니다.</p>
                                        <p>이용 신청 또는 회원정보 변경 시 허위내용 등록</p>
                                        <p>타인의 정보를 도용</p>
                                        <p>회사가 게시한 정보의 변경</p>
                                        <p>운영자, 회사를 사칭 및 정보를 도용</p>
                                        <p>회사와 다른 회원을 위협하거나 명예를 손상시키는 행위</p>
                                        <p>해킹을 통해 다른 사용자의 정보를 취득하는 행위</p>
                                        <p>기타 현행 법령에 위반되는 불법적인 행위</p>
                                        <p>회사와 기타 제 3자의 저작권, 영업비밀, 특허권 등 지적재산권에 대한 침해</p>
                                        <p>회원은 이 약관의 규정, 이용안내 및 서비스와 관련한 공지사항, 주의사항, 회사가 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 해서는 안 됩니다.</p>
                                        <p>회원은 회사의 사전 허락 없이 회사가 정한 이용 목적과 방법에 반하여 영업/광고활동 등을 할 수 없고, 회원의 서비스 이용이 회사의 재산권, 영업권 또는 비즈니스 모델을 침해하여서는 안됩니다.</p>
                                        <p>회원은 회사의 명시적 사전 동의가 없는 한 서비스의 이용권한 및 기타 이용계약 상의 지위를 본인을 제외한 제3자에게 양도, 증여, 대여할 수 없으며 이를 담보로 제공할 수 없습니다.</p>
                                        <p>제 11조(회원정보의 변경)</p>
                                        <p>회원이 직접 입력하거나 회원의 동의 하에 수집되는 정보가 변경되었을 경우, 회원은 변경사항을 수정해야합니다.</p>
                                        <p>회원정보가 변경되었음에도 해당 사항을 수정하지 않아 발생한 각종 손해 또는 잘못된 수정으로 인한 손해에 대해 회사는 아무런 책임을 지지 않습니다.</p>
                                        <p>제 12조(서비스의 제공 및 변경)</p>
                                        <p>회사는 다음과 같은 서비스를 제공합니다.</p>
                                        <p>사용자가 등록한 구독 서비스 관리</p>
                                        <p>구독 서비스명</p>
                                        <p>결제 금액</p>
                                        <p>멤버십 종류</p>
                                        <p>카테고리</p>
                                        <p>결제주기</p>
                                        <p>체험기간</p>
                                        <p>다음 결제일</p>
                                        <p>구독 서비스 결제일 전 푸시알림</p>
                                        <p>사용자의 소비내역 분석</p>
                                        <p>사용중인 구독 서비스 카테고리별 이용 현황 표출</p>
                                        <p>이번 달 결제 예정 비용 표출</p>
                                        <p>저번달 결제 금액, 다음달 결제 예정 금액 표출</p>
                                        <p>인기있는 구독 서비스 추천</p>
                                        <p>사용자 정보 변경</p>
                                        <p>이름 변경</p>
                                        <p>전화번호 변경</p>
                                        <p>사용자간 구독파티 모집 공간 제공</p>
                                        <p>구독파티 개설</p>
                                        <p>구독파티 참여</p>
                                        <p>구독파티 나가기</p>
                                        <p>파티 오픈채팅방 참여하기</p>
                                        <p>구독파티 신고하기</p>
                                        <p>참여중인 파티 리스트 보기</p>
                                        <p>종료된 파티 리스트 보기</p>
                                        <p>회사는 전항의 서비스 내용을 추가하거나 변경할 수 있으며, 변경이 예정된 경우 내용을 미리 사용자에게 통지합니다.</p>
                                        <p>회사가 제공하는 서비스의 형태와 기능, 디자인 등은 필요한 경우 수시로 변경되거나 중단될 수 있습니다. 회사는 이 경우 개별적인 변경에 대해서는 회원에게 사전 통지하지 않습니다. 단, 회원에게 불리할 것이라 판단되는 내용에 경우 푸시알림 또는 휴대폰 메시지를 통해 미리 공지합니다.</p>
                                        <p>서비스가 변경 및 중단될 경우 무료 제공되는 서비스에 대해서는 회원에게 별도로 보상하지 않습니다.</p>
                                        <p>제 13조(서비스의 제한 및 중단)</p>
                                        <p>회사는 천재지변이나 국가비상사태, 해결이 곤란한 기술적 결함 또는 서비스 운영의 심각한 변화 등 불가항력적인 경우가 발생 또는 발생이 예상될 때는 서비스의 전부 또는 일부를 예고 없이 제한하거나 중지할 수 있습니다.</p>
                                        <p>회사는 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간 서비스를 제공합니다. 단, 정보통신설비 시스템 정기점검, 서버의 증설 및 교체, 버그 패치, 새로운 서비스로의 교체 등 운영상 필요한 경우, 일정기간 동안 서비스를 일시 중지할 수 있습니다.</p>
                                        <p>서비스를 이용하게 됨으로써 이용약관에 명시된 사항 및 서비스 영역 외에서 발생하는 회원 사이의 문제에 대해 회사는 책임을 지지 않습니다.</p>
                                        <p>회원의 관리 소홀에 의해 본인인증이 되어 서비스 이용상의 데이터 손실 및 변조 또는 손해가 발생하거나 제 3자에 의한 부정이용 등으로 회원의 의무조항을 위반한 경우 해당 아이디의 이용이 제한될 수 있습니다.</p>
                                        <p>회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 공지사항에 공시한 바에 따릅니다.</p>
                                        <p>사용자가 본 약관에 위배되는 행동을 한 경우, 서비스 이용 제한 및 동의 없이 이용계약을 해지할 수 있습니다.</p>
                                        <p>제 14조(서비스 고지 및 광고의 게재)</p>
                                        <p>회사는 서비스 운영과 관련하여 회원이 입력한 정보를 활용해 광고를 게재할 수 있습니다. 회원은 서비스 이용 시 노출되는 맞춤 광고 게재에 대해 동의합니다.</p>
                                        <p>회사는 사전 동의를 한 회원에 한해 마케팅 관련 정보 송신을 할 수 있습니다.</p>
                                        <p>회사는 광고에 회원이 참여해 제 3자와 거래를 함으로써 발생하는 손실과 손해에 대해서는 어떠한 책임도 부담하지 않습니다.</p>
                                        <p>회사의 &lsquo;구독파티&rsquo; 기능은 콘텐츠 서비스를 제공하는 당사자가 아닌, 공유계정 주선과 중개를 제공하는 기능입니다.</p>
                                        <p>회사는 회원의 콘텐츠 서비스 이용약관과 이용 가능 범위 위반에 관하여 책임을 갖지 않습니다.</p>
                                        <p>제 15조(저작권의 귀속 및 이용제한)</p>
                                        <p>&nbsp;사용자가 게시한 게시물 등의 저작권은 해당 게시물의 저작자에게 귀속됩니다.</p>
                                        <p>사용자의 게시물이 정보통신망법 및 저작권법 등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며, 회사는 관련법에 따라 조치를 취하여야 합니다.</p>
                                        <p>게시물 등은 사이트를 통해 노출될 수 있으며, 검색결과 또는 관련 프로모션 등에도 노출될 수 있습니다. 해당 노출을 위해 필요한 범위내에서 일부 수정, 복제, 편집되어 게시될 수 있습니다. 이 경우, 회사는 저작권법 규정을 준수하며, 사용자는 언제든지 고객 문의를 통해 해당 게시물 등에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 회사에 요청할 수 있습니다.</p>
                                        <p><br /><br /></p>
                                        <p>제 16조(손해배상)</p>
                                        <p>회사의 과실로 인하여 사용자가 손해를 입게 될 경우 법령에 따라 사용자의 손해를 배상하여야 합니다. 단, 회사의 제휴사가 제공하는 서비스의 하자로 인한 피해, 서비스에 접속 또는 이용과정에서 발생하는 개인적인 손해, 제 3자가 불법으로 회사의 서버에 접속해 서버를 이용해 발생하는 손해 등에 대하여 책임을 부담하지 않습니다. 또한 법률상 허용되는 한도 내에서 간접 손해, 특별 손해, 결과적 손해, 징계적 손해, 및 징벌적 손해에 대한 책임을 부담하지 않습니다.</p>
                                        <p>사용자가 이 약관의 의무를 위반함으로 인해 회사에 손해를 입힌 경우 또는 사용자가 서비스의 이용과 관련해 회사에 손해를 입힌 경우 회사에 대하여 손해를 배상하여야 합니다.</p>
                                        <p>사용자가 서비스를 이용함에 있어 행한 불법행위 또는 본 약관을 위반한 행위로 회사가 당해 제 3자로부터 손해배상청구 또는 소송 등 각종 불이익을 받는 경우, 해당 이용자는 자신의 책임과 비용으로 회사를 면책시켜야 하며, 회사가 면책되지 못한 경우 해당 사용자는 그에따라 회사에 발생한 모든 손해를 배상할 책임이 있습니다.</p>
                                        <p>제 17조(책임의 한계)</p>
                                        <p>회사는 회원의 약관, 서비스 이용 방법 및 이용 기준을 준수하지 않는 등 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</p>
                                        <p>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임을 부담하지 않습니다.</p>
                                        <p>회사는 사전에 공지된 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 서비스가 중지되거나 장애가 발생한 경우에 대하여 책임이 면책됩니다.</p>
                                        <p>회사는 서비스를 통하여 게재된 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 보증하지 않습니다.</p>
                                        <p>회사는 회원 간 또는 회원과 제 3자 상호간에 서비스를 매개로 하여 거래 등을 한 경우에 대하여 책임을 부담하지 않습니다.</p>
                                        <p>회사는 무료로 제공되는 서비스 이용관 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.</p>
                                        <p>회사는 회원이 서비스를 이용하여 기대하는 효용을 얻지 못한 것에 대해 책임을 지지 않으며 서비스에 대한 취사 선택 또는 이용으로 발생하는 손해 등에 대하여 책임이 면제됩니다.</p>
                                        <p>회원은 자신의 결정에 의하여 회사의 서비스를 사용하여 특정 프로그램이나 정보 등을 다운로드 받거나 접근함으로써 입게 되는 컴퓨터 시스템상의 손해나 데이터, 정보의 상실에 대한 책임을 집니다.</p>
                                        <p>회원의 컴퓨터 오류, 신상정보의 부정확한 기재, 고유번호 관리의 소홀 등 회원의 귀책사유로 인해 손해가 발생한 경우에 대하여 회사는 책임을 지지 않습니다.</p>
                                        <p>회사는 회원의 회원의 컴퓨터, 모바일 기기 환경 문제나 회사의 관리 범위에 있지 아니한 보안 문제로 인해 발생하는 제반 문제 또는 현재의 보안기술 수준으로 방어가 힘든 네트워크 해킹 등 회사의 귀책사유 없이 발생하는 문제에 대해 책임을 지지 않습니다.</p>
                                        <p>회사는 회원 상호간 또는 회원과 제3자 상호 간에 서비스를 매개로 발생한 이용약관에 명시되어 있지 않은 분쟁에 대해 개입할 의무가 없으며 이로 인한 손해를 배상할 책임도 없습니다.</p>
                                        <p>회사는 기간통신회사가 전기통신서비스를 중지하거나 정상적으로 제공하지 아니해 손해가 발생한 경우에 대해 책임이 면제됩니다.</p>
                                        <p>제 18조(사용자 의견)</p>
                                        <p>사용자는 언제든지 1:1 문의(카카오톡 채널)를 통해 회사에 의견을 보낼 수 있습니다. 회사는 회원에게 푸시 알림, 카카오톡 채널, 휴대폰 메시지 등으로 여러 가지 소식 및 알림을 드릴 것이며, 사용자 모두에게 해당하는 공지는 공지사항 메뉴에 게시함으로 효력이 발생합니다.</p>
                                        <p>제 19조(준거법 및 재판관할)</p>
                                        <p>회사와 회원 간 제기된 소송에는 대한민국법을 준거법으로 합니다.</p>
                                        <p>회사와 회원간 발생한 분쟁에 관한 소송은 민사소송법 상의 관할법원에 제소합니다.</p>
                                        <p>제 20조(부칙)</p>
                                        <p>본 약관은 2021년 11월 10일부터 시행합니다.</p>
                                </AgreeContentWrap>

                                {/* 개인정보 이용약관 */}
                                <AgreeContentWrap className="notoRegular" style={historyProp.location.state == 'personDetail' ? { display: 'block' } : { display: 'none' }}>
                                        <p>&lt;(주) 스프레드와이&gt;('모두 - 나의 구독 서비스 관리'이하 '모두')은(는) 「개인정보 보호법」 제30조에 따라 정부주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립&middot;공개합니다.</p>
                                        <p>○ 이 개인정보처리방침은 2021년 11월 10일 부터 적용됩니다.</p>
                                        <p>&nbsp;</p>
                                        <p>제1조(개인정보의 처리 목적)</p>
                                        <p>&lt;(주) 스프레드와이&gt;('모두 - 나의 구독 서비스 관리'이하 '모두')은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                                        <p>1. 홈페이지 회원가입 및 관리<br />회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별&middot;인증, 회원자격 유지&middot;관리, 서비스 부정이용 방지 목적으로 개인정보를 처리합니다.<br /><br />2. 재화 또는 서비스 제공<br />서비스 제공, 콘텐츠 제공, 맞춤서비스 제공을 목적으로 개인정보를 처리합니다.<br /><br />3. 마케팅 및 광고에의 활용<br />신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.<br /><br /></p>
                                        <p>&nbsp;</p>
                                        <p>제2조(개인정보의 처리 및 보유 기간)</p>
                                        <p>① &lt;(주) 스프레드와이&gt;은(는) 법령에 따른 개인정보 보유&middot;이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유&middot;이용기간 내에서 개인정보를 처리&middot;보유합니다.</p>
                                        <p>&nbsp;</p>
                                        <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
                                        <p>1.&lt;홈페이지 회원가입 및 관리&gt;</p>
                                        <p>&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터&lt;3년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.</p>
                                        <p>보유근거 : 회원가입 시 필수 유저 정보, 앱 사용 기록 보유</p>
                                        <p>&nbsp;</p>
                                        <p>2.&lt;홈페이지 회원가입 및 관리&gt;</p>
                                        <p>&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터&lt;6개월&gt;까지 위 이용목적을 위하여 보유.이용됩니다.</p>
                                        <p>보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
                                        <p>관련법령 : 표시/광고에 관한 기록 : 6개월</p>
                                        <p>&nbsp;</p>
                                        <p>3.&lt;홈페이지 회원가입 및 관리&gt;</p>
                                        <p>&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터&lt;3년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.</p>
                                        <p>보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
                                        <p>관련법령 : 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</p>
                                        <p>&nbsp;</p>
                                        <p>4.&lt;홈페이지 회원가입 및 관리&gt;</p>
                                        <p>&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터&lt;5년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.</p>
                                        <p>보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
                                        <p>관련법령 : 계약 또는 청약철회 등에 관한 기록 : 5년</p>
                                        <p>&nbsp;</p>
                                        <p>5.&lt;홈페이지 회원가입 및 관리&gt;</p>
                                        <p>&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터&lt;5년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.</p>
                                        <p>보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
                                        <p>관련법령 : 대금결제 및 재화 등의 공급에 관한 기록 : 5년</p>
                                        <p>&nbsp;</p>
                                        <p>제3조(개인정보의 제3자 제공)</p>
                                        <p>① &lt;(주) 스프레드와이&gt;은(는) 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
                                        <p>② &lt;(주) 스프레드와이&gt;은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.</p>
                                        <p>1. &lt;현재 해당 사항 없음&gt;</p>
                                        <p>개인정보를 제공받는 자 : 현재 해당 사항 없음</p>
                                        <p>제공받는 자의 개인정보 이용목적 :</p>
                                        <p>제공받는 자의 보유.이용기간:</p>
                                        <p><br /><br /></p>
                                        <p>제4조(개인정보처리 위탁)</p>
                                        <p>① &lt;(주) 스프레드와이&gt;은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
                                        <p>1. &lt;현재 해당사항없음&gt;</p>
                                        <p>위탁받는 자 (수탁자) :</p>
                                        <p>위탁하는 업무의 내용 :</p>
                                        <p>위탁기간 :</p>
                                        <p>② &lt;(주) 스프레드와이&gt;은(는) 위탁계약 체결시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>
                                        <p>③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.</p>
                                        <p><br /><br /></p>
                                        <p>제5조(정보주체와 법정대리인의 권리&middot;의무 및 그 행사방법)</p>
                                        <p>① 정보주체는 (주) 스프레드와이에 대해 언제든지 개인정보 열람&middot;정정&middot;삭제&middot;처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
                                        <p>② 제1항에 따른 권리 행사는(주) 스프레드와이에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 (주) 스프레드와이은(는) 이에 대해 지체 없이 조치하겠습니다.</p>
                                        <p>③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 &ldquo;개인정보 처리 방법에 관한 고시(제2020-7호)&rdquo; 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p>
                                        <p>④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.</p>
                                        <p>⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</p>
                                        <p>⑥ (주) 스프레드와이은(는) 정보주체 권리에 따른 열람의 요구, 정정&middot;삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p>
                                        <p><br /><br /></p>
                                        <p>제6조(처리하는 개인정보의 항목 작성)</p>
                                        <p>① &lt;(주) 스프레드와이&gt;은(는) 다음의 개인정보 항목을 처리하고 있습니다.</p>
                                        <p>1&lt; 홈페이지 회원가입 및 관리 &gt;</p>
                                        <p>필수항목 : 휴대전화번호, 성별, 이름, 연령대, 선호 카테고리</p>
                                        <p>선택항목 :</p>
                                        <p>이용기간: 계약종료 및 회원 탈퇴시까지</p>
                                        <p>&nbsp;</p>
                                        <p>2&lt;구독관리&gt;</p>
                                        <p>필수항목: 이름, 구독</p>
                                        <p>이용기간: 이용목적 달성시까지</p>
                                        <p><br /><br /></p>
                                        <p>제7조(개인정보의 파기)</p>
                                        <p>① &lt;(주) 스프레드와이&gt; 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
                                        <p>&nbsp;</p>
                                        <p>② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p>
                                        <p>1. 법령 근거 :</p>
                                        <p>2. 보존하는 개인정보 항목 : 계좌정보, 거래날짜</p>
                                        <p>&nbsp;</p>
                                        <p>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
                                        <p>1. 파기절차</p>
                                        <p>&lt;(주) 스프레드와이&gt; 은(는) 파기 사유가 발생한 개인정보를 선정하고, &lt;(주) 스프레드와이&gt; 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</p>
                                        <p>2. 파기방법</p>
                                        <p>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</p>
                                        <p>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다</p>
                                        <p><br /><br /></p>
                                        <p>제8조(개인정보의 안전성 확보 조치)</p>
                                        <p>&lt;(주) 스프레드와이&gt;은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
                                        <p>1. 정기적인 자체 감사 실시</p>
                                        <p>개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.</p>
                                        <p>&nbsp;</p>
                                        <p>2. 개인정보 취급 직원의 최소화 및 교육</p>
                                        <p>개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.</p>
                                        <p>&nbsp;</p>
                                        <p>3. 개인정보에 대한 접근 제한</p>
                                        <p>개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</p>
                                        <p>&nbsp;</p>
                                        <p>4. 문서보안을 위한 잠금장치 사용</p>
                                        <p>개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.</p>
                                        <p>&nbsp;</p>
                                        <p>제9조(개인정보 자동 수집 장치의 설치&bull;운영 및 거부에 관한 사항)</p>
                                        <p>(주) 스프레드와이 은(는) 개개인에게 개인화되고 맞춤화된 서비스를 제공하기 위해 이용자의 정보를 저장하고 수시로 불러오는&nbsp; &lsquo;쿠키(cookie)&rsquo;를 사용합니다.</p>
                                        <p>쿠키의 사용 목적</p>
                                        <p>쿠키를 이용한 앱 실행 시 자동 로그인</p>
                                        <p>서비스 이용에 필수적인 기능을 위해 사용</p>
                                        <p>&nbsp;</p>
                                        <p>제10조 (개인정보 보호책임자)</p>
                                        <p>① (주) 스프레드와이 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                                        <p>▶ 개인정보 보호책임자</p>
                                        <p>성명 :신민재</p>
                                        <p>직책 :대표</p>
                                        <p>직급 :CEO</p>
                                        <p>연락처 :010-4027-0880, smj7162@naver.com,</p>
                                        <p>※ 개인정보 보호 담당부서로 연결됩니다.</p>
                                        <p>▶ 개인정보 보호 담당부서</p>
                                        <p>부서명 :&nbsp;</p>
                                        <p>담당자 : 신민재</p>
                                        <p>이메일 : business.modu21@gmail.com</p>
                                        <p>② 정보주체께서는 (주) 스프레드와이 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. (주) 스프레드와이 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p>
                                        <p>&nbsp;</p>
                                        <p>제11조(개인정보 열람청구)</p>
                                        <p>정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.</p>
                                        <p>&lt;(주) 스프레드와이&gt;은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.</p>
                                        <p>▶ 개인정보 열람청구 접수&middot;처리 부서</p>
                                        <p>부서명 :</p>
                                        <p>담당자 : 신민재</p>
                                        <p>이메일 : business.modu21@gmail.com</p>
                                        <p>&nbsp;</p>
                                        <p>제12조(권익침해 구제방법)</p>
                                        <p>정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.</p>
                                        <p>&nbsp;</p>
                                        <p>1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</p>
                                        <p>2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</p>
                                        <p>3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)</p>
                                        <p>4. 경찰청 : (국번없이) 182 (cyberbureau.police.go.kr)</p>
                                        <p>&nbsp;</p>
                                        <p>「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정&middot;삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.</p>
                                        <p>&nbsp;</p>
                                        <p>※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.</p>
                                        <p>&nbsp;</p>
                                        <p>제13조(개인정보 처리방침 변경)</p>
                                        <p>① 이 개인정보처리방침은 2021년&nbsp; 11월 09일부터 적용됩니다.</p>
                                        <p>② 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.</p>
                                        <p>- 2019. 11. 27 ~ 2021. 06. 27 적용 (<a href="https://codeforeveryone.tistory.com/entry/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EB%AA%A8%EB%91%90-%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4-%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8?category=821240" target="_blank">클릭</a>)</p>
                                        <p>- 2021. 06. 28 ~ 2021. 11. 09 적용 (<a href="https://spready.modoo.at/?link=2qz0xwok&viewType=list&messageNo=1&mode=view&query=&queryType=0&myList=0&page=1" target="_blank">클릭</a>)</p>
                                </AgreeContentWrap>

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
`;

const AgreeContentWrap = styled.div`
    padding:1rem 1.25rem;
    font-size:0.8125rem;

    line-height:1.3125rem;

    color:#313131;
    opacity:0.65;

    word-break:keep-all;
`;
export default AgreePage;