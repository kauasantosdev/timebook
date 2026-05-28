import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CalendarClock, 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface AuthPageProps {
  onBack: () => void;
  onSuccess: (name?: string, email?: string) => void;
  initialMode?: 'login' | 'register';
  defaultEmail?: string;
}

export default function AuthPage({ onBack, onSuccess, initialMode = 'login', defaultEmail = '' }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated short delay for high quality UX feel
    setTimeout(() => {
      setLoading(false);
      setSuccessAnimation(true);
      
      setTimeout(() => {
        onSuccess(mode === 'register' ? fullName : undefined, email);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#fafaff] text-slate-900 overflow-hidden font-sans flex flex-col justify-between">
      
      {/* Background Gradient Blurs (matching Onesched brand design) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-400/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-cyan-300/15 blur-[120px] pointer-events-none" />

      {/* Mini Nav Section */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-white/60 backdrop-blur border border-slate-200/50 py-2 px-4 rounded-full transition-all hover:shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Início
        </button>
        
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-2 rounded-xl text-white shadow-sm">
            <CalendarClock className="w-4 h-4" />
          </div>
          <span className="font-display font-semibold text-base text-slate-800 tracking-tight">Onesched</span>
        </div>
      </header>

      {/* Auth Card Container */}
      <main className="relative z-10 max-w-md w-full mx-auto px-6 py-8 flex-1 flex items-center justify-center">
        
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl shadow-slate-200/30 w-full relative">
          
          {/* Success Overlay Animation */}
          {successAnimation && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl z-20 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm shadow-emerald-100">
                <CheckCircle2 className="w-8 h-8 animate-scaleUp" />
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-800">
                {mode === 'register' ? 'Conta Criada!' : 'Login Efetuado!'}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 max-w-[240px] leading-relaxed">
                A carregar as suas configurações exclusivas do painel SaaS...
              </p>
            </div>
          )}

          {/* Header Title with tabs toggle */}
          <div className="text-center mb-8">
          
            <h2 className="font-display font-semibold text-2xl text-slate-950 tracking-tight">
              {mode === 'login' ? 'Aceder ao seu Painel' : 'Criar a sua Conta'}
            </h2>
            <p className="text-xs text-slate-400 mt-1.5">
              {mode === 'login' 
                ? 'Insira as suas credenciais para gerir os seus agendamentos' 
                : 'Defina a sua agenda moderna e receba marcações em minutos'}
            </p>
          </div>

          {/* Form Action */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name Input for Register */}
            {mode === 'register' && (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Lucas Vasconcelos"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all placeholder:text-slate-400/80"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  required
                  placeholder="lucas@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all placeholder:text-slate-400/80"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Palavra-passe</label>
                {mode === 'login' && (
                  <button 
                    type="button" 
                    className="text-[10px] text-violet-600 hover:text-violet-700 font-semibold"
                    onClick={() => alert("Simulação de Recuperação: Um email fictício de redefinição foi solicitado.")}
                  >
                    Esqueceu-se?
                  </button>
                )}
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white transition-all placeholder:text-slate-400/80"
                />
                
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms and conditions / Remember me */}
            {mode === 'register' ? (
              <div className="flex items-start gap-2 pt-1">
                <input 
                  type="checkbox" 
                  id="terms"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 accent-violet-600"
                />
                <label htmlFor="terms" className="text-[10px] text-slate-400 leading-normal select-none">
                  Li e aceito os <span className="text-violet-600 font-bold cursor-pointer">Termos de Uso</span> e a <span className="text-violet-600 font-bold cursor-pointer">Política de Privacidade</span> da plataforma SaaS.
                </label>
              </div>
            ) : (
              <div className="flex items-center gap-2 pt-1 select-none">
                <input 
                  type="checkbox" 
                  id="remember"
                  className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 accent-violet-600"
                />
                <label htmlFor="remember" className="text-[10px] text-slate-400 font-medium">
                  Manter sessão iniciada neste dispositivo
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-xs py-3.5 rounded-xl shadow-lg shadow-violet-200/50 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : mode === 'login' ? (
                <>Entrar no Dashboard <ChevronRight className="w-3.5 h-3.5" /></>
              ) : (
                <>Criar a minha Agenda <ChevronRight className="w-3.5 h-3.5" /></>
              )}
            </button>

          </form>

          {/* Auth State Switcher Toggle */}
          <div className="mt-6 pt-5 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-500">
              {mode === 'login' ? 'Ainda não tem uma conta?' : 'Já possui uma conta registada?'}
              <button 
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-violet-600 hover:text-violet-700 font-bold ml-1 hover:underline focus:outline-none"
              >
                {mode === 'login' ? 'Registe-se Grátis' : 'Inicie Sessão'}
              </button>
            </p>
          </div>

        </div>

      </main>

      {/* Auth Footer */}
      <footer className="relative z-10 text-center py-6 text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Autenticação Certificada JWT Encriptada</span>
      </footer>

    </div>
  );
}
