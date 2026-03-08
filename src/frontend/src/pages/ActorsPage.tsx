import { AccessDeniedScreen } from "@/components/auth/AccessDeniedScreen";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Shield, Users } from "lucide-react";

export function ActorsPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  const { data: staffingCounts, isLoading } = useQuery({
    queryKey: ["staffingCounts"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getStaffingCounts();
    },
    enabled: !!actor && !actorFetching && !!identity,
  });

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const handleBack = () => {
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error("Login error:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-6 text-destructive hover:text-destructive/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="bg-card/90 backdrop-blur-sm border-destructive/20">
            <CardContent className="py-12 space-y-6 text-center">
              <Shield className="h-16 w-16 text-destructive mx-auto" />
              <h2 className="text-3xl font-bold text-destructive">
                Access Restricted
              </h2>
              <p className="text-muted-foreground text-lg">
                This page is only accessible to authenticated users. Please log
                in to view actor staffing information.
              </p>
              <Button
                onClick={handleLogin}
                disabled={isLoggingIn}
                size="lg"
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login to Continue"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading || actorFetching) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-destructive animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 text-destructive hover:text-destructive/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="bg-card/90 backdrop-blur-sm border-destructive/20">
          <CardHeader>
            <CardTitle className="text-4xl text-destructive bloody-text flex items-center gap-3">
              <Users className="h-10 w-10" />
              Actors Only - Staffing Information
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Private staffing structure for TCEA Scream Park actors
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <Alert
              variant="destructive"
              className="border-2 border-destructive bg-destructive/10"
            >
              <Shield className="h-5 w-5" />
              <AlertTitle className="text-xl font-bold">
                CONFIDENTIAL INFORMATION
              </AlertTitle>
              <AlertDescription>
                This information is for authorized actors only. Do not share
                staffing details with guests or unauthorized personnel.
              </AlertDescription>
            </Alert>

            {staffingCounts && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/60 border-destructive/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-destructive flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Haunted Houses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Total Actors:
                      </span>
                      <span className="text-2xl font-bold text-destructive">
                        {Number(staffingCounts.hauntedHouseActors)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Supervisors:
                      </span>
                      <span className="text-2xl font-bold text-destructive">
                        {Number(staffingCounts.hauntedHouseSupervisors)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground pt-2">
                      All 14 actors work together in one house with 3
                      supervisors overseeing operations.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/60 border-destructive/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-destructive flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Outdoor Zones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Total Actors:
                      </span>
                      <span className="text-2xl font-bold text-destructive">
                        {Number(staffingCounts.zoneActors)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Supervisors:
                      </span>
                      <span className="text-2xl font-bold text-destructive">
                        {Number(staffingCounts.zoneSupervisors)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground pt-2">
                      All 16 actors work across outdoor zones with 5 supervisors
                      managing the areas.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/60 border-destructive/30 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-2xl text-destructive flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Dancers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Supervisors:
                      </span>
                      <span className="text-2xl font-bold text-destructive">
                        {Number(staffingCounts.dancerSupervisors)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground pt-2">
                      Dancers have 3 dedicated supervisors overseeing
                      choreography, performances, and safety.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
