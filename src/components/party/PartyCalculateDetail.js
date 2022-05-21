import styled from "styled-components";
import icon_delete from "../../assets/icon-popup-delete.svg";
import duck_none_img from "../../assets/duck-none.svg";
import icon_party_user from "../../assets/party/detail/ic-partydetail-partysucess.png";
import { priceToString } from "../main/bottomCard";

const PartyCalculateDetail = ({ openStatus, closeFunc, nextCalculatePrice, nextCalculateDetail }) => {

    return (
        <PabeWrap openStatus={openStatus}>
            <div className="subWrap" onClick={closeFunc} />
            <div className="contentWrap">
                <div className="header spoqaBold">
                    정산 내역
                    <div className="deleteIcon" onClick={closeFunc}>
                        <img src={icon_delete} alt="icon_delete" />
                    </div>
                </div>
                <div className="totalPriceWrap">
                    <div className="text spoqaMedium">이번달 정산 금액</div>
                    <div className="price spoqaBold">{priceToString(nextCalculatePrice || 0)}원</div>
                </div>

                {!nextCalculateDetail || nextCalculateDetail.length < 1 ?
                    <div className="contentNoneWrap">
                        <div style={{ margin: "2.5625rem 0 3.9375rem 0", textAlign: "center" }}>
                            <div style={{ textAlign: "left", marginBottom: "1.1875rem" }}>
                                <img style={{ marginLeft: "38.8%" }} src={duck_none_img} />
                            </div>
                            <div className="spoqaMedium" style={{ fontSize: "0.75rem", lineHeight: "1.375rem", color: "#313131", opacity: "0.2" }}>
                                정산 예정된 내역이 아직 없어요.<br />
                                파티원을 모집해보아요 :)
                            </div>
                        </div>
                    </div> :
                    <div className="contentFillWrap">
                        {nextCalculateDetail.map((item) => {
                            return (
                                <div className="contentDetailWrarp" key={item.idx}>
                                    <div className="imgWrap">
                                        <img src={icon_party_user} alt="icon_party_user" />
                                    </div>
                                    <div className="infoWrap">
                                        <div className="name spoqaMedium">{item.name}</div>
                                        <div className="gap spoqaMedium">{item.gap}일 이용</div>
                                        <div className="date spoqaRegular">({item.startDate} ~ {item.endDate})</div>
                                    </div>
                                    <div>
                                        <div className="price spoqaBold">
                                            {priceToString(item.price)}원
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
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
    .totalPriceWrap {

        display:flex;

        margin: 0 1.3rem;
        padding:0.9125rem 1.3875rem 0.85rem 0.825rem;

        border-radius:0.4375rem;
        background-color:#fff8e8;

        color:#000000;
        font-size:0.875rem;
        line-height:1.4375rem;

        .text {
            flex-grow:1;
        }
    }
    .contentNoneWrap {

    }
    .contentFillWrap {
        margin:0.9437rem 2.6875rem 2.5rem 1.3125rem;
    }
    .contentDetailWrarp {
        display:flex;
        margin-bottom:1.0625rem;

        .imgWrap {
            width:3.325rem;
            margin-right:0.55rem;

            img {
                width:3.325rem;
                height:3.325rem;
            }
        }
        .infoWrap {
            flex-grow:1;
            line-height:1.125rem;
            .name {
                font-size:0.875rem;
                color:#313131;
            }
            .gap {
                font-size:0.75rem;
                color:#ffca2c;
            }
            .date {
                font-size:0.75rem;
                color:#a0a0a0;
            }
        }
        .price {
            margin-top:0.9375rem;
            font-size:0.875rem;
            color:#ffca2c;
        }
    }
`;

export default PartyCalculateDetail;