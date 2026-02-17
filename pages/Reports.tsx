import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ChefHat, UtensilsCrossed, Truck, Store, Signal, Download, Printer, Filter, Search, FileBarChart } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bumbu' | 'rte' | 'tenant' | 'ekspedisi' | 'telco'>('bumbu');
  const { bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData, telecomActive } = useData();

  const renderTable = () => {
      const TableHeader = ({ children }: { children: React.ReactNode }) => (
          <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">{children}</th>
      );
      
      const TableRow = ({ children, idx }: { children: React.ReactNode, idx: number }) => (
          <tr className={`transition-colors hover:bg-[#064E3B]/5 ${idx % 2 === 0 ? 'bg-white/30' : 'bg-transparent'}`}>
              {children}
          </tr>
      );

      switch(activeTab) {
          case 'bumbu':
              const allBumbu = [
                  ...bumbuMakkah.filter(i => i.isUsed).map(i => ({ ...i, loc: 'Makkah' })),
                  ...bumbuMadinah.filter(i => i.isUsed).map(i => ({ ...i, loc: 'Madinah' }))
              ];
              return (
                  <div className="overflow-hidden rounded-2xl border border-gray-200/50">
                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                            <tr>
                                <TableHeader>Lokasi</TableHeader>
                                <TableHeader>Jenis Bumbu</TableHeader>
                                <TableHeader>Volume (Ton)</TableHeader>
                                <TableHeader>Harga (SAR)</TableHeader>
                                <TableHeader>Produk Asal</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {allBumbu.map((row, idx) => (
                                <TableRow key={idx} idx={idx}>
                                    <td className="px-6 py-4 font-bold text-[#064E3B]">{row.loc}</td>
                                    <td className="px-6 py-4 text-gray-700 font-medium">{row.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{row.volume}</td>
                                    <td className="px-6 py-4 text-[#D4AF37] font-bold">{row.price}</td>
                                    <td className="px-6 py-4 font-medium text-gray-600">{row.originProduct || '-'}</td>
                                </TableRow>
                            ))}
                        </tbody>
                    </table>
                  </div>
              );
          case 'rte':
               return (
                  <div className="overflow-hidden rounded-2xl border border-gray-200/50">
                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                            <tr>
                                <TableHeader>Perusahaan</TableHeader>
                                <TableHeader>Menu / Bumbu</TableHeader>
                                <TableHeader>Volume</TableHeader>
                                <TableHeader>Harga (SAR)</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rteData.map((row, idx) => (
                                <TableRow key={row.id} idx={idx}>
                                    <td className="px-6 py-4 font-bold text-[#064E3B]">{row.companyName}</td>
                                    <td className="px-6 py-4 text-gray-700">{row.spiceType}</td>
                                    <td className="px-6 py-4 text-gray-600">{row.volume}</td>
                                    <td className="px-6 py-4 text-[#D4AF37] font-bold">{row.price}</td>
                                </TableRow>
                            ))}
                        </tbody>
                    </table>
                  </div>
              );
          case 'tenant':
               return (
                  <div className="overflow-hidden rounded-2xl border border-gray-200/50">
                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                            <tr>
                                <TableHeader>Nama Toko</TableHeader>
                                <TableHeader>Produk</TableHeader>
                                <TableHeader>Best Seller</TableHeader>
                                <TableHeader>Biaya Sewa (SAR)</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tenantData.map((row, idx) => (
                                <TableRow key={row.id} idx={idx}>
                                    <td className="px-6 py-4 font-bold text-[#064E3B]">{row.shopName}</td>
                                    <td className="px-6 py-4 text-gray-700">{row.productType}</td>
                                    <td className="px-6 py-4 text-gray-600">{row.bestSeller}</td>
                                    <td className="px-6 py-4 text-[#D4AF37] font-bold">{row.rentCost}</td>
                                </TableRow>
                            ))}
                        </tbody>
                    </table>
                  </div>
              );
          case 'ekspedisi':
              return (
                 <div className="overflow-hidden rounded-2xl border border-gray-200/50">
                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                            <tr>
                                <TableHeader>Perusahaan</TableHeader>
                                <TableHeader>Berat (Kg)</TableHeader>
                                <TableHeader>Harga / Kg (SAR)</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {expeditionData.map((row, idx) => (
                                <TableRow key={row.id} idx={idx}>
                                    <td className="px-6 py-4 font-bold text-[#064E3B]">{row.companyName}</td>
                                    <td className="px-6 py-4 text-gray-700">{row.weight}</td>
                                    <td className="px-6 py-4 text-[#D4AF37] font-bold">{row.pricePerKg}</td>
                                </TableRow>
                            ))}
                        </tbody>
                    </table>
                 </div>
             );
          case 'telco':
              return (
                 <div className="overflow-hidden rounded-2xl border border-gray-200/50">
                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                            <tr>
                                <TableHeader>Provider</TableHeader>
                                <TableHeader>Paket Roaming</TableHeader>
                                <TableHeader>Status</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {telecomData.map((row, idx) => (
                                <TableRow key={row.id} idx={idx}>
                                    <td className="px-6 py-4 font-bold text-[#064E3B]">{row.providerName}</td>
                                    <td className="px-6 py-4 text-gray-700">{row.roamingPackage || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${telecomActive[row.id] ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${telecomActive[row.id] ? 'bg-emerald-600' : 'bg-gray-400'}`}></span>
                                            {telecomActive[row.id] ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </td>
                                </TableRow>
                            ))}
                        </tbody>
                    </table>
                 </div>
             );
          default:
              return <div className="p-12 text-center text-gray-400 font-medium">Data belum tersedia untuk kategori ini.</div>;
      }
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
        
        {/* Header Actions - Styled like Dashboard Header */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-end md:items-center gap-6 shadow-sm">
             <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-gradient-to-br from-[#064E3B] to-[#042f24] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#064E3B]/20">
                    <FileBarChart size={28} />
                 </div>
                 <div>
                     <h1 className="text-2xl font-bold text-[#064E3B] font-playfair">Laporan Data</h1>
                     <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mt-1">Rekapitulasi real-time ekosistem haji 2026</p>
                 </div>
             </div>
             <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200/80 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#064E3B] hover:border-[#064E3B]/20 shadow-sm transition-all">
                     <Printer size={16} /> Print
                 </button>
                 <button className="flex items-center gap-2 px-5 py-2.5 bg-[#064E3B] text-white rounded-xl text-xs font-bold hover:bg-[#053d2e] shadow-lg shadow-[#064E3B]/20 transition-all hover:-translate-y-0.5">
                     <Download size={16} /> Export CSV
                 </button>
             </div>
        </div>

        {/* Tab Navigation - Premium Pill Style */}
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar px-1">
            {[
                { id: 'bumbu', label: 'Konsumsi Bumbu', icon: ChefHat },
                { id: 'rte', label: 'RTE (Siap Saji)', icon: UtensilsCrossed },
                { id: 'tenant', label: 'Tenant Hotel', icon: Store },
                { id: 'ekspedisi', label: 'Ekspedisi Barang', icon: Truck },
                { id: 'telco', label: 'Telekomunikasi', icon: Signal },
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border
                        ${activeTab === tab.id 
                            ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-lg shadow-[#064E3B]/20' 
                            : 'bg-white/60 text-gray-500 hover:bg-white hover:text-[#064E3B] border-transparent hover:border-gray-200'}`}
                >
                    <tab.icon size={16} className={activeTab === tab.id ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-[#064E3B]'} />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Data Table Card */}
        <GlassCard className="min-h-[500px] !bg-white/70">
            {/* Filters */}
            <div className="flex justify-between items-center mb-8 px-1">
                <div className="relative group w-full max-w-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FBBF24] rounded-xl blur opacity-10 group-focus-within:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center">
                        <Search size={18} className="absolute left-4 text-gray-400 group-focus-within:text-[#064E3B] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Cari data laporan..." 
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/5 transition-all placeholder-gray-400 text-gray-700"
                        />
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-[#064E3B] hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200">
                    <Filter size={18} />
                    <span className="text-xs font-bold uppercase">Filter</span>
                </button>
            </div>

            <div className="overflow-x-auto pb-4">
                {renderTable()}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200/60">
                <p className="text-xs font-medium text-gray-400">
                    Menampilkan <span className="text-gray-800 font-bold">Semua Data</span> secara real-time
                </p>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-50">Prev</button>
                    <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-50">Next</button>
                </div>
            </div>
        </GlassCard>
    </div>
  );
};