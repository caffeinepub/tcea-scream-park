import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Location {
    x: bigint;
    y: bigint;
}
export type ContentType = {
    __kind__: "hauntedHouse";
    hauntedHouse: HauntedHouseSpecificFields;
} | {
    __kind__: "show";
    show: ShowSpecificFields;
} | {
    __kind__: "event";
    event: EventSpecificFields;
} | {
    __kind__: "scareZone";
    scareZone: ScareZoneSpecificFields;
} | {
    __kind__: "attraction";
    attraction: AttractionSpecificFields;
};
export type Time = bigint;
export interface RoomAssignment {
    role: string;
    staffMember: string;
    roomId: bigint;
    shiftTime: string;
}
export interface CostumeCharacterAuditionForm {
    age?: bigint;
    name: string;
    musicalSkills: string;
    email: string;
    experience: string;
    referredBy: string;
    performancePreferences: string;
    vocalRange: string;
    physicalLimitations: string;
    operationAgreeStatus: string;
    phone: string;
    scheduleConflicts: string;
    costumePreferences: string;
    characterVoices: string;
    whyAudition: string;
}
export interface UpcomingEvent {
    day: bigint;
    month: bigint;
    title: string;
    year: bigint;
    description: string;
    featureTransactionType: string;
    isUnlocked: boolean;
}
export interface ContentItem {
    id: bigint;
    useMainHauntSchedule: boolean;
    name: string;
    description: string;
    customType: ContentType;
    dates: Array<EventDateRange>;
}
export interface Room {
    id: bigint;
    name: string;
    scareLevel: ScareLevel;
    location: Location;
}
export interface StaffingCounts {
    costumeCharacters: bigint;
    hauntedHouseSupervisors: bigint;
    zoneSupervisors: bigint;
    zoneActors: bigint;
    dancerSupervisors: bigint;
    princessPerformers: bigint;
    hauntedHouseActors: bigint;
}
export interface AuditionSubmission {
    submitter: Principal;
    formData: {
        __kind__: "scareActor";
        scareActor: ScareActorAuditionForm;
    } | {
        __kind__: "costumeCharacter";
        costumeCharacter: CostumeCharacterAuditionForm;
    } | {
        __kind__: "danceActor";
        danceActor: DanceAuditionForm;
    };
    auditionType: AuditionType;
    submissionTime: Time;
}
export interface TunnelMap {
    id: bigint;
    name: string;
    connections: Array<Connection>;
    rooms: Array<Room>;
}
export interface EventSpecificFields {
    eventType: EventType;
}
export interface ScareActorAuditionForm {
    age?: bigint;
    specialSkills: string;
    conflictSchedule: string;
    name: string;
    email: string;
    experience: string;
    availability: string;
    referredBy: string;
    whyScaryRole: string;
    preferredScareType: string;
    preferenceOutfitType: string;
    preferedWorkingCondition: string;
    physicalLimitations: string;
    operationAgreeStatus: string;
    phone: string;
    favoriteCharacterType: string;
    previousWork: string;
}
export interface DanceAuditionForm {
    age?: bigint;
    performanceExperience: string;
    name: string;
    workingConditions: string;
    email: string;
    experience: string;
    availability: string;
    referredBy: string;
    whyDancing: string;
    favoriteDanceType: string;
    danceStyles: string;
    physicalLimitations: string;
    operationAgreeStatus: string;
    phone: string;
    scheduleConflicts: string;
    costumePreferences: string;
    previousWork: string;
}
export interface RoomSchedule {
    timeSlots: Array<TimeSlot>;
    roomId: bigint;
}
export interface Connection {
    fromRoomId: bigint;
    tunnelSection: string;
    isOneWay: boolean;
    distance: bigint;
    toRoomId: bigint;
}
export interface TimeSlot {
    startTime: string;
    endTime: string;
}
export interface TunnelSchedule {
    id: bigint;
    roomAssignments: Array<RoomAssignment>;
    date: string;
    shift: string;
    specialEvent?: string;
    roomSchedules: Array<RoomSchedule>;
}
export interface Date_ {
    day: bigint;
    month: bigint;
    year: bigint;
}
export interface ShowSpecificFields {
    yearIntroduced?: bigint;
    performanceType: PerformanceType;
}
export interface AuditionLink {
    url: string;
    title: string;
    auditionType: AuditionType;
    description: string;
}
export interface AttractionSpecificFields {
    yearIntroduced?: bigint;
    ageRestriction: AgeRestriction;
    hasGuidedTour: boolean;
}
export interface EventUnlockStatus {
    hasSecretEntrance: boolean;
    hasFireworks: boolean;
    hasFlynAppearance: boolean;
}
export interface ScareZoneSpecificFields {
    yearIntroduced?: bigint;
    indoorOutdoor: ZoneLocation;
    scareLevel: ScareLevel;
}
export interface EventDateRange {
    endDate: Date_;
    startDate: Date_;
}
export interface HauntedHouseSpecificFields {
    yearIntroduced?: bigint;
    tagline: string;
    characters: Array<HauntedHouseCharacter>;
    sceneDescriptions: Array<string>;
    scareLevel: ScareLevel;
}
export interface HauntedHouseCharacter {
    voiceType: VoiceType;
    name: string;
    description: string;
    scareType: ScareType;
}
export interface UserProfile {
    name: string;
}
export enum AgeRestriction {
    teens = "teens",
    kids = "kids",
    none = "none",
    adultsOnly = "adultsOnly"
}
export enum AuditionType {
    scareActor = "scareActor",
    costumeCharacter = "costumeCharacter",
    danceActor = "danceActor"
}
export enum EventType {
    seasonal = "seasonal",
    convention = "convention",
    holiday = "holiday",
    specialEvent = "specialEvent",
    special = "special"
}
export enum PerformanceType {
    interactive = "interactive",
    theatrical = "theatrical",
    stunt = "stunt",
    dance = "dance",
    musical = "musical"
}
export enum ScareLevel {
    mild = "mild",
    extreme = "extreme",
    moderate = "moderate"
}
export enum ScareType {
    jumpScare = "jumpScare",
    ambient = "ambient",
    interactive = "interactive",
    psychological = "psychological",
    physical = "physical"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VoiceType {
    lowPitch = "lowPitch",
    creepy = "creepy",
    playful = "playful",
    silent = "silent",
    highPitch = "highPitch"
}
export enum ZoneLocation {
    both = "both",
    indoor = "indoor",
    outdoor = "outdoor"
}
export interface backendInterface {
    addAuditionLink(link: AuditionLink): Promise<void>;
    addRoomAssignments(assignments: Array<RoomAssignment>): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearAuditionLinks(): Promise<void>;
    createContentItem(item: ContentItem): Promise<bigint>;
    createTunnelMap(name: string, rooms: Array<Room>, connections: Array<Connection>): Promise<bigint>;
    createTunnelSchedule(date: string, shift: string, specialEvent: string | null, roomAssignments: Array<RoomAssignment>, roomSchedules: Array<RoomSchedule>): Promise<bigint>;
    deleteContentItem(id: bigint): Promise<void>;
    deleteTunnelMap(id: bigint): Promise<void>;
    deleteTunnelSchedule(id: bigint): Promise<void>;
    getAllAuditions(): Promise<Array<AuditionSubmission>>;
    getAllContentItems(): Promise<Array<ContentItem>>;
    getAllTunnelMaps(): Promise<Array<TunnelMap>>;
    getAllTunnelSchedules(): Promise<Array<TunnelSchedule>>;
    getAttractions(): Promise<Array<ContentItem>>;
    getAuditionLinks(): Promise<Array<AuditionLink>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContentItem(id: bigint): Promise<ContentItem | null>;
    getEmployeeUpcomingEvents(currentDate: Date_): Promise<Array<UpcomingEvent>>;
    getEventUnlockStatus(): Promise<EventUnlockStatus>;
    getEvents(): Promise<Array<ContentItem>>;
    getHauntedHouses(): Promise<Array<ContentItem>>;
    getMainHauntSchedule(): Promise<Array<EventDateRange>>;
    getRoomAssignments(): Promise<Array<Array<RoomAssignment>>>;
    getScareZones(): Promise<Array<ContentItem>>;
    getShows(): Promise<Array<ContentItem>>;
    getStaffingCounts(): Promise<StaffingCounts>;
    getTunnelMap(id: bigint): Promise<TunnelMap | null>;
    getTunnelSchedule(id: bigint): Promise<TunnelSchedule | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    now(): Promise<bigint>;
    removeAuditionLink(index: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedInitialContent(): Promise<void>;
    submitCostumeCharacterAudition(form: CostumeCharacterAuditionForm): Promise<boolean>;
    submitDanceAudition(form: DanceAuditionForm): Promise<boolean>;
    submitScareActorAudition(form: ScareActorAuditionForm): Promise<boolean>;
    updateAuditionLink(index: bigint, updatedLink: AuditionLink): Promise<void>;
    updateContentItem(id: bigint, updatedItem: ContentItem): Promise<void>;
    updateMainHauntSchedule(newSchedule: Array<EventDateRange>): Promise<void>;
    updateTunnelMap(id: bigint, updatedMap: TunnelMap): Promise<void>;
    updateTunnelSchedule(id: bigint, updatedSchedule: TunnelSchedule): Promise<void>;
}
