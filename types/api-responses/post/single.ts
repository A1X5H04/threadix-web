import { Media, Poll, User } from "../common";

export enum ReplyPermissions {
  MENTIONS = "mentions",
  FOLLOWERS = "followers",
  ANYONE = "anyone",
}

export interface Post {
  id: string;
  userId: string;
  parentId: string | null;
  quotePostId: string | null;
  location: string | null;
  content: string;
  mentions: null;
  tags: null;
  likesCount: number;
  repliesCount: number;
  repostCount: number;
  replyPermissions: ReplyPermissions;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  quotePost: Post | null;
  replies: { id: string; poll: Poll | null; media: Media[] }[];
  media: Media[];
  poll: Poll | null;
  isReposted: boolean;
  repostedBy: {
    id: string;
    username: string;
  };
  repostedAt: Date;
}

export interface DetailPost extends Post {
  replies: Post[];
}

export interface ReplyPost extends Post {
  parentPost: Post;
}
