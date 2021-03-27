import {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {filterItemsFn} from "../../../redux/actions/filterItems";
import FilterComponent from "../../../components/filterProduct";
import {useViewPort} from "../../../utils/hook";
import SortingFilter from "../../../components/sortingFilter";
import {GetServerSideProps} from 'next';
import {wrapper} from '../../../redux/store';
import {AnyAction, bindActionCreators, Dispatch} from 'redux';
import {getCategoryItems} from '../../../redux/actions/getCategoryItem';
import CategoryItems from "../../../components/categoryItems";
import Head from "next/head";
import {useRouter} from 'next/router'

function Index() {

    const dispatch = useDispatch();
    const {width} = useViewPort();
    const breadcrumb = useSelector((state: any) => state.auth.breadcrumb);
    const itemLength = useSelector((state: any) => state.auth.itemLength);
    const head_page = useSelector((state: any) => state.auth.head_page);
    const router = useRouter()
    const {category} = router.query
    const {brandName} = router.query

    useEffect(() => {

        // ***get filter items***
        dispatch(filterItemsFn(category, brandName))
        // ***
    }, []);

    return (
        <>
            <Head>
                <title>{head_page.title}</title>
                {
                    head_page.meta && head_page.meta.map((obj: { [x: string]: any; }, index: number) => {

                        const keys = Object.keys(obj);
                        let props: any = {};
                        {
                            keys.map((key) => (
                                props[key] = obj[key]
                            ))
                        }
                        return (<meta key={`meta${index}`} {...props} />)

                    })
                }

            </Head>

            <div className={'w-full grid grid-cols-12 gap-4'}>

                <div className={`mt-2 col-span-3  ${width < 770 ? 'hidden' : ''}`}>
                    <div className={'sticky top-0'}>
                        <FilterComponent/>
                    </div>
                </div>

                <div className={`mt-2 ${width < 770 ? 'col-span-12' : 'col-span-9'}`}>
                    {/***show bread crumb***/}
                    <div className={'flex items-center justify-between mb-2'}>
                         <div dangerouslySetInnerHTML={{ __html: breadcrumb }}></div>
                        <span>{itemLength} کالا</span>
                    </div>
                    {/**********description section********/}
                    <div
                        className={`border border-gray-100 shadow-sm rounded p-3 mb-3 bg-white ${head_page.custom_html ? '' : 'hidden'}`}
                        dangerouslySetInnerHTML={{__html: head_page.custom_html}}>

                    </div>
                    {/***show sort filter top of products***/}
                    <div className={`mb-3 ${width < 770 ? 'hidden' : ''}`}>
                        <SortingFilter/>
                    </div>
                    {/***show products***/}
                    <CategoryItems/>
                    {/**********description section********/}
                    <div
                        className={`border border-gray-100 shadow-sm rounded p-3 mb-3 bg-white ${head_page.footer_html ? '' : 'hidden'}`}
                        dangerouslySetInnerHTML={{__html: head_page.footer_html}}>

                    </div>
                    {/***/}
                </div>

            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({store, query}) => {

    const offset = query.page || 1;
    const categoryId = query.category;
    const brandId = query.brandName;
    const max_price = query.maxPrice || '';
    const min_price = query.minPrice || '';
    const available = query.available ?'available':'';
    const brands = query.brands || [];
    const sort_by = query.sortBy || 1;
    const search_phrase = query.search_phrase || '';
    // const attribute = query.attribute || '';

    const values = {
        categoryId,
        brandId,
        offset,
        max_price,
        min_price,
        available,
        brands,
        sort_by,
        search_phrase,
        // attribute
    }

    //@ts-ignore
    await store.dispatch(getCategoryItems(values));

});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        getCategoryItems: bindActionCreators(getCategoryItems, dispatch),
        filterItemsFn: bindActionCreators(filterItemsFn, dispatch),
    }
};

export default connect(null, mapDispatchToProps)(Index)
