import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {toast} from "react-toastify";
import {fixNumbers, validateMobile} from "../../utils/validate";

Modal.setAppElement('#__next')

const ContactModal = (props: { id: string | number }) => {

    const dispatch = useDispatch();
    const contactModal = useSelector((state: any) => state.auth.contactModal);
    const [name, setName] = useState('');
    const [family, setFamily] = useState('');
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [ios, setIos] = useState<boolean>();

    useEffect(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.platform || "");
        setIos(isIOS);
    }, []);

    function closeModal() {
        dispatch({type: 'contactModal', payload: !contactModal})
    }

    const contactUs = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let error = false;
        const inputs = document.querySelectorAll('.requireContact');
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i] as HTMLInputElement;

            if (input.value.trim() == '') {
                console.log(input.value)
                error = true;
                inputs[i].classList.add('border-red-500')
            } else {
                inputs[i].classList.remove('border-red-500');
            }
        }

        if (error) return false;

        if (!validateMobile(fixNumbers(mobile))) {
            toast.dark('لطفا یک شماره موبایل معتبر وارد نمایید');
            return false;
        }
        setLoading(true);
        let data = {
            mobile: fixNumbers(mobile), name, family
        }
        axios(`${Routers.PRODUCTS}/${props.id}/request-contact-expert`, {
            method: 'POST',
            data
        }).then(response => {
            setLoading(false);
            if (response.data.result) {
                setName('');
                setFamily('');
                setMobile('');
                toast.dark('اطلاعات شما با موفقیت ثبت شد');
                closeModal();
            } else {
                toast.dark(response.data.message[0])
            }
        }).catch(() => {
            setLoading(false);
            toast.dark('خطا در ارسال اطلاعات')
        })
    }

    return (
        <Modal
            isOpen={contactModal}
            className="Modal"
            overlayClassName="Overlay"
            shouldCloseOnOverlayClick={false}
            closeTimeoutMS={500}
        >
            <div className={'content md:w-7/12 lg:w-5/12 xl:w-4/12 sm:w-10/12 w-11/12'}>

                <div className={'flex items-center justify-between text-xl border-b-2 pb-2 border-gray-100 mb-5 px-1'}>
                    <span>تماس با کارشناس</span>
                    <i className="fas fa-times cursor-pointer" onClick={closeModal}></i>
                </div>
                <p className={'text-center mb-3'}>جهت دریافت مشاوره خرید ، با داخلی های زیر تماس بگیرید.</p>
                <strong className={'block text-center text-lg'}>شماره تماس: 02154591992</strong>
                <hr className={'my-4 border-gray-100'}/>
                <p className={'text-justify'}>همچنین میتوانید در صورت تمایل نام و تلفن همراه خود را در کادر زیر وارد
                    کنید تا کارشناسان ما در اولین فرصت با شما تماس بگیرند.</p>
                <form className={'md:w-8/12 sm:w-9/12 w-full mx-auto flex flex-col mt-4'}>
                    <label>نام</label>
                    <input className={`input requireContact mb-4 mt-1 ${name ? '' : 'border-gray-300'}`} type={"text"}
                           value={name}
                           onChange={(e) => setName(e.target.value)} placeholder={"نام..."}/>
                    <label>نام خانوادگی</label>
                    <input className={`input requireContact mb-4 mt-1 ${family ? '' : 'border-gray-300'}`} type={"text"}
                           value={family} placeholder={"نام خانوادگی... "}
                           onChange={(e) => setFamily(e.target.value)}/>
                    <label>شماره موبایل</label>
                    <input className={`input requireContact mb-5 mt-1 ${mobile ? '' : 'border-gray-300'}`}
                           value={mobile} placeholder={"شماره موبایل..."}
                           type={ios ? "text" : "number"}
                           pattern="\d*"
                           onChange={(e) => setMobile(e.target.value)}/>


                    <button className={`flex items-center justify-center btn-blue mt-1 w-32 mx-auto
                     ${loading?'opacity-50 cursor-not-allowed':''}`} disabled={loading} onClick={contactUs}>
                        <span>ارسال</span>
                        <span className={`flex items-center mr-1 text-orange-200 ${loading ? 'block' : 'hidden'}`}>
                                <i className="fas fa-circle-notch fa-spin text-xl"></i>
                    </span>
                    </button>

                </form>
            </div>
        </Modal>
    );
};

export default ContactModal;