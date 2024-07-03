import React from "react";
import MediaDialog from "./dialogs/media-dialog";
import PollDialog from "./dialogs/poll-dialog";
import RecordDialog from "./dialogs/record-dialog";
import GifPickerPopover from "./dialogs/gif-picker";
import PostLocationDialog from "./dialogs/location-dialog";

export function FormOptions() {
  return (
    <div>
      <MediaDialog />
      <RecordDialog />
      <GifPickerPopover />
      <PostLocationDialog />
      <PollDialog setPoll={(poll) => form.setValue("poll", poll)} />
    </div>
  );
}
