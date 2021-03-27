import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CommentModal from '../commentModal';
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import Pagination from "react-js-pagination";
import {comments} from "../../redux/actions/productComment";

const Index = (props: { productId: string | number; image: string; name: string }) => {

    const dispatch = useDispatch();
    const isLogin = useSelector((state: any) => state.auth.isLogin);
    const commentListRedux = useSelector((state: any) => state.auth.commentList);
    const commentTotalRedux = useSelector((state: any) => state.auth.commentTotal);
    const [activePage, setActivePage] = useState(1);
    const [commentList, setCommentList] = useState([]);
    const [commentTotal, setCommentTotal] = useState(0);

    useEffect(()=>{
        commentListRedux.length>0 && setCommentList(commentListRedux);
        commentTotalRedux>0 && setCommentTotal(commentTotalRedux);
    },[commentListRedux,commentTotalRedux])

    const handlePageChange = (pageNumber: number) => {
        setActivePage(pageNumber)
        dispatch(comments(props.productId,pageNumber));
    }

    return (
        <>
            <h3 className={'text-blue-200 text-xl font-bold mb-4'}>نظرات کاربران</h3>
            <div
                className={"grid grid-cols-12 flex justify-between items-center my-3 md:p-5 p-4 rounded border border-gray-200"}>
                <div className={"md:col-span-7 col-span-12"}>
                    <h3 className={"text-xl font-bold"}>شما هم می‌توانید در مورد این کالا نظر بدهید.</h3>
                    <p className={"text-justify mt-3"}>
                        برای ثبت نظر، لازم است ابتدا وارد حساب کاربری خود شوید. اگر این محصول را قبلا از فالنیک خریده
                        باشید، نظر شما به عنوان مالک محصول ثبت خواهد شد.
                    </p>
                </div>
                <div className={"btnComment md:col-span-5 col-span-12 text-center"}>
                    <button
                        className={`md:mt-0 mt-4 btn-blue py-3 flex items-center justify-center mx-auto ${isLogin ? 'hidden' : ''}`}
                        onClick={() => dispatch({type: 'loginRegisterModal', payload: true})}>
                        <i className="fas fa-sign-in-alt ml-2 text-xl"></i>
                        <span>ورود به حساب کاربری</span>
                    </button>

                    <button
                        className={`md:mt-0 mt-4 btn-blue py-3 flex items-center justify-center mx-auto ${isLogin ? '' : 'hidden'}`}
                        onClick={() => dispatch({type: 'commentModal', payload: true})}>
                        <i className="fas fa-comment-dots ml-2 text-xl"></i>
                        <span>افزودن نظر جدید</span>
                    </button>
                </div>
            </div>

            {
                commentList.map((comment: { title: string; is_confirm: boolean; created_at: string; name: string; score: string; description: string; }, index: number) => (
                    <div key={`comment${index}`}
                         className={"border border-gray-100 rounded bg-gray-50 flex flex-col justify-center items-center" +
                         " p-3 mt-2 mb-3 divide-y-2 divide-gray-200 my-2"}>
                        <div className={"headerComment w-full"}>
                            <div className={"flex justify-between items-center"}>
                                <p className={"text-lg font-bold mb-1"}>{comment.title}
                                    <span className={"mr-2 text-gray-300 text-xs italic " + (comment.is_confirm ? "hidden" : " ")}>
                                        (در انتظار تایید)
                                    </span>
                                </p>
                                <span>{comment.created_at}</span>
                            </div>
                            <div className={"flex items-center"}>
                                <span>{comment.name}</span>&nbsp;

                                <ReactStars
                                    count={5}
                                    value={JSON.parse(comment.score)}
                                    size={20}
                                    activeColor="#ffd700"
                                    edit={false}
                                />
                            </div>
                        </div>
                        <div className={"w-full text-justify py-2"}>
                            {comment.description}
                        </div>
                    </div>
                ))
            }
            <div className={'text-center mt-8 mb-4'}>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={Number(commentTotal)}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    innerClass={'border divide-x divide-x-reverse divide-gray-200 border-gray-200 rounded mx-auto inline-flex justify-center'}
                    itemClass={'bg-white flex items-center justify-center hover:text-blue-200'}
                    linkClass={'px-4 py-2 flex items-center justify-center '}
                    disabledClass={'cursor-default hover:cursor-default hover:text-opacity-50 hover:text-gray-200 text-gray-200'}
                    activeClass={'text-white bg-blue-200'}
                    itemClassLast={'rounded-bl rounded-tl'}
                    itemClassFirst={'rounded-br rounded-tr'}
                    firstPageText={<i className="fas fa-angle-double-right"></i>}
                    lastPageText={<i className="fas fa-angle-double-left"></i>}
                    prevPageText={<i className="fas fa-angle-right"></i>}
                    nextPageText={<i className="fas fa-angle-left"></i>}
                >
                </Pagination>
            </div>
            <CommentModal productId={props.productId} image={props.image} name={props.name}/>
        </>
    );
};

export default Index;