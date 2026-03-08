import type { Note, NoteTag } from '../types/note';

type CreateNoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
  tag = '',
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
    search,
    tag: tag === 'all' ? '' : tag,
  });

  const response = await fetch(`/api/notes?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Помилка при завантаженні нотаток');
  }

  return response.json();
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await fetch(`/api/notes/${id}`);

  if (!response.ok) {
    throw new Error('Не вдалося знайти нотатку');
  }

  return response.json();
};

export async function createNote(noteData: CreateNoteInput) {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    throw new Error('Не вдалося створити нотатку');
  }

  return response.json();
}

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Не вдалося видалити нотатку');
  }

  return response.json();
};
