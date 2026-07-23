export type PriceTier = "free" | "$" | "$$" | "$$$";
export type WeatherMode = "Sunny" | "Hot" | "Rainy";
export type Duration = "short" | "medium" | "long";
export type Role =
  "Opening" | "Main" | "Food" | "Sunset" | "Event" | "Optional";
export interface Hours {
  open: number;
  close: number;
  label: string;
}
export interface Destination {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  borough: string;
  lat: number;
  lng: number;
  hours: Hours;
  priceTier: PriceTier;
  indoorOutdoor: "indoor" | "outdoor" | "mixed";
  dietaryTags: string[];
  reservationRequired: boolean;
  ticketRequired: boolean;
  seasonalTags: string[];
  sourceNote: string;
  lastVerified: string;
  confidence: "high" | "medium" | "low";
  vibes?: string[];
  shaded?: boolean;
}
export interface Event {
  id: string;
  title: string;
  venueRef?: string;
  location?: string;
  lat: number;
  lng: number;
  startDateTime: string;
  endDateTime: string;
  price: PriceTier;
  ticketRequired: boolean;
  category: string;
}
export interface Preferences {
  date: string;
  startTime: string;
  duration: Duration;
  neighborhood: string;
  audience: string;
  vibe: string;
  budget: PriceTier;
  weather: WeatherMode;
  indoorOutdoor?: string;
}
export interface PlanStop {
  role: Role;
  destination?: Destination;
  event?: Event;
  reason: string;
}
export interface Itinerary {
  preferences: Preferences;
  stops: PlanStop[];
  warnings: string[];
}
