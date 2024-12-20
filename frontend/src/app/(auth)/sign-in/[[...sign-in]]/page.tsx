import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex items-center justify-center h-screen p-4">
			<SignIn forceRedirectUrl="/dashboard" />
		</div>
	);
}
