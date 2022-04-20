import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from "react-redux";
import { MessageClose, MessageOpen, MessageWrapClose, MessageWrapOpen } from "../../../reducers/container/message";

const AccountInfoComponent = ({ partyIdx, isHostUser, accountInfo }) => {

  const history = useHistory();
  const dispatch  = useDispatch();

  const onClickEditAccount = () => {
    history.push({
      pathname: '/party/my/detail/account',
      state: {
        idx: partyIdx,
        id: accountInfo.accountId
      }
    });
  };

  const onClickPasteId = () => {
    dispatch({
      type: MessageWrapOpen
    })
    dispatch({
      type: MessageOpen,
      data: '아이디 복사가 완료되었습니다.'
    })

    setTimeout(() => {
      dispatch({
        type: MessageClose
      })
    }, 2000);
    setTimeout(() => {
      dispatch({
        type: MessageWrapClose
      })
    }, 2300);
  }

  const onClickPastePw = () => {
    dispatch({
      type: MessageWrapOpen
    })
    dispatch({
      type: MessageOpen,
      data: '비밀번호 복사가 완료되었습니다.'
    })

    setTimeout(() => {
      dispatch({
        type: MessageClose
      })
    }, 2000);
    setTimeout(() => {
      dispatch({
        type: MessageWrapClose
      })
    }, 2300);
  }

  return (
    <>
      <AccountInfoDiv isHost={isHostUser}>
        <div>
          <div className="subtitle">아이디</div>
          <div className="content">{accountInfo.accountId}</div>
        </div>
        <CopyToClipboard text={accountInfo.accountId}>
          <button onClick={onClickPasteId} className="pasteBtn">복사</button>
        </CopyToClipboard>
      </AccountInfoDiv>
      <AccountInfoDiv isHost={isHostUser} style={{ marginTop: '1.75rem' }}>
        <div>
          <div className="subtitle">비밀번호</div>
          <div className="content">{isHostUser === 'Y' ? accountInfo.accountPw : '*'.repeat(accountInfo.accountPw.length)}</div>
        </div>
        <CopyToClipboard text={accountInfo.accountPw}>
          <button onClick={onClickPastePw} className="pasteBtn">복사</button>
        </CopyToClipboard>
        <button onClick={onClickEditAccount} className="changeBtn">변경</button>
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