import type {
  AgeRestriction,
  ContentItem,
  ContentType,
  Date_,
  EventDateRange,
  EventType,
  PerformanceType,
  ScareLevel,
  ZoneLocation,
} from "../backend";

export function formatDate(date: Date_): string {
  return `${date.month}/${date.day}/${date.year}`;
}

export function formatDateRange(range: EventDateRange): string {
  return `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`;
}

export function formatContentType(type: ContentType): string {
  if ("event" in type) return "Event";
  if ("scareZone" in type) return "Scare Zone";
  if ("show" in type) return "Show";
  if ("attraction" in type) return "Attraction";
  return "Unknown";
}

export function formatEventType(eventType: EventType): string {
  if (eventType === "seasonal") return "Seasonal";
  if (eventType === "special") return "Special";
  if (eventType === "holiday") return "Holiday";
  if (eventType === "specialEvent") return "Special Event";
  if (eventType === "convention") return "Convention";
  return eventType;
}

export function formatScareLevel(level: ScareLevel): string {
  if (level === "mild") return "Mild";
  if (level === "moderate") return "Moderate";
  if (level === "extreme") return "Extreme";
  return level;
}

export function formatZoneLocation(location: ZoneLocation): string {
  if (location === "indoor") return "Indoor";
  if (location === "outdoor") return "Outdoor";
  if (location === "both") return "Both";
  return location;
}

export function formatAgeRestriction(restriction: AgeRestriction): string {
  if (restriction === "none") return "None";
  if (restriction === "kids") return "Kids";
  if (restriction === "teens") return "Teens";
  if (restriction === "adultsOnly") return "Adults Only";
  return restriction;
}

export function formatPerformanceType(type: PerformanceType): string {
  if (type === "musical") return "Musical";
  if (type === "theatrical") return "Theatrical";
  if (type === "dance") return "Dance";
  if (type === "interactive") return "Interactive";
  if (type === "stunt") return "Stunt";
  return type;
}

export function getTypeSpecificFieldsSummary(item: ContentItem): string {
  const type = item.customType;

  if ("event" in type) {
    return `Type: ${formatEventType(type.event.eventType)}`;
  }

  if ("scareZone" in type) {
    const fields = type.scareZone;
    const parts = [
      `Scare Level: ${formatScareLevel(fields.scareLevel)}`,
      `Location: ${formatZoneLocation(fields.indoorOutdoor)}`,
    ];
    if (fields.yearIntroduced) {
      parts.push(`Introduced: ${fields.yearIntroduced}`);
    }
    return parts.join(" • ");
  }

  if ("show" in type) {
    const fields = type.show;
    const parts = [`Type: ${formatPerformanceType(fields.performanceType)}`];
    if (fields.yearIntroduced) {
      parts.push(`Introduced: ${fields.yearIntroduced}`);
    }
    return parts.join(" • ");
  }

  if ("attraction" in type) {
    const fields = type.attraction;
    const parts = [
      `Age: ${formatAgeRestriction(fields.ageRestriction)}`,
      `Guided Tour: ${fields.hasGuidedTour ? "Yes" : "No"}`,
    ];
    if (fields.yearIntroduced) {
      parts.push(`Introduced: ${fields.yearIntroduced}`);
    }
    return parts.join(" • ");
  }

  return "";
}
