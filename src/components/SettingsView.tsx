import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Settings as SettingsIcon, 
  Trash2, 
  ShieldCheck, 
  User, 
  Clock, 
  FileText, 
  Coins, 
  CalendarDays,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface SettingsViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function SettingsView({ profile, onUpdateProfile }: SettingsViewProps) {
  const [name, setName] = useState(profile.name);
  const [profession, setProfession] = useState(profile.profession);
  const [bio, setBio] = useState(profile.bio);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [price, setPrice] = useState(profile.pricePerSession);
  const [duration, setDuration] = useState(profile.slotDuration);
  const [startTime, setStartTime] = useState(profile.workingHours.start);
  const [endTime, setEndTime] = useState(profile.workingHours.end);
  const [workingDays, setWorkingDays] = useState<number[]>(profile.workingDays);
  
  const [message, setMessage] = useState('');

  const daysList = [
    { label: 'Seg', value: 1 },
    { label: 'Ter', value: 2 },
    { label: 'Qua', value: 3 },
    { label: 'Qui', value: 4 },
    { label: 'Sex', value: 5 },
    { label: 'Sáb', value: 6 },
    { label: 'Dom', value: 0 },
  ];

  const handleToggleDay = (dayVal: number) => {
    if (workingDays.includes(dayVal)) {
      setWorkingDays(workingDays.filter(d => d !== dayVal));
    } else {
      setWorkingDays([...workingDays, dayVal].sort());
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name,
      profession,
      bio,
      avatarUrl,
      pricePerSession: Number(price),
      slotDuration: Number(duration),
      workingHours: {
        start: startTime,
        end: endTime
      },
      workingDays
    });

    setMessage('Todas as configurações do SaaS foram atualizadas com sucesso e sincronizadas com a página pública!');
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-semibold text-slate-800">Regras de Agendamento & Perfil</h2>
        <p className="text-xs text-slate-400 mt-1">Configure o seu perfil público, preços de consulta, horários ativos e dias de trabalho.</p>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-2.5 text-emerald-800 text-xs font-semibold shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-8">
        
        {/* Section 1: Public Profile */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-2">
            <User className="w-4.5 h-4.5 text-slate-400" />
            <h3 className="font-display font-semibold text-slate-800 text-xs uppercase tracking-wider">Aparência do Perfil Público</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Nome profissional</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Profissão / Subtítulo</label>
              <input 
                type="text" 
                required
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">URL Foto de Avatar</label>
            <input 
              type="text" 
              required
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Biografia Curta (Aparece no link de agendamento)</label>
            <textarea 
              rows={3}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Section 2: Availability Rules */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-2">
            <Clock className="w-4.5 h-4.5 text-slate-400" />
            <h3 className="font-display font-semibold text-slate-800 text-xs uppercase tracking-wider">Regras de Horários & Preços</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Preço por consulta ({profile.currency})</label>
              <input 
                type="number" 
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Duração de cada slot (Minutos)</label>
              <select 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-semibold"
              >
                <option value={15}>15 minutos</option>
                <option value={30}>30 minutos</option>
                <option value={45}>45 minutos</option>
                <option value={60}>60 minutos</option>
                <option value={90}>90 minutos</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Hora Inicial</label>
                <input 
                  type="text" 
                  required
                  placeholder="09:00"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-2 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Hora Limite</label>
                <input 
                  type="text" 
                  required
                  placeholder="18:00"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-2 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* Working Days Select */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Dias Semanais de Trabalho</label>
            <div className="flex flex-wrap gap-2">
              {daysList.map((day) => {
                const isActive = workingDays.includes(day.value);
                return (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => handleToggleDay(day.value)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      isActive 
                        ? 'bg-violet-600 text-white border-transparent shadow-sm' 
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-400 mt-2.5">Os dias da semana desativados não estarão visíveis como disponíveis na sua página pública.</p>
          </div>
        </div>

        {/* Form buttons */}
        <div className="flex justify-end gap-3">
          <button 
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-xs py-3 px-6 rounded-xl shadow-md shadow-violet-200 transition-all hover:scale-[1.01]"
          >
            Guardar Configurações
          </button>
        </div>

      </form>

    </div>
  );
}
