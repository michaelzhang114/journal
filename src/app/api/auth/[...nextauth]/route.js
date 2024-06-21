import NextAuth from "next-auth";
import { config } from "./authHelper";

// console.log({
// 	clientId: process.env.GOOGLE_ID,
// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });

const handler = NextAuth(config);

export { handler as GET, handler as POST };

// const testUser = {
// 	email: "test@example.com",
// 	username: "testuser",
// 	image: "http://example.com/image.png",
// };

// await User.create(testUser);
// console.log("Test user created");
