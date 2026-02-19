import { useIsEmployee } from '@/hooks/useAuthz';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function EmployeePortalLink() {
  const { identity } = useInternetIdentity();
  const { data: isEmployee, isLoading } = useIsEmployee();

  // Only show to authenticated employees
  if (!identity || isLoading || !isEmployee) {
    return null;
  }

  const handleNavigate = () => {
    window.location.hash = '#/employee/secret-tunnels';
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto bg-employee-bg-darker border-employee-orange/50 shadow-lg shadow-employee-orange/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-employee-orange/20 rounded-lg">
                <Lock className="h-6 w-6 text-employee-orange" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-employee-text mb-1">Employee Portal</h3>
                <p className="text-sm text-employee-text/70">
                  Access secret tunnels, backstage areas, and employee resources
                </p>
              </div>
            </div>
            <Button
              onClick={handleNavigate}
              className="bg-employee-orange hover:bg-employee-orange/90 text-white shrink-0"
            >
              Enter Portal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
