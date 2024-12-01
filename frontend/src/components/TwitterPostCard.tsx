import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiX } from "@icons-pack/react-simple-icons";
import { Copy, RotateCcw } from "lucide-react";
import Link from "next/link";

interface TwitterPostCardProps {
	tweet: string;
	isLoading: boolean;
	originalTweet: string;
	onTweetChange: (value: string) => void;
	onReset: () => void;
	onCopy: (text: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

const createTwitterIntent = (text: string) => {
	return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
};

export function TwitterPostCard({
	tweet,
	isLoading,
	originalTweet,
	onTweetChange,
	onReset,
	onCopy,
}: TwitterPostCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg p-6 border border-border flex flex-col">
			<div className="flex items-center gap-2 mb-4">
				<SiX size={20} className="" />
				<h2 className="text-xl font-medium">Generated Tweet</h2>
			</div>
			{isLoading ? (
				<div className="flex flex-col items-center justify-center py-8">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
					<p className="text-gray-600 text-center">
						Hang on tight, we're generating a tweet for you...
					</p>
				</div>
			) : (
				<div className="flex flex-col flex-1">
					<textarea
						value={tweet}
						onChange={e => onTweetChange(e.target.value)}
						className="bg-gray-50 p-4 border-border border-2 border-dashed rounded-md flex-1 min-h-[150px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<div className="mt-6 flex items-center gap-3">
						<Link
							href={createTwitterIntent(tweet)}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								buttonVariants({ variant: "outline" }),
								"flex items-center gap-2 justify-center grow",
							)}
						>
							<SiX />
							Post on X
						</Link>
						<Button
							variant="outline"
							size="icon"
							className="flex items-center gap-2 justify-center"
							onClick={e => onCopy(tweet, e)}
						>
							<Copy className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="flex items-center gap-2 justify-center"
							onClick={onReset}
						>
							<RotateCcw className="w-4 h-4" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
