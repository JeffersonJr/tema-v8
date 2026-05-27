import { getTenantBySlug } from '@/data/tenants'
import { createFileRoute , useParams } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { 
  Building, 
  Home, 
  Layers, 
  Briefcase, 
  MapPin, 
  Maximize2, 
  BedDouble, 
  Bath, 
  Car, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react'

export const Route = createFileRoute('/$tenant/avaliar')({
  component: AvaliarPage,
})

type Step = 1 | 2 | 3 | 4 | 5

function AvaliarPage() {

  const { tenant: tenantSlug } = useParams({ strict: false })
  const tenant = getTenantBySlug(tenantSlug || '')
  if (!tenant) return null

  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [cepLoading, setCepLoading] = useState(false)
  const [valuationResult, setValuationResult] = useState<{ min: number; max: number } | null>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    propertyType: 'casa' as 'casa' | 'apartamento' | 'cobertura' | 'comercial',
    cep: '',
    street: '',
    neighborhood: '',
    city: 'São Paulo',
    state: 'SP',
    area: '',
    bedrooms: '3',
    bathrooms: '3',
    parkingSpaces: '2',
    conservation: 'reformado' as 'novo' | 'reformado' | 'original',
    finishing: 'premium' as 'luxo' | 'premium' | 'padrao',
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  // Automatic CEP lookup via ViaCEP API
  useEffect(() => {
    const cleanCep = formData.cep.replace(/\D/g, '')
    if (cleanCep.length === 8) {
      setCepLoading(true)
      fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setFormData(prev => ({
              ...prev,
              street: data.logradouro || prev.street,
              neighborhood: data.bairro || prev.neighborhood,
              city: data.localidade || prev.city,
              state: data.uf || prev.state
            }))
          }
        })
        .catch(err => console.error('Erro ao buscar CEP:', err))
        .finally(() => setCepLoading(false))
    }
  }, [formData.cep])

  // Simulated evaluation logic on client side
  const calculateValuation = () => {
    setLoading(true)
    setTimeout(() => {
      const areaNum = Number(formData.area) || 100
      let baseMeterVal = 12000 // default São Paulo premium

      // City modifier
      if (formData.city.toLowerCase().includes('rio')) baseMeterVal = 14000
      else if (formData.city.toLowerCase().includes('feliz')) baseMeterVal = 10000
      else if (formData.city.toLowerCase().includes('sebastião')) baseMeterVal = 11000
      else if (formData.city.toLowerCase().includes('ubatuba')) baseMeterVal = 9500
      else if (formData.city.toLowerCase().includes('parnaíba')) baseMeterVal = 11500

      // Type modifier
      let typeMult = 1.0
      if (formData.propertyType === 'cobertura') typeMult = 1.4
      else if (formData.propertyType === 'comercial') typeMult = 0.9

      // Finishing modifier
      let finishMult = 1.0
      if (formData.finishing === 'luxo') finishMult = 1.35
      else if (formData.finishing === 'padrao') finishMult = 0.75

      // Conservation modifier
      let consMult = 1.0
      if (formData.conservation === 'novo') consMult = 1.15
      else if (formData.conservation === 'original') consMult = 0.85

      const calculatedBase = areaNum * baseMeterVal * typeMult * finishMult * consMult
      
      setValuationResult({
        min: Math.round(calculatedBase * 0.92),
        max: Math.round(calculatedBase * 1.08)
      })
      setLoading(false)
      setStep(4)
    }, 1800)
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.cep || !formData.neighborhood || !formData.street) {
        alert('Por favor, preencha o CEP, Rua e Bairro para prosseguir.')
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!formData.area || Number(formData.area) <= 0) {
        alert('Por favor, informe uma metragem válida.')
        return
      }
      setStep(3)
    } else if (step === 3) {
      calculateValuation()
    }
  }

  const handlePrev = () => {
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
    else if (step === 4) setStep(3)
  }

  const handleInputChange = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }))
  }

  // Format currency helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val)
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={12} />
            Avaliação Online de Mercado
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Avalie Seu Imóvel
          </h1>
          <p className="text-warm-gray text-base max-w-xl mx-auto">
            Descubra em minutos a estimativa média de mercado do seu patrimônio com a nossa inteligência de dados exclusiva.
          </p>
        </div>

        {/* Multi-step progress bar */}
        {step < 5 && (
          <div className="mb-10">
            <div className="flex justify-between items-center text-xs text-warm-gray font-medium uppercase mb-3">
              <span className={step >= 1 ? 'text-gold' : ''}>1. Tipo e Local</span>
              <span className={step >= 2 ? 'text-gold' : ''}>2. Tamanho</span>
              <span className={step >= 3 ? 'text-gold' : ''}>3. Conservação</span>
              <span className={step >= 4 ? 'text-gold' : ''}>4. Resultado</span>
            </div>
            <div className="h-1.5 w-full bg-cream-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-gold transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white border border-cream-border rounded-3xl p-8 shadow-sm">
          
          {/* STEP 1: Type and Location */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-cream-border pb-3">
                Qual o tipo do imóvel e onde ele fica?
              </h2>
              
              {/* Type Select Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { id: 'casa', label: 'Casa', icon: Home },
                  { id: 'apartamento', label: 'Apartamento', icon: Building },
                  { id: 'cobertura', label: 'Cobertura', icon: Layers },
                  { id: 'comercial', label: 'Comercial', icon: Briefcase },
                ].map(item => {
                  const Icon = item.icon
                  const active = formData.propertyType === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleInputChange('propertyType', item.id)}
                      className={`flex flex-col items-center gap-3 p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                        active 
                          ? 'border-gold bg-gold/[0.03] text-gold' 
                          : 'border-cream-border hover:border-warm-gray text-charcoal-light'
                      }`}
                    >
                      <Icon size={24} className={active ? 'text-gold' : 'text-warm-gray'} />
                      <span className="text-xs font-semibold uppercase tracking-wider">{item.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Address Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">
                    CEP {cepLoading && <span className="text-[10px] text-gold font-normal lowercase italic ml-1">buscando...</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm font-semibold"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Rua / Avenida</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    placeholder="Av. Paulista, etc"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Bairro</label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    placeholder="Jardins"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Cidade</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="São Paulo"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-2">Estado</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="SP"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Metragem & Cômodos */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-cream-border pb-3">
                Características de tamanho e cômodos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-3 flex items-center gap-1.5">
                    <Maximize2 size={13} className="text-gold" />
                    Metragem Privativa (Área Útil em m²)
                  </label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    placeholder="Ex: 145"
                    className="w-full bg-cream rounded-xl border border-cream-border p-3.5 text-sm font-semibold"
                  />
                </div>
                
                {/* Rooms selection lists */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-3 flex items-center gap-1.5">
                    <BedDouble size={13} className="text-gold" />
                    Quartos / Suítes
                  </label>
                  <div className="flex gap-2">
                    {['1', '2', '3', '4', '5+'].map(val => (
                      <button
                        key={val}
                        onClick={() => handleInputChange('bedrooms', val)}
                        className={`flex-1 py-3.5 rounded-xl border text-center font-semibold text-sm transition-all cursor-pointer ${
                          formData.bedrooms === val
                            ? 'border-gold bg-gold text-white shadow-sm'
                            : 'border-cream-border hover:border-warm-gray text-charcoal-light bg-cream/30'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-3 flex items-center gap-1.5">
                    <Bath size={13} className="text-gold" />
                    Banheiros
                  </label>
                  <div className="flex gap-2">
                    {['1', '2', '3', '4', '5+'].map(val => (
                      <button
                        key={val}
                        onClick={() => handleInputChange('bathrooms', val)}
                        className={`flex-1 py-3.5 rounded-xl border text-center font-semibold text-sm transition-all cursor-pointer ${
                          formData.bathrooms === val
                            ? 'border-gold bg-gold text-white shadow-sm'
                            : 'border-cream-border hover:border-warm-gray text-charcoal-light bg-cream/30'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-3 flex items-center gap-1.5">
                    <Car size={13} className="text-gold" />
                    Vagas de Garagem
                  </label>
                  <div className="flex gap-2">
                    {['1', '2', '3', '4', '5+'].map(val => (
                      <button
                        key={val}
                        onClick={() => handleInputChange('parkingSpaces', val)}
                        className={`flex-1 py-3.5 rounded-xl border text-center font-semibold text-sm transition-all cursor-pointer ${
                          formData.parkingSpaces === val
                            ? 'border-gold bg-gold text-white shadow-sm'
                            : 'border-cream-border hover:border-warm-gray text-charcoal-light bg-cream/30'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Conservação & Acabamento */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-cream-border pb-3">
                Estado de conservação e acabamentos
              </h2>

              <div className="space-y-8">
                {/* Conservation status */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-warm-gray mb-3">Conservação do Imóvel</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'novo', title: 'Novo / Pronto', desc: 'Nunca habitado ou entregue recentemente.' },
                      { id: 'reformado', title: 'Totalmente Reformado', desc: 'Sistemas elétricos, hidráulicos e revestimentos novos.' },
                      { id: 'original', title: 'Original / Bem preservado', desc: 'Acabamentos de época bem conservados.' }
                    ].map(item => {
                      const active = formData.conservation === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleInputChange('conservation', item.id)}
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                            active 
                              ? 'border-gold bg-gold/[0.03] shadow-sm' 
                              : 'border-cream-border hover:border-warm-gray'
                          }`}
                        >
                          <div className={`font-semibold text-sm mb-1 ${active ? 'text-gold' : 'text-charcoal'}`}>{item.title}</div>
                          <div className="text-xs text-warm-gray leading-normal">{item.desc}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Finishing standards */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-warm-gray mb-3">Padrão de Acabamento</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'luxo', title: 'Alto Luxo', desc: 'Mármores nobres, ar central, metais importados, automação total.' },
                      { id: 'premium', title: 'Premium / Moderno', desc: 'Porcelanato, móveis planejados de grife, acabamentos contemporâneos.' },
                      { id: 'padrao', title: 'Padrão / Simples', desc: 'Revestimentos clássicos e funcionais sem customizações luxuosas.' }
                    ].map(item => {
                      const active = formData.finishing === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleInputChange('finishing', item.id)}
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                            active 
                              ? 'border-gold bg-gold/[0.03] shadow-sm' 
                              : 'border-cream-border hover:border-warm-gray'
                          }`}
                        >
                          <div className={`font-semibold text-sm mb-1 ${active ? 'text-gold' : 'text-charcoal'}`}>{item.title}</div>
                          <div className="text-xs text-warm-gray leading-normal">{item.desc}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Valuation Results Display (Animated) */}
          {step === 4 && valuationResult && (
            <div className="animate-fade-in-up text-center py-6">
              <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <TrendingUp size={30} />
              </div>
              <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
                Estimativa Prévia de Mercado
              </h2>
              <p className="text-sm text-warm-gray max-w-md mx-auto mb-8 leading-normal">
                Com base no nosso algoritmo inteligente e nas vendas recentes no bairro <strong>{formData.neighborhood}</strong>, estimamos que o valor de venda do seu imóvel esteja entre:
              </p>

              {/* Price range box */}
              <div className="bg-cream border border-cream-border rounded-2xl p-8 max-w-lg mx-auto mb-8 shadow-sm">
                <div className="text-xs font-semibold text-warm-gray uppercase tracking-widest mb-2">Preço Estimado de Venda</div>
                <div className="font-display text-3xl md:text-4xl font-extrabold text-gold leading-none mb-3">
                  {formatCurrency(valuationResult.min)} <span className="text-charcoal/30 text-lg font-normal">a</span> {formatCurrency(valuationResult.max)}
                </div>
                <p className="text-xs text-warm-gray italic">
                  *Esta é uma estimativa de mercado referencial. Fatores específicos de vista, andar e decoração podem valorizar ainda mais o seu bem.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <p className="text-sm text-charcoal-light font-semibold mb-5">
                  Gostaria de uma avaliação de precisão oficial assinada por um de nossos peritos?
                </p>
                <button
                  onClick={() => setStep(5)}
                  className="btn-gold w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Agendar Avaliação Oficial
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Contato & Envio Final */}
          {step === 5 && (
            <div className="animate-fade-in-up text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
                Avaliação Recebida!
              </h2>
              <p className="text-warm-gray text-sm max-w-md mx-auto mb-8 leading-relaxed">
                Suas informações de avaliação de mercado do imóvel no bairro <strong>{formData.neighborhood}</strong> foram cadastradas no nosso banco de dados. Um consultor especialista em {formData.city} entrará em contato em breve para realizar a visita e formalizar o laudo técnico de alta precisão.
              </p>
              <div className="border-t border-cream-border pt-6 max-w-sm mx-auto flex gap-4">
                <button 
                  onClick={() => {
                    setFormData({
                      propertyType: 'casa',
                      cep: '',
                      street: '',
                      neighborhood: '',
                      city: 'São Paulo',
                      state: 'SP',
                      area: '',
                      bedrooms: '3',
                      bathrooms: '3',
                      parkingSpaces: '2',
                      conservation: 'reformado',
                      finishing: 'premium',
                      name: '',
                      email: '',
                      phone: '',
                      message: ''
                    })
                    setStep(1)
                  }}
                  className="btn-outline flex-1 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-center"
                >
                  Nova Avaliação
                </button>
                <a 
                  href="/"
                  className="btn-gold flex-1 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center"
                >
                  Voltar ao Início
                </a>
              </div>
            </div>
          )}

          {/* Loading view during simulation */}
          {loading && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl z-20">
              <div className="w-12 h-12 rounded-full border-4 border-gold/25 border-t-gold animate-spin mb-4" />
              <div className="text-charcoal font-semibold text-sm">Calculando dados de mercado...</div>
              <div className="text-warm-gray text-xs mt-1">Analisando vendas similares em {formData.neighborhood}</div>
            </div>
          )}

          {/* Navigation Controls */}
          {step < 4 && (
            <div className="flex justify-between items-center border-t border-cream-border pt-6 mt-8">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className={`py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  step === 1 
                    ? 'opacity-0 pointer-events-none' 
                    : 'btn-outline text-gold border-gold cursor-pointer'
                }`}
              >
                <ChevronLeft size={14} />
                Voltar
              </button>
              <button
                onClick={handleNext}
                className="btn-gold py-3.5 px-8 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm ml-auto"
              >
                {step === 3 ? 'Calcular Avaliação' : 'Avançar'}
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
