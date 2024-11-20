import { postSlice, PostState } from "@/slices/posts";
import { Post } from "@/types/api-responses/post/single";
import { create } from "zustand";

interface ModalState {
  post: {
    post: Post | null;
    intent?: "reply" | "quote";
    isOpen: boolean;
    onOpen: (post?: Post, intent?: "reply" | "quote") => void;
    onClose: () => void;
  };
}

export const useModalStore = create<ModalState>((set) => ({
  post: {
    post: null,
    isOpen: false,
    onOpen: (post, intent) =>
      set((state) => ({
        post: {
          ...state.post,
          isOpen: true,
          post: post ?? null,
          intent: intent,
        },
      })),
    onClose: () => set((state) => ({ post: { ...state.post, isOpen: false } })),
  },
}));

type AppState = PostState;

export const useAppStore = create<AppState>()((...args) => ({
  ...postSlice(...args),
}));
