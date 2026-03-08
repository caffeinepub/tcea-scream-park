import type { Date_, EventDateRange } from "../backend";

/**
 * Generate a stable date key string from a Date_ object
 */
export function dateToKey(date: Date_): string {
  return `${date.year}-${date.month}-${date.day}`;
}

/**
 * Compare two Date_ objects
 * Returns: -1 if a < b, 0 if a === b, 1 if a > b
 */
function compareDates(a: Date_, b: Date_): number {
  if (Number(a.year) !== Number(b.year)) {
    return Number(a.year) - Number(b.year);
  }
  if (Number(a.month) !== Number(b.month)) {
    return Number(a.month) - Number(b.month);
  }
  return Number(a.day) - Number(b.day);
}

/**
 * Get the next date after the given date
 */
function getNextDate(date: Date_): Date_ {
  const year = Number(date.year);
  const month = Number(date.month);
  const day = Number(date.day);

  // Days in each month (non-leap year)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (isLeapYear) {
    daysInMonth[1] = 29;
  }

  let nextDay = day + 1;
  let nextMonth = month;
  let nextYear = year;

  if (nextDay > daysInMonth[month - 1]) {
    nextDay = 1;
    nextMonth += 1;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
  }

  return {
    year: BigInt(nextYear),
    month: BigInt(nextMonth),
    day: BigInt(nextDay),
  };
}

/**
 * Expand a date range into all individual dates (inclusive)
 * Returns an array of date keys for each day in the range
 */
export function expandDateRange(range: EventDateRange): string[] {
  const keys: string[] = [];
  let current = range.startDate;
  const end = range.endDate;

  // Safety limit to prevent infinite loops
  let iterations = 0;
  const maxIterations = 10000; // ~27 years worth of days

  while (compareDates(current, end) <= 0 && iterations < maxIterations) {
    keys.push(dateToKey(current));

    // If we've reached the end date, stop
    if (compareDates(current, end) === 0) {
      break;
    }

    current = getNextDate(current);
    iterations++;
  }

  return keys;
}

/**
 * Expand all date ranges for a content item into individual date keys
 */
export function expandItemDateRanges(dates: EventDateRange[]): string[] {
  const allKeys = new Set<string>();

  for (const range of dates) {
    const keys = expandDateRange(range);
    for (const key of keys) {
      allKeys.add(key);
    }
  }

  return Array.from(allKeys);
}
