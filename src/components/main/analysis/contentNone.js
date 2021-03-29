import React from 'react';
import styled from "styled-components";
import duck_none_img from "../../../assets/duck-none.svg";


const ContentNone = () => {


    return (
        <>
            <div style={{ margin: "2.5625rem 0 3.9375rem 0" }}>
                <div style={{ textAlign: "left", marginBottom: "1.1875rem" }}>
                    <img style={{ marginLeft: "38.8%" }} src={duck_none_img} />
                </div>
                <div style={{ fontSize: "0.75rem", lineHeight: "1.375rem", color: "#313131", opacity: "0.20" }}>
                    등록된 구독 내역이 없습니다.<br />
                구독 내역을 추가해주세요.
            </div>
            </div>
        </>
    )
};

export default ContentNone;