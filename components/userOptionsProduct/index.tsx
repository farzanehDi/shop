import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {toast} from "react-toastify";
import ShareModal from "../shareModal";
import {usePopperTooltip} from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import Link from 'next/link';

const Index = (props: { id: string | number; fullUrl: string; }) => {

    const dispatch = useDispatch();
    const isLogin = useSelector((state: any) => state.auth.isLogin);
    const favoriteProduct = useSelector((state: any) => state.auth.favoriteProduct);
    const [isFavorite, setIsFavorite] = useState(false);
    const popup1 = usePopperTooltip({placement: 'top'});
    const popup2 = usePopperTooltip({placement: 'top'});
    const popup3 = usePopperTooltip({placement: 'top'});

    useEffect(() => {
        favoriteProduct != null && setIsFavorite(favoriteProduct);
    }, [favoriteProduct])

    const addToFavorite = () => {
        if (isLogin) {
            dispatch({type: "loading", payload: true});

            axios.post(`${Routers.PRODUCTS}/${props.id}/${Routers.WISHLIST}`).then(response => {
                console.log('favorite', response.data);
                dispatch({type: "loading", payload: false});
                if (response.data.result) {
                    setIsFavorite(!isFavorite);
                    toast.dark('عملیات با موفقیت انجام شد');
                } else {
                    toast.dark(response.data.message);
                }
            }).catch(() => {
                dispatch({type: "loading", payload: false});
                toast.dark('خطا در ارسال اطلاعات');
            })
        } else {
            dispatch({type: 'loginRegisterModal', payload: true})
        }
    };

    return (
        <div className={'flex items-center'}>

            <div className={'cursor-pointer p-1 flex items-center'} ref={popup1.setTriggerRef} onClick={addToFavorite}>
                <i className={`fas fa-heart fa-lg ${isFavorite ? 'text-red-600' : ''}`}></i>
            </div>
            {/***tooltip***/}
            {popup1.visible && (
                <div
                    ref={popup1.setTooltipRef}
                    {...popup1.getTooltipProps({className: 'tooltip-container'})}
                >
                    افزودن به لیست علاقه مندی
                    <div {...popup1.getArrowProps({className: 'tooltip-arrow'})} />
                </div>
            )}
            {/********************/}
            <div className={'mx-3 cursor-pointer p-1 flex items-center'} ref={popup2.setTriggerRef}
                 onClick={() => dispatch({type: 'shareModal', payload: true})}>
                <i className="fas fa-share-alt fa-lg"></i>
            </div>
            {/***tooltip***/}
            {popup2.visible && (
                <div
                    ref={popup2.setTooltipRef}
                    {...popup2.getTooltipProps({className: 'tooltip-container'})}
                >
                    به اشتراک گذاری
                    <div {...popup2.getArrowProps({className: 'tooltip-arrow'})} />
                </div>
            )}

            {/**********************/}
            <Link href={`/compare/${props.id}`}>
                <div className={'cursor-pointer p-1 flex items-center'} ref={popup3.setTriggerRef}>
                    <i className="fas fa-exchange-alt fa-lg"></i>
                </div>
            </Link>
            {/***tooltip***/}
            {popup3.visible && (
                <div
                    ref={popup3.setTooltipRef}
                    {...popup3.getTooltipProps({className: 'tooltip-container'})}
                >
                    مقایسه
                    <div {...popup3.getArrowProps({className: 'tooltip-arrow'})} />
                </div>
            )}


            <ShareModal id={props.id} url={props.fullUrl}/>

        </div>
    );
};

export default Index;