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
`;

export const ContentWrap = styled.div`
  top: 3.0625rem;
  left: 0;
  right: 0;
  bottom: 0;

  overflow-y: scroll;

  padding: 0 1.25rem 1.25rem 1.25rem;
`;

// 파티 상세페이지에서 파티 정보를 감싸주는 Wrapper입니다. 
export const PartyDetailSubWrap = styled.div`
  padding: 1.3438rem 0;
`

