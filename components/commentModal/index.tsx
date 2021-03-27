import React, {useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux';
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {toast} from "react-toastify";
import {comments} from "../../redux/actions/productComment";

Modal.setAppElement('#__next')

const Index = (props: { name: string; image: string;productId:string| number }) => {

    const dispatch = useDispatch();
    const commentModal = useSelector((state: any) => state.auth.commentModal);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);

    function closeModal() {
        dispatch({type: 'commentModal', payload: false})
    }

    const ratingChanged = (newRating: number) => {
        setScore(newRating);
    };

    const registerComment = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let error = false;
        const inputs = document.querySelectorAll('.requireC');
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i] as HTMLInputElement;
            if (input.value.trim() === '') {
                error = true;
                input.classList.add('border-red-500');
            } else {
                input.classList.remove('border-red-500');
            }
        }
        let rateInput = document.querySelector('.textRate');
        if (score === 0) {
            rateInput && rateInput.classList.add('text-red-500');
            error = true;
        } else {
            rateInput && rateInput.classList.remove('text-red-500');
        }

        if (error) {
            return false;
        }
        setLoading(true);
        let data={
            "description":comment,
            title,score,
           "product_id":props.productId
        }
        axios({url:Routers.COMMENTS,method:'POST',data}).then(response=>{
            setLoading(false);
            if(response.data.result){
                setTitle('');
                setComment('');
                setScore(0);
                toast.dark('پیام شما با موفقیت ثبت شد');
                dispatch(comments(props.productId));
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
            isOpen={commentModal}
            className="Modal"
            overlayClassName="Overlay"
            shouldCloseOnOverlayClick={false}
            closeTimeoutMS={500}
        >
            <div className={'content md:w-8/12 lg:w-6/12 xl:w-5/12 w-11/12'}>

                <div className={'flex items-center justify-between text-xl border-b-2 pb-2 border-gray-100 mb-5 px-1'}>
                    <span>نظر شما درباره این محصول</span>
                    <i className="fas fa-times cursor-pointer" onClick={closeModal}></i>
                </div>

                <div className={"p-3 flex justify-between items-center grid grid-cols-12 sm:gap-3"}>

                    <div className={"sm:col-span-5 col-span-12 text-center"}>
                        <p>{props.name}</p>
                        <img src={props.image} alt={props.name} className={'mx-auto w-54 sm:w-64'}/>
                    </div>

                    <form className={"sm:col-span-7 col-span-12"}>

                        <p>عنوان نظر</p>
                        <input className={'mt-2 input w-full requireC'}
                               type={"text"}
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}/>


                        <div className={'my-4'}>
                            <p className={'textRate'}>امتیاز شما</p>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={25}
                                activeColor="#ffd700"
                                edit={true}
                            />
                        </div>

                        <p>متن نظر</p>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                                  className={'mt-2 input w-full requireC'} rows={5}/>


                        <button className={'flex items-center justify-center btn-blue my-3 px-5'}
                                onClick={registerComment}
                                disabled={loading}>
                            <span>ثبت نظر</span>
                            <i className={`${loading ? 'fas fa-circle-notch mr-1 ' : 'hidden'} text-orange-200 fa-spin text-xl`}></i>
                        </button>

                    </form>


                </div>

            </div>
        </Modal>
    );
};

export default Index;