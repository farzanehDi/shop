import React,{useEffect} from 'react';
import Head from "next/head";
import '../utils/interceptors';
import '../styles/globals.css';
import '../styles/all.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { wrapper } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header';
import Footer from "../components/footer";
import Loading from '../components/loading';
import LoginRegister from "./loginRegister";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from "react-redux";
import cookies from 'next-cookies'
import axios from "axios";
import {Routers} from "../utils/configUrl";
import Cookies from "js-cookie";
import Router from "next/router";
// import useSWR from 'swr';
// import {checkAuth} from "../redux/actions/checkAuth";

// @ts-ignore
function WrappedApp({ Component, pageProps,menuItems,footerItems}) {

    const dispatch=useDispatch();
    const isLogin = useSelector((state: any) => state.auth.isLogin);
    let allowed = true;
    const router = useRouter();

    const startLoading = () => {dispatch({type: 'loading', payload: true})}
    const stopLoading = () => {dispatch({type: 'loading', payload: false})}

    useEffect(() => {
        // Router event handler
        Router.events.on("routeChangeStart", startLoading)
        Router.events.on("routeChangeComplete", stopLoading)
        return () => {
            Router.events.off("routeChangeStart", startLoading)
            Router.events.off("routeChangeComplete", stopLoading)
            dispatch({type: 'loading', payload: false});
        }
    }, [])

    if (router.pathname.startsWith("/checkout") && !isLogin) {
        allowed = false;
    }
    const ComponentToRender = allowed ? Component : LoginRegister;

    return (
        <>
            <Head>
                <title>فروشگاه فالنیک</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>

            <div className={'site'}>
                <Header menuItems={menuItems}/>
                <main className={'w-full siteContent py-3 container mx-auto px-2 lg:px-5'}>
                    <ComponentToRender {...pageProps} />
                </main>
                <Footer data={footerItems}/>
            </div>
            <ToastContainer position="top-right"
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl={true} />

            <Loading/>
        </>
    )
}

// @ts-ignore
WrappedApp.getInitialProps = async ({Component,ctx}) => {

    const responseCheckAuth=await fetch(`${Routers.BASE_URL}${Routers.CHECK_AUTH}`, {
        headers: {'Authorization': `Bearer ${cookies(ctx).auth || Cookies.get('auth')}`},
    })
    let jsonAuth = await responseCheckAuth.json();
    if(jsonAuth.result){
        ctx.store.dispatch({
            type:'isLogin',
            payload:jsonAuth.data.is_login
        })
        ctx.store.dispatch({
            type:'completeProfile',
            payload:jsonAuth.data.is_complete_profile
        })
    }

    const responseMenu=await fetch(`${Routers.BASE_URL}${Routers.MENU_ITEMS}`, {
        headers: {'Authorization': `Bearer ${cookies(ctx).auth || Cookies.get('auth')}`},
    })
    const jsonMenu = await responseMenu.json();
    const responseFooter=await axios(Routers.MENU_FOOTER);

    return {
            menuItems:jsonMenu.result?jsonMenu.data:null,
            footerItems:responseFooter.data.result? responseFooter.data.data:null
    }
}
export default wrapper.withRedux(WrappedApp);

