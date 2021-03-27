import React, {useState} from 'react';
import AddCompany from "../addCompany";
import {useDispatch, useSelector} from "react-redux";
import {getCheckoutInfo} from "../../redux/actions/checkout";

const FactorCheckout = () => {

    const dispatch = useDispatch();
    let checkoutInfo = useSelector((state: any) => state.auth.checkoutInfo);
    const [factor, setFactor] = useState();

    const changeFactor = (e: { target: { checked: any; }; }) => {
        dispatch({type:'invoiceCheckout',payload:e.target.checked});
        setFactor(e.target.checked);
        dispatch(getCheckoutInfo());
    };

    const updateCompany = (id: number | string) => {
        dispatch({type:'companyCheckout',payload:id});
        dispatch(getCheckoutInfo());
    }

    return (
        <>
            <div className={'flex items-center text-xl text-blue-200 font-bold mt-6 flex-wrap'}>
                <i className="fas fa-file-alt ml-2"></i>
                <h2>صدور فاکتور</h2>
            </div>

            <div className={'bg-white rounded shadow p-4 mt-1 mb-6'}>

                <div className={'flex items-center pb-3'}>
                    <input type={"checkbox"} className={"ml-2"}
                           defaultChecked={factor}
                           onChange={changeFactor}/>
                    <span>درخواست ارسال فاکتور خرید</span>
                </div>
                {/***company section***/}
                <div className={`border-t border-dashed border-gray-200 pt-3 ${factor ? '' : 'hidden'}`}>
                    <p>چنانچه مایل به دریافت فاکتور حقوقی دارید شرکت مورد نظر خود را انتخاب و یا اضافه نمایید.</p>
                    <div className={'flex justify-between mt-3'}>
                        <div>
                            {
                                checkoutInfo && checkoutInfo.companies && checkoutInfo.companies.length > 0 ?
                                    checkoutInfo.companies.map((company: { is_selected: boolean; id: string | number; name: string }, index: number) => (
                                        <div key={`company${index}`} className={'flex items-center mb-2'}>
                                            <input type={"radio"} className={"ml-2"} name={"companyName"}
                                                   defaultChecked={company.is_selected}
                                                   onClick={() => updateCompany(company.id)}/>
                                            <span>{company.name}</span>
                                        </div>
                                    )) :
                                    <p className={'my-2 font-medium'}>شما تا کنون شرکتی ثبت نکرده اید</p>
                            }
                        </div>
                        <button className={'flex items-center btn-blue h-12 mx-auto mt-3 sm:mx-0 sm:mt-0'}
                                onClick={() => dispatch({type: 'companyModal', payload: true})}>
                            <i className="fas fa-plus ml-2"></i>
                            <span>افزودن شرکت جدید</span>
                        </button>

                    </div>
                </div>

            </div>
            <AddCompany/>
        </>
    );
};

export default FactorCheckout;