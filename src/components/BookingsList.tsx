import React, { useState } from 'react';
import { Booking, UserProfile } from '../types';
import { 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Trash2, 
  Mail, 
  Phone, 
  User, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';

interface BookingsListProps {
  bookings: Booking[];
  profile: UserProfile;
  onCancelBooking: (id: string) => void;
  onConfirmBooking: (id: string) => void;
}

export default function BookingsList({ 
  bookings, 
  profile, 
  onCancelBooking, 
  onConfirmBooking 
}: BookingsListProps) {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');
  const [search, setSearch] = useState('');

  const filteredBookings = bookings.filter(b => {
    // Stage Filter
    if (filter === 'confirmed' && b.status !== 'confirmed') return false;
    if (filter === 'cancelled' && b.status !== 'cancelled') return false;
    
    // Search Query
    return b.clientName.toLowerCase().includes(search.toLowerCase()) ||
           b.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
           (b.notes && b.notes.toLowerCase().includes(search.toLowerCase()));
  }).sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`)); // most recent dates first

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-semibold text-slate-800">Sessões & Agendamentos</h2>
        <p className="text-xs text-slate-400 mt-1">Histórico completo e lista detalhada de reservas ativas na sua plataforma.</p>
      </div>

      {/* Filter and search control bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* State filters tabs */}
        <div className="flex gap-1 bg-slate-50 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              filter === 'all' 
                ? 'bg-white text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Todas ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              filter === 'confirmed' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Confirmadas ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              filter === 'cancelled' 
                ? 'bg-white text-rose-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Canceladas ({bookings.filter(b => b.status === 'cancelled').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar por cliente, email ou assunto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-slate-700 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Bookings Display list */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 py-16 text-center text-slate-400">
          <AlertCircle className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-xs font-medium text-slate-600">Nenhum compromisso encontrado para os filtros selecionados</p>
          <p className="text-[10px] text-slate-400 mt-1">Experimente remover termos de pesquisa ou filtrar por outro estado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((b) => {
            const isConfirmed = b.status === 'confirmed';
            return (
              <div 
                key={b.id}
                className={`bg-white rounded-3xl border p-5 shadow-sm transition-all hover:shadow-md ${
                  isConfirmed 
                    ? 'border-slate-100 hover:border-violet-200' 
                    : 'border-slate-100 opacity-75'
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0">
                      {b.clientName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-xs">{b.clientName}</h4>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {b.clientEmail}
                      </p>
                      {b.clientPhone && (
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" /> {b.clientPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Booking Date/Hour badge */}
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                    isConfirmed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700 line-through'
                  }`}>
                    {isConfirmed ? 'Confirmada' : 'Cancelada'}
                  </span>
                </div>

                {/* Body details */}
                <div className="mt-5 pt-4 border-t border-slate-50 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold">{b.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{b.time} ({b.duration} min)</span>
                    </div>
                    <div className="flex items-center gap-0.5 font-semibold text-slate-700 font-mono ml-auto">
                      <span>{b.price}{profile.currency}</span>
                    </div>
                  </div>

                  {/* Notes Card */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-500 leading-normal">
                      <span className="font-bold text-slate-700">Comentário:</span> {b.notes || "Sessão agendada na página pública."}
                    </p>
                  </div>
                </div>

                {/* Cancel controls card */}
                {isConfirmed && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => onCancelBooking(b.id)}
                      className="text-rose-500 hover:text-white bg-white hover:bg-rose-500 font-semibold text-[10px] py-1.5 px-3.5 rounded-xl border border-rose-100 hover:border-transparent transition-all"
                    >
                      Cancelar Consulta
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
