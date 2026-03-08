import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { axiosInstance } from './api';

export const serverApi = {
  async checkSession() {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const response = await axiosInstance.get<User>('/auth/session', {
        headers: { Cookie: allCookies },
      });

      return response;
    } catch {
      return null;
    }
  },

  async fetchNotes(params: Record<string, string | number | undefined>) {
    const cookieStore = await cookies();
    const response = await axiosInstance.get('/notes', {
      params,
      headers: { Cookie: cookieStore.toString() },
    });
    return response.data;
  },

  async fetchNoteById(id: string) {
    const cookieStore = await cookies();
    const response = await axiosInstance.get(`/notes/${id}`, {
      headers: { Cookie: cookieStore.toString() },
    });
    return response.data;
  },
};
