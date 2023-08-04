import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface HeadingProps {
    title: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
    description: string;
}

const Heading = ({
    title,
    icon: Icon,
    description,
    bgColor,
    iconColor,
}: HeadingProps) => {
    return (
        <>
            <div className="flex items-center gap-x-3 mb-8 px-4 lg:px-8">
                <div className={cn('p-2 w-fit rounded-md', bgColor)}>
                    <Icon className={cn('w-10 h-10', iconColor)} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-sm font-light to-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Heading;
