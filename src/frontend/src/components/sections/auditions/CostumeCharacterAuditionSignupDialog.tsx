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
import { useCostumeCharacterAuditionSubmission } from "@/hooks/useAuditionSubmissions";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CostumeCharacterAuditionSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CostumeCharacterAuditionSignupDialog({
  open,
  onOpenChange,
}: CostumeCharacterAuditionSignupDialogProps) {
  const { identity, login } = useInternetIdentity();
  const { mutate: submitAudition, isPending } =
    useCostumeCharacterAuditionSubmission();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    experience: "",
    characterVoices: "",
    musicalSkills: "",
    performancePreferences: "",
    whyAudition: "",
    costumePreferences: "",
    vocalRange: "",
    scheduleConflicts: "",
    physicalLimitations: "",
    referredBy: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identity) {
      toast.error("Please log in to submit your audition");
      await login();
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    submitAudition(
      {
        name: formData.name,
        age: formData.age ? BigInt(formData.age) : undefined,
        phone: formData.phone,
        email: formData.email,
        experience: formData.experience || "None provided",
        characterVoices: formData.characterVoices || "None provided",
        musicalSkills: formData.musicalSkills || "None provided",
        performancePreferences:
          formData.performancePreferences || "None provided",
        whyAudition: formData.whyAudition || "None provided",
        costumePreferences: formData.costumePreferences || "None provided",
        vocalRange: formData.vocalRange || "None provided",
        scheduleConflicts: formData.scheduleConflicts || "None",
        physicalLimitations: formData.physicalLimitations || "None",
        referredBy: formData.referredBy || "None",
        operationAgreeStatus: "Agreed",
      },
      {
        onSuccess: () => {
          toast.success("Audition submitted successfully!");
          setFormData({
            name: "",
            age: "",
            phone: "",
            email: "",
            experience: "",
            characterVoices: "",
            musicalSkills: "",
            performancePreferences: "",
            whyAudition: "",
            costumePreferences: "",
            vocalRange: "",
            scheduleConflicts: "",
            physicalLimitations: "",
            referredBy: "",
          });
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(`Failed to submit audition: ${error.message}`);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">
            Costume Character Audition
          </DialogTitle>
          <DialogDescription>
            Apply for our 2030 costume character roles including Lola, Asher,
            Max, DD, and new princesses. Vocal skills are important—some sing,
            some don't!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="Your age"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vocalRange">Vocal Range / Singing Ability</Label>
            <Textarea
              id="vocalRange"
              value={formData.vocalRange}
              onChange={(e) =>
                setFormData({ ...formData, vocalRange: e.target.value })
              }
              placeholder="Describe your vocal range and singing experience (remember: some characters sing, some don't)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="characterVoices">Character Voices</Label>
            <Textarea
              id="characterVoices"
              value={formData.characterVoices}
              onChange={(e) =>
                setFormData({ ...formData, characterVoices: e.target.value })
              }
              placeholder="Can you do character voices? Describe your vocal abilities"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="musicalSkills">Musical Skills</Label>
            <Textarea
              id="musicalSkills"
              value={formData.musicalSkills}
              onChange={(e) =>
                setFormData({ ...formData, musicalSkills: e.target.value })
              }
              placeholder="Any musical instruments, dance training, or performance skills?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Performance Experience</Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              placeholder="Tell us about your costume character or performance experience"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="performancePreferences">
              Performance Preferences
            </Label>
            <Textarea
              id="performancePreferences"
              value={formData.performancePreferences}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  performancePreferences: e.target.value,
                })
              }
              placeholder="Which characters interest you? (Lola, Asher, Max, DD, Princesses)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whyAudition">Why do you want to audition?</Label>
            <Textarea
              id="whyAudition"
              value={formData.whyAudition}
              onChange={(e) =>
                setFormData({ ...formData, whyAudition: e.target.value })
              }
              placeholder="What draws you to costume character performance?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="costumePreferences">Costume Preferences</Label>
            <Textarea
              id="costumePreferences"
              value={formData.costumePreferences}
              onChange={(e) =>
                setFormData({ ...formData, costumePreferences: e.target.value })
              }
              placeholder="Any preferences or concerns about wearing full-body costumes?"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduleConflicts">Schedule Conflicts</Label>
            <Textarea
              id="scheduleConflicts"
              value={formData.scheduleConflicts}
              onChange={(e) =>
                setFormData({ ...formData, scheduleConflicts: e.target.value })
              }
              placeholder="Any scheduling conflicts we should know about?"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="physicalLimitations">Physical Limitations</Label>
            <Textarea
              id="physicalLimitations"
              value={formData.physicalLimitations}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  physicalLimitations: e.target.value,
                })
              }
              placeholder="Any physical limitations we should be aware of?"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referredBy">
              How did you hear about this opportunity?
            </Label>
            <Input
              id="referredBy"
              value={formData.referredBy}
              onChange={(e) =>
                setFormData({ ...formData, referredBy: e.target.value })
              }
              placeholder="Friend, social media, website, etc."
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Audition"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
