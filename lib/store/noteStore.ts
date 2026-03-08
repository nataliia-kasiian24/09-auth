import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NoteDraft {
  title: string;
  content: string;
  tag: string;
}

interface NoteState {
  draft: NoteDraft;
  setDraft: (updatedFields: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      
      setDraft: (updatedFields) =>
        set((state) => ({
          draft: { ...state.draft, ...updatedFields },
        })),
        
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage', 
    }
  )
);