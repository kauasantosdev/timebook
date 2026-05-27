import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User, 
  Calendar as CalendarIcon, 
  CheckCircle,
  Video,
  UserPlus,
  Lock,
  Plus,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { Booking, Client, UserProfile, DailySlot } from '../types';

interface CalendarViewProps {
  profile: UserProfile;
  bookings: Booking[];
  clients: Client[];
  onAddManualBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  onCancelBooking: (id: string) => void;
}

export default function CalendarView({
  profile,
  bookings,
  clients,
  onAddManualBooking,
  onCancelBooking
}: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState('2026-05-27'); // Today by default
  const [hoveredTimeSlot, setHoveredTimeSlot] = useState<string | null>(null);
  const [quickBookSlot, setQuickBookSlot] = useState<string | null>(null);
  
  // States for instant rapid scheduler
  const [selectedClientIndex, setSelectedClientIndex] = useState(0);
  const [quickNotes, setQuickNotes] = useState('');

  // Calendar logic for May 2026
  // May 1, 2026 is Friday -> so in a Mon-Sun calendar grid, we have 4 empty days at the start if week starts on Mon (1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri).
  // Yes! Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5. So we need 4 empty index padding blocks.
  const paddingBlocks = 4;
  const daysInMay = 31;
  const daysArray = Array.from({ length: daysInMay }, (_, i) => i + 1);

  const formatDateString = (dayNum: number) => {
    return `2026-05-${dayNum.toString().padStart(2, '0')}`;
  };

  // Generate Slots dynamically based on start and end working hours, and slot duration.
  const generateSlotsForSelectedDate = (): DailySlot[] => {
    const slots: DailySlot[] = [];
    const [startH, startM] = profile.workingHours.start.split(':').map(Number);
    const [endH, endM] = profile.workingHours.end.split(':').map(Number);
    
    let currentInMinutes = startH * 60 + startM;
    const endLimitInMinutes = endH * 60 + endM;

    while (currentInMinutes + profile.slotDuration <= endLimitInMinutes) {
      const h = Math.floor(currentInMinutes / 60);
      const m = currentInMinutes % 60;
      const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      
      // Check if slot has a confirmed booking
      const matchingBooking = bookings.find(b => b.date === selectedDate && b.time === timeStr && b.status === 'confirmed');
      
      slots.push({
        time: timeStr,
        isAvailable: !matchingBooking,
        booking: matchingBooking
      });

      currentInMinutes += profile.slotDuration;
    }
    return slots;
  };

  const daySlots = generateSlotsForSelectedDate();

  const handleQuickBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickBookSlot) return;
    const clientSelected = clients[selectedClientIndex] || clients[0];
    
    // Create new booking
    onAddManualBooking({
      clientId: clientSelected.id,
      clientName: clientSelected.name,
      clientEmail: clientSelected.email,
      clientPhone: clientSelected.phone,
      date: selectedDate,
      time: quickBookSlot,
      duration: profile.slotDuration,
      status: 'confirmed',
      notes: quickNotes || "Reservado por meio do Planeador Avançado.",
      price: profile.pricePerSession
    });

    setQuickBookSlot(null);
    setQuickNotes('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Page Title Header */}
      <div>
        <h2 className="text-xl font-display font-semibold text-slate-800">Calendário de Consultas</h2>
        <p className="text-xs text-slate-400 mt-1">Gerencie a sua disponibilidade, visualize horários ocupados e adicione sessões manualmente.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: May 2026 calendar view widget (Span 5) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/20">
          <div className="flex items-center justify-between mb-4">
            <span className="font-display font-semibold text-sm text-slate-800">Maio 2026</span>
            <div className="flex gap-1">
              <button disabled className="p-1 hover:bg-slate-50 text-slate-300 rounded-lg cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button disabled className="p-1 hover:bg-slate-50 text-slate-300 rounded-lg cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid Headers Mon-Sun */}
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty padding blocks */}
            {Array.from({ length: paddingBlocks }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-10 rounded-xl" />
            ))}

            {/* May Days */}
            {daysArray.map((day) => {
              const fullDateStr = formatDateString(day);
              const isSelected = selectedDate === fullDateStr;
              
              // Count bookings on this day to show a mini indicator bullet
              const dayBookingsCount = bookings.filter(b => b.date === fullDateStr && b.status === 'confirmed').length;

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => {
                    setSelectedDate(fullDateStr);
                    setQuickBookSlot(null);
                  }}
                  className={`h-10 rounded-xl text-xs font-semibold flex flex-col items-center justify-center relative transition-all ${
                    isSelected 
                      ? 'bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200/60 font-bold scale-105 z-10' 
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-100'
                  }`}
                >
                  <span>{day}</span>
                  {dayBookingsCount > 0 && (
                    <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${
                      isSelected ? 'bg-white' : 'bg-violet-600'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Calendar explanation footer */}
          <div className="mt-6 pt-5 border-t border-slate-50 text-[10px] text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-violet-600 block shrink-0" />
              <span>Dias com sessões ativas (Sinalizado por ponto)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-white border border-slate-100 block shrink-0" />
              <span>Calendário sincronizado com o fuso UTC do operador</span>
            </div>
          </div>
        </div>

        {/* Right column: Slots manager for selected day (Span 7) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/20">
          <div className="flex justify-between items-center border-b border-slate-50 pb-4 mb-5">
            <div>
              <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest block font-mono">PLANEADOR DIÁRIO</span>
              <h3 className="font-display font-semibold text-slate-800 text-sm">{selectedDate} (Quarta)</h3>
            </div>
            <span className="text-xs bg-slate-50 text-slate-400 px-3 py-1 rounded-full border border-slate-100">
              Total Slots: <span className="font-bold text-slate-700 font-mono">{daySlots.length}</span>
            </span>
          </div>

          {/* Slot Grid selection with states disponible select or busy */}
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2">
            {daySlots.map((slot) => {
              const isOccupied = !slot.isAvailable;
              const isQuickBookActive = quickBookSlot === slot.time;

              return (
                <div key={slot.time} className="transition-all">
                  <div 
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isOccupied 
                        ? 'bg-rose-50/40 border-rose-100/50 hover:bg-rose-50/60' 
                        : isQuickBookActive 
                        ? 'bg-violet-50/40 border-violet-200'
                        : 'bg-emerald-50/20 hover:bg-emerald-50/50 border-emerald-100/40'
                    }`}
                  >
                    
                    {/* Time slot indicator */}
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl shrink-0 ${
                        isOccupied ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 font-mono block leading-none">{slot.time}</span>
                        <span className="text-[9px] text-slate-400 font-medium tracking-wide">Duração: {profile.slotDuration} min</span>
                      </div>
                    </div>

                    {/* Occupied State */}
                    {isOccupied && slot.booking ? (
                      <div className="flex-1 min-w-0 sm:ml-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-slate-700 truncate">{slot.booking.clientName}</span>
                          <span className="text-[9px] bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full">Ocupado</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate leading-none mt-1" title={slot.booking.notes}>
                          {slot.booking.notes || "Sessão confirmada via link público."}
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1 text-left sm:ml-4">
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">Disponível</span>
                      </div>
                    )}

                    {/* Actions slot builder */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {isOccupied && slot.booking ? (
                        <button
                          onClick={() => onCancelBooking(slot.booking!.id)}
                          className="bg-white hover:bg-rose-50 text-rose-500 font-semibold text-xs border border-rose-100/80 px-3 py-1.5 rounded-xl transition-all"
                        >
                          Cancelar
                        </button>
                      ) : (
                        !isQuickBookActive && (
                          <button
                            onClick={() => setQuickBookSlot(slot.time)}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" /> Agendar Clínico
                          </button>
                        )
                      )}
                    </div>

                  </div>

                  {/* Quick booking expansion form inside slot */}
                  {isQuickBookActive && (
                    <form 
                      onSubmit={handleQuickBookSubmit}
                      className="mt-2 ml-4 p-4 border-l-2 border-violet-500 bg-violet-50/10 rounded-r-2xl border-y border-r border-slate-100/60 space-y-3.5 animate-slideDown"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-violet-700">Agendamento Rápido ({slot.time})</span>
                        <button 
                          type="button" 
                          onClick={() => setQuickBookSlot(null)}
                          className="text-[10px] font-bold font-mono text-slate-400 hover:text-slate-600 block"
                        >
                          FECHAR
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Selecionar Cliente</label>
                          <select 
                            value={selectedClientIndex}
                            onChange={(e) => setSelectedClientIndex(Number(e.target.value))}
                            className="w-full text-xs bg-white border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-violet-500"
                          >
                            {clients.map((c, index) => (
                              <option key={c.id} value={index}>{c.name} ({c.email})</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Preço da Sessão</label>
                          <div className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-500 font-medium">
                            {profile.pricePerSession}{profile.currency} (Preço Padrão)
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Observações da Consulta</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Ponto de situação semanal..."
                          value={quickNotes}
                          onChange={(e) => setQuickNotes(e.target.value)}
                          className="w-full text-xs bg-white border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-violet-500"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button 
                          type="submit"
                          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-[11px] px-4 py-2 rounded-lg transition-all shadow-sm"
                        >
                          Confirmar Bloqueio
                        </button>
                      </div>

                    </form>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
