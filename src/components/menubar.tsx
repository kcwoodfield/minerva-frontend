"use client"

import React from 'react';
import logo from '/public/logo/logo.png';
import Image from 'next/image';
import { TextField } from '@mui/material';
import AddBook from "@/components/addbook";

const MenuBar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="mb-8 bg-light shadow-sm lg:static lg:overflow-y-visible p-2">
            <div className="mx-auto max-w-7xl">
                <div className="relative flex justify-between lg:gap-4 xl:grid xl:grid-cols-8">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <a href="/">
                                <Image
                                    src={logo}
                                    className="rounded-full"
                                    alt="Minerva, organize your books."
                                    title="Minerva, organize your books."
                                    width={75} />
                            </a>
                            <TextField
                                placeholder="Search for a book..."
                                variant="outlined"
                                size="small"
                                sx={{ ml: 2 }}
                            />
                            <AddBook />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MenuBar;