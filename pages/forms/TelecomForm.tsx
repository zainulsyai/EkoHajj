import React, { useState } from 'react';
import { Input, Toggle } from '../../components/InputFields';
import { Save, Signal, ArrowLeft, Globe, User, Users, MapPin, Calendar, FileText } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface TelecomFormProps {
    onBack: () => void;
}

export const TelecomForm: React.FC<TelecomFormProps> = ({ onBack }) => {
  const { telecomData, setTelecomData, telecomActive, setTelecomActive } = useData();

  // Identity State
  const [respondentName, setRespondentName] = useState(''); 
  const [kloter, setKloter] = useState(''); 
  const [embarkation, setEmbarkation] = useState(''); 
  const [province, setProvince] = useState(''); 
  const [surveyDate, setSurveyDate] = useState(''); 
  const [surveyor, setSurveyor] = useState(''); 

  const toggleProvider = (id: number) => {
    setTelecomActive(prev => ({...prev, [id]: !prev[id]}));
  };

  const updatePackage = (id: number, val: string) => {
    setTelecomData(prev => prev.map(p => p.id === id ? {...p, roamingPackage: val} : p));
  };

  const getProviderTheme = (name: string) => {
      // Branding colors for logo/icon only
      if(name.includes('Telkomsel')) return { bg: 'bg-[#E30613]', text: 'text-[#E30613]' };
      if(name.includes('Indosat')) return { bg: 'bg-[#FFD100]', text: 'text-yellow-600' };
      if(name.includes('XL')) return { bg: 'bg-[#1D4F91]', text: 'text-[#1D4F91]' };
      return { bg: 'bg-gray-600', text: 'text-gray-600' };
  };

  return (
    <div className="flex flex-col relative font-sans bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl overflow-hidden transition-all duration-500">
      
      {/* HEADER */}
      <div className="relative z-20 bg-white/40 backdrop-blur-lg border-b border-white/50 px-8 py-6">
         <div className="flex items-center justify-between gap-6 mb-8">
             <div className="flex items-center gap-6">
                 <button onClick={onBack} className="p-3 rounded-2xl hover:bg-white text-gray-500 hover:text-[#064E3B] transition-all border border-transparent hover:border-gray-200 shadow-sm"><ArrowLeft size={22} /></button>
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-[#064E3B]/20 bg-gradient-to-br from-[#064E3B] to-[#042f24] text-white ring-4 ring-white/50">
                        <Signal size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#064E3B] leading-none tracking-tight font-playfair mb-1.5">Telekomunikasi</h1>
                        <p className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 inline-block px-2 py-0.5 rounded-md border border-[#D4AF37]/20">Provider & Roaming</p>
                    </div>
                 </div>
             </div>
             
             <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 bg-[#064E3B] hover:bg-[#053d2e] text-white rounded-xl shadow-lg shadow-[#064E3B]/20 text-sm font-bold transition-all transform hover:translate-y-[-2px] hover:shadow-xl">
                <Save size={18} /> <span>Simpan Data</span>
             </button>
         </div>

         {/* Identity Panel */}
         <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/50">
                <div className="p-2 bg-[#064E3B]/10 rounded-xl"><FileText size={18} className="text-[#064E3B]" /></div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">A. Identitas Responden</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                  <div className="md:col-span-2">
                      <PremiumInput label="1. Nama Responden" icon={User} value={respondentName} onChange={setRespondentName} placeholder="Nama Jemaah..." />
                  </div>
                  <PremiumInput label="2. Kloter" icon={Users} value={kloter} onChange={setKloter} placeholder="Kloter..." />
                  <PremiumInput label="3. Embarkasi" icon={MapPin} value={embarkation} onChange={setEmbarkation} placeholder="Kota..." />
                  <PremiumInput label="4. Provinsi" icon={MapPin} value={province} onChange={setProvince} placeholder="Prov..." />
                  <PremiumInput label="5. Tanggal Survei" icon={Calendar} type="date" value={surveyDate} onChange={setSurveyDate} />
                  <PremiumInput label="6. Surveyor" icon={User} value={surveyor} onChange={setSurveyor} placeholder="Nama Surveyor..." />
              </div>
         </div>
      </div>

      {/* GRID CONTENT */}
      <div className="p-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
            {telecomData.map((prov) => {
                const theme = getProviderTheme(prov.providerName);
                const isActive = telecomActive[prov.id];

                return (
                    <div 
                        key={prov.id} 
                        className={`relative rounded-3xl transition-all duration-300 overflow-hidden flex flex-col group
                        ${isActive 
                            ? `bg-white shadow-[0_10px_30px_rgba(6,78,59,0.1)] ring-2 ring-[#064E3B]/30` 
                            : 'bg-white/30 border border-white hover:bg-white hover:shadow-lg opacity-80 hover:opacity-100'}`}
                    >
                       <div className="p-8 flex-1 flex flex-col">
                           <div className="flex justify-between items-start mb-8">
                               {/* Brand Icon stays branded for recognition, but frame is uniform */}
                               <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg shadow-gray-200 ${theme.bg} ${prov.providerName.includes('Indosat') ? 'text-black' : 'text-white'}`}>
                                    {prov.providerName.charAt(0)}
                               </div>
                               <Toggle checked={!!isActive} onChange={() => toggleProvider(prov.id)} />
                           </div>

                           <div className="mb-6">
                               <h3 className={`text-2xl font-bold font-playfair mb-1 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                   {prov.providerName}
                               </h3>
                               <p className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-[#064E3B]' : 'text-gray-400'}`}>
                                   {isActive ? 'Provider Aktif' : 'Tidak Dipilih'}
                               </p>
                           </div>
                           
                           <div className={`transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 max-h-40' : 'opacity-30 max-h-0 overflow-hidden'}`}>
                                <div className="space-y-2">
                                    <label className={`text-[10px] font-bold uppercase flex items-center gap-1.5 ${isActive ? 'text-[#064E3B]' : 'text-gray-400'}`}>
                                        <Globe size={12} /> Paket Roaming
                                    </label>
                                    <Input 
                                        value={prov.roamingPackage} 
                                        onChange={(e) => updatePackage(prov.id, e.target.value)} 
                                        className={`!py-3.5 !px-4 !text-sm !bg-gray-50/50 focus:!bg-white !border-gray-200 focus:!border-[#064E3B] !rounded-xl !font-medium`} 
                                        placeholder="Contoh: Paket Haji 30 Hari..."
                                    />
                                </div>
                           </div>
                       </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

const PremiumInput = ({ label, icon: Icon, type = "text", value, onChange, placeholder }: any) => (
    <div className="flex flex-col gap-2 group">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-[#064E3B] transition-colors">
            <Icon size={12} className="text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" /> {label}
        </label>
        <div className="relative">
            <input 
                type={type} 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                className="w-full text-sm font-semibold text-gray-700 bg-white/60 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 outline-none transition-all shadow-sm placeholder:font-medium placeholder:text-gray-300 hover:border-gray-300 hover:bg-white/80" 
                placeholder={placeholder} 
            />
        </div>
    </div>
);