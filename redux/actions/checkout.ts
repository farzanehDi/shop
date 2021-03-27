import axios from "axios";
import { ThunkDispatch } from 'redux-thunk';
import { Routers } from '../../utils/configUrl';

export const getCheckoutInfo = () => (dispatch: ThunkDispatch<{}, any, any>,getState: () =>
    { (): any; new(): any; auth: { (): any; new(): any; addressCheckout:string|number; shippingTypeCheckout:string|number;
    paymentWayCheckout: string|number; companyCheckout: string|number; discountCheckout: string|number; invoiceCheckout: string|number; }; }) => {

    dispatch({
        type: "loading",
        payload: true
    });

    const invoice_id=localStorage.getItem("factorId") || undefined;

    let data={
        invoice_id,
        address_id:getState().auth.addressCheckout || undefined,
        shipping_type_id:getState().auth.shippingTypeCheckout || undefined,
        payment_way_id:getState().auth.paymentWayCheckout || undefined,
        company_id:getState().auth.companyCheckout || undefined,
        is_send_paper_invoice:getState().auth.invoiceCheckout || undefined,
    }

    axios(Routers.CHECKOUT,{
        method:'POST',
        data
    })
        .then((response) => {

            console.log('checkout',response.data);

            dispatch({
                type: "loading",
                payload: false
            });
            if(response.data.result){
                dispatch({
                    type: "checkoutInfo",
                    payload: response.data.data
                });
                localStorage.setItem("factorId", response.data.data.invoice_id);
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
