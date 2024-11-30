import { Activity } from "@/types/api-responses/common";
import React from "react";
import ActivityAvatar from "./activity-avatar";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/format";
import { useRouter } from "next-nprogress-bar";

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        activity.redirectionUrl && router.push(activity.redirectionUrl)
      }
      key={activity.id}
      className="flex gap-x-2"
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
          {activity.actionUsers.length > 1 && (
            <span>and {activity.actionUsers.length - 1} others</span>
          )}{" "}
          <span className="text-xs text-muted-foreground">
            {formatRelativeDate(new Date(activity.createdAt))}
          </span>
        </p>
        <p className="text-muted-foreground">{activity.title}</p>
      </div>
    </div>
  );
}

export default ActivityItem;
