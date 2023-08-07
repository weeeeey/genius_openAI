'use client';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import {
    Code,
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    Settings,
} from 'lucide-react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const montserrat = Montserrat({
    weight: '600',
    subsets: ['latin'],
});

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500',
    },
    {
        label: 'Conversation',
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500',
    },
    {
        label: 'Image Conversation',
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-700',
    },

    {
        label: 'Code Generation',
        icon: Code,
        href: '/code',
        color: 'text-green-700',
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
];

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className="space-y-4 flex flex-col py-4 h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link
                    href="/dashboard"
                    className="flex items-center pl-3 mb-14"
                >
                    <div className="relative w-8 h-8 mr-4">
                        <Image src="/logo.png" fill alt="logo" />
                    </div>
                    <h1
                        className={cn(
                            'font-bold text-2xl',
                            montserrat.className
                        )}
                    >
                        Genius
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                pathname === route.href
                                    ? 'text-white bg-white/10'
                                    : 'text-zinc-400'
                            )}
                        >
                            <div className="flex flex-row items-center flex-1">
                                <route.icon
                                    className={cn('h-5 w-5 mr-3', route.color)}
                                />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
