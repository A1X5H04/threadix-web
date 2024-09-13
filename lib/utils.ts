import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertRelativeDataToDate(relativeData: string): Date {
  // Get the numeric value and the time unit (e.g., d for days, h for hours)
  const value = parseInt(relativeData.slice(0, -1), 10);
  const unit = relativeData.slice(-1).toLowerCase();

  // Get the current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  let timeDifference;
  switch (unit) {
    case "d": // days
      timeDifference = value * 24 * 60 * 60 * 1000; // days to milliseconds
      break;
    case "h": // hours
      timeDifference = value * 60 * 60 * 1000; // hours to milliseconds
      break;
    case "m": // minutes
      timeDifference = value * 60 * 1000; // minutes to milliseconds
      break;
    default:
      throw new Error("Invalid time unit");
  }

  // Subtract the time difference from the current date
  return new Date(currentDate.getTime() - timeDifference);
}
