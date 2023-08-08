import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Mobilesidebar from './mobile-sidebar';

interface NavbarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const Navbar = ({ apiLimitCount = 0, isPro = false }: NavbarProps) => {
    return (
        <div className="flex items-center p-4">
            <Mobilesidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            <div className="flex flex-row w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
};

export default Navbar;
