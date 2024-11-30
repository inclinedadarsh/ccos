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

const navItems = [
	{
		name: "Home",
		link: "/",
		icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "Features",
		link: "/about",
		icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "Try it out",
		link: "/contact",
		icon: <Sparkles className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
				>
					<FloatingNav navItems={navItems} />
					{children}
					<Toaster richColors theme="light" />
				</body>
			</html>
		</ClerkProvider>
	);
}
