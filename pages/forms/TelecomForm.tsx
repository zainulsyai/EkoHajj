import React, { useState } from 'react';
import { Input, Toggle } from '../../components/InputFields';
import { Save, Signal, ArrowLeft, Globe, User, Users, MapPin, Calendar, FileText, Clock, Plus, Trash2 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface TelecomFormProps {
    onBack: () => void;
}

// Component to render authentic brand logos
const ProviderLogo = ({ name }: { name: string }) => {
    const n = name.toLowerCase();
    
    // Telkomsel - Red Theme
    if (n.includes('telkomsel')) {
        return (
            <div className="w-full h-full bg-[#EC1C24] flex items-center justify-center p-2">
                 <svg viewBox="0 0 160 40" className="w-full h-auto fill-white">
                     {/* Simplified Telkomsel Logotype */}
                     <path d="M10,20 Q10,10 20,10 H140 Q150,10 150,20 Q150,30 140,30 H20 Q10,30 10,20 Z" opacity="0" />
                     <text x="50%" y="28" fontSize="24" fontFamily="sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="-1">Telkomsel</text>
                 </svg>
            </div>
        );
    }
    // Indosat Ooredoo - Yellow Theme
    if (n.includes('indosat')) {
        return (
             <div className="w-full h-full bg-[#FFD100] flex items-center justify-center p-2">
                 <svg viewBox="0 0 140 40" className="w-full h-auto fill-black">
                     <text x="50%" y="28" fontSize="24" fontFamily="sans-serif" fontWeight="800" textAnchor="middle" letterSpacing="-0.5">indosat</text>
                 </svg>
            </div>
        );
    }
    // XL Axiata - Blue Theme
    if (n.includes('xl')) {
         return (
             <div className="w-full h-full bg-[#002D72] flex items-center justify-center p-2 relative overflow-hidden">
                 {/* Green corner accent */}
                 <div className="absolute top-0 right-0 w-6 h-6 bg-[#8CC63F] -mr-3 -mt-3 transform rotate-45"></div>
                 <svg viewBox="0 0 60 40" className="w-full h-auto fill-white">
                     <text x="30" y="32" fontSize="36" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">XL</text>
                 </svg>
            </div>
        );
    }
    // Smartfren - White/Pink Theme
    if (n.includes('smartfren')) {
         return (
             <div className="w-full h-full bg-white flex items-center justify-center p-2 border border-gray-100">
                 <svg viewBox="0 0 140 40" className="w-full h-auto fill-[#E50059]">
                     <text x="50%" y="26" fontSize="22" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="-0.5">smartfren</text>
                     <circle cx="50%" cy="34" r="2.5" fill="#E50059"/>
                 </svg>
            </div>
        );
    }
    // Tri (3) - Black Theme
    if (n.includes('tri') || n === '3') {
         return (
             <div className="w-full h-full bg-black flex items-center justify-center p-3">
                 <svg viewBox="0 0 40 40" className="w-auto h-full fill-white">
                      <path d="M12,8 H28 L20,18 L28,28 H12" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
            </div>
        );
    }
    // AXIS - Purple Theme
    if (n.includes('axis')) {
         return (
             <div className="w-full h-full bg-[#682079] flex items-center justify-center p-2">
                 <svg viewBox="0 0 100 40" className="w-full h-auto fill-white">
                     <text x="50%" y="30" fontSize="32" fontFamily="sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="1">AXIS</text>
                 </svg>
            </div>
        );
    }

    // Default Fallback
    return (
        <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold">
            {name.charAt(0)}
        </div>
    );
};

export const TelecomForm: React.FC<TelecomFormProps> = ({ onBack }) => {
  const { telecomData, setTelecomData, telecomActive, setTelecomActive } = useData();

  // Identity State
  const [respondentName, setRespondentName] = useState(''); 
  const [kloter, setKloter] = useState(''); 
  const [embarkation, setEmbarkation] = useState(''); 
  const [province, setProvince] = useState(''); 
  const [surveyDate, setSurveyDate] = useState(''); 
  const [surveyTime, setSurveyTime] = useState(''); 
  const [surveyor, setSurveyor] = useState(''); 
  
  // New Provider State
  const [newProvider, setNewProvider] = useState('');

  const toggleProvider = (id: number) => {
    setTelecomActive(prev => ({...prev, [id]: !prev[id]}));
  };

  const updatePackage = (id: number, val: string) => {
    setTelecomData(prev => prev.map(p => p.id === id ? {...p, roamingPackage: val} : p));
  };

  const handleAddProvider = () => {
    if (!newProvider.trim()) return;
    const newId = telecomData.length > 0 ? Math.max(...telecomData.map(p => p.id)) + 1 : 1;
    setTelecomData([...telecomData, {
        id: newId,
        providerName: newProvider,
        roamingPackage: '',
        respondentName: respondentName,
        kloter: kloter, 
        embarkation: embarkation, 
        province: province, 
        surveyor: surveyor, 
        date: surveyDate, 
        time: surveyTime
    }]);
    setNewProvider('');
    // Automatically activate the new provider
    setTelecomActive(prev => ({...prev, [newId]: true}));
  };

  const handleDeleteProvider = (id: number) => {
    setTelecomData(prev => prev.filter(p => p.id !== id));
    setTelecomActive(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
    });
  };

  // CONVERSION HELPERS
  const getDateValue = (dateStr: string) => {
      if (!dateStr) return '';
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
  };
  const handleDateChange = (val: string) => {
      if (!val) {
          setSurveyDate('');
          return;
      }
      const [year, month, day] = val.split('-');
      setSurveyDate(`${day}/${month}/${year}`);
  };

  const getTimeValue = (timeStr: string) => {
      if (!timeStr) return '';
      return timeStr.replace('.', ':');
  };
  const handleTimeChange = (val: string) => {
      setSurveyTime(val.replace(':', '.'));
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
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">A. Identitas Responden & Petugas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                      <PremiumInput label="1. Nama Responden" icon={User} value={respondentName} onChange={setRespondentName} placeholder="Nama Jemaah..." />
                  </div>
                  <div className="flex gap-4">
                     <div className="w-1/2">
                        <PremiumInput label="2. Kloter" icon={Users} value={kloter} onChange={setKloter} placeholder="Kloter..." />
                     </div>
                     <div className="w-1/2">
                        <PremiumInput label="3. Embarkasi" icon={MapPin} value={embarkation} onChange={setEmbarkation} placeholder="Kota..." />
                     </div>
                  </div>
                  <PremiumInput label="4. Provinsi" icon={MapPin} value={province} onChange={setProvince} placeholder="Prov..." />
                  <PremiumInput label="5. Tanggal Survei" icon={Calendar} type="date" value={getDateValue(surveyDate)} onChange={handleDateChange} />
                  <PremiumInput label="6. Waktu Survei" icon={Clock} type="time" value={getTimeValue(surveyTime)} onChange={handleTimeChange} />
                  <PremiumInput label="7. Petugas Survei" icon={User} value={surveyor} onChange={setSurveyor} placeholder="Nama Petugas..." />
              </div>
         </div>
      </div>

      {/* GRID CONTENT */}
      <div className="p-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
            {telecomData.map((prov) => {
                const isActive = telecomActive[prov.id];

                return (
                    <div 
                        key={prov.id} 
                        className={`relative rounded-3xl transition-all duration-300 overflow-hidden flex flex-col group
                        ${isActive 
                            ? `bg-white shadow-[0_10px_30px_rgba(6,78,59,0.1)] ring-2 ring-[#064E3B]/30` 
                            : 'bg-white/30 border border-white hover:bg-white hover:shadow-lg opacity-80 hover:opacity-100'}`}
                    >
                       <div className="p-6 flex-1 flex flex-col">
                           {/* Header Row: Logo + Text + Toggle */}
                           <div className="flex items-center gap-4 mb-6">
                               {/* Brand Icon - Left Side */}
                               <div className="w-20 h-12 rounded-xl overflow-hidden shadow-md shadow-gray-200/50 border border-gray-100 shrink-0 relative">
                                    <ProviderLogo name={prov.providerName} />
                               </div>
                               
                               {/* Text Info - Middle */}
                               <div className="flex-1 min-w-0">
                                   <h3 className={`text-lg font-bold font-playfair leading-tight truncate ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                       {prov.providerName}
                                   </h3>
                                   <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${isActive ? 'text-[#064E3B]' : 'text-gray-400'}`}>
                                       {isActive ? 'Aktif' : 'Non-Aktif'}
                                   </p>
                               </div>

                               {/* Toggle & Actions - Right */}
                               <div className="shrink-0 flex items-center gap-2">
                                   {prov.id > 6 && (
                                       <button 
                                           onClick={() => handleDeleteProvider(prov.id)}
                                           className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                           title="Hapus Provider"
                                       >
                                           <Trash2 size={18} />
                                       </button>
                                   )}
                                   <Toggle checked={!!isActive} onChange={() => toggleProvider(prov.id)} />
                               </div>
                           </div>
                           
                           {/* Collapsible Content */}
                           <div className={`transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 max-h-40' : 'opacity-30 max-h-0 overflow-hidden'}`}>
                                <div className="space-y-2 pt-2 border-t border-dashed border-gray-200">
                                    <label className={`text-[10px] font-bold uppercase flex items-center gap-1.5 ${isActive ? 'text-[#064E3B]' : 'text-gray-400'}`}>
                                        <Globe size={12} /> Paket Roaming
                                    </label>
                                    <Input 
                                        value={prov.roamingPackage} 
                                        onChange={(e) => updatePackage(prov.id, e.target.value)} 
                                        className={`!py-3 !px-4 !text-sm !bg-gray-50/50 focus:!bg-white !border-gray-200 focus:!border-[#064E3B] !rounded-xl !font-medium`} 
                                        placeholder="Contoh: Paket Haji 30 Hari..."
                                    />
                                </div>
                           </div>
                       </div>
                    </div>
                );
            })}

            {/* Add Provider Card */}
            <div className="relative rounded-3xl border-2 border-dashed border-gray-300 bg-white/40 hover:bg-white/60 transition-all flex flex-col items-center justify-center p-8 text-center group min-h-[220px]">
                <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 mb-3 group-hover:scale-110 group-hover:bg-[#064E3B] group-hover:text-white transition-all shadow-sm">
                    <Plus size={28} />
                </div>
                <h3 className="text-base font-bold text-gray-600 mb-3">Tambah Provider</h3>
                <div className="w-full max-w-[200px] space-y-2">
                    <input 
                        type="text" 
                        value={newProvider}
                        onChange={(e) => setNewProvider(e.target.value.replace(/\b\w/g, l => l.toUpperCase()))}
                        placeholder="Nama Provider..."
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/10 outline-none text-center"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddProvider()}
                    />
                    <button 
                        onClick={handleAddProvider}
                        disabled={!newProvider.trim()}
                        className="w-full py-2 bg-[#064E3B] text-white rounded-lg text-xs font-bold hover:bg-[#053d2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Tambah
                    </button>
                </div>
            </div>

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