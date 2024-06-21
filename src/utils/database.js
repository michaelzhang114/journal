import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		console.log("mongo db is already connected");
		return;
	}

	try {
		// console.log({
		// 	mongoURI: process.env.MONGODB_URI,
		// });
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "builtitnext",
		});

		isConnected = true;
		console.log("mongo db connected");
	} catch (error) {
		console.log(error);
	}
};
