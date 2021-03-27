import React from 'react';
import styles from './menuItem.module.scss';
import {useRouter} from 'next/router';
import FilterComponent from "../../components/filterProduct";
import SortingFilter from "../../components/sortingFilter";

interface Item {
    items: any [];
    left_items: any[]
}

const menuItem = (props: { menuItems:Item}) => {


    const router = useRouter();

    const toggleMegaMenu = (id: string | undefined) => {

        let subMenu = id && document.getElementById(id);

        if (subMenu && !subMenu.classList.contains("hidden")) {
            subMenu.classList.toggle("hidden");

        } else {

            let allClass = document.querySelectorAll(".mega-menu");
            for (let i = 0; i < allClass.length; i++) {
                allClass[i].classList.add("hidden");
            }
            subMenu && subMenu.classList.remove("hidden");
        }
    };

    const mouseOver = (id: string | undefined) => {

        if (window.screen.width > 769) {

            let subMenu = id && document.getElementById(id);

            let allClass = document.querySelectorAll(".mega-menu");
            for (let i = 0; i < allClass.length; i++) {
                allClass[i].classList.add("hidden");

            }

            subMenu && subMenu.classList.remove("hidden");

        }

    };

    const mouseLeave = (id: string | undefined) => {

        if (window.screen.width > 769) {
            let subMenu = id && document.getElementById(id);
            subMenu && subMenu.classList.toggle("hidden")

        }

    };

    const toggleViewFilter = () => {

        let btnStatus = document.getElementById("viewFilterMenu");
        let exoMenu = document.getElementById("exo-menu");
        exoMenu && exoMenu.classList.remove(styles.display);
        let categoryFilterMenu = document.getElementById("categoryFilterMenu");
        categoryFilterMenu && categoryFilterMenu.classList.add("hidden");

        btnStatus && btnStatus.classList.toggle("hidden");

    };
    const toggleCategoryFilter = () => {

        let btnStatus = document.getElementById("categoryFilterMenu");
        let exoMenu = document.getElementById("exo-menu");
        exoMenu && exoMenu.classList.remove(styles.display);
        let viewFilterMenu = document.getElementById("viewFilterMenu");
        viewFilterMenu && viewFilterMenu.classList.add("hidden");

        btnStatus && btnStatus.classList.toggle("hidden");

    };

    const toggleMenu = () => {

        let viewFilterMenu = document.getElementById("viewFilterMenu");
        viewFilterMenu && viewFilterMenu.classList.add("hidden");
        let categoryFilterMenu = document.getElementById("categoryFilterMenu");
        categoryFilterMenu && categoryFilterMenu.classList.add("hidden");
        let btnStatus = document.getElementById("exo-menu");

        if (btnStatus && btnStatus.classList.contains(styles.display)) {
            btnStatus.classList.remove(styles.display);
            let allClass = document.querySelectorAll(".mega-menu");
            for (let i = 0; i < allClass.length; i++) {
                allClass[i].classList.add("hidden");
                allClass[i].classList.remove("block");
            }
        } else {
            btnStatus && btnStatus.classList.add(styles.display);
        }
    };

    return (

        <div className={`bg-gray-500 h-12 shadow-md ${styles.containerMenu}`}>
            <div className={"container mx-auto"}>
                <ul className={`exo-menu w-full relative h-12 float-right ${styles.exoMenu}`} id={"exo-menu"}>

                    {props.menuItems.items && props.menuItems.items.map((item: { is_mega_menu: boolean; is_sub_menu: boolean; id: string | undefined; url: string | undefined; icon: string; name: any; sub_items: any[]; image: string | undefined; }, index: number) => {

                        return props.menuItems.items.length > 0 ?
                            <li key={`menuItem${index}`}
                                className={"inline-block float-right " + (item.is_mega_menu ? "mega-drop-down " : item.is_sub_menu ? `drop-down ${styles.dropDown} relative h-12` : "")}

                                onMouseLeave={item.is_mega_menu || item.is_sub_menu ? () => mouseLeave(item.id) : () => {
                                }}
                                onMouseEnter={item.is_mega_menu || item.is_sub_menu ? () => mouseOver(item.id) : () => {
                                }}
                            >

                                <a href={item.url}
                                   onClick={item.is_mega_menu || item.is_sub_menu ? () => toggleMegaMenu(item.id) : () => {
                                   }} className={`menuLink h-full flex items-center text-white ${styles.menuLink}`}>

                                    <div className={item.icon ? "" : "hidden"}
                                         dangerouslySetInnerHTML={{__html: item.icon}}></div>
                                    <div dangerouslySetInnerHTML={{__html: item.name}}></div>
                                </a>

                                {item.is_mega_menu == false && item.is_sub_menu == true && item.sub_items.length > 0 ?
                                    <ul className={`${styles.dropDownUl} drop-down-ul relative bg-white border border-gray-100 border-t-0 pb-1 rounded-br-md rounded-bl-md hidden ${styles.dropDownUl}`}
                                        id={item.id}>
                                        {item.sub_items.map((subItem: { url: string | undefined; name: string }, index: number) => (

                                            <li key={`drop-down-ul2${index}`}><a href={subItem.url}
                                                               dangerouslySetInnerHTML={{__html: subItem.name}}></a>
                                            </li>

                                        ))}
                                    </ul>
                                    :
                                    ""
                                }
                                {item.is_mega_menu ?
                                    <div
                                        className={`${styles.megaMenu} mega-menu bg-white overflow-hidden pt-0 left-0 right-0 hidden min-h-full rounded-bl-md rounded-br-md`}
                                        id={item.id}>

                                        <div
                                            className={`mega-menu-wrap bg-white border border-gray-100 border-t-0 rounded-bl-md rounded-br-md ${styles.megaMenuWrap} ` + (item.image && item.image != "" ? styles.minHeight : "")}>
                                            {/* <div className={"mb-2"} dangerouslySetInnerHTML={{ __html: item.message }}></div> */}

                                            <div className="flex md:justify-around items-start flex-wrap">
                                                {item.sub_items.map((subItem: { url: string | undefined; icon: string; name: React.ReactNode; items: { icon: string; url: string | undefined; name: any; }[]; }, index: number) => (

                                                    <div key={`megaTitle${index}`} className="flex flex-col m-2 z-10">
                                                        <a href={subItem.url}
                                                           className={`mega-title flex items-center mt-0 text-blue-200 border border-orange-200 border-t-0 border-l-0 border-r-0 ${styles.megaTitle}`}>
                                                            <div className={subItem.icon ? "" : "hidden"}
                                                                 dangerouslySetInnerHTML={{__html: subItem.icon}}></div>
                                                            <span>{subItem.name}</span>
                                                        </a>
                                                        <ul className={styles.stander}>
                                                            {subItem.items && subItem.items.map((link: { icon: string; url: string | undefined; name: any; }, index: number) => {
                                                                    return subItem.items.length > 0 ?
                                                                        <li key={`subItem2${index}`}
                                                                            className={"flex items-center"}>
                                                                            <div className={link.icon ? "" : "hidden"}
                                                                                 dangerouslySetInnerHTML={{__html: link.icon}}></div>
                                                                            <a href={link.url}
                                                                               dangerouslySetInnerHTML={{__html: link.name}}></a>
                                                                        </li>
                                                                        :
                                                                        ""
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div
                                            className={"imageMegaMenu absolute bottom-0 left-0  " + (item.image && item.image != "" ? "hidden md:block" : "hidden")}>
                                            <img src={item.image} alt={"megaMenuImage"} className={styles.imageMega}/>
                                        </div>

                                    </div>
                                    :
                                    ""
                                }

                            </li>
                            :
                            ""
                    })}

                    {props.menuItems.left_items && props.menuItems.left_items.map((item: { is_mega_menu: boolean; is_sub_menu: boolean; id: string | undefined; url: string | undefined; icon: string; name: any; sub_items: any[]; message: any; }, index: number) => {

                        return props.menuItems.left_items.length > 0 ?
                            <li key={`leftMenu${index}`}
                                className={"h-full inline-block float-left " + (item.is_mega_menu ? " mega-drop-down h-12" : item.is_sub_menu ? `drop-down ${styles.dropDown} relative h-12` : "")}

                                onMouseLeave={item.is_mega_menu || item.is_sub_menu ? () => mouseLeave(item.id) : () => {
                                }}
                                onMouseEnter={item.is_mega_menu || item.is_sub_menu ? () => mouseOver(item.id) : () => {
                                }}
                            >

                                <a href={item.url}
                                   onClick={item.is_mega_menu || item.is_sub_menu ? () => toggleMegaMenu(item.id) : () => {
                                   }} className={`h-full menuLink flex items-center text-white ${styles.menuLink}`}>

                                    <div className={item.icon ? "" : "hidden"}
                                         dangerouslySetInnerHTML={{__html: item.icon}}></div>
                                    <div className={"headerLeft"} dangerouslySetInnerHTML={{__html: item.name}}></div>
                                </a>

                                {item.is_mega_menu == false && item.is_sub_menu == true && item.sub_items.length > 0 ?

                                    <ul className={`${styles.dropDownUl} drop-down-ul relative bg-white border border-gray-100 border-t-0 rounded-br-md rounded-bl-md hidden `}>
                                        {item.sub_items.map((subItem, index) => (
                                            <li key={`drop-down-ul${index}`}>
                                                <a href={subItem.url}
                                                               dangerouslySetInnerHTML={{__html: subItem.name}}></a>
                                            </li>
                                        ))}
                                    </ul>
                                    :
                                    ""
                                }

                                {item.is_mega_menu ?
                                    <div
                                        className={`${styles.megaMenu} mega-menu bg-white overflow-hidden pt-0 left-0 right-0 hidden min-h-full rounded-bl-md rounded-br-md`}
                                        id={item.id}>
                                        <div
                                            className={`mega-menu-wrap bg-white border border-gray-100 border-t-0 rounded-bl-md rounded-br-md ${styles.megaMenuWrap}`}>
                                            <div className={"mb-2"} dangerouslySetInnerHTML={{__html: item.message}}>

                                            </div>
                                            <div className="flex justify-around items-center flex-wrap">
                                                {item.sub_items.map((subItem, index) => (

                                                    <div key={`subItem${index}`}
                                                         className="flex flex-col m-1 items-center">
                                                        <a href={subItem.url}
                                                           className={`mega-title flex items-center mt-0 text-blue-200 border border-orange-200 border-t-0 border-l-0 border-r-0 ${styles.megaTitle}`}>

                                                            <div className={subItem.icon ? "" : "hidden"}
                                                                 dangerouslySetInnerHTML={{__html: subItem.icon}}></div>

                                                            <span
                                                                dangerouslySetInnerHTML={{__html: subItem.name}}></span>
                                                        </a>
                                                        <ul className={styles.stander}>
                                                            {subItem.items.map((link: { icon: string; url: string | undefined; name: any; }, index: number) => {
                                                                    return subItem.items.length > 0 ?
                                                                        <li key={`child${index}`}
                                                                            className={"flex items-center"}>

                                                                            <div className={link.icon ? "" : "hidden"}
                                                                                 dangerouslySetInnerHTML={{__html: link.icon}}></div>
                                                                            <a href={link.url}
                                                                               dangerouslySetInnerHTML={{__html: link.name}}></a>

                                                                        </li>
                                                                        :
                                                                        ""
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ""
                                }
                            </li>
                            :
                            ""
                    })}


                    <div className={`px-2 h-12 items-center w-full  mobileMenu ${styles.mobileMenu} ` +
                    (router.pathname == '/' || router.pathname.indexOf("/[category]") > -1 ? "justify-between" : "justify-end")}>

                        <div
                            className={"" + (router.pathname == '/' || router.pathname.indexOf("/[category]") > -1 ? "" : "hidden")}>
                            <button className={"p-2 text-white border border-white rounded ml-1 "}
                                    onClick={toggleCategoryFilter}>
                                <i className="fas fa-filter">&nbsp;</i>
                                جستجوی پیشرفته
                            </button>
                            <button className={"p-2 text-white border border-white rounded"}
                                    onClick={toggleViewFilter}>
                                <i className="fas fa-align-center">&nbsp;</i>
                                <span>مرتب سازی</span>
                            </button>
                        </div>

                        <a className="py-2 px-3 pull-left bg-gray-100 rounded p-2 flex items-center justify-center"
                           onClick={toggleMenu}>
                            <i className="fas fa-bars"></i>
                        </a>

                    </div>

                    <div id={"viewFilterMenu"} className={`bg-white w-full hidden p-3 ${styles.viewFilterMenu}`}>

                        <SortingFilter/>

                    </div>

                    <div id={"categoryFilterMenu"}
                         className={`bg-white w-full hidden p-3 ${styles.categoryFilterMenu}`}>

                        <FilterComponent/>

                    </div>

                </ul>
            </div>
            {/******end menu items***********/}
        </div>

    );
};

export default menuItem;