import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

import { PageTransContext } from '../../containers/pageTransContext';
import ic_pay_duck from '../../assets/ic_pay_duck@3x.png';

const Register = ({card}) => {

  const history = useHistory();

  //context
  const { setPageTrans } = useContext(PageTransContext);

  const goToRegister = () =>{
    setPageTrans("trans toRight");
    history.push('/card');
  }

  
  return (
    <Container>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'0.975rem'}}>
            <img style={{width:'7.475rem', height:'5.3375rem'}} src={ic_pay_duck}/>
            <RegisterButton className='notoBold'>
              {card ? <span onClick={goToRegister}>+ 카드 등록하기</span> : <span onClick={goToRegister}>+ 계좌 등록하기</span>}
            </RegisterButton>
            {card ? <div className='notoRegular register-button'>자주쓰는 카드를 등록해보세요!</div> :<div className='notoRegular register-button'> 자주쓰는 계좌를 등록해보세요!</div>}
        </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 10.625rem;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.04);
  border: dashed 0.4px #bcbcbc;
  background-color: #f5f5f5;
  flex-direction: column;
  align-items: center;
  margin-top:1.125rem;
  display:table;

  .register-button{
    color: #696969;
    width: 8rem;
    font-size: 0.625rem;
    line-height: 1.9;
  }
`;

const RegisterButton = styled.div`
  cursor: pointer;
  width: 6.0625rem;
  height: 1.6875rem;
  border-radius: 0.9375rem;
  background-color: #ffca2c;
  text-align: center;
  margin: 0.3125rem 0 0.25rem 0;

  span{
    font-size: 0.75rem;
    text-align: center; 
    color: #fff;
  }
`;

export default Register