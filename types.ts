
export interface BumbuRecord {
  id: number;
  name: string;
  isUsed: boolean;
  volume: string;
  price: string;
  otherIngredients: string;
  originProduct: string;
  productPrice: string;
  // Metadata Identitas
  kitchenName?: string;
  surveyor?: string;
  date?: string;
}

export interface RTERecord {
  id: number;
  companyName: string;
  spiceType: string;
  isUsed: boolean;
  volume: string;
  price: string;
  // Metadata Identitas
  kitchenLocation?: string;
  surveyor?: string;
  date?: string;
}

export interface TenantRecord {
  id: number;
  shopName: string;
  productType: string;
  bestSeller: string;
  rentCost: string;
  // Metadata Identitas
  hotelName?: string;
  surveyor?: string;
  date?: string;
}

export interface ExpeditionRecord {
  id: number;
  companyName: string;
  pricePerKg: string;
  weight: string;
  // Metadata Identitas
  hotelName?: string;
  surveyor?: string;
  date?: string;
}

export interface TelecomRecord {
  id: number;
  providerName: string;
  roamingPackage: string;
  // Metadata Identitas
  respondentName?: string;
  kloter?: string;
  surveyor?: string;
}

export enum Page {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  DATA_ENTRY_PORTAL = 'DATA_ENTRY_PORTAL',
  FORM_BUMBU_MAKKAH = 'FORM_BUMBU_MAKKAH',
  FORM_BUMBU_MADINAH = 'FORM_BUMBU_MADINAH',
  FORM_RTE = 'FORM_RTE',
  FORM_TENANT = 'FORM_TENANT',
  FORM_EXPEDITION = 'FORM_EXPEDITION',
  FORM_TELECOM = 'FORM_TELECOM',
  REPORTS = 'REPORTS',
  VISUALIZATION = 'VISUALIZATION',
  SETTINGS = 'SETTINGS'
}
