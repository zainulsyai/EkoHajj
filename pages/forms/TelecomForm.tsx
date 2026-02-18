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
    if (n.includes('telkomsel')) return <div className="w-full h-full bg-[#EC1C24] flex items-center justify-center p-2"><svg viewBox="0 0 160 40" className="w-full fill-white"><text x="50%" y="28" fontSize="24" fontWeight="900" textAnchor="middle">Telkomsel</text></svg></div>;
    if (n.includes('indosat')) return <div className="w-full h-full bg-[#FFD100] flex items-center justify-center p-2"><svg viewBox="0 0 140 40" className="w-full fill-black"><text x="50%" y="28" fontSize="24" fontWeight="800" textAnchor="middle">indosat</text></svg></div>;
    if (n.includes('xl')) return <div className="w-full h-full bg-[#002D72] flex items-center justify-center p-2 relative"><svg viewBox="0 0 60 40" className="w-full fill-white"><text x="30" y="32" fontSize="36" fontWeight="900" textAnchor="middle">XL</text></svg></div>;
    return <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold">{name.charAt(0)}</div>;
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
  const [newProvider, setNewProvider] = useState('');

  const toggleProvider = (id: number) => setTelecomActive(prev => ({...prev, [id]: !prev[id]}));
  const updatePackage = (id: number, val: string) => setTelecomData(prev => prev.map(p => p.id === id ? {...p, roamingPackage: val} : p));

  const handleAddProvider = () => {
    if (!newProvider.trim()) return;
    const newId = telecomData.length > 0 ? Math.max(...telecomData.map(p => p.id)) + 1 : 1;
    setTelecomData([...telecomData, { id: newId, providerName: newProvider, roamingPackage: '' }]);
    setNewProvider('');
    setTelecomActive(prev => ({...prev, [newId]: true}));
  };

  const handleDeleteProvider = (id: number) => {
    setTelecomData(prev => prev.filter(p => p.id !== id));
    setTelecomActive(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const getDateValue = (dateStr: string) => {
      if (!dateStr) return '';
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
  };
  const handleDateChange = (val: string) => {
      if (!val) { setSurveyDate(''); return; }
      const [year, month, day] = val.split('-');
      setSurveyDate(`${day}/${month}/${year}`);
  };

  const getTimeValue = (timeStr: string) => (timeStr ? timeStr.replace('.', ':') : '');
  const handleTimeChange = (val: string) => setSurveyTime(val.replace(':', '.'));

  return (
    <div className="flex flex-col relative font-sans bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl overflow-hidden animate-fade-in-up">
      <div className="relative z-20 bg-white/40 backdrop-blur-lg border-b border-white/50 px-8 py-6">
         <div className="flex items-center justify-between gap-6 mb-8">
             <div className="flex items-center gap-6">
                 <button onClick={onBack} className="p-3 rounded-2xl hover:bg-white text-gray-500 hover:text-[#064E3B] transition-all border border-transparent hover:border-gray-200"><ArrowLeft size={22} /></button>
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-[#064E3B]/20 bg-gradient-to-br from-[#064E3B] to-[#042f24] text-white ring-4 ring-white/50">
                        <Signal size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#064E3B] font-playfair leading-tight">Telekomunikasi</h1>
                        <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 inline-block px-2 py-0.5 rounded border border-[#D4AF37]/20">Potensi Provider Jemaah</p>
                    </div>
                 </div>
             </div>
             <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 bg-[#064E3B] text-white rounded-xl shadow-lg text-sm font-bold hover:scale-105 transition-all"><Save size={18} /> Simpan</button>
         </div>

         <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/50">
                <div className="p-2 bg-[#064E3B]/10 rounded-xl"><FileText size={18} className="text-[#064E3B]" /></div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">A. Identitas Responden & Petugas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PremiumInput label="1. Nama Responden" icon={User} value={respondentName} onChange={setRespondentName} placeholder="Nama Jemaah..." />
                  <PremiumInput label="2. Kloter" icon={Users} value={kloter} onChange={setKloter} placeholder="Kloter..." />
                  <PremiumInput label="3. Embarkasi" icon={MapPin} value={embarkation} onChange={setEmbarkation} placeholder="Kota Embarkasi..." />
                  <PremiumInput label="4. Provinsi" icon={MapPin} value={province} onChange={setProvince} placeholder="Provinsi..." />
                  <PremiumInput label="5. Tanggal Survei" icon={Calendar} type="date" value={getDateValue(surveyDate)} onChange={handleDateChange} />
                  <PremiumInput label="6. Petugas Survei" icon={User} value={surveyor} onChange={setSurveyor} placeholder="Nama Petugas..." />
              </div>
         </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
            {telecomData.map((prov) => {
                const isActive = telecomActive[prov.id];
                return (
                    <div key={prov.id} className={`relative rounded-3xl transition-all overflow-hidden flex flex-col p-6 border ${isActive ? 'bg-white shadow-xl ring-2 ring-[#064E3B]/30' : 'bg-white/30 border-white opacity-80'}`}>
                           <div className="flex items-center gap-4 mb-6">
                               <div className="w-20 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-100 shrink-0"><ProviderLogo name={prov.providerName} /></div>
                               <div className="flex-1 min-w-0"><h3 className={`text-lg font-bold font-playfair truncate ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{prov.providerName}</h3></div>
                               <div className="flex gap-2">
                                  {prov.id > 6 && <button onClick={() => handleDeleteProvider(prov.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>}
                                  <Toggle checked={!!isActive} onChange={() => toggleProvider(prov.id)} />
                               </div>
                           </div>
                           {isActive && (
                                <div className="space-y-2 pt-2 border-t border-dashed border-gray-200 animate-fade-in">
                                    <label className="text-[10px] font-bold uppercase flex items-center gap-1.5 text-[#064E3B]"><Globe size={12} /> Paket Roaming (RoaMax)</label>
                                    <Input value={prov.roamingPackage} onChange={(e) => updatePackage(prov.id, e.target.value)} placeholder="Misal: Paket Haji 30 Hari..." className="!bg-gray-50 !border-gray-100" />
                                </div>
                           )}
                    </div>
                );
            })}
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white/40 flex flex-col items-center justify-center p-8 text-center group min-h-[200px]">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 mb-3 group-hover:bg-[#064E3B] group-hover:text-white transition-all"><Plus size={24} /></div>
                <input type="text" value={newProvider} onChange={(e) => setNewProvider(e.target.value)} placeholder="Provider Baru..." className="w-full bg-white border border-gray-200 rounded-lg text-xs p-2 mb-2 text-center" />
                <button onClick={handleAddProvider} disabled={!newProvider.trim()} className="w-full py-2 bg-[#064E3B] text-white rounded-lg text-xs font-bold disabled:opacity-50 transition-all">Tambah Provider</button>
            </div>
        </div>
      </div>
    </div>
  );
};

const PremiumInput = ({ label, icon: Icon, type = "text", value, onChange, placeholder }: any) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-[#064E3B] transition-colors">
      <Icon size={12} className="text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" /> {label}
    </label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full text-sm font-semibold text-gray-700 bg-white/60 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 outline-none transition-all placeholder:text-gray-300" placeholder={placeholder} />
  </div>
);