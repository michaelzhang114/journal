import { Schema, model, models } from "mongoose";

const noteSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	content: {
		type: String,
		required: [true, "Content is required."],
	},
});

const User = models.User || model("User", noteSchema);

export default User;
