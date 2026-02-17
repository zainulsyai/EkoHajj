import React from 'react';
import { Page } from '../types';
import { ChefHat, UtensilsCrossed, Store, Truck, Signal, ArrowRight, Activity, CheckCircle2, Clock, AlertCircle, FileEdit, History } from 'lucide-react';

interface DataEntryPortalProps {
    onNavigate: (page: Page) => void;
}

const portalItems = [
    {
        id: 'makkah',
        title: "Bumbu Pasta Makkah",
        subtitle: "Dapur Wilayah Makkah",
        description: "Input penggunaan bumbu & harga.",
        icon: ChefHat,
        targetPage: Page.FORM_BUMBU_MAKKAH,
        status: 'completed',
        progress: 100,
        lastUpdate: '2 jam lalu'
    },
    {
        id: 'madinah',
        title: "Bumbu Pasta Madinah",
        subtitle: "Dapur Wilayah Madinah",
        description: "Input penggunaan bumbu & harga.",
        icon: ChefHat,
        targetPage: Page.FORM_BUMBU_MADINAH,
        status: 'draft',
        progress: 45,
        lastUpdate: '1 hari lalu'
    },
    {
        id: 'rte',
        title: "Makanan Siap Saji",
        subtitle: "Distribusi RTE",
        description: "Data perusahaan & volume.",
        icon: UtensilsCrossed,
        targetPage: Page.FORM_RTE,
        status: 'pending',
        progress: 0,
        lastUpdate: '-'
    },
    {
        id: 'tenant',
        title: "Potensi Ekonomi",
        subtitle: "Survei Hotel & Tenant",
        description: "Monitoring sewa & produk.",
        icon: Store,
        targetPage: Page.FORM_TENANT,
        status: 'pending',
        progress: 0,
        lastUpdate: '-'
    },
    {
        id: 'expedition',
        title: "Ekspedisi",
        subtitle: "Kargo & Pengiriman",
        description: "Harga perkilo & volume.",
        icon: Truck,
        targetPage: Page.FORM_EXPEDITION,
        status: 'draft',
        progress: 20,
        lastUpdate: '30 menit lalu'
    },
    {
        id: 'telecom',
        title: "Telekomunikasi",
        subtitle: "Provider & Roaming",
        description: "Survei paket roaming.",
        icon: Signal,
        targetPage: Page.FORM_TELECOM,
        status: 'pending',
        progress: 0,
        lastUpdate: '-'
    }
];

export const DataEntryPortal: React.FC<DataEntryPortalProps> = ({ onNavigate }) => {
    return (
        <div className="space-y-8 animate-fade-in-up pb-20 font-sans">
            
            {/* 1. Hero Section */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#064E3B] text-white shadow-2xl shadow-[#064E3B]/30 group">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#10B981] to-[#064E3B] rounded-full blur-[120px] opacity-30 translate-x-1/3 -translate-y-1/3 group-hover:opacity-40 transition-opacity duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37] rounded-full blur-[100px] opacity-20 -translate-x-1/3 translate-y-1/3 animate-pulse"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

                <div className="relative z-10 px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center md:text-left space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-bold text-[#D4AF37] uppercase tracking-widest shadow-sm">
                            <Activity size={14} />
                            <span>Portal Data 2026</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-playfair tracking-tight leading-tight">
                            Pusat Input Data <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FBBF24]">Terintegrasi</span>
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                            Kelola seluruh data ekosistem haji dari satu tempat. Pastikan validasi data sebelum melakukan finalisasi laporan harian.
                        </p>
                        
                         <button 
                            onClick={() => onNavigate(Page.FORM_BUMBU_MADINAH)}
                            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white text-[#064E3B] rounded-xl font-bold text-sm hover:bg-gray-50 hover:scale-105 transition-all shadow-lg shadow-black/20"
                        >
                            <FileEdit size={16} />
                            Lanjutkan Draft Terakhir
                        </button>
                    </div>

                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                        <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[30px] opacity-20 animate-pulse"></div>
                        <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                            <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
                            <circle cx="50%" cy="50%" r="45%" stroke="#D4AF37" strokeWidth="8" fill="transparent" strokeDasharray="283" strokeDashoffset={283 - (283 * 25) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <span className="text-3xl md:text-4xl font-bold font-playfair">25%</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Selesai</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 px-2">
                <h2 className="text-lg font-bold text-[#064E3B] flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></span>
                    Kategori Formulir
                </h2>
                <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* 2. Menu Cards Grid - Unified Theme */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {portalItems.map((item, idx) => (
                    <button 
                        key={item.id}
                        onClick={() => onNavigate(item.targetPage)}
                        className="group relative flex flex-col text-left h-full w-full bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-5px_rgba(6,78,59,0.1)] hover:border-[#064E3B]/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                        <div className="p-7 flex-1 flex flex-col w-full relative z-10">
                            {/* Header: Icon & Subtitle */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3.5 rounded-2xl text-white shadow-lg shadow-[#064E3B]/10 bg-gradient-to-br from-[#064E3B] to-[#042f24] group-hover:scale-110 transition-transform duration-500">
                                    <item.icon size={26} strokeWidth={1.5} />
                                </div>
                                
                                {/* Dynamic Status Pill - Unified Green/Gold styling */}
                                <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border backdrop-blur-sm shadow-sm
                                    ${item.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                      item.status === 'draft' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                                      'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                    {item.status === 'completed' && <CheckCircle2 size={12} />}
                                    {item.status === 'draft' && <History size={12} />}
                                    {item.status === 'pending' && <AlertCircle size={12} />}
                                    <span>{item.status === 'completed' ? 'Selesai' : item.status === 'draft' ? 'Draft' : 'Belum'}</span>
                                </div>
                            </div>

                            <div className="mb-3 mt-2">
                                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">{item.subtitle}</span>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#064E3B] transition-colors leading-tight font-playfair">
                                    {item.title}
                                </h3>
                            </div>
                            
                            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">
                                {item.description}
                            </p>

                            {/* Progress Section */}
                            <div className="mt-auto">
                                <div className="flex justify-between text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-wide">
                                    <span>Progress</span>
                                    <span>{item.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden border border-gray-100">
                                    <div className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden bg-[#064E3B]" 
                                         style={{ width: `${item.progress}%` }}>
                                         <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                                    <Clock size={10} />
                                    <span>Updated: {item.lastUpdate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                             <div className="flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#10B981] px-6 py-3 rounded-xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span>Buka Formulir</span>
                                <ArrowRight size={16} />
                             </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};