import { useState } from "react";
import styled from "styled-components";
import icon_delete from "../../assets/icon-popup-delete.svg";

const PartyLinkPopup = ({ openStatus, closeFunc, setPartyLink }) => {

    const [content, setContent] = useState("");

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleClickLinkExtraction = () => {

        const regex = /(http(s)?:\/\/|www.)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}([\/a-z0-9-%#?&=\w])+(\.[a-z0-9]{2,4}(\?[\/a-z0-9-%#?&=\w]+)*)*/gi;

        content.replace(regex, function (n) {
            setPartyLink(n);
        })

        closeFunc();
    }

    return (
        <PabeWrap openStatus={openStatus}>
            <div className="subWrap" onClick={closeFunc} />
            <div className="contentWrap">
                <div className="header spoqaBold">
                    오픈카톡방 링크 붙여넣기
                    <div className="deleteIcon" onClick={closeFunc}>
                        <img src={icon_delete} alt="icon_delete" />
                    </div>
                </div>
                <div className="inputWrap">
                    <textarea
                        className="input"
                        placeholder="공유(복사)한 오픈카톡방 링크 내용을 붙여넣어 주세요."
                        value={content}
                        onChange={handleChangeContent}
                    />
                </div>
                <div className="button spoqaBold" onClick={handleClickLinkExtraction}>링크 추출</div>
            </div>
            <div className="subWrap" onClick={closeFunc} />
        </PabeWrap>
    )
}

const PabeWrap = styled.div`
    display : ${props => props.openStatus ? 'flex' : 'none'};
    flex-direction:column;
    z-index:10000;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    background-color:rgba(110,110,110,0.35);

    .subWrap {
        flex-grow:1;
    }
    .contentWrap {
        margin:0 1.25rem;
        border-radius:0.4375rem;

        background-color:#ffffff;
    }
    .header {
        position: relative;
        margin:2rem 0 1.5875rem 0;
        text-align:center;

        font-size:0.875rem;
        line-height:1.4375rem;

        color:#313131;

        .deleteIcon {
            position:absolute;
            top:50%;
            right:1.25rem;

            padding:0 0.2188rem;

            transform:translate(0,-50%);

            img {
                width:0.5625rem;
                height:0.5625rem;
            }
        }
    }

    .inputWrap {
        display:flex;
        margin:0.875rem 1.6875rem 0 1.6875rem;

        .input {
            flex-grow:1;
            height:13.375rem;
            resize: none;

            padding: 0.625rem 0.875rem;

            border:none;
            border-radius: 0.25rem;

            font-size: 0.75rem;
            background-color: #f4f4f4;

            :focus {
                outline: 0.0625rem solid #ffca2c;
            }
            ::placeholder {
                opacity: 0.5;
            }
        }
    }

    .button {
        width:7.6875rem;
        margin:1.6875rem auto;

        padding:0.625rem 0;

        text-align:center;


        border-radius:0.375rem;
        background-color:#ffca17;
        font-size:0.875rem;
        color:#ffffff;
    }
`;

export default PartyLinkPopup;