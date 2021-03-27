import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Routers } from '../../utils/configUrl';
import { fixNumbers,validateMobile } from '../../utils/validate';

const Index = () => {

    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [ios, setIos] = useState<boolean>();

    useEffect(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.platform || "");
        setIos(isIOS);
    }, []);

    const sendMobileNumber = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(!validateMobile(mobile)){
            toast.dark('شماره وارد شده معتبر نمی باشد.');
            return false;
        }
        setLoading(true);
        
        axios({
            method: "POST",
            url:Routers.LOGIN,
            data:{mobile:fixNumbers(mobile)}
        }).then(response => {
            console.log(response.data)
            setLoading(false);
            if (response.data.result) {
                dispatch({ type: 'loginSection', payload: true })
                dispatch({ type: 'cellphone', payload:fixNumbers(mobile) })
            }
            else {
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
                <p className={'text-justify'}>جهت ورود به حساب کاربری و یا عضویت در فالنیک شماره تلفن همراه خود را وارد نمایید.</p>
                <form className={'flex flex-col my-5'}>
                    <label>شماره تلفن همراه</label>
                    <input className={'input my-3'}
                        type={ios ? "text" : "number"}
                        pattern="\d*"
                        autoFocus
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)} />
                    <button className={`flex items-center justify-center btn-blue py-3 ${loading?'btn-waite':''}`} onClick={sendMobileNumber}
                            disabled={loading}>
                        <span>ورود/عضویت</span>
                        <i className={`${loading ? 'fas fa-circle-notch mr-1' : 'hidden'} text-orange-200 fa-spin text-xl`}></i>
                    </button>
                </form>
            </div>
            <div className={'sm:flex flex-col items-center justify-center sm:col-span-5 col-span-12 p-5 hidden'}>
                <i className={`fas fa-mobile-alt text-xl`}></i>
                <p className={'text-center mt-3'}>در مرحله بعد می بایست کد فعالسازی پیامک شده را وارد نمایید</p>
            </div>
            <style jsx>
                {`
                    .fa-mobile-alt{
                         font-size:50px
                    }
                `}
            </style>
        </div>
    );
};

export default Index;