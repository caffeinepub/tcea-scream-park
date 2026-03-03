import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useSubmitHauntedHouseSupervisorAudition } from '@/hooks/useAuditionSubmissions';
import { generatedImages } from '@/content/generatedImages';

interface HauntedHouseSupervisorAuditionSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HauntedHouseSupervisorAuditionSignupDialog({
  open,
  onOpenChange,
}: HauntedHouseSupervisorAuditionSignupDialogProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const submitMutation = useSubmitHauntedHouseSupervisorAudition();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    experience: '',
    availability: '',
    leadershipExperience: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    const ageNum = parseInt(formData.age);
    if (isNaN(ageNum) || ageNum < 1) return;

    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        age: ageNum,
        phone: formData.phone,
        email: formData.email,
        experience: formData.experience,
        availability: formData.availability,
        leadershipExperience: formData.leadershipExperience,
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
        name: '',
        age: '',
        phone: '',
        email: '',
        experience: '',
        availability: '',
        leadershipExperience: '',
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-card border-destructive/30">
        <DialogHeader>
          <div className="relative w-full h-32 overflow-hidden rounded-lg mb-2">
            <img
              src={generatedImages.auditions['Haunted House Supervisors']}
              alt="Haunted House Supervisor Auditions"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute bottom-2 left-2 flex gap-2">
              <Badge className="bg-destructive text-destructive-foreground text-xs">Coming 2026/27</Badge>
              <Badge variant="outline" className="border-destructive/50 text-destructive text-xs">Leadership Role</Badge>
            </div>
          </div>
          <DialogTitle className="text-2xl text-destructive flex items-center gap-2">
            <ShieldCheck className="h-6 w-6" />
            Haunted House Supervisors
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Auditions coming <strong className="text-foreground">2026/27 season</strong>. Submit your interest now.
          </DialogDescription>
        </DialogHeader>

        {!isAuthenticated ? (
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              You must be logged in to submit an audition application. Please log in first.
            </AlertDescription>
          </Alert>
        ) : submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-bold text-foreground">Application Submitted!</h3>
            <p className="text-muted-foreground">
              Thank you for your interest in the Haunted House Supervisor role! We'll reach out when auditions open for the 2026/27 season.
            </p>
            <Button onClick={handleClose} className="bg-destructive hover:bg-destructive/90">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-3 space-y-1 text-sm">
              <p className="font-semibold text-foreground">Supervisor Responsibilities:</p>
              <ul className="text-muted-foreground space-y-0.5 list-disc list-inside">
                <li>Oversee haunted house actors and staff</li>
                <li>Enforce safety protocols throughout the attraction</li>
                <li>Coordinate with park management</li>
                <li>Maintain the haunt atmosphere and guest experience</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="sup-name">Full Name *</Label>
                <Input
                  id="sup-name"
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Your full name"
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="sup-age">Age *</Label>
                <Input
                  id="sup-age"
                  type="number"
                  min={1}
                  value={formData.age}
                  onChange={e => handleChange('age', e.target.value)}
                  placeholder="Your age"
                  required
                  className="bg-background/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="sup-phone">Phone Number *</Label>
                <Input
                  id="sup-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  placeholder="(555) 000-0000"
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="sup-email">Email *</Label>
                <Input
                  id="sup-email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="sup-experience">General Experience *</Label>
              <Textarea
                id="sup-experience"
                value={formData.experience}
                onChange={e => handleChange('experience', e.target.value)}
                placeholder="Describe your experience in haunted attractions, entertainment, or related fields"
                rows={3}
                required
                className="bg-background/50 resize-none"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="sup-leadership">Leadership / Supervisory Experience *</Label>
              <Textarea
                id="sup-leadership"
                value={formData.leadershipExperience}
                onChange={e => handleChange('leadershipExperience', e.target.value)}
                placeholder="Describe any supervisory, management, or leadership experience you have"
                rows={3}
                required
                className="bg-background/50 resize-none"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="sup-availability">Availability</Label>
              <Input
                id="sup-availability"
                value={formData.availability}
                onChange={e => handleChange('availability', e.target.value)}
                placeholder="e.g. Weekends, evenings, full season, etc."
                className="bg-background/50"
              />
            </div>

            {submitMutation.isError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {submitMutation.error instanceof Error
                    ? submitMutation.error.message
                    : 'Failed to submit application. Please try again.'}
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
                className="flex-1 bg-destructive hover:bg-destructive/90"
                disabled={submitMutation.isPending || !formData.name || !formData.age || !formData.experience || !formData.leadershipExperience}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
