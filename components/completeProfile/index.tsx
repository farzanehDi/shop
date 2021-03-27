import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {toast} from "react-toastify";
import {fixNumbers, validateEmail} from "../../utils/validate";
import {getCheckoutInfo} from "../../redux/actions/checkout";

Modal.setAppElement('#__next')

const CompleteProfile = () => {

    const dispatch = useDispatch();
    const completeProfileModal = useSelector((state: any) => state.auth.completeProfileModal);
    const [name, setName] = useState('');
    const [family, setFamily] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [ios, setIos] = useState<boolean>();

    useEffect(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.platform || "");
        setIos(isIOS);
    }, []);

    function closeModal() {
        dispatch({type: 'completeProfileModal', payload: false});
        setName('');
        setFamily('');
        setEmail('');
        setPhone('');
        setNationalCode('');
    }

    const completeProfile=(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        let error=false;
        const inputs=document.querySelectorAll('.requireProfile');
        for(let i=0;i<inputs.length;i++){
            let input=inputs[i] as HTMLInputElement;

            if(input.value.trim()==''){
                console.log(input.value)
                error=true;
                inputs[i].classList.add('border-red-500')
            }else {
                inputs[i].classList.remove('border-red-500');
            }
        }

        if(error) return false;
        if(!validateEmail(email)){
            toast.dark('لطفا یک ایمیل معتبر وارد نمایید');
            return false;
        }
        if (nationalCode.length != 10) {
            toast.dark('لطفا کدملی معتبر وارد نمایید');
            return false;
        }
        setLoading(true);
        let data = {
            name,
            family,
            email,
            phone: fixNumbers(phone),
            national_code: fixNumbers(nationalCode)
        }

        axios({url:Routers.COMPLETE_PROFILE,method:'POST',data}).then(response=>{
            setLoading(false);
            if(response.data.result){
                dispatch(getCheckoutInfo());
                toast.dark('اطلاعات شما با موفقیت ثبت شد');
                closeModal();
            }else {
                toast.dark(response.data.message[0])
            }
        }).catch(()=>{
            setLoading(false);
            toast.dark('خطا در ارسال اطلاعات')
        })
    }

    return (
        <Modal
            isOpen={completeProfileModal}
            className="Modal"
            overlayClassName="Overlay"
            shouldCloseOnOverlayClick={false}
            closeTimeoutMS={500}
        >
            <div className={'content md:w-8/12 lg:w-6/12 xl:w-5/12 sm:w-10/12 w-11/12'}>

                <div className={'flex items-center justify-between text-xl border-b-2 pb-2 border-gray-100 mb-5 px-1'}>
                    <span>تکمیل پروفایل کاربری</span>
                    <i className="fas fa-times cursor-pointer" onClick={closeModal}></i>
                </div>

                <form>
                    <div className={'grid grid-cols-12 gap-5'}>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>نام</label>
                            <input className={`w-full mt-1 input requireProfile ${name ? '' : 'border-gray-300'}`}
                                   type={"text"}
                                   value={name}
                                   onChange={(e) => setName(e.target.value)} placeholder={"نام..."}/>
                        </div>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>نام خانوادگی</label>
                            <input className={`w-full mt-1 input requireProfile ${family ? '' : 'border-gray-300'}`}
                                   type={"text"} value={family} placeholder={"نام خانوادگی... "}
                                   onChange={(e) => setFamily(e.target.value)}/>
                        </div>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>کد ملی</label>
                            <input className={`w-full mt-1 input requireProfile ${nationalCode ? '' : 'border-gray-300'}`}
                                   value={nationalCode} placeholder={"کدملی..."}
                                   type={ios ? "text" : "number"}
                                   pattern="\d*"
                                   onChange={(e) => setNationalCode(e.target.value)}/>
                        </div>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>شماره ثابت</label>
                            <input className={`w-full mt-1 input requireProfile ${phone ? '' : 'border-gray-300'}`}
                                   value={phone} placeholder={"شماره ثابت..."}
                                   type={ios ? "text" : "number"}
                                   pattern="\d*"
                                   onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>ایمیل</label>
                            <input className={`w-full mt-1 input requireProfile ${email ? '' : 'border-gray-300'}`}
                                   type={"text"} value={email} placeholder={"ایمیل... "}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <button className={`w-32 mx-auto mt-8 flex items-center justify-center btn-blue ${loading ? 'btn-disable' : ''}`} disabled={loading}
                            onClick={completeProfile}>
                        <span>ارسال</span>
                        <span className={`mr-1 flex items-center justify-center text-orange-200 ${loading ? 'block' : 'hidden'}`}>
                                <i className="fas fa-circle-notch fa-spin text-xl"></i>
                            </span>
                    </button>

                </form>
            </div>
        </Modal>
    );
};

export default CompleteProfile;