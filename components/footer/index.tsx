import React, {useState} from 'react';
import {validateEmail} from '../../utils/validate';
import axios from 'axios';
import {Routers} from '../../utils/configUrl';
import {toast} from 'react-toastify';

interface Item {
    menu: any [];
    contact_information: { phone:string,fax:string,email:string,address:string };
    footer_text:string,
}

const Footer = (props:{data:Item}) => {

    const [email, setEmail] = useState('');
    const [disableBtn, setDisableBtn] = useState(true);
    const [loading, setLoading] = useState(false);

    const validateMail = (e: { target: { value: string } }) => {
        setEmail(e.target.value);
        if (validateEmail(e.target.value)) {
            setDisableBtn(false);
        } else {
            setDisableBtn(true);
        }
    };


    const registerEmail = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
        const response = await axios.post(Routers.ADD_NEWSLETTER_SUBSCRIBER ,{data:email});
        if (response.data.result) {
            setLoading(false);
            toast.dark('عضویت شما با موفقیت انجام شد.');
            setEmail('');
            setDisableBtn(true);
        } else {
            setLoading(false);
            toast.error(response.data.message[0]);
        }
    }

    return (
        <footer className={'bg-gray-100 py-3'}>
            {/***news letter section***/}
            <div className={'mt-2 container mx-auto px-3 lg:px-5 flex flex-col divide-y-2 divide-gray-200'}>
                <div className={'flex items-center justify-center flex-wrap  sm:justify-between'}>
                    <span className={'text-center font-medium text-lg sm:text-base md:text-lg'}>در خبرنامه فالنیک عضو شوید تا از تخفیفات و جشنواره ها با خبرتان کنیم</span>

                    <form className={'flex align-center justify-center sm:mt-0 mt-2'}>

                        <input type={'email'} className={'input ml-2 lg:w-64 md:w-56 '}
                               placeholder={'آدرس ایمیل خود را وارد کنید'}
                               value={email} onChange={validateMail}/>
                        <button className={`w-24 text-sm btn-blue ${disableBtn ? 'btn-disable' : ''} ${loading?'btn-waite':''}`}
                                disabled={loading}
                                onClick={registerEmail}>
                            <span className={`${loading ? 'hidden' : 'block'}`}>تایید ایمیل</span>
                            <span
                                className={`flex items-center justify-center text-orange-200 ${loading ? 'block' : 'hidden'}`}>
                                <i className="fas fa-circle-notch fa-spin text-xl"></i>
                            </span>
                        </button>
                    </form>

                </div>

                {/***links and menu section***/}
                <div className={'flex justify-between flex-wrap mt-4 pt-5'}>
                    {
                        props.data && props.data.menu.map((item: { header: React.ReactNode; sub_items: any[]; }, index: number) => (
                            <div key={`footerMenu${index}`}
                                 className={'leading-relaxed text-gray-700 sm:w-1/4 w-full flex flex-col'}>
                                <p className={'text-blue-200 mb-2 font-medium tracking-wide'}>{item.header}</p>

                                {item.sub_items.map((subItem, subIndex) => (
                                    <a key={`footerLink${subIndex}`} href={subItem.url}>{subItem.text}</a>
                                ))}
                            </div>

                        ))
                    }

                    <div className={'sm:w-1/4 w-full flex flex-col'}>
                        <div className={'flex items-center mb-2'}>
                            <i className="text-xl fas fa-phone ml-2"></i>
                            <span>{props.data && props.data.contact_information.phone}</span>
                        </div>
                        <div className={'flex items-center mb-2'}>
                            <i className="text-xl fas fa-fax ml-2"></i>
                            <span>{props.data && props.data.contact_information.fax}</span>
                        </div>
                        <div className={'flex items-center mb-2'}>
                            <i className="text-xl fas fa-envelope ml-2"></i>
                            <span>{props.data && props.data.contact_information.email}</span>
                        </div>
                        <div className={'flex'}>
                            <i className="text-xl fas fa-map-marker-alt ml-2"></i>
                            <span className={'text-justify'}>{props.data && props.data.contact_information.address}</span>
                        </div>
                    </div>
                </div>
                {/***social media***/}
                <div className={'flex justify-between items-center flex-wrap pt-4 mt-4'}>
                    <div className={'text-center w-full sm:w-1/2'}>
                        <p className={'font-medium text-lg text-orange-200'}>فالنیک را در شبکه های اجتماعی دنبال
                            کنید</p>
                        <div className={'mt-3 flex align-center justify-center'}>
                            <a href={'http://fb.me/falnic.iranhp'} target={'_blank'}
                               className={'mx-2 cursor-pointer flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-300 border-solid bg-gray-500 transform motion-reduce:transform-none hover:border-white hover:-translate-y-2 hover:bg-blue-500 '}>
                                <i className="text-xl text-white fab fa-facebook-f"></i>
                            </a>

                            <a href={'https://twitter.com/falnic_iranhp'} target={'_blank'}
                               className={'mx-2 cursor-pointer flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-300 border-solid bg-gray-500 transform motion-reduce:transform-none hover:border-white hover:-translate-y-2 hover:bg-blue-200 '}>
                                <i className="text-xl text-white fab fa-twitter"></i>
                            </a>
                            <a href={'https://www.linkedin.com/company/falnic-iranhp'} target={'_blank'}
                               className={'mx-2 cursor-pointer flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-300 border-solid bg-gray-500 transform motion-reduce:transform-none hover:border-white hover:-translate-y-2 hover:bg-blue-300 '}>
                                <i className="text-xl text-white fab fa-linkedin-in"></i>
                            </a>
                            <a href={'https://www.instagram.com/falnic_iranhp/'} target={'_blank'}
                               className={'mx-2 cursor-pointer flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-300 border-solid bg-gray-500 transform motion-reduce:transform-none hover:border-white hover:-translate-y-2 hover:bg-pink-600 '}>
                                <i className="text-xl text-white fab fa-instagram"></i>
                            </a>
                            <a href={'https://t.me/falnic'} target={'_blank'}
                               className={'mx-2 cursor-pointer flex items-center justify-center rounded-full h-12 w-12 border-2 border-gray-300 border-solid bg-gray-500 transform motion-reduce:transform-none hover:border-white hover:-translate-y-2 hover:bg-blue-100 '}>
                                <i className="text-xl text-white fab fa-telegram-plane"></i>
                            </a>
                        </div>
                    </div>
                    {/***/}
                    <div className="flex justify-around mt-3 w-full sm:w-1/2 lg:w-1/3 sm:mt-0">

                        <img src="https://trustseal.enamad.ir/logo.aspx?id=18915&p=lznbzpfvgthvpeukpeuk"
                             alt="اینماد فالنیک (ایران اچ پی)"
                             className={"mx-1 cursor-pointer w-1/5 sm:w-1/3 lg:w-auto"}
                             onClick={() => window.open('https://trustseal.enamad.ir/Verify.aspx?id=18915&p=nbpdjzpgdrfsqgwlqgwl', 'Popup', 'toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30')}
                             id="drftgwmdsguilbrhlbrh"/>


                        <img id='jxlzjxlzesgtfukzrgvj'
                             onClick={() => window.open("https://logo.samandehi.ir/Verify.aspx?id=11063&p=rfthrfthobpdgvkaxlao", "Popup", "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")}
                             alt='ساماندهی فالنیک' className={"mx-1 cursor-pointer w-1/5 sm:w-1/3 lg:w-auto"}
                             src='https://logo.samandehi.ir/logo.aspx?id=11063&p=nbpdnbpdlymawlbqqfti'/>

                        <img src={"/images/logo-parvane.png"}
                             alt="پروانه کسب مجازی فالنیک (ایران اچ پی)"
                             className={"mx-1 cursor-pointer w-1/5 sm:w-1/3 lg:w-auto"}
                             onClick={() => window.open('https://ecunion.ir/verify/falnic.com?token=74537965c0ca9e32fad3', 'Popup', 'toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30')}
                        />

                    </div>
                </div>
                {/***description section***/}
                {/*<div className={"pt-3 mt-4"}>*/}
                {/*    <div className="text-justify" dangerouslySetInnerHTML={{__html: props.data.footer_text}}></div>*/}
                {/*</div>*/}
                {/***copy right***/}
                <p className={'mt-4 pt-4 mb-2 text-center'}>©کلیه حقوق این سایت متعلق به شرکت‌ فالنیک (ایران اچ پی) است.
                    v1.1.0</p>
                {/****/}
            </div>
        </footer>
    );
};

export default Footer;