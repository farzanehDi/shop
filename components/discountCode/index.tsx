import React, {useState} from 'react';
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {getCheckoutInfo} from "../../redux/actions/checkout";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {formatNumber} from "../../utils/formatNumber";

const DiscountCode = () => {

    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    let checkoutInfo = useSelector((state: any) => state.auth.checkoutInfo)

    const discountCode = (use: number) => {

        const input = document.querySelector('.inputGroupCode');
        if (code.trim() === '' && use) {
            input && input.classList.add('border-red-600');
            return false;
        } else {
            input && input.classList.remove('border-red-600');
        }
        setLoading(true);
        let data = {
            discount_code: code || undefined,
            is_use_discount_code:use,
            invoice_id: localStorage.getItem("factorId")
        };
        axios(Routers.DiSCOUNT, {method: 'POST', data}).then(response => {
            setLoading(false);
            if (response.data.result) {
                setCode('');
                dispatch(getCheckoutInfo());
            } else {
                toast.dark(response.data.message[0])
            }
        }).catch((e) => {
            setLoading(false);
            toast.dark(e.response.data.message[0])
        })
    }

    return (
        <>
            <div className={'flex items-center text-xl text-blue-200 font-bold mt-6'}>
                <i className="fas fa-gift ml-2"></i>
                <h2>کد تخفیف</h2>
            </div>

            <div className={'bg-white rounded shadow p-4 mt-1 mb-6'}>

                <div className={checkoutInfo && checkoutInfo.cart_items.use_discountCode ? 'hidden' : ''}>
                    <p className={'text-center'}>اگر کد تخفیف دارید در این بخش وارد کنید و دکمه اعمال را بزنید</p>
                    <div
                        className={`inputGroupCode flex border border-gray-200 rounded fit-content mt-4 mx-auto ${code ? 'border-gray-300' : ''}`}>
                        <input type={'text'} value={code} onChange={(e) => setCode(e.target.value)}
                               placeholder={'کد تخفیف...'} className={'p-2 m-1'}/>
                        <button className={`w-32 bg-blue-200 text-white h-full py-3 rounded-tl rounded-bl flex items-center 
                        justify-center hover:bg-blue-300 focus:outline-none`} disabled={loading}
                                onClick={() => discountCode(1)}>
                            <span>اعمال کد</span>
                            <span
                                className={`mr-1 flex items-center justify-center text-orange-200 ${loading ? 'block' : 'hidden'}`}>
                                <i className="fas fa-circle-notch fa-spin text-xl"></i>
                            </span>
                        </button>
                    </div>
                </div>

                <div className={checkoutInfo && checkoutInfo.cart_items.use_discountCode ? '' : 'hidden'}>
                    <div className={`flex flex-col items-center justify-center bg-green-100 rounded text-green-700 p-4
                        border border-green-200 `}>
                        <span>کد تخفیف با موفقیت اعمال شد</span>
                        <span
                            className={'mt-2'}>  میزان تخفیف : {checkoutInfo && formatNumber(checkoutInfo.cart_items.use_discountCode)} ریال </span>
                    </div>
                    <div className={`flex items-center cursor-pointer text-red-600 fit-content mx-auto mt-3
                    border-b-2 border-dashed border-red-600 pb-2 hover:text-red-700 hover:border-red-700`}
                         onClick={() => discountCode(0)}>
                        <i className="fas fa-times ml-2 text-xl"></i>
                        <span>اکنون نمیخواهم از کد تخفیف استفاده کنم</span>
                    </div>
                </div>

            </div>

        </>
    );
};

export default DiscountCode;