import { getCurrentUser } from "@/actions/current-user";
import { getLikedPosts } from "@/actions/liked-posts";
import { getRepostedPostsId } from "@/actions/post/repost";
import { getRegisteredVote } from "@/actions/registered-votes";
import { getFollowingUsers } from "@/actions/users";
import { validateRequest } from "@/lib/auth";
import { User } from "lucia";
import { StateCreator } from "zustand";

export interface PostState {
  likedPosts: string[];
  setLikedPosts: (likedPosts: string[]) => void;
  registeredVotes: { pollId: string; optionId: number }[];
  setRegisteredVotes: (
    registeredVotes: { pollId: string; optionId: number }[]
  ) => void;
  followingUser: string[];
  setFollowingUser: (followingUsers: string[]) => void;
  repostedPosts: string[];
  currentUser: User | null;
  fetchData: () => void;
}

export const postSlice: StateCreator<PostState, [], [], PostState> = (set) => ({
  likedPosts: [],
  setLikedPosts: (likedPosts) => set({ likedPosts }),
  registeredVotes: [],
  setRegisteredVotes: (registeredVotes) => set({ registeredVotes }),
  repostedPosts: [],
  followingUser: [],
  setFollowingUser: (followingUser) => set({ followingUser }),
  currentUser: null,
  fetchData: async () => {
    const likedPosts = await getLikedPosts();
    const registeredVotes = await getRegisteredVote();
    const repostedPostsId = await getRepostedPostsId();
    const followingUser = await getFollowingUsers();

    const user = await getCurrentUser();
    set({
      likedPosts,
      followingUser: followingUser,
      registeredVotes: registeredVotes.data,
      repostedPosts: repostedPostsId,
      currentUser: user,
    });
  },
});
