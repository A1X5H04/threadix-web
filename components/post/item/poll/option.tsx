import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/hooks/use-store";
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
  const { currentUser } = useAppStore();

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
      className="relative flex items-center justify-between text-sm gap-2 px-3 py-1.5 w-full rounded-md text-white border border-muted overflow-hidden disabled:cursor-default bg-background"
    >
      <div
        className={cn(
          "absolute inset-0 h-full transition-all duration-150 bg-foreground dark:bg-foreground",
          isEnded && "bg-muted-foreground/50 dark:bg-muted",
          isEnded &&
            option.voteCount === highestVotes &&
            "bg-foreground dark:bg-foreground",
        )}
        style={{
          width: `${calculateVotePercentage(option.voteCount)}%`,
        }}
      />
      <div className="inline-flex items-center gap-x-2">
        <p
          className="mix-blend-difference font-semibold"
          // className={cn(
          //   "font-semibold",
          //   isQuiz && !isEnded && "mix-blend-difference",
          //   !isQuiz && isEnded
          //     ? "mix-blend-difference"
          //     : isEnded &&
          //         isQuiz &&
          //         option.isCorrect &&
          //         "text-emerald-800 z-10",
          //   isEnded && isQuiz && !option.isCorrect && "text-red-800 z-10"
          // )}
        >
          {option.title}
        </p>
        {isQuiz && isEnded && (
          <>
            {option.isCorrect ? (
              <RiCheckFill className="w-4 h-4 text-emerald-500 z-10" />
            ) : (
              <RiCloseFill className="w-4 h-4 text-red-500 z-10" />
            )}
          </>
        )}
      </div>
      <div className="inline-flex items-center gap-x-2">
        {voteOptionId === option.id && (
          <Avatar
            className="size-5 font-semibold text-muted-foreground ring-1 ring-muted"
            title="Voted by you"
          >
            <AvatarImage
              src={currentUser?.avatar ?? undefined}
              alt={currentUser?.username}
            />
            <AvatarFallback>
              {currentUser?.username?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <span className="mix-blend-difference">
          {calculateVotePercentage(option.voteCount)}%
        </span>
      </div>
    </button>
  );
}

export default PollOption;
