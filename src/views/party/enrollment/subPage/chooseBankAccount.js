import { useState } from "react";
import styled from "styled-components";
import BottomButton from "../../../../components/party/BottomButton";
import { TitleWrap } from "../../../../styled/main/enrollment";
import InputComponent from "../../../../styled/shared/inputComponent";
import { MainText } from "../../../../styled/shared/text";

const ChooseBankAccount = ({updatePage}) => {

  const [accountOwnerName, setAccountOwnerName] = useState('');

  const handleChangeAccountOwnerName = (e) => {
    setAccountOwnerName(e.target.value);
  }

  const nextPage = () => {
    updatePage(6);
  };

  return (
    <ChooseBankAccountWrap style={{flexGrow: '1'}}>
      <div style={{flexGrow: '1'}}>
        <MainText style={{margin:'1rem 0 0'}}>
          <span className="yellowText">정산받을 계좌</span>
          를<br/> 
          알려주세요.
        </MainText>

        {/* 계좌 소유자 */}
        <TitleWrap style={{marginTop:'0.9688rem'}}>계좌 소유자</TitleWrap>
        <InputComponent
          id={"accountOwnerName"}
          type={"text"}
          placeholder={"계좌 소유자의 이름을 입력해주세요."}
          maxLength={200}
          value={accountOwnerName}
          onChange={handleChangeAccountOwnerName}
        />

        {/* 계좌번호 */}
        <TitleWrap >계좌 번호</TitleWrap>
      </div>

      <BottomButton clickFunc={nextPage} text={'다음'} status={true}/>
      
    </ChooseBankAccountWrap>
  );
}

export default ChooseBankAccount;

const ChooseBankAccountWrap = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 0 1.25rem;
`;