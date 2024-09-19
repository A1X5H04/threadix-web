import { registerVote } from "@/actions/post/poll";
import { postData } from "@/data";
import { RiSpyFill } from "@remixicon/react";
import React, { useCallback, useMemo, useTransition } from "react";
import toast from "react-hot-toast";
import produce from "immer";

function PostPoll({ poll }: { poll: typeof postData.poll }) {
  // Because I can't use swr mutate in the handleClick function, I'm using a local state to update the poll
  const [localPoll, setLocalPoll] = React.useState(poll);

  const doesUserAlreadyVoted = false;
  const totalVotes = useMemo(
    () =>
      localPoll.poll_options.reduce((acc, option) => acc + option.voteCount, 0),
    [localPoll.poll_options]
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
            registerVote(poll.id, optionId, poll.anonymousVotes).catch(() => {
              toast.error("Failed to register vote");
              setLocalPoll(poll);
            });
            setLocalPoll((prev) => ({
              ...prev,
              poll_options: prev.poll_options.map((o) => {
                if (o.id === optionId) {
                  return {
                    ...o,
                    voteCount: o.voteCount + 1,
                  };
                }
                return o;
              }),
            }));
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
      className="relative flex items-center justify-between text-sm gap-2 px-3 py-1.5 w-full rounded-md text-white border border-muted overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-foreground h-full transition-all duration-150"
        style={{
          width: `${calculateVotePercentage(option.voteCount)}%`,
        }}
      />
      <p className="mix-blend-difference font-bold">{option.title}</p>
      <span className="text-foreground">
        {calculateVotePercentage(option.voteCount)}%
      </span>
    </button>
  );
}
