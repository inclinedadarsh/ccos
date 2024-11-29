"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type React from "react";

export const HeroHighlight = ({
	children,
	className,
	containerClassName,
}: {
	children: React.ReactNode;
	className?: string;
	containerClassName?: string;
}) => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({
		currentTarget,
		clientX,
		clientY,
	}: React.MouseEvent<HTMLDivElement>) {
		if (!currentTarget) return;
		const { left, top } = currentTarget.getBoundingClientRect();

		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	return (
		<div
			className={cn(
				"relative h-[40rem] flex items-center bg-white dark:bg-black justify-center w-full group",
				containerClassName,
			)}
			onMouseMove={handleMouseMove}
		>
			<div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800  pointer-events-none" />
			<motion.div
				className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500   absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
				style={{
					WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
					maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
				}}
			/>

			<div className={cn("relative z-20", className)}>{children}</div>
		</div>
	);
};

export const Highlight = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<motion.span
			initial={{
				backgroundSize: "0% 100%",
			}}
			animate={{
				backgroundSize: "100% 100%",
			}}
			transition={{
				duration: 1,
				ease: "easeInOut",
				delay: 0.5,
			}}
			style={{
				backgroundRepeat: "no-repeat",
				backgroundPosition: "left center",
				display: "inline",
			}}
			className={cn(
				"relative inline-block px-2 rounded-lg bg-gradient-to-r from-blue-200 to-blue-400 dark:from-blue-500 dark:to-blue-700",
				className,
			)}
		>
			{children}
		</motion.span>
	);
};
