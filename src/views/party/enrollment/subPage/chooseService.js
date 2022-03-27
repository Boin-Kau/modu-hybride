import styled from "styled-components";
import { MainText } from "../../../../styled/shared/text";

import icon_search_none from "../../../../assets/icon-search-none.svg";

const ChooseService = () => {
  return (
    <ChooseServiceWrap>
      <MainText style={{margin:'1rem 0 0'}}>
        <span className="yellowText">어떤 구독 서비스</span>
        를<br/>
        공유하실건가요?
      </MainText>

      <SearchWrap>
        <img src={icon_search_none}/>
        <input className="searchInput" type="text" placeholder="찾고있는 서비스를 입력해보세요." />
      </SearchWrap>

      {/* 구독서비스 선택 - 택 작업*/}

    </ChooseServiceWrap>
  );
}

export default ChooseService;

const ChooseServiceWrap = styled.div`
  padding: 0 1.25rem;
`;

const SearchWrap = styled.div`
  margin-top: 1.1875rem;
  padding: 0.625rem 0.9375rem;
  background-color: #f7f7f7;
  border-radius: 0.375rem;
  display:flex;

  .searchInput {
    width: 100%;

    border:none;

    font-size: 0.875rem;
    color: #313131;

    background-color: transparent;

    margin-left: 0.5rem;

    font-family: 'Noto Sans KR';
    font-weight: 500;

    :focus {
        outline:none;
    }
    ::placeholder {
        opacity:0.4;
    }
  }
`;