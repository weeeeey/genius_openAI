import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

// const response = await openai.createImage({
//     prompt: "a white siamese cat",
//     n: 1,
//     size: "1024x1024",
//   });
//   image_url = response.data.data[0].url;

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
    try {
        const { user } = auth();
        const body = await req.json();
        const { prompt } = body;
        // if (!user) {
        //     return new NextResponse('Not Authorized', { status: 401 });
        // }
        if (!prompt) {
            return new NextResponse('It is not accept message', {
                status: 401,
            });
        }
        openai.createChatCompletion;
        const response = await openai.createImage({
            user: user?.id,
            prompt: prompt,
            n: 1,
            size: '256x256',
        });
        if (!response) {
            return new NextResponse('Internal Error', { status: 500 });
        }
        return NextResponse.json(response.data.data[0].url);
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
