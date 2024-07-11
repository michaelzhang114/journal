"use client";
import React from "react";
import Form from "./Form";
import Feed from "./Feed";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
	const [notes, setNotes] = useState([]);
	const [triggerEffect, setTriggerEffect] = useState(false);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await fetch("/api/note");
				const data = await response.json();
				console.log(data);
				setNotes(data);
			} catch (error) {
				console.error("Error fetching notes:", error);
			}
		};
		fetchNotes();
		if (triggerEffect) setTriggerEffect(false);
	}, [triggerEffect]);

	const triggerEffectFromChild = () => {
		setTriggerEffect(true);
	};

	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content border-4">
				<div>
					<Form
						notes={notes}
						setNotes={setNotes}
						triggerNotesUpdate={triggerEffectFromChild}
					/>
				</div>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
					{/* Sidebar content here */}
					<Feed notes={notes} setNotes={setNotes} className="" />
				</ul>
			</div>
		</div>
	);
};

export default Dashboard;
