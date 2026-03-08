import { EmployeeGuard } from "@/components/auth/EmployeeGuard";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEventUnlockStatus } from "@/hooks/useEventUnlockStatus";
import {
  Calendar,
  Loader2,
  Lock,
  MapPin,
  Shirt,
  Unlock,
  User,
} from "lucide-react";

export function FlynCharacterPage() {
  const { data: unlockStatus, isLoading } = useEventUnlockStatus();
  const isUnlocked = unlockStatus?.hasFlynAppearance || false;

  return (
    <EmployeeGuard>
      <EmployeeLayout
        title="Flyn Character"
        breadcrumbs={[
          { label: "Upcoming Events", href: "#/employee/upcoming-events" },
          { label: "Flyn Character" },
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
                {isUnlocked ? "Character Now Active" : "Debuting January 2030"}
              </AlertTitle>
              <AlertDescription className="text-employee-text/80 mt-2">
                {isUnlocked
                  ? "Flyn is now part of our character roster and available for meet-and-greets."
                  : "Flyn will join our character lineup in January 2030."}
              </AlertDescription>
            </Alert>

            {/* Main Image */}
            <div className="mb-8 rounded-lg overflow-hidden border border-employee-grey/30">
              <img
                src="/assets/generated/flyn-character.dim_600x800.png"
                alt="Flyn Character"
                className={`w-full h-auto ${!isUnlocked ? "grayscale" : ""}`}
              />
            </div>

            {/* Character Bio */}
            <Card className="bg-employee-bg-darker border-employee-grey/30 mb-6">
              <CardHeader>
                <CardTitle className="text-employee-text flex items-center gap-2">
                  <User className="h-5 w-5 text-employee-orange" />
                  Character Biography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-employee-text/80 leading-relaxed mb-4">
                  {isUnlocked
                    ? "Flyn is a mischievous trickster character who roams the park spreading chaos and laughter in equal measure. With a distinctive orange and black costume featuring LED accents, Flyn has quickly become a guest favorite. This high-energy character specializes in interactive photo opportunities and surprise appearances throughout the haunt."
                    : "Flyn is a new costume character currently in development. This mysterious figure will bring a unique energy to the park with an innovative costume design and interactive personality. Full character details will be revealed closer to the debut date."}
                </p>
                {!isUnlocked && (
                  <p className="text-employee-orange text-sm">
                    Character training materials and costume specifications will
                    be distributed to performers in late 2029.
                  </p>
                )}
              </CardContent>
            </Card>

            {isUnlocked && (
              <>
                {/* Appearance Schedule */}
                <Card className="bg-employee-bg-darker border-employee-grey/30 mb-6">
                  <CardHeader>
                    <CardTitle className="text-employee-text flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-employee-orange" />
                      Appearance Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-employee-text/80">
                      <p>
                        <strong className="text-employee-orange">
                          Friday-Sunday:
                        </strong>{" "}
                        7:00 PM - 11:00 PM (rotating 30-minute sets)
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          Special Events:
                        </strong>{" "}
                        Extended hours during peak season
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          Break Schedule:
                        </strong>{" "}
                        15-minute breaks every hour
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Meet-and-Greet Locations */}
                <Card className="bg-employee-bg-darker border-employee-grey/30 mb-6">
                  <CardHeader>
                    <CardTitle className="text-employee-text flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-employee-orange" />
                      Meet-and-Greet Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-employee-text/80 list-disc list-inside">
                      <li>Main Plaza Photo Spot - Primary location</li>
                      <li>Food Court Area - Roaming appearances</li>
                      <li>Merch Shop Entrance - Photo opportunities</li>
                      <li>Special Events Stage - Scheduled appearances</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Costume Details */}
                <Card className="bg-employee-bg-darker border-employee-grey/30 mb-6">
                  <CardHeader>
                    <CardTitle className="text-employee-text flex items-center gap-2">
                      <Shirt className="h-5 w-5 text-employee-orange" />
                      Costume & Equipment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-employee-text/80">
                      <p>
                        <strong className="text-employee-orange">
                          Costume Components:
                        </strong>{" "}
                        Full-body suit with LED accents, character head with
                        cooling system, gloves, and character shoes
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          Battery Pack:
                        </strong>{" "}
                        4-hour runtime, spare batteries available at costume
                        station
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          Maintenance:
                        </strong>{" "}
                        Daily cleaning required, LED system check before each
                        shift
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Character Interaction Guidelines */}
                <Card className="bg-employee-bg-darker border-employee-orange/50">
                  <CardHeader>
                    <CardTitle className="text-employee-text">
                      Character Interaction Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-employee-text/80">
                      <p>
                        <strong className="text-employee-orange">
                          Personality:
                        </strong>{" "}
                        Playful, energetic, mischievous but never mean-spirited
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          Interactions:
                        </strong>{" "}
                        Non-verbal communication only (gestures, poses, dance
                        moves)
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          Photo Protocol:
                        </strong>{" "}
                        Always pose enthusiastically, maintain character at all
                        times
                      </p>
                      <p>
                        <strong className="text-employee-orange">
                          Safety:
                        </strong>{" "}
                        Maintain clear sightlines, avoid running, stay in
                        designated areas
                      </p>
                      <p className="text-employee-red text-sm mt-4">
                        <strong>Important:</strong> Never remove character head
                        in guest areas. Use designated break rooms only.
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
