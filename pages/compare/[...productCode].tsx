import React from 'react';
import {useRouter} from "next/router";
import {getProduct} from "../../redux/actions/getProduct";
import {connect, useDispatch, useSelector} from "react-redux";
import Link from 'next/link';
import Styles from './compare.module.css';
import {StickyContainer, Sticky} from 'react-sticky';
import CompareModal from "../../components/compareModal";
import {GetServerSideProps} from "next";
import {wrapper} from "../../redux/store";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import Head from "next/head";

function Compare()  {

    const dispatch = useDispatch();
    const router = useRouter();
    const compareProduct = useSelector((state: any) => state.auth.compareProduct);
    const compareId = useSelector((state: any) => state.auth.compareId);


    const deleteItem=async (id: string | number)=>{

        let filterArr = compareProduct.filter( (el: { id: string | number; }) => el.id !== id );
        dispatch({type:'compareProduct',payload:filterArr});

        let filteredAddress=await compareId.filter( (el: string) => el !== id );
        dispatch({type:'compareId',payload:filteredAddress})


        let urlString="/compare";
        for(let i=0;i<filteredAddress.length;i++)
        {
            urlString+="/"+compareId[i];
        }
        router.push(urlString ,undefined, { shallow: true })

    };

    const addProduct = () => {
        dispatch({type:'compareModal',payload:true})
    }

    return (
        <>
            <Head>
                <title>مقایسه محصولات</title>
            </Head>
            <div className={"md:hidden flex flex-col justify-center items-center h-full"}>
                <p className={"p-5 text-center text-xl font-bold"}>مشاهده این صفحه بر روی موبایل امکان پذیر نمی باشد</p>
                <img src={"/images/user.svg"} alt={"مشاهده این صفحه بر روی موبایل امکان پذیر نمی باشد"} className={"p-5 h-56"}/>
            </div>
            {/***show p top section***/}
            <StickyContainer>
                <Sticky>{({style, isSticky}) =>
                    <div style={{...style}}
                         className={`hidden md:grid shadow grid-cols-12 bg-white rounded border-b-2 border-orange-200 
                          ${isSticky ? 'pt-2' : 'mt-2'}`}>
                        {
                            compareProduct.map((product: {id:string | number; image: string; name_fa: string;name_en: string; price: string | number; discount: string | number }, index: number) => (
                                <div key={`compareProduct${index}`}
                                     className={`px-2 relative ${Styles.productContainer} col-span-3 flex flex-col items-center justify-center 
                                      ${index != 0 ? 'border-gray-200 border-r-2' : ''}`}>
                                    {/*delete item*/}
                                    <div className={`bg-red-100 rounded-full flex items-center justify-center 
                                    ${compareProduct.length>1?'':'hidden'} text-red-500 p-3 w-8 h-8 absolute cursor-pointer 
                                    ${Styles.cartDelete}`} onClick={()=>deleteItem(product.id)}>&times;</div>
                                    {/***/}
                                    <img src={product.image} alt={product.name_fa}
                                         className={`${isSticky ? 'h-24' : 'h-40'}`}/>
                                    <p className={`${Styles.productName} text-center`}>{product.name_fa}</p>
                                    <p className={`text-red-500 mb-2 ${product.discount != 0 ? 'hidden' : ''}`}>{product.price} تومان </p>
                                    <p className={`text-red-500 mb-2 ${product.discount != 0 ? '' : 'hidden'}`}>{product.discount} تومان </p>

                                    <div className={` mb-5 btn-blue ${isSticky ? 'hidden' : ''}`}>
                                        <Link href={`/p/${product.name_en}`}>
                                            مشاهده و خرید محصول
                                        </Link>
                                    </div>

                                </div>
                            ))
                        }
                        <div onClick={addProduct}
                            className={"col-span-3 text-center p-5 flex flex-col justify-center items-center cursor-pointer text-gray-300 border-gray-200 border-r-2 " +
                            (compareProduct.length < 4 ? "" : "hidden")}>
                            <i className={`fas fa-upload ${Styles.uploadImg}`}></i>
                            <p className={"mt-3 " + (isSticky ? "hidden" : "")}>برای افزودن کالا به لیست مقایسه کلیک
                                کنید</p>
                        </div>
                    </div>
                }</Sticky>
                {/***show details of product***/}
                <div className={`hidden md:grid mt-8 grid-cols-12`}>
                    {compareProduct.map((item: { specifications: any[]; }, index: number) => (
                        <div className={`flex flex-col col-span-3`} key={`titleDescription${index}`}>
                            {item.specifications.map((items, subIndex: number) => (

                                <div key={`subTitleDescription${subIndex}`}>
                                    <h5 className={"flex items-center text-blue-200 mb-4 text-xl font-medium " + (index != 0 ? "invisible" : "")}>
                                        <i className="fas fa-caret-left ml-2"></i>&nbsp;{items.name}</h5>

                                    {items.items.map((data: { key:string ; value:string; }, indexCompare:number) => (
                                        <div key={`indexCompare${indexCompare}`}>
                                            <div className="col-span-12 bg-gray-200 p-2">
                                                <span className={(index !== 0 ? "invisible" : "")}>{data.key}</span>
                                            </div>
                                            <div
                                                className={`break-words col-span-12 text-center bg-white p-2 ${index != 0 ? 'border-gray-200 border-r-2' : ''}`}>{data.value}</div>
                                        </div>
                                    ))}

                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </StickyContainer>
            {/****/}
            <CompareModal/>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {

    const products=await query.productCode as [];
    for(let i=0;i<products.length;i++){
       //@ts-ignore
       await store.dispatch(getProduct(products[i]));
       await store.dispatch({type:'compareId',payload:products});
    }

});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        getProduct: bindActionCreators(getProduct, dispatch),
    }
};

export default connect(null, mapDispatchToProps)(Compare)
