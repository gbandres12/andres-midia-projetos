import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MoodboardItem } from '../types';

const MoodboardView: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [items, setItems] = useState<MoodboardItem[]>([]);
    const [newItemUrl, setNewItemUrl] = useState('');

    useEffect(() => {
        const fetchMoodboard = async () => {
            const { data } = await supabase
                .from('moodboard')
                .select('*')
                .eq('project_id', projectId)
                .order('created_at', { ascending: false });

            if (data) {
                setItems(data.map(item => ({
                    id: item.id,
                    projectId: item.project_id,
                    url: item.url,
                    type: item.type as 'image' | 'link',
                    title: item.title,
                    createdAt: item.created_at
                })));
            }
        };
        fetchMoodboard();
    }, [projectId]);

    const addItem = async () => {
        if (!newItemUrl) return;
        const isImage = newItemUrl.match(/\.(jpeg|jpg|gif|png)$/) != null || newItemUrl.includes('unsplash') || newItemUrl.includes('images.pexels.com');
        const type = isImage ? 'image' : 'link';
        const title = 'Nova Referência';

        const { data: insertedItem } = await supabase.from('moodboard').insert([{
            project_id: projectId,
            url: newItemUrl,
            type: type,
            title: title
        }]).select().single();

        if (insertedItem) {
            setItems([{
                id: insertedItem.id,
                projectId: insertedItem.project_id,
                url: insertedItem.url,
                type: insertedItem.type as 'image' | 'link',
                title: insertedItem.title,
                createdAt: insertedItem.created_at
            }, ...items]);
        }
        setNewItemUrl('');
    };

    const deleteItem = async (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
        await supabase.from('moodboard').delete().eq('id', id);
    };


    return (
        <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Moodboard Visual</h3>
                        <p className="text-sm text-slate-400 font-medium">Repositório de referências visuais e identidade do projeto.</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Cole o link da imagem ou Pinterest..."
                            className="flex-1 md:w-80 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
                            value={newItemUrl}
                            onChange={(e) => setNewItemUrl(e.target.value)}
                        />
                        <button
                            onClick={addItem}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                        >
                            Adicionar
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500">
                            {item.type === 'image' ? (
                                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                                    <svg className="w-12 h-12 text-purple-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    <p className="text-xs font-black uppercase text-slate-800 dark:text-white tracking-widest mb-2">Referência Link</p>
                                    <p className="text-[10px] text-slate-400 font-medium truncate w-full">{item.url}</p>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-white text-sm font-black uppercase tracking-widest mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</p>
                                <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    <a href={item.url} target="_blank" rel="noreferrer" className="flex-1 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white text-[10px] font-black uppercase py-2 rounded-xl text-center">Abrir</a>
                                    <button
                                        onClick={() => deleteItem(item.id)}
                                        className="p-2 bg-rose-500/20 backdrop-blur-md hover:bg-rose-500 text-white rounded-xl"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="aspect-[4/5] rounded-[2rem] border-4 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-slate-300 dark:text-slate-700 hover:border-purple-400 hover:text-purple-500 transition-all cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest">Nova Referência</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoodboardView;
