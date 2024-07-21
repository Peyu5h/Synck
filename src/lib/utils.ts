import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateHandler = (date: Date) => {
  let now = moment();
  let momentDate = moment(date);
  let time = momentDate.fromNow(true);
  let dateByHourAndMin = momentDate.format("HH:mm");

  const convertTo12HourFormat = (time: string) => {
    return moment(time, "HH:mm").format("h:mm A");
  };

  const getDay = () => {
    let days = time.split(" ")[0];
    if (Number(days) < 8) {
      return momentDate.format("dddd");
    } else {
      return momentDate.format("DD/MM/YYYY");
    }
  };

  if (time === "a few seconds") {
    return "Just now";
  }

  if (time.search("minute") !== -1) {
    let mins = time.split(" ")[0];
    if (mins === "a") {
      return "1 min ago";
    } else {
      return `${mins} min ago`;
    }
  }

  if (time.search("hour") !== -1) {
    let hours = time.split(" ")[0];
    if (hours === "an" || hours === "a") {
      return "1 hr ago";
    } else {
      return `${hours} hrs ago`;
    }
  }

  if (time === "a day") {
    return "Yesterday";
  }

  if (time.search("days") !== -1) {
    let days = time.split(" ")[0];
    if (Number(days) < 8) {
      return getDay();
    } else {
      return momentDate.format("DD/MM/YYYY");
    }
  }

  if (time.search("week") !== -1) {
    let weeks = time.split(" ")[0];
    if (weeks === "a") {
      return "1 week ago";
    } else {
      return `${weeks} weeks ago`;
    }
  }

  if (time.search("month") !== -1) {
    let months = time.split(" ")[0];
    if (months === "a") {
      return "1 month ago";
    } else {
      return `${months} months ago`;
    }
  }

  if (time.search("year") !== -1) {
    let years = time.split(" ")[0];
    if (years === "a") {
      return "1 year ago";
    } else {
      return `${years} years ago`;
    }
  }

  return momentDate.format("DD/MM/YYYY");
};

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}
