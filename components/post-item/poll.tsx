import { registerVote } from "@/actions/post/poll";
import { postData } from "@/data";
import React, { useCallback, useEffect, useMemo, useTransition } from "react";
import toast from "react-hot-toast";
import { produce } from "immer";

function PostPoll({
  poll,
  registeredVotes,
}: {
  poll: typeof postData.poll;
  registeredVotes: any;
}) {
  const [pending, transition] = useTransition();
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
      console.log(votes, totalVotes);
      if (totalVotes === 0) return 0;
      return Math.round((votes / totalVotes) * 100);
    },
    [totalVotes]
  );

  return (
    <div className="flex flex-col gap-y-2 mb-2">
      {localPoll.poll_options.map((option) => (
        <PollOption
          pending={pending}
          key={option.id}
          option={option}
          calculateVotePercentage={calculateVotePercentage}
          doesUserAlreadyVoted={doesUserAlreadyVoted}
          handleClick={(optionId) => {
            transition(() =>
              registerVote(poll.id, optionId, poll.anonymousVotes)
                .then(() => {
                  toast.success("Vote Registered");
                })
                .catch(() => {
                  toast.error("Failed to register vote");
                  setLocalPoll(poll);
                })
            );
            setLocalPoll(
              produce((draft) => {
                const pollOption = draft.poll_options.find(
                  (o) => o.id === optionId
                );
                if (pollOption) {
                  pollOption.voteCount += 1;
                }
              })
            );
          }}
        />
      ))}

      <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
        <span className="font-semibold">Ends in {poll.duration}</span>
        <span className="font-semibold">{totalVotes} Votes</span>
      </div>
    </div>
  );
}

export default PostPoll;

function PollOption({
  pending,
  option,
  calculateVotePercentage,
  doesUserAlreadyVoted,
  handleClick,
}: {
  pending: boolean;
  option: (typeof postData.poll.poll_options)[0];
  calculateVotePercentage: (votes: number) => number;
  doesUserAlreadyVoted: boolean;
  handleClick: (optionId: number) => void;
}) {
  return (
    <button
      onClick={() => handleClick(option.id)}
      disabled={doesUserAlreadyVoted || pending}
      className="relative flex items-center justify-between text-sm gap-2 px-3 py-1.5 w-full rounded-md text-white border border-muted overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-foreground h-full transition-all duration-150"
        style={{
          width: `${calculateVotePercentage(option.voteCount)}%`,
        }}
      />
      <p className="mix-blend-difference font-bold">{option.title}</p>
      <span className="mix-blend-difference text-foreground">
        {calculateVotePercentage(option.voteCount)}%
      </span>
    </button>
  );
}
