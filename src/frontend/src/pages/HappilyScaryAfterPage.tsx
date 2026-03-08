import { EmployeeGuard } from "@/components/auth/EmployeeGuard";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEventUnlockStatus } from "@/hooks/useEventUnlockStatus";
import {
  Clock,
  Loader2,
  Lock,
  MapPin,
  Sparkles,
  Unlock,
  Users,
} from "lucide-react";

export function HappilyScaryAfterPage() {
  const { data: unlockStatus, isLoading } = useEventUnlockStatus();
  const isUnlocked = unlockStatus?.hasFireworks || false;

  return (
    <EmployeeGuard>
      <EmployeeLayout
        title="Happily Scary After"
        breadcrumbs={[
          { label: "Upcoming Events", href: "#/employee/upcoming-events" },
          { label: "Happily Scary After" },
        ]}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-employee-orange" />
          </div>
        ) : (
          <>
            {/* Status Alert */}
            <Alert
              className={`mb-8 ${
                isUnlocked
                  ? "border-employee-orange bg-employee-bg-darker"
                  : "border-employee-grey bg-employee-bg-darker"
              }`}
            >
              {isUnlocked ? (
                <Unlock className="h-5 w-5 text-employee-orange" />
              ) : (
                <Lock className="h-5 w-5 text-employee-grey" />
              )}
              <AlertTitle className="text-employee-text text-lg">
                {isUnlocked ? "Show Now Running" : "Premiering October 2029"}
              </AlertTitle>
              <AlertDescription className="text-employee-text/80 mt-2">
                {isUnlocked
                  ? "This spectacular fireworks show is now part of our nightly lineup."
                  : "This full-scale fireworks spectacular will debut in October 2029."}
              </AlertDescription>
            </Alert>

            {/* Main Image */}
            <div className="mb-8 rounded-lg overflow-hidden border border-employee-grey/30">
              <img
                src="/assets/generated/happily-scary-after.dim_800x600.png"
                alt="Happily Scary After Fireworks"
                className={`w-full h-auto ${!isUnlocked ? "grayscale" : ""}`}
              />
            </div>

            {/* Show Description */}
            <Card className="bg-employee-bg-darker border-employee-grey/30 mb-6">
              <CardHeader>
                <CardTitle className="text-employee-text flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-employee-orange" />
                  About the Show
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-employee-text/80 leading-relaxed mb-4">
                  {isUnlocked
                    ? '"Happily Scary After" is our signature fireworks spectacular that caps off each haunt night with a bang. This 20-minute pyrotechnic display features synchronized music, special effects, and a thrilling finale that guests will never forget.'
                    : '"Happily Scary After" will be our most ambitious fireworks show yet. Featuring cutting-edge pyrotechnics, synchronized music, and special effects, this 20-minute spectacular will become the perfect finale to every haunt night.'}
                </p>
                {!isUnlocked && (
                  <p className="text-employee-orange text-sm">
                    Full show details and employee coordination information will
                    be available closer to the premiere date.
                  </p>
                )}
              </CardContent>
            </Card>

            {isUnlocked && (
              <>
                {/* Show Schedule */}
                <Card className="bg-employee-bg-darker border-employee-grey/30 mb-6">
                  <CardHeader>
                    <CardTitle className="text-employee-text flex items-center gap-2">
                      <Clock className="h-5 w-5 text-employee-orange" />
                      Show Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-employee-text/80">
                      <p>
                        <strong className="text-employee-orange">
                          Nightly:
                        </strong>{" "}
                        10:30 PM (weather permitting)
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          Duration:
                        </strong>{" "}
                        20 minutes
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          Rain Date Policy:
                        </strong>{" "}
                        Show will be rescheduled to the following night if
                        weather conditions are unsafe
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Viewing Locations */}
                <Card className="bg-employee-bg-darker border-employee-grey/30 mb-6">
                  <CardHeader>
                    <CardTitle className="text-employee-text flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-employee-orange" />
                      Best Viewing Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-employee-text/80 list-disc list-inside">
                      <li>
                        Main Plaza (center stage area) - Best overall view
                      </li>
                      <li>North Lawn - Family-friendly viewing area</li>
                      <li>VIP Terrace - Reserved for pass holders</li>
                      <li>Food Court Patio - Viewing with dining options</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Employee Coordination */}
                <Card className="bg-employee-bg-darker border-employee-orange/50">
                  <CardHeader>
                    <CardTitle className="text-employee-text flex items-center gap-2">
                      <Users className="h-5 w-5 text-employee-orange" />
                      Employee Coordination
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-employee-text/80">
                      <p>
                        <strong className="text-employee-orange">
                          Pre-Show (10:00 PM):
                        </strong>{" "}
                        All outdoor scare zones pause operations. Actors move to
                        designated safe zones.
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          During Show (10:30-10:50 PM):
                        </strong>{" "}
                        Crowd control teams manage viewing areas. Security
                        monitors all exits.
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          Post-Show (10:50 PM):
                        </strong>{" "}
                        Resume normal operations. Assist guests with exit
                        routes.
                      </p>
                      <p className="text-employee-red text-sm mt-4">
                        <strong>Safety Note:</strong> All employees must wear
                        ear protection during the show. Earplugs available at
                        employee stations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        )}
      </EmployeeLayout>
    </EmployeeGuard>
  );
}
