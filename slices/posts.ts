import { getCurrentUser } from "@/actions/current-user";
import { getLikedPosts } from "@/actions/liked-posts";
import { getRepostedPostsId } from "@/actions/post/repost";
import { getSavedPosts } from "@/actions/post/save";
import { getRegisteredVote } from "@/actions/registered-votes";
import {
  getFollowingUsers,
  getMutedUsers,
  hasUnreadActivity,
} from "@/actions/users";
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
  savedPosts: string[];
  setSavedPosts: (savedPosts: string[]) => void;
  mutedUsers: string[];
  setMutedUsers: (mutedUsers: string[]) => void;
  repostedPosts: string[];
  currentUser: User | null;
  hasUnreadActivity: boolean;
  readAllActivity: () => void;
  intializeData: () => void;
}

export const postSlice: StateCreator<PostState, [], [], PostState> = (set) => ({
  // Liked Posts
  likedPosts: [],
  setLikedPosts: (likedPosts) => set({ likedPosts }),
  // Registered Votes
  registeredVotes: [],
  setRegisteredVotes: (registeredVotes) => set({ registeredVotes }),
  // Reposted Posts
  repostedPosts: [],
  // Following Users
  followingUser: [],
  setFollowingUser: (followingUser) => set({ followingUser }),
  // Saved Posts
  savedPosts: [],
  setSavedPosts: (savedPosts) => set({ savedPosts }),
  // Muted Users
  mutedUsers: [],
  setMutedUsers: (mutedUsers) => set({ mutedUsers }),
  // Current User
  hasUnreadActivity: false,
  readAllActivity: () => set({ hasUnreadActivity: false }),
  currentUser: null,
  intializeData: async () => {
    try {
      const [
        likedPosts,
        registeredVotes,
        followingUser,
        repostedPostsId,
        unreadActivity,
        savedPosts,
        mutedUsers,
      ] = await Promise.all([
        getLikedPosts(),
        getRegisteredVote(),
        getRepostedPostsId(),
        getFollowingUsers(),
        hasUnreadActivity(),
        getSavedPosts(),
        getMutedUsers(),
      ]);

      const user = await getCurrentUser();
      set({
        likedPosts,
        followingUser: followingUser,
        registeredVotes: registeredVotes.data,
        repostedPosts: repostedPostsId,
        currentUser: user,
        hasUnreadActivity: unreadActivity,
        mutedUsers: mutedUsers,
        savedPosts: savedPosts,
      });
    } catch (error) {
      toast.error("Failed to fetch user data, please refresh to try again.");
    }
  },
});
