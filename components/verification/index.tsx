import axios from 'axios';
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {Routers} from '../../utils/configUrl';
import Link from 'next/link';
import Cookies from "js-cookie";
import {cartItems} from "../../redux/actions/cartItems";
import Router from "next/router";
import {comments} from "../../redux/actions/productComment";
import {getProductDetails} from "../../redux/actions/productDetails";
import { useRouter } from 'next/router';


const Verification = (props: { productId: string | number | null; productCode: string | number; checkoutPage: boolean }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [code, setCode] = useState('');
    const cellphone = useSelector((state: any) => state.auth.cellphone);
    const configServer = useSelector((state: any) => state.auth.configServer);
    const invoiceReq = useSelector((state: any) => state.auth.invoiceReq);
    const [loading, setLoading] = useState(false);


    const sendVerification = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!code) {
            toast.dark('لطفا کد فعالسازی را وارد نمایید');
            return false;
        }
        setLoading(true);

        let data = {
            code,
            "mobile": cellphone,
            "session_id": localStorage.getItem('sessionId')
        };
        axios({
            method: "POST",
            url: Routers.VERIFICATION,
            data
        }).then(response => {
            setLoading(false);
            if (response.data.result) {

                Cookies.set('auth', response.data.data.token, {expires: 360});
                dispatch({type: 'loginSection', payload: false})
                dispatch({type: 'isLogin', payload: true})
                dispatch({type: 'completeProfile', payload: response.data.data.is_complete_profile})
                dispatch({type: 'loginRegisterModal', payload: false});
                dispatch(cartItems());
                if (props.checkoutPage) {
                    Router.push('/checkout');
                    return false;
                }
                if (configServer) {
                    dispatch({type: 'configServer', payload: false});
                    window.location.href = "https://falnic.com/my/profile/serverDetails/" + props.productCode;
                    return false;
                } else if (invoiceReq) {
                    dispatch({type: 'invoiceReq', payload:false});
                    dispatch({type: 'confirmInvoiceRequestModal', payload: true});
                }

                if (props.productId) {
                    dispatch(comments(props.productId));
                    dispatch(getProductDetails(props.productId));
                }
                toast.dark('ورود شما با موفقیت انجام شد');
                //***soft reload***
                router.replace(router.asPath);

            } else {
                toast.dark(response.data.message[0]);
            }
        }).catch(error => {
            setLoading(false);
            console.log(error)
        })
    }
    return (
        <div className={'grid grid-cols-12 flex items-stretch justify-between'}>
            <div className={'sm:col-span-7 col-span-12 p-6 sm:border-l border-gray-100'}>
                <p className={'text-justify'}>لطفا کد فعالسازی را وارد نمایید:</p>
                <form className={'flex flex-col mt-1'}>

                    <input className={'input my-3'}
                           type={"text"}
                           value={code}
                           autoFocus
                           onChange={(e) => setCode(e.target.value)}/>
                    <p className={'mb-4'}>
                        ثبت نام در فالنیک به منزله قبول تمام قوانین و مقررات مربوط به این شرکت است
                        <Link href={"#"}><a className={'text-blue-200 hover:text-blue-400'}> ( مطالعه قوانین و مقررات
                            )</a></Link>
                    </p>
                    <button className={`flex items-center justify-center btn-blue py-3 ${loading ? 'btn-waite' : ''}`}
                            onClick={sendVerification}
                            disabled={loading}>
                        <span>ارسال</span>
                        <i className={`${loading ? 'fas fa-circle-notch mr-1' : 'hidden'} text-orange-200 fa-spin text-xl`}></i>
                    </button>
                </form>
            </div>
            <div className={'sm:flex flex-col items-center justify-center sm:col-span-5 hidden p-5'}>
                <i className="fas fa-sms"></i>
                <p className={'text-center mt-3'}>جهت ورود و یا ثبت نام می بایست کد فعالسازی را وارد نمایید</p>
            </div>
            <style jsx>
                {`
                  .fa-sms {
                    font-size: 50px
                  }
                `}
            </style>
        </div>
    );
};

export default Verification;