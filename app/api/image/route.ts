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
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = '512*512' } = body;
        if (!userId) {
            return new NextResponse('Not Authorized', { status: 401 });
        }
        if (!configuration.apiKey) {
            new NextResponse('OpenAI API KEY not configuration', {
                status: 401,
            });
        }
        if (!prompt) {
            return new NextResponse('It is not accept prompt', {
                status: 400,
            });
        }
        if (!amount) {
            return new NextResponse('It is not accept amount', {
                status: 400,
            });
        }
        if (!resolution) {
            return new NextResponse('It is not accept resolution', {
                status: 400,
            });
        }
        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        return NextResponse.json(response.data.data);
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
