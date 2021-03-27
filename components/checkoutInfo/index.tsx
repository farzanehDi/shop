import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {formatNumber} from "../../utils/formatNumber";

interface paidInfo {
    total: number,
    shipping_cost: number,
    use_credit: number,
    use_discountCode: number,
    vat: number,
    paid:number
}

const CheckoutInfo = (props: { finalOrder: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined; }) => {
    const [paidInfo, setPaidInfo] = useState<paidInfo>();
    let checkoutInfo = useSelector((state: any) => state.auth.checkoutInfo)

    useEffect(() => {
        checkoutInfo && setPaidInfo(checkoutInfo.cart_items)
    }, [checkoutInfo])


    return (
        <>
            <div className={'flex items-center justify-between mb-3'}>
                <span>جمع کل خرید شما</span>
                <span>{paidInfo && formatNumber(paidInfo.total)} ریال</span>
            </div>
            <div className={'flex items-center justify-between mb-3'}>
                <span>هزینه ارسال</span>
                <span>{paidInfo && formatNumber(paidInfo.shipping_cost)} ریال</span>
            </div>
            <div className={'flex items-center justify-between mb-3'}>
                <span>استفاده از اعتبار</span>
                <span>{paidInfo&&formatNumber(paidInfo.use_credit)} ریال</span>
            </div>
            <div className={'flex items-center justify-between mb-3'}>
                <span>استفاده از کد تخفیف</span>
                <span>{paidInfo&&formatNumber(paidInfo.use_discountCode)} ریال</span>
            </div>
            <div className={'flex items-center justify-between mb-3'}>
                <span>ارزش افزوده</span>
                <span>{paidInfo&&formatNumber(paidInfo.vat)} ریال</span>
            </div>
            <div className={'border-t border-gray-200 pt-3'}>
                <p className={'text-center text-xl font-medium'}>مبلغ قابل پرداخت :</p>
                <p className={'text-center text-red-600 font-medium text-xl'}>{paidInfo&&formatNumber(paidInfo.paid)} ریال</p>
                <button className={'btn-orange mt-4 mx-auto flex items-center justify-center text-xl'}
                onClick={props.finalOrder}>
                    <i className="fas fa-arrow-left ml-2"></i>
                    <span> تایید نهایی سفارش</span>
                </button>
            </div>

        </>
    );
};

export default CheckoutInfo;