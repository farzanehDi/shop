import axios from "axios";
import { ThunkDispatch } from 'redux-thunk';
import { Routers } from '../../utils/configUrl';


export const checkAuth = () => (dispatch: ThunkDispatch<{}, any, any>) => {

    axios(Routers.CHECK_AUTH)
        .then((response) => {
            console.log('check auth',response.data);
            if(response.data.result){
                dispatch({
                    type:'isLogin',
                    payload:response.data.data.is_login
                })
                dispatch({
                    type:'completeProfile',
                    payload:response.data.data.is_complete_profile
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
};
