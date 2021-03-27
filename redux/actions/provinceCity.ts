import axios from "axios";
import {ThunkDispatch} from 'redux-thunk';
import {Routers} from '../../utils/configUrl';

export const getProvince = () => (dispatch: ThunkDispatch<{}, any, any>) => {
    dispatch({type: 'loading', payload: true});
    axios(Routers.PROVINCE)
        .then((response) => {
            dispatch({type: 'loading', payload: false});
            if(response.data.result){
                dispatch({
                    type: "provinceList",
                    payload: response.data.data.array
                });
            }
        })
        .catch((err) => {
            dispatch({type: 'loading', payload: false});
            console.log(err);
        })
};

export const getCityList = (province: string) => (dispatch: ThunkDispatch<{}, any, any>) => {
    dispatch({type: 'loading', payload: true});
    axios(`${Routers.PROVINCE}/${province}/cities`)
        .then((response) => {
            dispatch({type: 'loading', payload: false});
            if(response.data.result){
                dispatch({
                    type: "cityList",
                    payload: response.data.data.array
                });
            }
        })
        .catch((err) => {
            dispatch({type: 'loading', payload: false});
            console.log(err);
        })
};
