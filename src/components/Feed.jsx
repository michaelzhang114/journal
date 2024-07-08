"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import NoteCard from "./NoteCard";

const NoteCardList = ({ data, handleDelete, handleEdit, loading }) => {
	return loading ? (
		<span className="loading loading-ring loading-lg"></span>
	) : data.length == 0 ? (
		<p>You don&apos;t have any notes.</p>
	) : (
		<div className="flex flex-col">
			{data.map((note) => (
				<NoteCard
					key={note._id}
					note={note}
					// handleDelete={() => {
					// 	handleDelete && handleDelete(proj);
					// }}
					handleEdit={() => {
						handleEdit && handleEdit(note);
					}}
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

const Feed = () => {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(false);

	const searchParams = useSearchParams();
	const mySort = searchParams.get("sort");
	// console.log(mySort);

	const router = useRouter();

	useEffect(() => {
		const fetchNotes = async () => {
			// setLoading(true);
			const response = await fetch("/api/note");
			const data = await response.json();
			console.log(data);

			// if no sorting
			if (!mySort) {
				setNotes(data);
			}
		};
		fetchNotes();
	}, [mySort]);

	const handleDelete = async (note) => {};

	const handleEdit = (note) => {
		console.log(note);
		router.push(`/update-note?id=${note._id}`);
	};

	return (
		<div className="max-w-sm mx-auto md:max-w-xl lg:max-w-3xl mt-4">
			<NoteCardList
				data={notes}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
				loading={loading}
			/>
		</div>
	);
};

export default Feed;
