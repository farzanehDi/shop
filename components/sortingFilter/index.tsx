import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useRouter} from "next/router";
import queryString from 'query-string';

const Index = () => {

    const router = useRouter();
    const filterItems = useSelector((state: any) => state.auth.filterItems);
    const [sortItem, setSortItem] = useState([]);
    const [sortId, setSortId] = useState<string | number>(1);
    const path = router.pathname;
    const queryParams: any = router.query;

    useEffect(() => {
        setSortId(queryParams.sortBy || 'newest');
    }, [])

    useEffect(() => {
        Array.isArray(filterItems.sort) && setSortItem(filterItems.sort);
    }, [filterItems]);


    const sortFilter = async (id: string | number) => {

        setSortId(id);

        queryParams.sortBy = (id != 'newest') ? id : undefined;
        queryParams.page = 1;
        router.push({
            pathname: path,
            query: queryString.stringify(queryParams, {arrayFormat: 'comma', encode: false})
        })

    };


    return (
        <div
            className={'flex flex-col sm:flex-row  sm:items-center border border-gray-100 rounded p-3 shadow-sm bg-white'}>
            <div>
                <i className="w-0 overflow-hidden sm:w-auto fas fa-align-center text-lg"></i>
                <span className={'mx-0 sm:mx-4'}>مرتب سازی بر اساس:</span>
            </div>

            {
                sortItem.map((item: any, index: number) => (
                    <span key={`sortItem${index}`}
                          className={`fit-content cursor-pointer ml-8 rounded px-2 py-1 my-3 sm:my-0 ${sortId == item.id ? 'bg-blue-300 text-white' : 'hover:bg-gray-100'}`}
                          id={item.id} onClick={() => sortFilter(item.id)}>{item.name}</span>
                ))
            }
        </div>
    );
};

export default Index;