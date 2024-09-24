import { registerVote } from "@/actions/post/poll";
import { postData } from "@/data";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useTransition,
} from "react";
import toast from "react-hot-toast";
import { produce } from "immer";
import { RegisteredVotes } from "@/types";
import { PostContext } from "@/context/post";
import { cn } from "@/lib/utils";
import useCountdown from "@/hooks/use-countdown";
import CountDownTicker from "../countdown-ticker";

function PostPoll({
  poll,
  isCurrentUser,
}: {
  poll: typeof postData.poll;
  isCurrentUser: boolean;
}) {
  const { registeredVotes } = useContext(PostContext);
  const [pending, transition] = useTransition();
  const [isVoted, setIsVoted] = React.useState(false);
  // Because I can't use swr mutate in the handleClick function, I'm using a local state to update the poll
  const [localPoll, setLocalPoll] = React.useState(poll);

  const voteOptionId = useMemo(() => {
    const vote = registeredVotes?.find((vote) => vote.pollId === poll.id);
    return vote ? vote.optionId : null;
  }, [registeredVotes, poll.id]);

  console.log("Vote Options Id", voteOptionId);

  const totalVotes = useMemo(
    () =>
      localPoll.poll_options.reduce((acc, option) => acc + option.voteCount, 0),
    [localPoll.poll_options]
  );

  const calculateVotePercentage = useCallback(
    (votes: number) => {
      if (totalVotes === 0) return 0;
      return Math.round((votes / totalVotes) * 100);
    },
    [totalVotes]
  );

  return (
    <div className="flex flex-col gap-y-2 mb-2 ">
      {localPoll.poll_options.map((option) => (
        <PollOption
          shouldDisabled={
            pending || isCurrentUser || voteOptionId !== null || isVoted
          }
          key={option.id}
          option={option}
          voteOptionId={voteOptionId}
          calculateVotePercentage={calculateVotePercentage}
          handleClick={(optionId) => {
            transition(() =>
              registerVote(poll.id, optionId)
                .then(() => {
                  toast.success("Vote Registered");
                })
                .catch(() => {
                  toast.error("Failed to register vote");
                  setLocalPoll(poll);
                  setIsVoted(false);
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
            setIsVoted(true);
          }}
        />
      ))}

      <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
        <span className="font-semibold inline-flex gap-x-1">
          Poll &middot; <CountDownTicker targetDate={new Date(poll.duration)} />
        </span>
        <span className="font-semibold">{totalVotes} Votes</span>
      </div>
    </div>
  );
}

export default PostPoll;

function PollOption({
  shouldDisabled,
  option,
  calculateVotePercentage,
  voteOptionId,
  handleClick,
}: {
  shouldDisabled: boolean;
  option: (typeof postData.poll.poll_options)[0];
  calculateVotePercentage: (votes: number) => number;
  voteOptionId: number | null;
  handleClick: (optionId: number) => void;
}) {
  return (
    <button
      onClick={() => handleClick(option.id)}
      disabled={shouldDisabled}
      title={
        voteOptionId
          ? "You already have voted the poll"
          : shouldDisabled
          ? "You can't vote on your own poll!"
          : undefined
      }
      className="relative flex items-center justify-between text-sm gap-2 px-3 py-1.5 w-full rounded-md text-white border border-muted overflow-hidden disabled:cursor-default"
    >
      <div
        className={cn(
          "absolute inset-0 h-full transition-all duration-150",
          voteOptionId
            ? voteOptionId === option.id
              ? "bg-foreground"
              : "bg-muted"
            : "bg-foreground"
        )}
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
