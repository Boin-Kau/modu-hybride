import styled from "styled-components";
import { MainText } from "../../../../styled/shared/text";

const ChooseBankAccount = () => {
  return (
    <ChooseBankAccountWrap>
      <MainText style={{margin:'1rem 0 0'}}>
        <span className="yellowText">정산받을 계좌</span>
        를<br/> 
        알려주세요.
      </MainText>
    </ChooseBankAccountWrap>
  );
}

export default ChooseBankAccount;

const ChooseBankAccountWrap = styled.div`
  padding: 0 1.25rem;
`;