import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  type Date = {
    year : Nat;
    month : Nat; // 1-12
    day : Nat; // 1-31
  };

  type EventDateRange = {
    startDate : Date;
    endDate : Date;
  };

  type ContentType = {
    #event : EventSpecificFields;
    #scareZone : ScareZoneSpecificFields;
    #show : ShowSpecificFields;
    #attraction : AttractionSpecificFields;
    #hauntedHouse : HauntedHouseSpecificFields;
  };

  type EventSpecificFields = {
    eventType : EventType;
  };

  type ScareZoneSpecificFields = {
    scareLevel : ScareLevel;
    indoorOutdoor : ZoneLocation;
    yearIntroduced : ?Nat;
  };

  type ShowSpecificFields = {
    performanceType : PerformanceType;
    yearIntroduced : ?Nat;
  };

  type AttractionSpecificFields = {
    ageRestriction : AgeRestriction;
    hasGuidedTour : Bool;
    yearIntroduced : ?Nat;
  };

  type HauntedHouseSpecificFields = {
    scareLevel : ScareLevel;
    characters : [HauntedHouseCharacter];
    sceneDescriptions : [Text];
    yearIntroduced : ?Nat;
    tagline : Text;
  };

  type EventType = {
    #seasonal;
    #special;
    #holiday;
    #specialEvent;
    #convention;
  };

  type ScareLevel = {
    #mild;
    #moderate;
    #extreme;
  };

  type ZoneLocation = {
    #indoor;
    #outdoor;
    #both;
  };

  type AgeRestriction = {
    #none;
    #kids;
    #teens;
    #adultsOnly;
  };

  type PerformanceType = {
    #musical;
    #theatrical;
    #dance;
    #interactive;
    #stunt;
  };

  type HauntedHouseCharacter = {
    name : Text;
    description : Text;
    voiceType : VoiceType;
    scareType : ScareType;
  };

  type VoiceType = {
    #creepy;
    #playful;
    #highPitch;
    #lowPitch;
    #silent;
  };

  type ScareType = {
    #jumpScare;
    #psychological;
    #physical;
    #ambient;
    #interactive;
  };

  type ContentItem = {
    id : Nat;
    name : Text;
    description : Text;
    customType : ContentType;
    dates : [EventDateRange];
    useMainHauntSchedule : Bool;
  };

  type UserProfile = {
    name : Text;
  };

  type AuditionType = {
    #scareActor;
    #danceActor;
    #costumeCharacter;
  };

  type ScareActorAuditionForm = {
    name : Text;
    age : ?Nat;
    phone : Text;
    email : Text;
    experience : Text;
    specialSkills : Text;
    availability : Text;
    previousWork : Text;
    referredBy : Text;
    whyScaryRole : Text;
    physicalLimitations : Text;
    favoriteCharacterType : Text;
    preferredScareType : Text;
    preferenceOutfitType : Text;
    conflictSchedule : Text;
    preferedWorkingCondition : Text;
    operationAgreeStatus : Text;
  };

  type DanceAuditionForm = {
    name : Text;
    age : ?Nat;
    phone : Text;
    email : Text;
    experience : Text;
    danceStyles : Text;
    availability : Text;
    previousWork : Text;
    referredBy : Text;
    whyDancing : Text;
    physicalLimitations : Text;
    favoriteDanceType : Text;
    performanceExperience : Text;
    costumePreferences : Text;
    scheduleConflicts : Text;
    workingConditions : Text;
    operationAgreeStatus : Text;
  };

  type CostumeCharacterAuditionForm = {
    name : Text;
    age : ?Nat;
    phone : Text;
    email : Text;
    experience : Text;
    characterVoices : Text;
    musicalSkills : Text;
    performancePreferences : Text;
    whyAudition : Text;
    costumePreferences : Text;
    vocalRange : Text;
    scheduleConflicts : Text;
    physicalLimitations : Text;
    referredBy : Text;
    operationAgreeStatus : Text;
  };

  type AuditionSubmission = {
    submitter : Principal;
    auditionType : AuditionType;
    formData : {
      #scareActor : ScareActorAuditionForm;
      #danceActor : DanceAuditionForm;
      #costumeCharacter : CostumeCharacterAuditionForm;
    };
    submissionTime : Time.Time;
  };

  type AuditionLink = {
    title : Text;
    url : Text;
    description : Text;
    auditionType : AuditionType;
  };

  // Filtered types for migration
  type OldActor = {
    contentItems : Map.Map<Nat, ContentItem>;
    userProfiles : Map.Map<Principal, UserProfile>;
    auditions : List.List<AuditionSubmission>;
    auditionLinks : [AuditionLink];
    mainHauntSchedule : [EventDateRange];
    nextContentId : Nat;
  };

  type NewActor = {
    contentItems : Map.Map<Nat, ContentItem>;
    userProfiles : Map.Map<Principal, UserProfile>;
    auditions : List.List<AuditionSubmission>;
    auditionLinks : [AuditionLink];
    mainHauntSchedule : [EventDateRange];
    nextContentId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let updatedContentItems = old.contentItems;
    let updatedNextContentId = old.nextContentId;

    {
      old with
      contentItems = updatedContentItems;
      nextContentId = updatedNextContentId;
    };
  };
};

