import { axiosInstance } from './api';
import { Note, } from '@/types/note';
import { User } from '@/types/user';

interface RegisterRequest {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

type CreateNoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export const clientApi = {
  fetchNotes: (params: {
    page?: number;
    perPage?: number;
    search?: string;
    tag?: string;
  }) => axiosInstance.get('/notes', { params }).then(res => res.data),

  fetchNoteById: (id: string): Promise<Note> =>
    axiosInstance.get(`/notes/${id}`).then(res => res.data),

  createNote: (data: CreateNoteInput): Promise<Note> =>
    axiosInstance.post('/notes', data).then(res => res.data),

  deleteNote: (id: string): Promise<Note> =>
    axiosInstance.delete(`/notes/${id}`).then(res => res.data),

  register: async (data: RegisterRequest): Promise<User> => {
    const response = await axiosInstance.post<User>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<User> => {
    const response = await axiosInstance.post<User>('/auth/login', data);
    return response.data;
  },

  logout: (): Promise<void> =>
    axiosInstance.post('/auth/logout').then(res => res.data),

  checkSession: (): Promise<User | null> =>
    axiosInstance.get('/auth/session').then(res => res.data),

  getMe: (): Promise<User> =>
    axiosInstance.get('/users/me').then(res => res.data),

  updateMe: (data: Partial<User>): Promise<User> =>
    axiosInstance.patch('/users/me', data).then(res => res.data),
};
