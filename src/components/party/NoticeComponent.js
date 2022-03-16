import styled from "styled-components";

import icon_notice_duck from '../../assets/icon-notice-duck.svg';

const NoticeComponent = () => {
  return (
    <NoticeWrap>
      <img className="notice_img" src={icon_notice_duck}></img>
      <div></div>
    </NoticeWrap>

  );
}

export default NoticeComponent;

const NoticeWrap = styled.div`
  border-radius: 0.4375rem;
  box-shadow: 0 0.1875rem 0.25rem 0 rgba(233, 233, 233, 0.38);
  background-color: #fff;

  padding: 0 0.9187rem;

  .notice_img {
    width: 1.2rem;
    height: 1.2rem;
  }
`;