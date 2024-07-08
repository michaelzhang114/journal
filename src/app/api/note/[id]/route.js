import { connectToDB } from "@utils/database";
import Note from "@models/note";

//GET
export const GET = async (request, { params }) => {
	try {
		await connectToDB();
		const note = await Note.findById(params.id).populate("creator");
		if (!note) return new Response("Note not found", { status: 404 });
		return new Response(JSON.stringify(note), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all notes", { status: 500 });
	}
};

//PATCH
export const PATCH = async (request, { params }) => {
	const { contents } = await request.json();
	try {
		await connectToDB();
		const existingNote = await Note.findById(params.id);
		if (!contents) return new Response("Note not found", { status: 404 });

		existingNote.contents = contents;

		await existingNote.save();
		return new Response(JSON.stringify(existingNote), { status: 200 });
	} catch (error) {
		return new Response("failed to update note", { status: 500 });
	}
};

//DELETE
export const DELETE = async (request, { params }) => {
	try {
		await connectToDB();
		await Note.findByIdAndDelete(params.id);
		return new Response(JSON.stringify("Note deleted successfully"), {
			status: 200,
		});
	} catch (error) {
		return new Response("failed to delete project", { status: 500 });
	}
};
