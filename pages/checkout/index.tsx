import React, {useEffect} from 'react';
import Head from "next/head";
import {getCheckoutInfo} from "../../redux/actions/checkout";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";

import UserInformation from "../../components/userInformation-checkout";
import CheckoutAddress from "../../components/checkout Address";
import ShippingWay from "../../components/shippingWay-checkout";
import DiscountCode from "../../components/discountCode";
import PaymentWay from "../../components/paymentWay";
import FactorCheckout from "../../components/factorCheckout";
import CheckoutInfo from "../../components/checkoutInfo";
import {toast} from "react-toastify";
import axios from "axios";
import {Routers} from "../../utils/configUrl";

const Checkout = () => {

    const dispatch = useDispatch();
    let checkoutInfo = useSelector((state: any) => state.auth.checkoutInfo)

    useEffect(() => {
        dispatch(getCheckoutInfo());
    }, []);

    const finalOrder = () => {

        const userInfo = document.getElementById('userInfoCheckout');
        const addressIfo = document.getElementById('addressInfoCheckout');
        let error=false;

        if (!checkoutInfo.user_information[0].name) {
            userInfo && userInfo.classList.add('border-2');
            userInfo && userInfo.classList.add('border-red-500');
            error=true;
        }else {
            userInfo && userInfo.classList.remove('border-2');
            userInfo && userInfo.classList.remove('border-red-500');
        }
        if (checkoutInfo.user_addresses.length<=0) {
            addressIfo && addressIfo.classList.add('border-2');
            addressIfo && addressIfo.classList.add('border-red-500');
            error=true;
        }else {
            addressIfo && addressIfo.classList.remove('border-2');
            addressIfo && addressIfo.classList.remove('border-red-500');
        }

        if(error) {
            toast.dark('لطفا موارد خواسته شده را تکمیل نمایید')
            return false;
        }
        dispatch({type:'loading',payload:true});
        axios(Routers.FINAL_ORDER,{method:'POST',data:{
            invoice_id:localStorage.getItem("factorId")
        }}).then(response=>{
            dispatch({type:'loading',payload:false});
            if(response.data.result){
                window.location.href=response.data.data.redirect;
            }else {
                toast.dark(response.data.message[0]);
            }
        }).catch(e=>{
            dispatch({type:'loading',payload:false});
            console.log(e)
        })
    };

    return (
        <>
            <Head>
                <title>تایید نهایی سفارش</title>
                <meta name="robots" content="noindex,nofollow"/>
            </Head>

            <div className={`grid grid-cols-12 sm:gap-3 lg:gap-5 w-full py-3`}>
                <div className={`sm:col-span-8 col-span-12`}>
                    <UserInformation/>
                    <CheckoutAddress/>
                    <ShippingWay/>
                    <DiscountCode/>
                    <PaymentWay/>
                    <FactorCheckout/>
                    {/***links***/}
                    <div className={"flex justify-between items-center my-4"}>
                        <Link href={`/cart`}>
                            <span
                                className={'cursor-pointer font-medium text-blue-200 border-b border-dashed pb-1 border-blue-200'}>« بازگشت به سبد خرید</span>

                        </Link>
                        <button className={"font-medium text-blue-200 border-b border-dashed pb-1 border-blue-200"}
                                onClick={finalOrder}>
                            تایید نهایی سفارش »
                        </button>
                    </div>

                </div>
                {/***payment section***/}
                <div
                    className={'bg-white sm:col-span-4 col-span-12 flex flex-col p-3 shadow rounded fit-content-h sticky top-0'}>
                    <CheckoutInfo finalOrder={finalOrder}/>
                </div>
            </div>

        </>
    );
};

export default Checkout;