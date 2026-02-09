import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // ----------- General Types -----------
  type Date = {
    year : Nat;
    month : Nat; // 1-12
    day : Nat; // 1-31
  };

  type EventDateRange = {
    startDate : Date;
    endDate : Date;
  };

  // Shared CMS Content Type

  type ContentItem = {
    id : Nat;
    name : Text;
    description : Text;
    customType : ContentType;
    dates : [EventDateRange];
    useMainHauntSchedule : Bool;
  };

  // ContentType Enumeration
  type ContentType = {
    #event : EventSpecificFields;
    #scareZone : ScareZoneSpecificFields;
    #show : ShowSpecificFields;
    #attraction : AttractionSpecificFields;
  };

  // Additional Fields for Each Type
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

  // Enums for Type-Specific Fields
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

  include MixinAuthorization(accessControlState);

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
      ];

      for (item in initialContent.values()) {
        contentItems.add(item.id, item);
      };
      nextContentId := 8;
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
};
