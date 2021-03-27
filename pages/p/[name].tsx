import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Routers} from '../../utils/configUrl';
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next';
import Head from 'next/head';
import styles from './product.module.scss';
import {SideBySideMagnifier} from "react-image-magnifiers";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import {formatNumber} from "../../utils/formatNumber";
import LoginRegisterModal from "../../components/loginRegisterModal";
import ContactModal from "../../components/contactModal";
import ProductCharacteristic from "../../components/productCharacteristic";
import {comments} from "../../redux/actions/productComment";
import RelatedProducts from '../../components/relatedProduct';
import UserOptionsProduct from '../../components/userOptionsProduct';
import {getProductDetails} from "../../redux/actions/productDetails";
import ProductButtons from "../../components/productButtons";
import ProductPrices from "../../components/productPrices";

const Product: NextPage = ({
                               productDetails,
                               relatedProduct
                           }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const dispatch = useDispatch();
    const [productImageZoom, setProductImageZoom] = useState('');
    const [fullUrl, setFullUrl] = useState('');

    useEffect(() => {

        dispatch(comments(productDetails.id));
        dispatch(getProductDetails(productDetails.id));
        setFullUrl(window.location.href);

    }, []);


    const showImage = (index: number) => {
        let image = document.getElementById(`imageGallery${index}`) as HTMLImageElement;
        let src = image ? image.src : '';
        console.log(src);
        setProductImageZoom(src);
    };


    return (
        <>
            <Head>
                <title>{productDetails.head_page.title}</title>
                {
                    productDetails.head_page.meta && productDetails.head_page.meta.map((obj: { [x: string]: any; }, index: number) => {
                        const keys = Object.keys(obj);
                        let props: any = {};
                        {
                            keys.map((key) => (
                                props[key] = obj[key]
                            ))
                        }
                        return (<meta key={`meta${index}`} {...props} />)
                    })
                }
            </Head>

            <section dangerouslySetInnerHTML={{__html: productDetails.breadcrumb}}></section>
            <section className={`grid grid-cols-12 gap-3 bg-white rounded p-5 border border-gray-100 shadow-inner 
            shadow-sm mt-3 ${styles.magnifiersContainer}`}>
                <div className={'col-span-12 sm:col-span-6 flex flex-col items-center justify-center'}>
                    {
                        productDetails.image &&
                        <SideBySideMagnifier
                            className="transition-none flex items-center justify-center mx-auto w-8/12"
                            imageSrc={productImageZoom || productDetails.image_small}
                            largeImageSrc={productImageZoom || productDetails.image}
                            imageAlt={productDetails.name_fa}
                            alwaysInPlace={false}
                            fillAvailableSpace={false}
                            switchSides={true}
                            fillGapRight={20}
                            zoomContainerBorder="1px solid #ccc"
                            zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
                        />
                    }

                    <hr className={'border border-gray-100 my-2 w-full'}/>
                    <div className={`flex ${styles.gallery}`}>
                        {
                            productDetails.gallery && productDetails.gallery.map((image: string | undefined, index: number) => (
                                <img key={`imageGallery${index}`} src={image} id={`imageGallery${index}`}
                                     className={'m-2 cursor-pointer border border-gray-200 rounded'}
                                     alt={`${productDetails.name_fa}-${index}`}
                                     onClick={() => showImage(index)}/>
                            ))
                        }

                    </div>
                </div>

                <div className={'flex flex-col col-span-12 sm:col-span-6 flex items-center justify-center lg:p-10 p-5'}>
                    <h1 className={'text-xl font-medium'}>{productDetails.name_fa}</h1>
                    <h2 className={'text-center mt-2 text-xl font-medium'}>{productDetails.name_en}</h2>
                    <ReactStars
                        count={5}
                        value={productDetails.score}
                        size={25}
                        activeColor="#ffd700"
                        edit={false}
                    />
                    <div className={'flex items-center justify-between w-full'}>
                        <span>کد کالا : {productDetails.code} </span>
                        <UserOptionsProduct id={productDetails.id} fullUrl={fullUrl}/>

                    </div>
                    <hr className={'border border-gray-100 my-4 w-full'}/>
                    {/***price section***/}
                    <ProductPrices data={productDetails}/>
                    {/***bottom section***/}
                    {productDetails.status &&
                    <ProductButtons data={productDetails}/>
                    }
                    {/***price option***/}
                    <div className={productDetails.buy_afew.length === 0 ? 'hidden' : 'w-full'}>
                        <hr className={'border border-gray-100 my-4 w-full'}/>
                        <p className="mb-2"> قیمت واحد برای خرید تعدادی: </p>
                        {productDetails.buy_afew.map((item: { number: number; price: number; }, index: number) => (
                            <div key={`priceOption${index}`}
                                 className="grid grid-cols-12 flex items-center my-1 p-2 flex-wrap bg-gray-50">
                                <div className="col-span-6 "> {item.number}+ عدد</div>
                                <div className="col-span-6 ">{formatNumber(item.price)} ريال</div>
                            </div>
                        ))}
                    </div>
                    {/***advantages***/}
                    <div className={"flex justify-around items-center flex-wrap w-full" +
                    (productDetails.advantages.length === 0 ? "hidden" : "")}>
                        <hr className={'border border-gray-100 my-4 w-full'}/>
                        {productDetails.advantages.map((option: { name: string; }, index: number) => (
                            <div key={`advantages${index}`} className="flex flex-col justify-center items-center">
                                <p>{option.name}</p>
                            </div>
                        ))}
                    </div>
                    {/***/}
                </div>
            </section>
            <ProductCharacteristic data={productDetails}/>
            <RelatedProducts data={relatedProduct}/>
            <LoginRegisterModal productCode={productDetails.code} productId={productDetails.id}/>
            <ContactModal id={productDetails.id}/>

        </>
    );
}


export const getServerSideProps: GetServerSideProps = async ({query}) => {

    const productName = await query.name as string;
    const response = await Axios.get(`${Routers.PRODUCTS}/${productName}`);
    const responseRelatedProduct = await Axios.get(`${Routers.PRODUCTS}/${productName}/related-products`);
    const productDetails = response.data.data || null;
    const relatedProduct = responseRelatedProduct.data.data && responseRelatedProduct.data.data.array;

    return {
        props: {
            productDetails,
            relatedProduct,

        }
    }
}

export default Product;

