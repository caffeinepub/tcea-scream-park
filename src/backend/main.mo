import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  // ----------- Core Content Types -----------
  public type Date = {
    year : Nat;
    month : Nat; // 1-12
    day : Nat; // 1-31
  };

  public type EventDateRange = {
    startDate : Date;
    endDate : Date;
  };

  public type ContentItem = {
    id : Nat;
    name : Text;
    description : Text;
    customType : ContentType;
    dates : [EventDateRange];
    useMainHauntSchedule : Bool;
  };

  public type ContentType = {
    #event : EventSpecificFields;
    #scareZone : ScareZoneSpecificFields;
    #show : ShowSpecificFields;
    #attraction : AttractionSpecificFields;
    #hauntedHouse : HauntedHouseSpecificFields;
  };

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

  public type HauntedHouseSpecificFields = {
    scareLevel : ScareLevel;
    characters : [HauntedHouseCharacter];
    sceneDescriptions : [Text];
    yearIntroduced : ?Nat;
    tagline : Text;
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

  // Haunted House Specific Types
  public type HauntedHouseCharacter = {
    name : Text;
    description : Text;
    voiceType : VoiceType;
    scareType : ScareType;
  };

  public type VoiceType = {
    #creepy;
    #playful;
    #highPitch;
    #lowPitch;
    #silent;
  };

  public type ScareType = {
    #jumpScare;
    #psychological;
    #physical;
    #ambient;
    #interactive;
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

  public type AuditionType = {
    #scareActor;
    #danceActor;
    #costumeCharacter;
  };

  public type AuditionSubmission = {
    submitter : Principal;
    auditionType : AuditionType;
    formData : {
      #scareActor : ScareActorAuditionForm;
      #danceActor : DanceAuditionForm;
      #costumeCharacter : CostumeCharacterAuditionForm;
    };
    submissionTime : Time.Time;
  };

  // ----------- Audition Links Type -----------
  public type AuditionLink = {
    title : Text;
    url : Text;
    description : Text;
    auditionType : AuditionType;
  };

  // ----------- Staffing Types -----------
  public type StaffingCounts = {
    hauntedHouseActors : Nat;
    hauntedHouseSupervisors : Nat;
    zoneActors : Nat;
    zoneSupervisors : Nat;
    dancerSupervisors : Nat;
    costumeCharacters : Nat;
    princessPerformers : Nat;
  };

  // ----------- Upcoming Event Employee Unlock -----------
  public type EventUnlockStatus = {
    hasFireworks : Bool;
    hasFlynAppearance : Bool;
    hasSecretEntrance : Bool;
  };

  public type UserProfile = {
    name : Text;
  };

  type SystemId = Nat;
  let accessControlState = AccessControl.initState();

  let userProfiles = Map.empty<Principal, UserProfile>();
  let auditions = List.empty<AuditionSubmission>();

  include MixinAuthorization(accessControlState);

  // Persisted Audition links as [AuditionLink]
  var auditionLinks : [AuditionLink] = [];

  // CMS Content Storage
  let contentItems = Map.empty<Nat, ContentItem>();
  var nextContentId = 1;
  var mainHauntSchedule : [EventDateRange] = [
    {
      startDate = { year = 2024; month = 9; day = 15 };
      endDate = { year = 2024; month = 11; day = 1 };
    },
  ];

  // ----------- Upcoming Event Functions -----------
  public type UpcomingEvent = {
    title : Text;
    year : Nat;
    month : Nat;
    day : Nat;
    description : Text;
    featureTransactionType : Text;
    isUnlocked : Bool;
  };

  public query ({ caller }) func getEmployeeUpcomingEvents(currentDate : Date) : async [UpcomingEvent] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only employees can access upcoming events.");
    };

    [
      {
        title = "Happily Scary After";
        year = 2029;
        month = 10;
        day = 1;
        description = "2029 full fireworks show";
        featureTransactionType = "20% fireworks";
        isUnlocked = isEventUnlocked(currentDate, {
          year = 2029;
          month = 10;
          day = 1;
        });
      },
      {
        title = "Flyn";
        year = 2030;
        month = 1;
        day = 1;
        description = "New character/costume";
        featureTransactionType = "Flyn appearance";
        isUnlocked = isEventUnlocked(currentDate, {
          year = 2030;
          month = 1;
          day = 1;
        });
      },
      {
        title = "Secret entrance";
        year = 2040;
        month = 1;
        day = 1;
        description = "Revealed entrance for shows and processions";
        featureTransactionType = "Secret entrance";
        isUnlocked = isEventUnlocked(currentDate, {
          year = 2040;
          month = 1;
          day = 1;
        });
      },
    ];
  };

  // Helper function to check if event is unlocked
  func isEventUnlocked(currentDate : Date, eventDate : Date) : Bool {
    if (currentDate.year > eventDate.year) {
      return true;
    } else if (currentDate.year == eventDate.year) {
      if (currentDate.month > eventDate.month) {
        return true;
      } else if (currentDate.month == eventDate.month) {
        return currentDate.day >= eventDate.day;
      };
    };
    false;
  };

  public query ({ caller }) func getEventUnlockStatus() : async EventUnlockStatus {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only employees can access event unlock status.");
    };
    {
      hasFireworks = false;
      hasFlynAppearance = false;
      hasSecretEntrance = false;
    };
  };

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

  public shared ({ caller }) func submitCostumeCharacterAudition(form : CostumeCharacterAuditionForm) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit auditions");
    };
    let submission : AuditionSubmission = {
      submitter = caller;
      auditionType = #costumeCharacter;
      formData = #costumeCharacter(form);
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
          dates = mainHauntSchedule;
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
          dates = mainHauntSchedule;
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
        {
          id = 10;
          name = "Color Paint";
          description = "A vibrant and kid-friendly show featuring Celeste the unicorn, Cosmo the dog, and three other high-energy characters. Scheduled for 2028 in the upcoming Kid Grove themed land.";
          customType = #show({
            performanceType = #theatrical;
            yearIntroduced = ?2028;
          });
          dates = [
            {
              startDate = { year = 2028; month = 1; day = 1 };
              endDate = { year = 2028; month = 12; day = 31 };
            },
          ];
          useMainHauntSchedule = false;
        },
        // New Scare Zone
        {
          id = 11;
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
          id = 12;
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
        // Haunted House Section
        {
          id = 13;
          name = "Toys Come to Play";
          description = "Step into a world where childhood toys turn into haunting nightmares. This haunted house is filled with unsettling characters and terrifying scenes that will make you question everything you once loved. Never talk back, we just want to rip your head off.";
          customType = #hauntedHouse({
            scareLevel = #extreme;
            characters = [
              {
                name = "Blippy";
                description = "A twisted toy clown with a mischievous grin and a penchant for chaos.";
                voiceType = #highPitch;
                scareType = #jumpScare;
              },
              {
                name = "Jiffy";
                description = "A demented jack-in-the-box character that pops up when you least expect it.";
                voiceType = #creepy;
                scareType = #psychological;
              },
            ];
            sceneDescriptions = [
              "Out of breath and almost headless, you'll navigate through 22 different scenes filled with terror.",
              "Each scene is designed to push your fears to the limit and leave a lasting impression."
            ];
            yearIntroduced = ?2027;
            tagline = "never talk back we just want to rip ur head off";
          });
          dates = [
            {
              startDate = { year = 2027; month = 9; day = 15 };
              endDate = { year = 2027; month = 11; day = 1 };
            },
          ];
          useMainHauntSchedule = false;
        },
        {
          id = 14;
          name = "Obsession Scream";
          description = "Step into the twisted mind of Leslie, a terrifying teen with long purple hair. This haunted house features intense scenes of psychological horror, scream-inducing jump scares, and a relentless pursuit by Leslie herself. Are you brave enough to face your obsessions?";
          customType = #hauntedHouse({
            scareLevel = #extreme;
            characters = [
              {
                name = "Leslie";
                description = "A teen with long purple hair, obsessed with causing fear and chaos. Leslie is known for her sudden mood swings and unpredictable behavior.";
                voiceType = #creepy;
                scareType = #psychological;
              },
            ];
            sceneDescriptions = [
              "Navigate through a series of rooms filled with Leslie's twisted creations.",
              "Experience intense psychological horror and mind-bending illusions.",
              "Face Leslie in the final showdown, where your fears become reality."
            ];
            yearIntroduced = ?2025;
            tagline = "Face your fears. Embrace the screams. Survive Obsession Scream.";
          });
          dates = [
            {
              startDate = { year = 2025; month = 9; day = 15 };
              endDate = { year = 2025; month = 11; day = 1 };
            },
          ];
          useMainHauntSchedule = false;
        },
      ];

      for (item in initialContent.values()) {
        contentItems.add(item.id, item);
      };
      nextContentId := 15;
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

  public query func getContentItem(id : Nat) : async ?ContentItem {
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

  public query func getAllContentItems() : async [ContentItem] {
    contentItems.values().toArray();
  };

  // ----------- Main Haunt Schedule Management -----------
  public shared ({ caller }) func updateMainHauntSchedule(newSchedule : [EventDateRange]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can update the main schedule.");
    };

    mainHauntSchedule := newSchedule;

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

  public query func getMainHauntSchedule() : async [EventDateRange] {
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

  public query func getEvents() : async [ContentItem] {
    getFilteredContentItems(func(item) { isEvent(item.customType) });
  };

  public query func getScareZones() : async [ContentItem] {
    getFilteredContentItems(func(item) { isScareZone(item.customType) });
  };

  public query func getShows() : async [ContentItem] {
    getFilteredContentItems(func(item) { isShow(item.customType) });
  };

  public query func getAttractions() : async [ContentItem] {
    getFilteredContentItems(func(item) { isAttraction(item.customType) });
  };

  public query func getHauntedHouses() : async [ContentItem] {
    getFilteredContentItems(func(item) { isHauntedHouse(item.customType) });
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

  func isHauntedHouse(contentType : ContentType) : Bool {
    switch (contentType) {
      case (#hauntedHouse(_)) { true };
      case (_) { false };
    };
  };

  // ----------- Helper Functions for Date Conversion -----------
  public query func now() : async Nat {
    Time.now().toNat();
  };

  // ----------- Audition Links Management -----------
  public query func getAuditionLinks() : async [AuditionLink] {
    auditionLinks;
  };

  public shared ({ caller }) func addAuditionLink(link : AuditionLink) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can add audition links.");
    };

    let linksList = List.fromArray<AuditionLink>(auditionLinks);
    linksList.add(link);
    auditionLinks := linksList.toArray();
  };

  public shared ({ caller }) func updateAuditionLink(index : Nat, updatedLink : AuditionLink) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can update audition links.");
    };

    let length = auditionLinks.size();
    if (index >= length) {
      Runtime.trap("Invalid index");
    };

    let linksList = List.fromArray<AuditionLink>(auditionLinks);
    let elements = linksList.enumerate();
    let newList = List.empty<AuditionLink>();

    for ((currentIndex, item) in elements) {
      let itemToAdd = if (currentIndex == index) {
        updatedLink;
      } else {
        item;
      };
      newList.add(itemToAdd);
    };

    auditionLinks := newList.toArray();
  };

  public shared ({ caller }) func removeAuditionLink(index : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can remove audition links.");
    };

    let length = auditionLinks.size();
    if (index >= length) {
      Runtime.trap("Invalid index");
    };

    let linksList = List.fromArray<AuditionLink>(auditionLinks);
    let elements = linksList.enumerate();
    let newList = List.empty<AuditionLink>();

    for ((currentIndex, item) in elements) {
      if (currentIndex != index) {
        newList.add(item);
      };
    };

    auditionLinks := newList.toArray();
  };

  public shared ({ caller }) func clearAuditionLinks() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can clear audition links.");
    };
    auditionLinks := [];
  };

  // ----------- Audition Utility -----------
  public query ({ caller }) func getStaffingCounts() : async StaffingCounts {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view staffing counts");
    };

    {
      hauntedHouseActors = 14;
      hauntedHouseSupervisors = 3;
      zoneActors = 16;
      zoneSupervisors = 5;
      dancerSupervisors = 3;
      costumeCharacters = 10;
      princessPerformers = 10;
    };
  };

  // ----------- Tunnel Map, Room Assignments, and Schedules -----------

  public type Location = {
    x : Nat;
    y : Nat;
  };

  public type Room = {
    id : Nat;
    name : Text;
    location : Location;
    scareLevel : ScareLevel;
  };

  public type Connection = {
    fromRoomId : Nat;
    toRoomId : Nat;
    isOneWay : Bool;
    distance : Nat;
    tunnelSection : Text;
  };

  public type TunnelMap = {
    id : Nat;
    name : Text;
    rooms : [Room];
    connections : [Connection];
  };

  public type RoomAssignment = {
    roomId : Nat;
    staffMember : Text;
    shiftTime : Text;
    role : Text;
  };

  public type TimeSlot = {
    startTime : Text;
    endTime : Text;
  };

  public type RoomSchedule = {
    roomId : Nat;
    timeSlots : [TimeSlot];
  };

  public type TunnelSchedule = {
    id : Nat;
    date : Text;
    shift : Text;
    specialEvent : ?Text;
    roomAssignments : [RoomAssignment];
    roomSchedules : [RoomSchedule];
  };

  let tunnelMaps = Map.empty<Nat, TunnelMap>();
  let roomAssignments = List.empty<[RoomAssignment]>();
  let tunnelSchedules = List.empty<TunnelSchedule>();

  var nextTunnelMapId = 1;
  var nextScheduleId = 1;

  // ----------- Tunnel Maps Management -----------

  public shared ({ caller }) func createTunnelMap(name : Text, rooms : [Room], connections : [Connection]) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create tunnel maps.");
    };

    let newMap : TunnelMap = {
      id = nextTunnelMapId;
      name;
      rooms;
      connections;
    };

    tunnelMaps.add(nextTunnelMapId, newMap);
    let currentId = nextTunnelMapId;
    nextTunnelMapId += 1;
    currentId;
  };

  public query ({ caller }) func getTunnelMap(id : Nat) : async ?TunnelMap {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view tunnel maps.");
    };
    tunnelMaps.get(id);
  };

  public query ({ caller }) func getAllTunnelMaps() : async [TunnelMap] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view tunnel maps.");
    };
    tunnelMaps.values().toArray();
  };

  public shared ({ caller }) func updateTunnelMap(id : Nat, updatedMap : TunnelMap) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update tunnel maps.");
    };

    tunnelMaps.add(id, updatedMap);
  };

  public shared ({ caller }) func deleteTunnelMap(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete tunnel maps.");
    };

    tunnelMaps.remove(id);
  };

  // ----------- Room Assignments Management -----------

  public shared ({ caller }) func addRoomAssignments(assignments : [RoomAssignment]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add room assignments.");
    };

    roomAssignments.add(assignments);
  };

  public query ({ caller }) func getRoomAssignments() : async [[RoomAssignment]] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view room assignments.");
    };
    roomAssignments.toArray();
  };

  // ----------- Tunnel Schedules Management -----------

  public shared ({ caller }) func createTunnelSchedule(date : Text, shift : Text, specialEvent : ?Text, roomAssignments : [RoomAssignment], roomSchedules : [RoomSchedule]) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create tunnel schedules.");
    };

    let newSchedule : TunnelSchedule = {
      id = nextScheduleId;
      date;
      shift;
      specialEvent;
      roomAssignments;
      roomSchedules;
    };

    tunnelSchedules.add(newSchedule);
    let currentId = nextScheduleId;
    nextScheduleId += 1;
    currentId;
  };

  public query ({ caller }) func getTunnelSchedule(id : Nat) : async ?TunnelSchedule {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view tunnel schedules.");
    };
    let schedulesArray = tunnelSchedules.toArray();
    for (schedule in schedulesArray.values()) {
      if (schedule.id == id) {
        return ?schedule;
      };
    };
    null;
  };

  public query ({ caller }) func getAllTunnelSchedules() : async [TunnelSchedule] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view tunnel schedules.");
    };
    tunnelSchedules.toArray();
  };

  public shared ({ caller }) func updateTunnelSchedule(id : Nat, updatedSchedule : TunnelSchedule) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update tunnel schedules.");
    };

    let schedulesArray = tunnelSchedules.toArray();
    let updatedSchedules = List.empty<TunnelSchedule>();

    for (schedule in schedulesArray.values()) {
      if (schedule.id == id) {
        updatedSchedules.add(updatedSchedule);
      } else {
        updatedSchedules.add(schedule);
      };
    };

    tunnelSchedules.clear();
    tunnelSchedules.addAll(updatedSchedules.values());
  };

  public shared ({ caller }) func deleteTunnelSchedule(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete tunnel schedules.");
    };

    let schedulesArray = tunnelSchedules.toArray();
    let filteredSchedules = List.empty<TunnelSchedule>();

    for (schedule in schedulesArray.values()) {
      if (schedule.id != id) {
        filteredSchedules.add(schedule);
      };
    };

    tunnelSchedules.clear();
    tunnelSchedules.addAll(filteredSchedules.values());
  };

  // ----------- New Entities: Kid Grove, Dead Eyes, Themed Food Booth -----------
  public type ThemedLand = {
    id : Nat;
    name : Text;
    description : Text;
    openingYear : Nat;
    sizeSqFt : Nat;
    futureShows : [Nat];
    status : LandStatus;
  };

  public type LandStatus = { #planned; #underConstruction; #open };

  public type MerchShop = {
    id : Nat;
    name : Text;
    products : [Product];
    location : Text;
  };

  public type Product = {
    name : Text;
    price : Float;
    category : ProductCategory;
    description : Text;
    availability : AvailabilityStatus;
  };

  public type ProductCategory = { #shoes; #clothes; #autograph; #skateboard; #posters };

  public type AvailabilityStatus = { #inStock; #limited; #outOfStock };

  public type ThemedFoodBooth = {
    id : Nat;
    name : Text;
    paintMenu : [FoodItem];
    deathMenu : [FoodItem];
    location : Text;
    description : Text;
  };

  public type FoodItem = {
    name : Text;
    price : Float;
    description : Text;
    theme : FoodTheme;
    itemType : FoodType;
    specialNotes : Text;
    allergens : [Text];
  };

  public type FoodTheme = { #paint; #death };
  public type FoodType = { #food; #drink; #dessert };

  let themedLands = Map.empty<Nat, ThemedLand>();
  let merchShops = Map.empty<Nat, MerchShop>();
  let foodBooths = Map.empty<Nat, ThemedFoodBooth>();

  var nextLandId = 1;
  var nextShopId = 1;
  var nextBoothId = 1;

  // ----------- Themed Lands Management -----------
  public shared ({ caller }) func addThemedLand(land : ThemedLand) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add themed lands.");
    };
    themedLands.add(land.id, land);
  };

  public query func getAllThemedLands() : async [ThemedLand] {
    themedLands.values().toArray();
  };

  public query func getThemedLand(id : Nat) : async ?ThemedLand {
    themedLands.get(id);
  };

  public shared ({ caller }) func updateThemedLand(id : Nat, updatedLand : ThemedLand) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update themed lands.");
    };
    themedLands.add(id, updatedLand);
  };

  public shared ({ caller }) func deleteThemedLand(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete themed lands.");
    };
    themedLands.remove(id);
  };

  // ----------- Merch Shops Management -----------
  public shared ({ caller }) func addMerchShop(shop : MerchShop) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add merch shops.");
    };
    merchShops.add(shop.id, shop);
  };

  public query func getAllMerchShops() : async [MerchShop] {
    merchShops.values().toArray();
  };

  public query func getMerchShop(id : Nat) : async ?MerchShop {
    merchShops.get(id);
  };

  public shared ({ caller }) func updateMerchShop(id : Nat, updatedShop : MerchShop) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update merch shops.");
    };
    merchShops.add(id, updatedShop);
  };

  public shared ({ caller }) func deleteMerchShop(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete merch shops.");
    };
    merchShops.remove(id);
  };

  // ----------- Food Booths Management -----------
  public shared ({ caller }) func addFoodBooth(booth : ThemedFoodBooth) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add food booths.");
    };
    foodBooths.add(booth.id, booth);
  };

  public query func getAllFoodBooths() : async [ThemedFoodBooth] {
    foodBooths.values().toArray();
  };

  public query func getFoodBooth(id : Nat) : async ?ThemedFoodBooth {
    foodBooths.get(id);
  };

  public shared ({ caller }) func updateFoodBooth(id : Nat, updatedBooth : ThemedFoodBooth) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update food booths.");
    };
    foodBooths.add(id, updatedBooth);
  };

  public shared ({ caller }) func deleteFoodBooth(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete food booths.");
    };
    foodBooths.remove(id);
  };
};
