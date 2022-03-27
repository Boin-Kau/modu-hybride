import styled from "styled-components";
import { MainText } from "../../../../styled/shared/text";

const ChoosePartyInfo = () => {
  return (
    <ChoosePartyInfoWrap>
      <MainText style={{margin:'1rem 0 0'}}>
        <span className="yellowText">파티와 관련된 정보</span>
        를<br/>
        입력해주세요.
      </MainText>
    </ChoosePartyInfoWrap>
  );
}

export default ChoosePartyInfo;

const ChoosePartyInfoWrap = styled.div`
  padding: 0 1.25rem;
`;
