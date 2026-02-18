import React, { useState, useMemo } from 'react';
import { Page } from '../types';
import { ChefHat, UtensilsCrossed, Store, Truck, Signal, ArrowRight, Activity, CheckCircle2, Clock, AlertCircle, FileEdit, History, Search, X, ChevronRight, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';

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
                results.push({ type: 'Bumbu Makkah', title: item.name, subtitle: `Vol: ${item.volume || 0} | Harga: ${item.price || 0}`, icon: ChefHat, page: Page.FORM_BUMBU_MAKKAH });
            }
        });

        // Search Bumbu Madinah
        bumbuMadinah.forEach(item => {
            if (item.name.toLowerCase().includes(lowerTerm)) {
                results.push({ type: 'Bumbu Madinah', title: item.name, subtitle: `Vol: ${item.volume || 0} | Harga: ${item.price || 0}`, icon: ChefHat, page: Page.FORM_BUMBU_MADINAH });
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
                            <span className="w-1.5 h-8 bg-[#D4AF37] rounded-full"></span>
                            Kategori Formulir
                        </h2>
                        <div className="h-px bg-gradient-to-r from-gray-200 to-transparent flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {portalItems.map((item, idx) => (
                            <button 
                                key={item.id}
                                onClick={() => onNavigate(item.targetPage)}
                                className="group relative flex flex-col text-left h-full w-full bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-5px_rgba(6,78,59,0.1)] hover:border-[#064E3B]/20 hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Card Glow Effect */}
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-[#064E3B]/5 to-transparent rounded-full blur-2xl group-hover:bg-[#D4AF37]/10 transition-colors duration-500"></div>

                                <div className="p-8 flex-1 flex flex-col w-full relative z-10">
                                    {/* Header: Icon & Subtitle */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 rounded-2xl text-white shadow-lg shadow-[#064E3B]/10 bg-gradient-to-br from-[#064E3B] to-[#042f24] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <item.icon size={28} strokeWidth={1.5} />
                                        </div>
                                        
                                        {/* Dynamic Status Pill */}
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
                                        <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">{item.subtitle}</span>
                                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#064E3B] transition-colors leading-tight font-playfair">
                                            {item.title}
                                        </h3>
                                    </div>
                                    
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2">
                                        {item.description}
                                    </p>

                                    {/* Progress Section */}
                                    <div className="mt-auto">
                                        <div className="flex justify-between text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-wide">
                                            <span>Kelengkapan Data</span>
                                            <span className="text-gray-600">{item.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden border border-gray-100/50">
                                            <div className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden bg-gradient-to-r from-[#064E3B] to-[#10B981]" 
                                                style={{ width: `${item.progress}%` }}>
                                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                                            <Clock size={12} />
                                            <span>Updated: {item.lastUpdate}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Overlay Button */}
                                <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    <div className="flex items-center gap-3 text-sm font-bold text-white bg-[#064E3B] px-8 py-3.5 rounded-2xl shadow-2xl shadow-[#064E3B]/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#053d2e]">
                                        <span>Buka Formulir</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};