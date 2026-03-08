import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";


export const metadata: Metadata = {
  title: "Create New Note | NoteHub",
  description: "Create and save your new notes on NoteHub easily.",
  openGraph: {
    title: "Create New Note | NoteHub",
    description: "Create and save your new notes on NoteHub easily.",
    url: "https://08-zustand-rose-eta.vercel.app/notes/action/create", 
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}