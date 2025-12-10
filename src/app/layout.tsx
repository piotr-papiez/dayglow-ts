// Types
import type { Metadata } from "next";
import type { ReactNode } from "react";

// Fonts
import { Figtree } from "next/font/google";

// Styles
import "./globals.css";

const figtree = Figtree({
    variable: "--figtree",
    subsets: ["latin-ext"]
});

export const metadata: Metadata = {
    title: "Dayglow",
    description: "Empower your daily tasks!"
};

type RootLayoutPropsType = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutPropsType) {
    return (
        <html lang="pl">
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0,0" />
            </head>
            <body className={figtree.variable}>
                {children}
            </body>
        </html>
    );
}