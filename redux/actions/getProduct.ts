import axios from "axios";
import {ThunkDispatch} from 'redux-thunk';
import {Routers} from '../../utils/configUrl';

export const getProduct = (productCode: string) => (dispatch: ThunkDispatch<{}, any, any>, getState: () => { (): any; new(): any; auth: { (): any; new(): any; compareProduct: any; }; }) => {

    dispatch({
        type: "loading",
        payload: true
    });

    return (
        axios.get(`${Routers.PRODUCTS}/${productCode}/compare-show` )

            .then((response) => {
                dispatch({
                    type: "loading",
                    payload: false
                });

                let compareProducts = getState().auth.compareProduct;
                dispatch({
                    type: 'compareProduct',
                    payload: [...compareProducts, response.data.data]
                })

            })
            .catch((err) => {
                dispatch({
                    type: "loading",
                    payload: false
                });
                console.log(err);
            })

    )
};






// export const getProduct = (productCode: string | number) => (dispatch: ThunkDispatch<{}, any, any>, getState: () => { (): any; new(): any; auth: { (): any; new(): any; compareProduct: any; }; }) => {
//     return (
//
//         axios(Routers.GET_PRODUCT + productCode)
//             .then( (response) => {
//                 console.log('products ok');
//                 let compareProducts = getState().auth.compareProduct;
//                 dispatch({
//                     type: 'compareProduct',
//                     payload: [...compareProducts, response.data]
//                 })
//             })
//             .catch((err) => {
//                 console.log('error to get p');
//                 console.log(err);
//             })
//     )
//
// };
