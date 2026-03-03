import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Skull, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useSubmitScareActorAudition } from '@/hooks/useAuditionSubmissions';
import { toast } from 'sonner';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

export function ScareActorAuditionPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [experience, setExperience] = useState('');
  const [whatYouLoveToDo, setWhatYouLoveToDo] = useState('');
  const [rolePreference, setRolePreference] = useState('');

  const submitMutation = useSubmitScareActorAudition();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleBack = () => {
    window.location.hash = '#/auditions';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setName('');
    setAge('');
    setHeight('');
    setWeight('');
    setExperience('');
    setWhatYouLoveToDo('');
    setRolePreference('');
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum <= 0) {
      toast.error('Please enter a valid age');
      return;
    }

    if (!height.trim()) {
      toast.error('Please enter your height');
      return;
    }

    if (!weight.trim()) {
      toast.error('Please enter your weight');
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
      setTimeout(() => {
        handleBack();
      }, 1500);
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
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 text-destructive hover:text-destructive/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Auditions
        </Button>

        <Card className="bg-card/90 backdrop-blur-sm border-destructive/20">
          <CardHeader>
            <CardTitle className="text-4xl text-destructive bloody-text flex items-center gap-3">
              <Skull className="h-10 w-10" />
              Scare Actor Audition
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Apply to join the elite Scream Team and become a nightmare
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <Alert variant="destructive" className="border-2 border-destructive bg-destructive/10">
              <Skull className="h-5 w-5" />
              <AlertTitle className="text-xl font-bold">EXTREME POSITION</AlertTitle>
              <AlertDescription>
                This role requires physical stamina, mental fortitude, and the ability to terrify. 
                You will work in intense conditions and perform extreme scares.
              </AlertDescription>
            </Alert>

            {!isAuthenticated ? (
              <div className="py-8 space-y-4 text-center">
                <p className="text-muted-foreground text-lg">
                  You must be logged in to submit an audition application.
                </p>
                <Button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  size="lg"
                  className="bg-destructive hover:bg-destructive/90"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login to Continue'
                  )}
                </Button>
              </div>
            ) : (
              <>
                <div className="grid gap-6">
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
                    <Label htmlFor="height">Height *</Label>
                    <Input
                      id="height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g., 5 feet 10 inches or 178cm"
                      disabled={submitMutation.isPending}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="weight">Weight *</Label>
                    <Input
                      id="weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g., 150 lbs or 68 kg"
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
                    <Label htmlFor="rolePreference">What do you want to be? *</Label>
                    <Select
                      value={rolePreference}
                      onValueChange={setRolePreference}
                      disabled={submitMutation.isPending}
                    >
                      <SelectTrigger id="rolePreference">
                        <SelectValue placeholder="Select your preferred role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Slider">Slider</SelectItem>
                        <SelectItem value="Chainsaw">Chainsaw</SelectItem>
                        <SelectItem value="Stilt Walker">Stilt Walker</SelectItem>
                        <SelectItem value="Scare Actor">Scare Actor</SelectItem>
                        <SelectItem value="Makeup Artist">Makeup Artist</SelectItem>
                        <SelectItem value="Dancer">Dancer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={submitMutation.isPending}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending}
                    className="flex-1 bg-destructive hover:bg-destructive/90"
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
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
