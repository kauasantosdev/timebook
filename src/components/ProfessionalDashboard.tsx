import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Settings as SettingsIcon, 
  Layers, 
  TrendingUp, 
  Clock, 
  Search, 
  UserPlus, 
  X, 
  Check, 
  Video, 
  Phone, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  Mail,
  User,
  Plus
} from 'lucide-react';
import { Booking, Client, UserProfile } from '../types';

interface ProfessionalDashboardProps {
  profile: UserProfile;
  bookings: Booking[];
  clients: Client[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCancelBooking: (id: string) => void;
  onConfirmBooking: (id: string) => void;
  onAddManualBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  onNavigateToPublic: () => void;
  onResetState: () => void;
  children: React.ReactNode; // renders Active Tab content
}

export default function ProfessionalDashboard({
  profile,
  bookings,
  clients,
  activeTab,
  setActiveTab,
  onCancelBooking,
  onConfirmBooking,
  onAddManualBooking,
  onNavigateToPublic,
  onResetState,
  children
}: ProfessionalDashboardProps) {
  const [showManualModal, setShowManualModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // States for manual booking form
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('2526-05-27'); // matches prompt logic, let's use 2026-05-27
  const [formTime, setFormTime] = useState('14:00');
  const [formNotes, setFormNotes] = useState('');

  const completedBookings = bookings.filter(b => b.status === 'confirmed');
  const totalRevenue = completedBookings.reduce((sum, b) => sum + b.price, 0);
  const todayStr = "2026-05-27";

  const todayBookings = bookings.filter(b => b.date === todayStr && b.status === 'confirmed');
  const futureBookings = bookings.filter(b => b.date >= todayStr && b.status === 'confirmed');

  const isSidebarOpen = true; // default reactive

  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;
    onAddManualBooking({
      clientId: "manual-" + Date.now(),
      clientName: formName,
      clientEmail: formEmail,
      clientPhone: formPhone,
      date: formDate,
      time: formTime,
      duration: profile.slotDuration,
      status: 'confirmed',
      notes: formNotes || "Agendado manualmente pelo profissional.",
      price: profile.pricePerSession
    });
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormNotes('');
    setShowManualModal(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-50/70 font-sans text-slate-800 antialiased">
      
      {/* Sidebar navigation */}
      <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-100 flex flex-col justify-between shadow-sm">
        <div className="flex flex-col">
          {/* Logo Section */}
          <div className="px-6 py-6 border-b border-rose-50/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-2 rounded-lg text-white">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-semibold text-lg tracking-tight text-slate-900 block leading-tight">timebook</span>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">PAINEL SAAS</span>
              </div>
            </div>
          </div>

          {/* Professional Profile quick info */}
          <div className="px-5 py-5 flex items-center gap-3 border-b border-slate-50">
            <img 
              src={profile.avatarUrl} 
              alt={profile.name} 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-100 flex-shrink-0"
            />
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-slate-800 truncate">{profile.name}</h4>
              <span className="text-[10px] text-slate-400 truncate block mt-0.5">{profile.profession}</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 flex flex-col gap-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'overview' 
                  ? 'bg-violet-600/90 text-white shadow-md shadow-violet-200/50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Overview / Painel
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'calendar' 
                  ? 'bg-violet-600/90 text-white shadow-md shadow-violet-200/50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Calendário Interativo
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'bookings' 
                  ? 'bg-violet-600/90 text-white shadow-md shadow-violet-200/50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              Gestão de Reservas
              {bookings.length > 0 && (
                <span className="ml-auto bg-slate-100 group-hover:bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-full text-[9px]">
                  {bookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'clients' 
                  ? 'bg-violet-600/90 text-white shadow-md shadow-violet-200/50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              Historial de Clientes
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'settings' 
                  ? 'bg-violet-600/90 text-white shadow-md shadow-violet-200/50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              Regras & Configuração
            </button>
          </nav>
        </div>

        {/* Sidebar Footer options */}
        <div className="p-4 border-t border-slate-50 bg-slate-50/50 flex flex-col gap-2">
          <button 
            onClick={onNavigateToPublic}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 hover:bg-violet-50 text-xs font-semibold text-violet-700 bg-white border border-violet-100 rounded-xl transition-all shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ver Página Pública
          </button>
          <button 
            onClick={onResetState}
            className="w-full py-1.5 text-[10px] font-mono text-slate-400 hover:text-rose-500 transition-colors"
            title="Reset todos os dados da demonstração e agendamentos criados"
          >
            Resetar Demonstração
          </button>
        </div>
      </aside>

      {/* Main Body content area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-white/85 backdrop-blur-md border-b border-slate-100/80 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">LIVE SIMULATION</span>
            <p className="text-xs text-slate-400 hidden sm:block">Você está a gerir a conta de <span className="font-semibold text-slate-600">{profile.name}</span></p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowManualModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Nova Reserva Manual
            </button>
          </div>
        </header>

        {/* Content Render Outlet */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>

      {/* Manual Booking Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-slate-50 px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-slate-800 text-base">Agendar Consulta Manualmente</h3>
                <p className="text-xs text-slate-400 mt-1">Crie um agendamento rápido direto no seu calendário</p>
              </div>
              <button 
                onClick={() => setShowManualModal(false)}
                className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualBooking} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nome do Cliente *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      required 
                      placeholder="Ex: Pedro Fonseca"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-xl py-2.5 pl-9 pr-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">E-mail *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      required 
                      placeholder="pedro.fonseca@gmail.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-xl py-2.5 pl-9 pr-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Telemóvel (Opcional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="+351 934 999 111"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-xl py-2.5 pl-9 pr-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Data</label>
                    <input 
                      type="date" 
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-xl py-2.5 px-2 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Hora</label>
                    <input 
                      type="string" 
                      required
                      placeholder="HH:MM"
                      value={formTime}
                      onChange={(e) => setFormTime(e.target.value)}
                      className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-xl py-2.5 px-2 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Notas ou Assunto</label>
                <textarea 
                  placeholder="Ex: Alinhamento sobre briefing do design do mobile app..."
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
