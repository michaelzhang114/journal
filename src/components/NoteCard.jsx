import React from "react";

const NoteCard = ({ note, handleDelete, handleEdit }) => {
	return (
		<div className="card bg-base-100 shadow-xl w-full mx-auto mb-4">
			<div className="card-body">
				<p>{note.contents}</p>

				<div className="card-actions justify-end">
					<button className="btn btn-primary" onClick={handleEdit}>
						Edit
					</button>
					<button className="btn btn-primary" onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default NoteCard;
