import loading_gif from "../assets/gray-loading.gif";
import styled from "styled-components";


const LoadingBox = () => {

    return (
        <LoadingBoxWrap>
            <img className="loadingIcon" src={loading_gif} alt="loadingIcon" />
        </LoadingBoxWrap >
    )
}

const LoadingBoxWrap = styled.div`
    position: relative;
    height:10.625rem;

    .loadingIcon {
        position:absolute;
        top:50%;
        left:50%;

        transform:translate(-50%,-50%);

        width:1.875rem;
        height:1.875rem;
    }
`;


export default LoadingBox;