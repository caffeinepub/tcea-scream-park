import { EmployeeGuard } from "@/components/auth/EmployeeGuard";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tceaTunnelsContent } from "@/content/tceaTunnels";
import { Armchair, Bed, MapPin, ShieldAlert, Tv, Utensils } from "lucide-react";

export function TCEATunnelsPage() {
  return (
    <EmployeeGuard>
      <EmployeeLayout
        title="TCEA Tunnels"
        breadcrumbs={[{ label: "TCEA Tunnels" }]}
      >
        {/* Header Image */}
        <div className="mb-8 rounded-lg overflow-hidden border border-employee-grey/30">
          <img
            src="/assets/generated/tcea-tunnels-header.dim_1200x400.png"
            alt="TCEA Tunnels"
            className="w-full h-auto"
          />
        </div>

        {/* Secret Entrance Alert */}
        <Alert className="mb-8 border-employee-orange bg-employee-bg-darker">
          <ShieldAlert className="h-5 w-5 text-employee-orange" />
          <AlertTitle className="text-employee-text text-lg">
            {tceaTunnelsContent.secretEntrance.title}
          </AlertTitle>
          <AlertDescription className="text-employee-text/80 mt-2 space-y-2">
            <p>
              <strong className="text-employee-orange">Location:</strong>{" "}
              {tceaTunnelsContent.secretEntrance.location}
            </p>
            <p>
              <strong className="text-employee-orange">Access:</strong>{" "}
              {tceaTunnelsContent.secretEntrance.accessInstructions}
            </p>
            <p className="text-employee-red">
              <strong>Security Note:</strong>{" "}
              {tceaTunnelsContent.secretEntrance.securityNotes}
            </p>
          </AlertDescription>
        </Alert>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Dorms */}
          <Card className="bg-employee-bg-darker border-employee-grey/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-employee-orange/20">
                  <Bed className="h-6 w-6 text-employee-orange" />
                </div>
                <CardTitle className="text-employee-text">
                  {tceaTunnelsContent.dorms.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="/assets/generated/tcea-dorms.dim_800x600.png"
                alt="Employee Dormitories"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-employee-text/80 leading-relaxed">
                {tceaTunnelsContent.dorms.description}
              </p>
            </CardContent>
          </Card>

          {/* Food */}
          <Card className="bg-employee-bg-darker border-employee-grey/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-employee-orange/20">
                  <Utensils className="h-6 w-6 text-employee-orange" />
                </div>
                <CardTitle className="text-employee-text">
                  {tceaTunnelsContent.food.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="/assets/generated/tcea-food.dim_800x600.png"
                alt="Employee Cafeteria"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-employee-text/80 leading-relaxed">
                {tceaTunnelsContent.food.description}
              </p>
            </CardContent>
          </Card>

          {/* TV Room */}
          <Card className="bg-employee-bg-darker border-employee-grey/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-employee-orange/20">
                  <Tv className="h-6 w-6 text-employee-orange" />
                </div>
                <CardTitle className="text-employee-text">
                  {tceaTunnelsContent.tvRoom.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="/assets/generated/tcea-tv-room.dim_800x600.png"
                alt="TV Lounge"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-employee-text/80 leading-relaxed">
                {tceaTunnelsContent.tvRoom.description}
              </p>
            </CardContent>
          </Card>

          {/* Lounge */}
          <Card className="bg-employee-bg-darker border-employee-grey/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-employee-orange/20">
                  <Armchair className="h-6 w-6 text-employee-orange" />
                </div>
                <CardTitle className="text-employee-text">
                  {tceaTunnelsContent.lounge.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="/assets/generated/tcea-lounge.dim_800x600.png"
                alt="Staff Lounge"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-employee-text/80 leading-relaxed">
                {tceaTunnelsContent.lounge.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </EmployeeLayout>
    </EmployeeGuard>
  );
}
