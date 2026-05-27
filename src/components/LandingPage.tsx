import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  CalendarClock, 
  DollarSign, 
  Shield, 
  ChevronRight,
  Smartphone
} from 'lucide-react';
import { Booking, UserProfile } from '../types';
import logo from "@/assets/images/logo.webp";

interface LandingPageProps {
  onEnterDashboard: () => void;
  onEnterPublicBooking: () => void;
  profile: UserProfile;
  bookings: Booking[];
}

export default function LandingPage({ 
  onEnterDashboard, 
  onEnterPublicBooking, 
  profile, 
  bookings 
}: LandingPageProps) {
  const [emailInput, setEmailInput] = useState('');
  const [demoRequested, setDemoRequested] = useState(false);

  const upcomingBookingsCount = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = bookings.reduce((acc, curr) => acc + curr.price, 0);

  const handleSubmitDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setDemoRequested(true);
    setTimeout(() => {
      onEnterDashboard();
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#fafaff] text-slate-900 overflow-hidden font-sans">
      
      {/* Dynamic Background Auras (Inspired by the Reference Image gradients) */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-400/20 blur-[130px] animate-glow-1 pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-300/15 blur-[120px] animate-glow-2 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-300/15 blur-[140px] pointer-events-none" />

      {/* Floating Header */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="logo-timebook" className="w-24 sm:w-32 md:w-40" />
          {/* <span className="font-display font-medium text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            timebook
          </span> */}
        </div>

        {/* Floating Middle Nav */}
        <div className="hidden md:flex items-center gap-8 bg-white/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-slate-100 shadow-sm">
          <a href="#features" className="text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors">Produtos</a>
          <a href="#benefits" className="text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors">Funcionalidades</a>
          <span className="text-slate-200">|</span>
          <button 
            onClick={onEnterPublicBooking}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <Smartphone className="w-4 h-4" /> Ver Booking Público
          </button>
        </div>

        {/* Auth CTAs */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onEnterDashboard}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-violet-600 transition-all rounded-xl hover:bg-slate-100/50"
          >
            Entrar
          </button>
          <button 
            onClick={onEnterDashboard}
            className="relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-violet-200 transition-all hover:scale-[1.02]"
          >
            Começar Agora
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100/50 px-4 py-1.5 rounded-full text-xs font-semibold text-violet-700 mb-6 uppercase tracking-wider shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-violet-600 animate-ping" />
            Nova Geração de Agendamentos
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Impulsiona as tuas Reservas com <br />
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent italic font-semibold">
              Software Tudo-em-Um
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Acelera os teus agendamentos com um calendário integrado de alta performance. 
            Perfeito para terapeutas, barbeiros, freelancers e marcas modernas de serviços.
          </motion.p>

          {/* Search/Demand Input Field inspired by Onesoft image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            {demoRequested ? (
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-full flex items-center justify-center gap-2.5 text-emerald-800 text-sm font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Simulação Pronta! A carregar o teu painel...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitDemo} className="p-1.5 bg-white rounded-full border border-slate-200/80 shadow-xl shadow-slate-200/40 flex items-center gap-2">
                <div className="flex-1 pl-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <input 
                    type="email" 
                    placeholder="Introduz o teu email profissional" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:ring-0 outline-none border-none py-1.5"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-xs py-3 px-6 rounded-full transition-all flex items-center gap-1.5 hover:scale-[1.01]"
                >
                  Criar Agenda <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Showcase Grid (Replicating the 4 beautiful Cards in the reference layout) */}
        <section id="features" className="mt-16 mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Calendar */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col h-full"
            >
              <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-display font-medium text-lg text-slate-800 mb-2">timebook Calendário</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Gestão fluida sem colisões de horário para freelancers e estúdios.
              </p>
              
              {/* Mini Interactive Preview */}
              <div className="mt-auto bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2 font-mono">
                  <span>Maio 2026</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span>Active</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  <div className="py-1 text-center text-[10px] bg-slate-200/50 text-slate-600 rounded">25</div>
                  <div className="py-1 text-center text-[10px] bg-slate-200/50 text-slate-600 rounded">26</div>
                  <div className="py-1 text-center text-[10px] bg-violet-600 text-white font-semibold rounded shadow-sm relative">
                    27
                    <span className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-cyan-400 rounded-full" />
                  </div>
                  <div className="py-1 text-center text-[10px] bg-indigo-50 text-indigo-600 font-medium rounded border border-indigo-100">28</div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: CRM/Clients */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col h-full"
            >
              <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display font-medium text-lg text-slate-800 mb-2">CRM de Clientes</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Histórico de reservas, notas em cada sessão e dados de contacto centralizados.
              </p>

              {/* Mini Client Preview */}
              <div className="mt-auto flex flex-col gap-2">
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-[10px] font-bold text-white flex items-center justify-center">AM</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-slate-700 truncate">Ana Martins</p>
                    <p className="text-[8px] text-slate-400 truncate">Sessão Confirmada</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-fuchsia-600 text-[10px] font-bold text-white flex items-center justify-center">BC</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-slate-700 truncate">Beatriz Costa</p>
                    <p className="text-[8px] text-slate-400 truncate">Hoje às 09:30</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Form/Flow config */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col h-full"
            >
              <div className="bg-sky-50 w-12 h-12 rounded-2xl flex items-center justify-center text-sky-600 mb-6">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-display font-medium text-lg text-slate-800 mb-2">Marcação Fluida</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Link público personalizado. Os seus clientes agendam em qualquer ecrã com 3 cliques.
              </p>

              {/* Mini Link Preview */}
              <div className="mt-auto bg-violet-50/60 border border-violet-150 p-2.5 rounded-xl flex items-center justify-between">
                <span className="text-[9px] font-mono text-violet-700 truncate">timebook.com/{profile.username}</span>
                <span className="text-[8px] font-bold uppercase tracking-wider bg-violet-600 text-white px-2 py-0.5 rounded-full">Ativo</span>
              </div>
            </motion.div>

            {/* Card 4: ERP & Metrics */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col h-full"
            >
              <div className="bg-amber-50 w-12 h-12 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-display font-medium text-lg text-slate-800 mb-2">Estatísticas SaaS</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Acompanhe o crescimento e volume financeiro das suas consultas mensais.
              </p>

              {/* Mini bar chart exactly like the "One Soft ERP" $570.80 bar chart in reference image */}
              <div className="mt-auto flex items-end justify-between gap-1 h-12 px-2 bg-slate-50 border border-slate-100 rounded-2xl py-1.5">
                <div className="w-2.5 bg-violet-200 rounded-t-sm h-1/3" />
                <div className="w-2.5 bg-violet-300 rounded-t-sm h-1/2" />
                <div className="w-2.5 bg-violet-600 rounded-t-sm h-full" />
                <div className="w-2.5 bg-cyan-400 rounded-t-sm h-2/3" />
                <div className="flex flex-col text-[8px] text-violet-700 font-bold ml-1 leading-none">
                  <span>+{bookings.length * 15}%</span>
                  <span className="text-slate-400 font-normal">Sessões</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="relative z-10 max-w-5xl mx-auto rounded-3xl bg-slate-950/5 border border-slate-200/50 p-3 sm:p-5 shadow-2xl shadow-slate-300/55">
          <div className="absolute top-0 right-0 p-3 flex gap-1.5 z-20">
            <span className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>

          <div className="bg-white border border-slate-100/80 rounded-2xl shadow-sm overflow-hidden p-6 text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
              <div>
                <span className="text-xs font-semibold text-indigo-600">PREVIEW INTERATIVO</span>
                <h3 className="text-xl font-display font-medium text-slate-800">Painel Geral de Lucas Vasconcelos</h3>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={onEnterDashboard}
                  className="bg-slate-900 text-white rounded-lg px-4 py-2 text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-1"
                >
                  Abrir Dashboard Real <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Miniature Dashboard Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Stat card 1 */}
              <div className="bg-gradient-to-tr from-violet-500 to-indigo-600 p-4 rounded-xl text-white shadow-md">
                <div className="flex justify-between items-center opacity-85 mb-2 text-xs">
                  <span>Volume Financeiro</span>
                  <DollarSign className="w-3.5 h-3.5 text-indigo-200" />
                </div>
                <h4 className="text-2xl font-bold">{totalRevenue}{profile.currency}</h4>
                <p className="text-[10px] opacity-70 mt-1">Soma de todas as marcações</p>
              </div>

              {/* Stat card 2 */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center text-slate-400 mb-2 text-xs">
                  <span>Próximas Reservas</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <h4 className="text-2xl font-bold text-slate-800">{upcomingBookingsCount}</h4>
                <p className="text-[10px] text-slate-500 mt-1">Horários ativamente agendados</p>
              </div>

              {/* Stat card 3 */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center text-slate-400 mb-2 text-xs">
                  <span>Preço p/ Consulta</span>
                  <Clock className="w-3.5 h-3.5 text-violet-500" />
                </div>
                <h4 className="text-2xl font-bold text-slate-800">{profile.pricePerSession}{profile.currency}</h4>
                <p className="text-[10px] text-slate-500 mt-1">Definido para sessões de {profile.slotDuration}m</p>
              </div>

            </div>
          </div>
        </section>

        {/* Benefits Section as cards */}
        <section id="benefits" className="mt-28 mb-12 text-center">
          <span className="text-xs font-semibold text-violet-600 uppercase tracking-widest block mb-3">CONSTRUÍDO PARA FLUXO</span>
          <h2 className="text-3xl font-display font-semibold text-slate-900 mb-4">Porque é que profissionais premium escolhem timebook</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mb-14">Diz adeus às trocas infinitas de e-mails para acertar uma data. Foca-te no teu trabalho enquanto a tua agenda trabalha para ti.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="bg-violet-100 text-violet-700 w-10 h-10 rounded-xl shrink-0 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1.5">Regras de Disponibilidade</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Configura as tuas horas ativas de trabalho e o sistema garante que ninguém reserva fora disso.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-cyan-100 text-cyan-700 w-10 h-10 rounded-xl shrink-0 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1.5">Prevenção Contra Conflitos</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Sincronização imediata. Um horário agendado fica instantaneamente bloqueado para outros clientes.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-amber-150 text-amber-700 w-10 h-10 rounded-xl shrink-0 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1.5">Painel Multi-dispositivo</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Gere marcações no telemóvel ou no PC. Design totalmente fluído preparado para toque ou clique.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Elegant CTA Footer bar */}
      <footer className="border-t border-slate-100 mt-16 bg-white/40 mb-4">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-medium text-sm text-slate-700">timebook Booking © 2026</span>
          </div>
          <div className="flex gap-4 text-xs text-slate-400">
            <button onClick={onEnterDashboard} className="hover:text-violet-600 transition-colors">Acesso Profissional</button>
            <span>•</span>
            <button onClick={onEnterPublicBooking} className="hover:text-violet-600 transition-colors">Ver Página de Reservas</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
