import { toast } from 'react-toastify';
import { cartItems } from './cartItems';
import axios from "axios";
import { ThunkDispatch } from 'redux-thunk';
import { Routers } from '../../utils/configUrl';

export const addToCart = (productCode: number | string, count = 1) => (dispatch: ThunkDispatch<{}, any, any>) => {

    dispatch({
        type: "loading",
        payload: true
    });

    let data = {
        product_id:productCode,
        number_items:count,
        session_id:localStorage.getItem('sessionId')
    };

    axios(Routers.ADD_TO_CART, {
        method: 'POST',
        data
    })
        .then(async (response) => {

            dispatch({
                type: "loading",
                payload: false
            });
            console.log('add to cart:',response.data);
            if (response.data.result) {
                localStorage.setItem("sessionId", response.data.data.session_id);
                dispatch(cartItems());
                // *** show cart items***
                setTimeout(function () {
                    dispatch({
                        type: "showCart",
                        payload: true
                    });
                }, 800);
                setTimeout(function () {
                    dispatch({
                        type: "showCart",
                        payload: false
                    });
                }, 2600);

                // ***
            } else {
                toast.dark(response.data.message[0]);
            }
        })
        .catch((err) => {
            dispatch({
                type: "loading",
                payload: false
            });

            console.log(err);
        })


};
