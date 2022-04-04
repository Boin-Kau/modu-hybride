import styled from "styled-components";
import { MainText } from "../../../../styled/shared/text";

const CheckPartyData = () => {
  return (
    <CheckPartyDataWrap>
      <MainText style={{margin:'1rem 0 0'}}>
        파티 등록 전,<br/>
        <span className="yellowText">아래 정보를 확인</span>
        해주세요.
      </MainText>
    </CheckPartyDataWrap>
  );
}

export default CheckPartyData;

const CheckPartyDataWrap = styled.div`
  padding: 0 1.25rem;
`;