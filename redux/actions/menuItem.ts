import axios from "axios";
import { ThunkDispatch } from 'redux-thunk';
import { Routers } from '../../utils/configUrl';
// import Cookies from "js-cookie";


export const getMenuItems = () => (dispatch: ThunkDispatch<{}, any, any>) => {

    axios(Routers.MENU_ITEMS)
        .then((response) => {
            // console.log('menu',Cookies.get('auth'))
            if(response.data.result){
                dispatch({
                    type:'menuItems',
                    payload:response.data.data
                })
            }
        })
        .catch((err) => {
           console.log(err);
        })
};
