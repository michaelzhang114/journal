import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	contents: {
		type: String,
		// required: [true, "Contents is required."],
	},
});

const Note = models.Note || model("Note", NoteSchema);

export default Note;
