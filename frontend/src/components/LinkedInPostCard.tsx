import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiLinkedin } from "@icons-pack/react-simple-icons";
import { Copy, RotateCcw } from "lucide-react";
import Link from "next/link";

interface LinkedInPostCardProps {
	post: string;
	isLoading: boolean;
	originalPost: string;
	onPostChange: (value: string) => void;
	onReset: () => void;
	onCopy: (text: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

const createLinkedInIntent = (text: string) => {
	return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
};

export function LinkedInPostCard({
	post,
	isLoading,
	originalPost,
	onPostChange,
	onReset,
	onCopy,
}: LinkedInPostCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg p-6 border border-border flex flex-col">
			<div className="flex items-center gap-2 mb-4">
				<SiLinkedin size={20} className="text-[#0A66C2]" />
				<h2 className="text-xl font-medium">Generated LinkedIn Post</h2>
			</div>
			{isLoading ? (
				<div className="flex flex-col items-center justify-center py-8">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
					<p className="text-gray-600 text-center">
						Crafting a professional LinkedIn post...
					</p>
				</div>
			) : (
				<div className="flex flex-col flex-1">
					<textarea
						value={post}
						onChange={e => onPostChange(e.target.value)}
						className="bg-gray-50 p-4 border-border border-2 border-dashed rounded-md flex-1 min-h-[150px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<div className="mt-6 flex items-center gap-3">
						<Link
							href={createLinkedInIntent(post)}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								buttonVariants({ variant: "outline" }),
								"flex items-center gap-2 justify-center grow",
							)}
						>
							<SiLinkedin />
							Post on LinkedIn
						</Link>
						<Button
							variant="outline"
							size="icon"
							className="flex items-center gap-2 justify-center"
							onClick={e => onCopy(post, e)}
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
