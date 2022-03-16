import styled from "styled-components";

const AccountInfoComponent = ({isHostUser, accountInfo}) => {
  return (
    <>
      <AccountInfoDiv isHost={isHostUser}>
        <div>
          <div className="subtitle">아이디</div>
          <div className="content">{accountInfo.accountId}</div>
        </div>
        <button className="pasteBtn">복사</button>
      </AccountInfoDiv>
      <AccountInfoDiv isHost={isHostUser} style={{marginTop:'1.75rem'}}>
        <div>
          <div className="subtitle">비밀번호</div>
          <div className="content">{'*'.repeat(accountInfo.accountPw.length)}</div>
        </div>
        <button className="pasteBtn">복사</button>
        <button className="changeBtn">변경</button>
      </AccountInfoDiv>
    </>
  );
}

export default AccountInfoComponent;

const AccountInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .subtitle {
    font-size: 0.75rem;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    opacity: 0.6;
    color: #313131;
  }
  .content {
    font-size: 0.875rem;
    font-family: 'Spoqa Han Sans';
    font-weight: 600;
    color: #313131;
    margin-top: 0.3125rem;
  }

  .pasteBtn {
    border-radius: 0.375rem;
    border: none;
    background-color: #e3e3e3;
    font-size: 0.75rem;
    font-family: 'Spoqa Han Sans';
    font-weight: 600;
    opacity: 0.67;
    color: #313131;
    width: 3.125rem;
    height: 1.875rem;

    display: ${(props) => props.isHost === 'Y' ? 'none' : 'block'};
  }
  .changeBtn {
    border-radius: 0.375rem;
    border: none;
    background-color: #ffca17;
    font-size: 0.75rem;
    font-family: 'Spoqa Han Sans';
    font-weight: 600;
    color: #fff;
    width: 3.125rem;
    height: 1.875rem;
    


    display: ${(props) => props.isHost === 'Y' ? 'block' : 'none'};
  }

`;