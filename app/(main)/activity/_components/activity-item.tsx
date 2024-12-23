import { Activity } from "@/types/api-responses/common";
import React from "react";
import ActivityAvatar from "./activity-avatar";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/format";
import { useRouter } from "next-nprogress-bar";
import Content from "@/components/post/item/content";
import PostActions from "@/components/post/item/action-bar";
import VerifiedBadge from "@/components/verified-badge";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  console.log(activity);

  const router = useRouter();

  return (
    <div
      onClick={() =>
        activity.redirectionUrl && router.push(activity.redirectionUrl)
      }
      key={activity.id}
      className={cn(
        "flex gap-x-2",
        activity.redirectionUrl && " cursor-pointer",
      )}
    >
      <ActivityAvatar
        type={activity.activityType}
        actionUsers={activity.actionUsers}
      />
      <div className="flex flex-col text-sm">
        <p className="inline-flex items-center gap-x-1">
          <Link
            className="font-bold hover:underline"
            href={`/users/${activity.actionUsers[0].username}`}
          >
            {activity.actionUsers[0].username}
          </Link>
          {activity.actionUsers[0].isVerified && (
            <VerifiedBadge userName={activity.actionUsers[0].username} />
          )}
          {activity.actionUsers.length > 1 && (
            <span>and {activity.actionUsers.length - 1} other(s) </span>
          )}
          •
          <span className="text-xs text-muted-foreground">
            {formatRelativeDate(new Date(activity.createdAt))}
          </span>
        </p>
        <Content
          className="text-muted-foreground mt-0.5 text-sm"
          content={activity.title}
        />
        {activity.post && (
          <div className="w-full mt-3">
            <Content content={activity.post.content} />
            <PostActions
              data={activity.post}
              counts={{
                replies: activity.post.repliesCount,
                reposts: activity.post.repostCount,
                likes: activity.post.likesCount,
              }}
              postId={activity.post.id}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityItem;
