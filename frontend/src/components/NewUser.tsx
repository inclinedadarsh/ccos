"use client";
import {
	discordWebhook1Atom,
	discordWebhook2Atom,
	youtubeChannelAtom,
} from "@/app/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { Info } from "lucide-react";
import { toast } from "sonner";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

const NewUser: React.FC = () => {
	const [webhook1, setWebhook1] = useAtom(discordWebhook1Atom);
	const [webhook2, setWebhook2] = useAtom(discordWebhook2Atom);
	const [youtubeLink, setYoutubeLink] = useAtom(youtubeChannelAtom);

	const handleSubmit = () => {
		if (!webhook1 || !webhook2 || !youtubeLink) {
			toast.error("Please fill in all fields");
			return;
		}
		console.log("Discord webhook 1:", webhook1);
		console.log("Discord webhook 2:", webhook2);
		console.log("YouTube channel link:", youtubeLink);
	};

	return (
		<TooltipProvider>
			<div className="flex min-h-screen items-center justify-center w-full">
				<div className="w-full max-w-md p-8">
					<h1 className="text-2xl font-bold">
						Let's get you started!
					</h1>
					<p className="text-sm text-neutral-500 mt-4">
						Tell us your Discord webhook and YouTube channel link so
						we can send you notifications when your videos are
						uploaded.
					</p>
					<div className="space-y-6 mt-6">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="webhook1">
									Discord webhook 1
								</Label>
								<Tooltip delayDuration={0}>
									<TooltipTrigger asChild>
										<Info
											size={16}
											className="cursor-pointer"
										/>
									</TooltipTrigger>
									<TooltipContent>
										<p className="max-w-xs">
											Your Discord webhook is the URL that
											Discord uses to send messages to
											your server.
										</p>
									</TooltipContent>
								</Tooltip>
							</div>
							<Input
								id="webhook1"
								type="text"
								value={webhook1}
								className="shadow"
								onChange={e => setWebhook1(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="webhook2">
									Discord webhook 2
								</Label>
								<Tooltip delayDuration={0}>
									<TooltipTrigger asChild>
										<Info
											size={16}
											className="cursor-pointer"
										/>
									</TooltipTrigger>
									<TooltipContent>
										<p className="max-w-xs">
											Your Discord webhook is the URL that
											Discord uses to send messages to
											your server.
										</p>
									</TooltipContent>
								</Tooltip>
							</div>
							<Input
								id="webhook2"
								type="text"
								value={webhook2}
								className="shadow"
								onChange={e => setWebhook2(e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="youtubeLink">
									YouTube channel link
								</Label>
								<Tooltip delayDuration={0}>
									<TooltipTrigger asChild>
										<Info
											size={16}
											className="cursor-pointer"
										/>
									</TooltipTrigger>
									<TooltipContent>
										<p className="max-w-xs">
											We'll use this to find your videos.
										</p>
									</TooltipContent>
								</Tooltip>
							</div>
							<Input
								id="youtubeLink"
								type="text"
								value={youtubeLink}
								className="shadow text-sm"
								onChange={e => setYoutubeLink(e.target.value)}
							/>
						</div>
						<Button onClick={handleSubmit} className="w-full">
							Submit
						</Button>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default NewUser;
