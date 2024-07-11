"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import NoteCard from "./NoteCard";

const NoteCardList = ({
	data,
	handleDelete,
	handleEdit,
	loading,
	setNotes,
	activeNoteId,
}) => {
	return loading ? (
		<span className="loading loading-ring loading-lg"></span>
	) : data?.length == 0 ? (
		<p>You don&apos;t have any notes.</p>
	) : (
		<div className="flex flex-col">
			{data?.map((note) => (
				<NoteCard
					key={note._id}
					note={note}
					handleDelete={() => {
						handleDelete && handleDelete(note);
					}}
					handleEdit={() => {
						handleEdit && handleEdit(note);
					}}
					setNotes={setNotes}
					activeNoteId={activeNoteId}
				/>
			))}
		</div>
	);
};

const sortByKey = (array, key) => {
	const ascend = array.sort((a, b) => {
		const aValue = parseFloat(a[key]);
		const bValue = parseFloat(b[key]);

		if (isNaN(aValue) || isNaN(bValue)) {
			// Handle NaN cases, if necessary, e.g., move NaNs to the end
			return isNaN(aValue) ? 1 : -1;
		}

		if (aValue < bValue) {
			return -1;
		}
		if (aValue > bValue) {
			return 1;
		}
		return 0;
	});
	return ascend.toReversed();
};

const Feed = ({ notes, setNotes }) => {
	const [loading, setLoading] = useState(false);

	const searchParams = useSearchParams();
	const mySort = searchParams.get("sort");
	const myActiveNoteId = searchParams.get("id");

	// console.log(mySort);

	const router = useRouter();

	const handleDelete = async (note) => {
		const hasConfirmed = confirm("Are you sure you want to delete?");
		if (hasConfirmed) {
			try {
				await fetch(`/api/note/${note._id.toString()}`, {
					method: "DELETE",
				});
				console.log("deleting note");
				// const filteredPosts = posts.filter((p) => p._id !== post._id);
				// setPosts(filteredPosts);
				const filteredNotes = notes.filter((n) => n._id !== note._id);
				setNotes(filteredNotes);
				// setProjs((prevProjs) =>
				// 	prevProjs.filter((p) => p._id !== proj._id)
				// );
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleEdit = (note) => {
		console.log(note);
		router.push(`/update-note?id=${note._id}`);
	};

	return (
		<div className="max-w-sm mx-auto md:max-w-xl lg:max-w-3xl mt-4">
			<NoteCardList
				data={notes}
				setNotes={setNotes}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
				loading={loading}
				activeNoteId={myActiveNoteId}
			/>
		</div>
	);
};

export default Feed;
