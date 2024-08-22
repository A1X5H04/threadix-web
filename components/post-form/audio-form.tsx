"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";

import AudioTab from "./audio-tab";
import { Button } from "../ui/button";
import RecordTab from "./record-tab";
import { useFormContext } from "react-hook-form";
import { ThreadSchema } from ".";
import { PostAudioSchema } from "@/types";

function AudioForm({
  setAudio,
  onCancel,
}: {
  setAudio: (media: PostAudioSchema) => void;
  onCancel: () => void;
}) {
  return (
    <div>
      <h1 className="mb-5 font-semibold text-lg tracking-tight">
        Record or upload audio
      </h1>
      <Tabs defaultValue="audio">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="record">Record</TabsTrigger>
        </TabsList>
        <TabsContent value="audio">
          <AudioTab setAudio={setAudio} onCancel={onCancel} />
        </TabsContent>
        <TabsContent value="record">
          <RecordTab setAudio={setAudio} onCancel={onCancel} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AudioForm;
