import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, RotateCcw } from "lucide-react";
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
	const handleDownload = () => {
		const blob = new Blob([post], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "blog-post.md";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="bg-white rounded-lg shadow-lg p-6 border border-border">
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
				<div>
					<Tabs defaultValue="text">
						<TabsList className="flex">
							<TabsTrigger value="text" className="grow">
								Text
							</TabsTrigger>
							<TabsTrigger value="preview" className="grow">
								Preview
							</TabsTrigger>
						</TabsList>
						<TabsContent value="text">
							<textarea
								value={post}
								onChange={e => onPostChange(e.target.value)}
								className="bg-gray-50 p-4 border-border border-2 border-dashed rounded-md w-full max-h-[500px] min-h-[300px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto"
							/>
						</TabsContent>
						<TabsContent value="preview">
							<div className="bg-gray-50 p-4 border-border border-2 border-dashed rounded-md max-h-[500px] min-h-[300px] overflow-auto">
								<div className="markdown">
									<ReactMarkdown remarkPlugins={[remarkGfm]}>
										{post}
									</ReactMarkdown>
								</div>
							</div>
						</TabsContent>
					</Tabs>
					<div className="mt-6 flex items-center gap-3">
						<Button
							variant="outline"
							className="flex items-center gap-2 justify-center basis-1/2"
							onClick={handleDownload}
						>
							<Download className="w-4 h-4" />
							Download Markdown
						</Button>
						<Button
							variant="outline"
							className="flex items-center gap-2 justify-center basis-1/2"
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
