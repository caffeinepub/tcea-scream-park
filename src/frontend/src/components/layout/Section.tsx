import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  icon,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 scroll-mt-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            {icon}
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-destructive">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          <Separator className="mt-6 max-w-xs mx-auto bg-destructive/30" />
        </div>
        {children}
      </div>
    </section>
  );
}
