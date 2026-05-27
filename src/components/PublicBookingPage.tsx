import React, { useState } from 'react';
import { UserProfile, Booking } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  ArrowLeft, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Mail, 
  User, 
  Phone,
  Video
} from 'lucide-react';

interface PublicBookingPageProps {
  profile: UserProfile;
  bookings: Booking[];
  onAddBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  onGoBack: () => void;
}

export default function PublicBookingPage({ 
  profile, 
  bookings, 
  onAddBooking, 
  onGoBack 
}: PublicBookingPageProps) {
  const [selectedDayNum, setSelectedDayNum] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBookingInfo, setCreatedBookingInfo] = useState<any>(null);

  // Time-picker calculations for May 2026
  const paddingBlocks = 4; // Mon-Sun padding 
  const daysInMay = 31;
  const daysList = Array.from({ length: daysInMay }, (_, i) => i + 1);

  const getDayOfWeek = (dayNum: number) => {
    // Mon-Sun format where Monday = 1, Sunday = 0
    // May 1, 2026 is Friday (5)
    // So day 1 = Friday (5), day 2 = Sat (6), day 3 = Sun (0), day 4 = Mon (1) etc.
    return (dayNum - 1 + 5) % 7;
  };

  const isDaySelectable = (dayNum: number) => {
    // Disable if Day of Week is not in profile.workingDays
    const weekday = getDayOfWeek(dayNum);
    return profile.workingDays.includes(weekday);
  };

  const handleDaySelect = (dayNum: number) => {
    if (!isDaySelectable(dayNum)) return;
    setSelectedDayNum(dayNum);
    setSelectedTime(null);
  };

  const getSelectedDateString = () => {
    if (!selectedDayNum) return '';
    return `2026-05-${selectedDayNum.toString().padStart(2, '0')}`;
  };

  const getAvailableSlots = () => {
    const slots: { time: string; isFree: boolean }[] = [];
    const dateStr = getSelectedDateString();
    if (!dateStr) return [];

    const [startH, startM] = profile.workingHours.start.split(':').map(Number);
    const [endH, endM] = profile.workingHours.end.split(':').map(Number);
    
    let currentInMinutes = startH * 60 + startM;
    const endLimitInMinutes = endH * 60 + endM;

    while (currentInMinutes + profile.slotDuration <= endLimitInMinutes) {
      const h = Math.floor(currentInMinutes / 60);
      const m = currentInMinutes % 60;
      const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      
      // Check conflict with existing bookings
      const isBooked = bookings.some(b => b.date === dateStr && b.time === timeStr && b.status === 'confirmed');
      
      slots.push({
        time: timeStr,
        isFree: !isBooked
      });

      currentInMinutes += profile.slotDuration;
    }

    return slots;
  };

  const slots = getAvailableSlots();

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDayNum || !selectedTime || !name.trim() || !email.trim()) return;

    const dateStr = getSelectedDateString();
    const newBooking = {
      clientId: "client-" + Date.now(),
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      date: dateStr,
      time: selectedTime,
      duration: profile.slotDuration,
      status: 'confirmed' as const,
      notes: notes || "Sessão agendada na página pública.",
      price: profile.pricePerSession
    };

    onAddBooking(newBooking);
    
    setCreatedBookingInfo({
      clientName: name,
      date: dateStr,
      time: selectedTime,
      price: profile.pricePerSession
    });
    setIsSuccess(true);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setSelectedDayNum(null);
    setSelectedTime(null);
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#fafaff] text-slate-800 flex items-center justify-center p-6 font-sans relative overflow-hidden">
        {/* Glow backdrop auras matching image */}
        <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-emerald-300/10 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-violet-400/10 blur-[90px] pointer-events-none" />

        <div className="bg-white max-w-lg w-full rounded-3xl p-8 border border-slate-100 shadow-2xl text-center relative z-10 animate-scaleUp">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-50 text-emerald-600 rounded-2xl mb-6 shadow-sm shadow-emerald-100">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-display font-semibold text-slate-900 mb-2">Seu Agendamento foi Confirmado!</h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8 leading-relaxed">
            Uma confirmação foi encaminhada para {createdBookingInfo?.clientName}. O profissional já foi notificado.
          </p>

          <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-5 mb-8 text-left space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center font-bold">LV</div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold font-mono">Profissional</span>
                <p className="text-xs font-semibold text-slate-800 leading-tight">{profile.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/50">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Data & Hora</span>
                <span className="text-xs font-bold text-slate-700">{createdBookingInfo?.date} às {createdBookingInfo?.time}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Duração / Valor</span>
                <span className="text-xs font-bold text-slate-700">{profile.slotDuration} min • {createdBookingInfo?.price}{profile.currency}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={handleResetForm}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-sm"
            >
              Fazer Novo Agendamento
            </button>
            <button 
              onClick={onGoBack}
              className="w-full text-slate-500 hover:text-slate-800 font-semibold text-xs py-2 transition-colors"
            >
              Voltar à Página Principal
            </button>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-50 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encriptação SSL Segura & Sincronização Inteligente</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaff] text-slate-900 font-sans relative overflow-hidden flex flex-col justify-between">
      
      {/* Glow Backdrops */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-400/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-300/10 blur-[130px] pointer-events-none" />

      {/* Mini top bar */}
      <header className="relative z-10 max-w-5xl mx-auto w-full px-6 py-5 flex items-center justify-between">
        <button 
          onClick={onGoBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-white/60 backdrop-blur border border-slate-200/50 py-2 px-4 rounded-full transition-all hover:shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Regressar ao Site
        </button>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-150 px-3 py-1 rounded-full border border-slate-100 tracking-wider">
          {`timebook.com/${profile.username}`}
        </span>
      </header>

      {/* Main split grid */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-6 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Card: Professional Info */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col justify-between h-full min-h-[460px]">
          <div>
            {/* Biography Profile info */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-50">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-violet-50 mb-4 shadow"
              />
              <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest block font-mono mb-1">PROFISSIONAL SaaS</span>
              <h2 className="font-display font-semibold text-lg text-slate-900 leading-tight">{profile.name}</h2>
              <p className="text-[11px] text-slate-400 italic font-medium mt-1">{profile.profession}</p>
            </div>

            {/* Price features bullet points */}
            <div className="py-6 space-y-4 text-xs text-slate-600">
              <p className="text-center text-[11px] text-slate-500 leading-relaxed px-2 font-medium">
                "{profile.bio}"
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider">Duração</span>
                    <span className="font-bold text-slate-800">{profile.slotDuration} minutos por consulta</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 font-mono">
                    {profile.currency}
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider font-mono">Taxa Consular</span>
                    <span className="font-bold text-slate-800">{profile.pricePerSession}{profile.currency} por sessão</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider">Local</span>
                    <span className="font-bold text-slate-800">Videoconferência integrada (Google Meet)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 text-center">
            <p className="text-[10px] text-slate-400 flex items-center gap-1.5 justify-center font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Agenda verificada e ativa
            </p>
          </div>
        </div>

        {/* Right Card: Interactive calendar flow */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/20">
          
          {/* Day selection calendar grid */}
          {!selectedDayNum ? (
            <div>
              <div className="flex justify-between items-center border-b border-slate-50 pb-4 mb-5">
                <div>
                  <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest block font-mono">PASSO 1 DE 3</span>
                  <h3 className="font-display font-semibold text-slate-800 text-sm">Selecione o Dia de Preferência</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Maio 2026</span>
              </div>

              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
                <span>Dom</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: paddingBlocks }).map((_, i) => (
                  <div key={`pad-${i}`} className="h-10" />
                ))}

                {daysList.map((day) => {
                  const selectable = isDaySelectable(day);
                  return (
                    <button
                      key={day}
                      onClick={() => handleDaySelect(day)}
                      disabled={!selectable}
                      className={`h-11 rounded-xl text-xs font-semibold flex items-center justify-center relative transition-all ${
                        selectable
                          ? 'text-slate-700 bg-white hover:bg-violet-50 hover:text-violet-700 hover:border-violet-100/50 border border-slate-100 shadow-sm cursor-pointer'
                          : 'text-slate-300 bg-slate-50 border border-transparent cursor-not-allowed'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : !selectedTime ? (
            /* Time slot picker */
            <div>
              <div className="flex justify-between items-center border-b border-slate-50 pb-4 mb-5">
                <button 
                  onClick={() => setSelectedDayNum(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Calendário
                </button>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest block font-mono">PASSO 2 DE 3</span>
                  <span className="text-xs font-semibold text-slate-700">{getSelectedDateString()}</span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Horários Disponíveis</h4>

              {slots.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <p className="text-xs text-slate-500">Este dia não possui horas úteis de trabalho configuradas.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {slots.map((slot) => {
                    return (
                      <button
                        key={slot.time}
                        onClick={() => slot.isFree && setSelectedTime(slot.time)}
                        disabled={!slot.isFree}
                        className={`py-3.5 px-3 rounded-xl text-center text-xs font-bold font-mono border transition-all ${
                          slot.isFree
                            ? 'bg-emerald-50/10 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-transparent text-emerald-800 cursor-pointer'
                            : 'bg-rose-50/30 text-rose-300 border-rose-50 cursor-not-allowed line-through'
                        }`}
                      >
                        {slot.time} {slot.isFree ? '(Livre)' : '(Ocupado)'}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Formulário de Identidade */
            <div>
              <div className="flex justify-between items-center border-b border-slate-50 pb-4 mb-5">
                <button 
                  onClick={() => setSelectedTime(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar aos Horários
                </button>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest block font-mono">PASSO 3 DE 3</span>
                  <span className="text-xs font-semibold text-slate-700">{getSelectedDateString()} às {selectedTime}</span>
                </div>
              </div>

              <form onSubmit={handleBookingConfirm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Seu Nome Completo *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        required 
                        placeholder="Ex: Pedro Henrique"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200/60 rounded-xl py-2.5 pl-9 pr-3 text-slate-950 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Seu E-mail *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="email" 
                        required 
                        placeholder="pedro@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200/60 rounded-xl py-2.5 pl-9 pr-3 text-slate-950 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Telemóvel (Opcional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="+351 912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200/60 rounded-xl py-2.5 pl-9 pr-3 text-slate-950 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">O que deseja discutir nesta sessão?</label>
                  <textarea 
                    rows={2} 
                    maxLength={300}
                    placeholder="Briefing do projeto, dúvidas sobre design, etc..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200/60 rounded-xl py-2 px-3 text-slate-950 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="text-[10px] text-slate-400 leading-normal">
                    Ao agendar, concorda com a nossa política de reagendamento gratuito em até 24 horas.
                  </div>
                  <button 
                    type="submit"
                    className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs py-3 px-6 rounded-xl transition-all h-full shadow-md shadow-violet-200 shrink-0"
                  >
                    Confirmar Agendamento
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>

      </main>

      {/* Public Footer */}
      <footer className="relative z-10 text-center py-6 text-[10px] text-slate-400 font-mono">
        Desenvolvido com tecnologia de alta performance de reserva • timebook © 2026
      </footer>

    </div>
  );
}
