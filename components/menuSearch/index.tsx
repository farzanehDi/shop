import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Routers} from "../../utils/configUrl";
import {useRouter} from 'next/router';
import queryString from 'query-string';
import {useViewPort} from "../../utils/hook";

const MenuSearch = () => {

    const [searchedTxt, setSearchedTxt] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [searchItems, setSearchItems] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const {width}=useViewPort();
    const router = useRouter();

    useEffect(() => {
        const queryParams: any = router.query
        const search_phrase: any = queryParams.search_phrase || '';
        setSearchedTxt(search_phrase);
    }, [])

    const focusInput = () => {
        if(width>=770){
            if (dataLength > 0) {
                setShowDropDown(true);
            } else if (searchedTxt.length > 1) {
                searchMenu(searchedTxt);
            }
        }
    };

    const changeInput = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        const value = e.target.value;
        setSearchedTxt(value);

        if (value.length > 1 && width>=770) {
            searchMenu(value);
        } else {
            setShowDropDown(false);
            setDataLength(0);
        }

    };

    const searchMenu = (value: string | any[] | ((prevState: string) => string)) => {

        setLoading(true);
        axios.get(`${Routers.SEARCH_PRODUCT}?search=${value}`).then(response => {
            setLoading(false);
            if (response.data.result) {
                setSearchItems(response.data.data.array.slice(0, 5));
                setDataLength(response.data.data.pagination.total);
            }

        }).catch(() => {
            setLoading(false);
            setSearchItems([]);
            setDataLength(0)
        })
        setShowDropDown(true);
    };

    const continueSearch = () => {

        if (searchedTxt.length > 0) {
            const queryParams: any = router.query;

            queryParams.page = 1;
            queryParams.search_phrase = searchedTxt;
            let asPath = `/?${queryString.stringify(queryParams, {arrayFormat: 'comma', encode: false})}`;
            router.push({
                pathname: '/',
                query: queryString.stringify(queryParams, {arrayFormat: 'comma', encode: false})
            }, asPath)
        }

    };

    const goProductPage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) => {
        e.preventDefault();
        router.push(`/p/${name}`)
    };


    return (
        <div className={'relative w-full'} onBlur={() => setShowDropDown(false)}>
            <div className="flex items-stretch justify-center ">
                <input type="text" className="input h-12 rounded-tl-none rounded-bl-none border-l-0 sm:w-64 w-3/4"
                       placeholder="جستجو..." value={searchedTxt} onChange={changeInput} onFocus={focusInput}/>
                <button className="btn btn-blue flex items-center justify-center rounded-tr-none rounded-br-none"
                        onClick={continueSearch}>
                    <i className={`${loading ? 'hidden' : 'fas fa-search'} text-xl`}></i>
                    <i className={`${loading ? 'fas fa-circle-notch' : 'hidden'} text-orange-200 fa-spin text-xl`}></i>
                </button>
            </div>
            <div
                className={`z-10  flex flex-col border border-t-0 border-gray-200 bg-gray-50 space-y-4 absolute w-full rounded-br rounded-bl 
                ${showDropDown ? 'p-3 min-h-auto h-auto opacity-1 ' : 'overflow-hidden opacity-0 h-0 max-h-0'}`}>

                {searchItems.length > 0 ?
                    searchItems.map((item: { code: any; name_en: string; name_fa: string }, index: number) => (
                        <div key={`searchItem${index}`}
                             onMouseDown={(e) => goProductPage(e, item.name_en)}>

                            <span className={'hover:text-blue-200 cursor-pointer'}>{item.name_fa}</span>

                        </div>
                    ))
                    :
                    <p>متاسفانه موردی یافت نشد</p>
                }

                <button onMouseDown={continueSearch}
                        className={`mt-2 btn btn-blue w-24 ${dataLength > 5 ? '' : 'hidden'}`}>ادامه ...
                </button>

            </div>
        </div>

    );
};

export default MenuSearch;