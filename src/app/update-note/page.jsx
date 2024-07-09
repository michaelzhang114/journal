import React from "react";
import Form from "@components/Form";
import Feed from "@components/Feed";

const UpdateNote = () => {
	return (
		<section className="flex flex-row">
			<Form className="flex-1" />
			<br />
			<Feed className="flex-1" />
		</section>
	);
};

export default UpdateNote;
