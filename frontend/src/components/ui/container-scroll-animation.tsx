"use client";
import {
	type MotionValue,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";
import React, { useRef } from "react";

export const ContainerScroll = ({
	titleComponent,
	children,
}: {
	titleComponent: string | React.ReactNode;
	children: React.ReactNode;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
	});
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	const scaleDimensions = () => {
		return isMobile ? [0.7, 0.9] : [1.05, 1];
	};

	const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
	const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
	const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

	return (
		<motion.div
			initial={{
				opacity: 0,
				y: 20,
			}}
			animate={{
				opacity: 1,
				y: [20, -5, 0],
			}}
			transition={{
				duration: 0.5,
				delay: 0.1,
				ease: [0.4, 0.0, 0.2, 1],
			}}
			className="h-[60rem] md:h-[70rem] flex items-center justify-center relative p-2"
			ref={containerRef}
		>
			<div
				className="py-10 md:py-40 w-full relative"
				style={{
					perspective: "1000px",
				}}
			>
				<Header translate={translate} titleComponent={titleComponent} />
				<Card rotate={rotate} translate={translate} scale={scale}>
					{children}
				</Card>
			</div>
		</motion.div>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Header = ({ translate, titleComponent }: any) => {
	return (
		<motion.div
			style={{
				translateY: translate,
			}}
			className="div max-w-5xl mx-auto text-center"
		>
			{titleComponent}
		</motion.div>
	);
};

export const Card = ({
	rotate,
	scale,
	children,
}: {
	rotate: MotionValue<number>;
	scale: MotionValue<number>;
	translate: MotionValue<number>;
	children: React.ReactNode;
}) => {
	return (
		<motion.div
			style={{
				rotateX: rotate,
				scale,
				boxShadow:
					"0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
			}}
			className="max-w-5xl -mt-12 mx-auto aspect-video w-full border-4 border-[#6C6C6C] p-2 md:p-3 bg-[#222222] rounded-[30px] shadow-2xl"
		>
			<div className="w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl flex">
				{children}
			</div>
		</motion.div>
	);
};