import { getCurrentUser } from "@/actions/current-user";
import { getLikedPosts } from "@/actions/liked-posts";
import { getRepostedPostsId } from "@/actions/post/repost";
import { getRegisteredVote } from "@/actions/registered-votes";
import { getFollowingUsers, hasUnreadActivity } from "@/actions/users";
import { User } from "lucia";
import toast from "react-hot-toast";
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
  hasUnreadActivity: boolean;
  readAllActivity: () => void;
  intializeData: () => void;
}

export const postSlice: StateCreator<PostState, [], [], PostState> = (set) => ({
  likedPosts: [],
  setLikedPosts: (likedPosts) => set({ likedPosts }),
  registeredVotes: [],
  setRegisteredVotes: (registeredVotes) => set({ registeredVotes }),
  repostedPosts: [],
  followingUser: [],
  setFollowingUser: (followingUser) => set({ followingUser }),
  hasUnreadActivity: false,
  readAllActivity: () => set({ hasUnreadActivity: false }),
  currentUser: null,
  intializeData: async () => {
    try {
      const likedPosts = await getLikedPosts().catch();
      const registeredVotes = await getRegisteredVote();
      const repostedPostsId = await getRepostedPostsId();
      const followingUser = await getFollowingUsers();
      const unreadActivity = await hasUnreadActivity();

      const user = await getCurrentUser();
      set({
        likedPosts,
        followingUser: followingUser,
        registeredVotes: registeredVotes.data,
        repostedPosts: repostedPostsId,
        currentUser: user,
        hasUnreadActivity: unreadActivity,
      });
    } catch (error) {
      toast.error("Failed to fetch user data, please refresh to try again.");
    }
  },
});
