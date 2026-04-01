/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  MapPin, 
  User, 
  ShieldCheck, 
  Zap,
  Tv,
  Globe,
  PhoneCall,
  X,
  ChevronRight,
  Clock,
  Gift,
  Star,
  Activity,
  Lock,
  MousePointer2
} from 'lucide-react';
import { PLANS } from './constants';
import { Plan, UserData } from './types';

const INITIAL_USER_DATA: UserData = {
  street: '',
  neighborhood: '',
  number: '',
  zipCode: '',
  city: '',
  fullName: '',
  birthDate: '',
  cpf: '',
  motherName: '',
};

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<UserData>(INITIAL_USER_DATA);
  const [step, setStep] = useState(1);
  const [consultApproval, setConsultApproval] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsFormOpen(true);
    setStep(1);
    setConsultApproval(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (consultApproval === true) {
        setStep(2);
      } else if (consultApproval === false) {
        sendToWhatsApp(false);
      }
      return;
    }
    
    if (step === 2) {
      sendToWhatsApp(true);
    }
  };

  const sendToWhatsApp = (withPersonalData: boolean) => {
    // Construct WhatsApp Message
    let message = `*Nova Solicitação de Instalação - Quero Uma Internet*%0A%0A` +
      `*Plano:* ${selectedPlan?.name} (${selectedPlan?.speed})%0A` +
      `*Operadora:* ${selectedPlan?.operator.toUpperCase()}%0A` +
      `*Valor:* R$ ${selectedPlan?.price.toFixed(2).replace('.', ',')}%0A%0A` +
      `*ENDEREÇO DE INSTALAÇÃO*%0A` +
      `*Rua:* ${formData.street}, ${formData.number}%0A` +
      `*Bairro:* ${formData.neighborhood}%0A` +
      `*CEP:* ${formData.zipCode || 'Não informado'}%0A` +
      `*Cidade:* ${formData.city}`;

    if (withPersonalData) {
      message += `%0A%0A*DADOS PARA APROVAÇÃO*%0A` +
        `*Nome:* ${formData.fullName}%0A` +
        `*CPF:* ${formData.cpf}%0A` +
        `*Nascimento:* ${formData.birthDate}%0A` +
        `*Nome da Mãe:* ${formData.motherName}`;
    } else {
      message += `%0A%0A*O cliente optou por não consultar aprovação agora.*`;
    }

    const whatsappUrl = `https://wa.me/5521969238487?text=${message}`;
    
    setIsSubmitted(true);
    
    // Open WhatsApp after a short delay to show success state
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsFormOpen(false);
      setIsSubmitted(false);
      setFormData(INITIAL_USER_DATA);
      setSelectedPlan(null);
      setConsultApproval(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Premium Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight uppercase italic">
              Quero Uma <span className="text-blue-600">Internet</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
            <a href="#planos" className="hover:text-blue-500 transition-colors">Planos</a>
            <a href="#beneficios" className="hover:text-blue-500 transition-colors">Benefícios</a>
            <a href="#cobertura" className="hover:text-blue-500 transition-colors">Cobertura</a>
          </div>

          <a href="#planos" className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all rounded-full shadow-xl">
            Consultar Agora
          </a>
        </div>
      </nav>

      {/* Global Abstract Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-green-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-red-500/20 rounded-full blur-[100px] animate-pulse delay-1500" />
      </div>

      {/* Impactful Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10" />
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 2.5 }}
            src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1600" 
            alt="Abstract Colorful Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Animated Glows */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-600/10 border border-blue-600/20 rounded-full mb-10">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Fibra Ótica de Alta Performance</span>
              </div>
              
              <div className="relative text-white text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-12 max-w-2xl uppercase italic">
                <span className="relative z-10">Economize agora!</span>
                <div className="absolute -top-10 -left-10 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl -z-10 animate-pulse" />
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600">Comparamos as ofertas mais baratas</span> das melhores operadoras para você ter fibra ótica real sem pagar caro. <br />
                <span className="text-white/40 text-2xl md:text-3xl not-italic font-light">Planos a partir de <span className="text-white font-bold">R$ 99,90</span>.</span>
              </div>

              <div className="flex flex-wrap gap-8 items-center">
                <a href="#planos" className="px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] transition-all flex items-center gap-4 group shadow-[0_20px_50px_rgba(37,99,235,0.4)] rounded-2xl">
                  Ver Planos
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </a>
                
                <div className="flex flex-col gap-2">
                  <div className="flex -space-x-3">
                    {[1,2,3,4,5].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-12 h-12 rounded-full border-4 border-[#020202]" alt="User" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">+15.000 instalações realizadas</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* Floating Dashboard Card */}
              <div className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[50px] shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-12">
                    <div className="flex gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-red-500/50" />
                      <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/50" />
                      <div className="w-3.5 h-3.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[8px] font-mono text-green-400 uppercase tracking-widest">Live: 1.2 Gbps</span>
                    </div>
                  </div>
                  
                  <div className="space-y-10">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Velocidade de Pico</p>
                          <h4 className="text-4xl font-display font-bold italic">982.4 <span className="text-xl text-blue-500">Mbps</span></h4>
                        </div>
                        <Activity className="w-8 h-8 text-blue-500 opacity-50" />
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "98%" }}
                          transition={{ duration: 2.5, delay: 1 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(37,99,235,0.5)]" 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Latência</p>
                        <p className="text-3xl font-display font-bold text-green-400 italic">2ms</p>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Estabilidade</p>
                        <p className="text-3xl font-display font-bold text-blue-400 italic">99.9%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 z-20 bg-blue-600 text-white p-8 rounded-3xl shadow-2xl border border-white/20"
              >
                <Zap className="w-8 h-8 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">Ultra</p>
                <p className="text-3xl font-display font-bold tracking-tighter italic leading-none">FIBRA 100%</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 z-20 bg-white text-black p-8 rounded-3xl shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Gift className="w-6 h-6 text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Bônus Exclusivo</span>
                </div>
                <p className="text-2xl font-display font-bold tracking-tighter italic leading-none">7 DIAS DE TESTE</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Bento Grid Benefits Section */}
      <section id="beneficios" className="py-40 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">Diferenciais Premium</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase italic mb-8">
              O Padrão <span className="text-blue-600">Quero Uma Internet.</span>
            </h2>
            <p className="text-white/40 text-xl font-light">
              Elevamos o nível da sua conexão com benefícios que as outras operadoras não oferecem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Main Benefit */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-blue-600 to-blue-900 rounded-[40px] p-12 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
            >
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-10 shadow-xl">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-display font-bold uppercase tracking-tight mb-6 italic leading-none">Equipamentos <br /> de Última Geração</h3>
                <p className="text-white/70 text-lg max-w-xs leading-relaxed">
                  Modem Wi-Fi 6 Mesh incluso em todos os planos. Cobertura total e velocidade máxima em cada cômodo.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-4 mt-12">
                <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Custo Zero</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Tecnologia 2026</span>
              </div>
              {/* Decorative Glow */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[80px]" />
            </motion.div>

            {/* Billing Benefit */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-3 bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-between hover:bg-white/[0.08] transition-all group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 italic">Pague em 30 Dias</h3>
                  <p className="text-white/40 text-sm max-w-xs">
                    Instale hoje e comece a pagar somente após 30 dias de uso. Sem taxas de adesão.
                  </p>
                </div>
                <Clock className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-widest mt-8">
                <CheckCircle2 className="w-4 h-4" />
                Transparência Total
              </div>
            </motion.div>

            {/* Trial Benefit */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-between hover:bg-white/[0.08] transition-all group"
            >
              <Activity className="w-10 h-10 text-purple-500 mb-6" />
              <div>
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-2 italic">7 Dias de Teste</h3>
                <p className="text-white/40 text-xs">Degustação sem compromisso.</p>
              </div>
            </motion.div>

            {/* Installation Benefit */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-1 bg-blue-600/10 border border-blue-600/20 rounded-[40px] p-10 flex flex-col items-center justify-center text-center hover:bg-blue-600/20 transition-all group"
            >
              <Zap className="w-10 h-10 text-blue-500 mb-4 animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Instalação</span>
              <span className="text-3xl font-display font-bold italic">GRÁTIS</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Plans Grid */}
      <section id="planos" className="py-40 bg-white text-black rounded-[80px] md:rounded-[120px] shadow-[0_-50px_100px_rgba(0,0,0,0.2)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-black text-[10px] tracking-[0.5em] uppercase mb-6 block">Seleção de Elite</span>
              <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter uppercase italic leading-[0.85] mb-8">
                As Melhores <br />
                <span className="text-blue-600">Operadoras.</span>
              </h2>
              <p className="text-black/50 text-xl font-light">
                Planos exclusivos com condições que você só encontra aqui.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                Preços Garantidos 2026
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PLANS.sort((a, b) => a.price - b.price).map((plan, index) => {
              const isCheapest = plan.price <= 100;
              return (
                <motion.div 
                  key={plan.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={`group relative bg-white rounded-[50px] p-12 border transition-all duration-700 flex flex-col ${
                    plan.id === 'giga-1000' 
                      ? 'border-blue-600 ring-4 ring-blue-600/10 shadow-[0_40px_100px_rgba(37,99,235,0.2)]' 
                      : isCheapest
                        ? 'border-green-500/30 shadow-[0_20px_60px_rgba(34,197,94,0.1)]'
                        : 'border-black/5 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)]'
                  }`}
                >
                  {plan.id === 'giga-1000' && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl z-10">
                      Recomendado Giga+
                    </div>
                  )}
                  {isCheapest && plan.id !== 'giga-1000' && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl z-10">
                      Melhor Preço
                    </div>
                  )}
                  {/* Operator Logo Area */}
                <div className="h-32 flex items-center justify-center mb-12 p-8 bg-[#f8f8f8] rounded-[40px] border border-black/5 group-hover:bg-white transition-all duration-500 shadow-sm group-hover:shadow-md">
                  <img 
                    src={plan.logoUrl} 
                    alt={plan.operator} 
                    className="max-w-full max-h-full object-contain transition-all duration-700 scale-100 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h3 className="text-3xl font-display font-bold tracking-tight uppercase italic mb-2 leading-none">{plan.name}</h3>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/10 rounded-full text-blue-600 font-black text-sm italic">
                        <Zap className="w-4 h-4 fill-blue-600" />
                        {plan.speed}
                      </div>
                    </div>
                  </div>

                  <div className="mb-12">
                    <span className="text-[10px] text-black/30 uppercase font-black tracking-widest block mb-2">Assinatura Mensal</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black">R$</span>
                      <span className="text-6xl font-display font-bold tracking-tighter">{plan.price.toFixed(2).split('.')[0]}</span>
                      <span className="text-xl font-black">,{plan.price.toFixed(2).split('.')[1]}</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-black/5 mb-10" />

                  <ul className="space-y-5 mb-12">
                    {plan.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm font-bold text-black/60">
                        <div className="w-5 h-5 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        </div>
                        {adv}
                      </li>
                    ))}
                    {plan.hasTvBox && (
                      <li className="flex items-center gap-4 p-4 bg-blue-600/5 rounded-2xl border border-blue-600/10 text-blue-600 font-black text-xs uppercase italic">
                        <Tv className="w-5 h-5 shrink-0" />
                        Inclui TV Box 4K Premium
                      </li>
                    )}
                  </ul>
                </div>

                <button 
                  onClick={() => handlePlanSelect(plan)}
                  className="w-full py-6 bg-black text-white font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-4 rounded-[24px] group/btn shadow-xl"
                >
                  Contratar Agora
                  <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

      {/* Trust Section */}
      <section className="py-40 bg-[#020202] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-[80px] p-16 md:p-24 relative overflow-hidden shadow-[0_50px_100px_rgba(37,99,235,0.3)]">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase italic mb-10 leading-[0.9]">
                  A Melhor <br />
                  <span className="text-white/60">Conexão</span> <br />
                  Do Brasil.
                </h2>
                <p className="text-white/80 text-xl mb-12 max-w-md font-light leading-relaxed">
                  Não perca tempo com conexões instáveis. Junte-se a milhares de clientes que escolheram a Quero Uma Internet.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20">
                    <ShieldCheck className="w-6 h-6 text-white" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Segurança Bancária</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20">
                    <Activity className="w-6 h-6 text-white" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Monitoramento 24h</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-3xl border border-white/20 p-12 rounded-[40px] shadow-2xl relative z-10"
                >
                  <p className="text-lg text-white/70 leading-relaxed italic mb-10">
                    "A velocidade é impressionante e o atendimento foi nota 10. Em menos de 24h a equipe da Giga+ estava na minha porta fazendo a instalação."
                  </p>
                  <div className="flex items-center gap-4">
                    <img src="https://i.pravatar.cc/100?img=12" className="w-14 h-14 rounded-2xl border-2 border-white/20" alt="User" loading="lazy" />
                    <div>
                      <p className="text-lg font-bold">Marcos Oliveira</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-40">Cliente Premium desde 2025</p>
                    </div>
                  </div>
                </motion.div>
                {/* Decorative Glows */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/40 rounded-full blur-[80px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-display font-bold tracking-tight uppercase italic">
                Quero Uma <span className="text-blue-600">Internet</span>
              </span>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
              <a href="#" className="hover:text-blue-500 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Cookies</a>
            </div>
          </div>
          <div className="h-px w-full bg-white/5 mb-12" />
          <div className="text-center text-white/10 text-[10px] font-mono uppercase tracking-[0.5em]">
            © 2026 Quero Uma Internet • Tecnologia e Conexão • Brasil
          </div>
        </div>
      </footer>

      {/* Premium Modal Form */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)]"
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-50"
              >
                <X className="w-8 h-8" />
              </button>

              {isSubmitted ? (
                <div className="p-20 text-center space-y-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </motion.div>
                  <h3 className="text-4xl font-black uppercase tracking-tight italic">Solicitação Recebida!</h3>
                  <p className="text-white/60 text-lg max-w-md mx-auto">Um especialista em fibra da {selectedPlan?.operator.toUpperCase()} entrará em contato em instantes para agendar sua instalação gratuita.</p>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row min-h-[600px]">
                  {/* Sidebar Info */}
                  <div className="w-full lg:w-[350px] bg-blue-600 p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 p-3 shadow-xl">
                          <img src={selectedPlan?.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Plano Selecionado</span>
                        <h4 className="text-3xl font-black tracking-tighter uppercase italic mt-2 leading-none">{selectedPlan?.name}</h4>
                        <p className="text-xl font-black italic mt-2">{selectedPlan?.speed}</p>
                        
                        <div className="mt-12 space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                              <Gift className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Instalação Grátis</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                              <Clock className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Pague em 30 Dias</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                              <Activity className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">7 Dias de Teste</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-12">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block mb-1">Mensalidade</span>
                        <div className="text-4xl font-black tracking-tighter italic">
                          R$ {selectedPlan?.price.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    </div>
                    {/* Decorative Pattern */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:20px_20px]" />
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="flex-1 p-10 lg:p-16">
                    <div className="mb-12">
                      <div className="flex gap-3 mb-6">
                        <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-600' : 'bg-white/10'}`} />
                        <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-white/10'}`} />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tight italic flex items-center gap-3">
                        {step === 1 ? <MapPin className="w-6 h-6 text-blue-600" /> : <User className="w-6 h-6 text-blue-600" />}
                        {step === 1 ? 'Onde será a instalação?' : 'Dados do Titular'}
                      </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {step === 1 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Endereço Completo</label>
                            <input 
                              required
                              name="street"
                              value={formData.street}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-blue-600 outline-none transition-all rounded-xl"
                              placeholder="Rua, Avenida, Praça..."
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Número</label>
                            <input 
                              required
                              name="number"
                              value={formData.number}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-blue-600 outline-none transition-all rounded-xl"
                              placeholder="123"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Bairro</label>
                            <input 
                              required
                              name="neighborhood"
                              value={formData.neighborhood}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-blue-600 outline-none transition-all rounded-xl"
                              placeholder="Seu bairro"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">CEP (Opcional)</label>
                            <input 
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-blue-600 outline-none transition-all rounded-xl"
                              placeholder="00000-000"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Cidade</label>
                            <input 
                              required
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-blue-600 outline-none transition-all rounded-xl"
                              placeholder="Sua cidade"
                            />
                          </div>

                          <div className="md:col-span-2 pt-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 block">Deseja consultar aprovação agora?</label>
                            <div className="grid grid-cols-2 gap-4">
                              <button
                                type="button"
                                onClick={() => setConsultApproval(true)}
                                className={`py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                                  consultApproval === true 
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
                                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                                }`}
                              >
                                Sim, consultar
                              </button>
                              <button
                                type="button"
                                onClick={() => setConsultApproval(false)}
                                className={`py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                                  consultApproval === false 
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
                                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                                }`}
                              >
                                Não, apenas endereço
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Nome Completo</label>
                            <input 
                              required
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-blue-600 outline-none transition-all rounded-xl"
                              placeholder="Como no RG/CPF"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">CPF</label>
                            <input 
                              required
                              name="cpf"
                              value={formData.cpf}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-blue-600 outline-none transition-all rounded-xl"
                              placeholder="000.000.000-00"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Nascimento</label>
                            <input 
                              required
                              type="date"
                              name="birthDate"
                              value={formData.birthDate}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-blue-600 outline-none transition-all rounded-xl"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Nome da Mãe</label>
                            <input 
                              required
                              name="motherName"
                              value={formData.motherName}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-blue-600 outline-none transition-all rounded-xl"
                              placeholder="Nome completo da mãe"
                            />
                          </div>
                        </div>
                      )}

                      <div className="pt-6 flex flex-col gap-4">
                        <button 
                          type="submit"
                          disabled={step === 1 && consultApproval === null}
                          className={`w-full py-5 text-white font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] ${
                            step === 1 && consultApproval === null 
                              ? 'bg-white/10 cursor-not-allowed opacity-50' 
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {step === 1 
                            ? (consultApproval === false ? 'Finalizar e Enviar' : 'Próximo Passo') 
                            : 'Finalizar e Consultar'}
                          <ArrowRight className="w-6 h-6" />
                        </button>

                        {step === 2 && (
                          <button
                            type="button"
                            onClick={() => {
                              setStep(1);
                              setConsultApproval(null);
                            }}
                            className="w-full py-4 bg-white/5 border border-white/10 text-white/60 font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-3 rounded-2xl"
                          >
                            <ArrowLeft className="w-5 h-5" />
                            Voltar
                          </button>
                        )}

                        <p className="text-[10px] text-center text-white/30 uppercase tracking-widest font-bold">
                          {step === 1 && consultApproval === null 
                            ? 'Selecione se deseja consultar aprovação para continuar' 
                            : 'Ao clicar, você concorda com nossa política de privacidade.'}
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
