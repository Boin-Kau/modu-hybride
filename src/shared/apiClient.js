import axios from 'axios';

export const apiClient = axios.create({
    baseURL: "https://api.team-modu.com/", // 기본 서버 주소 입력
    // baseURL: "http://localhost:3030/", // 기본 서버 주소 입력
    // baseURL: "http://172.20.10.3:3030/", // 기본 서버 주소 입력
});



export const customApiClient = async (method, url, data) => {

    try {
        const result = await apiClient(url, {
            method: method,
            data: data,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("x-access-token"),
            }
        });

        return result.data;
    }
    catch (err) {
        console.log(err.response);
        console.log(err.request);
        console.log(err.message);

        // alert("서버에러가 발생하였습니다. 잠시후 다시 시도해주세요.");

        return null
    }
}