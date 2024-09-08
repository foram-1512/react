// export const fetchWrapper = {
//     getheaderdata,getheaderdata1,
//     getdata,
//     get
//     // post,
//     // put,

// }
// function getheaderdata1(url, body) {
//     // const empdata = JSON.parse(localStorage.getItem('proute_token')) || [];
//     // console.log("aaaa",empdata);
//     // const token = empdata[0].token ? empdata[0].token : '';
//     const requestOptions = {
//         method: 'post',
//         body: JSON.stringify(body),
//         headers: { 'Content-Type': 'application/json',  'api_key': 'BookManagement' },
//     };

//     return fetch(url, requestOptions).then(handleResponse);
// }
// function getheaderdata(url, body) {

//     // const bookdata = JSON.parse(localStorage.getItem('token')) || [];
//     // const token = bookdata[0].token ? bookdata[0].token : '';
//     const requestOptions = {
//         method: 'post',
//         body: JSON.stringify(body),
//         headers: { 'Content-Type': 'application/json' },
//     };

//     return fetch(url, requestOptions).then(handleResponse);
// }
// function getdata(url, body) {
//     // const token1 = localStorage.getItem('token');
//     // const token = JSON.parse(token1);

//     // console.log("token",token);
//     const requestOptions = {
//         method: 'post',
//         body: body,
//         headers: { 'api_key': 'BookManagement' },
//     };

//     return fetch(url, requestOptions).then(handleResponse);
// }
// function get(url) {

//     // const empdata = JSON.parse(localStorage.getItem('token')) || [];
//     // const token = empdata[0].token ? empdata[0].token : '';
//     const requestOptions = {
//         method: 'get',
//         headers: { 'Content-Type': 'application/json', 'api_key': 'BookManagement' },
//     };

//     return fetch(url, requestOptions).then(handleResponse);
// }

// function handleResponse(response) {

//     return response.json().then(res => {
//         if (res.code === 0) {
//             const error = res.message || 'Some error occured please try again';
//             return Promise.reject(error);
//         }
//         return res;
//     })
// }



import axios from "axios";

export function fetchWrapper(url, body, method) {
    // const bookdata = JSON.parse(localStorage.getItem('token')) || "";
    // const token = bookdata[0].token ? bookdata[0].token : "";
    const token = JSON.parse(localStorage.getItem('token')) || "";

    const requestOptions = {
        method: method,
        url: url,
        headers: {
            "api_key": process.env.REACT_APP_API_KEY,
            "accept-language": "en",
            "token": token,
        },
        data: body,
    };

    if (!(body instanceof FormData)) {
        requestOptions.headers["Content-Type"] = "application/json";
    }

    return axios(requestOptions)
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {

            console.log(error);
            return error;

        });
}

