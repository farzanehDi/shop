import React, { useState, useEffect } from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { formatNumber } from '../../utils/formatNumber';
import { useSelector} from 'react-redux';
import { useRouter } from "next/router";
const Range = createSliderWithTooltip(Slider.Range);
import queryString from 'query-string';


const Index = () => {

    const router = useRouter();
    const filterItems = useSelector((state: any) => state.auth.filterItems);
    const [showPrice, setShowPrice] = useState(false);
    const [selectedMinPrice, setSelectedMinPrice] = useState(0);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(10);
    const [selectedBrands, setSelectedBrands] = useState<any>([]);
    const [availableItems, setAvailableItems] = useState<boolean>(false);
    // const [selectedAttribute, setSelectedAttribute] = useState<any>([]);
    const path = router.pathname;
    // *****push redux state***
    const [brands, setBrands] = useState<any>([]);
    const [isAvailable, setIsAvailable] = useState<boolean>(false);
    // const [attribute, setAttribute] = useState<any>([]);
    const [priceRange, setPriceRange] = useState<any>({ min: 0, max: 0 });
    // ****

    useEffect(() => {
        const queryParams: any = router.query
        const brands: any = queryParams.brands || [];
        // const attribute: any = queryParams.attribute || [];
        const availableParams: boolean = queryParams.available || false;
        const minPrice = queryParams.minPrice;
        const maxPrice = queryParams.maxPrice;
        setSelectedBrands(brands);
        setAvailableItems(availableParams);
        // setSelectedAttribute(attribute);
        setSelectedMinPrice(minPrice);
        setSelectedMaxPrice(maxPrice);

    }, [])

    // useEffect(() => {
    //     setSelectedMinPrice(filterItems.price_range && filterItems.price_range.min)
    //     setSelectedMaxPrice(filterItems.price_range && filterItems.price_range.max)
    // }, [filterItems])
    useEffect(() => {
        filterItems && filterItems.brands && setBrands(filterItems.brands);
        filterItems && filterItems.is_available && setIsAvailable(filterItems.is_available);
        // filterItems && filterItems.attribute && setAttribute(filterItems.attribute);
        filterItems && filterItems.price_range && setPriceRange(filterItems.price_range);
    }, [filterItems])


    const showPriceSection = (e: { target: { checked: boolean; }; }) => {
        if (e.target.checked) {
            setShowPrice(true)
        } else {
            setShowPrice(false)
        }
    }

    const selectedPrice = (e: number[]) => {
        setSelectedMinPrice(e[0]);
        setSelectedMaxPrice(e[1]);
    };

    const filterBrand = async (e: any) => {

        const queryParams: any = router.query
        const brands: any = queryParams.brands;

        let array = brands ? brands.split(',') : [];
        // console.log('array', array)
        let value = e.target.value;
        if (e.target.checked) {
            array.push(value);

        } else {
            let filterBrands = array.filter((el: any) => el != e.target.value)
            array = filterBrands;
        }

        queryParams.brands = array;
        queryParams.page = 1;

        let asPath = `${path}?${queryString.stringify(queryParams, { arrayFormat: 'comma' })}`;
        router.push({
            pathname: path,
            query: queryString.stringify(queryParams, { arrayFormat: 'comma' }),

        }, asPath)

    };

    const availableProduct = (e: any) => {
        const queryParams: any = router.query;
        if (e.target.checked) {
            queryParams.available = true;
        } else {
            queryParams.available = undefined;
        }
        queryParams.page = 1;
        let asPath = `${path}?${queryString.stringify(queryParams, { arrayFormat: 'comma', encode: false })}`;
        router.push({
            pathname: path,
            query: queryString.stringify(queryParams, { arrayFormat: 'comma', encode: false })
        },asPath)
    };

    // const filterAttribute = (e: any) => {
    //
    //     const queryParams: any = router.query;
    //     const attribute: any = queryParams.attribute;
    //
    //     let array = attribute ? attribute.split(',') : [];
    //
    //     if (e.target.checked) {
    //         array.push({ [e.target.getAttribute("data-name")]: e.target.value });
    //     }
    //     else {
    //         let filteredAttribute: any[] = [];
    //         array.map((item: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => {
    //
    //             for (let key in item) {
    //                 if (item.hasOwnProperty(key)) {
    //
    //                     if (key != e.target.getAttribute("data-name") && item[key] != e.target.value)
    //                         filteredAttribute.push(item)
    //                 }
    //             }
    //         });
    //
    //         array = filteredAttribute;
    //     }
    //     queryParams.attribute = array;
    //     queryParams.page = 1;
    //     let asPath = `${path}?${queryString.stringify(queryParams, { arrayFormat: 'comma', encode: false })}`;
    //     router.push({
    //         pathname: path,
    //         query: queryString.stringify(queryParams, { arrayFormat: 'comma', encode: false })
    //     },asPath)
    // }

    const selectPriceRange = () => {
        const queryParams: any = router.query;

        if (selectedMinPrice == filterItems.price_range.min && selectedMaxPrice == filterItems.price_range.max) {
            queryParams.minPrice = undefined;
            queryParams.maxPrice = undefined;
        } else {
            queryParams.minPrice = selectedMinPrice;
            queryParams.maxPrice = selectedMaxPrice;
        }

        queryParams.page = 1;
        let asPath = `${path}?${queryString.stringify(queryParams, { arrayFormat: 'comma', encode: false })}`;
        router.push({
            pathname: path,
            query: queryString.stringify(queryParams, { arrayFormat: 'comma', encode: false })
        },asPath)
    }


    return (
        <>

            {/***brands filter***/}
            <div className={`flex-col border border-gray-100 shadow-sm rounded p-3 mb-3 bg-white ${brands.length<=0?'hidden':'flex'}`}>
                <p className={'font-medium'}>برند</p>
                <hr className={'border-gray-100 my-2'} />

                {
                    brands.map((brand: { id: string | number; name: string }, index: number) => (
                        <label key={`brands${index}${brand.id}`} className="inline-flex items-center my-2">
                            <input type="checkbox" className="h-5 w-5 text-gray-500" value={brand.name}
                                onClick={filterBrand} defaultChecked={selectedBrands.includes(brand.name)} />
                            <span className={'mr-2'}>{brand.name}</span>
                        </label>
                    ))
                }

            </div>
            {/***available p filter***/}
            <div className={`items-center border border-gray-100 rounded p-3 mb-3 shadow-sm bg-white ${isAvailable ? 'flex' : 'hidden'}`}>
                <div className="relative inline-block w-16 ml-2 align-middle select-none">
                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block  w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer left-0 "
                        onClick={availableProduct} defaultChecked={availableItems} />
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <span>فقط کالاهای موجود</span>
            </div>
            {/***dynamic filter***/}
            {/*{*/}
            {/*    attribute.map((att: { title: string; items: any[]; }, index: number) => (*/}
            {/*        <div key={`attribute${index}`} className={`flex flex-col border border-gray-100 shadow-sm rounded p-3 mb-3 bg-white`}>*/}
            {/*            <p className={'font-medium'}>{att.title}</p>*/}
            {/*            <hr className={'border-gray-100 my-2'} />*/}
            {/*            {*/}
            {/*                att.items.map((item, index) => {*/}
            {/*                    <label key={`subAtt${item.text}${index}`} className="inline-flex items-center my-2">*/}
            {/*                        <input type="checkbox" className="h-5 w-5 text-gray-500" value={item.value} data-name={item.name} onChange={filterAttribute}*/}
            {/*                            checked={selectedAttribute.includes({ [item.name]: item.value })} />*/}
            {/*                        <span className={'mr-2'}>{item.text}</span>*/}
            {/*                    </label>*/}
            {/*                })*/}
            {/*            }*/}

            {/*        </div>*/}
            {/*    ))*/}
            {/*}*/}

            {/***price range***/}
            <div className={`border border-gray-100 rounded p-3 mb-3 shadow-sm bg-white ${priceRange.max == 0 ? 'hidden' : ''}`}>

                <div className={`flex items-center`}>
                    <div className="relative inline-block w-16 ml-2 align-middle select-none">
                        <input type="checkbox" name="toggle" id="togglePrice" className="toggle-checkbox absolute block  w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer left-0 "
                            onChange={showPriceSection} />
                        <label htmlFor="togglePrice" className="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                    <span>محدوده قیمت مورد نظر</span>
                </div>

                <div className={`w-11/12 mx-auto ${showPrice ? '' : 'overflow-hidden opacity-0 h-0 max-h-0'}`}>
                    <hr className={'border-gray-100 mb-8 mt-3'} />
                    {/***price slider***/}
                    <Range
                        value={[selectedMinPrice || priceRange.min, selectedMaxPrice || priceRange.max]}
                        min={priceRange.min}
                        max={priceRange.max}
                        onAfterChange={selectedPrice}
                        tipFormatter={value => <span> {formatNumber(value)} ریال</span>}
                        trackStyle={[{ backgroundColor: '#013b7a' }]}
                        railStyle={{ backgroundColor: '#007bff' }}
                        marks={{
                            [priceRange.min]: {
                                style: {
                                    left: 20
                                },
                                label: <strong className={'text-xs whitespace-no-wrap'}>{formatNumber(priceRange.min)} ریال</strong>,
                            },
                            [priceRange.max]: {
                                style: {
                                    right: -8
                                },
                                label: <strong className={'text-xs whitespace-no-wrap'}>{formatNumber(priceRange.max)} ریال</strong>
                            }
                        }}

                        handleStyle={[
                            { transition: "none" }
                        ]}
                    />
                    {/***show selected price***/}
                    <hr className={'border-gray-100 mt-8 mb-3'} />
                    <div className={`flex items-stretch justify-between divide-x divide-x-reverse `}>
                        <div className={'flex flex-col items-center w-1/2'}>
                            <span>از</span>
                            <span className={'my-2'}>{formatNumber(selectedMinPrice || priceRange.min )}</span>
                            <span>ریال</span>
                        </div>
                        <div className={'flex flex-col items-center w-1/2'}>
                            <span>تا</span>
                            <span className={'my-2'}>{formatNumber(selectedMaxPrice || priceRange.max)}</span>
                            <span>ریال</span>
                        </div>
                    </div>

                    <button className={'block btn bg-green-600 rounded text-white p-3 hover:bg-green-800 mx-auto mt-6 mb-3'} onClick={selectPriceRange}>
                        <i className="fas fa-filter">&nbsp;</i>
                        اعمال محدوده قیمت
                    </button>
                    {/* end show selected price */}
                </div>
            </div>
            {/***/}
        </>
    );
};

export default Index;