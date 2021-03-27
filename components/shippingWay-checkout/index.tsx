import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCheckoutInfo} from "../../redux/actions/checkout";
import {formatNumber} from "../../utils/formatNumber";


const ShippingWay = () => {

    const dispatch = useDispatch();
    const [shippingType, setShippingType] = useState([]);
    let checkoutInfo = useSelector((state: any) => state.auth.checkoutInfo)

    useEffect(() => {
        checkoutInfo && setShippingType(checkoutInfo.shipping_types)
    }, [checkoutInfo])

    const updateShipping = (id: string | number) => {
        dispatch({type:'shippingTypeCheckout',payload:id});
        dispatch(getCheckoutInfo());
    };

    return (
        <>
            <div className={'flex items-center text-xl text-blue-200 font-bold mt-6'}>
                <i className="fas fa-shipping-fast ml-2"></i>
                <h2>انتخاب شیوه ارسال</h2>
            </div>

            <div className={'bg-white rounded shadow p-3 mt-1 mb-6'}>

                <div className={'flex flex-col items-center justify-center divide-y divide-gray-200'}>
                    {
                        shippingType.map((item: { is_selected: boolean; id: number | string; description: string; image: string;
                        price: number;title:string}, index: number) => (
                            <div key={`shipping${index}`} className={`pt-3 w-full flex items-center justify-center
                            sm:justify-between mb-2 flex-wrap`}>
                                <input type="radio" className={"ml-2"} name={"shipping"}
                                       onClick={() => updateShipping(item.id)}
                                       defaultChecked={item.is_selected}/>
                                <img src={item.image} alt={"انتحاب شیوه ارسال"} className={`sm:w-36 w-32 sm:ml-5`}/>

                                <div className={"w-full sm:w-2/5 text-justify"}
                                     dangerouslySetInnerHTML={{__html: item.description}}>
                                </div>
                                <p className={'mx-auto mt-3 sm:mt-0 text-lg'}>{formatNumber(item.price)} ریال</p>
                            </div>
                        ))
                    }
                </div>

            </div>

        </>
    );
};

export default ShippingWay;