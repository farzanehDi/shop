import axios from "axios";
import {ThunkDispatch} from 'redux-thunk';
import {Routers} from '../../utils/configUrl';

export const comments = (id: string | number, offset = 1, length = 10) => (dispatch: ThunkDispatch<{}, any, any>) => {

    axios(`${Routers.PRODUCTS}/${id}/comments`,{
        params: {
            page:offset,
            length
        }
    })
        .then((response) => {
            // console.log('comment ',response.data);

            if(response.data.result){
                dispatch({
                    type: "commentList",
                    payload: response.data.data.array
                });
                dispatch({
                    type: "commentTotal",
                    payload: response.data.data.pagination.total
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })


};
