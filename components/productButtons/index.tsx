import React, {useState} from 'react';
import {addToCart} from "../../redux/actions/addToCart";
import {useDispatch, useSelector} from "react-redux";
import ConfirmInvoiceRequest from "../confirmInvoiceRequest";


const ProductButtons = (props: {
    data: {
        purchased_number: number; code: string; status: string | string[];
        id: React.ReactText; is_configuration: any; name_fa: string;
    };
}) => {

    const dispatch = useDispatch();
    const isLogin = useSelector((state: any) => state.auth.isLogin);
    const [productCount, setProductCount] = useState(1);

    const selectCount = (type: string) => {
        if (type == 'increase') {
            if (productCount < props.data.purchased_number) {
                setProductCount(productCount + 1);
            }
        } else {
            if (productCount >1) {
                setProductCount(productCount - 1);
            }
        }
    }

    const invoiceRequest = () => {
        console.log(isLogin)
        if (isLogin) {
            dispatch({type: 'confirmInvoiceRequestModal', payload: true});
        } else {
            dispatch({type: 'invoiceReq', payload:true});
            dispatch({type: 'loginRegisterModal', payload: true});
        }
    }

    const configServer = () => {
        if (isLogin) {
            window.location.href = "https://falnic.com/my/profile/serverDetails/" + props.data.code;
        } else {
            dispatch({type: 'configServer', payload: true});
            dispatch({type: 'loginRegisterModal', payload: true});
        }
    }

    return (
        <div className={'flex items-center justify-between flex-wrap w-full'}>
            {/* select number of p */}
            <div className={`items-stretch justify-center flex-no-wrap m-1 
                        ${props.data.status.includes('online_sell') || props.data.status.includes('online_sell_get_invoice')
                        || props.data.status.includes('get_invoice') ? "flex" : "hidden"}`}>
                <div
                    className="cursor-pointer text-xl flex items-center justify-center border-gray-100 bg-gray-100 px-5 rounded-tr-lg rounded-br-lg"
                    onClick={() => selectCount('increase')}>+
                </div>
                <input type="text" value={productCount}
                       className={"text-xl w-12 h-12 text-center border-t border-b border-gray-100"}
                       readOnly={true} maxLength={props.data.purchased_number}/>
                <div
                    className="text-xl flex items-center justify-center cursor-pointer border bg-gray-100 border-gray-100 px-5 rounded-tl-lg rounded-bl-lg"
                    onClick={() => selectCount('decrease')}>-
                </div>
            </div>
            {/***show bottom of product***/}
            {/* add to cart */}
            <button className={`m-1 items-center justify-center bg-orange-200 rounded p-3 text-white focus:outline-none
                         hover:bg-orange-300 hover:shadow-sm ${(props.data.status.includes('online_sell') || props.data.status.includes('online_sell_get_invoice') ? 'flex' : 'hidden')}`}
                    onClick={() => dispatch(addToCart(props.data.id, productCount))}>
                <span>افزودن به سبد خرید</span>
                <i className="mr-1 fas fa-cart-arrow-down text-lg"></i>
            </button>
            {/* invoice request */}
            <button className={`btn-blue py-3 m-1 ${(props.data.status.includes('get_invoice') ||
            props.data.status.includes('get_invoice_contact_us') || props.data.status.includes('online_sell_get_invoice') ? 'flex' : 'hidden')}`}
                    onClick={invoiceRequest}>
                <span>درخواست پیش فاکتور</span>
                <div className={'hidden sm:block '}>
                    <i className="mr-2 fas fa-file-alt text-lg"></i>
                </div>
            </button>
            <button
                className={`btn-blue py-3 m-1 ${(props.data.is_configuration ? 'flex' : 'hidden')}`}
                onClick={configServer}>
                <span>درخواست پیکربندی</span>
                <div className={'hidden sm:block '}>
                    <i className="mr-2 fas fa-server text-lg"></i>
                </div>
            </button>
            <button className={`btn-blue py-3 m-1 ${(props.data.status.includes('contact_us') ||
            props.data.status.includes('get_invoice_contact_us') ? 'flex' : 'hidden')}`}
                    onClick={() => dispatch({type: 'contactModal', payload: true})}>
                <span>تماس بگیرید</span>
                <div className={'hidden sm:block '}>
                    <i className="mr-2 fas fa-phone text-lg"></i>
                </div>
            </button>
            <p className={`text-red-600 m-1 ${props.data.status.includes('unavailable') ? '' : 'hidden'}`}>
                در حال حاضر این کالا ناموجود می باشد
            </p>
            <b className={`text-red-600 m-1 ${props.data.status.includes('out_of_date') ? '' : 'hidden'}`}>
                این کالا از رده خارج می باشد
            </b>

            <ConfirmInvoiceRequest name={props.data.name_fa} count={productCount} productId={props.data.id}/>
        </div>
    );
};

export default ProductButtons;