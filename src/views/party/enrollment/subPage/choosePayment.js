import styled from "styled-components";
import { MainText } from "../../../../styled/shared/text";

const ChoosePayment = () => {
  return (
    <ChoosePaymentWrap >
      <MainText style={{margin:'1rem 0 0'}}>
        <span className="yellowText">파티의 결제정보</span>
        를<br/>
        입력해주세요.
      </MainText>
    </ChoosePaymentWrap>
  );
}

export default ChoosePayment;

const ChoosePaymentWrap = styled.div`
  padding: 0 1.25rem;
`;