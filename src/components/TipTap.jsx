"use client";

import {
	useEditor,
	EditorContent,
	FloatingMenu,
	BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import "@styles/tiptap.scss";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useSession } from "next-auth/react";

import { getDate } from "@utils/date";
import { revalidatePath } from "next/cache";

// define your extension array
// const extensions = [Document, Paragraph, Text, BulletList, ListItem];
const extensions = [
	StarterKit,
	BulletList.configure({
		HTMLAttributes: {
			class: "list-disc",
		},
	}),
];

// const content = `<h1>${getDate()}</h1>`;

const TipTap = ({ noteId, contents, setContents }) => {
	const { data: session, status } = useSession();

	// const [myEditorContent, setMyEditorContent] = useState("");

	// console.log(contents);
	const editor = useEditor({
		extensions,
		content: `${contents}`,
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none editor_size",
			},
		},
		// onUpdate({ editor }) {
		// 	setMyEditorContent(editor.getHTML());
		// },
	});

	// const [myContent, setMyContent] = useState("");
	const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2000);

	const [submitting, setSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const createNote = async (editorContents) => {
		// console.log(editorContents);
		// debugger;
		// console.log(myEditorContent);
		setSubmitting(true);

		try {
			// console.log(session?.user.id);

			const response = await fetch(`api/note/new`, {
				method: "POST",
				body: JSON.stringify({
					userId: session?.user.id,
					contents: editorContents,
				}),
			});

			if (response.ok) {
				// display "saved to profile!"
				console.log("saved");
				// router.push("/profile");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
			setIsSubmitted(true);
		}
	};

	const updateNote = async (updatedContents) => {
		setSubmitting(true);

		try {
			// console.log(session?.user.id);

			const response = await fetch(`api/note/${noteId}`, {
				method: "PATCH",
				body: JSON.stringify({
					contents: updatedContents,
				}),
			});

			if (response.ok) {
				// display "saved to profile!"
				console.log("saved");
				// router.push("/profile");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
			setIsSubmitted(true);
		}
	};

	// useEffect(() => {
	// 	if (debouncedEditor) {
	// 		// save
	// 		console.log("saving");
	// 		updateNote(editor?.getHTML());
	// 		// setMyContent(editor?.getHTML());
	// 	}
	// }, [debouncedEditor]);

	useEffect(() => {
		editor?.commands.setContent(contents);
		console.log("setting");
	}, [contents]);

	return (
		<section>
			<EditorContent editor={editor} />
			{editor && (
				<FloatingMenu
					className="floating-menu"
					tippyOptions={{ duration: 100 }}
					editor={editor}
				>
					<button
						onClick={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 1 })
								.run()
						}
						className={
							editor.isActive("heading", { level: 1 })
								? "is-active"
								: ""
						}
					>
						H1
					</button>
					<button
						onClick={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 2 })
								.run()
						}
						className={
							editor.isActive("heading", { level: 2 })
								? "is-active"
								: ""
						}
					>
						H2
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleBulletList().run()
						}
						className={
							editor.isActive("bulletList") ? "is-active" : ""
						}
					>
						Bullet list
					</button>
				</FloatingMenu>
			)}
			{editor && (
				<BubbleMenu
					className="bubble-menu"
					tippyOptions={{ duration: 100 }}
					editor={editor}
				>
					<button
						onClick={() =>
							editor.chain().focus().toggleBold().run()
						}
						className={editor.isActive("bold") ? "is-active" : ""}
					>
						Bold
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleItalic().run()
						}
						className={editor.isActive("italic") ? "is-active" : ""}
					>
						Italic
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleStrike().run()
						}
						className={editor.isActive("strike") ? "is-active" : ""}
					>
						Strike
					</button>
				</BubbleMenu>
			)}{" "}
			<button
				className="btn btn-primary"
				onClick={() => {
					createNote(editor?.getHTML());
				}}
			>
				New
			</button>
			<button
				className="btn btn-primary"
				onClick={() => {
					updateNote(editor?.getHTML());
				}}
			>
				Save
			</button>
		</section>
	);
};

export default TipTap;
