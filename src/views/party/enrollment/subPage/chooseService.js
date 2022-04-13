import styled from "styled-components";
import { MainText } from "../../../../styled/shared/text";

import icon_search_none from "../../../../assets/icon-search-none.svg";
import PartyPlusIcon from "../../../../assets/party/enrollment/ic-partyregist-plus.svg";
import BottomButton from "../../../../components/party/BottomButton";
import { useSelector, useDispatch } from "react-redux";
import { GetServerPlatformList, GetSearchPlatformList } from "../../../../reducers/main/platform";
import { customApiClient } from "../../../../shared/apiClient";
import { useEffect, useState, useContext } from "react";
import { UpdatePlatformAction } from "../../../../reducers/party/enrollment/platform";
import { useHistory } from "react-router-dom";
import { PageTransContext } from "../../../../containers/pageTransContext";
import { UpdateCurrentPageAction } from "../../../../reducers/party/enrollment/setPage";

const ChooseService = () => {

  //import
  const dispatch = useDispatch();
  const history = useHistory();

  //store
  const {
    selectedPlatformIdx,
    selectedPlatformName,
    selectedPlatformCategoryIdx,
    selectedPlatformImgUrl,
    selectedPlatformImgColor,
    selectedPlatformImgInitial,
    isAccount,
    isAdult,
  } = useSelector(state => state.party.enrollment.platform);

  const {
    serverPlatformList,
  } = useSelector(state => state.main.platform);

  const {
    searchPlatformList,
  } = useSelector(state => state.main.platform);

  const { page: currentPage } = useSelector(state => state.party.enrollment.setPage);

  //context
  const { setPageTrans } = useContext(PageTransContext);

  //페이지에 보여주는 뷰 로직
  const [viewPlatformList, setViewPlatformList] = useState([]);

  //해당 페이지 확인 status 값
  const [confirmStatus, setConfirmStatus] = useState(false);

  //검색 state
  const [searchSatus, setSearchSatus] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(async () => {

    //인기 리스트, 전체 플랫폼 조회 -> 리덕스에서 없으면 호출, 있으면 호출 X => 최초 1회만 불러오기
    if (serverPlatformList.length < 1) {

      //인기 구독 플랫폼 리스트 조회
      const data = await customApiClient('get', '/subscribe/platform?type=REP');

      //서버에러
      if (!data) return

      //벨리데이션
      if (data.statusCode != 200) {
        return
      }

      //리덕스에 넣어주기
      dispatch({
        type: GetServerPlatformList,
        data: data.result
      })

    }

    if (searchPlatformList.length < 1) {
      //전체 구독 플랫폼 리스트 조회
      const search = await customApiClient('get', '/subscribe/platform?type=ALL');

      //서버에러
      if (!search) return

      //벨리데이션
      if (search.statusCode != 200) {
        return
      }

      //리덕스에 넣어주기
      dispatch({
        type: GetSearchPlatformList,
        data: search.result
      })
      console.log(search.result)

    }

  }, []);

  useEffect(() => {
    setViewPlatformList([...serverPlatformList]);
  }, [serverPlatformList])

  //다음버튼 벨리데이션
  useEffect(() => {

    //서버 플랫폼 등록
    if (selectedPlatformIdx && selectedPlatformName && selectedPlatformCategoryIdx) {
      setConfirmStatus(true);
      return
    }

    //커스텀 플랫폼 등록
    if (selectedPlatformIdx === 0) {
      setConfirmStatus(true);
      return
    }

    //아니라면 막기
    setConfirmStatus(false);

  }, [
    selectedPlatformIdx,
    selectedPlatformName,
    selectedPlatformCategoryIdx,
    selectedPlatformImgUrl,
    selectedPlatformImgColor,
    selectedPlatformImgInitial
  ])

  const nextPage = () => {

    if (!confirmStatus) return;

    //직접입력하기 혹은 이미지가 없는 플랫폼 클릭시 detail 설정 페이지로 이동시키기
    if (selectedPlatformIdx === 0 | !selectedPlatformImgUrl) {
      setPageTrans('trans toRight');
      history.push('/party/enroll/platform/detail');
      return
    }

    

    //정상적일 경우 다음 페이지로 넘기기
    dispatch(UpdateCurrentPageAction({
      page: 2
    }));
  };

  const handleClickService = (data) => {
    dispatch(UpdatePlatformAction({
      selectedPlatformIdx: data.idx,
      selectedPlatformName: data.name,
      selectedPlatformCategoryIdx: data.categoryIdx,
      selectedPlatformImgUrl: data.imgUrl,
      selectedPlatformImgColor: null,
      selectedPlatformImgInitial: null,
      isAccount: data.isAccount,
      isAdult: data.isAdult,
    }))
  }

  //직접 선택
  const handleClickCustomService = () => {
    dispatch(UpdatePlatformAction({
      selectedPlatformIdx: 0,
      selectedPlatformName: null,
      selectedPlatformCategoryIdx: null,
      selectedPlatformImgUrl: null,
      selectedPlatformImgColor: null,
      selectedPlatformImgInitial: null,
      isAccount: "N",
      isAdult: "N",
    }))
  }

  //검색어 입력
  const handleChangeSearch = (e) => {
    setKeyword(e.target.value);

    const value = e.target.value;

    if (!value) {
      setSearchSatus(false);
      setViewPlatformList([...serverPlatformList]);
      return
    }

    setSearchSatus(true);

    const serachData = searchPlatformList.filter((data) => {
      return data.name.includes(value);
    })

    setViewPlatformList(serachData);

  };

  //검색어 삭제
  const handleClickCancel = () => {
    setKeyword('');
    setSearchSatus(false);
    setViewPlatformList([...serverPlatformList]);
  };

  return (
    <ChooseServiceWrap style={{ flexGrow: '1' }}>
      <div style={{ flexGrow: '1', display: "flex", flexDirection: "column" }}>
        <MainText style={{ margin: '1rem 0 0' }}>
          <span className="yellowText">어떤 구독 서비스</span>
          를<br />
          공유하실건가요?
        </MainText>

        <div style={{ position: "relative", marginTop: "0.6875rem" }}>
          <SearchWrap searchSatus={searchSatus}>
            <img src={icon_search_none} />
            <input
              className="searchInput"
              type="text"
              value={keyword}
              onChange={handleChangeSearch}
              placeholder="찾고있는 서비스를 입력해보세요." />
          </SearchWrap>
          <SearchCancelWrap searchSatus={searchSatus} onClick={handleClickCancel}>
            취소
          </SearchCancelWrap>
        </div>

        {/* 구독서비스 선택 - 택 작업*/}
        <div className="serviceListWrap">
          {!searchSatus &&

            <ServiceItemWrap
              isSeleted={selectedPlatformIdx === 0}
              onClick={handleClickCustomService}>
              <div className="enrollIconWrap">
                <img className="enrollIcon" src={PartyPlusIcon} alt="PartyPlusIcon" />
              </div>
              <div className="serviceText">직접등록</div>
            </ServiceItemWrap>
          }
          {viewPlatformList &&
            viewPlatformList.map((value) => {
              return (
                <ServiceItemWrap
                  key={value.idx}
                  isSeleted={value.idx === selectedPlatformIdx}
                  onClick={() => { handleClickService(value) }}>
                  <div className="enrollServiceWrap">
                    {
                      value.imgUrl ?
                        <img className="enrollService" src={value.imgUrl} alt="enrollService" />
                        :
                        <div className="noneServiceWrap spoqaBold">
                          <div className="noneServiceText">
                            ?
                          </div>
                        </div>
                    }
                  </div>
                  <div className="serviceText">{value.name.length > 6 ? value.name.substr(0, 6) + "..." : value.name}</div>
                </ServiceItemWrap>
              )
            })
          }
        </div>

      </div>

      <div className="buttonWrap">
        <BottomButton clickFunc={nextPage} text={'다음'} activeStatus={confirmStatus} isBottomStatus={false} />
      </div>

    </ChooseServiceWrap>
  );
}

export default ChooseService;

const ChooseServiceWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  .serviceListWrap {
    flex-grow:1;
    flex-basis:0;

    overflow-y:scroll;
    background-color:#f4f4f4;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows:  repeat(auto-fit, 5.0625rem);

    gap: 0.625rem 0.75rem;

    padding:0.875rem 1.25rem 6.875rem 1.25rem;
  }

  .buttonWrap {
    position: absolute;
    bottom:0;
    left:1.25rem;
    right:1.25rem;
  }
`;

const SearchWrap = styled.div`
  margin: 0.75rem 1.25rem 0.75rem 1.25rem;
  padding: 0.625rem 0.9375rem;
  background-color: #f7f7f7;
  border-radius: 0.375rem;
  display:flex;

  margin-right:${props => props.searchSatus ? "3.5rem" : "1.25rem"};
  transition: all 0.3s ease;
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

const ServiceItemWrap = styled.div`
    position: relative;
    height:5.0625rem;
    border:0.0375rem solid #dbdbdb;
    background-color:${props => props.isSeleted ? "#fff2cc" : "#ffffff"};

    border-radius:0.625rem;

    text-align:center;

    .enrollIconWrap {
      margin-top:1.2312rem;
      margin-bottom:0.4813rem;
      height:1.4375rem;

      .enrollIcon {
        width:1.4375rem;
        height:1.4375rem;
      }
    }
    .enrollServiceWrap {
      position: relative;
      margin-top:0.875rem;
      margin-bottom:0.125rem;
      height:2.0625rem;

      .enrollService {
        width:2.0625rem;
        height:2.0625rem
      }

      .noneServiceWrap {

        position: absolute;
        top:0;
        left:50%;
        transform:translate(-50%,0);

        width:2.0625rem;
        height:2.0625rem;

        border-radius: 0.375rem;
        background-color: #e1e1e1;

        .noneServiceText {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%,-30%);
          font-size: 1.25rem;
          color: #ffffff;
        }
      }
    }
    .serviceText {
      font-size:0.75rem;
      color:#020202;
      line-height:1.4375rem;

      font-family: 'Noto Sans KR';
      font-weight: 500;
    }
`;

const SearchCancelWrap = styled.div`
    display : ${props => props.searchSatus ? 'block' : 'none'};

    position:absolute;
    top:50%;
    transform:translate(0,-50%);
    right: 1.25rem;

    font-size:0.75rem;
    color:#313131;

    line-height:23px;

    font-family: 'Noto Sans KR';
    font-weight: 600;
`;