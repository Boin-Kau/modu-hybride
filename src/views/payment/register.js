import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

import ic_pay_duck from '../../assets/ic_pay_duck.png';

const Register = () => {

  const history = useHistory();

  const goToRegister = () =>{
    history.push('/card');
  }

  return (
    <Container>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'0.975rem'}}>
            <img style={{width:'7.475rem', height:'5.3375rem'}} src={ic_pay_duck}/>
            <RegisterButton className='notoBold'>
                <span onClick={goToRegister} style={{fontSize: '0.75rem', textAlign: 'center', color: '#fff'}}>+ 카드 등록하기</span>
            </RegisterButton>
            <div className='notoRegular' style={{color:'#696969', width:'8rem', fontSize:'0.625rem', lineHeight: '1.9'}}>
                자주쓰는 카드를 등록해보세요!
            </div>
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
`;

const RegisterButton = styled.div`
  cursor: pointer;
  width: 6.0625rem;
  height: 1.6875rem;
  border-radius: 0.9375rem;
  background-color: #ffca2c;
  text-align: center;
  margin: 0.3125rem 0 0.25rem 0;
`;

export default Register