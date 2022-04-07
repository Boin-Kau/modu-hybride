import styled from "styled-components";

export const MainText = styled.div`
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.6;
  margin: 1rem 0 1.5rem 0;

  /* padding:0 1.25rem; */
  
  .yellowText{
    color: #ffbc26;
  }
`;

// 파티정보, 멤버십정보 등 파티 상세페이지에서 사용하는 Subtitle Span Style
export const PartyDetailSubtitleSpan = styled.span`
  font-size: 0.875rem;
  color: #313131;
  font-family: 'Spoqa Han Sans';
  font-weight: bold;
`