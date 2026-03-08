import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import type { PassOption } from "./passOptions";

interface PassSelectorProps {
  passes: PassOption[];
}

export function PassSelector({ passes }: PassSelectorProps) {
  const [selectedPassId, setSelectedPassId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSecurePass = () => {
    if (selectedPassId) {
      const selectedPass = passes.find((p) => p.id === selectedPassId);
      if (selectedPass) {
        setConfirmed(true);
        // Reset confirmation after 5 seconds
        setTimeout(() => setConfirmed(false), 5000);
      }
    }
  };

  const selectedPass = passes.find((p) => p.id === selectedPassId);

  return (
    <div className="space-y-6">
      {/* Pass Options */}
      <div className="space-y-3">
        {passes.map((pass) => (
          <label
            key={pass.id}
            className={`block cursor-pointer transition-all ${
              selectedPassId === pass.id
                ? "ring-2 ring-destructive ring-offset-2 ring-offset-background"
                : "hover:ring-1 hover:ring-destructive/50"
            }`}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-destructive/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="pass-selection"
                    value={pass.id}
                    checked={selectedPassId === pass.id}
                    onChange={(e) => {
                      setSelectedPassId(e.target.value);
                      setConfirmed(false);
                    }}
                    className="mt-1 h-4 w-4 text-destructive focus:ring-destructive focus:ring-offset-background"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h4 className="font-bold text-lg text-foreground">
                        {pass.name}
                      </h4>
                      <span className="font-semibold text-destructive whitespace-nowrap">
                        {pass.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pass.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </label>
        ))}
      </div>

      {/* Secure Pass Button */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={handleSecurePass}
          disabled={!selectedPassId}
          size="lg"
          className="w-full max-w-md bg-destructive hover:bg-destructive/90 text-white font-bold text-lg py-6"
        >
          Secure Your Pass
        </Button>

        {/* Confirmation Message */}
        {confirmed && selectedPass && (
          <Alert className="bg-destructive/20 border-destructive max-w-md">
            <CheckCircle2 className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-foreground font-semibold">
              {selectedPass.name} selected! Your pass selection has been
              recorded.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
