import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux';
import {invoiceRequest} from "../../redux/actions/invoiceRequest";
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {toast} from "react-toastify";
import {fixNumbers, validateEmail} from "../../utils/validate";

Modal.setAppElement('#__next')
const ConfirmInvoiceRequestModal = (props: { name: string; count: number; productId: string | number }) => {

    const dispatch = useDispatch();
    const confirmInvoiceRequestModal = useSelector((state: any) => state.auth.confirmInvoiceRequestModal);
    const completeProfile = useSelector((state: any) => state.auth.completeProfile);
    const [name, setName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [nationalCode, setNationalCode] = useState('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState('');
    const [ios, setIos] = useState<boolean>();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.platform || "");
        setIos(isIOS);
    }, []);

    useEffect(() => {
        confirmInvoiceRequestModal!==null && setOpen(confirmInvoiceRequestModal);
    }, [confirmInvoiceRequestModal]);

    function closeModal(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setEmail('');
        setPhone('');
        setName('');
        setNationalCode('');
        setLastName('');
        dispatch({type: 'confirmInvoiceRequestModal', payload: false});
    }

    const invoiceRequestFn = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (completeProfile) {
            dispatch(invoiceRequest(props.productId, props.count))
        } else {
            let error = false;
            const inputs = document.querySelectorAll('.requireProfile');
            for (let i = 0; i < inputs.length; i++) {
                let input = inputs[i] as HTMLInputElement;
                if (input.value.trim() === '') {
                    error = true;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            }
            if (error) return false;
            if (!validateEmail(email)) {
                toast.dark('لطفا یک ایمیل معتبر وارد نمایید');
                return false;
            }
            if (nationalCode.length != 10) {
                toast.dark('لطفا کدملی معتبر وارد نمایید');
                return false;
            }
            //***complete profile***
            dispatch({type: 'loading', payload: true});
            let data = {
                name,
                family: lastName,
                email,
                phone: fixNumbers(phone),
                national_code: fixNumbers(nationalCode)
            }
            axios(Routers.COMPLETE_PROFILE, {
                method: 'POST',
                data
            })
                .then((response) => {
                    console.log('completeProfile', response.data);
                    if (response.data.result) {
                        dispatch({
                            type: 'completeProfile',
                            payload: true
                        })
                        //***invoice req***
                        dispatch(invoiceRequest(props.productId, props.count))
                    } else {
                        dispatch({type: 'loading', payload: false});
                        toast.dark(response.data.message[0]);
                    }
                })
                .catch((err) => {
                    dispatch({type: 'loading', payload: false});
                    console.log(err);
                })
        }
    }

    return (

        <Modal
            isOpen={open}
            className="Modal"
            onRequestClose={closeModal}
            overlayClassName="Overlay"
            shouldCloseOnOverlayClick={false}
            closeTimeoutMS={500}
        >
            <form className={'content bg-white md:w-8/12 lg:w-6/12 xl:w-5/12 w-11/12'}>

                <div
                    className={'flex items-center justify-between text-xl border-b-2 pb-2 border-gray-100 mb-5 px-1'}>
                    <span>تاییدیه پیش فاکتور</span>
                    <i className="fas fa-times cursor-pointer" onClick={closeModal}></i>
                </div>
                <p className={'py-3'}>
                    درخواست پیش فاکتور برای
                    <span className={'font-bold'}> {props.name} </span>
                    به تعداد <span className={'font-bold'}> {props.count} </span> عدد
                </p>
                <hr className={`border border-gray-50 my-4 w-1/2 mx-auto 
                ${completeProfile ? 'hidden' : ''}
                `}/>

                <div
                    className={`grid grid-cols-12 gap-4 flex-wrap items-center 
                   ${completeProfile ? 'hidden' : ''}
                    `}>
                    <div className={'col-span-12 sm:col-span-6'}>
                        <p>نام</p>
                        <input className={'input w-full my-3 requireProfile'}
                               type={"text"}
                               value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className={'col-span-12 sm:col-span-6'}>
                        <p>نام خانوادگی</p>
                        <input className={'input w-full my-3 requireProfile'}
                               type={"text"}
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className={'col-span-12 sm:col-span-6'}>
                        <p>کد ملی</p>
                        <input className={'input w-full my-3 requireProfile'}
                               type={ios ? "text" : "number"}
                               pattern="\d*"
                               value={nationalCode}
                               onChange={(e) => setNationalCode(e.target.value)}/>
                    </div>
                    <div className={'col-span-12 sm:col-span-6'}>
                        <p>ایمیل</p>
                        <input className={'input w-full my-3 requireProfile'}
                               type={"email"}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className={'col-span-12 sm:col-span-6'}>
                        <p>شماره ثابت</p>
                        <input className={'input w-full my-3 requireProfile'}
                               type={ios ? "text" : "number"}
                               pattern="\d*"
                               value={phone}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </div>

                </div>
                <hr className={'border border-gray-100 my-4 mx-auto'}/>
                {/* accept reject invoice form */}
                <div className={'flex items-center justify-between mt-3 mx-auto'}>
                    <button
                        className={'bg-green-500 hover:bg-green-600 rounded px-10 text-white py-3 focus:outline-none'}
                        onClick={invoiceRequestFn}>تایید
                    </button>
                    <button className={'bg-red-500 hover:bg-red-600 rounded px-10 text-white py-3'}
                            onClick={closeModal}>بستن
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ConfirmInvoiceRequestModal;