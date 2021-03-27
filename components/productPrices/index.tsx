import React, {useState} from 'react';
import {formatNumber} from "../../utils/formatNumber";

const ProductPrices = (props: { data: { price: any; discount: any; status: string | string[];
packages: { price: number; name:string }[]; }; }) => {

    const [price, setPrice] = useState(props.data.price);
    const [discountPrice, setDiscountPrice] = useState(props.data.discount);

    const changePrice = (price: number) => {
        if (props.data.discount) {
            setDiscountPrice(price);
        } else {
            setPrice(price);
        }
    }

    return (
        <div className={`items-center justify-between w-full flex-wrap mb-3
                    ${props.data.status.includes('online_sell') ||
                    props.data.status.includes('online_sell_get_invoice') ? "flex" : "hidden"}`}>
            <div className={'flex flex-col justify-center items-center'}>
                <span className={'mb-1'}>قیمت مصرف کننده :</span>
                <del className={props.data.discount ? 'text-red-500' : 'hidden'}>
                    {formatNumber(price)}
                    <span className={'mr-1'}>ریال</span>
                </del>
                <div className={props.data.discount ? '' : 'hidden'}>
                    {formatNumber(discountPrice)}
                    <span className={'mr-1'}>ریال</span>

                </div>
                <div className={!props.data.discount ? '' : 'hidden'}>
                    {formatNumber(price)}
                    <span className={'mr-1'}>ریال</span>
                </div>

            </div>
            <div className={'flex items-center flex-wrap'}>
                {
                    props.data.packages.map((item: { price: number; name: React.ReactNode; }, index: number) => (
                        <label className="flex items-center m-1" key={`packageList${index}`}>
                            <input type="radio" className="form-check-input" name="optradio"
                                   onClick={() => changePrice(item.price)}/>
                            <span className={'mr-1'}>{item.name}</span>
                        </label>
                    ))
                }
            </div>

        </div>
    );
};

export default ProductPrices;