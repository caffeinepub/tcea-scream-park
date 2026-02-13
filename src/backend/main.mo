import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  // ----------- General Types -----------
  public type Date = {
    year : Nat;
    month : Nat; // 1-12
    day : Nat; // 1-31
  };

  public type EventDateRange = {
    startDate : Date;
    endDate : Date;
  };

  // Shared CMS Content Type
  public type ContentItem = {
    id : Nat;
    name : Text;
    description : Text;
    customType : ContentType;
    dates : [EventDateRange];
    useMainHauntSchedule : Bool;
  };

  // ContentType Enumeration
  public type ContentType = {
    #event : EventSpecificFields;
    #scareZone : ScareZoneSpecificFields;
    #show : ShowSpecificFields;
    #attraction : AttractionSpecificFields;
  };

  // Additional Fields for Each Type
  public type EventSpecificFields = {
    eventType : EventType;
  };

  public type ScareZoneSpecificFields = {
    scareLevel : ScareLevel;
    indoorOutdoor : ZoneLocation;
    yearIntroduced : ?Nat;
  };

  public type ShowSpecificFields = {
    performanceType : PerformanceType;
    yearIntroduced : ?Nat;
  };

  public type AttractionSpecificFields = {
    ageRestriction : AgeRestriction;
    hasGuidedTour : Bool;
    yearIntroduced : ?Nat;
  };

  // Enums for Type-Specific Fields
  public type EventType = {
    #seasonal;
    #special;
    #holiday;
    #specialEvent;
    #convention;
  };

  public type ScareLevel = {
    #mild;
    #moderate;
    #extreme;
  };

  public type ZoneLocation = {
    #indoor;
    #outdoor;
    #both;
  };

  public type AgeRestriction = {
    #none;
    #kids;
    #teens;
    #adultsOnly;
  };

  public type PerformanceType = {
    #musical;
    #theatrical;
    #dance;
    #interactive;
    #stunt;
  };

  // ----------- New Audition Types -----------
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
    submitter : Principal;
    auditionType : AuditionType;
    formData : {
      #scareActor : ScareActorAuditionForm;
      #danceActor : DanceAuditionForm;
    };
    submissionTime : Time.Time;
  };

  // ----------- AuditionLinks Type -----------
  public type AuditionLink = {
    title : Text;
    url : Text;
    description : Text;
    auditionType : AuditionType;
  };

  // ----------- State Management -----------
  let contentItems = Map.empty<Nat, ContentItem>();
  var nextContentId = 1;
  var mainHauntSchedule : [EventDateRange] = [
    {
      startDate = { year = 2024; month = 9; day = 15 }; // Sep 15, 2024
      endDate = { year = 2024; month = 11; day = 1 }; // Nov 1, 2024
    },
  ];

  public type UserProfile = {
    name : Text;
  };

  type SystemId = Nat;
  let accessControlState = AccessControl.initState();

  let userProfiles = Map.empty<Principal, UserProfile>();
  let auditions = List.empty<AuditionSubmission>();

  include MixinAuthorization(accessControlState);

  // Persisted Audition links
  let auditionLinks = List.empty<AuditionLink>();

  // ----------- User Profile Functions -----------
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ----------- Audition Submission Functions -----------
  public shared ({ caller }) func submitScareActorAudition(form : ScareActorAuditionForm) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit auditions");
    };
    let submission : AuditionSubmission = {
      submitter = caller;
      auditionType = #scareActor;
      formData = #scareActor(form);
      submissionTime = Time.now();
    };
    auditions.add(submission);
    true;
  };

  public shared ({ caller }) func submitDanceAudition(form : DanceAuditionForm) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit auditions");
    };
    let submission : AuditionSubmission = {
      submitter = caller;
      auditionType = #danceActor;
      formData = #danceActor(form);
      submissionTime = Time.now();
    };
    auditions.add(submission);
    true;
  };

  public shared ({ caller }) func getAllAuditions() : async [AuditionSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view auditions");
    };
    auditions.toArray();
  };

  // ----------- Seeding Initial Content -----------
  public shared ({ caller }) func seedInitialContent() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can seed content.");
    };

    if (contentItems.isEmpty()) {
      let initialContent : [ContentItem] = [
        {
          id = 1;
          name = "Scream break";
          description = "April seasonal event";
          customType = #event({
            eventType = #seasonal;
          });
          dates = [
            {
              startDate = { year = 2024; month = 4; day = 1 };
              endDate = { year = 2024; month = 4; day = 30 };
            },
          ];
          useMainHauntSchedule = false;
        },
        {
          id = 2;
          name = "Purge";
          description = "May special event";
          customType = #event({
            eventType = #specialEvent;
          });
          dates = [
            {
              startDate = { year = 2024; month = 5; day = 1 };
              endDate = { year = 2024; month = 5; day = 31 };
            },
          ];
          useMainHauntSchedule = false;
        },
        {
          id = 3;
          name = "east coast";
          description = "Major 2027 event";
          customType = #event({
            eventType = #specialEvent;
          });
          dates = [
            {
              startDate = { year = 2027; month = 6; day = 1 };
              endDate = { year = 2027; month = 12; day = 31 };
            },
          ];
          useMainHauntSchedule = false;
        },
        {
          id = 4;
          name = "Transworld";
          description = "2027 convention";
          customType = #event({
            eventType = #convention;
          });
          dates = [
            {
              startDate = { year = 2027; month = 5; day = 1 };
              endDate = { year = 2027; month = 6; day = 1 };
            },
          ];
          useMainHauntSchedule = false;
        },
        {
          id = 5;
          name = "Farwell haunted hayride";
          description = "Main attraction/hayride";
          customType = #attraction({
            ageRestriction = #none;
            hasGuidedTour = true;
            yearIntroduced = ?2022;
          });
          dates = mainHauntSchedule; // Use haunt schedule
          useMainHauntSchedule = true;
        },
        {
          id = 6;
          name = "Grave Hell";
          description = "High-scare level scare zone";
          customType = #scareZone({
            scareLevel = #extreme;
            indoorOutdoor = #outdoor;
            yearIntroduced = ?2023;
          });
          dates = mainHauntSchedule; // Use haunt schedule
          useMainHauntSchedule = true;
        },
        {
          id = 7;
          name = "Lost spirits";
          description = "Show debut (coming 2027)";
          customType = #show({
            performanceType = #theatrical;
            yearIntroduced = ?2027;
          });
          dates = [
            {
              startDate = { year = 2027; month = 1; day = 1 };
              endDate = { year = 2027; month = 12; day = 31 };
            },
          ];
          useMainHauntSchedule = false;
        },
        // New Shows
        {
          id = 8;
          name = "lost sprits";
          description = "Experience a haunting tale of restless souls trapped in a twisted world. This horror show will leave you breathless with its chilling performances, disturbing effects, and heart-pounding scares. Premiering in 2028 at the FarwellHaunt main theatrical facility. This show is a must-see for fans of extreme horror and immersive storytelling.";
          customType = #show({
            performanceType = #theatrical;
            yearIntroduced = ?2028;
          });
          dates = [
            {
              startDate = { year = 2028; month = 8; day = 30 };
              endDate = { year = 2028; month = 8; day = 30 };
            },
          ];
          useMainHauntSchedule = false;
        },
        {
          id = 9;
          name = "Hell grave";
          description = "Prepare for a terrifying journey through the depths of hell. This English horror-style show will feature intense scares, dark themes, and an immersive atmosphere. Premiering in 2027.";
          customType = #show({
            performanceType = #theatrical;
            yearIntroduced = ?2027;
          });
          dates = [
            {
              startDate = { year = 2027; month = 1; day = 1 };
              endDate = { year = 2027; month = 12; day = 31 };
            },
          ];
          useMainHauntSchedule = false;
        },
        // New Scare Zone
        {
          id = 10;
          name = "zombie hell";
          description = "Venture into the depths of the undead world. This English horror-style scare zone will challenge your senses with intense scares, realistic zombies, and a truly haunting ambiance. Coming in 2027.";
          customType = #scareZone({
            scareLevel = #extreme;
            indoorOutdoor = #outdoor;
            yearIntroduced = ?2027;
          });
          dates = [
            {
              startDate = { year = 2027; month = 1; day = 1 };
              endDate = { year = 2027; month = 12; day = 31 };
            },
          ];
          useMainHauntSchedule = false;
        },
        // New 2028 Procession Event
        {
          id = 11;
          name = "2028 Procession";
          description = "Prepare for a spine-tingling journey through our annual procession. This English horror-style event features detailed costumes, eerie floats, and a frightful parade. Scary Rules: All participants must be aware of sudden scares, loud noises, and strictly follow the procession path. Participation is at your own risk!";
          customType = #event({
            eventType = #specialEvent;
          });
          dates = [
            {
              startDate = { year = 2028; month = 10; day = 31 };
              endDate = { year = 2028; month = 10; day = 31 };
            },
          ];
          useMainHauntSchedule = false;
        },
      ];

      for (item in initialContent.values()) {
        contentItems.add(item.id, item);
      };
      nextContentId := 12; // Update to the next available id
    };
  };

  // ----------- CMS CRUD Operations -----------
  public shared ({ caller }) func createContentItem(item : ContentItem) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can create content.");
    };

    let finalDates = if (item.useMainHauntSchedule) {
      mainHauntSchedule;
    } else {
      item.dates;
    };

    let newItem : ContentItem = {
      item with id = nextContentId; dates = finalDates;
    };

    contentItems.add(nextContentId, newItem);

    let currentId = nextContentId;
    nextContentId += 1;
    currentId;
  };

  public query ({ caller }) func getContentItem(id : Nat) : async ?ContentItem {
    // Public read access - no authorization check needed
    contentItems.get(id);
  };

  public shared ({ caller }) func updateContentItem(id : Nat, updatedItem : ContentItem) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can update content.");
    };

    let finalDates = if (updatedItem.useMainHauntSchedule) {
      mainHauntSchedule;
    } else {
      updatedItem.dates;
    };

    let newItem : ContentItem = { updatedItem with id; dates = finalDates };

    contentItems.add(id, newItem);
  };

  public shared ({ caller }) func deleteContentItem(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can delete content.");
    };

    contentItems.remove(id);
  };

  public query ({ caller }) func getAllContentItems() : async [ContentItem] {
    // Public read access - no authorization check needed
    contentItems.values().toArray();
  };

  // ----------- Main Haunt Schedule Management -----------
  public shared ({ caller }) func updateMainHauntSchedule(newSchedule : [EventDateRange]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can update the main schedule.");
    };

    mainHauntSchedule := newSchedule;

    // Update existing content that uses main haunt schedule
    let updates = contentItems.map<Nat, ContentItem, ContentItem>(
      func(_id, item) {
        if (item.useMainHauntSchedule) {
          { item with dates = newSchedule };
        } else {
          item;
        };
      }
    );

    for ((id, item) in updates.entries()) {
      contentItems.add(id, item);
    };
  };

  public query ({ caller }) func getMainHauntSchedule() : async [EventDateRange] {
    // Public read access - no authorization check needed
    mainHauntSchedule;
  };

  // ----------- Filtering Functions -----------
  func getFilteredContentItems(filterFunc : ContentItem -> Bool) : [ContentItem] {
    let list = List.empty<ContentItem>();
    for (item in contentItems.values()) {
      if (filterFunc(item)) {
        list.add(item);
      };
    };
    list.toArray();
  };

  public query ({ caller }) func getEvents() : async [ContentItem] {
    // Public read access - no authorization check needed
    getFilteredContentItems(func(item) { isEvent(item.customType) });
  };

  public query ({ caller }) func getScareZones() : async [ContentItem] {
    // Public read access - no authorization check needed
    getFilteredContentItems(func(item) { isScareZone(item.customType) });
  };

  public query ({ caller }) func getShows() : async [ContentItem] {
    // Public read access - no authorization check needed
    getFilteredContentItems(func(item) { isShow(item.customType) });
  };

  public query ({ caller }) func getAttractions() : async [ContentItem] {
    // Public read access - no authorization check needed
    getFilteredContentItems(func(item) { isAttraction(item.customType) });
  };

  // ----------- Type Helper Functions -----------
  func isEvent(contentType : ContentType) : Bool {
    switch (contentType) {
      case (#event(_)) { true };
      case (_) { false };
    };
  };

  func isScareZone(contentType : ContentType) : Bool {
    switch (contentType) {
      case (#scareZone(_)) { true };
      case (_) { false };
    };
  };

  func isShow(contentType : ContentType) : Bool {
    switch (contentType) {
      case (#show(_)) { true };
      case (_) { false };
    };
  };

  func isAttraction(contentType : ContentType) : Bool {
    switch (contentType) {
      case (#attraction(_)) { true };
      case (_) { false };
    };
  };

  // ----------- Helper Functions for Date Conversion -----------
  public query ({ caller }) func now() : async Nat {
    // Public utility function - no authorization check needed
    Time.now().toNat();
  };

  // ----------- Audition Links Management -----------
  public query ({ caller }) func getAuditionLinks() : async [AuditionLink] {
    auditionLinks.toArray();
  };

  public shared ({ caller }) func addAuditionLink(link : AuditionLink) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can add audition links.");
    };
    auditionLinks.add(link);
  };
};
