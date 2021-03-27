import axios from "axios";
import {ThunkDispatch} from 'redux-thunk';
import {Routers} from '../../utils/configUrl';
import {toast} from "react-toastify";

export const cartItems = () => (dispatch: ThunkDispatch<{}, any, any>) => {

    let data = {
        session_id: localStorage.getItem('sessionId') || undefined
    };

    axios(Routers.GET_CART, {
        method: 'POST',
        data
    })
        .then((response) => {
            console.log('cart:',response.data);
            dispatch({type: 'loading', payload: false});
            if (response.data.result) {
                dispatch({
                    type: "cartItems",
                    payload: response.data.data
                });
            }

        })
        .catch((err) => {
            dispatch({type: 'loading', payload: false});
            console.log(err);
        })
};
//***delete cart items***
export const deleteCartItems = (code: string | number) => (dispatch: ThunkDispatch<{}, any, any>) => {

    dispatch({type: 'loading', payload: true});

    let data = {
        session_id: localStorage.getItem('sessionId')
    };

    axios(`${Routers.EDIT_DELETE_CART}/${code}/delete`, {
        method: 'PUT',
        data
    })
        .then((response) => {
            dispatch({type: 'loading', payload: false});

            if (response.data.result) {
                dispatch(cartItems());
            } else {
                toast.dark(response.data.message[0])
            }

        })
        .catch((e) => {
            dispatch({type: 'loading', payload: false})
            console.log(e)
        })
};
