import { getLikedPosts } from "@/actions/liked-posts";
import { getRepostedPostsId } from "@/actions/post/repost";
import { getRegisteredVote } from "@/actions/registered-votes";
import { StateCreator } from "zustand";

export interface PostState {
  likedPosts: string[];
  setLikedPosts: (likedPosts: string[]) => void;
  registeredVotes: { pollId: string; optionId: number }[];
  setRegisteredVotes: (
    registeredVotes: { pollId: string; optionId: number }[]
  ) => void;
  repostedPosts: string[];
  fetchData: () => void;
}

export const postSlice: StateCreator<PostState, [], [], PostState> = (set) => ({
  likedPosts: [],
  setLikedPosts: (likedPosts) => set({ likedPosts }),
  registeredVotes: [],
  setRegisteredVotes: (registeredVotes) => set({ registeredVotes }),
  repostedPosts: [],
  fetchData: async () => {
    const likedPosts = await getLikedPosts();
    const registeredVotes = await getRegisteredVote();
    const repostedPostsId = await getRepostedPostsId();

    set({
      likedPosts,
      registeredVotes: registeredVotes.data,
      repostedPosts: repostedPostsId,
    });
  },
});
