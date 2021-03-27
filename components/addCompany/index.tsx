import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {toast} from "react-toastify";
import {fixNumbers} from "../../utils/validate";
import {getCheckoutInfo} from "../../redux/actions/checkout";
import {getProvince,getCityList} from "../../redux/actions/provinceCity";

Modal.setAppElement('#__next')

const AddCompany = () => {

    const dispatch = useDispatch();
    const companyModal = useSelector((state: any) => state.auth.companyModal);
    const provinceList = useSelector((state: any) => state.auth.provinceList);
    const cityList = useSelector((state: any) => state.auth.cityList);
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [economicCode, setEconomicCode] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [ios, setIos] = useState<boolean>();

    useEffect(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.platform || "");
        setIos(isIOS);

    }, []);

    const afterOpen = () => {
        //***get province***
        dispatch(getProvince());
    }

    const getCity = (e: { target: { value: string }; }) => {
        setProvince(e.target.value);
        dispatch(getCityList(e.target.value));
    }

    function closeModal() {
        dispatch({type: 'companyModal', payload: false});
    }

    const addACompany = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let error = false;
        const inputs = document.querySelectorAll('.requireCompany');
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

        setLoading(true);
        let data ={
            province_id:province,
            city_id:city,
            name,
            phone:fixNumbers(phone),
            economic_code:economicCode,
            national_number:nationalId,
            registration_number:registrationNumber,
            is_default:1,
        };

        axios({url:Routers.ADD_COMPANY,method:'POST',data}).then(response=>{
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
            isOpen={companyModal}
            className="Modal"
            onAfterOpen={afterOpen}
            overlayClassName="Overlay"
            shouldCloseOnOverlayClick={false}
            closeTimeoutMS={500}
        >
            <div className={'content md:w-8/12 lg:w-6/12 xl:w-5/12 sm:w-10/12 w-11/12'}>

                <div className={'flex items-center justify-between text-xl border-b-2 pb-2 border-gray-100 mb-5 px-1'}>
                    <span>ثبت شرکت جدید</span>
                    <i className="fas fa-times cursor-pointer" onClick={closeModal}></i>
                </div>

                <form>
                    <div className={'grid grid-cols-12 gap-5'}>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>استان</label>
                            <select className={`w-full mt-1 input requireCompany ${province ? '' : 'border-gray-300'}`}
                                    onChange={getCity}>
                                <option value={''}>انتخاب استان...</option>
                                {
                                    provinceList.map((province: { id: number | string; name: string }, index: number) => (
                                        <option key={`province${index}`} value={province.id}>{province.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>شهر</label>
                            <select className={`w-full mt-1 input requireCompany ${city ? '' : 'border-gray-300'}`}
                                    value={city} onChange={(e) => setCity(e.target.value)}>
                                <option value={''}>انتخاب شهر...</option>
                                {
                                    cityList.map((city: { id: number | string; name: string }, index: number) => (
                                        <option key={`province${index}`} value={city.id}>{city.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>نام شرکت</label>
                            <input
                                className={`w-full mt-1 input requireCompany ${name ? '' : 'border-gray-300'}`}
                                value={name} placeholder={"نام شرکت..."}
                                type={"text"}
                                onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>کد اقتصادی شرکت </label>
                            <input className={`w-full mt-1 input requireCompany ${economicCode ? '' : 'border-gray-300'}`}
                                   value={economicCode} placeholder={"کد اقتصادی شرکت..."}
                                   type={"text"}
                                   onChange={(e) => setEconomicCode(e.target.value)}/>
                        </div>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>شناسه ملی</label>
                            <input className={`w-full mt-1 input requireCompany ${nationalId ? '' : 'border-gray-300'}`}
                                   value={nationalId} placeholder={"شناسه ملی..."}
                                   type={"text"}
                                   onChange={(e) => setNationalId(e.target.value)}/>
                        </div>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>شناسه ثبت</label>
                            <input className={`w-full mt-1 input requireCompany ${registrationNumber ? '' : 'border-gray-300'}`}
                                   value={registrationNumber} placeholder={"شناسه ثبت..."}
                                   type={"text"}
                                   onChange={(e) => setRegistrationNumber(e.target.value)}/>
                        </div>
                        <div className={'col-span-12 sm:col-span-6'}>
                            <label>تلفن ثابت</label>
                            <input className={`w-full mt-1 input requireCompany ${phone ? '' : 'border-gray-300'}`}
                                   value={phone} placeholder={"تلفن ثابت..."}
                                   type={ios ? "text" : "number"}
                                   pattern="\d*"
                                   onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                    </div>

                    <button
                        className={`w-32 mx-auto mt-8 flex items-center justify-center btn-blue ${loading ? 'btn-disable' : ''}`}
                        disabled={loading}
                        onClick={addACompany}>
                        <span>ارسال</span>
                        <span
                            className={`mr-1 flex items-center justify-center text-orange-200 ${loading ? 'block' : 'hidden'}`}>
                                <i className="fas fa-circle-notch fa-spin text-xl"></i>
                            </span>
                    </button>

                </form>
            </div>
        </Modal>
    );
};

export default AddCompany;