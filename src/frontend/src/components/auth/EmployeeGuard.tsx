import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useIsEmployee } from "@/hooks/useAuthz";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Loader2, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";

interface EmployeeGuardProps {
  children: ReactNode;
}

export function EmployeeGuard({ children }: EmployeeGuardProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isEmployee, isLoading } = useIsEmployee();

  // Not authenticated
  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert className="max-w-md border-employee-orange bg-employee-bg-darker">
          <ShieldAlert className="h-5 w-5 text-employee-orange" />
          <AlertTitle className="text-employee-text">
            Employee Access Required
          </AlertTitle>
          <AlertDescription className="text-employee-text/80 mt-2">
            This area is restricted to TCEA employees only. Please log in with
            your employee credentials to continue.
          </AlertDescription>
          <Button
            onClick={login}
            disabled={loginStatus === "logging-in"}
            className="mt-4 bg-employee-orange hover:bg-employee-orange/90 text-white"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Employee Login"
            )}
          </Button>
        </Alert>
      </div>
    );
  }

  // Loading employee status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-employee-orange" />
          <p className="text-employee-text">Verifying employee access...</p>
        </div>
      </div>
    );
  }

  // Not an employee
  if (!isEmployee) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert className="max-w-md border-employee-red bg-employee-bg-darker">
          <ShieldAlert className="h-5 w-5 text-employee-red" />
          <AlertTitle className="text-employee-text">Access Denied</AlertTitle>
          <AlertDescription className="text-employee-text/80 mt-2">
            You do not have employee permissions to access this area. This
            section is restricted to TCEA staff members only.
          </AlertDescription>
          <Button
            onClick={() => {
              window.location.hash = "";
            }}
            variant="outline"
            className="mt-4 border-employee-grey text-employee-text hover:bg-employee-bg-dark"
          >
            Return to Home
          </Button>
        </Alert>
      </div>
    );
  }

  // Authorized employee
  return <>{children}</>;
}
