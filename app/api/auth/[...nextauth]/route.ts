import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },

            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error('invalid Credentials');
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });
                if (!user || !user.hashPassword) {
                    throw new Error('Invalid Credentials');
                }
                const isCorrectPasswrod = await bcrypt.compare(
                    credentials.password,
                    user.hashPassword
                );
                if (!isCorrectPasswrod) {
                    throw new Error('Invalid Credentials');
                }
                return user;
            },
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
