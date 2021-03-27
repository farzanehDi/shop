import { createStore, applyMiddleware, AnyAction,Middleware} from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware, {ThunkDispatch, ThunkMiddleware} from 'redux-thunk';
import combinedReducer from '../redux/reducers/index'

const bindMiddleware = (middleware: (Middleware<ThunkDispatch<{}, undefined, AnyAction>, {}, ThunkDispatch<{}, undefined, AnyAction>> & { withExtraArgument<E>(extraArgument: E): ThunkMiddleware<{}, AnyAction, E> })[]) => {
    
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        // @ts-ignore
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    // @ts-ignore
    return applyMiddleware(...middleware)
};


const reducer = (state:any, action:AnyAction) => {

    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState
    } else {
        return combinedReducer(state, action)
    }
};

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]))
};

export const wrapper = createWrapper(initStore);

