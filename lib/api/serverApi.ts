import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { axiosInstance } from './api';
import { AxiosResponse } from 'axios';

export const serverApi = {
  async checkSession(): Promise<AxiosResponse<User> | null> {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const response = await axiosInstance.get<User>('/auth/session', {
        headers: { Cookie: allCookies },
      });

      return response;
    } catch (error) {
      console.error('Check session error:', error);
      return null;
    }
  },

  async getCurrentUser(): Promise<User> {
    const cookieStore = await cookies();
    const response = await axiosInstance.get<User>('/users/me', {
      headers: { Cookie: cookieStore.toString() },
    });
    return response.data;
  },

  async fetchNotes(
    params: Record<string, string | number | undefined>
  ): Promise<Note[]> {
    const cookieStore = await cookies();
    const response = await axiosInstance.get<Note[]>('/notes', {
      params,
      headers: { Cookie: cookieStore.toString() },
    });
    return response.data;
  },

  async fetchNoteById(id: string): Promise<Note> {
    const cookieStore = await cookies();
    const response = await axiosInstance.get<Note>(`/notes/${id}`, {
      headers: { Cookie: cookieStore.toString() },
    });
    return response.data;
  },
};
