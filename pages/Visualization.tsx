import React, { useMemo } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useData } from '../contexts/DataContext';
import { PieChart as PieIcon, TrendingUp, Info } from 'lucide-react';

export const Visualization: React.FC = () => {
    const { bumbuMakkah, bumbuMadinah, telecomActive, telecomData, expeditionData, tenantData } = useData();

    // Chart Color Palette - Theme Aligned
    const COLORS = {
        primary: '#064E3B',
        accent: '#D4AF37',
        secondary: '#10B981',
        neutral: '#9CA3AF',
        glass: 'rgba(255,255,255,0.8)'
    };

    // 1. Compare Prices Makkah vs Madinah for top items
    const dataPriceComparison = useMemo(() => {
        const common = bumbuMakkah.filter(i => i.isUsed).slice(0, 5).map(makkahItem => {
            const madinahItem = bumbuMadinah.find(m => m.name === makkahItem.name);
            return {
                name: makkahItem.name,
                makkah: parseFloat(makkahItem.price) || 0,
                madinah: madinahItem ? (parseFloat(madinahItem.price) || 0) : 0
            };
        });
        return common;
    }, [bumbuMakkah, bumbuMadinah]);

    // 2. Telecom Share
    const dataTelcoShare = useMemo(() => {
        const palette = [COLORS.primary, COLORS.accent, COLORS.secondary, COLORS.neutral];
        return telecomData.map((item, index) => ({
            name: item.providerName,
            value: telecomActive[item.id] ? 1 : 0,
            color: palette[index % palette.length]
        })).filter(i => i.value > 0);
    }, [telecomData, telecomActive]);

    // 3. Expedition Trend
    const dataExpeditionTrend = useMemo(() => {
        return expeditionData.map((item, i) => ({
            day: `Lot-${i+1}`,
            berat: parseFloat(item.weight) || 0
        }));
    }, [expeditionData]);

    // 4. Tenant Revenue Radar
    const dataHotelRevenue = useMemo(() => {
         const categories: Record<string, number> = {};
         tenantData.forEach(t => {
             const cat = t.productType || 'Lainnya';
             categories[cat] = (categories[cat] || 0) + (parseFloat(t.rentCost) || 0);
         });
         return Object.keys(categories).map(key => ({
             subject: key,
             A: categories[key],
             fullMark: Math.max(...Object.values(categories)) * 1.2
         }));
    }, [tenantData]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
            <div className="bg-white/90 backdrop-blur-xl border border-white/50 p-4 rounded-2xl shadow-xl text-xs z-50">
                <p className="font-bold text-[#064E3B] mb-2 font-playfair border-b border-gray-100 pb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                        <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: entry.color }}></div>
                        <span className="font-semibold text-gray-600 capitalize">{entry.name}: <span className="text-gray-800">{entry.value.toLocaleString()}</span></span>
                    </div>
                ))}
            </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 animate-fade-in-up pb-10">
            {/* Page Header */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] flex items-center gap-6 shadow-sm">
                 <div className="w-14 h-14 bg-gradient-to-br from-[#064E3B] to-[#042f24] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#064E3B]/20">
                    <PieIcon size={28} />
                 </div>
                 <div>
                     <h1 className="text-2xl font-bold text-[#064E3B] font-playfair">Visualisasi Data</h1>
                     <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wide">Analisis Tren & Statistik 2026</p>
                 </div>
            </div>

            {/* Row 1: Bumbu & Telco */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard title="Perbandingan Harga Bumbu" subtitle="Makkah vs Madinah (SAR)" className="!bg-white/70">
                    <div className="h-[320px] mt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataPriceComparison} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" fontSize={10} stroke="#6B7280" tickLine={false} axisLine={false} dy={10} />
                                <YAxis fontSize={10} stroke="#6B7280" tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: '#F3F4F6', radius: 8}} content={<CustomTooltip />} />
                                <Legend wrapperStyle={{paddingTop: '20px'}} />
                                <Bar dataKey="makkah" name="Makkah" fill={COLORS.primary} radius={[6, 6, 0, 0]} barSize={20} />
                                <Bar dataKey="madinah" name="Madinah" fill={COLORS.secondary} radius={[6, 6, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard title="Distribusi Provider" subtitle="Market Share Aktif" className="!bg-white/70">
                    <div className="h-[320px] mt-6 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={dataTelcoShare} 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={70} 
                                    outerRadius={110} 
                                    paddingAngle={6} 
                                    dataKey="value"
                                    cornerRadius={8}
                                >
                                    {dataTelcoShare.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                        {dataTelcoShare.length === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                <Info size={32} className="mb-2 opacity-50" />
                                <span className="text-xs font-medium">Data provider kosong</span>
                            </div>
                        )}
                        {dataTelcoShare.length > 0 && (
                             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -translate-x-12">
                                <span className="text-3xl font-bold text-[#064E3B] font-playfair">{dataTelcoShare.length}</span>
                                <span className="text-[10px] font-bold text-[#D4AF37] uppercase">Provider</span>
                            </div>
                        )}
                    </div>
                </GlassCard>
            </div>

            {/* Row 2: Expedition & Tenant Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <GlassCard title="Tren Volume Kargo" subtitle="Berat per Lot Pengiriman (Kg)" className="!bg-white/70">
                        <div className="h-[320px] mt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dataExpeditionTrend} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="day" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} dy={10} />
                                    <YAxis fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line 
                                        type="monotone" 
                                        dataKey="berat" 
                                        stroke={COLORS.accent} 
                                        strokeWidth={3} 
                                        dot={{r: 4, strokeWidth: 2, fill: 'white', stroke: COLORS.accent}} 
                                        activeDot={{ r: 8, fill: COLORS.primary }} 
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </GlassCard>
                </div>

                <div className="lg:col-span-1">
                     <GlassCard title="Radar Kategori Tenant" subtitle="Distribusi Revenue (Sewa)" className="!bg-white/70">
                        <div className="h-[320px] mt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={dataHotelRevenue}>
                                    <PolarGrid stroke="#E5E7EB" />
                                    <PolarAngleAxis dataKey="subject" fontSize={10} tick={{ fill: '#4B5563', fontWeight: 'bold' }} />
                                    <PolarRadiusAxis angle={30} stroke="none" />
                                    <Radar name="Revenue" dataKey="A" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.3} />
                                    <Tooltip content={<CustomTooltip />} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                     </GlassCard>
                </div>
            </div>
        </div>
    );
};