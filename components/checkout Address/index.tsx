import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AddressModal from "../addressModal";
import {getCheckoutInfo} from "../../redux/actions/checkout";

const CheckoutAddress = () => {

    const dispatch = useDispatch();
    const [address, setAddress] = useState([]);
    let checkoutInfo = useSelector((state: any) => state.auth.checkoutInfo)

    useEffect(() => {
        checkoutInfo && checkoutInfo.user_information && setAddress(checkoutInfo.user_addresses)
    }, [checkoutInfo])

    const updateAddress = (id: string | number) => {
        dispatch({type: 'addressCheckout', payload: id});
        dispatch(getCheckoutInfo());
    };

    return (
        <>
            <div className={'flex items-center text-xl text-blue-200 font-bold mt-6'}>
                <i className="fas fa-map-marker-alt ml-2"></i>
                <h2>آدرس ارسال کالا</h2>
            </div>

            <div className={'flex items-center justify-between bg-white rounded shadow p-3 mt-1 mb-6 flex-wrap'} id={'addressInfoCheckout'}>
                <div>
                    {
                        address && address.length > 0 ? address.map((item: { is_selected: boolean; id: number | string; address: string }, index) => (
                                <div key={`address${index}`} className={"flex items-center mb-2"}>
                                    <input type="radio" className={"ml-2"}
                                           defaultChecked={item.is_selected}
                                           name={"address"}
                                           onClick={() => updateAddress(item.id)}/>
                                    <p className={"hidden md:block"}>{item.address}</p>
                                    <p className={"block md:hidden"}>{item.address.length > 60 ? item.address.slice(0, 60) + " ..." : item.address}</p>
                                </div>
                            ))
                            :
                            <p>شما تاکنون آدرسی ثبت نکرده اید</p>
                    }

                </div>
                {/***add address***/}
                <button className={'mx-auto mt-3 sm:mx-0 sm:mt-0 btn-blue flex items-center'}
                        onClick={() => dispatch({type: 'addressModal', payload: true})}>
                    <i className="fas fa-plus ml-2"></i>
                    <span>ثبت آدرس</span>
                </button>
            </div>
            <AddressModal/>
        </>
    );
};

export default CheckoutAddress;