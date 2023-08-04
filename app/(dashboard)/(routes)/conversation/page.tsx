'use client';
import * as z from 'zod';

import React from 'react';

import { MessageSquare } from 'lucide-react';
import Heading from '@/components/heading';
import { useForm } from 'react-hook-form';

const ConversationPage = () => {
    const form = useForm({
        defaultValues: {
            propmt: '',
        },
    });
    return (
        <div>
            <Heading
                title="Conversation"
                description="feel free to ask me anything you are curious about! "
                icon={MessageSquare}
                bgColor="bg-violet-700/10"
                iconColor="text-violet-700"
            />
            <div className="px-4 lg:px-8"></div>
        </div>
    );
};

export default ConversationPage;
