import React from "react";

interface ActivityModalHeadingProps {
  screen: "activity" | "likes" | "reposts" | "quotes" | "poll";
}

function ActivityModalHeading({ screen }: ActivityModalHeadingProps) {
  let title = "Post Activity";

  switch (screen) {
    case "likes":
      title = "Likes";
      break;
    case "reposts":
      title = "Reposts";
      break;
    case "quotes":
      title = "Quotes";
      break;
    case "poll":
      title = "Poll";
      break;
    default:
      break;
  }

  return <p>{title}</p>;
}

export default ActivityModalHeading;
