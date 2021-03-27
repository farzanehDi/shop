import axios from "axios";
import {ThunkDispatch} from 'redux-thunk';
import {Routers} from "../../utils/configUrl";


export const getCategoryItems = (values: { categoryId: number | string; brandId:string; offset: number;
max_price: number; min_price: number; available: boolean; brands: any; sort_by: number; search_phrase: string; }) => (dispatch: ThunkDispatch<{}, any, any>) => {

    dispatch({
        type: "loading",
        payload: true
    });
    let brands = values.brands;
    let category_name = values.categoryId;
    let brand_name = values.brandId;
    let page = values.offset;
    let minPrice = values.min_price;
    let maxPrice = values.max_price;
    let status = values.available;
    let sort = values.sort_by;
    let search= values.search_phrase;
    // let attribute = values.attribute;

    return (

        axios.get(Routers.PRODUCTS,{
            params: {
                page,
                length:32,
                category_name,brand_name,
                sort,brands,status,search,
                'price[min]':minPrice,
                'price[max]':maxPrice,
            }
        })

            .then((response) => {

                dispatch({
                    type: "loading",
                    payload: false
                });

                if(response.data.result){
                    dispatch({
                        type: "categoryItems",
                        payload: response.data.data.array
                    });
                    dispatch({
                        type: "itemLength",
                        payload: response.data.data.length
                    });
                    dispatch({
                        type: "breadcrumb",
                        payload: response.data.data.breadcrumb
                    });
                    dispatch({
                        type: "head_page",
                        payload: response.data.data.head_page
                    });
                }

            })
            .catch((err) => {
                dispatch({
                    type: "loading",
                    payload: false
                });
                console.log(err);
            })
    )
};




