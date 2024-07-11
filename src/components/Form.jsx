"use client";

import React from "react";
import TipTap from "./TipTap";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

const Form = ({ notes, setNotes, triggerNotesUpdate }) => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);

	const [contents, setContents] = useState("");

	const searchParams = useSearchParams();
	const noteId = searchParams.get("id");

	useEffect(() => {
		const getNoteDetails = async () => {
			const response = await fetch(`/api/note/${noteId}`);
			const data = await response.json();
			// console.log(data.contents);
			setContents(data.contents);
		};

		if (noteId) {
			getNoteDetails();
		}
	}, [noteId]);

	const updateNote = async (e) => {
		// e.preventDefault();
		// setSubmitting(true);
		// if (!projId) return alert("missing proj id in query params!!!");
		// try {
		// 	const response = await fetch(`api/project/${projId}`, {
		// 		method: "PATCH",
		// 		body: JSON.stringify({
		// 			projectName: proj.projectName,
		// 			description: proj.description,
		// 			scorePV: proj.scorePV,
		// 			scoreScale: proj.scoreScale,
		// 			scoreTech: proj.scoreTech,
		// 			scoreDist: proj.scoreDist,
		// 		}),
		// 	});
		// 	if (response.ok) {
		// 		router.push("/profile");
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// } finally {
		// 	setSubmitting(false);
		// }
	};

	return (
		<section>
			<TipTap
				noteId={noteId}
				contents={contents}
				setContents={setContents}
				notes={notes}
				setNotes={setNotes}
				triggerNotesUpdate={triggerNotesUpdate}
			/>
		</section>
	);
};

export default Form;
