import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
			<body className={`${inter.variable} font-sans antialiased`}>
				{children}
				<Toaster richColors theme="light" />
			</body>
		</html>
	);
}
