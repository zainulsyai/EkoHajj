import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BumbuRecord, RTERecord, TenantRecord, ExpeditionRecord, TelecomRecord, RiceRecord } from '../types';

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
  riceData: RiceRecord[];
  setRiceData: React.Dispatch<React.SetStateAction<RiceRecord[]>>;
  telecomActive: Record<number, boolean>;
  setTelecomActive: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- PDF Page 1-3 Data Source ---
const bumbuSource = [
  { company: 'PT. Halalan Thayyiban Indonesia (HTI)', name: 'Bumbu Nasi Kuning' },
  { company: 'PT. Foodindo Dwivestama', name: 'Bumbu Gulai' },
  { company: 'PT. Pangansari Utama Food', name: 'Bumbu Tongseng' },
  { company: 'PT. Laukita Bersama Indonesia', name: 'Bumbu Nasi Goreng' },
  { company: 'PT. Alnusakon Era Laju', name: 'Bumbu Opor' },
  { company: 'PT. Sekar Laut', name: 'Bumbu Bistik/Teriyaki' },
  { company: 'PT. Foodex Inti Ingredients', name: 'Bumbu Nasi Goreng Kampung' },
  { company: 'PT. Ikafood Putramas', name: 'Bumbu Kecap' },
  { company: 'PT. Niaga Citra Mandiri', name: 'Bumbu Gepuk' },
  { company: 'PT. Berkah Abadi Pangan', name: 'Bumbu Krengsengan' },
  { company: '', name: 'Bumbu Nasi Uduk' },
  { company: '', name: 'Bumbu Woku' },
  { company: '', name: 'Bumbu Balado' },
  { company: '', name: 'Bumbu Rica' },
  { company: '', name: 'Bumbu Semur' },
  { company: '', name: 'Bumbu Rajang' },
  { company: '', name: 'Bumbu Bali' },
  { company: '', name: 'Bumbu Saus Tiram' },
  { company: '', name: 'Bumbu Tumis' },
  { company: '', name: 'Bumbu Lada Hitam' },
  { company: '', name: 'Bumbu Saus Mentega' },
  { company: '', name: 'Bumbu Asam Manis' },
  { company: '', name: 'Bumbu Rujak' },
  { company: '', name: 'Bumbu Rendang' },
  { company: '', name: 'Bumbu Kuning' },
  { company: '', name: 'Bumbu Dabu-Dabu' },
  { company: '', name: 'Bumbu Pesmol' },
  { company: '', name: 'Bumbu Habang' }
];

// --- PDF Page 7-8 Data Source ---
const rteSource = [
  { company: 'PT. Halalan Thayyiban Indonesia (HTI)', menu: 'Nasi, Rendang Daging, Kacang Merah' },
  { company: 'PT. Family Food Indonesia', menu: 'Nasi, Bumbu Daging Balado, Wortel dan kentang' },
  { company: 'PT. Berkat Pangan Abadi', menu: 'Nasi, Sayur, Semur Ayam, Kacang Merah' },
  { company: 'PT. Laukita Bersama Indonesia (Umara)', menu: 'Nasi, Kari Ayam, Kentang' },
  { company: 'PT. Foodex inti Ingredients', menu: 'Nasi, Gulai Ayam, Wortel, Kentang' },
  { company: 'PT. Indo Niara Agro (Inagro)', menu: 'Nasi, Daging Bumbu lada hitam, Kacang Merah' },
  { company: 'PT. Adipura Mandiri Indotama', menu: '' },
  { company: 'PT. Jakarana Tama', menu: '' },
  { company: 'PT. Pangansari Utama Food Distribution', menu: '' },
  { company: 'PT Kokikit Indonesia Teknologi', menu: '' },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [bumbuMakkah, setBumbuMakkah] = useState<BumbuRecord[]>([]);
  const [bumbuMadinah, setBumbuMadinah] = useState<BumbuRecord[]>([]);
  const [rteData, setRteData] = useState<RTERecord[]>([]);
  const [tenantData, setTenantData] = useState<TenantRecord[]>([]);
  const [expeditionData, setExpeditionData] = useState<ExpeditionRecord[]>([]);
  const [telecomData, setTelecomData] = useState<TelecomRecord[]>([]);
  const [riceData, setRiceData] = useState<RiceRecord[]>([]);
  const [telecomActive, setTelecomActive] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
        // 1. Initialize Bumbu (Exact list from PDF)
        const mapBumbu = (list: typeof bumbuSource) => list.map((item, idx) => ({
            id: idx + 1,
            name: item.name,
            companyName: item.company, // Pre-filled company from PDF
            isUsed: false, 
            volume: '',
            price: '',
            otherIngredients: '',
            originProduct: '',
            productPrice: ''
        }));
        setBumbuMakkah(mapBumbu(bumbuSource));
        setBumbuMadinah(mapBumbu(bumbuSource));

        // 2. Initialize RTE (Exact list from PDF)
        const mappedRTE = rteSource.map((item, idx) => ({
            id: idx + 1, 
            companyName: item.company, 
            spiceType: item.menu, 
            isUsed: false, 
            volume: '', 
            price: '' 
        }));
        setRteData(mappedRTE);

        // 3. Initialize Tenant (Empty rows for survey)
        setTenantData([
            { id: 1, shopName: '', productType: '', bestSeller: '', rentCost: '' },
            { id: 2, shopName: '', productType: '', bestSeller: '', rentCost: '' }
        ]);

        // 4. Initialize Expedition (Empty rows for survey)
        setExpeditionData([
            { id: 1, companyName: '', pricePerKg: '', weight: '' },
            { id: 2, companyName: '', pricePerKg: '', weight: '' }
        ]);

        // 5. Initialize Rice (Bulog Premium as No 1)
        setRiceData([
            { id: 1, companyName: 'Bulog', riceType: 'Premium', isUsed: true, volume: '', price: '', otherRice: '', originProduct: '', productPrice: '' },
            { id: 2, companyName: '', riceType: '', isUsed: false, volume: '', price: '', otherRice: '', originProduct: '', productPrice: '' },
            { id: 3, companyName: '', riceType: '', isUsed: false, volume: '', price: '', otherRice: '', originProduct: '', productPrice: '' }
        ]);

        // 6. Initialize Telecom
        const providers = ['Telkomsel', 'Indosat Ooredoo', 'XL Axiata', 'Smartfren', 'Tri (3)', 'AXIS'];
        setTelecomData(providers.map((name, idx) => ({ 
            id: idx + 1, 
            providerName: name, 
            roamingPackage: '',
            respondentName: '',
            kloter: '',
            embarkation: '',
            province: '',
            surveyor: '',
            date: '',
            time: ''
        })));
        
        setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DataContext.Provider value={{
      bumbuMakkah, setBumbuMakkah,
      bumbuMadinah, setBumbuMadinah,
      rteData, setRteData,
      tenantData, setTenantData,
      expeditionData, setExpeditionData,
      telecomData, setTelecomData,
      riceData, setRiceData,
      telecomActive, setTelecomActive,
      isLoading
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};