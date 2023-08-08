import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { checkAPILimit, getAPICount } from '@/lib/api-limit';
import React, { useEffect } from 'react';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const apiLimitCount = await getAPICount();
    const isPro = await checkAPILimit();

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900  ">
                <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            </div>
            <main className=" md:pl-72">
                <Navbar apiLimitCount={apiLimitCount} isPro={isPro} />
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
