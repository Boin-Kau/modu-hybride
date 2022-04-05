import styled from "styled-components";
import LoadingIcon from "../assets/ic-loading.svg";

const LoadingPopup = ({ openStatus }) => {

    return (
        <LoadingPopupWrap openStatus={openStatus}>
            <div className="loadingIconWrap">
                <img className="loadingIcon" src={LoadingIcon} alt="loadingIcon" />
            </div>
        </LoadingPopupWrap >
    )
}

const LoadingPopupWrap = styled.div`
    display : ${props => props.openStatus ? 'block' : 'none'};
    z-index:20000;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    background-color:rgba(110,110,110,0.35);

    .loadingIconWrap {
        position:absolute;
        top:50%;
        left:50%;

        width:2.875rem;
        height:2.875rem;

        transform:translate(-50%,-50%);

        .loadingIcon {
            width:2.875rem;
            height:2.875rem;

            animation: rotate_image 1.5s linear infinite;
            transform-origin: 50% 50%;

            @keyframes rotate_image{ 100% { transform: rotate(360deg); } }
        }
    }
`;


export default LoadingPopup;