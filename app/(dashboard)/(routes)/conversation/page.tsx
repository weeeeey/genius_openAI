'use client';

import { MessageSquare } from 'lucide-react';
import Heading from '@/components/heading';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { useForm } from 'react-hook-form';

import * as z from 'zod';
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { ChatCompletionRequestMessage } from 'openai';
const ConversationPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
        },
    });
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>(
        []
    );
    const isLoading = form.formState.isSubmitting;
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: 'user',
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];
            const response = await axios.post('/api/conversation', {
                messages: newMessages,
            });
            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();
        } catch (error) {
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Conversation"
                description="feel free to ask me anything you are curious about! "
                icon={MessageSquare}
                bgColor="bg-violet-700/10"
                iconColor="text-violet-700"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="propmt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                disabled={isLoading}
                                                placeholder="How do i calculate the radius of a circle"
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="mt-4 space-y-4">Messages Content</div>
            </div>
        </div>
    );
};

export default ConversationPage;
