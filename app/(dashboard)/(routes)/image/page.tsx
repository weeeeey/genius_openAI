'use client';

import { ImageIcon } from 'lucide-react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import Heading from '@/components/heading';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import UserAvarar from '@/components/user-avarar';
import BotAvatar from '@/components/bot-avatar';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CreateImageRequest } from 'openai';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ImageResponse } from 'next/server';

const ImagePage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
        },
    });
    const [imageUrl, setImageUrl] = useState('');
    const isLoading = form.formState.isSubmitting;
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const newPrompt: CreateImageRequest = {
                prompt: values.prompt,
            };
            const response = await axios.post('/api/image', {
                prompt: newPrompt.prompt,
            });
            setImageUrl(response.data);
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
                title="Image"
                description="Write a text you want to make a image"
                icon={ImageIcon}
                bgColor="bg-pink-700/10"
                iconColor="text-pink-700"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
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
                <div className="mt-4 space-y-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flx items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {imageUrl.length === 0 && !isLoading && (
                        <Empty label="No conversation started" />
                    )}
                    {imageUrl && (
                        <Image
                            alt="Generated Image"
                            width={256}
                            height={256}
                            src={imageUrl}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImagePage;
