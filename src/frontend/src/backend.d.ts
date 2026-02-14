import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ContentType = {
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
export interface AttractionSpecificFields {
    yearIntroduced?: bigint;
    ageRestriction: AgeRestriction;
    hasGuidedTour: boolean;
}
export type Time = bigint;
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
export interface ContentItem {
    id: bigint;
    useMainHauntSchedule: boolean;
    name: string;
    description: string;
    customType: ContentType;
    dates: Array<EventDateRange>;
}
export interface AuditionSubmission {
    submitter: Principal;
    formData: {
        __kind__: "scareActor";
        scareActor: ScareActorAuditionForm;
    } | {
        __kind__: "danceActor";
        danceActor: DanceAuditionForm;
    };
    auditionType: AuditionType;
    submissionTime: Time;
}
export interface EventSpecificFields {
    eventType: EventType;
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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum ZoneLocation {
    both = "both",
    indoor = "indoor",
    outdoor = "outdoor"
}
export interface backendInterface {
    addAuditionLink(link: AuditionLink): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearAuditionLinks(): Promise<void>;
    createContentItem(item: ContentItem): Promise<bigint>;
    deleteContentItem(id: bigint): Promise<void>;
    getAllAuditions(): Promise<Array<AuditionSubmission>>;
    getAllContentItems(): Promise<Array<ContentItem>>;
    getAttractions(): Promise<Array<ContentItem>>;
    getAuditionLinks(): Promise<Array<AuditionLink>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContentItem(id: bigint): Promise<ContentItem | null>;
    getEvents(): Promise<Array<ContentItem>>;
    getMainHauntSchedule(): Promise<Array<EventDateRange>>;
    getScareZones(): Promise<Array<ContentItem>>;
    getShows(): Promise<Array<ContentItem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    now(): Promise<bigint>;
    removeAuditionLink(index: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedInitialContent(): Promise<void>;
    submitDanceAudition(form: DanceAuditionForm): Promise<boolean>;
    submitScareActorAudition(form: ScareActorAuditionForm): Promise<boolean>;
    updateAuditionLink(index: bigint, updatedLink: AuditionLink): Promise<void>;
    updateContentItem(id: bigint, updatedItem: ContentItem): Promise<void>;
    updateMainHauntSchedule(newSchedule: Array<EventDateRange>): Promise<void>;
}
