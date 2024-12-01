import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Home, Sparkles, User } from "lucide-react";
const inter = Inter({
	subsets: ["latin"],
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
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<html lang="en">
				<body
					className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
				>
					{children}
					<Toaster richColors theme="light" />
				</body>
			</html>
		</ClerkProvider>
	);
}
