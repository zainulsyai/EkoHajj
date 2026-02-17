import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ChefHat, UtensilsCrossed, Truck, Store, Signal, Download, Printer, Filter, Search } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bumbu' | 'rte' | 'tenant' | 'ekspedisi' | 'telco'>('bumbu');
  const { bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData, telecomActive } = useData();

  const renderTable = () => {
      switch(activeTab) {
          case 'bumbu':
              const allBumbu = [
                  ...bumbuMakkah.filter(i => i.isUsed).map(i => ({ ...i, loc: 'Makkah' })),
                  ...bumbuMadinah.filter(i => i.isUsed).map(i => ({ ...i, loc: 'Madinah' }))
              ];
              return (
                  <table className="w-full text-sm text-left">
                      <thead className="text-[10px] uppercase text-gray-500 font-bold bg-gray-50/50">
                          <tr>
                              <th className="px-6 py-3 rounded-l-xl">Lokasi</th>
                              <th className="px-6 py-3">Jenis Bumbu</th>
                              <th className="px-6 py-3">Volume (Ton)</th>
                              <th className="px-6 py-3">Harga (SAR)</th>
                              <th className="px-6 py-3 rounded-r-xl text-right">Produk Asal</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                          {allBumbu.map((row, idx) => (
                              <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                  <td className="px-6 py-4 font-bold text-[#064E3B]">{row.loc}</td>
                                  <td className="px-6 py-4 text-gray-700">{row.name}</td>
                                  <td className="px-6 py-4 text-gray-600">{row.volume}</td>
                                  <td className="px-6 py-4 text-gray-600">{row.price}</td>
                                  <td className="px-6 py-4 text-right font-medium text-gray-800">{row.originProduct || '-'}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              );
          case 'rte':
               return (
                  <table className="w-full text-sm text-left">
                      <thead className="text-[10px] uppercase text-gray-500 font-bold bg-gray-50/50">
                          <tr>
                              <th className="px-6 py-3 rounded-l-xl">Perusahaan</th>
                              <th className="px-6 py-3">Jenis Bumbu / Menu</th>
                              <th className="px-6 py-3">Volume</th>
                              <th className="px-6 py-3 rounded-r-xl">Harga (SAR)</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                          {rteData.map((row) => (
                              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="px-6 py-4 font-bold text-[#064E3B]">{row.companyName}</td>
                                  <td className="px-6 py-4 text-gray-700">{row.spiceType}</td>
                                  <td className="px-6 py-4 text-gray-600">{row.volume}</td>
                                  <td className="px-6 py-4 font-medium">{row.price}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              );
          case 'tenant':
               return (
                  <table className="w-full text-sm text-left">
                      <thead className="text-[10px] uppercase text-gray-500 font-bold bg-gray-50/50">
                          <tr>
                              <th className="px-6 py-3 rounded-l-xl">Nama Toko</th>
                              <th className="px-6 py-3">Produk</th>
                              <th className="px-6 py-3">Best Seller</th>
                              <th className="px-6 py-3 rounded-r-xl text-right">Biaya Sewa</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                          {tenantData.map((row) => (
                              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="px-6 py-4 font-bold text-[#064E3B]">{row.shopName}</td>
                                  <td className="px-6 py-4 text-gray-700">{row.productType}</td>
                                  <td className="px-6 py-4 text-gray-600">{row.bestSeller}</td>
                                  <td className="px-6 py-4 text-right font-bold">{row.rentCost}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              );
          case 'ekspedisi':
              return (
                 <table className="w-full text-sm text-left">
                     <thead className="text-[10px] uppercase text-gray-500 font-bold bg-gray-50/50">
                         <tr>
                             <th className="px-6 py-3 rounded-l-xl">Perusahaan</th>
                             <th className="px-6 py-3">Berat (Kg)</th>
                             <th className="px-6 py-3 rounded-r-xl text-right">Harga / Kg (SAR)</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                         {expeditionData.map((row) => (
                             <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                 <td className="px-6 py-4 font-bold text-[#064E3B]">{row.companyName}</td>
                                 <td className="px-6 py-4 text-gray-700">{row.weight}</td>
                                 <td className="px-6 py-4 text-right font-bold">{row.pricePerKg}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             );
          case 'telco':
              return (
                 <table className="w-full text-sm text-left">
                     <thead className="text-[10px] uppercase text-gray-500 font-bold bg-gray-50/50">
                         <tr>
                             <th className="px-6 py-3 rounded-l-xl">Provider</th>
                             <th className="px-6 py-3">Paket Roaming</th>
                             <th className="px-6 py-3 rounded-r-xl text-right">Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                         {telecomData.map((row) => (
                             <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                 <td className="px-6 py-4 font-bold text-[#064E3B]">{row.providerName}</td>
                                 <td className="px-6 py-4 text-gray-700">{row.roamingPackage || '-'}</td>
                                 <td className="px-6 py-4 text-right">
                                     <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${telecomActive[row.id] ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                         {telecomActive[row.id] ? 'Aktif' : 'Tidak Aktif'}
                                     </span>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             );
          default:
              return <div className="p-8 text-center text-gray-400">Data belum tersedia untuk kategori ini.</div>;
      }
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
        
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
             <div>
                 <h1 className="text-2xl font-bold text-[#064E3B] font-playfair">Laporan Data</h1>
                 <p className="text-xs text-gray-500 font-medium mt-1">Rekapitulasi data harian ekosistem haji.</p>
             </div>
             <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-sm transition-all">
                     <Printer size={16} /> Print
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 bg-[#064E3B] text-white rounded-xl text-xs font-bold hover:bg-[#053d2e] shadow-lg shadow-[#064E3B]/20 transition-all">
                     <Download size={16} /> Export CSV
                 </button>
             </div>
        </div>

        {/* Tab Navigation - Unified Green/Gold Theme */}
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
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
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap
                        ${activeTab === tab.id 
                            ? 'bg-white shadow-md text-[#064E3B] border border-gray-100' 
                            : 'bg-white/40 text-gray-500 hover:bg-white/80 border border-transparent'}`}
                >
                    <tab.icon size={16} className={activeTab === tab.id ? 'text-[#D4AF37]' : 'text-gray-400'} />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Data Table Card */}
        <GlassCard className="min-h-[500px]">
            {/* Filters */}
            <div className="flex justify-between items-center mb-6 px-1">
                <div className="relative group">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#064E3B] transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Cari data..." 
                        className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-[#064E3B] outline-none transition-all w-64"
                    />
                </div>
                <button className="p-2 text-gray-400 hover:text-[#064E3B] hover:bg-gray-50 rounded-lg transition-all">
                    <Filter size={20} />
                </button>
            </div>

            <div className="overflow-x-auto">
                {renderTable()}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
                <span>Menampilkan data secara real-time</span>
            </div>
        </GlassCard>
    </div>
  );
};