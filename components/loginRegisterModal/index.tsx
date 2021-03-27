import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../login';
import Verification from '../verification';


Modal.setAppElement('#__next')

const Index = (props:{productCode:string|number,productId:string|number|null}) => {

    const dispatch = useDispatch();
    const loginRegisterModal = useSelector((state: any) => state.auth.loginRegisterModal);
    const loginSection = useSelector((state: any) => state.auth.loginSection);

    function closeModal() {
        dispatch({ type: 'loginRegisterModal', payload: !loginRegisterModal })
    }

    // useEffect(() => {
    //     console.log('lo', loginSection)
    // }, [loginSection])

    return (
        <Modal
            isOpen={loginRegisterModal}
            className="Modal"
            overlayClassName="Overlay"
            shouldCloseOnOverlayClick={false}
            closeTimeoutMS={500}
        >
            <div className={'content md:w-8/12 lg:w-6/12 xl:w-5/12 w-11/12'}>

                <div className={'flex items-center justify-between text-xl border-b-2 pb-2 border-gray-100 mb-5 px-1'}>
                    <span>{!loginSection ? 'ورود و عضویت' : 'تایید کد فعالسازی'}</span>
                    <i className="fas fa-times cursor-pointer" onClick={closeModal}></i>
                </div>
                {!loginSection ? <Login /> : <Verification productCode={props.productCode} productId={props.productId}
                                                           checkoutPage={false}/>}
            </div>
        </Modal>
    );
};

export default Index;