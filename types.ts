
export interface BumbuRecord {
  id: number;
  name: string;
  isUsed: boolean;
  volume: string;
  price: string;
  otherIngredients: string;
  originProduct: string;
  productPrice: string;
  companyName?: string; // Added: Perusahaan Penyedia per item
  // Metadata Identitas
  kitchenName?: string;
  address?: string; // Added
  pic?: string;     // Added
  surveyor?: string;
  date?: string;
  time?: string;    // Added
}

export interface RTERecord {
  id: number;
  companyName: string;
  spiceType: string;
  isUsed: boolean;
  volume: string;
  price: string;
  // Metadata Identitas
  kitchenName?: string; // Changed/Standardized
  address?: string;     // Added
  pic?: string;         // Added
  surveyor?: string;
  date?: string;
  time?: string;        // Added
}

export interface TenantRecord {
  id: number;
  shopName: string;
  productType: string;
  bestSeller: string;
  rentCost: string;
  // Metadata Identitas
  hotelName?: string;
  location?: string;    // Added (Area/Floor)
  pic?: string;         // Added
  surveyor?: string;
  date?: string;
  time?: string;        // Added
}

export interface ExpeditionRecord {
  id: number;
  companyName: string;
  pricePerKg: string;
  weight: string;
  // Metadata Identitas
  hotelName?: string;
  location?: string;    // Added
  pic?: string;         // Added
  surveyor?: string;
  date?: string;
  time?: string;        // Added
}

export interface TelecomRecord {
  id: number;
  providerName: string;
  roamingPackage: string;
  // Metadata Identitas
  respondentName?: string;
  kloter?: string;
  embarkation?: string; // Added
  province?: string;    // Added
  surveyor?: string;
  date?: string;
  time?: string;        // Added
}

export enum Page {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  DATA_ENTRY_PORTAL = 'DATA_ENTRY_PORTAL',
  FORM_BUMBU = 'FORM_BUMBU',
  FORM_RTE = 'FORM_RTE',
  FORM_TENANT = 'FORM_TENANT',
  FORM_EXPEDITION = 'FORM_EXPEDITION',
  FORM_TELECOM = 'FORM_TELECOM',
  REPORTS = 'REPORTS',
  VISUALIZATION = 'VISUALIZATION',
  SETTINGS = 'SETTINGS'
}