import React from "react";

const NoteCard = ({
	note,
	handleDelete,
	handleEdit,
	setNotes,
	activeNoteId,
}) => {
	return (
		// <div className="card bg-base-100 shadow-xl w-full mx-auto mb-4">
		// 	<div className="card-body">
		// 		<p>{note.contents}</p>

		// 		<div className="card-actions justify-end">
		// 			<button className="btn btn-primary" onClick={handleEdit}>
		// 				Edit
		// 			</button>
		// 			<button className="btn btn-primary" onClick={handleDelete}>
		// 				Delete
		// 			</button>
		// 		</div>
		// 	</div>
		// </div>
		<li>
			<div className="flex flex-row">
				{/* <p>{note.createdAt}</p> */}
				{/* {activeNoteId === note._id ? <p>this</p> : <p></p>} */}
				<p className={activeNoteId === note._id ? `bg-slate-700` : ""}>
					{note.contents}
				</p>
				<button className="btn btn-primary" onClick={handleEdit}>
					Edit
				</button>
				<button className="btn btn-primary" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</li>
	);
};

export default NoteCard;
