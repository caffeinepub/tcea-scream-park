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
export interface Date_ {
    day: bigint;
    month: bigint;
    year: bigint;
}
export interface ShowSpecificFields {
    yearIntroduced?: bigint;
    performanceType: PerformanceType;
}
export interface ContentItem {
    id: bigint;
    useMainHauntSchedule: boolean;
    name: string;
    description: string;
    customType: ContentType;
    dates: Array<EventDateRange>;
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
export interface AttractionSpecificFields {
    yearIntroduced?: bigint;
    ageRestriction: AgeRestriction;
    hasGuidedTour: boolean;
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
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createContentItem(item: ContentItem): Promise<bigint>;
    deleteContentItem(id: bigint): Promise<void>;
    getAllContentItems(): Promise<Array<ContentItem>>;
    getAttractions(): Promise<Array<ContentItem>>;
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
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedInitialContent(): Promise<void>;
    updateContentItem(id: bigint, updatedItem: ContentItem): Promise<void>;
    updateMainHauntSchedule(newSchedule: Array<EventDateRange>): Promise<void>;
}
