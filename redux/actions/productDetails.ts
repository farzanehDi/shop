import axios from "axios";
import {ThunkDispatch} from 'redux-thunk';
import {Routers} from '../../utils/configUrl';

export const getProductDetails = (productId: number | string) => (dispatch: ThunkDispatch<{}, any, any>) => {

    axios(`${Routers.PRODUCTS}/${productId}/show-detail`)
        .then(async (response) => {

            if (response.data.result) {
                dispatch({
                    type: "favoriteProduct",
                    payload: response.data.data.is_wishlist
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
};
