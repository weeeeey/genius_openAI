'use client';
import Image from 'next/image';
import React from 'react';

const generation = [];

const SideBar = () => {
    return (
        <div className="fixed bg-sky-400 h-full pr-60">
            <div className="flex flex-row font-bold text-2xl">
                <Image
                    alt="Genius Logo"
                    src="/logo.png"
                    width={40}
                    height={40}
                />
                <h1>Genius</h1>
            </div>
        </div>
    );
};

export default SideBar;
