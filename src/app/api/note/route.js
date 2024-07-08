import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth/next";
import { config } from "../auth/[...nextauth]/authHelper";
import Note from "@models/note";

export const GET = async (req, res) => {
	// const session = await getSession({ req });

	try {
		await connectToDB();
		console.log("connected");

		const session = await getServerSession(config);
		if (!session) {
			return new Response(
				JSON.stringify("Can't get session / unauthorized"),
				{
					status: 401,
				}
			);
		}
		const userId = session.user.id; // Assuming user ID is stored in session.user.id
		const projsThisUser = await Note.find({ creator: userId }).populate(
			"creator"
		);
		// console.log(projsThisUser);
		// const newVerse = new Verse({ creator: userId, title, contents });
		// await newVerse.save();
		return new Response(JSON.stringify(projsThisUser), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all verses", { status: 500 });
	}
};
