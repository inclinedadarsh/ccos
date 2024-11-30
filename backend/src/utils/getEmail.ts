import { ClerkClient } from "@clerk/backend";
import * as jwt from "jsonwebtoken";

type DecodedType = {
    sid: string;
};

function extractSidFromJwt(token: string) {
    try {
        const decoded = jwt.decode(token);
        return (decoded as DecodedType)?.sid || null;
    } catch (error) {
        console.error("Failed to decode JWT:", (error as Error).message);
        return null;
    }
}

async function getEmail(clerkClient: ClerkClient, jwt_token: string) {
    try {
        const sid = extractSidFromJwt(jwt_token);
        if (sid) {
            const session = await clerkClient.sessions.getSession(sid);
            const user = await clerkClient.users.getUser(session.userId);
            return user?.emailAddresses[0]?.emailAddress || null;
        } else {
            throw new Error("Failed to get sid");
        }
    } catch (error) {
        console.log((error as Error).message);
        return null;
    }
}

export default getEmail;
