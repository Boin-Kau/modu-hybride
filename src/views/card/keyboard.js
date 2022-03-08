import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { PageWrap } from "../../styled/shared/wrap";

import delete_icon from "../../assets/ic_card_numberdelete.png"

const Keyboard = () => {
  let nums_init = Array.from({ length: 10 }, (v, k) => k);
  const [nums, setNums] = useState(nums_init);
  const [password, setPassword] = useState("");

  const shuffle = (nums) => {
    let num_length = nums.length;
    while (num_length) {
      let random_index = Math.floor(num_length-- * Math.random());
      let temp = nums[random_index];
      nums[random_index] = nums[num_length];
      nums[num_length] = temp;
    }
    return nums;
  };

  const handlePasswordChange = useCallback(
    (num) => {
      if (password.length === 4) {
        return;
      }
      setPassword(password + num);
    },
    [password]
  );

  const erasePasswordOne = useCallback(
    (e) => {
      setPassword(
        password.slice(0, password.length === 0 ? 0 : password.length - 1)
      );
    },
    [password]
  );

  const erasePasswordAll = useCallback((e) => {
    setPassword("");
  }, []);

  const shuffleNums = useCallback(
    (num) => (e) => {
      // 0 ~ 9 섞어주기
      let nums_random = Array.from({ length: 10 }, (v, k) => k); // 이 배열을 변경해 입력문자 변경 가능
      setNums(shuffle(nums_random));
      handlePasswordChange(num);
    },
    [handlePasswordChange]
  );

  useEffect(()=>{
    console.log(password);
  },[password])
  return (
    <PageWrap>
      <KeyboardWrap>
        {nums.map((n, i) => {
          const Basic_button = (
            <NumberButton value={n} onClick={shuffleNums(n)} key={i}>
              {n}
            </NumberButton>
          );
          return i == nums.length - 1 ? (
            <>
              <NumberButton></NumberButton>
              {Basic_button}
            </>
          ) : (
            Basic_button
          );
        })}
        <NumberButton onClick={erasePasswordOne}><img src={delete_icon}/></NumberButton>
      </KeyboardWrap>
    </PageWrap>
  );
};

const KeyboardWrap = styled.div`
  height: 18.5625rem;
  background-color: #fff;
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4375rem 3.125rem;
  border-radius: 1.25rem;
`;

const NumberButton = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  width: 4.4375rem;
  height: 2.625rem;
  line-height: 100%;
  overflow: hidden;
  position: relative;
  font-family: Roboto;
  font-size: 1.5rem;
  font-weight: 500;
  color: #000;
`;

export default Keyboard;
