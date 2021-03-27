import React, {useEffect, useState} from 'react';
import CompleteProfile from "../completeProfile";
import {useDispatch, useSelector} from "react-redux";

interface userInfo {
    name: string | undefined;
    family: string | undefined;
    email: string | undefined;
    mobile: number | undefined;
}

const UserInformation = () => {

    const dispatch = useDispatch();
    const [userInformation, setUserInformation] = useState<userInfo>();
    let checkoutInfo = useSelector((state: any) => state.auth.checkoutInfo)

    useEffect(() => {
        checkoutInfo && setUserInformation(checkoutInfo.user_information[0]);
    }, [checkoutInfo])

    return (
        <>
            <div className={'flex items-center text-xl text-blue-200 font-bold'} >
                <i className="fas fa-user ml-2"></i>
                <h2>اطلاعات کاربری</h2>
            </div>

            <div className={'flex items-center justify-between bg-white rounded shadow p-3 mt-1 flex-wrap'} id={'userInfoCheckout'}>
                {userInformation &&
                <div className={''}>
                    <p> نام و نام خانوادگی : {userInformation.name} {userInformation.family}</p>
                    <p className={'my-3'}>پست الکترونیک : {userInformation.email}</p>
                    <p>تلفن همراه : {userInformation.mobile}</p>

                </div>
                }
                <button
                    className={`mx-auto mt-3 sm:mx-0 sm:mt-0 btn-blue items-center ${userInformation && userInformation.name ? 'hidden' : 'flex'}`}
                    onClick={() => dispatch({type: 'completeProfileModal', payload: true})}>
                    <i className="fas fa-user-edit ml-2"></i>
                    <span>تکمیل پروفایل</span>
                </button>
            </div>
            <CompleteProfile/>
        </>
    );
};

export default UserInformation;