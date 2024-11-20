import { StateCreator } from "zustand";

export interface ModalActionState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface ModalState {
  post: ModalActionState;
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
