import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllContentItems } from "@/hooks/useContentItems";
import {
  formatContentType,
  formatDate,
  formatDateRange,
  getTypeSpecificFieldsSummary,
} from "@/lib/contentFormatting";
import { expandItemDateRanges } from "@/utils/dateRange";
import {
  AlertCircle,
  ArrowLeft,
  Calendar as CalendarIcon,
  Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ContentItem } from "../backend";

type FilterType = "all" | "event" | "scareZone" | "show" | "attraction";

export function CalendarPage() {
  const { data: contentItems = [], isLoading, error } = useGetAllContentItems();
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const dateRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const filteredItems =
    filter === "all"
      ? contentItems
      : contentItems.filter((item) => filter in item.customType);

  // Group items by date, expanding date ranges to include all days
  const itemsByDate = new Map<string, ContentItem[]>();
  for (const item of filteredItems) {
    const dateKeys = expandItemDateRanges(item.dates);
    for (const key of dateKeys) {
      if (!itemsByDate.has(key)) {
        itemsByDate.set(key, []);
      }
      itemsByDate.get(key)!.push(item);
    }
  }

  const sortedDates = Array.from(itemsByDate.keys()).sort((a, b) => {
    const [aYear, aMonth, aDay] = a.split("-").map(Number);
    const [bYear, bMonth, bDay] = b.split("-").map(Number);
    if (aYear !== bYear) return aYear - bYear;
    if (aMonth !== bMonth) return aMonth - bMonth;
    return aDay - bDay;
  });

  // Handle URL hash navigation to specific dates
  useEffect(() => {
    if (isLoading || sortedDates.length === 0) return;

    const hash = window.location.hash;
    if (hash.startsWith("#date=")) {
      const dateParam = hash.substring(6); // Remove '#date='
      // Support both formats: 2028-8-30 and 2028-08-30
      const normalizedDate = dateParam
        .split("-")
        .map((part, idx) => {
          if (idx === 0) return part; // year as-is
          return part.padStart(2, "0"); // pad month and day
        })
        .join("-");

      const targetRef = dateRefs.current.get(normalizedDate);
      if (targetRef) {
        setTimeout(() => {
          targetRef.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [isLoading, sortedDates]);

  const handleBack = () => {
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className="border-destructive/50 hover:bg-destructive/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-destructive bloody-text mb-2">
              Event Calendar
            </h1>
            <p className="text-muted-foreground">
              View all scheduled events, attractions, shows, and scare zones
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load calendar data. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as FilterType)}
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="scareZone">Scare Zones</TabsTrigger>
              <TabsTrigger value="show">Shows</TabsTrigger>
              <TabsTrigger value="attraction">Attractions</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-destructive" />
          </div>
        ) : filteredItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No items found for the selected filter.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {sortedDates.map((dateKey) => {
              const items = itemsByDate.get(dateKey)!;
              const [year, month, day] = dateKey.split("-").map(Number);
              const dateObj = {
                year: BigInt(year),
                month: BigInt(month),
                day: BigInt(day),
              };

              return (
                <Card
                  key={dateKey}
                  className="border-destructive/30"
                  ref={(el) => {
                    if (el) {
                      dateRefs.current.set(dateKey, el);
                    } else {
                      dateRefs.current.delete(dateKey);
                    }
                  }}
                  id={`date-${dateKey}`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <CalendarIcon className="h-5 w-5" />
                      {formatDate(dateObj)}
                    </CardTitle>
                    <CardDescription>
                      {items.length} item{items.length !== 1 ? "s" : ""}{" "}
                      scheduled
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {items.map((item) => (
                        <button
                          key={item.id.toString()}
                          type="button"
                          className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-destructive/50 transition-colors cursor-pointer w-full text-left"
                          onClick={() => setSelectedItem(item)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">
                                {item.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className="border-destructive/50"
                              >
                                {formatContentType(item.customType)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">
                            View Details →
                          </span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {selectedItem && (
          <Dialog
            open={!!selectedItem}
            onOpenChange={(open) => !open && setSelectedItem(null)}
          >
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <DialogTitle className="text-2xl text-destructive">
                    {selectedItem.name}
                  </DialogTitle>
                  <Badge variant="outline" className="border-destructive/50">
                    {formatContentType(selectedItem.customType)}
                  </Badge>
                </div>
                <DialogDescription className="text-base whitespace-pre-wrap">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div>
                  <h4 className="font-semibold mb-2 text-destructive">
                    Schedule
                  </h4>
                  {selectedItem.useMainHauntSchedule ? (
                    <p className="text-sm text-muted-foreground">
                      Uses main haunt schedule
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {selectedItem.dates.map((range) => (
                        <p key={formatDateRange(range)} className="text-sm">
                          {formatDateRange(range)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-destructive">
                    Details
                  </h4>
                  <p className="text-sm">
                    {getTypeSpecificFieldsSummary(selectedItem)}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
