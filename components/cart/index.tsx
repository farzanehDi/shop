import React, {useRef, useState, useEffect} from 'react';
import styles from './cart.module.scss';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux';
import {formatNumber} from '../../utils/formatNumber';
import {cartItems, deleteCartItems} from '../../redux/actions/cartItems';

interface cartItem {
    product_image: string,
    code: string | number,
    id: string | number,
    product_en_name: string,
    product_fa_name: string,
    product_price: number,
    total_number: number
}

const Cart = () => {

    const dispatch = useDispatch();
    const cart = useRef(null);
    const [cartItemList, setCartItemList] = useState([]);
    const [totalNumber, setTotalNumber] = useState(0);
    const [payableAmount, setPayableAmount] = useState(0);
    const cartList = useSelector((state: any) => state.auth.cartItems);
    const showCart = useSelector((state: any) => state.auth.showCart);

    useEffect(() => {
        dispatch(cartItems());
    }, [])

    useEffect(() => {
        cartList.array && setCartItemList(cartList.array);
        cartList.payable_amount && setPayableAmount(cartList.payable_amount);
        cartList.total_number!=undefined && setTotalNumber(cartList.total_number);
    }, [cartList])

    const showCartFn = (display: boolean) => {
        dispatch({type: 'showCart', payload: display})
    };


    return (
        <div className={'relative'} onMouseOver={() => showCartFn(true)} onMouseOut={() => showCartFn(false)}>

            <Link href={'/cart'}>
                <div className={`cursor-pointer border border-blue-200 text-blue-200 rounded p-3 flex items-center 
                justify-center hover:border-blue-300 hover:text-blue-300`}>
                    <i className={`fas fa-shopping-cart text-xl`}></i>
                    <span className={'mx-1'}>سبد خرید</span>
                    <div
                        className={`p-2 h-6 w-6 rounded rounded-full bg-orange-200 text-white flex items-center justify-center`}>
                        <span>{totalNumber}</span>
                    </div>
                </div>
            </Link>

            {/***cart items***/}
            <div className={`absolute ${showCart ? 'h-auto opacity-1' : 'h-0 opacity-0'}`} id={'cart'} ref={cart}>

                <div className={`${styles.arrowBox} mt-3 bg-white rounded z-10 ${showCart ? 'block' : 'hidden'}`}>
                    {/***cart items***/}

                    <div className={`${cartItemList.length <= 0 ? 'hidden' : ''}`}>
                        <div className={'divide-y divide-gray-100 p-3'}>
                            {
                                cartItemList.map((item: cartItem, index: number) => (
                                    <div key={`cartItem${index}`} className={'flex items-center justify-between'}>
                                        <div className={`p-2 rounded-full bg-red-100 flex items-center justify-center 
                                        cursor-pointer text-xl text-red-500 ${styles.del}`}
                                             onClick={() => dispatch(deleteCartItems(item.id))}>
                                            &times;
                                        </div>
                                        <img src={item.product_image} alt={item.product_fa_name}
                                             className={styles.imgCard}/>
                                        <div className={'flex flex-col text-sm'}>
                                            <Link href={`/p/${item.product_en_name}`}>
                                                <span className={'cursor-pointer'}>{item.product_fa_name}</span>
                                            </Link>
                                            <div
                                                className={'grid grid-cols-5 divide-x divide-x-reverse divide-gray-100'}>
                                                <span
                                                    className={'col-span-3 text-center'}>{formatNumber(item.product_price)} ریال</span>
                                                <span
                                                    className={'col-span-2 text-center'}>{item.total_number} عدد</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={'text-lg text-center my-2'}>
                            <strong>مبلغ پرداختی : {formatNumber(payableAmount)} ریال</strong>
                        </div>

                        <Link href={'/checkout'}>
                            <button className={'py-3 btn-orange w-full text-center rounded-none rounded-bl rounded-br'}>
                                خریدتان را نهایی کنید
                            </button>
                        </Link>


                    </div>

                    {/***if basket is empty***/}
                    <div className={`py-4 items-center justify-center ${cartItemList.length > 0 ? 'hidden' : 'flex'}`}>
                        <i className="fas fa-shopping-basket ml-2 text-xl"></i>
                        <span>سبد خرید شما خالی است</span>
                    </div>
                    {/***/}
                </div>
            </div>
            {/***/}
        </div>
    );
};

export default Cart;