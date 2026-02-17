import React, { useMemo } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useData } from '../contexts/DataContext';

export const Visualization: React.FC = () => {
    const { bumbuMakkah, bumbuMadinah, telecomActive, telecomData, expeditionData, tenantData } = useData();

    // 1. Compare Prices Makkah vs Madinah for top items
    const dataPriceComparison = useMemo(() => {
        // Find common items (by name)
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
        const colors = ['#064E3B', '#D4AF37', '#10B981', '#9CA3AF']; // Modified to Green/Gold Theme
        return telecomData.map((item, index) => ({
            name: item.providerName,
            value: telecomActive[item.id] ? 1 : 0,
            color: colors[index % colors.length]
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

    return (
        <div className="space-y-8 animate-fade-in-up pb-10">
            <div className="mb-6">
                 <h1 className="text-2xl font-bold text-[#064E3B] font-playfair">Visualisasi Data</h1>
                 <p className="text-xs text-gray-500 font-medium mt-1">Analisis mendalam tren ekosistem haji.</p>
            </div>

            {/* Row 1: Bumbu & Telco */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard title="Perbandingan Harga Bumbu (SAR)" subtitle="Makkah vs Madinah (Top 5)">
                    <div className="h-[300px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataPriceComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" fontSize={12} stroke="#6B7280" />
                                <YAxis fontSize={12} stroke="#6B7280" />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px' }} />
                                <Legend />
                                <Bar dataKey="makkah" name="Makkah" fill="#064E3B" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="madinah" name="Madinah" fill="#10B981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard title="Status Provider" subtitle="Provider Aktif">
                    <div className="h-[300px] mt-4 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={dataTelcoShare} 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={60} 
                                    outerRadius={100} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                >
                                    {dataTelcoShare.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                        {dataTelcoShare.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                Tidak ada provider aktif
                            </div>
                        )}
                    </div>
                </GlassCard>
            </div>

            {/* Row 2: Expedition & Tenant Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <GlassCard title="Volume Kargo" subtitle="Berat per Lot Pengiriman (Kg)">
                        <div className="h-[300px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dataExpeditionTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="day" fontSize={12} stroke="#6B7280" />
                                    <YAxis fontSize={12} stroke="#6B7280" />
                                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                                    <Line type="monotone" dataKey="berat" stroke="#D4AF37" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: 'white', stroke:'#D4AF37'}} activeDot={{ r: 8, fill: '#064E3B' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </GlassCard>
                </div>

                <div className="lg:col-span-1">
                     <GlassCard title="Kategori Tenant" subtitle="Distribusi Revenue (Sewa)">
                        <div className="h-[300px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataHotelRevenue}>
                                    <PolarGrid stroke="#E5E7EB" />
                                    <PolarAngleAxis dataKey="subject" fontSize={10} tick={{ fill: '#6B7280' }} />
                                    <PolarRadiusAxis angle={30} stroke="none" />
                                    <Radar name="Revenue" dataKey="A" stroke="#064E3B" fill="#064E3B" fillOpacity={0.4} />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                     </GlassCard>
                </div>
            </div>
        </div>
    );
};