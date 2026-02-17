import React, { useState } from 'react';
import { Input } from '../../components/InputFields';
import { Save, Store, Plus, Trash2, ArrowLeft, MapPin, User, Calendar, Building, ShoppingBag, TrendingUp, DollarSign, Clock, FileText } from 'lucide-react';
import { TenantRecord } from '../../types';
import { useData } from '../../contexts/DataContext';

interface TenantFormProps {
    onBack: () => void;
}

export const TenantForm: React.FC<TenantFormProps> = ({ onBack }) => {
  const { tenantData, setTenantData } = useData();

  // Identity State
  const [hotelName, setHotelName] = useState(''); 
  const [location, setLocation] = useState(''); 
  const [surveyor, setSurveyor] = useState(''); 
  const [surveyDate, setSurveyDate] = useState(''); 
  const [surveyTime, setSurveyTime] = useState(''); 

  const addRecord = () => {
    const newId = tenantData.length > 0 ? Math.max(...tenantData.map(r => r.id)) + 1 : 1;
    setTenantData([...tenantData, { id: newId, shopName: '', productType: '', bestSeller: '', rentCost: '' }]);
  };

  const removeRecord = (id: number) => {
    setTenantData(tenantData.filter(r => r.id !== id));
  };

  const handleRecordChange = (id: number, field: keyof TenantRecord, value: string) => {
    setTenantData(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <div className="flex flex-col relative font-sans bg-[#F8FAFC] rounded-[2rem] border border-white/60 shadow-xl overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute -top-[20%] -right-[20%] w-[800px] h-[800px] bg-[#064E3B]/5 rounded-full blur-[120px]"></div>
         <div className="absolute -bottom-[20%] -left-[20%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      {/* HEADER */}
      <div className="relative z-20 bg-white/80 backdrop-blur-xl border-b border-white/60 shadow-sm transition-all px-8 py-5">
         <div className="flex items-center justify-between gap-6 mb-6">
             <div className="flex items-center gap-5">
                 <button onClick={onBack} className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-all border border-transparent hover:border-gray-200"><ArrowLeft size={20} /></button>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-[#064E3B]/20 bg-gradient-to-br from-[#064E3B] to-[#042f24] text-white ring-4 ring-white">
                        <Store size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#064E3B] leading-none font-playfair">Potensi Ekonomi (Tenant)</h1>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1.5">Data Toko & Sewa</p>
                    </div>
                 </div>
             </div>
             <button onClick={onBack} className="flex items-center gap-2 px-6 py-2.5 bg-[#064E3B] hover:bg-[#053d2e] text-white rounded-xl shadow-lg shadow-[#064E3B]/20 text-sm font-bold transition-all transform hover:translate-y-[-2px] hover:shadow-xl">
                <Save size={18} /> <span>Simpan Data</span>
             </button>
         </div>

         {/* Identity Panel */}
         <div className="bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200/60">
                <div className="p-1.5 bg-[#064E3B]/10 rounded-lg"><FileText size={16} className="text-[#064E3B]" /></div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">A. Identitas Lokasi</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <PremiumInput label="1. Nama Hotel" icon={Building} value={hotelName} onChange={setHotelName} placeholder="Nama Hotel..." />
                  <PremiumInput label="2. Lokasi" icon={MapPin} value={location} onChange={setLocation} placeholder="Lokasi/Area..." />
                  <PremiumInput label="3. Petugas Survei" icon={User} value={surveyor} onChange={setSurveyor} placeholder="Nama Lengkap..." />
                  <PremiumInput label="4. Tanggal Survei" icon={Calendar} type="date" value={surveyDate} onChange={setSurveyDate} />
                  <PremiumInput label="5. Waktu Survey" icon={Clock} type="time" value={surveyTime} onChange={setSurveyTime} />
                  <div className="flex items-end col-span-2 md:col-span-1 md:col-start-5">
                      <button onClick={addRecord} className="w-full py-3 bg-white border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
                        <Plus size={16} /> Tambah Toko
                      </button>
                  </div>
              </div>
         </div>
      </div>

      {/* GRID CONTENT */}
      <div className="p-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
            {tenantData.map((record, idx) => (
                <div key={record.id} className="relative bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_10px_40px_rgba(6,78,59,0.1)] hover:border-[#064E3B]/30 transition-all duration-300 overflow-hidden group/card">
                   {/* Gold Strip */}
                   <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D4AF37]"></div>

                   <button onClick={() => removeRecord(record.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all opacity-0 group-hover/card:opacity-100"><Trash2 size={16} /></button>
                   
                   <div className="pl-7 pr-6 py-6 space-y-6">
                       <div className="flex items-center gap-3">
                           <span className="h-8 w-8 rounded-lg bg-[#064E3B]/10 flex items-center justify-center text-[#064E3B] font-bold text-sm border border-[#064E3B]/20">#{idx + 1}</span>
                           <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Entry Data</span>
                                <span className="text-sm font-bold text-gray-800">Informasi Tenant</span>
                            </div>
                       </div>
                       
                       <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Nama Toko / Tenant</label>
                            <Input value={record.shopName} onChange={(e) => handleRecordChange(record.id, 'shopName', e.target.value)} 
                                   className="!py-3 !text-sm !bg-gray-50 focus:!bg-white !border-gray-200 focus:!border-[#064E3B] !rounded-xl !font-bold" placeholder="Contoh: Toko Al-Madinah" />
                       </div>
                       
                       <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-1.5"><ShoppingBag size={12}/> Jenis Produk</label>
                            <Input value={record.productType} onChange={(e) => handleRecordChange(record.id, 'productType', e.target.value)} 
                                   className="!py-3 !text-sm !bg-gray-50 focus:!bg-white !border-gray-200 focus:!border-[#064E3B] !rounded-xl" placeholder="Contoh: Pakaian, Makanan..." />
                       </div>

                       <div className="grid grid-cols-2 gap-5 pt-4 border-t border-dashed border-gray-200">
                           <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-1.5"><TrendingUp size={12}/> Produk Laris / Bestseller</label>
                                <Input value={record.bestSeller} onChange={(e) => handleRecordChange(record.id, 'bestSeller', e.target.value)} 
                                       className="!py-3 !text-sm !bg-gray-50 focus:!bg-white !border-gray-200 focus:!border-[#064E3B] !rounded-xl" placeholder="Item Terlaris..." />
                           </div>
                           <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-1.5"><DollarSign size={12} className="text-[#D4AF37]"/> Biaya Sewa</label>
                                <Input value={record.rentCost} onChange={(e) => handleRecordChange(record.id, 'rentCost', e.target.value)} 
                                       className="!py-3 !text-sm !bg-[#D4AF37]/5 focus:!bg-white !border-[#D4AF37]/20 focus:!border-[#D4AF37] !rounded-xl !text-[#B45309] !font-bold" placeholder="0" />
                           </div>
                       </div>
                   </div>
                </div>
            ))}
            
            <button 
                onClick={addRecord}
                className="flex flex-col items-center justify-center min-h-[300px] rounded-2xl border-2 border-dashed border-gray-300 bg-white/30 hover:bg-white hover:border-[#064E3B] hover:shadow-xl transition-all duration-300 group"
            >
                <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 mb-4 group-hover:scale-110 group-hover:bg-[#064E3B] group-hover:text-white group-hover:border-[#064E3B] transition-all shadow-sm">
                    <Plus size={32} />
                </div>
                <span className="text-sm font-bold text-gray-500 group-hover:text-[#064E3B]">Tambah Tenant Baru</span>
            </button>
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