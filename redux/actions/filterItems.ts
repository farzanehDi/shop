import axios from "axios";
import { ThunkDispatch } from 'redux-thunk';
import { Routers } from '../../utils/configUrl';

export const filterItemsFn = (category_name: string | string[] | undefined='',brands:string | string[] | undefined='') => (dispatch: ThunkDispatch<{}, any, any>) => {

    axios.get(Routers.FILTER_ITEMS,{
        params: {
            category_name,
            brands
        }
    })

        .then((response) => {

            console.log('filter items',response.data);
            if(response.data.result){
                dispatch({
                    type: "filterItems",
                    payload: response.data.data
                });
            }
           
        })
        .catch((err) => {
            console.log(err);
        })


};
