import axios, { AxiosResponse } from 'axios';
import {Routers} from "./configUrl";
import Cookies from "js-cookie";


export const interceptor = axios.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
);


axios.interceptors.request.use(async request => {

    let access_token =await Cookies.get('auth');
    request.baseURL = Routers.BASE_URL;

    if(access_token){
        request.headers['Authorization'] = [`Bearer ${access_token}`];
    }
    return request;
});


const errorHandler = (error: { response: any; }) => {

    console.log(
        "%c ERROR (interceptor) responce =>",
        "background: #8B0000; color: #ffffff; font-size:11pt; font-weight: bold;",
        error.response
    );
    // return Promise.reject({...error});
    // if (error.response.status !== 401) {
        // console.log(
        //     "%c ERROR (interceptor) responce =>",
        //     "background: #8B0000; color: #ffffff; font-size:11pt; font-weight: bold;",
        //     error.response
        // );
        return Promise.reject({...error});
    // }else {
    //     if(error.config.url!=Routers.IS_LOGIN){
    //         store.dispatch(registerModalFn(true));
    //     }
    // }
    // } else {
    //
    //     axios.interceptors.response.eject(interceptor);
    //     axios.interceptors.request.eject(interceptor);
    //
    //     return axios('http://api.beta.ranksme.com/accounts/tokens/current', {
    //         method:'PUT',
    //         headers: {
    //             Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('info')).token
    //             // Authorization: 'Bearer LsDgz5V432u2FZT6hWfWgqCj48k16DeSkDy7OZ6b2NLIDHTWgBrWeKbrTlq9X7FB'
    //         }
    //     }).then(response => {
    //         console.log('token refreshed',response)
    //         //***save token***
    //         const info = JSON.parse(localStorage.getItem('info')) || {};
    //         info.token = response.data.token;
    //         localStorage.setItem('info', JSON.stringify(info));
    //         store.dispatch(isLoginFn(true));
    //
    //         error.response.config.headers['Authorization'] = 'Bearer ' + response.data.token;
    //         return axios(error.response.config);
    //     }).catch(error => {
    //         console.log('failed refresh token')
    //         return Promise.reject({...error});
    //     })
    // }

}


const successHandler = (response: AxiosResponse<any>) => {

    // console.log(
    //     "%c SUCCESS (interceptor) responce =>",
    //     "background: #006400; color: #ffffff; font-size:11pt; font-weight: bold;",
    //     response
    // );

    return response;

};
