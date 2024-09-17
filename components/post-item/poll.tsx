import { registerVote } from "@/actions/post/poll";
import { postData } from "@/data";
import { RiSpyFill } from "@remixicon/react";
import React, { useCallback, useMemo, useTransition } from "react";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

function PostPoll({ poll }: { poll: typeof postData.poll }) {
  const { mutate } = useSWRConfig();

  const doesUserAlreadyVoted = false;
  const totalVotes = useMemo(
    () => poll.poll_options.reduce((acc, option) => acc + option.voteCount, 0),
    [poll.poll_options]
  );

  const calculateVotePercentage = useCallback(
    (votes: number) => {
      if (totalVotes === 0) return "0";
      return ((votes / totalVotes) * 100).toFixed(0);
    },
    [totalVotes]
  );

  return (
    <div className="flex flex-col gap-y-2 mb-2">
      {poll.poll_options.map((option) => (
        <PollOption
          key={option.id}
          option={option}
          calculateVotePercentage={calculateVotePercentage}
          doesUserAlreadyVoted={doesUserAlreadyVoted}
          handleClick={(optionId) => {
            registerVote(poll.id, optionId, poll.anonymousVotes)
              .then(() => {
                toast.success("Vote registered");
                mutate(`/posts/${poll.id}`);
              })
              .catch(() => {
                toast.error("Failed to register vote");
              });
          }}
        />
      ))}
      <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
        <span className="font-semibold">Ends in 24:24:24</span>

        <span className="font-semibold">{totalVotes} Votes</span>
      </div>
    </div>
  );
}

export default PostPoll;

function PollOption({
  option,
  calculateVotePercentage,
  doesUserAlreadyVoted,
  handleClick,
}: {
  option: (typeof postData.poll.poll_options)[0];
  calculateVotePercentage: (votes: number) => string;
  doesUserAlreadyVoted: boolean;
  handleClick: (optionId: number) => void;
}) {
  return (
    <button
      onClick={() => handleClick(option.id)}
      disabled={doesUserAlreadyVoted}
      className="flex items-center justify-between text-sm gap-2 px-3 py-1.5 w-full rounded-md text-white border border-muted"
    >
      <span className="font-bold">{option.title}</span>
      <span>{calculateVotePercentage(option.voteCount)}%</span>
    </button>
  );
}
