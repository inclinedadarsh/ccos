"use client";
import {
	discordPersonalHookAtom,
	discordServerHookAtom,
	errorAtom,
	loadingAtom,
	newUserAtom,
	youtubeChannelAtom,
} from "@/app/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClerk } from "@clerk/nextjs";
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
	const { session } = useClerk();

	const [personalHook, setPersonalHook] = useAtom(discordPersonalHookAtom);
	const [serverHook, setServerHook] = useAtom(discordServerHookAtom);
	const [youtubeLink, setYoutubeLink] = useAtom(youtubeChannelAtom);
	const [newUser, setNewUser] = useAtom(newUserAtom);
	const [loading, setLoading] = useAtom(loadingAtom);
	const [error, setError] = useAtom(errorAtom);

	const handleSubmit = async () => {
		if (!personalHook || !serverHook || !youtubeLink) {
			toast.error("Please fill in all fields");
			return;
		}

		setLoading(true);
		console.log(youtubeLink);

		try {
			if (!session) {
				toast.error("No session found");
				return;
			}

			const token = await session.getToken();
			const response = await fetch(
				"http://20.244.84.131:3000/api/new-user",
				{
					method: "POST",
					headers: {
						Authorization: `${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						personal_hook: personalHook,
						server_hook: serverHook,
						channel_link: youtubeLink,
					}),
				},
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Something went wrong");
			}

			toast.success("Settings saved successfully!");
			setNewUser(data.new_user);
		} catch (error) {
			console.error("Error saving user settings:", error);
			toast.error("Failed to save settings. Please try again.");
			setError(true);
		} finally {
			setLoading(false);
		}
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
								<Label htmlFor="personal-webhook">
									Discord webhook for personal notifications
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
								id="personal-webhook"
								type="text"
								value={personalHook}
								className="shadow"
								onChange={e => setPersonalHook(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="server-webhook">
									Discord webhook for server notifications
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
								id="server-webhook"
								type="text"
								value={serverHook}
								className="shadow"
								onChange={e => setServerHook(e.target.value)}
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
