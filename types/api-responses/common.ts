import { Post } from "./post/single";

export interface Media {
  postId: string;
  name: string;
  url: string;
  width: number;
  height: number;
  type: string;
  createdAt: Date;
}

export interface Poll {
  id: string;
  postId: string;
  duration: string;
  quizMode: boolean;
  createdAt: string;
  poll_options: PollOption[];
}

export interface PollOption {
  id: number;
  pollId: string;
  title: string;
  voteCount: number;
  isCorrect: boolean | null;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: null;
  isVerified: boolean;
  createdAt: Date;
}

export type Tag = {
  id: string;
  name: string;
  createdAt: string;
  postsCount?: number;
  user: User;
};

export interface Activity {
  id: number;
  userId: string;
  actionUserIds: string[];
  title: string;
  postId?: string;
  redirectionUrl?: string;
  activityType:
    | "like"
    | "repost"
    | "user"
    | "poll"
    | "mention"
    | "quote"
    | "other";
  isUnread: boolean;
  createdAt: Date;
  actionUsers: Pick<User, "id" | "username" | "avatar" | "isVerified">[];
  post: Post;
}

export type Vote = {
  optionId: number;
  createdAt: Date;
  user: Pick<User, "name" | "username" | "avatar" | "isVerified">;
};
