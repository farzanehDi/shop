import React, {useEffect, useState} from 'react';
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {formatNumber} from "../../utils/formatNumber";
import Link from "next/link";
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {toast} from "react-toastify";
import {cartItems, deleteCartItems} from "../../redux/actions/cartItems";


const Cart = () => {

    const dispatch = useDispatch();
    const cartItemsListRedux = useSelector((state: any) => state.auth.cartItems);
    const [cartItemsList, setCartItemsList] = useState({array:[],total:0,total_profit:0,payable_amount:0});

    useEffect(() => {
        dispatch(cartItems());
    }, [])

    useEffect(() => {
        cartItemsListRedux && setCartItemsList(cartItemsListRedux);
    }, [cartItemsListRedux])

    const editCount = (e: { target: { value: string | number } }, code: string | number) => {
        dispatch({type: 'loading', payload: true});
       let data = {
            number_items: e.target.value,
            session_id: localStorage.getItem("sessionId")
        };
        axios({
            method: "PUT",
            url: `${Routers.EDIT_DELETE_CART}/${code}`,
            data
        }).then(response => {
            dispatch({type: 'loading', payload: false})
            if (response.data.result) {
                dispatch(cartItems());
            } else {
                toast.dark(response.data.message[0])
            }
        }).catch(e => {
            dispatch({type: 'loading', payload: false})
            console.log(e)
        })
    };
    return (
        <>
            <Head>
                <title>سبد خرید</title>
                <meta name="robots" content="noindex,nofollow"/>
            </Head>

            <h2 className={'mt-4 mb-6 font-bold text-xl '}>سبد خرید</h2>
            {/***if cart is empty***/}
            <h2 className={` items-center justify-center my-5 font-bold text-xl ${cartItemsList.array && cartItemsList.array.length > 0 ? 'hidden' : 'flex'}`}>
                <i className="fas fa-shopping-basket ml-2 fa-2x"></i>
                <span> سبد خرید شما در حال حاضر خالی است</span>
            </h2>

            <div
                className={`grid grid-cols-12 sm:gap-3 lg:gap-5 w-full ${cartItemsList.array && cartItemsList.array.length > 0 ? '' : 'hidden'}`}>

                {/***item section***/}
                <div className={`sm:col-span-8 col-span-12`}>
                    {
                        cartItemsList.array && cartItemsList.array.map((item: { id: string | number; product_image: string;
                            product_fa_name: string; total_number: string | number; salable_number: number; discount_price: Number; product_price: Number; }, index: number) => (
                            <div key={`cartItemPage${index}`}
                                 className={'shadow mb-4 p-2 flex justify-between flex-wrap items-center bg-white rounded'}>

                                <div onClick={() => dispatch(deleteCartItems(item.id))}
                                     className={"cursor-pointer text-xl bg-gray-100 pt-1 text-red-700 flex justify-center items-center ml-2 h-8 w-8 rounded-full"}
                                >&times;</div>

                                <img src={item.product_image} alt={item.product_fa_name} className={'sm:w-24 w-20'}/>
                                <p className={'sm:w-64 text-center w-3/5 sm:px-1'}>{item.product_fa_name}</p>
                                <div className={'flex justify-center sm:justify-around w-full sm:w-2/5 mx-auto lg:mx-0'}>
                                    <div className={'flex flex-col ml-3 sm:ml-0'}>
                                        <span>تعداد</span>
                                        <select value={item.total_number} onChange={(e) => editCount(e, item.id)}>
                                            {(() => {
                                                const options = [];

                                                for (let i = 1; i <= item.salable_number; i++) {
                                                    options.push(<option value={i} key={`option${i}`}>{i}</option>);
                                                }
                                                return options;

                                            })()}
                                        </select>
                                    </div>

                                    {/***price section***/}
                                    <div className={'flex flex-col items-center justify-center px-1'}>
                                        <del className={"text-red-600 " + (item.discount_price ? '' : 'hidden')}>
                                            {formatNumber(item.product_price)}&nbsp;ریال
                                        </del>

                                        <p className={"text-red-700 text-center " + (item.discount_price ? '' : 'hidden')}>
                                            {formatNumber(item.discount_price)} &nbsp;ریال
                                        </p>
                                        <p className={"text-red-700 text-center " + (!item.discount_price ? '' : 'hidden')}>
                                            {formatNumber(item.product_price)}&nbsp;ریال
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/***payment section***/}
                <div className={'bg-white sm:col-span-4 col-span-12 flex flex-col p-3 shadow rounded fit-content-h'}>
                    <div className={'flex justify-between items-center'}>
                        <span>جمع کل خرید شما</span>
                        <span>{formatNumber(cartItemsList.total)} ریال </span>
                    </div>
                    <div className={'flex justify-between items-center border-b-2 py-5 border-gray-200'}>
                        <span>سود شما از خرید</span>
                        <span>{formatNumber(cartItemsList.total_profit)} ریال </span>
                    </div>
                    <p className={'text-center mt-3 text-xl'}>مبلغ قابل پرداخت</p>
                    <p className={'text-center mt-2 text-xl text-red-700 font-bold'}>{formatNumber(cartItemsList.payable_amount)} ریال </p>

                    <Link href={'/checkout'}>
                        <div className={'btn-blue mt-5 mb-2 cursor-pointer flex items-center justify-center py-3'}>
                            <i className="fas fa-arrow-left ml-2 text-xl"></i>
                            <span>ادامه ثبت سفارش</span>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    );
};

export default Cart;