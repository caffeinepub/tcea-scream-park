import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useSubmitScareActorAudition } from '@/hooks/useAuditionSubmissions';
import { toast } from 'sonner';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Loader2 } from 'lucide-react';

interface ScareActorAuditionSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScareActorAuditionSignupDialog({
  open,
  onOpenChange,
}: ScareActorAuditionSignupDialogProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [whatYouLoveToDo, setWhatYouLoveToDo] = useState('');
  const [rolePreference, setRolePreference] = useState('');

  const submitMutation = useSubmitScareActorAudition();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const resetForm = () => {
    setName('');
    setAge('');
    setExperience('');
    setWhatYouLoveToDo('');
    setRolePreference('');
  };

  const handleSubmit = async () => {
    // Validation
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum <= 0) {
      toast.error('Please enter a valid age');
      return;
    }

    if (!experience.trim()) {
      toast.error('Please describe your experience');
      return;
    }

    if (!whatYouLoveToDo.trim()) {
      toast.error('Please tell us what you would love to do');
      return;
    }

    if (!rolePreference) {
      toast.error('Please select a role preference');
      return;
    }

    try {
      await submitMutation.mutateAsync({
        name: name.trim(),
        age: ageNum,
        experience: experience.trim(),
        whatYouLoveToDo: whatYouLoveToDo.trim(),
        rolePreference,
      });

      toast.success('Audition application submitted successfully!');
      resetForm();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error('Failed to submit application: ' + (error.message || 'Unknown error'));
    }
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-destructive text-2xl">
            Scare Actor Audition Application
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to apply for a scare actor position. All fields are required.
          </DialogDescription>
        </DialogHeader>

        {!isAuthenticated ? (
          <div className="py-8 space-y-4 text-center">
            <p className="text-muted-foreground">
              You must be logged in to submit an audition application.
            </p>
            <Button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login to Continue'
              )}
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  disabled={submitMutation.isPending}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Your age"
                  disabled={submitMutation.isPending}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="experience">Experience *</Label>
                <Textarea
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Describe your relevant experience (acting, haunted houses, performance, etc.)"
                  rows={4}
                  disabled={submitMutation.isPending}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="whatYouLoveToDo">What would you love to do when you work here? *</Label>
                <Textarea
                  id="whatYouLoveToDo"
                  value={whatYouLoveToDo}
                  onChange={(e) => setWhatYouLoveToDo(e.target.value)}
                  placeholder="Tell us what excites you about working as a scare actor"
                  rows={4}
                  disabled={submitMutation.isPending}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="rolePreference">Role Preference *</Label>
                <Select
                  value={rolePreference}
                  onValueChange={setRolePreference}
                  disabled={submitMutation.isPending}
                >
                  <SelectTrigger id="rolePreference">
                    <SelectValue placeholder="Select your preferred role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sliders">Sliders</SelectItem>
                    <SelectItem value="Chainsaws">Chainsaws</SelectItem>
                    <SelectItem value="In-house">In-house</SelectItem>
                    <SelectItem value="Stilts">Stilts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={submitMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="bg-destructive hover:bg-destructive/90"
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
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
