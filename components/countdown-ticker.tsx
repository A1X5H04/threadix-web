import useCountdown from "@/hooks/use-countdown";
import React from "react";

type Props = {
  targetDate: Date;
};

export default function CountDownTicker({ targetDate }: Props) {
  const countdown = useCountdown(targetDate);

  if (targetDate.getTime() < new Date().getTime()) {
    return <p>Ended at {targetDate.toDateString()}</p>;
  }

  return (
    <p>
      Ends in {countdown.hours}:{countdown.minutes}:{countdown.seconds}
    </p>
  );
}
