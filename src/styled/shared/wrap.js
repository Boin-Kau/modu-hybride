import styled from "styled-components";

export const PageWrap = styled.div`
  position: absolute;
  top: 3.0625rem;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  background-color: #ffffff;
`;

export const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 3.0625rem;

  background-color: #ffffff;
  text-align: center;

  font-size: 0.875rem;
  color: #313131;

  box-shadow: 0 0 0.25rem 0.0625rem #efefef;

  font-family: 'Spoqa Han Sans';
  font-weight: 600;
`;

export const ContentWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  overflow-y: scroll;

  padding: 0 1.25rem 0 1.25rem;
`;

// 파티 상세페이지에서 파티 정보를 감싸주는 Wrapper입니다. 
export const PartyDetailSubWrap = styled.div`
  padding: 1.3438rem 0;
`

// 파티 상세페이지에서 아낀 금액 등 여러가지 정보를 전달하는 Notice Div를 감싸는 Wrapper입니다. 
export const NoticeWrap = styled.div`
  border-radius: 0.4375rem;
  box-shadow: 0 0.1875rem 0.25rem 0 rgba(233, 233, 233, 0.38);
  background-color: #fff;

  padding: 0.875rem 0.9187rem;

  .notice_sub_wrap {
    display: flex;
    line-height: 1.3125rem;
  }
  .align_center {
    align-items: center;
  }

  .notice_img {
    width: 1.2rem;
    height: 1.2rem;
  }
  .notice_text_div {
    margin-left: 0.475rem;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 0.75rem;
  }
  .notice_text_yellow {
    color: #ffca2c;
  }
  .boldText {
    font-weight: 600;
  }
`;

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  position:absolute;
  top:3.0625rem;
  left:0;
  right:0;
  bottom:0;

  padding: 0 1.25rem;

  overflow-y:scroll;

  background-color:#ffffff;
`;

export const BottomDialogWrap = styled.div`
    display : ${props => props.openStatus ? 'block' : 'none'};
    z-index:10000;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    background-color:rgba(110,110,110,0.35);
`;

export const BottomDialogDiv = styled.div`
  position:absolute;
  left: 1.25rem;
  right: 1.25rem;
  bottom: 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  font-family: 'Spoqa Han Sans';
  font-weight: 400;
  color: #000000;

  .btn_style {
    background-color: #fff;
    border-radius: 0.4375rem;
  }
  .one_btn {
    padding: 0.9375rem 0;
  }
  .margin_bottom {
    margin-bottom: 0.5rem;
  }
  .gray_border_bottom {
    border-bottom: solid 0.0437rem #b4b4b4;
  }  
`;