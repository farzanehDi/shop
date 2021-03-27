import React, {useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {useRouter} from "next/router";
import {getProduct} from "../../redux/actions/getProduct";


Modal.setAppElement('#__next')

const CompareModal = () => {

    const dispatch = useDispatch();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const compareModal = useSelector((state: any) => state.auth.compareModal);
    const compareId = useSelector((state: any) => state.auth.compareId);
    const router = useRouter();
    const path = router.asPath;

    function closeModal() {
        dispatch({type: 'compareModal', payload: false})
    }

    const afterOpenModal = () => {
        console.log('compare id: ',compareId);
        setLoading(true);
        axios(`${Routers.PRODUCTS}/${compareId[0]}/compare?ignore_ids=${compareId}&page=1&length=15`).then(response=>{
            setLoading(false);
            setProductList(response.data.data.array);
        }).catch(err=>{
            setLoading(false);
            console.log(err)
        })
    };

    const selectProduct = (code: string) => {
        dispatch({type: 'compareId', payload: [...compareId, code]})
        dispatch(getProduct(code));
        let asPath = path + '/' + code;
        router.push(asPath, undefined, {shallow: true});
        dispatch({type: 'compareModal', payload: false})
    }

    return (
        <Modal
            isOpen={compareModal}
            className="Modal"
            overlayClassName="Overlay"
            shouldCloseOnOverlayClick={false}
            onAfterOpen={afterOpenModal}
            closeTimeoutMS={500}
        >
            <div className={'content md:w-9/12 lg:w-7/12 xl:w-6/12 sm:w-11/12 w-11/12'}>

                <div className={'flex items-center justify-between text-xl border-b-2 pb-2 border-gray-100 mb-5 px-1'}>
                    <span>افزودن کالا به لیست مقایسه</span>
                    <i className="fas fa-times cursor-pointer" onClick={closeModal}></i>
                </div>

                <div className={`items-center justify-center mx-auto my-8 ${loading?'flex':'hidden'}`}>
                    <i className={`${loading ? 'fas fa-circle-notch mr-1' : 'hidden'} text-blue-200 fa-spin`}></i>
                    <span className={'mr-2'}>در حال بارگزاری...</span>
                </div>

                <div className={`justify-between ${loading?'hidden':'flex'}`}>
                    {productList.map((product: { id:string ; image:string;name_fa:string },index:number) => (
                        <div className="cursor-pointer flex flex-col items-center justify-center m-2" key={`compareProductModal${index}`}
                             onClick={()=>selectProduct(product.id)} >
                            <img src={product.image} alt={product.name_fa} className={"w-24"}/>
                            <p className={"mt-1 pr-1 pl-1 text-center"}>{product.name_fa}</p>
                        </div>
                    ))}
                </div>

            </div>
            <style jsx>{`
              .fa-spin{
                font-size:30px;
              }
            `}</style>
        </Modal>
    );
};

export default CompareModal;