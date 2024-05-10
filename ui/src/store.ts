/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

import create from 'zustand';
import SessionService from "./service/SessionService";
import {User} from "./model/SessionState";
import AuthorizationService from "./service/AuthorizationService";

export interface SessionState {
  user: User | null;
  loading: boolean;
  getSession: () => void;
  authorize: ({ login, password }: { login: string, password: string }) => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  user: null,
  loading: true,

  authorize: async ({ login, password }) => {
    await AuthorizationService.login(login, password);
    await get().getSession();
  },

  getSession: async () => {
    try {
      set({ loading: true });
      const user = await SessionService.getSession();
      set({ user });
    } catch (error) {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  }
}));
