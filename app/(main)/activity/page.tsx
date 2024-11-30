"use client";

import { GET } from "@/lib/fetcher";
import { Activity } from "@/types/api-responses/common";
import { Ri24HoursLine, RiHistoryLine } from "@remixicon/react";
import React from "react";
import useSWR from "swr";
import ActivityAvatar from "./_components/activity-avatar";
import ActivityItem from "./_components/activity-item";

function ActivityPage() {
  const { data, isLoading } = useSWR("/api/activity", GET<Activity[]>);

  if (!data || isLoading) {
    return "Loading...";
  }

  if (data.length === 0) {
    return (
      <div className="grid place-items-center w-full h-96">
        <div className="grid place-items-center">
          <RiHistoryLine className="w-20 h-20 text-muted mb-2" />
          <h4 className="font-semibold text-lg">No Activity Found</h4>
          <p className="text-sm text-muted-foreground">
            When you like or follow something, it will show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

export default ActivityPage;
