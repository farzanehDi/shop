import { toast } from 'react-toastify';
import axios from "axios";
import { ThunkDispatch } from 'redux-thunk';
import { Routers } from '../../utils/configUrl';


export const invoiceRequest= (productCode: number | string, count = 1) => (dispatch: ThunkDispatch<{}, any, any>) => {

    dispatch({
        type: "loading",
        payload: true
    });

    let data={
       number_items:count
    };

    axios(`${Routers.PRODUCTS}/${productCode}/request-pre-invoice`, {
        method: 'POST',
        data
    })
        .then((response) => {
            console.log('invoiceRequest',response.data);
            dispatch({
                type: "loading",
                payload: false
            });
            if (response.data.result) {
                dispatch({type: 'confirmInvoiceRequestModal', payload:false})
                toast.dark('درخواست پیش فاکتور با موفقیت ارسال شد.');
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
