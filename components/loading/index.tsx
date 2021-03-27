import React from 'react';
import { useSelector } from 'react-redux';

const Index = () => {
    const loading = useSelector((state: any) => state.auth.loading);

    return (
        <div className={"fixed w-auto h-auto bg-black bg-opacity-25 top-0 bottom-0 left-0 right-0 z-30 flex-col justify-center items-center " + (loading ? "flex" : "hidden")} >
            <div className={"p-3 bg-white rounded border border-gray-300"} >
                <img src={"/images/logo.png"} alt="فالنیک" className={"mb-4"} />
                {/* ****loading**** */}
                <div className="animate-pulse mb-2 ">
                    <div className="h-2 bg-blue-300 rounded w-full"></div>
                </div>
                {/* ********* */}
            </div>
        </div>
    );
};

export default Index;