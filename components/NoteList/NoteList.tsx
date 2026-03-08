'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import Link from "next/link";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      alert("Failed to delete the note.");
    },
  });

  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link href={`/notes/${id}`} className={css.detailsLink}>
            View details
          </Link>
            <button 
              className={css.button} 
              onClick={() => deleteMutation.mutate(id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};