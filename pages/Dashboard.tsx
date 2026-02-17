import React, { useMemo } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { TrendingUp, Activity, Package, Truck, Signal, Calendar, MapPin, ChefHat, UtensilsCrossed, Store, ArrowRight, Wallet } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const StatCard = ({ title, value, icon: Icon, color, trend, footer }: any) => (
  <div className="relative overflow-hidden rounded-3xl p-6 border border-white/60 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all group">
    <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`} style={{ color: color }}>
        <Icon size={80} />
    </div>
    <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl text-white shadow-md flex items-center justify-center`} style={{ backgroundColor: color }}>
                <Icon size={24} strokeWidth={2} />
            </div>
            {trend && (
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    <TrendingUp size={12} className="mr-1" /> {trend}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-3xl font-bold text-gray-800 font-playfair mb-1">{value}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
        </div>
        {footer && (
             <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                {footer}
             </div>
        )}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur border border-gray-100 p-3 rounded-xl shadow-xl text-xs z-50">
        <p className="font-bold text-[#064E3B] mb-2 font-playfair">{label}</p>
        {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="font-medium text-gray-600 capitalize">{entry.name}: {entry.value.toLocaleString()}</span>
            </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Dashboard: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const { bumbuMakkah, bumbuMadinah, rteData, expeditionData, tenantData } = useData();

  // --- DERIVED DATA ---
  
  // 1. Total Volume Bumbu (Ton)
  const totalBumbu = useMemo(() => {
    const volMakkah = bumbuMakkah.filter(i => i.isUsed).reduce((acc, curr) => acc + (parseFloat(curr.volume) || 0), 0);
    const volMadinah = bumbuMadinah.filter(i => i.isUsed).reduce((acc, curr) => acc + (parseFloat(curr.volume) || 0), 0);
    return (volMakkah + volMadinah).toLocaleString(undefined, { maximumFractionDigits: 1 });
  }, [bumbuMakkah, bumbuMadinah]);

  // 2. Total RTE Volume
  const totalRTE = useMemo(() => {
    return rteData.filter(i => i.isUsed).reduce((acc, curr) => acc + (parseFloat(curr.volume) || 0), 0);
  }, [rteData]);

  // 3. Total Expedition Weight
  const totalCargo = useMemo(() => {
      return expeditionData.reduce((acc, curr) => acc + (parseFloat(curr.weight) || 0), 0);
  }, [expeditionData]);

  // 4. Total Tenant Revenue (Simulated)
  const totalRevenue = useMemo(() => {
      return tenantData.reduce((acc, curr) => acc + (parseFloat(curr.rentCost) || 0), 0);
  }, [tenantData]);

  // 5. Chart Data: RTE Distribution
  const rteChartData = useMemo(() => {
      const colors = ['#D4AF37', '#064E3B', '#10B981', '#9CA3AF'];
      return rteData.filter(i => i.isUsed && i.companyName).map((item, idx) => ({
          name: item.companyName,
          value: parseFloat(item.volume) || 0,
          color: colors[idx % colors.length]
      }));
  }, [rteData]);

  // 6. Chart Data: Expedition by Company (Mocking Kloter Concept via Company)
  const expeditionChartData = useMemo(() => {
      return expeditionData.map(item => ({
          kloter: item.companyName.split(' ')[0], // Simulating shorter name
          berat: parseFloat(item.weight) || 0
      }));
  }, [expeditionData]);

  // 7. Simulated Trend Data (Since we don't have historical data, we'll keep the mock structure but maybe scale it)
  const dataBumbuTrend = [
    { day: 'Senin', makkah: 45, madinah: 30 },
    { day: 'Selasa', makkah: 50, madinah: 35 },
    { day: 'Rabu', makkah: 48, madinah: 38 },
    { day: 'Kamis', makkah: 60, madinah: 45 },
    { day: 'Jumat', makkah: 55, madinah: 50 },
    { day: 'Sabtu', makkah: 65, madinah: 55 },
    { day: 'Minggu', makkah: 70, madinah: 60 },
  ];

  return (
    <div className="space-y-6 pb-10 animate-fade-in-up font-sans">
      
      {/* 1. HEADER SECTION */}
      <div className="bg-[#064E3B] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-[#064E3B]/20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#10B981] to-[#064E3B] rounded-full blur-[100px] opacity-30 translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D4AF37] rounded-full blur-[80px] opacity-20 -translate-x-1/4 translate-y-1/4"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">
                        <Calendar size={14} /> <span>{currentDate}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2 leading-tight">
                        Ringkasan <span className="text-[#D4AF37]">Ekosistem 2026</span>
                    </h1>
                    <p className="text-emerald-100/80 text-sm max-w-lg leading-relaxed">
                        Executive Summary realisasi layanan konsumsi, potensi ekonomi, dan logistik haji (Sinkronisasi Data Real-time).
                    </p>
                </div>
                
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                    <div className="text-right">
                        <p className="text-xs text-emerald-100">Status Data</p>
                        <p className="text-sm font-bold text-white">Live Monitoring</p>
                    </div>
                    <div className="relative w-3 h-3">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                </div>
            </div>
      </div>

      {/* 2. KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Konsumsi Bumbu" 
            value={`${totalBumbu} Ton`} 
            icon={ChefHat} 
            color="#064E3B" 
            trend="+12%"
            footer={<span>Akumulasi <strong>Makkah</strong> & <strong>Madinah</strong></span>}
        />
        <StatCard 
            title="Realisasi RTE" 
            value={`${totalRTE.toLocaleString()} Porsi`} 
            icon={UtensilsCrossed} 
            color="#D4AF37" 
            trend="+5%"
            footer={<span>Paket Makanan Siap Saji Terdistribusi</span>}
        />
        <StatCard 
            title="Ekspedisi Kargo" 
            value={`${totalCargo.toLocaleString()} Kg`} 
            icon={Truck} 
            color="#B45309" 
            trend="+8.5%"
            footer={<span>Total Berat Terkirim</span>}
        />
        <StatCard 
            title="Potensi Tenant" 
            value={`SAR ${totalRevenue.toLocaleString()}`} 
            icon={Wallet} 
            color="#1E3A8A" 
            trend="+15%"
            footer={<span>Estimasi Biaya Sewa</span>}
        />
      </div>

      {/* 3. CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GlassCard title="Tren Konsumsi Bumbu" subtitle="Makkah vs Madinah (7 Hari Terakhir)">
                <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dataBumbuTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorMakkah" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#064E3B" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#064E3B" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorMadinah" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} stroke="#6B7280" />
                            <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#6B7280" />
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E7EB" />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="makkah" stroke="#064E3B" fillOpacity={1} fill="url(#colorMakkah)" strokeWidth={3} />
                            <Area type="monotone" dataKey="madinah" stroke="#10B981" fillOpacity={1} fill="url(#colorMadinah)" strokeWidth={3} />
                            <Legend iconType="circle" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-1">
             <GlassCard title="Market Share RTE" subtitle="Distribusi Perusahaan">
                <div className="h-[300px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={rteChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {rteChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <UtensilsCrossed className="text-gray-300" size={32} />
                        <span className="text-xs font-bold text-gray-400 mt-1">Total: {totalRTE.toLocaleString()}</span>
                    </div>
                </div>
            </GlassCard>
          </div>
      </div>

      {/* 4. ACTIVITY & ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard title="Aktivitas Input Data" subtitle="Real-time logs">
               <div className="space-y-4 mt-2">
                   {[
                       { type: 'bumbu', text: 'Input Bumbu Makkah - Dapur Al-Haram', time: '2 menit lalu', icon: ChefHat, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                       { type: 'rte', text: 'Update Stok RTE - PT. HTI', time: '15 menit lalu', icon: UtensilsCrossed, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                       { type: 'cargo', text: 'Manifest Kargo Kloter JKG-42', time: '1 jam lalu', icon: Truck, color: 'text-orange-600', bg: 'bg-orange-50' },
                   ].map((log, idx) => (
                       <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                           <div className={`p-2 rounded-lg ${log.bg} ${log.color}`}>
                               <log.icon size={18} />
                           </div>
                           <div className="flex-1">
                               <p className="text-sm font-bold text-gray-700">{log.text}</p>
                               <p className="text-[10px] text-gray-400 font-medium">{log.time}</p>
                           </div>
                           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                       </div>
                   ))}
               </div>
          </GlassCard>

           <GlassCard title="Top Pengiriman Ekspedisi" subtitle="Berdasarkan Perusahaan">
                <div className="h-[200px] mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={expeditionChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                             <XAxis type="number" hide />
                             <YAxis dataKey="kloter" type="category" axisLine={false} tickLine={false} fontSize={12} fontWeight={600} stroke="#4B5563" />
                             <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                             <Bar dataKey="berat" fill="#B45309" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                     </ResponsiveContainer>
                </div>
           </GlassCard>
      </div>

    </div>
  );
};
