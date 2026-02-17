import React, { useState, useMemo } from 'react';
import { Toggle } from '../../components/InputFields';
import { BumbuRecord } from '../../types';
import { Save, Search, ChefHat, ArrowLeft, ChevronDown, ChevronUp, MapPin, Calendar, Clock, User, ClipboardList, Package, DollarSign, Globe, FileText, AlertCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface SpiceFormProps {
  location: 'Makkah' | 'Madinah';
  onBack: () => void;
}

export const SpiceForm: React.FC<SpiceFormProps> = ({ location, onBack }) => {
  const { bumbuMakkah, setBumbuMakkah, bumbuMadinah, setBumbuMadinah } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isIdentityExpanded, setIsIdentityExpanded] = useState(true);
  const [otherReason, setOtherReason] = useState('');

  // Select correct data source based on location
  const records = location === 'Makkah' ? bumbuMakkah : bumbuMadinah;
  const setRecords = location === 'Makkah' ? setBumbuMakkah : setBumbuMadinah;

  // Identity State
  const [kitchenName, setKitchenName] = useState('');
  const [address, setAddress] = useState('');
  const [pic, setPic] = useState('');
  const [monitorDate, setMonitorDate] = useState('');
  const [monitorTime, setMonitorTime] = useState('');
  const [officer, setOfficer] = useState('');

  const handleRecordChange = (id: number, field: keyof BumbuRecord, value: any) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const filteredRecords = useMemo(() => {
    return records.filter(record => 
        record.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [records, searchTerm]);

  return (
    <div className="flex flex-col relative font-sans bg-[#F8FAFC] rounded-[2rem] border border-white/60 shadow-xl overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute -top-[20%] -right-[20%] w-[800px] h-[800px] bg-[#064E3B]/5 rounded-full blur-[120px]"></div>
         <div className="absolute -bottom-[20%] -left-[20%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      {/* HEADER */}
      <div className="relative z-20 bg-white/80 backdrop-blur-xl border-b border-white/60 shadow-sm transition-all">
          <div className="px-8 py-5 flex items-center justify-between gap-6">
             <div className="flex items-center gap-5">
                 <button onClick={onBack} className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-all border border-transparent hover:border-gray-200"><ArrowLeft size={20} /></button>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-[#064E3B]/20 bg-gradient-to-br from-[#064E3B] to-[#042f24] text-white ring-4 ring-white">
                        <ChefHat size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-none tracking-tight font-playfair">Bumbu {location}</h1>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Layanan Konsumsi</p>
                        </div>
                    </div>
                 </div>
             </div>

             <div className="flex items-center gap-3">
                <div className="relative group hidden lg:block">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#064E3B] transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Cari jenis bumbu..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-11 pr-5 py-2.5 w-64 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 transition-all"
                    />
                </div>
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#064E3B] hover:bg-[#053d2e] text-white rounded-xl shadow-lg shadow-[#064E3B]/20 text-sm font-bold transition-all transform hover:translate-y-[-2px] hover:shadow-xl"
                >
                    <Save size={18} /> <span>Simpan Data</span>
                </button>
             </div>
          </div>

          {/* Identity Panel (A. Identitas Lokasi) */}
          <div className="px-8 pb-2 relative">
             <div className={`bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm relative z-10 ${isIdentityExpanded ? 'max-h-[500px] opacity-100 mb-6 p-6' : 'max-h-0 opacity-0 mb-0 p-0 border-0'}`}>
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200/60">
                    <div className="p-1.5 bg-[#064E3B]/10 rounded-lg"><FileText size={16} className="text-[#064E3B]" /></div>
                    <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">A. Identitas Lokasi</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  <PremiumInput label="1. Nama Dapur" icon={MapPin} value={kitchenName} onChange={setKitchenName} placeholder="Isi nama dapur..." />
                  <PremiumInput label="2. Alamat" icon={MapPin} value={address} onChange={setAddress} placeholder="Isi alamat lengkap..." />
                  <PremiumInput label="3. Penanggung Jawab Dapur" icon={User} value={pic} onChange={setPic} placeholder="Isi nama PIC..." />
                  <PremiumInput label="4. Tanggal Monitoring" icon={Calendar} type="date" value={monitorDate} onChange={setMonitorDate} />
                  <PremiumInput label="5. Waktu Monitoring" icon={Clock} type="time" value={monitorTime} onChange={setMonitorTime} />
                  <PremiumInput label="6. Petugas" icon={User} value={officer} onChange={setOfficer} placeholder="Isi nama petugas..." />
                </div>
             </div>
             
             {/* Toggle Button */}
             <div className="flex justify-center -mt-3 relative z-20">
                 <button 
                    onClick={() => setIsIdentityExpanded(!isIdentityExpanded)}
                    className="flex items-center gap-2 px-5 py-1.5 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-500 hover:text-[#064E3B] hover:border-[#064E3B]/30 shadow-sm transition-all hover:shadow-md"
                 >
                    {isIdentityExpanded ? 'Tutup Identitas' : 'Buka Identitas'}
                    {isIdentityExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                 </button>
             </div>
          </div>
      </div>

      {/* GRID CONTENT - 2 Columns (B. Jenis Bumbu Pasta) */}
      <div className="p-8 pt-2 z-10">
          
          <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#064E3B] rounded-lg shadow-lg shadow-[#064E3B]/20"><Package size={18} className="text-white" /></div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800">B. Jenis Bumbu Pasta</h3>
                    <p className="text-xs text-gray-500 font-medium">Input ketersediaan, volume, dan harga</p>
                </div>
              </div>
              <div className="text-xs font-medium text-gray-400">
                  Total {filteredRecords.length} jenis bumbu
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredRecords.map((record, idx) => (
                <div 
                    key={record.id} 
                    className={`relative flex flex-col rounded-2xl transition-all duration-300 group overflow-hidden border
                    ${record.isUsed 
                        ? 'bg-white shadow-[0_8px_30px_rgba(6,78,59,0.08)] border-[#064E3B]/20' 
                        : 'bg-white/40 hover:bg-white border-white hover:border-gray-200 hover:shadow-lg opacity-90'}`}
                >
                   {/* Left Status Strip */}
                   <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${record.isUsed ? 'bg-[#064E3B]' : 'bg-gray-200 group-hover:bg-gray-300'}`}></div>

                   {/* Header Row */}
                   <div className="pl-6 pr-5 py-4 flex justify-between items-center border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-transparent">
                       <div className="flex items-center gap-4">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${record.isUsed ? 'bg-[#064E3B] text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>
                               {idx + 1}
                           </div>
                           <h3 className={`text-sm font-bold uppercase tracking-tight transition-colors ${record.isUsed ? 'text-[#064E3B]' : 'text-gray-500'}`}>{record.name}</h3>
                       </div>
                       {/* Label Ya/Tidak sesuai PDF */}
                       <div className="flex flex-col items-end">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 mr-1">Ada?</span>
                            <Toggle checked={record.isUsed} onChange={(val) => handleRecordChange(record.id, 'isUsed', val)} />
                       </div>
                   </div>

                   {/* Data Body */}
                   <div className={`pl-6 pr-5 py-5 space-y-5 transition-all duration-500 ${record.isUsed ? 'block opacity-100' : 'hidden opacity-0'}`}>
                       
                       {/* Row 1: Volume/Ton & Harga */}
                       <div className="grid grid-cols-2 gap-5">
                           <div className="space-y-1.5">
                               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Package size={12} className="text-[#D4AF37]"/> Volume/Ton</label>
                               <div className="relative group/input">
                                   <input type="number" value={record.volume} onChange={(e) => handleRecordChange(record.id, 'volume', e.target.value)} 
                                          className="w-full pl-3 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/10 outline-none transition-all placeholder:font-normal placeholder:text-gray-300" placeholder="0.00" />
                               </div>
                           </div>
                           <div className="space-y-1.5">
                               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><DollarSign size={12} className="text-[#D4AF37]"/> Harga</label>
                               <div className="relative group/input">
                                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">SAR</span>
                                   <input type="number" value={record.price} onChange={(e) => handleRecordChange(record.id, 'price', e.target.value)} 
                                          className="w-full pl-10 pr-3 py-2.5 bg-green-50/30 border border-green-100 rounded-xl text-sm font-bold text-[#064E3B] focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/10 outline-none transition-all placeholder:font-normal placeholder:text-gray-300" placeholder="0" />
                               </div>
                           </div>
                       </div>
                       
                       {/* Row 2: Bahan Lain */}
                       <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><ClipboardList size={12} className="text-gray-400"/> Bahan Lain</label>
                            <input type="text" value={record.otherIngredients} onChange={(e) => handleRecordChange(record.id, 'otherIngredients', e.target.value)} 
                                   className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 outline-none transition-all placeholder:text-gray-300" placeholder="Bahan tambahan..." />
                       </div>

                       {/* Row 3: Produk Asal & Harga */}
                       <div className="pt-4 border-t border-dashed border-gray-200 grid grid-cols-2 gap-5">
                           <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Globe size={12}/> Produk Asal</label>
                                <input type="text" value={record.originProduct} onChange={(e) => handleRecordChange(record.id, 'originProduct', e.target.value)} 
                                       className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 focus:bg-white focus:border-gray-400 outline-none transition-all" placeholder="Merk / Negara" />
                           </div>
                           <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><DollarSign size={12}/> Harga (Asal)</label>
                                <input type="number" value={record.productPrice} onChange={(e) => handleRecordChange(record.id, 'productPrice', e.target.value)} 
                                       className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 focus:bg-white focus:border-gray-400 outline-none transition-all" placeholder="0" />
                           </div>
                       </div>
                   </div>
                </div>
              ))}
          </div>

          {/* Section C (Sesuai PDF) */}
          <div className="relative group overflow-hidden rounded-3xl border border-white/60 shadow-xl bg-white/60 backdrop-blur-xl mb-8">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4AF37]"></div>
               <div className="p-8">
                   <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-100"><AlertCircle size={20} className="text-[#D4AF37]" /></div>
                       <h3 className="text-base font-bold text-gray-800 uppercase tracking-wide">C. Alasan Memilih Bumbu Lain</h3>
                   </div>
                   <textarea 
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      className="w-full h-32 bg-white/80 border border-gray-200 rounded-2xl p-5 text-sm font-medium text-gray-700 focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 outline-none resize-none shadow-inner transition-all hover:bg-white"
                      placeholder="Jelaskan alasan..."
                   ></textarea>
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
                className="w-full text-sm font-semibold text-gray-700 bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 outline-none transition-all shadow-sm placeholder:font-medium placeholder:text-gray-300 hover:border-gray-300" 
                placeholder={placeholder} 
            />
        </div>
    </div>
);