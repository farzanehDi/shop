import React, {useState} from 'react';
import Scrollspy from 'react-scrollspy';
import Comments from '../comments';

const Index = (props: { data: { description: any; specifications: { name: string; items: { key: string; value: string; }[]; }[];
id: string | number; image_small: string; name_fa: string; }; }) => {

    const [activeTab, setActiveTab] = useState('description');

    const addActiveClass = (sectionId: string) => {

        const clicked = sectionId;
        if (activeTab === clicked) {
        } else {
            setActiveTab(clicked);
        }

        let section = document.getElementById(sectionId);
        section && section.scrollIntoView({block: 'start', behavior: 'smooth'});
    };

    return (
        <section className={'bg-white rounded px-5 pb-5 border border-gray-100 shadow-inner shadow-sm mt-5'}>

            <Scrollspy items={['description', 'technicalSpecifications', 'comments']}
                       className={'flex items-stretch border-b border-gray-200 mb-3 pt-5 sticky top-0 bg-white'}
                       currentClassName="text-blue-300 border-b-2 border-blue-200"
                       offset={-10}
            >

                <li onClick={() => addActiveClass('description')}
                    className={`hover:text-blue-200 cursor-pointer flex items-center justify-center sm:text-lg px-5 pb-5 `}>
                    <div className={'hidden sm:block'}>
                        <i className="fas fa-glasses ml-2"></i>
                    </div>
                    <span className={'text-center'}>توضیحات محصول</span>
                </li>
                <li onClick={() => addActiveClass('technicalSpecifications')}
                    className={`hover:text-blue-200 cursor-pointer flex items-center justify-center sm:text-lg px-5 pb-5`}>
                    <div className={'hidden sm:block'}>
                        <i className="fas fa-tasks ml-2"></i>
                    </div>
                    <span className={'text-center'}>مشخصات فنی</span>
                </li>
                <li onClick={() => addActiveClass('comments')}
                    className={`hover:text-blue-200 cursor-pointer flex items-center justify-center sm:text-lg px-5 pb-5`}>
                    <div className={'hidden sm:block'}>
                        <i className="far fa-comment ml-2"></i>
                    </div>
                    <span className={'text-center'}>نظرات کاربران</span>
                </li>

            </Scrollspy>

            <section id="description" className={'pt-8 text-justify'}
                     dangerouslySetInnerHTML={{__html: props.data.description}}>

            </section>
            <section id="technicalSpecifications" className={'pt-12'}>
                {
                    props.data.specifications.map((item: { name: string; items: { key: string; value: string; }[]; }, index: number) => (
                        <div key={`specifications${index}`} className={'w-full'}>
                            <h3 className="flex items-center text-blue-200 mt-2 text-xl font-bold">
                                <i className="fas fa-caret-left ml-2"></i>
                                {item.name}
                            </h3>
                            {item.items.map((data: { key: string; value: string; }, indexCh: number) => (
                                <div key={`specificationsChild${indexCh}`}
                                     className="overflow-x-auto grid grid-cols-12 gap-1 sm:gap-2 flex justify-start items-stretch mt-4 flex-wrap">
                                    <div
                                        className="col-span-12 sm:col-span-4 text-justify bg-gray-100 p-3">{data.key}</div>
                                    <div
                                        className="col-span-12 sm:col-span-8 text-justify bg-gray-100 p-3">{data.value}</div>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </section>
            <section id="comments" className={'pt-12'}>
                <Comments productId={props.data.id} image={props.data.image_small}
                          name={props.data.name_fa}/>
            </section>


        </section>
    );
};

export default Index;