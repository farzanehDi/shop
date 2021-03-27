import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux';
import {validateEmail} from '../../utils/validate';
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {toast} from "react-toastify";
import {useRouter} from 'next/router'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { usePopperTooltip } from 'react-popper-tooltip';
Modal.setAppElement('#__next')

const Index = (props: { id: string | number; url: string; }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const shareModal = useSelector((state: any) => state.auth.shareModal);
    const [email, setEmail] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const tooltip = usePopperTooltip({placement : 'top'});

    useEffect(() => {
        console.log(router.pathname)
    }, []);

    function closeModal() {
        setDisable(true);
        setEmail('');
        dispatch({type: 'shareModal', payload: false})
    }

    const changeEmail = async (e: { target: { value: string; }; }) => {
        const value = await e.target.value
        setEmail(value);
        if (validateEmail(value)) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    const shareByEmail = () => {
        setLoading(true);
        let data = {
            email,
        }
        axios(`${Routers.PRODUCTS}/${props.id}/share-email`, {
            method: 'POST',
            data
        }).then(response => {
            setLoading(false);
            if (response.data.result) {
                setEmail('');
                setDisable(true);
                toast.dark('ایمیل با موفقیت ارسال شد');
            } else {
                toast.dark(response.data.message[0]);
            }
        }).catch(() => {
            setLoading(false);
            toast.dark('خطا در ارسال اطلاعات');
        })
    }

    return (
        <Modal
            isOpen={shareModal}
            className="Modal"
            overlayClassName="Overlay"
            shouldCloseOnOverlayClick={false}
            closeTimeoutMS={500}
        >
            <div className={'content md:w-6/12 lg:w-4/12 xl:w-3/12 sm:w-9/12 w-11/12'}>
                <div className={'flex items-center justify-between text-xl border-b-2 pb-2 border-gray-100 mb-5 px-1'}>
                    <span className={'font-bold'}>اشتراک گذاری</span>
                    <i className="fas fa-times cursor-pointer" onClick={closeModal}></i>
                </div>
                {/***social media***/}
                <p className={'mb-3 text-lg'}>اشتراک گذاری در شبکه های اجتماعی</p>
                <div className={'flex items-center '}>
                    <a href={`https://www.facebook.com/sharer.php?u=${props.url}`} target={"_blank"}>
                        <i className="fab fa-facebook-square fa-3x text-blue-500"></i>
                    </a>
                    <a href={`https://telegram.me/share/url?url=${props.url}&text=${props.id}`}
                       target={"_blank"} className={'mx-4'}>
                        <i className="fab fa-telegram-plane fa-3x text-blue-100"></i>
                    </a>
                    <a href={`https://wa.me/?text=${props.url}`} data-action="share/whatsapp/share"
                       target={"_blank"} className={'ml-4'}>
                        <i className="fab fa-whatsapp fa-3x text-green-500"></i>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${props.url}&text=${props.id}`}
                       target={"_blank"}>
                        <i className="fab fa-twitter fa-3x text-blue-100"></i>
                    </a>

                </div>
                <hr className={'my-4 border-gray-200'}/>
                {/***email***/}
                <p className={'mb-3 text-lg'}>ارسال به ایمیل</p>
                <input className={'w-full input'} type={'email'} value={email} onChange={changeEmail}/>
                <br/>
                <button className={`flex items-center justify-center ${disable?'opacity-50 cursor-not-allowed':''}
                btn-blue mt-3 w-32`} disabled={disable || loading} onClick={shareByEmail}>
                    <span>ارسال</span>
                    <span className={`flex items-center mr-1 text-orange-200 ${loading ? 'block' : 'hidden'}`}>
                                <i className="fas fa-circle-notch fa-spin text-xl"></i>
                    </span>
                </button>
                {/***copy link***/}
                <hr className={'my-4 border-gray-200'}/>
                <p className={'mb-3 text-lg'}>آدرس صفحه</p>
                <div className={'flex w-full mb-3'}>
                    <input className={'w-full input border-l-0 copyLink'} type={'text'} value={props.url}
                           disabled={true}/>

                    <CopyToClipboard text={props.url}
                                     onCopy={() => toast.dark('لینک با موفقیت کپی شد')}>
                        <button className={'focus:outline-none w-1/5 border border-gray-200 rounded-tl rounded-bl'}
                                ref={tooltip.setTriggerRef}>
                            <i className="fas fa-link"></i>
                        </button>
                    </CopyToClipboard>
                    {/****tooltip****/}
                    {tooltip.visible && (
                        <div
                            ref={tooltip.setTooltipRef}
                            {...tooltip.getTooltipProps({ className: 'tooltip-container' })}
                        >
                            کپی آدرس
                            <div {...tooltip.getArrowProps({ className: 'tooltip-arrow' })} />
                        </div>
                    )}
                </div>
            </div>

        </Modal>
    );
};

export default Index;