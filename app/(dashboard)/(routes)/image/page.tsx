'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { amountOptions, formSchema, resolutionOptions } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import UserAvarar from '@/components/user-avarar';
import BotAvatar from '@/components/bot-avatar';
import { Download, ImageIcon } from 'lucide-react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';
import { CreateImageRequest } from 'openai';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectTrigger,
} from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';

const ImagePage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
            amount: '1',
            resolution: '512x512',
        },
    });
    const [images, setImages] = useState<string[]>([]);
    const isLoading = form.formState.isSubmitting;
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await axios.post('/api/image', values);

            const urls = response.data.map(
                (image: { url: string }) => image.url
            );
            setImages(urls);
            form.reset({
                prompt: '',
                amount: values.amount,
                resolution: values.resolution,
            });
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
                description="Write a prompt you want to make a image"
                icon={ImageIcon}
                bgColor="bg-pink-700/10"
                iconColor="text-pink-700"
            />
            <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-8 lg:col-span-6">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="A picture of a horse in Swiss alps"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className="col-span-2 lg:col-span-2 font-light text-neutral-500 text-sm">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="p-1 ">
                                                <SelectValue
                                                    defaultValue={field.value}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resolution"
                            render={({ field }) => (
                                <FormItem className="col-span-2 lg:col-span-2 rounded-lg font-light text-neutral-500 text-sm">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="p-1">
                                                <SelectValue
                                                    defaultValue={field.value}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Button
                            className="col-span-12 lg:col-span-2 w-full lg:mt-0 mt-2 "
                            type="submit"
                            disabled={isLoading}
                            size="icon"
                        >
                            Generate
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 space-y-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label="No Images started" />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((url) => (
                            <Card
                                key={url}
                                className="rounded-lg overflow-hidden"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        alt="Generated Image"
                                        fill
                                        src={url}
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button
                                        onClick={() => window.open(url)}
                                        variant="secondary"
                                        className="w-full "
                                    >
                                        <Download className="h-4 w-4 mr-2">
                                            Download
                                        </Download>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePage;
