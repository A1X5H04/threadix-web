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
