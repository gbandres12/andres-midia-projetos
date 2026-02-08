import React, { useState, useMemo, useEffect } from 'react';
import { FinanceData } from '../types';
import { supabase } from '../lib/supabase';

interface FinanceViewProps {
    projectId: string;
}

const FinanceView: React.FC<FinanceViewProps> = ({ projectId }) => {
    const [data, setData] = useState<FinanceData>({
        id: '',
        projectId,
        saleValue: 10000,
        contractDuration: 12,
        membersCosts: [
            { role: 'Redação', name: 'Ana', cost: 1000 },
            { role: 'Design', name: 'Beto', cost: 1500 },
            { role: 'Estrategista', name: 'Carla', cost: 1500 },
        ]
    });

    useEffect(() => {
        const fetchFinance = async () => {
            const { data: fData } = await supabase
                .from('finance_data')
                .select('*')
                .eq('project_id', projectId)
                .single();

            if (fData) {
                setData({
                    id: fData.id,
                    projectId: fData.project_id,
                    saleValue: fData.sale_value,
                    contractDuration: fData.contract_duration,
                    membersCosts: fData.members_costs || []
                });
            }
        };
        fetchFinance();
    }, [projectId]);

    const updateFinance = async (newData: FinanceData) => {
        setData(newData);
        await supabase.from('finance_data').upsert({
            project_id: projectId,
            sale_value: newData.saleValue,
            contract_duration: newData.contractDuration,
            members_costs: newData.membersCosts
        }, { onConflict: 'project_id' });
    };

    const totalCosts = useMemo(() => data.membersCosts.reduce((acc, current) => acc + current.cost, 0), [data.membersCosts]);
    const profit = data.saleValue - totalCosts;
    const margin = (profit / data.saleValue) * 100;
    const costPercentage = (totalCosts / data.saleValue) * 100;


    return (
        <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Valor de Venda</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-black text-slate-800 dark:text-white">R$ {data.saleValue.toLocaleString()}</span>
                        <span className="text-xs font-bold text-slate-400 mb-1">/mês</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Lucro Real</h3>
                    <div className="flex items-end gap-2">
                        <span className={`text-3xl font-black ${profit > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>R$ {profit.toLocaleString()}</span>
                        <span className={`text-xs font-bold ${margin >= 60 ? 'text-emerald-500' : 'text-amber-500'} mb-1`}>{margin.toFixed(1)}% margem</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Custo Equipe</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-black text-slate-800 dark:text-white">R$ {totalCosts.toLocaleString()}</span>
                        <span className={`text-xs font-bold ${costPercentage <= 40 ? 'text-emerald-500' : 'text-rose-500'} mb-1`}>{costPercentage.toFixed(1)}% (Meta 40%)</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-black uppercase text-slate-800 dark:text-white mb-6 tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Custos de Equipe
                    </h3>
                    <div className="space-y-4">
                        {data.membersCosts.map((member, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div>
                                    <div className="text-xs font-black text-slate-400 uppercase">{member.role}</div>
                                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{member.name}</div>
                                </div>
                                <div className="text-sm font-black text-slate-800 dark:text-white">R$ {member.cost.toLocaleString()}</div>
                            </div>
                        ))}
                        <button className="w-full py-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all">
                            + Adicionar Especialista
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-black uppercase text-slate-800 dark:text-white mb-6 tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Simulador de Contrato
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[6, 12, 24].map(duration => (
                            <button
                                key={duration}
                                onClick={() => updateFinance({ ...data, contractDuration: duration as any })}
                                className={`p-4 rounded-2xl border-2 transition-all ${data.contractDuration === duration ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}
                            >
                                <div className="text-xl font-black">{duration}</div>
                                <div className="text-[9px] font-black uppercase">Meses</div>
                            </button>
                        ))}
                    </div>
                    <div className="p-6 bg-slate-900 dark:bg-slate-950 rounded-2xl text-white">
                        <div className="text-[10px] font-black uppercase text-slate-400 mb-4">Valor Total do Contrato</div>
                        <div className="text-4xl font-black mb-2">R$ {(data.saleValue * data.contractDuration).toLocaleString()}</div>
                        <div className="text-emerald-400 text-sm font-black uppercase flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            Lucro Projetado: R$ {(profit * data.contractDuration).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinanceView;
