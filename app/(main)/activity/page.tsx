"use client";

import { GET } from "@/lib/fetcher";
import { Activity } from "@/types/api-responses/common";
import { RiHistoryLine, RiLoader2Line } from "@remixicon/react";
import React, { useEffect } from "react";
import useSWR from "swr";
import ActivityItem from "./_components/activity-item";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/hooks/use-store";

function ActivityPage() {
  const { readAllActivity } = useAppStore();
  const { data, isLoading } = useSWR("/api/activity", GET<Activity[]>);
  useEffect(() => {
    if (data && data.length > 0) {
      readAllActivity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data || isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <RiLoader2Line className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
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
    <div className="pt-5">
      {data.map((activity, index) => (
        <>
          <ActivityItem key={activity.id} activity={activity} />
          {index !== data.length - 1 && <Separator className="my-4" />}
        </>
      ))}
    </div>
  );
}

export default ActivityPage;
