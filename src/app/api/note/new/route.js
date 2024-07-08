import Note from "@models/note";
import { connectToDB } from "@utils/database";
import { isValidObjectId } from "mongoose";

export const POST = async (req, res) => {
	const { userId, contents } = await req.json();
	console.log(userId);
	console.log(contents);

	if (!isValidObjectId(userId)) {
		throw new Error("Invalid userId");
	}

	try {
		await connectToDB();
		console.log({ creator: userId, contents });
		const newNote = new Note({ creator: userId, contents });
		console.log(newNote);
		await newNote.save();
		console.log("saved");
		return new Response(JSON.stringify(newNote), { status: 201 });
	} catch (error) {
		console.error("Error saving note:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
