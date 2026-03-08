import { axiosInstance } from './api';
import { headers } from 'next/headers';
import { Note } from '@/types/note';
import { User } from '@/types/user';

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const serverApi = {
  getAuthHeaders: async () => {
    const headerList = await headers();
    return {
      headers: {
        cookie: headerList.get('cookie') || '',
      },
    };
  },

  fetchNotes: async (params: FetchNotesParams): Promise<Note[]> => {
    const auth = await serverApi.getAuthHeaders();
    return axiosInstance
      .get('/notes', { ...auth, params })
      .then(res => res.data);
  },

  fetchNoteById: async (id: string): Promise<Note> => {
    const auth = await serverApi.getAuthHeaders();
    return axiosInstance.get(`/notes/${id}`, auth).then(res => res.data);
  },

  getMe: async (): Promise<User> => {
    const auth = await serverApi.getAuthHeaders();
    return axiosInstance.get('/users/me', auth).then(res => res.data);
  },

  checkSession: async (): Promise<User | null> => {
    const auth = await serverApi.getAuthHeaders();
    return axiosInstance.get('/auth/session', auth).then(res => res.data);
  },
};
