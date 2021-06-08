import axios from 'axios';

export const apiClient = axios.create({
    baseURL: "http://192.168.219.126:3030/", // 기본 서버 주소 입력
    // baseURL: "http://localhost:3030/", // 기본 서버 주소 입력
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
        console.log(err);
        // alert("서버에러가 발생하였습니다. 잠시후 다시 시도해주세요.");

        return null
    }
}