import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { type PollOption } from "@/types/api-responses/common";
import { RiCheckFill, RiCloseFill } from "@remixicon/react";

function PollOption({
  shouldDisabled,
  option,
  calculateVotePercentage,
  voteOptionId,
  handleClick,
  isEnded,
  highestVotes,
  isQuiz,
}: {
  isQuiz: boolean;
  isEnded: boolean;
  shouldDisabled: boolean;
  highestVotes: number;
  option: PollOption;
  calculateVotePercentage: (votes: number) => number;
  voteOptionId: number | null;
  handleClick: (optionId: number) => void;
}) {
  return (
    <button
      onClick={() => handleClick(option.id)}
      disabled={shouldDisabled}
      // title={
      //   voteOptionId
      //     ? "You already have voted the poll"
      //     : shouldDisabled
      //     ? "You can't vote on your own poll!"
      //     : undefined
      // }
      className={cn(
        "relative flex items-center justify-between text-sm gap-2 px-3 py-1.5 w-full rounded-md text-white border border-muted overflow-hidden disabled:cursor-default"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 h-full transition-all duration-150 bg-foreground",
          isEnded && "bg-muted"
        )}
        style={{
          width: `${calculateVotePercentage(option.voteCount)}%`,
        }}
      />
      <div className="inline-flex items-center gap-x-2 z-10">
        {isQuiz && isEnded && (
          <>
            {option.isCorrect ? (
              <RiCheckFill className="w-4 h-4 text-emerald-500" />
            ) : (
              <RiCloseFill className="w-4 h-4 text-red-500" />
            )}
          </>
        )}
        <p className="mix-blend-difference font-bold">{option.title}</p>
      </div>
      <div className="inline-flex items-center gap-x-2">
        {voteOptionId === option.id && (
          <Avatar
            className="size-5 font-semibold text-muted-foreground ring-1 ring-muted"
            title="Voted by you"
          >
            <AvatarImage
              src="https://api.dicebear.com/9.x/avataaars-neutral/svg"
              alt="F"
            />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
        )}
        <span className="mix-blend-difference text-foreground">
          {calculateVotePercentage(option.voteCount)}%
        </span>
      </div>
    </button>
  );
}

export default PollOption;
