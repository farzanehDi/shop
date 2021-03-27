import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import Styles from './paymentWay.module.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {getCheckoutInfo} from "../../redux/actions/checkout";
import {toast} from "react-toastify";
import {formatNumber} from "../../utils/formatNumber";

const PaymentWay = () => {

    const dispatch = useDispatch();
    const [paymentWay, setPaymentWay] = useState([]);
    const [selectedPaymentWay, setSelectedPaymentWay] = useState();
    const [cartItemList, setCartItemList] = useState([]);
    const checkoutInfo = useSelector((state: any) => state.auth.checkoutInfo);
    const cartList = useSelector((state: any) => state.auth.cartItems);

    useEffect(() => {
        checkoutInfo && setPaymentWay(checkoutInfo.payment_ways);
        let selected = checkoutInfo && checkoutInfo.payment_ways.find((pw: { is_selected: boolean; }) => pw.is_selected === true);
        setSelectedPaymentWay(selected && selected.id);
    }, [checkoutInfo])

    useEffect(() => {
        cartList.array && setCartItemList(cartList.array);
    }, [cartList])

    const settings = {

        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive:
            [
                {breakpoint: 1024, settings: {slidesToShow: 4, slidesToScroll: 1, infinite: false, dots: true}},
                {breakpoint: 600, settings: {slidesToShow: 3, slidesToScroll: 2, initialSlide: 2, infinite: false}},
                {breakpoint: 480, settings: {slidesToShow: 2, slidesToScroll: 1, infinite: false}}
            ]
    };

    const updatePaymentWay = (id: string | number) => {
        dispatch({type: 'paymentWayCheckout', payload: id});
        dispatch(getCheckoutInfo());
    };

    const useCredit = (e: { target: { checked: boolean }; }) => {
        dispatch({type: 'loading', payload: true});
        let data = {
            is_use_credit: e.target.checked ? 1 : 0,
            invoice_id: localStorage.getItem("factorId")
        };
        axios({url: Routers.USE_CREDIT, method: 'POST', data}).then(response => {
            dispatch({type: 'loading', payload: false});
            if (response.data.result) {
                dispatch(getCheckoutInfo());
            } else {
                toast.dark(response.data.message[0])
            }
        }).catch((e) => {
            dispatch({type: 'loading', payload: false});
            console.log(e)
        })
    };

    return (
        <>
            <div className={'flex items-center text-xl text-blue-200 font-bold mt-6'}>
                <i className="far fa-credit-card ml-2"></i>
                <h2>شیوه پرداخت</h2>
            </div>

            <div
                className={`flex flex-col divide-y divide-dashed  bg-white rounded shadow p-4 mt-1 mb-6 ${Styles.slider}`}>
                <div className={'px-5 pb-3'}>
                    <Slider {...settings}>
                        {
                            cartItemList.map((item: { total_number: number; product_name: string; product_image: string }, index: number) => (
                                <div key={`cartItems${index}`} className={"text-center p-2 relative"}>
                                    <div className={`flex items-center justify-center bg-orange-200 rounded-full w-8 h-8 text-white
                                        absolute top-0 right-0 mr-2`}>{item.total_number}
                                    </div>
                                    <img src={item.product_image} alt={item.product_name}
                                         className={"mx-auto h-20"}/>
                                    <p className={'text-sm'}>{item.product_name}</p>

                                </div>
                            ))
                        }

                    </Slider>
                </div>

                <div className={'py-4 flex flex-wrap items-center justify-around'}>
                    {
                        paymentWay.map((item: { image: string; title: string; is_selected: boolean; id: string | number }, index: number) => (
                            <div key={`paymentWay${index}`} className={'flex items-center'}>
                                <img src={item.image} alt={item.title}
                                     className={'h-16 rounded border border-gray-100'}/>
                                <input type={"radio"} className={"mx-2"} name={"paymentMethod"}
                                       defaultChecked={item.is_selected}
                                       onClick={() => updatePaymentWay(item.id)}
                                />
                                <span>{item.title}</span>
                            </div>
                        ))
                    }
                </div>
                {/***use credit***/}
                <div className={`items-center pt-4 
                ${(checkoutInfo && checkoutInfo.user_information[0].credit && selectedPaymentWay == 1) ? 'flex' : 'hidden'}`}>
                    <input type="checkbox" className={"ml-2"} onChange={useCredit}
                           defaultChecked={checkoutInfo && checkoutInfo.cart_items.use_credit}/>
                    {checkoutInfo && checkoutInfo.user_information &&
                    <p className={"hidden md:block"}>استفاده از اعتبار
                        ( {checkoutInfo.cart_items.use_credit ? formatNumber(checkoutInfo.cart_items.use_credit) :
                            formatNumber(checkoutInfo.user_information[0].credit)} ریال )</p>
                    }
                </div>

            </div>
        </>
    );
};

export default PaymentWay;