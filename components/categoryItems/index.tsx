import React, {useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from "next/router";
import Pagination from "react-js-pagination";
import Link from "next/link";
import queryString from 'query-string';
import styles from './categoryItem.module.scss';
import {formatNumber} from '../../utils/formatNumber';
import {addToCart} from '../../redux/actions/addToCart';
import LoginRegisterModal from '../loginRegisterModal';

interface productItems {
    brand_image: string;
    brand_name: string;
    image: string;
    name_fa: string;
    name_en: string;
    discount_price: number;
    status: string;
    price: number;
    is_add_cart: boolean;
    product_code: string | number;
    id: string | number;
    is_configuration: boolean
}

const Index = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const isLogin = useSelector((state: any) => state.auth.isLogin);
    const itemListRef = useRef<null | HTMLDivElement>(null);
    const categoryItems = useSelector((state: any) => state.auth.categoryItems);
    const itemLength = useSelector((state: any) => state.auth.itemLength);
    const [code, setCode] = useState<string | number>('');


    const handlePagination = async (pageNumber: number) => {

        const path = router.pathname
        const queryParams: any = router.query;
        queryParams.page = pageNumber;
        let asPath = `${path}?${queryString.stringify(queryParams, {arrayFormat: 'comma', encode: false})}`;
        router.push({
            pathname: path,
            query: queryString.stringify(queryParams, {arrayFormat: 'comma', encode: false})
        }, asPath)

        itemListRef.current && itemListRef.current.scrollIntoView({behavior: "smooth"});

    }

    const addToCartProduct = (productCode: string | number) => {
        dispatch(addToCart(productCode));
    };

    const configServer = (productCode: string | number) => {
        if (isLogin) {
            window.location.href = "https://falnic.com/my/profile/serverDetails/" + productCode;
        } else {
            setCode(productCode)
            dispatch({type: 'configServer', payload: true});
            dispatch({type: 'loginRegisterModal', payload: true});
        }
    };

    return (
        <>
            <div className={'absolute top-0'} ref={itemListRef}></div>
            {/*ghost div for scroll to top of page */}
            <div className="grid grid-cols-12 gap-1 sm:gap-2">
                {categoryItems.length > 0 ?
                    categoryItems.map((item: productItems, index: number) => (

                        <div
                            className="relative col-span-6 sm:col-span-4 lg:col-span-3 flex flex-col items-center justify-between border border-gray-100 shadow-inner rounded transition hover:shadow-md pt-1 bg-white"
                            key={`card${index}`}>
                            <div className={'w-full flex flex-col items-center'}>
                                <img src={item.brand_image} alt={item.brand_name}
                                     className={`absolute ${styles.logo}`}/>
                                <Link href={`/p/${item.name_en}`}>
                                    <a>
                                        <img src={item.image} alt={item.name_fa}
                                             className={`cursor-pointer ${styles.productImg}`}/>
                                    </a>
                                </Link>
                                <Link href={`/p/${item.name_en}`}>
                                    <a
                                        className={'cursor-pointer text-center mt-3 mb-1 px-1'}>{item.name_fa}</a>
                                </Link>
                                <del
                                    className={`text-red-600 text-center ${item.discount_price && (item.status === 'online_sell'
                                        || item.status === 'online_sell_get_invoice') ? '' : 'hidden'}`}>
                                    {formatNumber(item.price)} ریال
                                </del>
                                <span
                                    className={`text-center py-1 ${item.discount_price && (item.status === 'online_sell'
                                        || item.status === 'online_sell_get_invoice') ? '' : 'hidden'}`}>
                                    {formatNumber(item.discount_price)} ریال</span>

                                <span className={`py-1 ${!item.discount_price && (item.status === 'online_sell' ||
                                    item.status === 'online_sell_get_invoice') ? '' : 'hidden'}`}>{formatNumber(item.price)} ریال</span>

                                <div className={`text-left w-full text-lg mb-1 ${item.is_add_cart ? '' : 'hidden'} `}>
                                    <div className={`inline-flex items-center justify-end group cursor-pointer p-1
                                 ${styles.cart} duration-100 text-black text-opacity-50 hover:text-orange-200`}
                                         onClick={() => addToCartProduct(item.id)}>
                                        <small>افزودن به سبد</small>
                                        <i className="fas fa-cart-plus mx-1"></i>
                                        <div className={'opacity-0'}>
                                            <i className="fas fa-angle-double-right"></i>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`text-left w-full text-lg mb-1 ${item.is_configuration ? '' : 'hidden'}`}>
                                    <div className={`inline-flex items-center justify-end group cursor-pointer p-1
                                 ${styles.cart} duration-100 text-black text-opacity-50 hover:text-blue-200`}
                                         onClick={() => configServer(item.product_code)}>
                                        <small>درخواست پیکربندی</small>
                                        <i className="fas fa-server mx-1"></i>
                                        <div className={'opacity-0'}>
                                            <i className="fas fa-angle-double-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`mt-1 cursor-pointer text-center w-full bg-green-600 hover:bg-green-800 rounded-bl rounded-br ${item.status === 'online_sell' || item.status === 'online_sell_get_invoice' ? '' : 'hidden'}`}>
                                <Link href={`/p/${item.name_en}`}>
                                    <a>
                                        <p className={'py-2 text-white'}>خرید آنلاین</p>
                                    </a>
                                </Link>
                            </div>
                            <div
                                className={`mt-1 cursor-pointer text-center py-2 w-full bg-red-600 hover:bg-red-700 rounded-bl rounded-br ${item.status === 'unavailable' ? '' : 'hidden'}`}>
                                <Link href={`/p/${item.name_en}`}>
                                    <a>
                                        <span className={'text-white'}>ناموجود</span>
                                    </a>
                                </Link>
                            </div>
                            <div
                                className={`mt-1 cursor-pointer text-center w-full bg-gray-400 hover:bg-gray-500 rounded-bl rounded-br ${item.status === 'out_of_date' ? '' : 'hidden'}`}>
                                <Link href={`/p/${item.name_en}`}>
                                    <a>
                                        <p className={'py-2 text-white'}>از رده خارج</p>
                                    </a>
                                </Link>
                            </div>
                            <div
                                className={`mt-1 cursor-pointer text-center w-full bg-orange-200 hover:bg-orange-300 rounded-bl rounded-br ${item.status === 'get_invoice' ? '' : 'hidden'}`}>
                                <Link href={`/p/${item.name_en}`}>
                                    <a>
                                        <p className={'py-2 text-white'}>درخواست پیش فاکتور</p>
                                    </a>
                                </Link>
                            </div>
                            <div
                                className={`mt-1 cursor-pointer text-center w-full bg-blue-200 hover:bg-blue-400 rounded-bl rounded-br ${item.status === 'contact_us' ? '' : 'hidden'}`}>
                                <Link href={`/p/${item.name_en}`}>
                                    <a>
                                        <p className={'py-2 text-white'}>تماس با ما</p>
                                    </a>
                                </Link>
                            </div>

                        </div>
                    ))

                    :
                    <span className={'col-span-12 text-center mt-10'}>موردی برای نمایش وجود ندارد</span>
                }
            </div>

            <div className={'text-center mt-8 mb-4'}>
                <Pagination
                    activePage={Number(router.query.page) || 1}
                    itemsCountPerPage={32}
                    totalItemsCount={Number(itemLength)}
                    pageRangeDisplayed={4}
                    onChange={handlePagination}
                    innerClass={' border divide-x divide-x-reverse divide-gray-200 border-gray-200 rounded mx-auto inline-flex justify-center'}
                    itemClass={'bg-white flex items-center justify-center hover:text-blue-200'}
                    linkClass={'px-4 py-2 flex items-center justify-center '}
                    disabledClass={'cursor-default hover:cursor-default hover:text-opacity-50 hover:text-gray-200 text-gray-200'}
                    activeClass={'text-white bg-blue-200'}
                    itemClassLast={'rounded-bl rounded-tl'}
                    itemClassFirst={'rounded-br rounded-tr'}
                    // hideDisabled={true}
                    firstPageText={<i className="fas fa-angle-double-right"></i>}
                    lastPageText={<i className="fas fa-angle-double-left"></i>}
                    prevPageText={<i className="fas fa-angle-right"></i>}
                    nextPageText={<i className="fas fa-angle-left"></i>}
                >
                </Pagination>
            </div>
            <LoginRegisterModal productCode={code} productId={null}/>
        </>
    );
};


export default Index;