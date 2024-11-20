import React, { useCallback, useMemo, useTransition } from "react";
import toast from "react-hot-toast";
import { produce } from "immer";
import { useSWRConfig } from "swr";

import { Poll } from "@/types/api-responses/common";
import { Post } from "@/types/api-responses/post/single";
import { registerVote } from "@/actions/post/poll";
import { useAppStore } from "@/hooks/use-store";

import CountDownTicker from "./countdown-ticker";
import PollOption from "./option";

function PostPoll({
  poll,
  isCurrentUser,
}: {
  poll: Poll;
  isCurrentUser: boolean;
}) {
  const { mutate } = useSWRConfig();
  const { registeredVotes, setRegisteredVotes } = useAppStore();
  const [pending, transition] = useTransition();

  const isPollEnded = new Date(poll.duration) < new Date();

  const voteOptionId = useMemo(() => {
    const vote = registeredVotes?.find((vote) => vote.pollId === poll.id);
    return vote ? vote.optionId : null;
  }, [registeredVotes, poll.id]);

  const totalVotes = useMemo(
    () => poll.poll_options.reduce((acc, option) => acc + option.voteCount, 0),
    [poll.poll_options]
  );

  const calculateVotePercentage = useCallback(
    (votes: number) => {
      if (totalVotes === 0) return 0;
      return Math.round((votes / totalVotes) * 100);
    },
    [totalVotes]
  );

  const highestVotes = useMemo(() => {
    if (!isPollEnded) return 0;
    return Math.max(...poll.poll_options.map((option) => option.voteCount));
  }, [poll.poll_options, isPollEnded]);

  const handleVote = async (optionId: number) => {
    mutate(
      "/api/post",
      (data) => {
        return produce(data, (draft: { posts: Post[] }) => {
          const post = draft.posts.find((post) => post?.poll?.id === poll.id);
          if (post && post.poll) {
            const option = post.poll.poll_options.find(
              (opt) => opt.id === optionId
            );
            if (option) {
              option.voteCount += 1;
            }
          }
        });
      },
      { revalidate: false, populateCache: true }
    );
    setRegisteredVotes([...registeredVotes, { pollId: poll.id, optionId }]);

    try {
      await registerVote(poll.id, optionId);
      toast.success("Vote Registered");
    } catch (error) {
      mutate("/api/posts"); // Revalidate the cache
      toast.error("Failed to register vote");
    }
  };

  return (
    <div
      data-prevent-nprogress
      className="flex flex-col gap-y-2 mb-2"
      onClick={(e) => e.preventDefault()}
    >
      {poll.poll_options.map((option) => (
        <PollOption
          isEnded={isPollEnded}
          shouldDisabled={
            pending || isCurrentUser || voteOptionId !== null || isPollEnded
          }
          isQuiz={poll.quizMode}
          key={option.id}
          option={option}
          highestVotes={highestVotes}
          voteOptionId={voteOptionId}
          calculateVotePercentage={calculateVotePercentage}
          handleClick={handleVote}
        />
      ))}

      <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
        <span className="font-semibold inline-flex gap-x-1">
          {poll.quizMode ? "Quiz" : "Poll"} &middot;{" "}
          <CountDownTicker targetDate={new Date(poll.duration)} />
        </span>
        <span className="font-semibold">{totalVotes} Votes</span>
      </div>
    </div>
  );
}

export default PostPoll;
