"use client";

import { useState } from "react";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { SiLinkedin, SiX } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import {
	BookHeart,
	BookMarked,
	LayoutDashboard,
	Megaphone,
} from "lucide-react";
import Link from "next/link";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [open, setOpen] = useState(false);
	const { user } = useUser();
	const links = [
		{
			label: "Dashboard",
			href: "/dashboard",
			icon: (
				<LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: "Tweets (X)",
			href: "/dashboard/tweets",
			icon: (
				<SiX className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: "LinkedIn",
			href: "/dashboard/linkedin",
			icon: (
				<SiLinkedin className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: "Announcements",
			href: "/dashboard/announcements",
			icon: (
				<Megaphone className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
	];
	return (
		<div
			className={cn(
				"flex flex-col md:flex-row bg-white dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
				"h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
			)}
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className="justify-between gap-10 bg-gray-50 border-r border-border">
					<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
						{open ? <Logo /> : <LogoIcon />}
						<div className="mt-8 flex flex-col gap-2">
							{links.map((link, idx) => (
								<SidebarLink
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={idx}
									link={link}
									className={cn(
										"hover:bg-gray-100 transition-all duration-300 rounded-md border border-transparent hover:border-border",
										open && "px-3 py-3",
									)}
								/>
							))}
						</div>
					</div>
					<SignedIn>
						<div className="flex gap-2 items-center">
							<UserButton />{" "}
							<div
								className={cn(
									"text-sm text-neutral-500 opacity-0 transition-opacity max-w-full truncate",
									open && "opacity-100",
								)}
							>
								{user?.emailAddresses[0].emailAddress}
							</div>
						</div>
					</SignedIn>
				</SidebarBody>
			</Sidebar>
			<div className="w-full min-h-screen overflow-y-scroll">
				{children}
			</div>
		</div>
	);
}

export const Logo = () => {
	return (
		<Link
			href="#"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
		>
			<div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="font-medium text-black dark:text-white whitespace-pre"
			>
				CCoS
			</motion.span>
		</Link>
	);
};
export const LogoIcon = () => {
	return (
		<Link
			href="#"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
		>
			<div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
		</Link>
	);
};
