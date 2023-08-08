import { useModal } from '@/hooks/use-pro-modal';
import React, { useEffect, useState } from 'react';
import { Progress } from './ui/progress';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

interface FreeCounterProps {
    isPro: boolean;
    apiLimitCount: number;
}

const FreeCounter = ({
    apiLimitCount = 0,
    isPro = false,
}: FreeCounterProps) => {
    const Modal = useModal();
    const value = (apiLimitCount / 5) * 100;

    return (
        <div className="flex justify-center items-center ">
            <ProgressPrimitive.Root
                className={cn(
                    'relative h-4 w-1/2 overflow-hidden rounded-full bg-secondary'
                )}
            >
                <ProgressPrimitive.Indicator
                    className="h-full w-full flex-1 bg-pink-500 transition-all"
                    style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
                />
            </ProgressPrimitive.Root>
        </div>
    );
};

export default FreeCounter;
