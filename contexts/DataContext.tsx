import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BumbuRecord, RTERecord, TenantRecord, ExpeditionRecord, TelecomRecord } from '../types';

interface DataContextType {
  bumbuMakkah: BumbuRecord[];
  setBumbuMakkah: React.Dispatch<React.SetStateAction<BumbuRecord[]>>;
  bumbuMadinah: BumbuRecord[];
  setBumbuMadinah: React.Dispatch<React.SetStateAction<BumbuRecord[]>>;
  rteData: RTERecord[];
  setRteData: React.Dispatch<React.SetStateAction<RTERecord[]>>;
  tenantData: TenantRecord[];
  setTenantData: React.Dispatch<React.SetStateAction<TenantRecord[]>>;
  expeditionData: ExpeditionRecord[];
  setExpeditionData: React.Dispatch<React.SetStateAction<ExpeditionRecord[]>>;
  telecomData: TelecomRecord[];
  setTelecomData: React.Dispatch<React.SetStateAction<TelecomRecord[]>>;
  telecomActive: Record<number, boolean>;
  setTelecomActive: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialBumbuNames = [
  'Bumbu Nasi Kuning', 'Bumbu Gulai', 'Bumbu Tongseng', 'Bumbu Nasi Goreng',
  'Bumbu Opor', 'Bumbu Bistik/Teriyaki', 'Bumbu Nasi Goreng Kampung', 'Bumbu Kecap',
  'Bumbu Gepuk', 'Bumbu Krengsengan', 'Bumbu Nasi Uduk', 'Bumbu Woku',
  'Bumbu Balado', 'Bumbu Rica', 'Bumbu Semur', 'Bumbu Rajang',
  'Bumbu Bali', 'Bumbu Saus Tiram', 'Bumbu Tumis', 'Bumbu Lada Hitam',
  'Bumbu Saus Mentega', 'Bumbu Asam Manis', 'Bumbu Rujak', 'Bumbu Rendang',
  'Bumbu Kuning', 'Bumbu Dabu-Dabu', 'Bumbu Pesmol', 'Bumbu Habang'
];

const generateBumbu = (prices: number[]) => initialBumbuNames.map((name, index) => ({
    id: index,
    name,
    isUsed: index < 5, // Mock initial used
    volume: index < 5 ? (Math.random() * 100).toFixed(2) : '',
    price: index < 5 ? (prices[index % prices.length]).toString() : '',
    otherIngredients: '',
    originProduct: '',
    productPrice: ''
}));

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initial Data Mocking to avoid empty dashboard on first load
  const [bumbuMakkah, setBumbuMakkah] = useState<BumbuRecord[]>(generateBumbu([1500, 2000, 2500, 1800, 1200]));
  const [bumbuMadinah, setBumbuMadinah] = useState<BumbuRecord[]>(generateBumbu([1400, 1800, 2300, 1750, 1100]));
  
  const [rteData, setRteData] = useState<RTERecord[]>([
      { id: 1, companyName: 'PT. Halalan Thayyiban Indonesia', spiceType: 'Rendang Daging', isUsed: true, volume: '15000', price: '25000' },
      { id: 2, companyName: 'PT. Umara', spiceType: 'Ayam Kecap', isUsed: true, volume: '12000', price: '22000' },
      { id: 3, companyName: 'Foodex', spiceType: 'Daging Lada Hitam', isUsed: true, volume: '8000', price: '24000' },
  ]);

  const [tenantData, setTenantData] = useState<TenantRecord[]>([
    { id: 1, shopName: 'Toko Al-Barakah', productType: 'Oleh-oleh', bestSeller: 'Kurma Ajwa', rentCost: '15000' },
    { id: 2, shopName: 'Bin Dawood Express', productType: 'Retail', bestSeller: 'Coklat', rentCost: '45000' },
    { id: 3, shopName: 'Resto Nusantara', productType: 'Makanan', bestSeller: 'Bakso', rentCost: '20000' },
  ]);

  const [expeditionData, setExpeditionData] = useState<ExpeditionRecord[]>([
    { id: 1, companyName: 'Garuda Cargo', pricePerKg: '25', weight: '2400' },
    { id: 2, companyName: 'Saudia Cargo', pricePerKg: '22', weight: '3200' },
    { id: 3, companyName: 'Pos Indonesia', pricePerKg: '18', weight: '1500' },
  ]);

  const [telecomData, setTelecomData] = useState<TelecomRecord[]>([
    { id: 1, providerName: 'Telkomsel', roamingPackage: 'Paket Haji 30 Hari' },
    { id: 2, providerName: 'Indosat Ooredoo', roamingPackage: '' },
    { id: 3, providerName: 'XL Axiata', roamingPackage: '' },
    { id: 4, providerName: 'Lainnya', roamingPackage: '' },
  ]);
  
  const [telecomActive, setTelecomActive] = useState<Record<number, boolean>>({1: true, 2: false, 3: false, 4: false});

  return (
    <DataContext.Provider value={{
      bumbuMakkah, setBumbuMakkah,
      bumbuMadinah, setBumbuMadinah,
      rteData, setRteData,
      tenantData, setTenantData,
      expeditionData, setExpeditionData,
      telecomData, setTelecomData,
      telecomActive, setTelecomActive
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
