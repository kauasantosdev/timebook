import React, { useState } from 'react';
import { Client, UserProfile } from '../types';
import { Users, Search, Mail, Phone, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';

interface ClientsListProps {
  clients: Client[];
  profile: UserProfile;
}

export default function ClientsList({ clients, profile }: ClientsListProps) {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(c => {
    return c.name.toLowerCase().includes(search.toLowerCase()) ||
           c.email.toLowerCase().includes(search.toLowerCase()) ||
           (c.phone && c.phone.includes(search));
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-semibold text-slate-800">Meus Clientes</h2>
        <p className="text-xs text-slate-400 mt-1">Veja a sua base de clientes registados, frequência de agendamento e investimentos.</p>
      </div>

      {/* Control row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">
          Total de Clientes Registados: <span className="font-bold text-slate-700 font-mono">{filteredClients.length}</span>
        </span>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar por nome ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-slate-700 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Clients grid */}
      {filteredClients.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 py-16 text-center text-slate-400">
          <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-xs font-semibold text-slate-600">Nenhum cliente correspondente encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredClients.map((client) => {
            return (
              <div 
                key={client.id}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-violet-100 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Initial avatar & header card */}
                  <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-50">
                    <div className={`w-11 h-11 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${client.avatarColor}`}>
                      {client.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-slate-800 text-xs truncate">{client.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate block mt-0.5" title={client.email}>{client.email}</p>
                    </div>
                  </div>

                  {/* Body details contact info */}
                  <div className="space-y-2 text-[11px] text-slate-500 mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contacto</span>
                      <span className="font-semibold text-slate-700">{client.phone || <em className="text-slate-300">Não informado</em>}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Frequência</span>
                      <span className="font-semibold text-slate-700">{client.totalBookings} reserv{client.totalBookings > 1 ? 'as' : 'a'}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-card summary spend */}
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100/50 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Investimento</span>
                  <div className="flex items-center text-emerald-600 font-bold text-xs font-mono">
                    <DollarSign className="w-3.5 h-3.5 shrink-0" />
                    <span>{client.totalSpent || (client.totalBookings * profile.pricePerSession)}{profile.currency}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
