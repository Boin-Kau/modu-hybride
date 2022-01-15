import axios from 'axios';

export const apiClient = axios.create({
    // baseURL: "http://10.20.181.253:3030/", // 기본 서버 주소 입력
    baseURL: "https://api.spread-y.com/", // 기본 서버 주소 입력
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
        // console.log(err.response);
        // console.log(err.message);

        if (!err.response) {
            return 'Network Error';
        }

        return null
    }
}