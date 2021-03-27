import React from 'react';
import Link from "next/link";
import MenuSearch from "../menuSearch";
import Cart from "../cart";
import MenuItem from '../menuItem';

interface Item {
    items: any [];
    left_items: any[]
}
const Header = (props: { menuItems: Item}) => {
    return (
        <header className={'bg-white'}>
            {/***search and cart section***/}
            <div className={`container mx-auto px-2 lg:px-5 flex items-center justify-between h-auto py-2 flex-wrap`}>
                <Cart/>
                <div className={'order-3 my-2 sm:order-2 sm:my-0 w-full sm:w-auto mx-auto'}>
                    <MenuSearch />
                </div>
                <div className={'order-2 sm:order-3'}>
                    <Link href={'/'}><a><img src={'/images/logo.png'} alt={'فالنیک'} /></a></Link>
                </div>
            </div>
            {/***menu item***/}
            <MenuItem menuItems={props.menuItems}/>

        </header>
    );
};

export default Header;