import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			// if (!session || !session.user || !session.user.email) {
			// 	throw new Error("Session or user email is not defined");
			// }
			const sessionUser = await User.findOne({
				email: session.user.email,
			});
			session.user.id = sessionUser._id.toString();
			return session;
		},
		async signIn({ profile }) {
			try {
				await connectToDB();
				console.log("Database connected for sign in");

				//check if a user already exists
				const userExists = await User.findOne({
					email: profile.email,
				});
				console.log(`user exists: ${userExists}`);

				// if not, create new user
				if (!userExists) {
					await User.create({
						email: profile.email,
						// username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture,
						// credits: 10,
					});
					console.log("user created");
				}
				return true;
			} catch (error) {
				console.log("sign in error", error);
				return false;
			}
		},
	},
};

// Use it in server contexts
export function auth(...args) {
	return getServerSession(...args, config);
}
