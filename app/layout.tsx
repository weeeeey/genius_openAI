import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthContext from './context/AuthContext';
import SideBar from './components/SideBar';
import Body from './components/Body';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Genius AI',
    description: 'created by openAI ',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthContext>
                    <SideBar />
                    <Body />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}
