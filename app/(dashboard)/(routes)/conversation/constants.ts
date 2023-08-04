'use client';

import * as z from 'zod';

const formSchema = z.object({
    prompt: z.string().min(1, {
        message: 'Propmt is required',
    }),
});
