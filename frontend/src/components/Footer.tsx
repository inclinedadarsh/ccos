import Link from "next/link";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";
import { ViewContainer } from "./ui/view-container";

const Footer = () => {
	return (
		<footer className="mt-12">
			<ViewContainer className="border-t border-border py-6 flex items-center justify-between">
				<TooltipProvider delayDuration={0}>
					<p className="text-black/70">
						Made with <span className="text-black">❤️</span> by{" "}
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									className="font-semibold underline hover:no-underline text-black"
									href="https://x.com/sushantstwt"
									target="_blank"
									rel="noreferrer noopener"
								>
									the
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Sushant</p>
							</TooltipContent>
						</Tooltip>{" "}
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									className="font-semibold underline hover:no-underline text-black"
									href="https://x.com/adityab29_"
									target="_blank"
									rel="noreferrer noopener"
								>
									three
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Aditya</p>
							</TooltipContent>
						</Tooltip>{" "}
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									className="font-semibold underline hover:no-underline text-black"
									href="https://x.com/inclinedadarsh"
									target="_blank"
									rel="noreferrer noopener"
								>
									musketeers
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Adarsh</p>
							</TooltipContent>
						</Tooltip>
						.
					</p>
				</TooltipProvider>
				<Link
					className="font-semibold underline hover:no-underline text-black"
					href="https://github.com/inclinedadarsh/ccos"
					target="_blank"
					rel="noreferrer noopener"
				>
					GitHub
				</Link>
			</ViewContainer>
		</footer>
	);
};

export default Footer;
