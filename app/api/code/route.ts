import { checkAPILimit, increaseAPILimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content:
        'You are a code generator. You must answer only in markdown code snippets. Use code comments for explations',
};

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        if (!configuration.apiKey) {
            new NextResponse('OpenAI API KEY not configuration', {
                status: 500,
            });
        }
        if (!messages) {
            new NextResponse('Messages are required', { status: 400 });
        }
        const check = await checkAPILimit();
        if (!check) {
            return new NextResponse('Exceed api call count', { status: 403 });
        }

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [instructionMessage, ...messages],
        });
        await increaseAPILimit();

        return NextResponse.json(response.data.choices[0].message);
    } catch (error) {
        console.log('[CODE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
