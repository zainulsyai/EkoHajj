import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  isLoading: boolean;
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

// Helper to generate data with ONLY ONE example (index 0)
const generateBumbu = (location: string) => initialBumbuNames.map((name, index) => {
    const isExample = index === 0; // Only the first item has data
    
    return {
        id: index,
        name,
        isUsed: isExample, 
        volume: isExample ? '10.5' : '',
        price: isExample ? '2500' : '',
        otherIngredients: '',
        originProduct: isExample ? 'Indofood' : '',
        productPrice: isExample ? '150' : '',
        // Metadata - Filled only for the example to show format
        companyName: isExample ? (location === 'Makkah' ? 'PT. Catering Makkah Sejahtera' : 'CV. Madinah Berkah') : '',
        kitchenName: isExample ? (location === 'Makkah' ? 'Dapur Al-Haram Sektor 1' : 'Dapur Madinah Al-Munawwarah') : '',
        address: isExample ? (location === 'Makkah' ? 'Jl. King Abdul Aziz No. 12' : 'Jl. King Fahd No. 88') : '',
        pic: isExample ? (location === 'Makkah' ? 'Abdullah' : 'Yusuf') : '',
        surveyor: isExample ? 'Ahmad Faisal' : '',
        date: isExample ? '15/06/2026' : '',
        time: isExample ? '09.00' : ''
    };
});

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Initial Data Mocking
  const [bumbuMakkah, setBumbuMakkah] = useState<BumbuRecord[]>([]);
  const [bumbuMadinah, setBumbuMadinah] = useState<BumbuRecord[]>([]);
  const [rteData, setRteData] = useState<RTERecord[]>([]);
  const [tenantData, setTenantData] = useState<TenantRecord[]>([]);
  const [expeditionData, setExpeditionData] = useState<ExpeditionRecord[]>([]);
  const [telecomData, setTelecomData] = useState<TelecomRecord[]>([]);
  const [telecomActive, setTelecomActive] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
        // 1. Bumbu: List all names, but only fill the first one
        setBumbuMakkah(generateBumbu('Makkah'));
        setBumbuMadinah(generateBumbu('Madinah'));

        // 2. RTE: Single Example
        setRteData([
            { 
                id: 1, 
                companyName: 'PT. Halalan Thayyiban Indonesia', 
                spiceType: 'Rendang Daging', 
                isUsed: true, 
                volume: '15000', 
                price: '25000', 
                kitchenName: 'Dapur Sektor 3', 
                address: 'Aziziah South', 
                pic: 'Mr. Hamzah', 
                surveyor: 'Siti Aminah', 
                date: '14/06/2026', 
                time: '14.30' 
            }
        ]);

        // 3. Tenant: Single Example
        setTenantData([
            { 
                id: 1, 
                shopName: 'Toko Al-Barakah', 
                productType: 'Oleh-oleh', 
                bestSeller: 'Kurma Ajwa', 
                rentCost: '15000', 
                hotelName: 'Hotel Al-Kiswah', 
                location: 'Lobby Tower 1', 
                pic: 'Ahmed', 
                surveyor: 'Dewi Sartika', 
                date: '10/06/2026', 
                time: '16.00' 
            }
        ]);

        // 4. Expedition: Single Example
        setExpeditionData([
            { 
                id: 1, 
                companyName: 'Garuda Cargo', 
                pricePerKg: '25', 
                weight: '2400', 
                hotelName: 'Hotel 101', 
                location: 'Lobby Area', 
                pic: 'Bambang', 
                surveyor: 'Ahmad Faisal', 
                date: '13/06/2026', 
                time: '09.00' 
            }
        ]);

        // 5. Telecom: List Providers, but only fill details for the first one
        const providers = [
            'Telkomsel', 'Indosat Ooredoo', 'XL Axiata', 'Smartfren', 'Tri (3)', 'AXIS'
        ];
        
        const initialTelecoms = providers.map((name, idx) => {
            const isExample = idx === 0;
            return {
                id: idx + 1,
                providerName: name,
                roamingPackage: isExample ? 'Paket Haji 30 Hari' : '',
                respondentName: isExample ? 'H. Abdullah' : '',
                kloter: isExample ? 'JKG-01' : '',
                embarkation: isExample ? 'Jakarta' : '',
                province: isExample ? 'DKI Jakarta' : '',
                surveyor: isExample ? 'Budi Santoso' : '',
                date: '14/06/2026', 
                time: '08.15' 
            };
        });

        setTelecomData(initialTelecoms);
        setTelecomActive({ 1: true }); // Only first one active
        
        setIsLoading(false);
    }, 1500);

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
      telecomActive, setTelecomActive,
      isLoading
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