import { EmployeeGuard } from '@/components/auth/EmployeeGuard';
import { EmployeeLayout } from '@/components/layout/EmployeeLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEmployeeUpcomingEvents } from '@/hooks/useEmployeeEvents';
import { Calendar, Lock, Unlock, Loader2 } from 'lucide-react';

export function EmployeeUpcomingEventsPage() {
  const { data: events, isLoading, error } = useEmployeeUpcomingEvents();

  const getEventImage = (title: string) => {
    if (title.includes('Happily Scary After')) {
      return '/assets/generated/happily-scary-after.dim_800x600.png';
    } else if (title.includes('Flyn')) {
      return '/assets/generated/flyn-character.dim_600x800.png';
    } else if (title.includes('Secret entrance')) {
      return '/assets/generated/shows-entrance-locked.dim_600x800.png';
    }
    return '/assets/generated/tcea-scream-park-logo.dim_512x512.png';
  };

  const getEventRoute = (title: string) => {
    if (title.includes('Happily Scary After')) {
      return '#/employee/happily-scary-after';
    } else if (title.includes('Flyn')) {
      return '#/employee/flyn-character';
    } else if (title.includes('Secret entrance')) {
      return '#/employee/shows-entrance';
    }
    return null;
  };

  return (
    <EmployeeGuard>
      <EmployeeLayout
        title="Upcoming Events & Features"
        breadcrumbs={[{ label: 'Upcoming Events' }]}
      >
        <p className="text-employee-text/80 mb-8 text-lg">
          Exclusive preview of upcoming attractions and features. Some events are locked until their scheduled release dates.
        </p>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-employee-orange" />
          </div>
        )}

        {error && (
          <div className="text-employee-red text-center py-12">
            Error loading events. Please try again later.
          </div>
        )}

        {events && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => {
              const route = getEventRoute(event.title);
              return (
                <Card
                  key={index}
                  className={`bg-employee-bg-darker border-employee-grey/30 transition-all ${
                    event.isUnlocked
                      ? 'hover:border-employee-orange hover:shadow-lg hover:shadow-employee-orange/20'
                      : 'opacity-75'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-employee-text flex items-center gap-2">
                        {event.isUnlocked ? (
                          <Unlock className="h-5 w-5 text-employee-orange" />
                        ) : (
                          <Lock className="h-5 w-5 text-employee-grey" />
                        )}
                        {event.title}
                      </CardTitle>
                      <Badge
                        variant={event.isUnlocked ? 'default' : 'outline'}
                        className={
                          event.isUnlocked
                            ? 'bg-employee-orange text-white'
                            : 'border-employee-grey text-employee-grey'
                        }
                      >
                        {event.isUnlocked ? 'Available' : 'Locked'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      src={getEventImage(event.title)}
                      alt={event.title}
                      className={`w-full h-48 object-cover rounded-lg ${
                        !event.isUnlocked ? 'grayscale' : ''
                      }`}
                    />
                    <div className="flex items-center gap-2 text-employee-text/60">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {event.month}/{event.day}/{event.year}
                      </span>
                    </div>
                    <p className="text-employee-text/80">{event.description}</p>
                    <div className="pt-2 border-t border-employee-grey/30">
                      <p className="text-sm text-employee-orange">
                        {event.featureTransactionType}
                      </p>
                    </div>
                    {event.isUnlocked && route && (
                      <Button
                        onClick={() => (window.location.hash = route)}
                        className="w-full bg-employee-orange hover:bg-employee-orange/90 text-white"
                      >
                        View Details
                      </Button>
                    )}
                    {!event.isUnlocked && (
                      <div className="text-center text-employee-grey text-sm py-2">
                        Unlocks on {event.month}/{event.day}/{event.year}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </EmployeeLayout>
    </EmployeeGuard>
  );
}
