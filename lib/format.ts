export function formatDate(dateInput: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const inputDate = new Date(
    dateInput.getFullYear(),
    dateInput.getMonth(),
    dateInput.getDate()
  );

  let dateString = "";
  if (inputDate.getTime() === today.getTime()) {
    dateString = "Today";
  } else if (inputDate.getTime() === yesterday.getTime()) {
    dateString = "Yesterday";
  } else {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dateString = `${dayNames[dateInput.getDay()]} ${dateInput.getDate()}`;
  }

  const timeString = dateInput.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${dateString} at ${timeString}`;
}

export function formatSecondsToMinutes(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
