import React from 'react';
import logo from '../../public/logo/1.webp';
import Image from 'next/image';

const MenuBar: React.FC = () => {
    return (
        <div>
            <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                        <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                            <div className="flex flex-shrink-0 items-center">
                                <a href="/">
                                    <Image src={logo} alt="Minerva, organize your books." width={100} height={50} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default MenuBar;