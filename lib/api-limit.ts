import { auth } from '@clerk/nextjs';
import prisma from '@/lib/prismadb';
import { MAX_FREE_COUNT } from '@/constants';

export const increaseAPILimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }
    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId: userId,
        },
    });
    if (userApiLimit) {
        await prisma.userApiLimit.update({
            where: {
                userId: userId,
            },
            data: {
                count: userApiLimit.count + 1,
            },
        });
    } else {
        await prisma.userApiLimit.create({
            data: {
                userId: userId,
                count: 1,
            },
        });
    }
};

export const checkAPILimit = async () => {
    const { userId } = auth();
    if (!userId) {
        return false;
    }
    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId,
        },
    });
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) {
        return true;
    } else {
        return false;
    }
};

export const getAPICount = async () => {
    const { userId } = auth();
    if (!userId) {
        return 0;
    }
    const getUser = await prisma.userApiLimit.findUnique({
        where: {
            userId,
        },
    });
    if (!getUser) {
        return 0;
    } else {
        return getUser.count;
    }
};
