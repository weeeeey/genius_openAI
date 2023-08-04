import { UserButton } from '@clerk/nextjs';
import React from 'react';

const DashboardPage = () => {
    return (
        <div>
            <p>DashboardPage</p>
            <UserButton afterSignOutUrl="/" />
        </div>
    );
};

export default DashboardPage;
