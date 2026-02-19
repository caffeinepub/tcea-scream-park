import { EmployeeGuard } from '@/components/auth/EmployeeGuard';
import { EmployeeLayout } from '@/components/layout/EmployeeLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useEventUnlockStatus } from '@/hooks/useEventUnlockStatus';
import { Lock, Unlock, MapPin, Info, Loader2 } from 'lucide-react';
import { showsEntranceInfo } from '@/content/showsEntrance';

export function ShowsEntrancePage() {
  const { data: unlockStatus, isLoading } = useEventUnlockStatus();
  const isUnlocked = unlockStatus?.hasSecretEntrance || false;

  return (
    <EmployeeGuard>
      <EmployeeLayout
        title="Secret Entrance for Shows & Processions"
        breadcrumbs={[
          { label: 'Upcoming Events', href: '#/employee/upcoming-events' },
          { label: 'Shows Entrance' },
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
                  ? 'border-employee-orange bg-employee-bg-darker'
                  : 'border-employee-grey bg-employee-bg-darker'
              }`}
            >
              {isUnlocked ? (
                <Unlock className="h-5 w-5 text-employee-orange" />
              ) : (
                <Lock className="h-5 w-5 text-employee-grey" />
              )}
              <AlertTitle className="text-employee-text text-lg">
                {isUnlocked ? 'Entrance Now Available' : `Opening in ${showsEntranceInfo.unlockYear}`}
              </AlertTitle>
              <AlertDescription className="text-employee-text/80 mt-2">
                {isUnlocked
                  ? 'This entrance is now operational for all performers and crew.'
                  : `This entrance will be available starting ${showsEntranceInfo.unlockYear}.`}
              </AlertDescription>
            </Alert>

            {/* Main Image */}
            <div className="mb-8 rounded-lg overflow-hidden border border-employee-grey/30">
              <img
                src="/assets/generated/shows-entrance-locked.dim_600x800.png"
                alt="Shows Entrance"
                className={`w-full h-auto ${!isUnlocked ? 'grayscale' : ''}`}
              />
            </div>

            {/* Description */}
            <Card className="bg-employee-bg-darker border-employee-grey/30 mb-6">
              <CardHeader>
                <CardTitle className="text-employee-text flex items-center gap-2">
                  <Info className="h-5 w-5 text-employee-orange" />
                  {isUnlocked ? 'Entrance Details' : 'Coming Soon'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-employee-text/80 leading-relaxed">
                  {isUnlocked
                    ? showsEntranceInfo.unlockedDescription
                    : showsEntranceInfo.lockedDescription}
                </p>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card className="bg-employee-bg-darker border-employee-grey/30 mb-6">
              <CardHeader>
                <CardTitle className="text-employee-text flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-employee-orange" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-employee-text/80 leading-relaxed">
                  {showsEntranceInfo.locationDetails}
                </p>
              </CardContent>
            </Card>

            {/* Access Instructions (only if unlocked) */}
            {isUnlocked && (
              <Card className="bg-employee-bg-darker border-employee-orange/50">
                <CardHeader>
                  <CardTitle className="text-employee-text">Access Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-employee-text/80 leading-relaxed">
                    {showsEntranceInfo.accessInstructions}
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </EmployeeLayout>
    </EmployeeGuard>
  );
}
