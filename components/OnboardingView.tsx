import React, { useState } from 'react';

const OnboardingView: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [service, setService] = useState<'Gestão de Mídias' | 'Identidade Visual'>('Gestão de Mídias');

    const workflows = {
        'Gestão de Mídias': [
            { step: 'Reunião de Kickoff', days: 1, status: 'Concluído' },
            { step: 'Preenchimento do Briefing', days: 2, status: 'Pendente' },
            { step: 'Criação da Linha Editorial', days: 7, status: 'Aguardando' },
            { step: 'Aprovação de Criativos', days: 10, status: 'Aguardando' },
            { step: 'Agendamento de Posts', days: 12, status: 'Aguardando' },
        ],
        'Identidade Visual': [
            { step: 'Briefing Criativo', days: 1, status: 'Concluído' },
            { step: 'Pesquisa e Moodboard', days: 5, status: 'Pendente' },
            { step: 'Apresentação de Conceitos', days: 12, status: 'Aguardando' },
            { step: 'Refinamento', days: 15, status: 'Aguardando' },
            { step: 'Entrega de Assets', days: 20, status: 'Aguardando' },
        ]
    };

    return (
        <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Workflow de Entrega</h3>
                        <p className="text-sm text-slate-400 font-medium">Cronograma automatizado baseado no serviço contratado.</p>
                    </div>
                    <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-2xl border border-slate-100 dark:border-slate-700">
                        {Object.keys(workflows).map((s) => (
                            <button
                                key={s}
                                onClick={() => setService(s as any)}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${service === s ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative pt-8">
                    {/* Timeline Line */}
                    <div className="absolute left-[17px] top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800"></div>

                    <div className="space-y-12">
                        {workflows[service].map((item, idx) => (
                            <div key={idx} className="relative flex items-start gap-8 group">
                                {/* Timeline Dot */}
                                <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 transition-all ${item.status === 'Concluído' ? 'bg-emerald-500' : item.status === 'Pendente' ? 'bg-blue-500 scale-110 shadow-lg shadow-blue-500/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                    {item.status === 'Concluído' ? (
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    ) : (
                                        <span className={`text-[10px] font-black ${item.status === 'Pendente' ? 'text-white' : 'text-slate-400'}`}>{idx + 1}</span>
                                    )}
                                </div>

                                <div className="flex-1 bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-3xl border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className={`text-lg font-black ${item.status === 'Concluído' ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-white'}`}>{item.step}</h4>
                                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${item.status === 'Concluído' ? 'bg-emerald-50 bg-emerald-900/10 text-emerald-600' : item.status === 'Pendente' ? 'bg-blue-50 bg-blue-900/10 text-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-400 flex items-center gap-2">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                Entrega estimada em D+{item.days}
                                            </div>
                                        </div>
                                        <button className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${item.status === 'Concluído' ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm hover:shadow-md active:scale-95 border border-slate-100 dark:border-slate-600'}`}>
                                            {item.status === 'Concluído' ? 'VER ARQUIVOS' : 'CONCLUIR ETAPA'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingView;
