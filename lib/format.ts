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

export function formatRelativeDate(dateInput: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - dateInput.getTime()) / 1000
  );

  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;

  if (diffInSeconds < secondsInMinute) {
    return `now`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}m ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days}d ago`;
  }
}

export function formatSecondsToMinutes(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
