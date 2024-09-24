"use client";

import { createContext } from "react";

interface PostContextType {
  likedPosts?: string[];
  registeredVotes?: { pollId: string; optionId: number }[];
  currentUserId: string;
}

export const PostContext = createContext<PostContextType>({
  likedPosts: [],
  registeredVotes: [],
  currentUserId: "",
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
