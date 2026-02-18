import React, { useState, useMemo } from 'react';
import { Page } from '../types';
import { ChefHat, UtensilsCrossed, Store, Truck, Signal, ArrowRight, Activity, CheckCircle2, Clock, AlertCircle, FileEdit, History, Search, X, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface DataEntryPortalProps {
    onNavigate: (page: Page) => void;
}

const portalItems = [
    {
        id: 'bumbu',
        title: "Bumbu Pasta",
        subtitle: "Makkah & Madinah",
        description: "Input penggunaan bumbu, harga, dan perusahaan penyedia untuk kedua wilayah.",
        icon: ChefHat,
        targetPage: Page.FORM_BUMBU,
        status: 'draft',
        progress: 75,
        lastUpdate: 'Baru saja'
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
    const [searchTerm, setSearchTerm] = useState('');
    const { bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData } = useData();
    const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    // Aggregating all searchable data
    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) return [];

        const lowerTerm = searchTerm.toLowerCase();
        const results: any[] = [];

        // Search Bumbu Makkah
        bumbuMakkah.forEach(item => {
            if (item.name.toLowerCase().includes(lowerTerm)) {
                results.push({ type: 'Bumbu Makkah', title: item.name, subtitle: `Vol: ${item.volume || 0} | Harga: ${item.price || 0}`, icon: ChefHat, page: Page.FORM_BUMBU });
            }
        });

        // Search Bumbu Madinah
        bumbuMadinah.forEach(item => {
            if (item.name.toLowerCase().includes(lowerTerm)) {
                results.push({ type: 'Bumbu Madinah', title: item.name, subtitle: `Vol: ${item.volume || 0} | Harga: ${item.price || 0}`, icon: ChefHat, page: Page.FORM_BUMBU });
            }
        });

        // Search RTE
        rteData.forEach(item => {
            if (item.companyName.toLowerCase().includes(lowerTerm) || item.spiceType.toLowerCase().includes(lowerTerm)) {
                results.push({ type: 'RTE (Makanan Siap Saji)', title: item.companyName, subtitle: item.spiceType, icon: UtensilsCrossed, page: Page.FORM_RTE });
            }
        });

        // Search Tenant
        tenantData.forEach(item => {
            if (item.shopName.toLowerCase().includes(lowerTerm) || item.productType.toLowerCase().includes(lowerTerm) || item.bestSeller.toLowerCase().includes(lowerTerm)) {
                results.push({ type: 'Tenant (Potensi Ekonomi)', title: item.shopName, subtitle: `${item.productType} - ${item.bestSeller}`, icon: Store, page: Page.FORM_TENANT });
            }
        });

        // Search Expedition
        expeditionData.forEach(item => {
            if (item.companyName.toLowerCase().includes(lowerTerm)) {
                results.push({ type: 'Ekspedisi', title: item.companyName, subtitle: `Berat: ${item.weight} Kg`, icon: Truck, page: Page.FORM_EXPEDITION });
            }
        });

        // Search Telecom
        telecomData.forEach(item => {
            if (item.providerName.toLowerCase().includes(lowerTerm) || (item.roamingPackage && item.roamingPackage.toLowerCase().includes(lowerTerm))) {
                results.push({ type: 'Telekomunikasi', title: item.providerName, subtitle: item.roamingPackage, icon: Signal, page: Page.FORM_TELECOM });
            }
        });

        return results;
    }, [searchTerm, bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData]);

    return (
        <div className="space-y-8 animate-fade-in-up pb-20 font-sans">
            
            {/* 1. Hero Section - Updated to match Dashboard style */}
            <div className="bg-[#064E3B] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-[#064E3B]/20">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#10B981] to-[#064E3B] rounded-full blur-[100px] opacity-30 translate-x-1/4 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D4AF37] rounded-full blur-[80px] opacity-20 -translate-x-1/4 translate-y-1/4"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
                    <div className="w-full md:max-w-2xl">
                        {/* Badge with Date */}
                        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">
                            <Calendar size={14} /> <span>{currentDate}</span>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-3 leading-tight">
                            Pusat Input Data <span className="text-[#D4AF37]">Terintegrasi</span>
                        </h1>
                        
                        {/* Description */}
                        <p className="text-emerald-100/80 text-sm max-w-lg leading-relaxed">
                            Kelola validasi data ekosistem haji secara real-time. Gunakan pencarian global untuk navigasi cepat antar formulir.
                        </p>
                    </div>
                    
                    {/* Right Side: Search Bar & Status Badge */}
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        
                        {/* Small Integrated Search Bar */}
                        <div className="relative group/search w-full md:w-64">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FBBF24] rounded-2xl blur opacity-10 group-focus-within/search:opacity-30 transition-opacity duration-500"></div>
                            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center shadow-lg transition-all duration-300 group-focus-within/search:bg-white/20 group-focus-within/search:border-white/40">
                                <div className="pl-4 text-emerald-200 group-focus-within/search:text-white transition-colors">
                                    <Search size={18} />
                                </div>
                                <input 
                                    type="text" 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Cari data..."
                                    className="w-full bg-transparent border-none py-3 px-3 text-white placeholder-emerald-200/50 text-sm font-medium focus:outline-none focus:ring-0"
                                />
                                {searchTerm && (
                                    <button 
                                        onClick={() => setSearchTerm('')}
                                        className="pr-4 text-emerald-200 hover:text-white transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shrink-0 w-full md:w-auto justify-between md:justify-start h-full">
                            <div className="text-right">
                                <p className="text-[10px] text-emerald-100 uppercase tracking-wider">Status Portal</p>
                                <p className="text-xs font-bold text-white">Live Sync</p>
                            </div>
                            <div className="relative w-2.5 h-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Content Section */}
            {searchTerm ? (
                // SEARCH RESULTS VIEW
                <div className="space-y-6 animate-fade-in-up">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-xl font-bold text-[#064E3B] font-playfair flex items-center gap-3">
                            <div className="p-2 bg-[#D4AF37]/10 rounded-lg"><Search size={20} className="text-[#D4AF37]" /></div>
                            Hasil Pencarian
                        </h2>
                        <span className="text-sm font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100">
                            {searchResults.length} record ditemukan
                        </span>
                    </div>

                    {searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {searchResults.map((result, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => onNavigate(result.page)}
                                    className="flex items-center gap-5 p-6 bg-white/60 backdrop-blur-xl border border-white/60 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:border-[#D4AF37]/40 hover:bg-white/80 transition-all text-left group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#042f24] text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                                        <result.icon size={24} />
                                    </div>
                                    <div className="flex-1 relative z-10">
                                        <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">{result.type}</p>
                                        <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#064E3B] font-playfair">{result.title}</h4>
                                        <p className="text-sm text-gray-500 font-medium">{result.subtitle}</p>
                                    </div>
                                    <div className="relative z-10 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-white transition-all">
                                        <ArrowRight size={16} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-dashed border-gray-300 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                <Search size={32} />
                            </div>
                            <p className="text-lg font-bold text-gray-600">Tidak ada data ditemukan</p>
                            <p className="text-sm text-gray-400">Coba gunakan kata kunci lain seperti "Bumbu", "Hotel", atau nama perusahaan.</p>
                        </div>
                    )}
                </div>
            ) : (
                // DEFAULT PORTAL MENU VIEW
                <>
                    <div className="flex items-center gap-4 px-2 pt-4">
                        <h2 className="text-xl font-bold text-[#064E3B] flex items-center gap-3 font-playfair">
                            <span className="w-1.5 h-8 bg-[#D4AF37] rounded-full shadow-sm"></span>
                            Kategori Formulir
                        </h2>
                        <div className="h-px bg-gradient-to-r from-[#064E3B]/10 to-transparent flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {portalItems.map((item, idx) => (
                            <button 
                                key={item.id}
                                onClick={() => onNavigate(item.targetPage)}
                                className="group relative flex flex-col text-left h-full w-full bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(6,78,59,0.15)] hover:border-white/90 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Active Selection Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37]/20 rounded-[2rem] transition-colors duration-500 pointer-events-none z-20"></div>

                                {/* Background Accents */}
                                <div className="absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br from-[#064E3B]/5 to-transparent rounded-full blur-3xl group-hover:bg-[#D4AF37]/10 transition-colors duration-700"></div>
                                
                                <div className="p-7 flex-1 flex flex-col w-full relative z-10">
                                    
                                    {/* Top Row: Icon & Status */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-[#D4AF37] blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl"></div>
                                            <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#042f24] text-white shadow-xl shadow-[#064E3B]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out border border-white/10">
                                                <item.icon size={26} strokeWidth={1.5} />
                                            </div>
                                        </div>
                                        
                                        <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border backdrop-blur-sm shadow-sm transition-all duration-300
                                            ${item.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:bg-emerald-100' : 
                                            item.status === 'draft' ? 'bg-amber-50 text-amber-700 border-amber-100 group-hover:bg-amber-100' : 
                                            'bg-gray-50 text-gray-400 border-gray-100 group-hover:bg-gray-100'}`}>
                                            {item.status === 'completed' && <CheckCircle2 size={12} />}
                                            {item.status === 'draft' && <History size={12} />}
                                            {item.status === 'pending' && <Activity size={12} />}
                                            <span>{item.status === 'completed' ? 'Selesai' : item.status === 'draft' ? 'Draft' : 'Belum'}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="mb-2">
                                        <div className="flex items-center gap-2 mb-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                                            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{item.subtitle}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#064E3B] transition-colors leading-tight font-playfair tracking-tight">
                                            {item.title}
                                        </h3>
                                    </div>
                                    
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2 border-l-2 border-transparent pl-0 group-hover:border-[#D4AF37]/30 group-hover:pl-3 transition-all duration-300">
                                        {item.description}
                                    </p>

                                    {/* Footer Section: Progress */}
                                    <div className="mt-auto relative">
                                        <div className="flex justify-between items-end mb-2">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Kelengkapan Data</span>
                                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium mt-0.5">
                                                    <Clock size={10} />
                                                    <span>Update: {item.lastUpdate}</span>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-bold ${item.progress === 100 ? 'text-[#064E3B]' : 'text-gray-600'}`}>{item.progress}%</span>
                                        </div>
                                        
                                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden border border-gray-100/50">
                                            <div className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${item.progress === 100 ? 'bg-gradient-to-r from-[#064E3B] to-[#10B981]' : 'bg-gradient-to-r from-[#D4AF37] to-[#FBBF24]'}`} 
                                                style={{ width: `${item.progress}%` }}>
                                                <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Action Strip (Visible on Hover) */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#064E3B] via-[#10B981] to-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                                {/* Floating Action Button */}
                                <div className="absolute bottom-6 right-6 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#064E3B] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 z-20 border border-gray-100">
                                    <ChevronRight size={20} className="ml-0.5" />
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};