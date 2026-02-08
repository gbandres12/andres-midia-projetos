import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const TrafficView: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [investment, setInvestment] = useState(5000);
    const [ticketPrice, setTicketPrice] = useState(1500);

    useEffect(() => {
        const fetchTraffic = async () => {
            const { data: tData } = await supabase
                .from('traffic_metrics')
                .select('*')
                .eq('project_id', projectId)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (tData) {
                setInvestment(Number(tData.investment));
                setTicketPrice(Number(tData.revenue / (tData.sales || 1)) || 1500);
            }
        };
        fetchTraffic();
    }, [projectId]);

    const updateTraffic = async (newInv: number, newTicket: number) => {
        setInvestment(newInv);
        setTicketPrice(newTicket);
        await supabase.from('traffic_metrics').upsert({
            project_id: projectId,
            month: new Date().toLocaleString('pt-BR', { month: 'long' }),
            investment: newInv,
            revenue: newTicket // Simplificação: usando revenue para guardar o ticket no mock
        }, { onConflict: 'project_id' });
    };

    const scenarios = useMemo(() => {
        // Fórmulas baseadas em referências de mercado
        const calc = (convRate: number, cpaFactor: number) => {
            const sales = Math.floor((investment / (ticketPrice * cpaFactor)));
            const revenue = sales * ticketPrice;
            const cpa = investment / (sales || 1);
            const roi = (revenue - investment) / investment;
            return { sales, revenue, cpa, roi };
        };

        return {
            pessimistic: calc(0.01, 0.4), // 40% do ticket em CPA
            median: calc(0.02, 0.25),      // 25% do ticket em CPA
            optimistic: calc(0.04, 0.15)    // 15% do ticket em CPA
        };
    }, [investment, ticketPrice]);


    return (
        <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Search/Filter Bar Simulation */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-wrap gap-8 items-center">
                <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Investimento Mensal</label>
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-black text-slate-800 dark:text-white">R$</span>
                        <input
                            type="number"
                            value={investment}
                            onChange={(e) => updateTraffic(Number(e.target.value), ticketPrice)}
                            className="w-32 bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2 font-black text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Ticket Médio Produto</label>
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-black text-slate-800 dark:text-white">R$</span>
                        <input
                            type="number"
                            value={ticketPrice}
                            onChange={(e) => updateTraffic(investment, Number(e.target.value))}
                            className="w-32 bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2 font-black text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
                <div className="ml-auto bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800">
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Simulação em Tempo Real</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pessimistic */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border-2 border-slate-50 dark:border-slate-800 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <svg className="w-16 h-16 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                    </div>
                    <div className="text-[10px] font-black uppercase text-rose-500 mb-4 tracking-widest">Cenário Conservador</div>
                    <div className="text-4xl font-black text-slate-800 dark:text-white mb-1">{scenarios.pessimistic.sales}</div>
                    <div className="text-xs font-bold text-slate-400 mb-6 uppercase">Vendas estimadas</div>
                    <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-slate-800">
                        <div className="flex justify-between text-xs font-medium"><span className="text-slate-400">Faturamento</span><span className="font-black dark:text-white">R$ {scenarios.pessimistic.revenue.toLocaleString()}</span></div>
                        <div className="flex justify-between text-xs font-medium"><span className="text-slate-400">CPA Máximo</span><span className="font-black text-rose-500">R$ {scenarios.pessimistic.cpa.toFixed(2)}</span></div>
                        <div className="flex justify-between text-xs font-medium"><span className="text-slate-400">ROI</span><span className="font-black dark:text-white">{scenarios.pessimistic.roi.toFixed(2)}x</span></div>
                    </div>
                </div>

                {/* Median */}
                <div className="bg-slate-900 p-8 rounded-[2rem] border-2 border-slate-800 relative overflow-hidden shadow-2xl scale-105 z-10">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 11-2 0 1 1 0 012 0zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM16.657 18.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707z" /></svg>
                    </div>
                    <div className="text-[10px] font-black uppercase text-blue-400 mb-4 tracking-widest">Cenário Esperado</div>
                    <div className="text-5xl font-black text-white mb-1">{scenarios.median.sales}</div>
                    <div className="text-xs font-bold text-slate-400 mb-6 uppercase">Vendas estimadas</div>
                    <div className="space-y-4 pt-6 border-t border-slate-800">
                        <div className="flex justify-between text-sm font-medium"><span className="text-slate-500">Faturamento</span><span className="font-black text-white">R$ {scenarios.median.revenue.toLocaleString()}</span></div>
                        <div className="flex justify-between text-sm font-medium"><span className="text-slate-500">CPA Médio</span><span className="font-black text-blue-400">R$ {scenarios.median.cpa.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm font-medium"><span className="text-slate-500">ROI Esperado</span><span className="font-black text-emerald-400">{scenarios.median.roi.toFixed(2)}x</span></div>
                    </div>
                </div>

                {/* Optimistic */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border-2 border-slate-50 dark:border-slate-800 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <svg className="w-16 h-16 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                    </div>
                    <div className="text-[10px] font-black uppercase text-emerald-500 mb-4 tracking-widest">Cenário Escala</div>
                    <div className="text-4xl font-black text-slate-800 dark:text-white mb-1">{scenarios.optimistic.sales}</div>
                    <div className="text-xs font-bold text-slate-400 mb-6 uppercase">Vendas estimadas</div>
                    <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-slate-800">
                        <div className="flex justify-between text-xs font-medium"><span className="text-slate-400">Faturamento</span><span className="font-black dark:text-white">R$ {scenarios.optimistic.revenue.toLocaleString()}</span></div>
                        <div className="flex justify-between text-xs font-medium"><span className="text-slate-400">CPA Alvo</span><span className="font-black text-emerald-500">R$ {scenarios.optimistic.cpa.toFixed(2)}</span></div>
                        <div className="flex justify-between text-xs font-medium"><span className="text-slate-400">ROI</span><span className="font-black dark:text-white">{scenarios.optimistic.roi.toFixed(2)}x</span></div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-md">
                        <h4 className="text-2xl font-black mb-2">Meta de CPA: R$ {(ticketPrice * 0.2).toFixed(2)}</h4>
                        <p className="text-blue-100 text-sm opacity-80">Baseado no seu ticket médio, para manter uma margem saudável de agência, seu custo por aquisição ideal não deve ultrapassar 20% do valor do produto.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                            <div className="text-[9px] font-black uppercase text-blue-200 mb-1">CPA Ruim</div>
                            <div className="text-xl font-black">{'>'} R$ {(ticketPrice * 0.4).toFixed(0)}</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                            <div className="text-[9px] font-black uppercase text-blue-200 mb-1">CPA Aceitável</div>
                            <div className="text-xl font-black">{'~'} R$ {(ticketPrice * 0.25).toFixed(0)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrafficView;
