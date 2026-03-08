import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generatedImages } from "@/content/generatedImages";
import { useSubmitUsherAudition } from "@/hooks/useAuditionSubmissions";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { AlertTriangle, CheckCircle, Loader2, UserCheck } from "lucide-react";
import { useState } from "react";

interface UsherAuditionSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsherAuditionSignupDialog({
  open,
  onOpenChange,
}: UsherAuditionSignupDialogProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const submitMutation = useSubmitUsherAudition();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    availability: "",
    experience: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ageError, setAgeError] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "age") {
      const ageNum = Number.parseInt(value);
      if (value && (Number.isNaN(ageNum) || ageNum < 16)) {
        setAgeError("You must be at least 16 years old to apply for Usher.");
      } else {
        setAgeError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    const ageNum = Number.parseInt(formData.age);
    if (Number.isNaN(ageNum) || ageNum < 16) {
      setAgeError("You must be at least 16 years old to apply for Usher.");
      return;
    }

    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        age: ageNum,
        phone: formData.phone,
        email: formData.email,
        availability: formData.availability,
        experience: formData.experience,
      });
      setSubmitted(true);
    } catch {
      // error handled by mutation state
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        age: "",
        phone: "",
        email: "",
        availability: "",
        experience: "",
      });
      setAgeError("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-card border-primary/30">
        <DialogHeader>
          <div className="relative w-full h-32 overflow-hidden rounded-lg mb-2">
            <img
              src={generatedImages.auditions.Usher}
              alt="Usher Auditions"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute bottom-2 left-2 flex gap-2">
              <Badge className="bg-primary text-primary-foreground text-xs">
                Ages 16+
              </Badge>
              <Badge
                variant="outline"
                className="border-primary/50 text-primary text-xs"
              >
                March 2–3, 2027
              </Badge>
            </div>
          </div>
          <DialogTitle className="text-2xl text-primary flex items-center gap-2">
            <UserCheck className="h-6 w-6" />
            Usher Auditions
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Audition dates:{" "}
            <strong className="text-foreground">
              March 2–3, 2027 | 2:00–7:00 PM
            </strong>
          </DialogDescription>
        </DialogHeader>

        {!isAuthenticated ? (
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              You must be logged in to submit an audition application. Please
              log in first.
            </AlertDescription>
          </Alert>
        ) : submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-bold text-foreground">
              Application Submitted!
            </h3>
            <p className="text-muted-foreground">
              Thank you for applying for the Usher position! We'll be in touch
              before the audition dates.
            </p>
            <Button
              onClick={handleClose}
              className="bg-primary hover:bg-primary/90"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-3 space-y-1 text-sm">
              <p className="font-semibold text-foreground">Usher Duties:</p>
              <ul className="text-muted-foreground space-y-0.5 list-disc list-inside">
                <li>Clean before and after the show</li>
                <li>Monitor guests and performers</li>
                <li>Report to Usher Supervisors</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="usher-name">Full Name *</Label>
                <Input
                  id="usher-name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="usher-age">Age * (16+)</Label>
                <Input
                  id="usher-age"
                  type="number"
                  min={16}
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  placeholder="Your age"
                  required
                  className="bg-background/50"
                />
                {ageError && (
                  <p className="text-xs text-destructive">{ageError}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="usher-phone">Phone Number *</Label>
                <Input
                  id="usher-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(555) 000-0000"
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="usher-email">Email *</Label>
                <Input
                  id="usher-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="usher-availability">
                Availability for March 2–3, 2027 (2–7 PM) *
              </Label>
              <Input
                id="usher-availability"
                value={formData.availability}
                onChange={(e) => handleChange("availability", e.target.value)}
                placeholder="e.g. Available both days, only March 2nd, etc."
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="usher-experience">Relevant Experience</Label>
              <Textarea
                id="usher-experience"
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                placeholder="Describe any relevant experience (customer service, event work, etc.)"
                rows={3}
                className="bg-background/50 resize-none"
              />
            </div>

            {submitMutation.isError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {submitMutation.error instanceof Error
                    ? submitMutation.error.message
                    : "Failed to submit application. Please try again."}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-muted-foreground/30"
                disabled={submitMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={
                  submitMutation.isPending ||
                  !!ageError ||
                  !formData.name ||
                  !formData.age
                }
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
