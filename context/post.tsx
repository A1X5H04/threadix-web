"use client";

import { User } from "lucia";
import { createContext } from "react";

interface PostContextType {
  likedPosts?: string[];
  registeredVotes?: { pollId: string; optionId: number }[];
  repostedPosts?: string[];
  currentUser: User | null;
}

export const PostContext = createContext<PostContextType>({
  likedPosts: [],
  registeredVotes: [],
  repostedPosts: [],
  currentUser: null,
});

interface PostProviderProps extends PostContextType {
  children: React.ReactNode;
}

export const PostContextProvider = ({
  children,
  ...rest
}: PostProviderProps) => {
  return <PostContext.Provider value={rest}>{children}</PostContext.Provider>;
};
