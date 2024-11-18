import { StateCreator } from "zustand";

export interface ModalState {
  post: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
}

export const modalStore: StateCreator<ModalState, [], [], ModalState> = (
  set
) => ({
  post: {
    isOpen: false,
    onOpen: () =>
      set((state) => ({
        post: { ...state.post, isOpen: true },
      })),
    onClose: () => set((state) => ({ post: { ...state.post, isOpen: false } })),
  },
});
