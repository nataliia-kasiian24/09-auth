'use client';

import { useRouter } from 'next/navigation';
import { NoteTag } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api'; 
import { Note } from '@/types/note';
import css from './NoteForm.module.css';


type CreateNoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

 
  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteInput) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      
  
      clearDraft();
      router.push('/');
      router.refresh();
    },
    onError: (error) => {
      console.error('Помилка створення нотатки:', error);
      alert('Не вдалося створити нотатку. Спробуйте ще раз.');
    }
  });

  const handleAction = async (formData: FormData) => {
    const noteData: CreateNoteInput = {
      title: formData.get('title') as string,
      tag: formData.get('tag') as NoteTag, 
      content: formData.get('content') as string,
    };

    mutation.mutate(noteData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  return (
    <form action={handleAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          placeholder="Enter title..."
          required
          value={draft.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          value={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          placeholder="Write your note here..."
          rows={5}
          required
          value={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.actions}>
        <button 
          type="submit" 
          className={css.submitButton}
          disabled={mutation.isPending} 
        >
          {mutation.isPending ? 'Saving...' : 'Save Note'}
        </button>
        <button 
          type="button" 
          className={css.cancelButton} 
          onClick={() => router.back()}
          disabled={mutation.isPending}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}