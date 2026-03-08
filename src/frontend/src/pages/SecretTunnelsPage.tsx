import { EmployeeGuard } from "@/components/auth/EmployeeGuard";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useRoomAssignments,
  useTunnelMaps,
  useTunnelSchedules,
} from "@/hooks/useTunnelData";
import {
  AlertTriangle,
  Clock,
  Loader2,
  Map as MapIcon,
  MapPin,
  Users,
} from "lucide-react";

export function SecretTunnelsPage() {
  const {
    data: tunnelMaps,
    isLoading: mapsLoading,
    error: mapsError,
  } = useTunnelMaps();
  const {
    data: roomAssignments,
    isLoading: assignmentsLoading,
    error: assignmentsError,
  } = useRoomAssignments();
  const {
    data: tunnelSchedules,
    isLoading: schedulesLoading,
    error: schedulesError,
  } = useTunnelSchedules();

  const isLoading = mapsLoading || assignmentsLoading || schedulesLoading;
  const hasError = mapsError || assignmentsError || schedulesError;

  return (
    <EmployeeGuard>
      <EmployeeLayout
        title="Secret Tunnels"
        breadcrumbs={[{ label: "Secret Tunnels" }]}
      >
        <div className="space-y-8">
          {/* Warning Alert */}
          <Alert className="border-employee-orange bg-employee-bg-darker">
            <AlertTriangle className="h-5 w-5 text-employee-orange" />
            <AlertTitle className="text-employee-text">
              Restricted Access - Employees Only
            </AlertTitle>
            <AlertDescription className="text-employee-text/80">
              This section contains confidential backstage infrastructure
              information. The secret tunnels provide hidden access to shows,
              processions, and backstage facilities. All information is for
              internal use only and must not be shared with guests.
            </AlertDescription>
          </Alert>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-employee-orange" />
                <p className="text-employee-text">
                  Loading tunnel information...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {hasError && !isLoading && (
            <Alert className="border-employee-red bg-employee-bg-darker">
              <AlertTriangle className="h-5 w-5 text-employee-red" />
              <AlertTitle className="text-employee-text">
                Error Loading Data
              </AlertTitle>
              <AlertDescription className="text-employee-text/80">
                Unable to load tunnel information. Please try again later or
                contact IT support.
              </AlertDescription>
            </Alert>
          )}

          {/* Tunnel Maps Section */}
          {!isLoading && !hasError && (
            <>
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <MapIcon className="h-6 w-6 text-employee-orange" />
                  <h2 className="text-2xl font-bold text-employee-text">
                    Tunnel Maps & Layouts
                  </h2>
                </div>

                {/* Overview Map Image */}
                <Card className="bg-employee-bg-darker border-employee-grey/30 mb-6">
                  <CardHeader>
                    <CardTitle className="text-employee-text">
                      Tunnel System Overview
                    </CardTitle>
                    <CardDescription className="text-employee-text/60">
                      Complete underground network connecting all backstage
                      areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full aspect-[3/2] bg-employee-bg-dark rounded-lg overflow-hidden">
                      <img
                        src="/assets/generated/tunnel-map-overview.dim_1200x800.png"
                        alt="Tunnel System Overview Map"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Tunnel Maps Data */}
                {tunnelMaps && tunnelMaps.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {tunnelMaps.map((map) => (
                      <Card
                        key={Number(map.id)}
                        className="bg-employee-bg-darker border-employee-grey/30"
                      >
                        <CardHeader>
                          <CardTitle className="text-employee-text">
                            {map.name}
                          </CardTitle>
                          <CardDescription className="text-employee-text/60">
                            {map.rooms.length} rooms • {map.connections.length}{" "}
                            connections
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-employee-text mb-2">
                              Rooms:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {map.rooms.map((room) => (
                                <Badge
                                  key={Number(room.id)}
                                  variant="outline"
                                  className="border-employee-grey text-employee-text"
                                >
                                  {room.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-employee-text mb-2">
                              Connections:
                            </h4>
                            <div className="space-y-1 text-sm text-employee-text/80">
                              {map.connections.slice(0, 3).map((conn) => (
                                <div
                                  key={conn.tunnelSection}
                                  className="flex items-center gap-2"
                                >
                                  <MapPin className="h-3 w-3 text-employee-orange" />
                                  <span>{conn.tunnelSection}</span>
                                </div>
                              ))}
                              {map.connections.length > 3 && (
                                <p className="text-employee-text/60 italic">
                                  +{map.connections.length - 3} more connections
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-employee-bg-darker border-employee-grey/30">
                    <CardContent className="py-8 text-center text-employee-text/60">
                      No tunnel maps available. Contact facilities management
                      for access.
                    </CardContent>
                  </Card>
                )}
              </section>

              <Separator className="bg-employee-grey/30" />

              {/* Room Directory Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-employee-orange" />
                  <h2 className="text-2xl font-bold text-employee-text">
                    Room Directory
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {/* Makeup Rooms */}
                  <Card className="bg-employee-bg-darker border-employee-grey/30">
                    <CardHeader>
                      <CardTitle className="text-employee-text text-lg">
                        Makeup Rooms
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src="/assets/generated/makeup-room.dim_800x600.png"
                        alt="Makeup Room"
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <p className="text-sm text-employee-text/80">
                        Professional makeup stations for scare actors and
                        performers. Equipped with lighting and supplies.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Lounge Areas */}
                  <Card className="bg-employee-bg-darker border-employee-grey/30">
                    <CardHeader>
                      <CardTitle className="text-employee-text text-lg">
                        Lounge Areas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src="/assets/generated/lounge-area.dim_800x600.png"
                        alt="Lounge Area"
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <p className="text-sm text-employee-text/80">
                        Break rooms with seating, refreshments, and rest areas
                        for staff between shifts.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Costume Rooms */}
                  <Card className="bg-employee-bg-darker border-employee-grey/30">
                    <CardHeader>
                      <CardTitle className="text-employee-text text-lg">
                        Costume Rooms
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src="/assets/generated/costume-room.dim_800x600.png"
                        alt="Costume Room"
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <p className="text-sm text-employee-text/80">
                        Storage and fitting areas for all character costumes,
                        props, and accessories.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Access Points */}
                  <Card className="bg-employee-bg-darker border-employee-grey/30">
                    <CardHeader>
                      <CardTitle className="text-employee-text text-lg">
                        Access Points
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-32 bg-employee-bg-dark rounded-md mb-3 flex items-center justify-center">
                        <MapPin className="h-12 w-12 text-employee-orange/50" />
                      </div>
                      <p className="text-sm text-employee-text/80">
                        Hidden entrances to haunted houses, show areas, and
                        procession routes.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator className="bg-employee-grey/30" />

              {/* Room Assignments Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-employee-orange" />
                  <h2 className="text-2xl font-bold text-employee-text">
                    Room Assignments
                  </h2>
                </div>

                {roomAssignments && roomAssignments.length > 0 ? (
                  <Card className="bg-employee-bg-darker border-employee-grey/30">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-employee-grey/30 hover:bg-employee-bg-dark">
                            <TableHead className="text-employee-text">
                              Staff Member
                            </TableHead>
                            <TableHead className="text-employee-text">
                              Room ID
                            </TableHead>
                            <TableHead className="text-employee-text">
                              Role
                            </TableHead>
                            <TableHead className="text-employee-text">
                              Shift Time
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {roomAssignments.flat().map((assignment) => (
                            <TableRow
                              key={assignment.staffMember}
                              className="border-employee-grey/30 hover:bg-employee-bg-dark"
                            >
                              <TableCell className="text-employee-text">
                                {assignment.staffMember}
                              </TableCell>
                              <TableCell className="text-employee-text/80">
                                #{Number(assignment.roomId)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="border-employee-orange text-employee-orange"
                                >
                                  {assignment.role}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-employee-text/80">
                                {assignment.shiftTime}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-employee-bg-darker border-employee-grey/30">
                    <CardContent className="py-8 text-center text-employee-text/60">
                      No room assignments scheduled. Check back closer to event
                      dates.
                    </CardContent>
                  </Card>
                )}
              </section>

              <Separator className="bg-employee-grey/30" />

              {/* Schedules Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="h-6 w-6 text-employee-orange" />
                  <h2 className="text-2xl font-bold text-employee-text">
                    Tunnel Usage Schedules
                  </h2>
                </div>

                {tunnelSchedules && tunnelSchedules.length > 0 ? (
                  <div className="grid gap-6">
                    {tunnelSchedules.map((schedule) => (
                      <Card
                        key={Number(schedule.id)}
                        className="bg-employee-bg-darker border-employee-grey/30"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-employee-text">
                                {schedule.date} - {schedule.shift}
                              </CardTitle>
                              {schedule.specialEvent && (
                                <CardDescription className="text-employee-orange mt-1">
                                  Special Event: {schedule.specialEvent}
                                </CardDescription>
                              )}
                            </div>
                            <Badge className="bg-employee-orange text-white">
                              {schedule.roomAssignments.length} assignments
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Room Schedules */}
                          {schedule.roomSchedules.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-employee-text mb-3">
                                Room Time Slots:
                              </h4>
                              <div className="grid gap-2 md:grid-cols-2">
                                {schedule.roomSchedules.map((roomSchedule) => (
                                  <div
                                    key={String(roomSchedule.roomId)}
                                    className="bg-employee-bg-dark p-3 rounded-md border border-employee-grey/20"
                                  >
                                    <p className="text-sm font-medium text-employee-text mb-2">
                                      Room #{Number(roomSchedule.roomId)}
                                    </p>
                                    <div className="space-y-1">
                                      {roomSchedule.timeSlots.map((slot) => (
                                        <div
                                          key={`${slot.startTime}-${slot.endTime}`}
                                          className="flex items-center gap-2 text-xs text-employee-text/80"
                                        >
                                          <Clock className="h-3 w-3 text-employee-orange" />
                                          <span>
                                            {slot.startTime} - {slot.endTime}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-employee-bg-darker border-employee-grey/30">
                    <CardContent className="py-8 text-center text-employee-text/60">
                      No schedules available. Schedules will be posted before
                      event dates.
                    </CardContent>
                  </Card>
                )}
              </section>

              {/* Additional Info */}
              <Alert className="border-employee-grey/30 bg-employee-bg-darker">
                <AlertTriangle className="h-5 w-5 text-employee-orange" />
                <AlertTitle className="text-employee-text">
                  Important Safety Information
                </AlertTitle>
                <AlertDescription className="text-employee-text/80">
                  All tunnels are soundproof to prevent guests from hearing
                  backstage activity. Emergency exits are clearly marked. Always
                  carry your employee ID when using tunnel access. Report any
                  maintenance issues immediately to facilities management.
                </AlertDescription>
              </Alert>
            </>
          )}
        </div>
      </EmployeeLayout>
    </EmployeeGuard>
  );
}
