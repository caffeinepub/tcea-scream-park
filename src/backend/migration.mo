import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import AccessControl "authorization/access-control";
import Principal "mo:core/Principal";

module {
  public type Date = {
    year : Nat;
    month : Nat;
    day : Nat;
  };

  public type EventDateRange = {
    startDate : Date;
    endDate : Date;
  };

  public type EventSpecificFields = {
    eventType : {
      #seasonal;
      #special;
      #holiday;
      #specialEvent;
      #convention;
    };
  };

  public type ScareZoneSpecificFields = {
    scareLevel : {
      #mild;
      #moderate;
      #extreme;
    };
    indoorOutdoor : {
      #indoor;
      #outdoor;
      #both;
    };
    yearIntroduced : ?Nat;
  };

  public type ShowSpecificFields = {
    performanceType : {
      #musical;
      #theatrical;
      #dance;
      #interactive;
      #stunt;
    };
    yearIntroduced : ?Nat;
  };

  public type AttractionSpecificFields = {
    ageRestriction : {
      #none;
      #kids;
      #teens;
      #adultsOnly;
    };
    hasGuidedTour : Bool;
    yearIntroduced : ?Nat;
  };

  public type ContentType = {
    #event : EventSpecificFields;
    #scareZone : ScareZoneSpecificFields;
    #show : ShowSpecificFields;
    #attraction : AttractionSpecificFields;
  };

  public type ContentItem = {
    id : Nat;
    name : Text;
    description : Text;
    customType : ContentType;
    dates : [EventDateRange];
    useMainHauntSchedule : Bool;
  };

  public type ScareActorAuditionForm = {
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

  public type DanceAuditionForm = {
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

  public type AuditionType = {
    #scareActor;
    #danceActor;
  };

  public type AuditionSubmission = {
    submitter : Principal.Principal;
    auditionType : AuditionType;
    formData : {
      #scareActor : ScareActorAuditionForm;
      #danceActor : DanceAuditionForm;
    };
    submissionTime : Int;
  };

  public type AuditionLink = {
    title : Text;
    url : Text;
    description : Text;
    auditionType : AuditionType;
  };

  type ActorOld = {
    accessControlState : AccessControl.AccessControlState;
    userProfiles : Map.Map<Principal.Principal, { name : Text }>;
    auditions : List.List<AuditionSubmission>;
    auditionLinks : [AuditionLink];
    contentItems : Map.Map<Nat, ContentItem>;
    nextContentId : Nat;
    mainHauntSchedule : [EventDateRange];
  };

  public type HauntedHouseCharacter = {
    name : Text;
    description : Text;
    voiceType : {
      #creepy;
      #playful;
      #highPitch;
      #lowPitch;
      #silent;
    };
    scareType : {
      #jumpScare;
      #psychological;
      #physical;
      #ambient;
      #interactive;
    };
  };

  public type HauntedHouseSpecificFields = {
    scareLevel : {
      #mild;
      #moderate;
      #extreme;
    };
    characters : [HauntedHouseCharacter];
    sceneDescriptions : [Text];
    yearIntroduced : ?Nat;
    tagline : Text;
  };

  public type CostumeCharacterAuditionForm = {
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

  public type AuditionTypeNew = {
    #scareActor;
    #danceActor;
    #costumeCharacter;
  };

  public type AuditionSubmissionNew = {
    submitter : Principal.Principal;
    auditionType : AuditionTypeNew;
    formData : {
      #scareActor : ScareActorAuditionForm;
      #danceActor : DanceAuditionForm;
      #costumeCharacter : CostumeCharacterAuditionForm;
    };
    submissionTime : Int;
  };

  public type AuditionLinkNew = {
    title : Text;
    url : Text;
    description : Text;
    auditionType : AuditionTypeNew;
  };

  public type ContentTypeNew = {
    #event : EventSpecificFields;
    #scareZone : ScareZoneSpecificFields;
    #show : ShowSpecificFields;
    #attraction : AttractionSpecificFields;
    #hauntedHouse : HauntedHouseSpecificFields;
  };

  public type ContentItemNew = {
    id : Nat;
    name : Text;
    description : Text;
    customType : ContentTypeNew;
    dates : [EventDateRange];
    useMainHauntSchedule : Bool;
  };

  type ActorNew = {
    accessControlState : AccessControl.AccessControlState;
    userProfiles : Map.Map<Principal.Principal, { name : Text }>;
    auditions : List.List<AuditionSubmissionNew>;
    auditionLinks : [AuditionLinkNew];
    contentItems : Map.Map<Nat, ContentItemNew>;
    nextContentId : Nat;
    mainHauntSchedule : [EventDateRange];
  };

  public func run(old : ActorOld) : ActorNew {
    let auditions = old.auditions.map<AuditionSubmission, AuditionSubmissionNew>(
      func(oldSubmission) {
        {
          submitter = oldSubmission.submitter;
          auditionType = switch (oldSubmission.auditionType) {
            case (#scareActor) { #scareActor };
            case (#danceActor) { #danceActor };
          };
          formData = switch (oldSubmission.formData) {
            case (#scareActor(data)) { #scareActor(data) };
            case (#danceActor(data)) { #danceActor(data) };
          };
          submissionTime = oldSubmission.submissionTime;
        };
      }
    );

    let auditionLinks = old.auditionLinks.map<AuditionLink, AuditionLinkNew>(
      func(oldLink) {
        {
          title = oldLink.title;
          url = oldLink.url;
          description = oldLink.description;
          auditionType = switch (oldLink.auditionType) {
            case (#scareActor) { #scareActor };
            case (#danceActor) { #danceActor };
          };
        };
      }
    );

    let contentItems = old.contentItems.map<Nat, ContentItem, ContentItemNew>(
      func(_id, oldContentItem) {
        {
          id = oldContentItem.id;
          name = oldContentItem.name;
          description = oldContentItem.description;
          customType = switch (oldContentItem.customType) {
            case (#event(data)) { #event(data) };
            case (#scareZone(data)) { #scareZone(data) };
            case (#show(data)) { #show(data) };
            case (#attraction(data)) { #attraction(data) };
          };
          dates = oldContentItem.dates;
          useMainHauntSchedule = oldContentItem.useMainHauntSchedule;
        };
      }
    );

    {
      old with
      auditions;
      auditionLinks;
      contentItems
    };
  };
};
