import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const clashGrotesk = localFont({
	src: "./fonts/ClashGrotesk-Variable.woff2",
	variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "Content Creation on Steroids",
	description: "A platform for creating content on steroids",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${clashGrotesk.variable} ${spaceGrotesk.variable} font-sans antialiased`}
			>
				{children}
				<Toaster richColors theme="light" />
			</body>
		</html>
	);
}
