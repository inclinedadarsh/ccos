import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RotateCcw } from "lucide-react";
import { BookMarked } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostCardProps {
	post: string;
	isLoading: boolean;
	originalPost: string;
	onPostChange: (value: string) => void;
	onReset: () => void;
	onCopy: (text: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function BlogPostCard({
	post,
	isLoading,
	originalPost,
	onPostChange,
	onReset,
	onCopy,
}: BlogPostCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg p-6 border border-border flex flex-col min-h-[400px]">
			<div className="flex items-center gap-2 mb-4">
				<BookMarked size={20} className="" />
				<h2 className="text-xl font-medium">Generated Blog Post</h2>
			</div>
			{isLoading ? (
				<div className="flex flex-col items-center justify-center py-8">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
					<p className="text-gray-600 text-center">
						Hang on tight, we're generating a blog post for you...
					</p>
				</div>
			) : (
				<div className="flex flex-col flex-1">
					<Tabs defaultValue="text" className="flex-1 flex flex-col">
						<TabsList className="">
							<TabsTrigger value="text" className="grow">
								Text
							</TabsTrigger>
							<TabsTrigger value="preview" className="grow">
								Preview
							</TabsTrigger>
						</TabsList>
						<TabsContent
							value="text"
							className="flex-1 flex flex-col"
						>
							<textarea
								value={post}
								onChange={e => onPostChange(e.target.value)}
								className="bg-gray-50 p-4 border-border border-2 border-dashed rounded-md flex-1 min-h-[150px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</TabsContent>
						<TabsContent value="preview" className="flex-1">
							<div className="bg-gray-50 p-4 border-border border-2 border-dashed rounded-md h-full overflow-auto">
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									className="markdown"
								>
									{post}
								</ReactMarkdown>
							</div>
						</TabsContent>
					</Tabs>
					<div className="mt-6 flex items-center gap-3">
						<Button
							variant="outline"
							className="flex items-center gap-2 justify-center grow"
							onClick={e => onCopy(post, e)}
						>
							<Copy className="w-4 h-4" />
							Copy Content
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