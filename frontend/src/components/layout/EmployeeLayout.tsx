import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Home, ChevronRight } from 'lucide-react';

interface EmployeeLayoutProps {
  children: ReactNode;
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function EmployeeLayout({ children, title, breadcrumbs }: EmployeeLayoutProps) {
  return (
    <div data-employee-portal className="min-h-screen bg-employee-bg-primary">
      {/* Employee Portal Header */}
      <div className="bg-employee-bg-darker border-b border-employee-grey/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-employee-text/60">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.hash = ''}
              className="text-employee-text/60 hover:text-employee-orange hover:bg-employee-bg-dark"
            >
              <Home className="h-4 w-4 mr-1" />
              Guest Site
            </Button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-employee-orange font-medium">Employee Portal</span>
            {breadcrumbs && breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                {crumb.href ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.hash = crumb.href!}
                    className="text-employee-text/60 hover:text-employee-orange hover:bg-employee-bg-dark"
                  >
                    {crumb.label}
                  </Button>
                ) : (
                  <span className="text-employee-text">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>
          {title && (
            <h1 className="text-3xl font-bold text-employee-text mt-4 tracking-tight">
              {title}
            </h1>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>

      {/* Employee Footer */}
      <div className="bg-employee-bg-darker border-t border-employee-grey/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-employee-text/60">
            <p>TCEA Employee Portal - Confidential</p>
            <p>For internal use only</p>
          </div>
        </div>
      </div>
    </div>
  );
}
