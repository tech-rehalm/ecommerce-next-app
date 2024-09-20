import { StateCreator } from 'zustand';

export type UserSlice = {
    id: string;
    email: string;
    fetchUser: (id: string, email: string) => Promise<void>;
};

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set, get, store) => ({
    id: '',
    email: '',
    fetchUser: async (id, email) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ id, email });
    },
});
