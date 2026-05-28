import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Shield,
  Smartphone,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Booking, UserProfile } from '../types';
import logo from '@/assets/images/logo.webp';

interface LandingPageProps {
  onEnterAuth: (mode: 'login' | 'register', email?: string) => void;
  onEnterDashboard: () => void;
  onEnterPublicBooking: () => void;
  profile: UserProfile;
  bookings: Booking[];
}

/* ─── Static testimonial data ─────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Ana Martins',
    role: 'Psicóloga Clínica · Lisboa',
    avatar: 'https://i.pravatar.cc/48?u=ana_martins_tb',
    quote: '"Reduzi o tempo que passava a gerir marcações em 80%. O timebook é indispensável no meu consultório."',
    highlight: false,
  },
  {
    name: 'Miguel Ferreira',
    role: 'Personal Trainer · Porto',
    avatar: 'https://i.pravatar.cc/48?u=miguel_ferreira_tb',
    quote: '"Os meus clientes adoram a facilidade de agendar. Nunca mais tive um double-booking. Perfeito."',
    highlight: true,
  },
  {
    name: 'Sofia Costa',
    role: 'Designer Freelancer · Remote',
    avatar: 'https://i.pravatar.cc/48?u=sofia_costa_tb',
    quote: '"Interface simples, poderosa e bonita. Recomendo a qualquer freelancer que queira profissionalizar a sua agenda."',
    highlight: false,
  },
];

/* ─── Stats marquee items ─────────────────────────────── */
const STATS = [
  { value: '1.200+', label: 'profissionais activos', accent: true },
  { value: '50k+',   label: 'marcações processadas', accent: false },
  { value: '4.9★',   label: 'avaliação média',       accent: true },
  { value: '99.9%',  label: 'uptime garantido',      accent: false },
  { value: '3 cliques', label: 'para agendar',       accent: true },
];

/* ─── How it works steps ──────────────────────────────── */
const STEPS = [
  {
    num: '1',
    title: 'Cria a tua conta',
    desc: 'Regista-te em 30 segundos com o teu email profissional. Sem cartão de crédito.',
  },
  {
    num: '2',
    title: 'Define a tua agenda',
    desc: 'Configura os teus horários, preços e serviços. O sistema bloqueia automaticamente conflitos.',
  },
  {
    num: '3',
    title: 'Partilha o link público',
    desc: 'Os teus clientes agendam diretamente no teu link. Recebem confirmação automática.',
  },
];

/* ─── Benefits ────────────────────────────────────────── */
const BENEFITS = [
  {
    icon: <Clock className="w-5 h-5" />,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    title: 'Regras de Disponibilidade',
    desc: 'Configura as tuas horas ativas de trabalho e o sistema garante que ninguém reserva fora disso.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    title: 'Prevenção Contra Conflitos',
    desc: 'Sincronização imediata. Um horário agendado fica instantaneamente bloqueado para outros clientes.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Painel Multi-dispositivo',
    desc: 'Gere marcações no telemóvel ou no PC. Design totalmente fluído preparado para toque ou clique.',
  },
];

export default function LandingPage({
  onEnterDashboard,
  onEnterPublicBooking,
  onEnterAuth,
  profile,
  bookings,
}: LandingPageProps) {
  const [emailInput, setEmailInput] = useState('');
  const [demoRequested, setDemoRequested] = useState(false);

  const upcomingBookingsCount = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = bookings.reduce((acc, curr) => acc + curr.price, 0);

  const handleSubmitDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setDemoRequested(true);
    setTimeout(() => onEnterDashboard(), 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#f6f5ff] text-slate-900 overflow-hidden font-sans">

      {/* ── Background auras ──────────────────────────────── */}
      <div className="animate-glow-1 pointer-events-none absolute -top-32 -left-20 w-[640px] h-[640px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }} />
      <div className="animate-glow-2 pointer-events-none absolute top-72 -right-24 w-[540px] h-[540px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.13) 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute -bottom-20 left-1/4 w-[700px] h-[500px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)' }} />

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="timebook"  className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain" />
        </div>

        {/* Centre pill nav */}
        <div className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md px-5 py-2 rounded-full border border-slate-200/60 shadow-sm">
          <a href="#features" className="text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors px-3 py-1 rounded-full hover:bg-violet-50">Produtos</a>
          <a href="#benefits" className="text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors px-3 py-1 rounded-full hover:bg-violet-50">Funcionalidades</a>
          <span className="w-px h-4 bg-slate-200 mx-1" />
          <button
            onClick={onEnterPublicBooking}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors px-3 py-1 rounded-full hover:bg-indigo-50"
          >
            <Smartphone className="w-3.5 h-3.5" /> Ver Booking Público
          </button>
        </div>

        {/* Auth CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEnterAuth('login')}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-violet-600 transition-all rounded-xl hover:bg-white/60"
          >
            Entrar
          </button>
          <button
            onClick={() => onEnterAuth('register')}
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl shadow-lg shadow-violet-200 transition-all hover:scale-[1.02] hover:shadow-violet-300"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}
          >
            Começar Agora
          </button>
        </div>
      </nav>

      {/* ── HERO — Split layout ────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 px-4 py-1.5 rounded-full text-xs font-bold text-violet-700 mb-6 uppercase tracking-wider shadow-sm"
          >
            <span className="relative flex w-2 h-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-violet-600" />
            </span>
            Nova Geração de Agendamentos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="font-display font-bold text-5xl sm:text-6xl tracking-[-2px] leading-[1.06] text-slate-900 mb-5"
          >
            Impulsiona as tuas<br />
            Reservas com<br />
            <span className="italic" style={{ color: '#7c3aed' }}>Menos Esforço</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="text-lg text-slate-500 leading-relaxed max-w-md mb-9"
          >
            Aumenta a eficiência dos teus agendamentos com um calendário rápido e simples. Ideal para quem trabalha com marcações todos os dias.
          </motion.p>

          {/* Email form */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="max-w-lg mb-7"
          >
            {demoRequested ? (
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-full flex items-center justify-center gap-2.5 text-emerald-800 text-sm font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Simulação Pronta! A carregar o teu painel...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitDemo}
                    className="flex items-center gap-2 bg-white rounded-full border border-slate-200/80 shadow-xl shadow-slate-200/50 pl-5 pr-1.5 py-1.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  placeholder="Introduz o teu email profissional"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  required
                  className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none py-2"
                />
                <button
                  type="submit"
                  className="shrink-0 text-white font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}
                >
                  Criar Agenda
                </button>
              </form>
            )}
          </motion.div>

          {/* Social proof row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-3"
          >
            <div className="flex">
              {['sofia','miguel','ana','pedro'].map((u, i) => (
                <img
                  key={u}
                  src={`https://i.pravatar.cc/28?u=${u}_hero`}
                  loading="lazy"
                  decoding="async"
                  alt={u}
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  style={{ marginLeft: i === 0 ? 0 : '-6px' }}
                />
              ))}
              <div
                className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
                style={{ marginLeft: '-6px', background: '#7c3aed' }}
              >+</div>
            </div>
            <div>
              <div className="flex gap-px text-amber-400 text-xs leading-none mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-500">
                <strong className="text-slate-800">1.200+</strong> profissionais já usam o timebook
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: floating dashboard widgets */}
        <div className="relative h-[440px] hidden lg:block">

          {/* Main dashboard card */}
          <motion.div
            className="animate-float-3 absolute inset-x-0 top-0 bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-200/60 p-6 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] font-bold text-indigo-600 tracking-widest uppercase mb-1">PREVIEW INTERATIVO</p>
                <h3 className="font-display font-semibold text-base text-slate-800">Painel de Lucas Vasconcelos</h3>
              </div>
              <button
                onClick={onEnterDashboard}
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all"
              >
                Abrir Real <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* Revenue */}
              <div className="rounded-xl p-4 text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                <div className="flex justify-between items-center text-[10px] opacity-80 mb-2">
                  <span>Volume Financeiro</span>
                  <DollarSign className="w-3 h-3" />
                </div>
                <div className="font-display text-2xl font-bold">{totalRevenue}{profile.currency}</div>
                <p className="text-[9px] opacity-60 mt-1">Soma de todas as marcações</p>
              </div>
              {/* Bookings */}
              <div className="rounded-xl p-4 bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2">
                  <span>Próx. Reservas</span>
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                </div>
                <div className="font-display text-2xl font-bold text-slate-800">{upcomingBookingsCount}</div>
                <p className="text-[9px] text-slate-400 mt-1">Horários agendados</p>
              </div>
              {/* Price */}
              <div className="rounded-xl p-4 bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2">
                  <span>Preço/Consulta</span>
                  <Clock className="w-3 h-3 text-violet-500" />
                </div>
                <div className="font-display text-2xl font-bold text-slate-800">{profile.pricePerSession}{profile.currency}</div>
                <p className="text-[9px] text-slate-400 mt-1">Sessões de {profile.slotDuration}m</p>
              </div>
            </div>
          </motion.div>

          {/* Floating notification */}
          <motion.div
            className="animate-float-1 absolute bottom-24 -left-6 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 px-4 py-3 flex items-center gap-3 z-20 min-w-[200px]"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800">Nova Reserva Confirmada</p>
              <p className="text-[10px] text-slate-400">Beatriz Costa · Hoje às 14:30</p>
            </div>
          </motion.div>

          {/* Growth badge */}
          <motion.div
            className="animate-float-2 absolute bottom-20 -right-4 rounded-2xl px-5 py-4 text-white text-center z-20 shadow-xl"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', boxShadow: '0 12px 32px rgba(124,58,237,0.35)' }}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.6 }}
          >
            <div className="font-display text-2xl font-extrabold leading-none">+90%</div>
            <div className="text-[10px] opacity-80 mt-1">Crescimento</div>
            <div className="text-[10px] opacity-60">de Sessões</div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE STATS BAR ──────────────────────────────── */}
      <div className="relative z-10 bg-white border-y border-slate-100 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...STATS, ...STATS].map((s, i) => (
            <div key={i} className="flex items-center gap-10 px-8 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className={`text-lg font-bold font-display ${s.accent ? 'text-violet-600' : 'text-slate-900'}`}>{s.value}</span>
                <span className="text-sm text-slate-400 font-medium">{s.label}</span>
              </div>
              <span className="text-slate-200 text-lg">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-violet-600 uppercase tracking-[1.5px] block mb-3">TUDO O QUE PRECISAS</span>
          <h2 className="font-display text-4xl font-bold tracking-[-1.5px] text-slate-900 mb-4">
            Ferramentas pensadas para<br />o profissional moderno
          </h2>
          <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
            Cada feature foi desenhada para eliminar atrito e deixar-te focar no que importa: o teu trabalho.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Card 1 — Calendar */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-lg shadow-slate-100/60 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 rounded-bl-full"
                 style={{ background: 'radial-gradient(circle at top right, rgba(99,102,241,0.07), transparent 65%)' }} />
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 text-indigo-600"
                 style={{ background: 'linear-gradient(135deg, #eef2ff, #c7d2fe)' }}>
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-base text-slate-800 mb-2">timebook Calendário</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Gestão fluida sem colisões de horário para freelancers e estúdios.
            </p>
            <div className="mt-auto bg-slate-50 border border-slate-100 p-3 rounded-2xl">
              <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2 font-mono">
                <span>Maio 2026</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  <span className="text-violet-600 font-semibold">Ativo</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                <div className="py-1 text-center text-[10px] bg-slate-100 text-slate-600 rounded-lg font-medium">25</div>
                <div className="py-1 text-center text-[10px] bg-slate-100 text-slate-600 rounded-lg font-medium">26</div>
                <div className="py-1 text-center text-[10px] text-white font-bold rounded-lg shadow-sm"
                     style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>27</div>
                <div className="py-1 text-center text-[10px] text-indigo-600 font-semibold rounded-lg border border-indigo-100"
                     style={{ background: '#eef2ff' }}>28</div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — CRM */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-lg shadow-slate-100/60 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 rounded-bl-full"
                 style={{ background: 'radial-gradient(circle at top right, rgba(16,185,129,0.07), transparent 65%)' }} />
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 text-emerald-600"
                 style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-base text-slate-800 mb-2">CRM de Clientes</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Histórico de reservas, notas em cada sessão e dados de contacto centralizados.
            </p>
            <div className="mt-auto flex flex-col gap-2">
              {[
                { initials: 'AM', color: 'from-indigo-600 to-violet-600', name: 'Ana Martins', sub: '✓ Sessão Confirmada', subColor: 'text-emerald-500' },
                { initials: 'BC', color: 'from-fuchsia-600 to-purple-600', name: 'Beatriz Costa', sub: 'Hoje às 09:30', subColor: 'text-slate-400' },
              ].map(c => (
                <div key={c.initials} className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.color} text-[10px] font-bold text-white flex items-center justify-center shrink-0`}>{c.initials}</div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-slate-700 truncate">{c.name}</p>
                    <p className={`text-[10px] ${c.subColor}`}>{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3 — Public link */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-lg shadow-slate-100/60 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 rounded-bl-full"
                 style={{ background: 'radial-gradient(circle at top right, rgba(14,165,233,0.07), transparent 65%)' }} />
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 text-sky-600"
                 style={{ background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)' }}>
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-base text-slate-800 mb-2">Marcação Fluida</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Link público personalizado. Os seus clientes agendam em qualquer ecrã com 3 cliques.
            </p>
            <div className="mt-auto bg-violet-50 border border-violet-100 p-3 rounded-xl flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-violet-700 truncate">timebook.com/{profile.username}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-violet-600 text-white px-2.5 py-0.5 rounded-full shrink-0">Ativo</span>
            </div>
          </motion.div>

          {/* Card 4 — Stats */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-lg shadow-slate-100/60 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 rounded-bl-full"
                 style={{ background: 'radial-gradient(circle at top right, rgba(245,158,11,0.07), transparent 65%)' }} />
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 text-amber-600"
                 style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}>
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-base text-slate-800 mb-2">Estatísticas SaaS</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Acompanhe o crescimento e volume financeiro das suas consultas mensais.
            </p>
            <div className="mt-auto flex items-end justify-between h-12 gap-1 px-3 bg-slate-50 border border-slate-100 rounded-2xl py-2">
              <div className="w-3 bg-violet-200 rounded-t-sm" style={{ height: '30%' }} />
              <div className="w-3 bg-violet-300 rounded-t-sm" style={{ height: '50%' }} />
              <div className="w-3 bg-violet-600 rounded-t-sm" style={{ height: '95%' }} />
              <div className="w-3 bg-cyan-400 rounded-t-sm" style={{ height: '65%' }} />
              <div className="flex flex-col items-end ml-1 leading-none">
                <span className="text-[11px] font-bold text-violet-600">+{bookings.length * 15}%</span>
                <span className="text-[9px] text-slate-400">Sessões</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-3xl overflow-hidden relative px-10 py-16"
             style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)' }}>
          {/* Decorative orbs */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full"
               style={{ background: 'rgba(139,92,246,0.2)' }} />
          <div className="pointer-events-none absolute -bottom-12 -left-12 w-56 h-56 rounded-full"
               style={{ background: 'rgba(99,102,241,0.15)' }} />

          <div className="relative z-10 text-center mb-12">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-[1.5px] block mb-3">COMO FUNCIONA</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-1.5px] text-white mb-4">
              Em 3 passos simples,<br />a tua agenda está pronta
            </h2>
            <p className="text-indigo-200 text-sm max-w-sm mx-auto leading-relaxed">
              Sem instalações. Sem complicações. Começa a receber marcações no mesmo dia.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-11 left-[calc(16.66%+24px)] w-[calc(66.66%-48px)] h-px"
                 style={{ background: 'linear-gradient(90deg, rgba(165,180,252,0.25), rgba(165,180,252,0.5), rgba(165,180,252,0.25))' }} />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-2xl p-7 text-center backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center font-display text-xl font-bold text-white"
                     style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)', boxShadow: '0 8px 24px rgba(124,58,237,0.4)' }}>
                  {step.num}
                </div>
                <h4 className="font-display font-semibold text-base text-white mb-2">{step.title}</h4>
                <p className="text-indigo-200 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS + TESTIMONIALS ───────────────────────── */}
      <section id="benefits" className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: benefits */}
          <div>
            <span className="text-[11px] font-bold text-violet-600 uppercase tracking-[1.5px] block mb-3">CONSTRUÍDO PARA FLUXO</span>
            <h2 className="font-display text-4xl font-bold tracking-[-1.5px] text-slate-900 mb-5 leading-[1.1]">
              Porque é que profissionais<br />premium escolhem timebook
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-md">
              Diz adeus às trocas infinitas de e-mails para acertar uma data. Foca-te no teu trabalho enquanto a tua agenda trabalha para ti.
            </p>

            <div className="flex flex-col gap-7">
              {BENEFITS.map(b => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="flex gap-4 items-start"
                >
                  <div className={`w-10 h-10 ${b.iconBg} ${b.iconColor} rounded-xl flex items-center justify-center shrink-0`}>
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm mb-1.5">{b.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: testimonials */}
          <div className="flex flex-col gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-2xl p-6"
                style={t.highlight
                  ? { background: 'linear-gradient(135deg, #7c3aed, #6366f1)', boxShadow: '0 8px 32px rgba(124,58,237,0.25)' }
                  : { background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.avatar} loading="lazy" decoding="async" alt={t.name}
                       className="w-11 h-11 rounded-full object-cover"
                       style={t.highlight ? { border: '2px solid rgba(255,255,255,0.3)' } : {}} />
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${t.highlight ? 'text-white' : 'text-slate-800'}`}>{t.name}</p>
                    <p className={`text-xs ${t.highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{t.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 h-3 fill-current ${t.highlight ? 'text-yellow-200' : 'text-amber-400'}`} />
                    ))}
                  </div>
                </div>
                <p className={`text-sm leading-relaxed italic ${t.highlight ? 'text-white/90' : 'text-slate-600'}`}>{t.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl p-16 text-center border border-violet-200"
             style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)' }}>
          <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full"
               style={{ background: 'rgba(124,58,237,0.1)' }} />
          <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full"
               style={{ background: 'rgba(99,102,241,0.1)' }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white border border-violet-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 bg-violet-600 rounded-full" />
              <span className="text-xs font-semibold text-violet-700">Começa grátis hoje</span>
            </div>

            <h2 className="font-display text-5xl font-bold tracking-[-2px] text-slate-900 mb-5">
              Pronto para transformar<br />a tua agenda?
            </h2>
            <p className="text-base text-violet-800/70 max-w-md mx-auto mb-10 leading-relaxed">
              Junta-te a mais de 1.200 profissionais que já automatizaram as suas marcações com o timebook.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={() => onEnterAuth('register')}
                className="flex items-center gap-2 text-white font-bold text-base px-9 py-4 rounded-2xl transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)', boxShadow: '0 8px 28px rgba(124,58,237,0.35)' }}
              >
                Criar Agenda Grátis <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onEnterDashboard}
                className="font-semibold text-base text-violet-700 bg-white px-8 py-4 rounded-2xl border border-violet-200 hover:border-violet-400 transition-all"
              >
                Ver Demo ao Vivo
              </button>
            </div>
            <p className="text-xs text-violet-600/60 mt-5">Sem cartão de crédito · Cancela quando quiseres</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 pb-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="timebook" className="h-7 w-auto" />
          </div>
          <div className="hidden sm:flex items-center gap-7">
            {['Produtos', 'Funcionalidades', 'Preços', 'Blog', 'Suporte'].map(link => (
              <a key={link} href="#" className="text-sm text-slate-500 hover:text-violet-600 font-medium transition-colors">{link}</a>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400 font-medium">timebook Booking © 2026 · Todos os direitos reservados</span>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <button onClick={onEnterDashboard} className="hover:text-violet-600 transition-colors">Acesso Profissional</button>
            <span className="text-slate-200">•</span>
            <button onClick={onEnterPublicBooking} className="hover:text-violet-600 transition-colors">Ver Página de Reservas</button>
            <span className="text-slate-200">•</span>
            <a href="#" className="hover:text-violet-600 transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
