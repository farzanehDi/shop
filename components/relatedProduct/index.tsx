import React from 'react';
import Slider from "react-slick";
import Style from './relatedProduct.module.scss';
import Link from 'next/link';
import {formatNumber} from "../../utils/formatNumber";

interface productItems {

    image: string;
    name_fa: string;
    name_en: string;
    discount_price: number;
    price: number;

}

const RelatedProduct = (props: { data: productItems[]; }) => {


    const settings = {

        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive:
            [
                {breakpoint: 1024, settings: {slidesToShow: 3, slidesToScroll: 1, infinite: false, dots: true}},
                {breakpoint: 600, settings: {slidesToShow: 2, slidesToScroll: 2, initialSlide: 2, infinite: false}},
                {breakpoint: 480, settings: {slidesToShow: 1, slidesToScroll: 1, infinite: false}}
            ]
    };

    return (
        <section className={`overflow-x-hidden bg-white rounded p-10 border border-gray-100 shadow-inner shadow-sm mt-5
            ${props.data.length > 0 ? '' : 'hidden'} ${Style.slider}`}>
            <h3 className={'text-xl font-bold mb-3'}>محصولات مرتبط</h3>
            <Slider {...settings}>
                {
                    props.data.map((item: productItems, index: number) => (
                        <Link key={`relatedProduct${index}`} href={`/p/${item.name_en}`}>
                            <div className={`relative text-center cursor-pointer ${Style.rtl}`}>
                                <div className={`absolute left-0 right-0 text-left mt-2 pl-5 
                            ${item.discount_price ? '' : 'hidden'}`}>
                                    <img src={"/images/discount.png"} alt="discount"
                                         className={"float-left w-16 transform -rotate-12"}/>
                                </div>
                                <img src={item.image} alt={item.name_fa} className={"mx-auto w-40"}/>
                                <p className={"my-1"}>{item.name_fa}</p>
                                <strong
                                    className={!item.discount_price && item.price!=0 ? '' : 'hidden'}>{formatNumber(item.price)} تومان </strong>
                                <del
                                    className={`${item.discount_price ? '' : 'hidden'} text-red-500`}>{formatNumber(item.price)}</del>
                                <strong className={item.discount_price ? '' : 'hidden'}><br/>{formatNumber(item.discount_price)} تومان
                                </strong>
                            </div>
                        </Link>
                    ))
                }

            </Slider>
        </section>
    );
};

export default RelatedProduct;