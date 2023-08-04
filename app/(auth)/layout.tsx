import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-row items-center justify-center h-full">
            {children}
        </div>
    );
};

export default layout;
