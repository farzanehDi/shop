import React from 'react';
import Head from "next/head";
import Login from "../../components/login";
import Verification from "../../components/verification";
import {useSelector} from "react-redux";

const LoginRegister = () => {

    const loginSection = useSelector((state: any) => state.auth.loginSection);

    return (
        <>
            <Head>
                <title>ورود و ثبت نام</title>
            </Head>
            <div className={'py-10 w-11/12 max-w-3xl m-auto'}>
                <div className={'bg-white rounded shadow shadow-md '}>
                    {!loginSection ? <Login/> : <Verification productCode={''} productId={null} checkoutPage={true}/>}
                </div>
            </div>
        </>
    );
};

export default LoginRegister;