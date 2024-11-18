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
  replyPermissions: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  quotePost: Post | null;
  replies: Post[];
  media: Media[];
  poll: Poll | null;
}

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
