import React, { useState } from 'react';
import { 
  DollarSign, 
  CalendarCheck2, 
  TrendingUp, 
  Users, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Video,
  FileText,
  Search,
  ArrowUpRight,
  Sparkles,
  Check
} from 'lucide-react';
import { Booking, Client, UserProfile } from '../types';

interface OverviewSectionProps {
  profile: UserProfile;
  bookings: Booking[];
  clients: Client[];
  onCancelBooking: (id: string) => void;
  onConfirmBooking: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function OverviewSection({
  profile,
  bookings,
  clients,
  onCancelBooking,
  onConfirmBooking,
  setActiveTab
}: OverviewSectionProps) {
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const todayStr = "2026-05-27";

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const revenueTotal = confirmedBookings.reduce((sum, b) => sum + b.price, 0);

  // Calculate stats for week days dynamically (Monday to Friday, 2026-05-25 to 2026-05-29)
  const weekdays = [
    { label: "Seg", date: "2026-05-25", fullname: "Segunda-feira" },
    { label: "Ter", date: "2026-05-26", fullname: "Terça-feira" },
    { label: "Qua", date: "2026-05-27", fullname: "Quarta-feira (Hoje)" },
    { label: "Qui", date: "2026-05-28", fullname: "Quinta-feira" },
    { label: "Sex", date: "2026-05-29", fullname: "Sexta-feira" },
  ];

  const chartData = weekdays.map(day => {
    const dayBookings = confirmedBookings.filter(b => b.date === day.date);
    const count = dayBookings.length;
    const revenue = dayBookings.reduce((acc, curr) => acc + curr.price, 0);
    return {
      ...day,
      count,
      revenue
    };
  });

  // Filter bookings list based on query
  const filteredBookings = bookings.filter(b => {
    return b.clientName.toLowerCase().includes(searchFilter.toLowerCase()) ||
           b.clientEmail.toLowerCase().includes(searchFilter.toLowerCase()) ||
           (b.notes && b.notes.toLowerCase().includes(searchFilter.toLowerCase()));
  }).sort((a, b) => {
    // Sort logic: future bookings first, sorted by soonest date + time
    return `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
  });

  const maxVal = Math.max(...chartData.map(d => d.count), 1);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-indigo-100/10">
        <div className="absolute right-[-5%] top-[-10%] w-60 h-60 rounded-full bg-indigo-500/20 blur-2xl flex-shrink-0" />
        <div className="absolute left-[40%] bottom-[-20%] w-80 h-80 rounded-full bg-violet-600/10 blur-3xl flex-shrink-0" />

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-violet-300 text-xs font-semibold mb-2 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Bem-vindo de volta!
          </div>
          <h2 className="text-2xl font-display font-medium mb-2">Sua Agenda Digital está Pronta</h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-5">
            O seu link público de marcações está ativo e a receber sessões estratégicas de {profile.slotDuration} minutos a {profile.pricePerSession}{profile.currency} cada.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveTab('calendar')}
              className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-violet-800/50"
            >
              Ver Calendário Hoje
            </button>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs font-mono py-2.5 px-4 rounded-xl flex items-center justify-between gap-4">
              <span className="opacity-70 truncate max-w-40 sm:max-w-xs">{`timebook.com/${profile.username}`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Faturação Total</span>
            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900 tracking-tight">{revenueTotal}{profile.currency}</p>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">+12.4% este mês</span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Total Reservas</span>
            <div className="bg-violet-50 text-violet-600 p-2 rounded-xl">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900 tracking-tight">{confirmedBookings.length}</p>
          <span className="text-[10px] text-violet-600 font-semibold block mt-1">{bookings.length - confirmedBookings.length} cancelamentos</span>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400 font-mono">Clientes Ativos</span>
            <div className="bg-sky-50 text-sky-600 p-2 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900 tracking-tight">{clients.length}</p>
          <span className="text-[10px] text-sky-600 font-semibold block mt-1">100% Retenção</span>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Preço p/ Consulta</span>
            <div className="bg-amber-50 text-amber-600 p-2 rounded-xl">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900 tracking-tight">{profile.pricePerSession}{profile.currency}</p>
          <span className="text-[10px] text-amber-600 font-semibold block mt-1">Sessões de {profile.slotDuration} min</span>
        </div>

      </div>

      {/* Main Grid: Chart & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Column (Span 1 or 2, Let's give it Span 2 for size) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/20 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-display font-semibold text-slate-800 text-sm">Agendamentos Semanais</h3>
                <p className="text-[11px] text-slate-400">Faturação e volume por dia (Semana Atual - Maio 2026)</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-violet-600" />
                <span>Marcações</span>
              </div>
            </div>

            {/* SVG custom animated interactive Bar Chart inside container */}
            <div className="h-56 mt-6 relative flex items-end justify-between px-4 pb-2 border-b border-slate-100">
              
              {/* Horizontal Help lines */}
              <div className="absolute inset-x-0 top-0 border-t border-slate-100/50 pointer-events-none" />
              <div className="absolute inset-x-0 top-1/3 border-t border-slate-100/50 pointer-events-none" />
              <div className="absolute inset-x-0 top-2/3 border-t border-slate-100/50 pointer-events-none" />

              {chartData.map((data, idx) => {
                const heightPercent = (data.count / maxVal) * 90; // scale bars to 90% space max
                return (
                  <div 
                    key={data.label} 
                    className="flex flex-col items-center flex-1 relative group cursor-pointer"
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    
                    {/* The active bar */}
                    <div 
                      style={{ height: `${heightPercent || 10}%` }}
                      className={`w-12 rounded-t-lg transition-all duration-300 relative ${
                        data.count > 0 
                          ? 'bg-gradient-to-t from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-violet-100' 
                          : 'bg-slate-100'
                      }`}
                    >
                      {/* Floating hover bubble count */}
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-bold text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {data.count}
                      </span>
                    </div>

                    <span className="text-[10px] font-medium text-slate-500 mt-3 font-mono">
                      {data.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Chart Info Footer / Tooltip feedback */}
          <div className="mt-5 p-3.5 bg-slate-50 border border-slate-100/50 rounded-xl flex items-center justify-between">
            {hoveredBarIndex !== null ? (
              <>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Estatísticas do Dia</span>
                  <p className="text-xs font-semibold text-slate-700">{chartData[hoveredBarIndex].fullname}</p>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Sessões</span>
                    <span className="text-xs font-extrabold text-violet-600 font-mono">{chartData[hoveredBarIndex].count}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Receita</span>
                    <span className="text-xs font-extrabold text-emerald-600 font-mono">{chartData[hoveredBarIndex].revenue}{profile.currency}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 w-full justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-violet-500" /> Passa o rato sobre as barras para ver detalhes diários de receita.
              </p>
            )}
          </div>
        </div>

        {/* Quick view list / Summary Stats */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/20 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">Painel Rápido</h3>
            <p className="text-[11px] text-slate-400 mb-5">Agendamentos por estado do profissional</p>

            <div className="space-y-4">
              
              <div className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-slate-600">Sessões Confirmadas</span>
                </div>
                <span className="text-xs font-extrabold font-mono text-slate-800">{bookings.filter(b => b.status === 'confirmed').length}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="text-xs font-medium text-slate-600">Sessões Canceladas</span>
                </div>
                <span className="text-xs font-extrabold font-mono text-slate-800">{bookings.filter(b => b.status === 'cancelled').length}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-xs font-medium text-slate-600">Aguardando Aprovação</span>
                </div>
                <span className="text-xs font-extrabold font-mono text-slate-800">{bookings.filter(b => b.status === 'pending').length}</span>
              </div>

            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={() => setActiveTab('bookings')}
              className="w-full text-center py-2 px-4 text-xs font-semibold text-violet-600 hover:text-white bg-violet-50 hover:bg-violet-600 rounded-xl border border-violet-100/50 transition-all"
            >
              Gerir Reservas Completo
            </button>
          </div>
        </div>

      </div>

      {/* Bookings Table / List Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-slate-50 gap-4 mb-6">
          <div>
            <h3 className="font-display font-semibold text-slate-800 text-sm">Próximas Marcações</h3>
            <p className="text-[11px] text-slate-400">Próximos compromissos sincronizados com a página de agendamentos</p>
          </div>

          {/* Search bar inside Overview table */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar por cliente..." 
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200/60 rounded-xl py-2 pl-9 pr-3 text-slate-700 outline-none focus:border-violet-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Bookings Grid list for responsiveness */}
        {filteredBookings.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <CalendarCheck2 className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-medium">Nenhuma marcação encontrada...</p>
            {searchFilter && <p className="text-[10px] text-slate-400 mt-1">Experimente mudar o termo de pesquisa</p>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead>
                <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Data & Horário</th>
                  <th className="py-3 px-4">Preço & Duração</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Assunto/Nota</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredBookings.map((b) => {
                  const isToday = b.date === todayStr;
                  return (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{b.clientName}</p>
                          <p className="text-[9px] text-slate-400 truncate font-mono">{b.clientEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span className={isToday ? "text-violet-600 font-semibold" : ""}>
                              {b.date} {isToday ? "(Hoje)" : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{b.time} ({b.duration}m)</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800 font-mono">{b.price}{profile.currency}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold ${
                          b.status === 'confirmed' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : b.status === 'cancelled' 
                            ? 'bg-rose-50 text-rose-700 line-through' 
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {b.status === 'confirmed' ? 'Confirmado' : b.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-slate-400 truncate text-[11px]" title={b.notes}>
                          {b.notes || <span className="italic text-slate-300">Sem observações...</span>}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          {b.status === 'pending' && (
                            <button
                              onClick={() => onConfirmBooking(b.id)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Confirmar Agendamento"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {b.status !== 'cancelled' ? (
                            <button
                              onClick={() => onCancelBooking(b.id)}
                              className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Cancelar Agendamento"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="text-[9px] text-slate-300 font-mono italic">Cancelada</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
