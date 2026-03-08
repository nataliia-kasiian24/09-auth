'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { clientApi } from '@/lib/api/clientApi';
import { Modal } from "@/components/Modal/Modal";
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => clientApi.fetchNoteById(id),
    refetchOnMount: false,
    retry: false, 
  });

  const handleClose = () => router.back();

 
  if (isLoading) return <Modal onClose={handleClose}><div>Loading...</div></Modal>;

  if (isError) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.errorContainer}>
          <p>Сталася помилка при завантаженні нотатки.</p>
          <button onClick={handleClose} className={css.backBtn}>Close</button>
        </div>
      </Modal>
    );
  }

  if (!note) return null;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.backBtn} onClick={handleClose}>
            Close
          </button>
        </div>

        <div className={css.item}>
          <span className={css.tag}>{note.tag}</span>
          <div className={css.content}>{note.content}</div>
          <p className={css.date}>
            Created at: {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Modal>
  );
}