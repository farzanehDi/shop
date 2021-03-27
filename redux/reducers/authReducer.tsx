import {AnyAction} from "redux";

const initialState = {
    cartItems: [],

    filterItems: [],
    categoryItems: {},
    menuItems: {},
    itemLength: 0,
    breadcrumb: '',
    head_page: '',
    loading: false,
    showCart: false,
    loginRegisterModal: false,
    isLogin: false,
    loginSection: false,
    cellphone: '',
    confirmInvoiceRequestModal: null,
    configServer: false,
    invoiceReq: false,
    contactModal: false,
    commentModal: false,
    commentList: [],
    commentTotal: 0,
    shareModal: false,
    compareProduct: [],
    compareId: [],
    compareModal: false,
    completeProfileModal: false,
    checkoutInfo: null,
    addressModal: false,
    provinceList: [],
    cityList: [],
    companyModal: false,
    favoriteProduct: null,
    completeProfile: false,
    addressCheckout: '',
    shippingTypeCheckout: '',
    companyCheckout: '',
    invoiceCheckout: '',
};

const reducer = (state = initialState, action: AnyAction) => {

    switch (action.type) {

        case "cartItems":
            return {...state, cartItems: action.payload};
        case "filterItems":
            return {...state, filterItems: action.payload};
        case "categoryItems":
            return {...state, categoryItems: action.payload};
        case "itemLength":
            return {...state, itemLength: action.payload};
        case "breadcrumb":
            return {...state, breadcrumb: action.payload};
        case "head_page":
            return {...state, head_page: action.payload};
        case "loading":
            return {...state, loading: action.payload};
        case "showCart":
            return {...state, showCart: action.payload};
        case "loginRegisterModal":
            return {...state, loginRegisterModal: action.payload};
        case "isLogin":
            return {...state, isLogin: action.payload};
        case "loginSection":
            return {...state, loginSection: action.payload};
        case "cellphone":
            return {...state, cellphone: action.payload};
        case "menuItems":
            return {...state, menuItems: action.payload};
        case "confirmInvoiceRequestModal":
            return {...state, confirmInvoiceRequestModal: action.payload};
        case "configServer":
            return {...state, configServer: action.payload};
        case "invoiceReq":
            return {...state, invoiceReq: action.payload};
        case "contactModal":
            return {...state, contactModal: action.payload};
        case "commentModal":
            return {...state, commentModal: action.payload};
        case "commentList":
            return {...state, commentList: action.payload};
        case "commentTotal":
            return {...state, commentTotal: action.payload};
        case "shareModal":
            return {...state, shareModal: action.payload};
        case "compareProduct":
            return {...state, compareProduct: action.payload};
        case "compareModal":
            return {...state, compareModal: action.payload};
        case "compareId":
            return {...state, compareId: action.payload};
        case "completeProfileModal":
            return {...state, completeProfileModal: action.payload};
        case "checkoutInfo":
            return {...state, checkoutInfo: action.payload};
        case "addressModal":
            return {...state, addressModal: action.payload};
        case "provinceList":
            return {...state, provinceList: action.payload};
        case "cityList":
            return {...state, cityList: action.payload};
        case "companyModal":
            return {...state, companyModal: action.payload};
        case "favoriteProduct":
            return {...state, favoriteProduct: action.payload};
        case "completeProfile":
            return {...state, completeProfile: action.payload};
        case "addressCheckout":
            return {...state, addressCheckout: action.payload};
        case "shippingTypeCheckout":
            return {...state, shippingTypeCheckout: action.payload};
        case "paymentWayCheckout":
            return {...state, paymentWayCheckout: action.payload};
        case "companyCheckout":
            return {...state, companyCheckout: action.payload};
        case "invoiceCheckout":
            return {...state, invoiceCheckout: action.payload};

        default:
            return state;

    }
}
export default reducer;
