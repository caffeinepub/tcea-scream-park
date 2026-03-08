import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export function AccessDeniedScreen() {
  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="max-w-2xl mx-auto border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-destructive" />
            <CardTitle className="text-2xl text-destructive">
              Access Denied
            </CardTitle>
          </div>
          <CardDescription>
            You do not have permission to access this content management system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              Only administrators can create, edit, or delete content. If you
              believe you should have access, please contact the system
              administrator.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
