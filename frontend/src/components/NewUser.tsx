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
import { toast } from "sonner";

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
		<div className="flex min-h-screen items-center justify-center w-full">
			<div className="w-full max-w-md space-y-6 rounded-lg bg-gray-50 border border-neutral-200 p-8 shadow-lg">
				<h1 className="text-2xl font-bold">Let's get you started!</h1>

				<div className="space-y-2">
					<Label htmlFor="webhook1">Discord webhook 1</Label>
					<Input
						id="webhook1"
						type="text"
						value={webhook1}
						className="shadow"
						onChange={e => setWebhook1(e.target.value)}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="webhook2">Discord webhook 2</Label>
					<Input
						id="webhook2"
						type="text"
						value={webhook2}
						className="shadow"
						onChange={e => setWebhook2(e.target.value)}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="youtubeLink">YouTube channel link</Label>
					<Input
						id="youtubeLink"
						type="text"
						value={youtubeLink}
						className="shadow"
						onChange={e => setYoutubeLink(e.target.value)}
					/>
				</div>

				<Button onClick={handleSubmit} className="w-full">
					Submit
				</Button>
			</div>
		</div>
	);
};

export default NewUser;
