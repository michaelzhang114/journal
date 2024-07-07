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

import { getDate } from "@utils/date";

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

const content = `<h1>${getDate()}</h1>`;

const TipTap = () => {
	const editor = useEditor({
		extensions,
		content,
		editorProps: {
			attributes: {
				class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none editor_size",
			},
		},
		// onUpdate({ editor }) {
		// 	// The content has changed.

		// },
	});

	const [myContent, setMyContent] = useState("");
	// create editor instance and other stuff
	const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2000);

	useEffect(() => {
		if (debouncedEditor) {
			// save
			console.log("saving");
			console.log(editor?.getHTML());
			setMyContent(editor?.getHTML());
		}
	}, [debouncedEditor]);

	return (
		<>
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
			<button className="btn btn-primary">Hi</button>
		</>
	);
};

export default TipTap;
